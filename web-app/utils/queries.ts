import { PublicKey } from "@solana/web3.js";
import { useQuery } from "@tanstack/react-query";
import { DRIFT_MARKET_INDEX_SOL, DRIFT_MARKET_INDEX_USDC } from "./constants";
import { getVault } from "./getAccounts";
import { AccountData } from "./accountData";

export function useDriftDataQuery(publicKey?: PublicKey) {
    const queryKey = ['driftData'];
    const queryFn = async () => {
        if (!publicKey) throw new Error("No public key provided");

        const marketIndices = [DRIFT_MARKET_INDEX_SOL, DRIFT_MARKET_INDEX_USDC];
        const vault = getVault(publicKey);

        const response = await fetch(`/api/drift-data?address=${vault}&marketIndices=${marketIndices}`)
        const responseJson = await response.json();
        const data: AccountData = {
            solBalanceBaseUnits: responseJson.balances[0],
            usdcBalanceBaseUnits: Math.abs(responseJson.balances[1]),
            solWithdrawLimitBaseUnits: responseJson.withdrawLimits[0],
            usdcWithdrawLimitBaseUnits: responseJson.withdrawLimits[1],
            solRate: responseJson.rates[0].depositRate,
            usdcRate: responseJson.rates[1].borrowRate,
            health: responseJson.health
            };
        return data;
    };

    return useQuery({ 
        queryKey, 
        queryFn,
        refetchInterval: 60_000,
        staleTime: Infinity
    });
}

export function useSolPriceQuery() {
    const queryKey = ['solPrice'];
    const queryFn = async () => {
        const response = await fetch("/api/solana-price");
        return await response.json();
    };

    return useQuery({
        queryKey,
        queryFn,
        refetchInterval: 60_000
    });
}