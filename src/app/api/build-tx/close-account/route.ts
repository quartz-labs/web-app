export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Connection, PublicKey, TransactionInstruction } from '@solana/web3.js';
import { QuartzClient } from '@quartz-labs/sdk';
import { buildTransaction } from '@/src/utils/helpers';

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
    )
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

    try {
        const instructions = await makeCloseAccountIxs(connection, address);
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

async function makeCloseAccountIxs(
    connection: Connection,
    address: PublicKey
): Promise<TransactionInstruction[]> {
    const quartzClient = await QuartzClient.fetchClient(connection);
    const user = await quartzClient.getQuartzAccount(address);
    return await user.makeCloseAccountIxs();
}