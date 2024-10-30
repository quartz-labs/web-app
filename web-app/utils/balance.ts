import { PublicKey } from "@solana/web3.js";
import { ShowErrorProps } from "@/context/error-provider";
import { captureError } from "@/utils/errors";

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

export const fetchDriftData = async (showError: (props: ShowErrorProps) => void, vaultAddress: PublicKey, marketIndices: number[]) => {
    try {
        const response = await fetch(`/api/drift-balance?address=${vaultAddress.toBase58()}&marketIndices=${marketIndices}`);
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(`Failed to fetch Drift data: ${errorResponse.error}`);
        }

        const data = await response.json();
        const balances = marketIndices.map(index => {
            const value = Number(data[index]);
            return isNaN(value) ? NaN : value;
        });
        return balances;
    } catch (error) {
        captureError(showError, "Could not fetch Drift data", "utils: /balance.ts", error, vaultAddress);          
        return marketIndices.map(() => NaN);
    }
};
