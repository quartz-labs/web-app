export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Connection } from '@solana/web3.js';
import { VersionedTransaction } from '@solana/web3.js';

const envSchema = z.object({
    RPC_URL: z.string().url(),
});

const transactionSchema = z.object({
    transaction: z.string()
        .regex(/^[A-Za-z0-9+/]+={0,2}$/, 'Must be a valid base64 string')
        .transform((val) => {
            const buffer = Buffer.from(val, 'base64');
            VersionedTransaction.deserialize(buffer); // Validate it's a valid VersionedTransaction
            return buffer;
        }),
    skipPreflight: z.boolean().optional().default(false),
});

export async function POST(request: Request) {
    let env;
    try {
        env = envSchema.parse({
            RPC_URL: process.env.RPC_URL,
        });
    } catch (error) {
        console.error("Error validating environment variables: ", error);
        return new Response("Internal server configuration error", { status: 500 });
    }
    const connection = new Connection(env.RPC_URL);

    const bodyJson = await request.json();
    
    let body: z.infer<typeof transactionSchema>;
    try {
        body = transactionSchema.parse(bodyJson);
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 });
    }

    const transaction = VersionedTransaction.deserialize(body.transaction);
    const isBlockhashValid = await connection.isBlockhashValid(transaction.message.recentBlockhash);
    transaction.message.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    if (!isBlockhashValid) {
        return NextResponse.json({ error: "Blockhash is invalid or has expired" }, { status: 400 });
    }

    try {
        const signature = await connection.sendRawTransaction(body.transaction, {
            skipPreflight: body.skipPreflight,
        });
        return NextResponse.json({ signature });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: `Internal server error: ${error}` },
            { status: 500 }
        );
    }
}