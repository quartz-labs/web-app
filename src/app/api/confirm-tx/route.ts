export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Connection } from '@solana/web3.js';

const envSchema = z.object({
    RPC_URL: z.string().url(),
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

    const connection = new Connection(env.RPC_URL);

    const { searchParams } = new URL(request.url);
    const signature = searchParams.get('signature');
    if (!signature) return NextResponse.json({ error: "Signature is required" }, { status: 400 });

    try {
        await connection.confirmTransaction({ signature, ...(await connection.getLatestBlockhash()) }, "confirmed");
        return NextResponse.json({ signature: signature });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: `Internal server error: ${error}` },
            { status: 500 }
        );
    }
}
