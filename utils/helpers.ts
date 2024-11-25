import { AddressLookupTableAccount, PublicKey, TransactionInstruction, Connection, Keypair, Transaction } from "@solana/web3.js";
import { getVault } from "./getAccounts";
import { createAssociatedTokenAccountInstruction } from "@solana/spl-token";
import { MarginfiAccountWrapper } from "@mrgnlabs/marginfi-client-v2";
import BigNumber from "bignumber.js";
import { Amount } from "@mrgnlabs/mrgn-common";
import { BN } from "@coral-xyz/anchor";
import { QUARTZ_HEALTH_BUFFER_PERCENTAGE, RPC_URL } from "./constants";
import { ShowErrorProps } from "@/context/error-provider";
import { captureError } from "@/utils/errors";

export const isVaultInitialized = async (connection: Connection, wallet: PublicKey) => {
    const vaultPda = getVault(wallet);
    const vaultPdaAccount = await connection.getAccountInfo(vaultPda);
    return (vaultPdaAccount !== null);
}

export const isVaultClosed = async (connection: Connection, wallet: PublicKey) => {
    const vaultPda = getVault(wallet);
    
    const vaultPdaAccount = await connection.getAccountInfo(vaultPda);
    if (vaultPdaAccount !== null) return false;
    
    // If account doesn't exist, check signature history. If we find some, it used to exist.
    const signatures = await connection.getSignaturesForAddress(vaultPda);
    const isSignatureHistory = (signatures.length > 0);
    return isSignatureHistory;
}

export const truncateToDecimalPlaces = (num: number, place: number) => {
    const multiplier = Math.pow(10, place);
    return Math.trunc(num * multiplier) / multiplier;
}

export const truncateToDecimalPlacesAbsolute = (num: number, place: number) => {
    const truncated = truncateToDecimalPlaces(num, place);
    return Math.abs(truncated);
}

export const roundToDecimalPlaces = (num: number, place: number) => {
    const multiplier = Math.pow(10, place);
    return Math.round(num * multiplier + Number.EPSILON) / multiplier; // Add epsilon to help with floating points
}

export const getSign = (num: number, decimalPrecision: number) => {
    // Return + if number will be displayed as 0
    const minNumber = 1 / 10 ** decimalPrecision;
    if (Math.abs(num) < minNumber) return "+";

    // Otherwise display the true sign
    if (num < 0) return "-";
    else return "+"
}

export const baseUnitToUi = (amountBase: number | BN, decimals: number): string => {
    const amountBN = BN.isBN(amountBase) ? amountBase : new BN(amountBase);

    if (amountBN.isNeg()) {
        throw new Error('Negative amounts not allowed');
    }

    if (decimals < 0 || decimals > 20) { // 20 is a safe upper limit for most tokens
        throw new Error('Decimals must be between 0 and 20');
    }

    // Convert to string and handle padding
    const amountStr = amountBN.toString();
    const paddedStr = amountStr.padStart(decimals + 1, '0'); // +1 to ensure we always have at least one digit before decimal

    // Split into whole and decimal parts
    const wholeStr = paddedStr.slice(0, -decimals) || '0';
    const decimalStr = paddedStr.slice(-decimals);

    // Return formatted string, trimming trailing zeros after decimal
    if (decimals === 0) return wholeStr;
    const trimmed = `${wholeStr}.${decimalStr}`.replace(/\.?0+$/, '');
    return trimmed === '' ? '0' : trimmed;
}

export const uiToBaseUnit = (amountUi: number | BigNumber, decimals: number): BigNumber => {
    const input = new BigNumber(amountUi);
    const multiplier = new BigNumber(10 ** decimals);
    const baseUnits = input.times(multiplier).integerValue();
    return baseUnits;
}

export const divideBN = (a: BN, b: BN) => {
    return a.div(b).toNumber() + a.mod(b).toNumber();
}

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function makeFlashLoanTx(
    marginfiAccount: MarginfiAccountWrapper,
    amountUi: Amount,
    bankAddress: PublicKey,
    instructions: TransactionInstruction[],
    lookupTables: AddressLookupTableAccount[],
    priorityFeeUi?: number,
    createAtas: boolean = true,
) {
    return marginfiAccount.makeLoopTx(
        amountUi,
        amountUi,
        bankAddress,
        bankAddress,
        instructions,
        lookupTables,
        priorityFeeUi,
        createAtas
    );
}

export async function createAtaIfNeeded(
    connection: Connection,
    ata: PublicKey,
    authority: PublicKey,
    mint: PublicKey
) {
    const oix_createAta: TransactionInstruction[] = [];
    const ataInfo = await connection.getAccountInfo(ata);
    if (ataInfo === null) {
        oix_createAta.push(
            createAssociatedTokenAccountInstruction(
                authority,
                ata,
                authority,
                mint
            )
        );
    }
    return oix_createAta;
}

export async function hasBetaKey(wallet: PublicKey, showError: (props: ShowErrorProps) => void) {
    const requireBetaKey = (process.env.NEXT_PUBLIC_REQUIRE_BETA_KEY === "true");
    if (!requireBetaKey) return true;

    try {
        // Check compressed NFTs using Read API
        const response = await fetch(RPC_URL, {
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
                return true;
            }
        }
    } catch (error: any) {
        console.error("Error fetching NFTs:", error);
        captureError(showError, "Could not fetch NFTs", "utils: /helpers.ts", error);
    }

    return false;
}

export async function getAccountsFromInstructions(connection: Connection, instructions: TransactionInstruction[]) {
    const tx = new Transaction();
    instructions.forEach(ix => tx.add(ix));
    
    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    tx.feePayer = Keypair.generate().publicKey;

    const accounts = tx.compileMessage().accountKeys;
    const accountKeys = accounts.map(key => key.toBase58());
    return accountKeys;
}

export function getDisplayWalletAddress(address: string) {
    return `(${address.slice(0, 4)}...${address.slice(-4)})` 
}

export function getQuartzHealthFromDrift(driftHealth: number): number {
    if (driftHealth <= 0) return 0;
    if (driftHealth >= 100) return 100;

    return Math.floor(
        Math.min(
            100,
            Math.max(
                0,
                (driftHealth - QUARTZ_HEALTH_BUFFER_PERCENTAGE) / (1 - (QUARTZ_HEALTH_BUFFER_PERCENTAGE / 100))
            )
        )
    );
}
