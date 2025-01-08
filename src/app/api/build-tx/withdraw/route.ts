export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Connection, PublicKey, TransactionInstruction } from '@solana/web3.js';
import { getTokenProgram, MarketIndex, QuartzClient, QuartzUser, TOKENS, makeCreateAtaIxIfNeeded } from '@quartz-labs/sdk';
import { createCloseAccountInstruction } from '@solana/spl-token';
import { getAssociatedTokenAddress } from '@solana/spl-token';
import { buildTransaction, getWsolMint } from '@/src/utils/helpers';

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
    allowLoan: z.boolean(),
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
        marketIndex: Number(searchParams.get('marketIndex')),
        allowLoan: searchParams.get('allowLoan') === 'true'
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
    const allowLoan = body.allowLoan;
    const marketIndex = body.marketIndex as MarketIndex;

    const quartzClient = await QuartzClient.fetchClient(connection);
    let user: QuartzUser;
    try {
        user = await quartzClient.getQuartzAccount(address);
    } catch {
        return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    try {
        const instructions = await makeWithdrawIxs(
            connection, 
            address, 
            amountBaseUnits, 
            marketIndex, 
            user, 
            allowLoan
        );
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

async function makeWithdrawIxs(
    connection: Connection,
    address: PublicKey,
    amountBaseUnits: number,
    marketIndex: MarketIndex,
    user: QuartzUser,
    allowLoan: boolean
): Promise<TransactionInstruction[]> {
    const mint = TOKENS[marketIndex].mint;
    const mintTokenProgram = await getTokenProgram(connection, mint);
    const walletAta = await getAssociatedTokenAddress(mint, address, false, mintTokenProgram);
    const oix_createAta = await makeCreateAtaIxIfNeeded(connection, walletAta, address, mint, mintTokenProgram);

    const oix_closeWsol: TransactionInstruction[] = [];
    if (mint === getWsolMint()) {
        oix_closeWsol.push(createCloseAccountInstruction(walletAta, address, address));
    }

    const ix_withdraw = await user.makeWithdrawIx(amountBaseUnits, marketIndex, allowLoan);
    return [...oix_createAta, ix_withdraw, ...oix_closeWsol];
}