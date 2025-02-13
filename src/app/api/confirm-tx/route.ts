export const dynamic = 'force-dynamic';
export const maxDuration = 70; // 70 second maximum in Vercel

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Connection, TransactionExpiredBlockheightExceededError } from '@solana/web3.js';

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

    const CONFIRMATION_METHOD_DURATION = 50_000; // Allow enough time for confirmTransaction to timeout
    const startTime = Date.now();
    const maxDurationMs = maxDuration * 1_000;

    let lastError: any = null;
    while (Date.now() - startTime < (maxDurationMs - CONFIRMATION_METHOD_DURATION)) {
        try {
            const result = await connection.confirmTransaction({ 
                signature, 
                ...(await connection.getLatestBlockhash()) 
            }, "confirmed");
            const success = result.value.err === null;

            return NextResponse.json({ 
                signature: signature,
                success: success,
                timeout: false,
            });
        } catch (error) {
            lastError = error;
        }
    }

    if (lastError instanceof TransactionExpiredBlockheightExceededError) {
        return NextResponse.json({
            signature: signature,
            success: false,
            timeout: true
        });
    }

    console.error(lastError);
    return NextResponse.json(
        { error: `Internal server error: ${lastError}` },
        { status: 500 }
    );
}
