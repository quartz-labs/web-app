import { PublicKey } from "@solana/web3.js";

export const getUsdcDailyBorrowRate = async () => {
    // TODO - Implement pulling real data

    return 0.133799 / 365;
}

export const getSolDailyEarnRate = async () => {
    // TODO - Implement pulling real data

    return 0.012636 / 365;
}

export const fetchDriftData = async (vaultAddress: PublicKey, marketIndices: number[]) => {
    try {
        const response = await fetch(`/api/drift-data?address=${vaultAddress.toBase58()}&marketIndices=${marketIndices}`);
        if (!response.ok) throw new Error('Failed to fetch Drift data');

        const data = await response.json();
        const balances = marketIndices.map(index => data[index] || NaN);
        return balances;
    } catch (error) {
        console.error('Error fetching Drift data:', error);
        return marketIndices.map(() => NaN);
    }
};
