import { PublicKey } from "@solana/web3.js";
import { DRIFT_MARKET_INDEX_SOL, DRIFT_MARKET_INDEX_USDC } from "./constants";

export interface AccountData {
    solBalanceBaseUnits: number;
    usdcBalanceBaseUnits: number;
    solWithdrawLimitBaseUnits: number;
    usdcWithdrawLimitBaseUnits: number;
    solRate: number;
    usdcRate: number;
    health: number;
}

export const fetchDriftData = async (vaultAddress: PublicKey) => {
    const marketIndices = [DRIFT_MARKET_INDEX_SOL, DRIFT_MARKET_INDEX_USDC];
    const url = `/api/drift-data?address=${vaultAddress}&marketIndices=${marketIndices}`;

    const FETCH_TIMEOUT_MS = 30_000;
    const startTime = Date.now();

    let lastError;
    while (Date.now() - startTime < FETCH_TIMEOUT_MS) {
        try {
            const controller = new AbortController();
            const timeRemaining = FETCH_TIMEOUT_MS - (Date.now() - startTime);
            const timeoutId = setTimeout(() => controller.abort(), timeRemaining);
        
            const response = await fetch(url, { signal: controller.signal });
            clearTimeout(timeoutId);
        
            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.error);
            }
        
            const data = await response.json();
            return data;
        } catch (error) {
            lastError = error;

            if (Date.now() - startTime >= FETCH_TIMEOUT_MS) break;

            console.error("Error fetching Drift data, retrying...");
            await new Promise((resolve) => setTimeout(resolve, 2000)); 
        }
    };

    throw lastError;
}
