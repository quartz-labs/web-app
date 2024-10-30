import { PublicKey } from "@solana/web3.js";

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
    const response = await fetch(`/api/drift-balance?address=${vaultAddress.toBase58()}&marketIndices=${marketIndices}`);
    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`Failed to fetch Drift data: ${errorResponse.error}`);
    }

    const data = await response.json();
    const balances = marketIndices.map(index => Number(data[index]));
    if (balances.some(isNaN)) throw new Error(`Drift Balance is NaN, instead found ${data}`);

    return balances;
};

export const fetchSolPrice = async() => {
    const response = await fetch('/api/solana-price');
    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`Failed to fetch Drift data: ${errorResponse.error}`);
    }
    const responseJson = await response.json();

    const solPrice = Number(responseJson);
    if (isNaN(solPrice)) throw new Error(`Sol price is NaN, instead found ${responseJson}`);

    return solPrice;
}
