import { type MarketIndex } from "@/src/config/constants";
import type { Rate } from "@/src/types/interfaces/Rate.interface";
import type { AssetInfo } from "@/src/types/interfaces/AssetInfo.interface";
import { DRIFT_MARKET_INDEX_SOL, DRIFT_MARKET_INDEX_USDC, SUPPORTED_DRIFT_MARKETS } from "@quartz-labs/sdk";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { TOKENS } from "../config/tokens";

export async function waitForSignature(signature: string): Promise<void> {
    try {
        // TODO: Wait for transaction confirmation
    } catch (error) {
        // TODO: Handle timeout
    }
    
    throw new Error("Not implemented");
}

export function baseUnitToDecimal(baseUnits: number, marketIndex: MarketIndex): number {
    const token = TOKENS[marketIndex];
    return baseUnits / (10 ** token.decimalPrecision);
}

export function truncToDecimalPlaces(value: number, decimalPlaces: number): number {
    return Math.trunc(value * 10 ** decimalPlaces) / 10 ** decimalPlaces;
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
    return SUPPORTED_DRIFT_MARKETS.reduce((acc, marketIndex) => {
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

    for (const marketIndex of SUPPORTED_DRIFT_MARKETS) {
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

    for (const marketIndex of SUPPORTED_DRIFT_MARKETS) {
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
    let suppliedAssets: AssetInfo[] = [];
    let borrowedAssets: AssetInfo[] = [];
    
    for (const marketIndex of SUPPORTED_DRIFT_MARKETS) {
        const balance = baseUnitToDecimal(balances[marketIndex], marketIndex);
        const price = prices[marketIndex];
        const rate = rates[marketIndex];

        if (balance > 0) suppliedAssets.push({ marketIndex, balance, price, rate: rate.depositRate });
        else if (balance < 0) borrowedAssets.push({ marketIndex, balance, price, rate: rate.borrowRate });
    }

    return { suppliedAssets, borrowedAssets };
}

export function getDisplayWalletAddress(address: string) {
    return `(${address.slice(0, 4)}...${address.slice(-4)})` 
}