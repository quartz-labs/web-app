export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { AddressLookupTableAccount, Connection, PublicKey, TransactionInstruction, VersionedTransaction } from '@solana/web3.js';
import { baseUnitToDecimal, MarketIndex, QuartzClient, TOKENS, DummyWallet, QuartzUser, getTokenProgram, makeCreateAtaIxIfNeeded } from '@quartz-labs/sdk';
import { fetchAndParse, getComputeUnitPriceIx } from '@/src/utils/helpers';
import { JUPITER_SLIPPAGE_BPS } from '@/src/config/constants';
import { getConfig as getMarginfiConfig, MarginfiClient } from '@mrgnlabs/marginfi-client-v2';
import type { QuoteResponse } from '@jup-ag/api';
import { createCloseAccountInstruction, getAssociatedTokenAddress } from '@solana/spl-token';

const envSchema = z.object({
    RPC_URL: z.string().url(),
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
    swapMode: z.enum(["ExactIn", "ExactOut"]),
});

export async function GET(request: Request) {
    let env;
    try {
        env = envSchema.parse({
            RPC_URL: process.env.RPC_URL,
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
        swapMode: searchParams.get('swapMode')
    };

    let body: z.infer<typeof paramsSchema>;
    try {
        body = paramsSchema.parse(params);
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 });
    }

    const connection = new Connection(env.RPC_URL);
    const address = new PublicKey(body.address);
    const amountSwapBaseUnits = body.amountSwapBaseUnits;
    const marketIndexLoan = body.marketIndexLoan as MarketIndex;
    const marketIndexCollateral = body.marketIndexCollateral as MarketIndex;
    const swapMode = body.swapMode;

    const quartzClient = await QuartzClient.fetchClient(connection);
    let user: QuartzUser;
    try {
        user = await quartzClient.getQuartzAccount(address);
    } catch {
        return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    try {
        const {
            instructions,
            lookupTables,
            flashLoanAmountBaseUnits
        } = await makeCollateralRepayIxs(
            connection,
            address,
            amountSwapBaseUnits,
            marketIndexLoan,
            marketIndexCollateral,
            user,
            swapMode
        );

        const transaction = await buildFlashLoanTransaction(
            connection,
            address,
            flashLoanAmountBaseUnits,
            marketIndexCollateral,
            instructions,
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
    address: PublicKey,
    amountSwapBaseUnits: number,
    marketIndexLoan: MarketIndex,
    marketIndexCollateral: MarketIndex,
    user: QuartzUser,
    swapMode: "ExactIn" | "ExactOut"
): Promise<{
    instructions: TransactionInstruction[],
    lookupTables: AddressLookupTableAccount[],
    flashLoanAmountBaseUnits: number
}> {
    const mintCollateral = TOKENS[marketIndexCollateral].mint;
    const mintLoan = TOKENS[marketIndexLoan].mint;

    const jupiterQuoteEndpoint
        = `https://quote-api.jup.ag/v6/quote?inputMint=${mintCollateral.toBase58()}&outputMint=${mintLoan.toBase58()}&amount=${amountSwapBaseUnits}&slippageBps=${JUPITER_SLIPPAGE_BPS}&swapMode=${swapMode}&onlyDirectRoutes=true`;
    const jupiterQuote: QuoteResponse = await fetchAndParse(jupiterQuoteEndpoint);
    const collateralRequiredForSwap = Math.ceil(Number(jupiterQuote.inAmount) * (1 + (JUPITER_SLIPPAGE_BPS / 10_000)));

    const { ixs: ixs_collateralRepay, lookupTables } = await user.makeCollateralRepayIxs(
        address,
        marketIndexLoan,
        marketIndexCollateral,
        jupiterQuote
    );

    return {
        instructions: ixs_collateralRepay,
        lookupTables,
        flashLoanAmountBaseUnits: collateralRequiredForSwap
    };
}

async function buildFlashLoanTransaction(
    connection: Connection,
    address: PublicKey,
    flashLoanAmountBaseUnits: number,
    flashLoanMarketIndex: MarketIndex,
    instructions: TransactionInstruction[], 
    lookupTables: AddressLookupTableAccount[] = []
): Promise<VersionedTransaction> {
    const amountLoanDecimal = baseUnitToDecimal(flashLoanAmountBaseUnits, flashLoanMarketIndex);

    // Get Marginfi account & bank
    const wallet = new DummyWallet(address);
    const marginfiClient = await MarginfiClient.fetch(getMarginfiConfig(), wallet, connection);
    const [ marginfiAccount ] = await marginfiClient.getMarginfiAccountsForAuthority(address);
    if (marginfiAccount === undefined) throw new Error("Could not find Flash Loan MarginFi account");
    if (marginfiAccount.isDisabled) throw new Error("Flash Loan MarginFi account is disabled"); // TODO: Handle disabled MarginFi accounts

    const loanBank = marginfiClient.getBankByMint(TOKENS[flashLoanMarketIndex].mint);
    if (loanBank === null) throw new Error("Could not find Flash Loan MarginFi bank");
    
    // Set compute unit price
    const ix_computePrice = await getComputeUnitPriceIx();

    // Make ATA instructions (closing ATA at the end if wSol is used)
    const mintLoan = TOKENS[flashLoanMarketIndex].mint;
    const mintLoanTokenProgram = await getTokenProgram(connection, mintLoan);
    const walletAtaLoan = await getAssociatedTokenAddress(mintLoan, address, false, mintLoanTokenProgram);
    const oix_createAtaLoan = await makeCreateAtaIxIfNeeded(connection, walletAtaLoan, address, mintLoan, mintLoanTokenProgram);

    const oix_closeWSolAta: TransactionInstruction[] = [];
    if (TOKENS[flashLoanMarketIndex].name === "SOL") {
        oix_closeWSolAta.push(
            createCloseAccountInstruction(
                walletAtaLoan,
                address,
                address,
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

    return flashloanTx;
}