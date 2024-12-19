import { NextResponse } from 'next/server';
import { z } from 'zod';

const envSchema = z.object({
    RPC_URL: z.string().url(),
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

    try {
        const signature = await sendTransaction(env.RPC_URL);
        return NextResponse.json({ signature: signature });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: `Internal server error: ${error}` },
            { status: 500 }
        );
    }
}

async function sendTransaction(rpcUrl: string): Promise<string> {
    // TODO: Implement
    throw new Error("Not implemented");
}