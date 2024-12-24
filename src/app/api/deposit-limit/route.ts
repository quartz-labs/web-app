export const dynamic = 'force-dynamic';

import { Connection } from '@solana/web3.js';
import { PublicKey } from '@solana/web3.js';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { DRIFT_MARKET_INDEX_SOL, SUPPORTED_DRIFT_MARKETS } from "@quartz-labs/sdk";
import { MICRO_LAMPORTS_PER_LAMPORT, type MarketIndex } from '@/src/config/constants';
import { AccountLayout } from '@solana/spl-token';
import { getAssociatedTokenAddress } from '@solana/spl-token';
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
    
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    if (!address) return NextResponse.json({ error: "Wallet address is required" }, { status: 400 });

    let pubkey;
    try {
        pubkey = new PublicKey(address);
    } catch {
        return NextResponse.json({ error: "Invalid wallet address" }, { status: 400 });
    }

    const marketIndexParam = searchParams.get('marketIndex');
    if (!marketIndexParam) return NextResponse.json({ error: "Market index is required" }, { status: 400 });

    const marketIndex = parseInt(marketIndexParam);
    if (isNaN(marketIndex) || !SUPPORTED_DRIFT_MARKETS.includes(marketIndex as any)) {
        return NextResponse.json({ error: "Invalid market index" }, { status: 400 });
    }

    try {
        const limit = await fetchDepositLimit(connection, pubkey, marketIndex as MarketIndex);
        return NextResponse.json(limit);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: `Internal server error: ${error}` },
            { status: 500 }
        );
    }
}

async function fetchDepositLimit(connection: Connection, pubkey: PublicKey, marketIndex: MarketIndex): Promise<number> {
    if (marketIndex === DRIFT_MARKET_INDEX_SOL) {
        return await fetchMaxDepositLamports(pubkey, connection);
    }
    
    return await fetchMaxDepositSpl(pubkey, connection, TOKENS[marketIndex].mintAddress);
}

async function fetchMaxDepositLamports(pubkey: PublicKey, connection: Connection) {
    const balanceLamports = await connection.getBalance(pubkey);

    const ataSize = AccountLayout.span;
    const wSolAtaRent = await connection.getMinimumBalanceForRentExemption(ataSize);

    // TODO - Fetch proper priority fee
    const computeUnitPriceMicroLamports = 1_000_000;
    const baseSignerFeeLamports = 5000;
    const priorityFeeLamports = (computeUnitPriceMicroLamports * 200_000 ) / MICRO_LAMPORTS_PER_LAMPORT;
    const maxDeposit = balanceLamports - (wSolAtaRent * 2) - (baseSignerFeeLamports + priorityFeeLamports);

    return Math.max(maxDeposit, 0);
}

async function fetchMaxDepositSpl(pubkey: PublicKey, connection: Connection, mint: PublicKey) {
    const tokenAccount = await getAssociatedTokenAddress(mint, pubkey);
    const balance = await connection.getTokenAccountBalance(tokenAccount);
    return Number(balance.value.amount);
}
