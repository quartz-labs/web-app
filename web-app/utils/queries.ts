import { useQuery } from "@tanstack/react-query";
import { DRIFT_MARKET_INDEX_SOL, DRIFT_MARKET_INDEX_USDC } from "./constants";
import { getVault } from "./getAccounts";
import { AccountData } from "./accountData";
import { captureError } from "./errors";
import { useError } from "@/context/error-provider";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

export function useDriftDataQuery() {   
    const wallet = useAnchorWallet();
    const { showError } = useError();

    const queryKey = ['driftData'];
    const queryFn = async () => {
        if (!wallet) throw new Error("No public key provided");

        const marketIndices = [DRIFT_MARKET_INDEX_SOL, DRIFT_MARKET_INDEX_USDC];
        const vault = getVault(wallet.publicKey);

        const response = await fetch(`/api/drift-data?address=${vault}&marketIndices=${marketIndices}`)
        const responseJson = await response.json();

        if (responseJson.error) throw new Error(responseJson.error);
        if (responseJson.balances === undefined || responseJson.withdrawLimits === undefined || 
            responseJson.rates === undefined || responseJson.health === undefined) {
            throw new Error("Invalid response from server");
        }

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

    const response =  useQuery({ 
        queryKey, 
        queryFn,
        refetchInterval: 60_000,
        staleTime: Infinity,
        enabled: !!wallet
    });

    if (response.error) {
        captureError(showError, "Could not fetch Drift data", "./app/dashboard/page.tsx", response.error, wallet?.publicKey, true);
    }

    return response;
}

export function useSolPriceQuery() {
    const wallet = useAnchorWallet();
    const { showError } = useError();

    const queryKey = ['solPrice'];
    const queryFn = async () => {
        const response = await fetch("/api/solana-price");
        return await response.json();
    };

    const response = useQuery({
        queryKey,
        queryFn,
        refetchInterval: 60_000
    });

    if (response.error) {
        captureError(showError, "Could not fetch SOL price", "./app/dashboard/page.tsx", response.error, wallet?.publicKey, true);
    }

    return response;
}
