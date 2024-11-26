import { useQuery } from "@tanstack/react-query";
import { DRIFT_MARKET_INDEX_SOL, DRIFT_MARKET_INDEX_USDC } from "./constants";
import { getVault } from "./getAccounts";
import { captureError } from "./errors";
import { useError } from "@/context/error-provider";
import { useAnchorWallet } from "@solana/wallet-adapter-react"


export function useDriftRateQuery() {   
    const { showError } = useError();

    const queryKey = ['driftRate'];
    const queryFn = async () => {
        const marketIndices = [DRIFT_MARKET_INDEX_SOL, DRIFT_MARKET_INDEX_USDC];

        const response = await fetch(`/api/drift/rate?marketIndices=${marketIndices}`)
        const body = await response.json();
        if (!response.ok) throw new Error(body.error);

        return {
            depositRate: body.depositRate,
            withdrawRate: body.withdrawRate
        };
    };

    const response =  useQuery({ 
        queryKey, 
        queryFn,
        refetchInterval: 60_000,
        staleTime: Infinity
    });

    if (response.error) {
        captureError(showError, "Could not fetch Drift rate", "./app/dashboard/page.tsx", response.error, undefined, true);
    }

    return response;
}


export function useDriftBalanceQuery() {   
    const wallet = useAnchorWallet();
    const { showError } = useError();

    const queryKey = ['driftBalance'];
    const queryFn = async () => {
        if (!wallet) throw new Error("No public key provided");

        const marketIndices = [DRIFT_MARKET_INDEX_SOL, DRIFT_MARKET_INDEX_USDC];
        const vault = getVault(wallet.publicKey);

        const response = await fetch(`/api/drift/balance?address=${vault}&marketIndices=${marketIndices}`)
        const body = await response.json();
        if (!response.ok) throw new Error(body.error);

        return {
            lamports: body[0],
            usdc: Math.abs(body[1])
        };
    };

    const response =  useQuery({ 
        queryKey, 
        queryFn,
        refetchInterval: 60_000,
        staleTime: Infinity,
        enabled: !!wallet
    });

    if (response.error) {
        captureError(showError, "Could not fetch Drift balance", "./app/dashboard/page.tsx", response.error, wallet?.publicKey, true);
    }

    return response;
}


export function useDriftWithdrawLimitQuery() {   
    const wallet = useAnchorWallet();
    const { showError } = useError();

    const queryKey = ['driftWithdrawLimit'];
    const queryFn = async () => {
        if (!wallet) throw new Error("No public key provided");

        const marketIndices = [DRIFT_MARKET_INDEX_SOL, DRIFT_MARKET_INDEX_USDC];
        const vault = getVault(wallet.publicKey);

        const response = await fetch(`/api/drift/withdraw-limit?address=${vault}&marketIndices=${marketIndices}`)
        const body = await response.json();
        if (!response.ok) throw new Error(body.error);

        return {
            lamports: body[0],
            usdc: body[1]
        };
    };

    const response =  useQuery({ 
        queryKey, 
        queryFn,
        refetchInterval: 60_000,
        staleTime: Infinity,
        enabled: !!wallet
    });

    if (response.error) {
        captureError(showError, "Could not fetch Drift withdrawal limit", "./app/dashboard/page.tsx", response.error, wallet?.publicKey, true);
    }

    return response;
}


export function useDriftHealthQuery() {   
    const wallet = useAnchorWallet();
    const { showError } = useError();

    const queryKey = ['driftHealth'];
    const queryFn = async () => {
        if (!wallet) throw new Error("No public key provided");

        const vault = getVault(wallet.publicKey);

        const response = await fetch(`/api/drift/health?address=${vault}`)
        const body = await response.json();
        if (!response.ok) throw new Error(body.error);

        return body;
    };

    const response =  useQuery({ 
        queryKey, 
        queryFn,
        refetchInterval: 60_000,
        staleTime: Infinity,
        enabled: !!wallet
    });

    if (response.error) {
        captureError(showError, "Could not fetch Drift health", "./app/dashboard/page.tsx", response.error, wallet?.publicKey, true);
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
