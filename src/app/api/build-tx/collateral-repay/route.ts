export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { AddressLookupTableAccount, Connection, Keypair, PublicKey, TransactionInstruction, VersionedTransaction } from '@solana/web3.js';
import { baseUnitToDecimal, MarketIndex, QuartzClient, TOKENS, DummyWallet, QuartzUser, getTokenProgram, makeCreateAtaIxIfNeeded } from '@quartz-labs/sdk';
import { fetchAndParse, getComputeUnitPriceIx } from '@/src/utils/helpers';
import { JUPITER_SLIPPAGE_BPS } from '@/src/config/constants';
import { getConfig as getMarginfiConfig, MarginfiClient } from '@mrgnlabs/marginfi-client-v2';
import { SwapMode, type QuoteResponse } from '@jup-ag/api';
import { createCloseAccountInstruction, getAssociatedTokenAddress } from '@solana/spl-token';
import bs58 from 'bs58';

const envSchema = z.object({
    RPC_URL: z.string().url(),
    FLASH_LOAN_CALLER: z.string().transform(
        (value) => {
            try {
                return Keypair.fromSecretKey(bs58.decode(value));
            } catch {
                throw new Error("FLASH_LOAN_CALLER must be a valid secret key");
            }
        }
    ),
});

const paramsSchema = z.object({
    address: z.string().refine(
        (value) => {
            try {
                new PublicKey(value);
                return true;
            } catch {
                return false;
            }
        },
        { message: "Address is not a valid public key" }
    ),
    amountSwapBaseUnits: z.number().refine(
        Number.isInteger,
        { message: "amountLoanBaseUnits must be an integer" }
    ),
    marketIndexLoan: z.number().refine(
        (value) => MarketIndex.includes(value as any),
        { message: "marketIndexLoan must be a valid market index" }
    ),
    marketIndexCollateral: z.number().refine(
        (value) => MarketIndex.includes(value as any),
        { message: "marketIndexCollateral must be a valid market index" }
    ),
    swapMode: z.nativeEnum(SwapMode),
    useMaxAmount: z.boolean().optional().default(false),
});

export async function GET(request: Request) {
    let env;
    try {
        env = envSchema.parse({
            RPC_URL: process.env.RPC_URL,
            FLASH_LOAN_CALLER: process.env.FLASH_LOAN_CALLER,
        });
    } catch (error) {
        console.error("Error validating environment variables: ", error);
        return new Response("Internal server configuration error", { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const params = {
        address: searchParams.get('address'),
        amountSwapBaseUnits: Number(searchParams.get('amountSwapBaseUnits')),
        marketIndexLoan: Number(searchParams.get('marketIndexLoan')),
        marketIndexCollateral: Number(searchParams.get('marketIndexCollateral')),
        swapMode: searchParams.get('swapMode'),
        useMaxAmount: searchParams.get('useMaxAmount') === 'true',
    };

    let body: z.infer<typeof paramsSchema>;
    try {
        body = paramsSchema.parse(params);
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 });
    }

    const connection = new Connection(env.RPC_URL);
    const address = new PublicKey(body.address);
    let amountSwapBaseUnits = body.amountSwapBaseUnits;
    const marketIndexLoan = body.marketIndexLoan as MarketIndex;
    const marketIndexCollateral = body.marketIndexCollateral as MarketIndex;
    const swapMode = body.swapMode;
    const useMaxAmount = body.useMaxAmount;

    const quartzClient = await QuartzClient.fetchClient(connection);
    let user: QuartzUser;
    try {
        user = await quartzClient.getQuartzAccount(address);
    } catch {
        return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    try {
        if (useMaxAmount) {
            amountSwapBaseUnits = await user.getTokenBalance(marketIndexLoan).then(Number).then(Math.abs);
        }

        const {
            ixs,
            lookupTables,
            flashLoanAmountBaseUnits
        } = await makeCollateralRepayIxs(
            connection,
            env.FLASH_LOAN_CALLER.publicKey,
            amountSwapBaseUnits,
            marketIndexLoan,
            marketIndexCollateral,
            user,
            swapMode
        );

        const transaction = await buildFlashLoanTransaction(
            connection,
            env.FLASH_LOAN_CALLER,
            flashLoanAmountBaseUnits,
            marketIndexCollateral,
            ixs,
            lookupTables
        );

        const serializedTx = Buffer.from(transaction.serialize()).toString("base64");
        return NextResponse.json({ transaction: serializedTx });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: `Internal server error: ${error}` },
            { status: 500 }
        );
    }
}

async function makeCollateralRepayIxs(
    connection: Connection,
    caller: PublicKey,
    amountSwapBaseUnits: number,
    marketIndexLoan: MarketIndex,
    marketIndexCollateral: MarketIndex,
    user: QuartzUser,
    swapMode: SwapMode
): Promise<{
    ixs: TransactionInstruction[],
    lookupTables: AddressLookupTableAccount[],
    flashLoanAmountBaseUnits: number
}> {
    const mintCollateral = TOKENS[marketIndexCollateral].mint;
    const mintLoan = TOKENS[marketIndexLoan].mint;

    const jupiterQuoteEndpoint
        = `https://quote-api.jup.ag/v6/quote?inputMint=${mintCollateral.toBase58()}&outputMint=${mintLoan.toBase58()}&amount=${amountSwapBaseUnits}&slippageBps=${JUPITER_SLIPPAGE_BPS}&swapMode=${swapMode}&onlyDirectRoutes=true`;
    const jupiterQuote: QuoteResponse = await fetchAndParse(jupiterQuoteEndpoint);
    const collateralRequiredForSwap = Math.ceil(Number(jupiterQuote.inAmount) * (1 + (JUPITER_SLIPPAGE_BPS / 10_000)));

    const {
        ix: jupiterIx,
        lookupTables: jupiterLookupTables
    } = await makeJupiterIx(connection, jupiterQuote, caller);

    const { 
        ixs, 
        lookupTables: quartzLookupTables 
    } = await user.makeCollateralRepayIxs(
        caller,
        marketIndexLoan,
        marketIndexCollateral,
        jupiterIx
    );

    return {
        ixs,
        lookupTables: [...jupiterLookupTables, ...quartzLookupTables],
        flashLoanAmountBaseUnits: collateralRequiredForSwap
    };
}

async function makeJupiterIx(
    connection: Connection,
    jupiterQuote: QuoteResponse,
    address: PublicKey
): Promise<{
    ix: TransactionInstruction,
    lookupTables: AddressLookupTableAccount[]
}> {
    const instructions = await (
        await fetch('https://api.jup.ag/swap/v1/swap-instructions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                quoteResponse: jupiterQuote,
                userPublicKey: address.toBase58(),
            })
        })
        // biome-ignore lint: Allow any for Jupiter API response
    ).json() as any;
    
    if (instructions.error) {
        throw new Error(`Failed to get swap instructions: ${instructions.error}`);
    }

    const {
        swapInstruction,
        addressLookupTableAddresses
    } = instructions;

    // biome-ignore lint: Allow any for Jupiter API response
    const deserializeInstruction = (instruction: any) => {
        return new TransactionInstruction({
            programId: new PublicKey(instruction.programId),
            // biome-ignore lint: Allow any for Jupiter API response
            keys: instruction.accounts.map((key: any) => ({
                pubkey: new PublicKey(key.pubkey),
                isSigner: key.isSigner,
                isWritable: key.isWritable,
            })),
            data: Buffer.from(instruction.data, "base64"),
        });
    };
    
    const getAddressLookupTableAccounts = async (
        keys: string[]
    ): Promise<AddressLookupTableAccount[]> => {
        const addressLookupTableAccountInfos =
        await connection.getMultipleAccountsInfo(
            keys.map((key) => new PublicKey(key))
        );
    
        return addressLookupTableAccountInfos.reduce((acc, accountInfo, index) => {
        const addressLookupTableAddress = keys[index];
        if (accountInfo && addressLookupTableAddress) {
            const addressLookupTableAccount = new AddressLookupTableAccount({
            key: new PublicKey(addressLookupTableAddress),
            state: AddressLookupTableAccount.deserialize(accountInfo.data),
            });
            acc.push(addressLookupTableAccount);
        }
    
        return acc;
        }, new Array<AddressLookupTableAccount>());
    };
    
    const addressLookupTableAccounts = await getAddressLookupTableAccounts(addressLookupTableAddresses);


    return {
        ix: deserializeInstruction(swapInstruction),
        lookupTables: addressLookupTableAccounts
    };
}

async function buildFlashLoanTransaction(
    connection: Connection,
    caller: Keypair,
    flashLoanAmountBaseUnits: number,
    flashLoanMarketIndex: MarketIndex,
    instructions: TransactionInstruction[], 
    lookupTables: AddressLookupTableAccount[] = []
): Promise<VersionedTransaction> {
    const amountLoanDecimal = baseUnitToDecimal(flashLoanAmountBaseUnits, flashLoanMarketIndex);

    // Get Marginfi account & bank
    const wallet = new DummyWallet(caller.publicKey);
    const marginfiClient = await MarginfiClient.fetch(getMarginfiConfig(), wallet, connection);
    const [ marginfiAccount ] = await marginfiClient.getMarginfiAccountsForAuthority(caller.publicKey);
    if (marginfiAccount === undefined) throw new Error("Could not find Flash Loan MarginFi account");
    if (marginfiAccount.isDisabled) throw new Error("Flash Loan MarginFi account is disabled");

    const loanBank = marginfiClient.getBankByMint(TOKENS[flashLoanMarketIndex].mint);
    if (loanBank === null) throw new Error("Could not find Flash Loan MarginFi bank");
    
    // Set compute unit price
    const ix_computePrice = await getComputeUnitPriceIx();

    // Make ATA instructions (closing ATA at the end if wSol is used)
    const mintLoan = TOKENS[flashLoanMarketIndex].mint;
    const mintLoanTokenProgram = await getTokenProgram(connection, mintLoan);
    const walletAtaLoan = await getAssociatedTokenAddress(mintLoan, caller.publicKey, false, mintLoanTokenProgram);
    const oix_createAtaLoan = await makeCreateAtaIxIfNeeded(connection, walletAtaLoan, caller.publicKey, mintLoan, mintLoanTokenProgram);

    const oix_closeWSolAta: TransactionInstruction[] = [];
    if (TOKENS[flashLoanMarketIndex].name === "SOL") {
        oix_closeWSolAta.push(
            createCloseAccountInstruction(
                walletAtaLoan,
                caller.publicKey,
                caller.publicKey,
                [],
                mintLoanTokenProgram
            )
        );
    }

    // Make borrow & deposit instructions
    const { instructions: ix_borrow } = await marginfiAccount.makeBorrowIx(amountLoanDecimal, loanBank.address, {
        createAtas: false,
        wrapAndUnwrapSol: false
    });
    const { instructions: ix_deposit } = await marginfiAccount.makeDepositIx(amountLoanDecimal, loanBank.address, {
        wrapAndUnwrapSol: false
    });

    const flashloanTx = await marginfiAccount.buildFlashLoanTx({
        ixs: [
            ix_computePrice, 
            ...oix_createAtaLoan, 
            ...ix_borrow, 
            ...instructions, 
            ...ix_deposit, 
            ...oix_closeWSolAta
        ],
        addressLookupTableAccounts: lookupTables
    });

    flashloanTx.sign([caller]);

    return flashloanTx;
}