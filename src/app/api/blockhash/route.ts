import { Connection, TransactionInstruction, Keypair, Transaction } from '@solana/web3.js';
import { PublicKey } from '@solana/web3.js';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { DRIFT_MARKET_INDEX_SOL, DRIFT_MARKET_INDEX_USDC, SUPPORTED_DRIFT_MARKETS, WSOL_MINT } from '../../../../../sdk/package/dist/config/constants';
import { MICRO_LAMPORTS_PER_LAMPORT, type MarketIndex } from '@/src/config/constants';
import { AccountLayout } from '@solana/spl-token';
import { getAssociatedTokenAddress } from '@solana/spl-token';
import { USDC_MINT } from '@quartz-labs/sdk';
import { TOKENS } from '@/src/config/tokens';

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
