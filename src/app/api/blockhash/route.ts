export const dynamic = 'force-dynamic';

import { Connection } from '@solana/web3.js';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const envSchema = z.object({
    RPC_URL: z.string().url(),
});

export async function GET() {
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

    try {
        const blockhash = (await connection.getLatestBlockhash()).blockhash;
        return NextResponse.json({ blockhash });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: `Internal server error: ${error}` },
            { status: 500 }
        );
    }
}
