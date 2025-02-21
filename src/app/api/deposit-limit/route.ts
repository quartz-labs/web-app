export const dynamic = 'force-dynamic';

import { Connection } from '@solana/web3.js';
import { PublicKey } from '@solana/web3.js';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { MICRO_LAMPORTS_PER_LAMPORT } from '@/src/config/constants';
import { AccountLayout } from '@solana/spl-token';
import { getAssociatedTokenAddress } from '@solana/spl-token';
import { getMarketIndicesRecord, getTokenProgram, MarketIndex, TOKENS } from '@quartz-labs/sdk/browser';
import { makeDepositIxs } from '../_utils/utils.server';
import { QuartzClient } from '@quartz-labs/sdk';
import { getComputeUnitLimit, getComputeUnitPrice } from '@/src/utils/helpers';

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

    try {
        const limits = getMarketIndicesRecord<number>(0);
        for (const marketIndex of MarketIndex) {
            limits[marketIndex] = await fetchDepositLimit(connection, pubkey, marketIndex);
        }
        
        return NextResponse.json(limits);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: `Internal server error: ${error}` },
            { status: 500 }
        );
    }
}

async function fetchDepositLimit(connection: Connection, pubkey: PublicKey, marketIndex: MarketIndex): Promise<number> {
    const [marketIndexSolString] = Object.entries(TOKENS).find(([, token]) => token.name === "SOL") ?? [];
    const marketIndexSol = Number(marketIndexSolString);
    if (isNaN(marketIndexSol)) {
        throw new Error("SOL market index not found");
    }

    if (marketIndex === marketIndexSol) {
        return await fetchMaxDepositLamports(pubkey, connection, marketIndexSol);
    }
    
    return await fetchMaxDepositSpl(pubkey, connection, TOKENS[marketIndex].mint);
}

async function fetchMaxDepositLamports(pubkey: PublicKey, connection: Connection, marketIndexSol: MarketIndex) {
    const quartzClient = await QuartzClient.fetchClient(connection);
    const user = await quartzClient.getQuartzAccount(pubkey);
    const balanceLamportsPromise = connection.getBalance(pubkey);
    const wSolAtaRentPromise = connection.getMinimumBalanceForRentExemption(AccountLayout.span);
    const depositPromise = makeDepositIxs(connection, pubkey, 1, marketIndexSol, user, false);

    const [
        deposit,
        blockhash
    ] = await Promise.all([
        depositPromise,
        connection.getLatestBlockhash().then(res => res.blockhash)
    ]);
    const { ixs: depositIxs } = deposit;

    const [
        computeUnitLimit, 
        computeUnitPrice,
        balanceLamports,
        wSolAtaRent
    ] = await Promise.all([
        getComputeUnitLimit(connection, depositIxs, pubkey, blockhash, []),
        getComputeUnitPrice(),
        balanceLamportsPromise,
        wSolAtaRentPromise
    ]);

    const baseSignerFeeLamports = 5000;
    const priorityFeeLamports = (computeUnitPrice * computeUnitLimit ) / MICRO_LAMPORTS_PER_LAMPORT;
    const maxDeposit = balanceLamports - (wSolAtaRent * 2) - (baseSignerFeeLamports + priorityFeeLamports);

    return Math.max(maxDeposit, 0);
}

async function fetchMaxDepositSpl(pubkey: PublicKey, connection: Connection, mint: PublicKey) {
    const tokenProgram = await getTokenProgram(connection, mint);
    const tokenAccount = await getAssociatedTokenAddress(mint, pubkey, false, tokenProgram);
    try {
        const balance = await connection.getTokenAccountBalance(tokenAccount);
        return Number(balance.value.amount);
    } catch {
        return 0;
    }
}
