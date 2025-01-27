import type { Rate } from "@/src/types/interfaces/Rate.interface";
import type { AssetInfo } from "@/src/types/interfaces/AssetInfo.interface";
import { AddressLookupTableAccount, ComputeBudgetProgram, Connection, PublicKey, TransactionInstruction } from "@solana/web3.js";
import type { AnchorWallet } from "@solana/wallet-adapter-react";
import { VersionedTransaction } from "@solana/web3.js";
import { TransactionMessage } from "@solana/web3.js";
import { TxStatus, type TxStatusProps } from "../context/tx-status-provider";
import { MarketIndex, TOKENS, baseUnitToDecimal } from "@quartz-labs/sdk/browser";
import { DEFAULT_COMPUTE_UNIT_LIMIT } from "../config/constants";
import crypto from "crypto";

export function truncToDecimalPlaces(value: number, decimalPlaces: number): number {
    return Math.trunc(value * 10 ** decimalPlaces) / 10 ** decimalPlaces;
}

export const formatPreciseDecimal = (num: number) => {
    const str = num.toString();
    if (str.includes('e')) { // Convert scientific notation to fixed notation
        const e = parseInt(str.split('e')[1] || "0");
        if (e < 0) {
            return num.toFixed(-e).replace(/\.?0+$/, '');
        }
    }
    return str;
}

export function plusOrMinus(value: number, currency?: string): string {
    return value >= 0 ? `+${currency ?? ""}${value}` : `-${currency ?? ""}${Math.abs(value)}`;
}

export function rgb(hex: string): { r: number; g: number; b: number } {
    return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16)
    };
}

export function formatDollarValue(num: number, decimalPlaces: number = 1): [string, string] {
    const integerPart = Math.trunc(num).toLocaleString("en-US");

    let decimalPart = num.toString().split(".")[1] ?? "0".repeat(decimalPlaces);
    if (decimalPart.length < decimalPlaces) {
        decimalPart = decimalPart.padEnd(decimalPlaces, "0");
    } else {
        decimalPart = decimalPart.slice(0, decimalPlaces);
    }

    return [integerPart, decimalPart];
}

export function calculateBalanceDollarValues(prices: Record<MarketIndex, number>, balances: Record<MarketIndex, number>) {
    return MarketIndex.reduce((acc, marketIndex) => {
        const price = prices[marketIndex];
        const balance = baseUnitToDecimal(balances[marketIndex], marketIndex);
        acc[marketIndex] = price * balance;
        return acc;
    }, {} as Record<MarketIndex, number>);
}

export function calculateBalances(values: Record<MarketIndex, number>): {
    collateralBalance: number;
    loanBalance: number;
    netBalance: number;
} {
    let collateralBalance = 0;
    let loanBalance = 0;

    for (const marketIndex of MarketIndex) {
        const value = values[marketIndex];
        if (value > 0) collateralBalance += value;
        if (value < 0) loanBalance += Math.abs(value);
    }

    return {
        collateralBalance: truncToDecimalPlaces(collateralBalance, 2),
        loanBalance: truncToDecimalPlaces(loanBalance, 2),
        netBalance: truncToDecimalPlaces(collateralBalance - loanBalance, 2)
    }
}

export function calculateRateChanges(values: Record<MarketIndex, number>, rates: Record<MarketIndex, Rate>): {
    collateralRate: number;
    loanRate: number;
    netRate: number;
} {
    let collateralRate = 0;
    let loanRate = 0;

    for (const marketIndex of MarketIndex) {
        const value = values[marketIndex];
        const rate = rates[marketIndex];

        if (value > 0) collateralRate += (value * rate.depositRate) / 365;
        if (value < 0) loanRate += (Math.abs(value * rate.borrowRate)) / 365;
    }

    return {
        collateralRate: truncToDecimalPlaces(collateralRate, 4),
        loanRate: truncToDecimalPlaces(loanRate, 4),
        netRate: truncToDecimalPlaces(collateralRate - loanRate, 4)
    }
}

export function generateAssetInfos(prices: Record<MarketIndex, number>, balances: Record<MarketIndex, number>, rates: Record<MarketIndex, Rate>) {
    const suppliedAssets: AssetInfo[] = [];
    const borrowedAssets: AssetInfo[] = [];
    
    for (const marketIndex of MarketIndex) {
        const balance = baseUnitToDecimal(balances[marketIndex], marketIndex);
        const price = prices[marketIndex];
        const rate = rates[marketIndex];

        if (balance > 0) suppliedAssets.push({ marketIndex, balance, price, rate: rate.depositRate });
        else if (balance < 0) borrowedAssets.push({ marketIndex, balance, price, rate: rate.borrowRate });
    }

    suppliedAssets.sort((a, b) => (Math.abs(b.balance * b.price) - Math.abs(a.balance * a.price)));
    borrowedAssets.sort((a, b) => (Math.abs(b.balance * b.price) - Math.abs(a.balance * a.price)));

    return { suppliedAssets, borrowedAssets };
}

export function getDisplayWalletAddress(address: string) {
    return `(${address.slice(0, 4)}...${address.slice(-4)})` 
}

export function formatTokenDisplay(balance: number, marketIndex?: MarketIndex): string {
    if (marketIndex === undefined) {
        const truncedValue = balance < 999 
            ? truncToDecimalPlaces(balance, 5) 
            : balance < 99999
                ? truncToDecimalPlaces(balance, 2)
                : truncToDecimalPlaces(balance, 0);
        if (truncedValue === 0) return formatPreciseDecimal(balance);
        return formatPreciseDecimal(truncedValue);
    }

    const magnitude = Math.floor(Math.log10(Math.abs(balance))) + 1;
    
    let precision = TOKENS[marketIndex].decimalPrecision.toNumber();
    if (magnitude >= 3) {
        precision = Math.max(0, precision - (magnitude - 2));
    }

    const truncedValue = truncToDecimalPlaces(balance, precision);
    return formatPreciseDecimal(truncedValue);
}

export function getWsolMint() {
    const mint = Object.values(TOKENS).find(token => token.name === "SOL")?.mint;
    if (!mint) throw new Error("wSolMint not found");
    return mint;
}

export async function getTokenAccountBalance(connection: Connection, tokenAccount: PublicKey) {
    try {
        const balance = await connection.getTokenAccountBalance(tokenAccount);
        return Number(balance.value.amount);
    } catch {
        return 0;
    }
}

export function validateAmount(marketIndex: MarketIndex, amountDecimal: number, maxAmountBaseUnits: number, minAmountBaseUnits: number = 1) {
    const minAmountDecimal = baseUnitToDecimal(minAmountBaseUnits, marketIndex);
    const maxAmountDecimal = baseUnitToDecimal(maxAmountBaseUnits, marketIndex);

    if (isNaN(amountDecimal)) return "Invalid input";
    if (amountDecimal > maxAmountDecimal) return `Maximum amount: ${maxAmountDecimal}`;
    if (amountDecimal < minAmountDecimal) return `Minimum amount: ${minAmountDecimal}`;
    return "";
}

export async function fetchAndParse(url: string, req?: RequestInit): Promise<any> {
    const response = await fetch(url, req);
    const body = await response.json();

    if (!response.ok) throw new Error(JSON.stringify(body.error) ?? `Could not fetch ${url}`);
    return body;
}

export function getTokenIcon(marketIndex: MarketIndex) {
    return `/tokens/${TOKENS[marketIndex].name.toLowerCase()}.webp`;
}

export function buildEndpointURL(baseEndpoint: string, params?: Record<string, any>) {
    if (!params) return baseEndpoint;

    const stringParams: Record<string, string> = {};
    for (const [key, value] of Object.entries(params)) {
        stringParams[key] = String(value);
    }
    const searchParams = new URLSearchParams(stringParams);
    return `${baseEndpoint}${params ? `?${searchParams.toString()}` : ''}`;
}

export function deserializeTransaction(serializedTx: string): VersionedTransaction {
    const buffer = Buffer.from(serializedTx, "base64");
    return VersionedTransaction.deserialize(buffer);
}

export async function getComputeUnitLimit(
    connection: Connection,
    instructions: TransactionInstruction[],
    address: PublicKey,
    blockhash: string,
    lookupTables: AddressLookupTableAccount[] = []
) {
    const messageV0 = new TransactionMessage({
        payerKey: address,
        recentBlockhash: blockhash,
        instructions: instructions
    }).compileToV0Message(lookupTables);
    const simulation = await connection.simulateTransaction(
        new VersionedTransaction(messageV0)
    );

    const estimatedComputeUnits = simulation.value.unitsConsumed;
    const computeUnitLimit = estimatedComputeUnits 
        ? Math.ceil(estimatedComputeUnits * 1.3) 
        : DEFAULT_COMPUTE_UNIT_LIMIT;
    return computeUnitLimit;
}

export async function getComputerUnitLimitIx(
    connection: Connection,
    instructions: TransactionInstruction[],
    address: PublicKey,
    blockhash: string,
    lookupTables: AddressLookupTableAccount[] = []
) {
    const computeUnitLimit = await getComputeUnitLimit(connection, instructions, address, blockhash, lookupTables);
    return ComputeBudgetProgram.setComputeUnitLimit({
        units: computeUnitLimit,
    });
}

export async function getComputeUnitPrice() {
    // TODO: Calculate actual fee
    return 1_250_000;
};

export async function getComputeUnitPriceIx() {
    const computeUnitPrice = await getComputeUnitPrice();
    return ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: computeUnitPrice,
    });
}

export async function buildTransaction(
    connection: Connection,
    instructions: TransactionInstruction[], 
    address: PublicKey,
    lookupTables: AddressLookupTableAccount[] = []
): Promise<VersionedTransaction> {
    const blockhash = (await connection.getLatestBlockhash()).blockhash;
    const ix_computeLimit = await getComputerUnitLimitIx(connection, instructions, address, blockhash, lookupTables);
    const ix_computePrice = await getComputeUnitPriceIx();
    instructions.unshift(ix_computeLimit, ix_computePrice);

    const messageV0 = new TransactionMessage({
        payerKey: address,
        recentBlockhash: blockhash,
        instructions: instructions
    }).compileToV0Message(lookupTables);
    const transaction = new VersionedTransaction(messageV0);
    return transaction;
}

export async function signAndSendTransaction(
    transaction: VersionedTransaction, 
    wallet: AnchorWallet, 
    showTxStatus: (props: TxStatusProps) => void,
    skipPreflight: boolean = false
): Promise<string> {
    showTxStatus({ status: TxStatus.SIGNING });
    const signedTx = await wallet.signTransaction(transaction);

    const serializedTransaction = Buffer.from(signedTx.serialize()).toString("base64");

    const url = "/api/send-tx";
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            transaction: serializedTransaction,
            skipPreflight: skipPreflight
        }),
    });
    const body = await response.json();

    if (!response.ok) {
        if (body.error.includes("Blockhash not found")) {
            showTxStatus({ status: TxStatus.BLOCKHASH_EXPIRED });
            return "";
        } else {
            throw new Error(JSON.stringify(body.error) ?? `Could not fetch ${url}`); 
        }
    }

    showTxStatus({ 
        signature: body.signature,
        status: TxStatus.SENT 
    });
    return body.signature;
}

export async function signAndSendAllTransactions(
    transactions: VersionedTransaction[], 
    wallet: AnchorWallet, 
    showTxStatus: (props: TxStatusProps) => void,
    skipPreflight: boolean = false
): Promise<string[]> {
    showTxStatus({ status: TxStatus.SIGNING });
    const signedTxs = await wallet.signAllTransactions(transactions);

    const serializedTransactions = signedTxs.map(tx => Buffer.from(tx.serialize()).toString("base64"));

    const signatures: string[] = [];

    for (const serializedTransaction of serializedTransactions) {
        const url = "/api/send-tx";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                transaction: serializedTransaction,
                skipPreflight: skipPreflight
            }),
        });
        const body = await response.json();

        if (!response.ok) {
            if (body.error.includes("Blockhash not found")) {
                showTxStatus({ status: TxStatus.BLOCKHASH_EXPIRED });
                return [];
            } else {
                throw new Error(JSON.stringify(body.error) ?? `Could not fetch ${url}`); 
            }
        }

        showTxStatus({ 
            signature: body.signature,
            status: TxStatus.SENT 
        });
        signatures.push(body.signature);
    }
    return signatures;
}

export async function generateSessionId(pem: string) {
    if (!pem) throw new Error("pem is required");

    const secretKey = crypto.randomUUID().replace(/-/g, "");
    const secretKeyBase64 = Buffer.from(secretKey, "hex").toString("base64");
    const secretKeyBase64Buffer = Buffer.from(secretKeyBase64, "utf-8");
    const secretKeyBase64BufferEncrypted = crypto.publicEncrypt(
        {
            key: pem,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        },
        secretKeyBase64Buffer,
    );

    return {
        secretKey,
        sessionId: secretKeyBase64BufferEncrypted.toString("base64"),
    };
}

export async function decryptSecret(base64Secret: string, base64Iv: string, secretKey: string) {
    if (!base64Secret) throw new Error("base64Secret is required");
    if (!base64Iv) throw new Error("base64Iv is required");
    if (!secretKey || !/^[0-9A-Fa-f]+$/.test(secretKey)) {
        throw new Error("secretKey must be a hex string");
    }

    const secret = Buffer.from(base64Secret, "base64");
    const iv = Buffer.from(base64Iv, "base64");
    const secretKeyBuffer = Buffer.from(secretKey, "hex");


    const cryptoKey = crypto.createDecipheriv("aes-128-gcm", secretKeyBuffer, iv);
    cryptoKey.setAutoPadding(false);

    const decrypted = cryptoKey.update(secret);

    return decrypted.toString("utf-8");
}