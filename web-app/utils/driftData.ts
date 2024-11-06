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

export const fetchDriftData = async(vaultAddress: PublicKey) => {
    const marketIndices = [DRIFT_MARKET_INDEX_SOL, DRIFT_MARKET_INDEX_USDC];

    const response = await fetch(`/api/drift-data?address=${vaultAddress}&marketIndices=${marketIndices}`);
    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`Failed to fetch Drift data: ${errorResponse.error}`);
    }

    const data = await response.json();
    return data;
}

