import { PublicKey } from "@solana/web3.js";
import { captureError } from "./helpers";

export const getUsdcAPR = async () => {
    // TODO - Implement pulling real data
    return 0.119179;
}

export const getSolAPR = async () => {
    // TODO - Implement pulling real data
    return 0.027134;
}

export const getUsdcDailyBorrowRate = async () => await getUsdcAPR() / 365;
export const getSolDailyEarnRate = async () => await getSolAPR() / 365;

export const fetchDriftData = async (vaultAddress: PublicKey, marketIndices: number[]) => {
    try {
        const response = await fetch(`/api/drift-balance?address=${vaultAddress.toBase58()}&marketIndices=${marketIndices}`);
        if (!response.ok) throw new Error('Failed to fetch Drift data');

        const data = await response.json();
        const balances = marketIndices.map(index => {
            const value = Number(data[index]);
            return isNaN(value) ? NaN : value;
        });
        return balances;
    } catch (error: any) {
        console.error('Error fetching Drift data:', error);
        captureError("Could not fetch Drift data", "utils: /balance.ts", error);          
        return marketIndices.map(() => NaN);
    }
};
