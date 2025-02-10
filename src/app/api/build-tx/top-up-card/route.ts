export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Connection, PublicKey } from '@solana/web3.js';
import { makeCreateAtaIxIfNeeded, MARKET_INDEX_USDC, QuartzClient, QuartzUser, TOKENS } from '@quartz-labs/sdk';
import { buildTransaction } from '@/src/utils/helpers';
import type { TransactionInstruction } from '@solana/web3.js';
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token';


const envSchema = z.object({
    RPC_URL: z.string().url()
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
    amountBaseUnits: z.number().refine(
        Number.isInteger,
        { message: "amountBaseUnits must be an integer" }
    ),
});

export async function GET(request: Request) {
    let env;
    try {
        env = envSchema.parse({
            RPC_URL: process.env.RPC_URL,
            BASE_RPC_URL: process.env.BASE_RPC_URL,
            CARD_CONTRACT_ADDRESS: process.env.CARD_CONTRACT_ADDRESS
        });
    } catch (error) {
        console.error("Error validating environment variables: ", error);
        return new Response("Internal server configuration error", { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const params = {
        address: searchParams.get('address'),
        amountBaseUnits: Number(searchParams.get('amountBaseUnits')),
    };

    let body: z.infer<typeof paramsSchema>;
    try {
        body = paramsSchema.parse(params);
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 });
    }

    const address = new PublicKey(body.address);
    const amountBaseUnits = body.amountBaseUnits;

    const connection = new Connection(env.RPC_URL);
    const quartzClient = await QuartzClient.fetchClient(connection);
    const user = await quartzClient.getQuartzAccount(address);

    const ixs_withdraw = await makeWithdrawIxs(connection, user, amountBaseUnits);

    const {
        ixs: ixs_topUpCard,
        lookupTables: lookupTables,
        signerKeypair: signerKeypair
    } = await user.makeTopUpCardIxs(amountBaseUnits);

    const transaction = await buildTransaction(
        connection, 
        [...ixs_withdraw, ...ixs_topUpCard], 
        address,
        lookupTables
    );
    transaction.sign([signerKeypair]);

    try {
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

async function makeWithdrawIxs(
    connection: Connection,
    user: QuartzUser,
    amountBaseUnits: number,
): Promise<TransactionInstruction[]> {
    const usdcMint = TOKENS[MARKET_INDEX_USDC].mint;
    const walletAta = await getAssociatedTokenAddress(usdcMint, user.pubkey);
    const oix_createAta = await makeCreateAtaIxIfNeeded(connection, walletAta, user.pubkey, usdcMint, TOKEN_PROGRAM_ID);

    const ix_withdraw = await user.makeWithdrawIx(amountBaseUnits, MARKET_INDEX_USDC, false);
    return [...oix_createAta, ix_withdraw];
}
