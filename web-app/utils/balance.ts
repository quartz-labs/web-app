import { PublicKey } from "@solana/web3.js";

export const getUsdcDailyBorrowRate = async () => {
    // TODO - Implement pulling real data

    return 0.1125 / 365;
}

export const getSolDailyEarnRate = async () => {
    // TODO - Implement pulling real data

    return 0.07 / 365;
}

export const fetchDriftData = async (vaultAddress: PublicKey, token: string) => {
    try {
        const response = await fetch('/api/drift-data?address=' + vaultAddress.toBase58() + "&token=" + token);

        const data = await response.json();
        console.log("Data from drift api call: ", data);
        if (!response.ok) {
            throw new Error('Failed to fetch Drift data');
        }
        return data.tokenAmount;
    } catch (error) {
        console.error('Error fetching Drift data:', error);
    }
};
