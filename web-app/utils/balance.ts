import { PublicKey } from "@solana/web3.js";

export interface BalanceInfo {
  solUi: number | null;
  usdcUi: number | null;
  solPriceUSD: number | null;
}

export const getUsdcApr = async () => {
    // TODO - Implement pulling real data
    return 0.147359;
}

export const getSolApy = async () => {
    // TODO - Implement pulling real data
    return 0.009712;
}

export const fetchDriftRates = async (marketIndices: number[]) => {
    const response = await fetch(`/api/drift-rates?marketIndices=${marketIndices}`);
    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`Failed to fetch Drift rates: ${errorResponse.error}`);
    }

    const data = await response.json();
    return data;
}

export const fetchDriftBalance = async (vaultAddress: PublicKey, marketIndices: number[]) => {
    const response = await fetch(`/api/drift-balance?address=${vaultAddress.toBase58()}&marketIndices=${marketIndices}`);
    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`Failed to fetch Drift balance: ${errorResponse.error}`);
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
