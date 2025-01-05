export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Connection, PublicKey, SystemProgram, TransactionInstruction } from '@solana/web3.js';
import { MarketIndex, QuartzClient, QuartzUser, TOKENS } from '@quartz-labs/sdk';
import { createCloseAccountInstruction } from '@solana/spl-token';
import { createSyncNativeInstruction, getAssociatedTokenAddress } from '@solana/spl-token';
import { buildTransaction, getWsolMint, makeCreateAtaIxsIfNeeded } from '@/src/utils/helpers';

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
    amountBaseUnits: z.number().refine(
        Number.isInteger,
        { message: "amountBaseUnits must be an integer" }
    ),
    marketIndex: z.number().refine(
        (value) => MarketIndex.includes(value as any),
        { message: "marketIndex must be a valid market index" }
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

    const { searchParams } = new URL(request.url);
    const params = {
        address: searchParams.get('address'),
        amountBaseUnits: Number(searchParams.get('amountBaseUnits')),
        marketIndex: Number(searchParams.get('marketIndex'))
    };

    let body: z.infer<typeof paramsSchema>;
    try {
        body = paramsSchema.parse(params);
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 });
    }

    const connection = new Connection(env.RPC_URL);
    const address = new PublicKey(body.address);
    const amountBaseUnits = body.amountBaseUnits;
    const marketIndex = body.marketIndex as MarketIndex;

    const quartzClient = await QuartzClient.fetchClient(connection);
    let user: QuartzUser;
    try {
        user = await quartzClient.getQuartzAccount(address);
    } catch {
        return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    try {
        const instructions = await makeDepositIxs(connection, address, amountBaseUnits, marketIndex, user);
        const transaction = await buildTransaction(connection, instructions, address);
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

async function makeDepositIxs(
    connection: Connection,
    address: PublicKey,
    amountBaseUnits: number,
    marketIndex: MarketIndex,
    user: QuartzUser
): Promise<TransactionInstruction[]> {
    const mint = TOKENS[marketIndex].mint;
    const walletAta = await getAssociatedTokenAddress(mint, address);
    const oix_createAta = await makeCreateAtaIxsIfNeeded(connection, walletAta, address, mint);

    const oix_wrapSol: TransactionInstruction[] = [];
    const oix_closeWsol: TransactionInstruction[] = [];
    if (mint === getWsolMint()) {
        const ix_wrapSol = SystemProgram.transfer({
            fromPubkey: address,
            toPubkey: walletAta,
            lamports: amountBaseUnits,
        });
        const ix_syncNative = createSyncNativeInstruction(walletAta);
        oix_wrapSol.push(ix_wrapSol, ix_syncNative);
        oix_closeWsol.push(createCloseAccountInstruction(walletAta, address, address));
    }

    const ix_deposit = await user.makeDepositIx(amountBaseUnits, mint, marketIndex, false);
    return [...oix_createAta, ...oix_wrapSol, ix_deposit, ...oix_closeWsol];
}