export const dynamic = 'force-dynamic';

import config from '@/src/config/config';
import { AccountStatus } from '@/src/types/enums/AccountStatus.enum';
import { getVaultPublicKey, retryWithBackoff } from '@quartz-labs/sdk';
import { Connection, PublicKey } from '@solana/web3.js';
import { NextResponse } from 'next/server';
import { z } from 'zod';

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
    const address = searchParams.get('wallet');
    if (!address) return NextResponse.json({ error: "Wallet address is required" }, { status: 400 });

    let pubkey;
    try {
        pubkey = new PublicKey(address);
    } catch {
        return NextResponse.json({ error: "Invalid wallet address" }, { status: 400 });
    }

    try {
        const [hasVaultHistory, isMissingBetaKey, isVaultInitialized, requiresUpgrade] = await Promise.all([
            checkHasVaultHistory(connection, pubkey),
            checkIsMissingBetaKey(connection, pubkey),
            checkIsVaultInitialized(connection, pubkey),
            checkRequiresUpgrade(connection, pubkey)
        ]);
        
        if (!isVaultInitialized && hasVaultHistory) return NextResponse.json({ status: AccountStatus.CLOSED });
        else if (isMissingBetaKey) return NextResponse.json({ status: AccountStatus.NO_BETA_KEY });
        else if (isVaultInitialized) {
            if (requiresUpgrade) return NextResponse.json({ status: AccountStatus.UPGRADE_REQUIRED });
            else return NextResponse.json({ status: AccountStatus.INITIALIZED });
        }
        else return NextResponse.json({ status: AccountStatus.NOT_INITIALIZED });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: `Internal server error: ${error}` },
            { status: 500 }
        );
    }
}

async function checkHasVaultHistory(connection: Connection, wallet: PublicKey): Promise<boolean> {
    const vaultPda = getVaultPublicKey(wallet);
    const signatures = await retryWithBackoff(
        async () => connection.getSignaturesForAddress(vaultPda),
        4
    );
    const isSignatureHistory = (signatures.length > 0);
    return isSignatureHistory;
}

async function checkIsMissingBetaKey(connection: Connection, address: PublicKey): Promise<boolean> {
    if (!config.NEXT_PUBLIC_REQUIRE_BETA_KEY) return false;

    const response = await fetch(connection.rpcEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'getAssetsByOwner',
            params: {
                ownerAddress: address.toBase58(),
                page: 1,
                limit: 1000
            },
        }),
    });
    
    const body = await response.json();
    if (!response.ok) throw new Error(body);

    for (const asset of body.result.items) {
        if (asset.content.metadata.name && asset.content.metadata.name.includes("Quartz Pin")) {
            return false;
        }
    }

    return true;
}

async function checkIsVaultInitialized(connection: Connection, wallet: PublicKey): Promise<boolean> {
    const vaultPda = getVaultPublicKey(wallet);
    const vaultPdaAccount = await retryWithBackoff(
        async () => connection.getAccountInfo(vaultPda),
        2
    );
    return (vaultPdaAccount !== null);
}

async function checkRequiresUpgrade(connection: Connection, wallet: PublicKey): Promise<boolean> {
    const vaultPda = getVaultPublicKey(wallet);
    const vaultPdaAccount = await retryWithBackoff(
        async () => connection.getAccountInfo(vaultPda),
        2
    );
    if (vaultPdaAccount === null) return false;

    const OLD_VAULT_SIZE = 41;
    return (vaultPdaAccount.data.length <= OLD_VAULT_SIZE);
}
