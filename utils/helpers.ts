import config from "@/config/config";
import type { ShowErrorProps } from "@/context/error-provider";
import type { Connection, PublicKey } from "@solana/web3.js";
import { captureError } from "./errors";
import { getVaultPublicKey } from "@quartz-labs/sdk";

export const isVaultInitialized = async (connection: Connection, wallet: PublicKey) => {
    const vaultPda = getVaultPublicKey(wallet);
    const vaultPdaAccount = await connection.getAccountInfo(vaultPda);
    return (vaultPdaAccount !== null);
}

export const isVaultClosed = async (connection: Connection, wallet: PublicKey) => {
    const vaultPda = getVaultPublicKey(wallet);
    const vaultPdaAccount = await connection.getAccountInfo(vaultPda);
    if (vaultPdaAccount !== null) return false;
    
    // If account doesn't exist, check signature history. If we find some, it used to exist.
    const signatures = await connection.getSignaturesForAddress(vaultPda);
    const isSignatureHistory = (signatures.length > 0);
    return isSignatureHistory;
}

export async function isMissingBetaKey(wallet: PublicKey, showError: (props: ShowErrorProps) => void) {
    const requireBetaKey = (process.env.NEXT_PUBLIC_REQUIRE_BETA_KEY === "true");
    if (!requireBetaKey) return false;

    try {
        // Check compressed NFTs using Read API
        const response = await fetch(config.NEXT_PUBLIC_RPC_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 'User-NFTs',
                method: 'getAssetsByOwner',
                params: {
                    ownerAddress: wallet.toBase58(),
                    page: 1,
                    limit: 1000
                },
            }),
        });
        const { result } = await response.json();

        for (const asset of result.items) {
            if (asset.content.metadata.name && asset.content.metadata.name.includes("Quartz Pin")) {
                return false;
            }
        }
    } catch (error: any) {
        captureError(showError, "Could not fetch NFTs", "utils: /helpers.ts", error);
    }

    return true;
}