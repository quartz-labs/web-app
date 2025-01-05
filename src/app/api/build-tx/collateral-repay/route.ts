export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { AddressLookupTableAccount, Connection, Keypair, PublicKey, TransactionInstruction, VersionedTransaction } from '@solana/web3.js';
import { MarketIndex, QuartzClient, TOKENS, DummyWallet } from '@quartz-labs/sdk';
import { getAssociatedTokenAddress } from '@solana/spl-token';
import { baseUnitToDecimal, getJupiterSwapQuote, getTokenAccountBalance, makeCreateAtaIxsIfNeeded } from '@/src/utils/helpers';
import { JUPITER_SLIPPAGE_BPS } from '@/src/config/constants';
import { getConfig as getMarginfiConfig, MarginfiClient } from '@mrgnlabs/marginfi-client-v2';

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
    amountLoanBaseUnits: z.number().refine(
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

    const bodyJson = await request.json();
    let body: z.infer<typeof paramsSchema>;
    try {
        body = paramsSchema.parse(bodyJson);
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 });
    }

    const connection = new Connection(env.RPC_URL);
    const address = new PublicKey(body.address);
    const amountLoanBaseUnits = body.amountLoanBaseUnits;
    const marketIndexLoan = body.marketIndexLoan as MarketIndex;
    const marketIndexCollateral = body.marketIndexCollateral as MarketIndex;

    try {
        const {
            instructions,
            lookupTables,
            flashLoanAmountBaseUnits
        } = await makeCollateralRepayIxs(connection, address, amountLoanBaseUnits, marketIndexLoan, marketIndexCollateral);

        const transaction = await buildFlashLoanTransaction(
            connection,
            address,
            flashLoanAmountBaseUnits,
            marketIndexLoan,
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
    amountLoanBaseUnits: number,
    marketIndexLoan: MarketIndex,
    marketIndexCollateral: MarketIndex
): Promise<{
    instructions: TransactionInstruction[],
    lookupTables: AddressLookupTableAccount[],
    flashLoanAmountBaseUnits: number
}> {
    const quartzClient = await QuartzClient.fetchClient(connection);
    const userPromise = quartzClient.getQuartzAccount(address);

    const mintCollateral = TOKENS[marketIndexCollateral].mint;
    const walletAtaCollateral = await getAssociatedTokenAddress(mintCollateral, address);
    const startingBalanceCollateral = await getTokenAccountBalance(connection, walletAtaCollateral);

    const mintLoan = TOKENS[marketIndexLoan].mint;
    const walletAtaLoan = await getAssociatedTokenAddress(mintLoan, address);
    const oix_createAtaLoan = await makeCreateAtaIxsIfNeeded(connection, walletAtaLoan, address, mintLoan);

    const jupiterQuote = await getJupiterSwapQuote(mintCollateral, mintLoan, amountLoanBaseUnits, JUPITER_SLIPPAGE_BPS);
    const collateralRequiredForSwap = Number(jupiterQuote.inAmount) * (1 + (JUPITER_SLIPPAGE_BPS / 10_000));

    const user = await userPromise;
    const { ixs: ixs_collateralRepay, lookupTables } = await user.makeCollateralRepayIxs(
        address,
        walletAtaLoan,
        mintLoan,
        marketIndexLoan,
        walletAtaCollateral,
        mintCollateral,
        marketIndexCollateral,
        startingBalanceCollateral + collateralRequiredForSwap,
        jupiterQuote
    );
    return {
        instructions: [...oix_createAtaLoan, ...ixs_collateralRepay],
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
    const PRIORITY_FEE_DECIMAL = 0.0025;
    const amountLoanDecimal = baseUnitToDecimal(flashLoanAmountBaseUnits, flashLoanMarketIndex);

    const wallet = new DummyWallet(Keypair.generate());
    const marginfiClient = await MarginfiClient.fetch(getMarginfiConfig(), wallet, connection);
    const [ marginfiAccount ] = await marginfiClient.getMarginfiAccountsForAuthority(address);
    if (marginfiAccount === undefined) throw new Error("Could not find Flash Loan MarginFi account");
    if (marginfiAccount.isDisabled) throw new Error("Flash Loan MarginFi account is disabled"); // TODO: Handle disabled MarginFi accounts

    const loanBank = marginfiClient.getBankByMint(TOKENS[flashLoanMarketIndex].mint);
    if (loanBank === null) throw new Error("Could not find Flash Loan MarginFi bank");

    const { flashloanTx } = await marginfiAccount.makeLoopTx(
        amountLoanDecimal,
        amountLoanDecimal,
        loanBank.address,
        loanBank.address,
        instructions,
        lookupTables,
        PRIORITY_FEE_DECIMAL,
        true
    )

    return flashloanTx;
}