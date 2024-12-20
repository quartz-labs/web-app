import { useQueryClient } from "@tanstack/react-query";
import { waitForSignature } from "./helpers";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";

export function useRefetchAccountData() {
    const queryClient = useQueryClient();

    const refetchAccountData = async (signature?: string) => {
        if (signature) await waitForSignature(signature);
        queryClient.invalidateQueries({ queryKey: ["user"], refetchType: "all" });
    }
    
    return refetchAccountData;
}

export function useRefetchWithdrawLimits() {
    const queryClient = useQueryClient();

    const refetchWithdrawLimits = async () => {
        queryClient.invalidateQueries({ queryKey: ["user", "withdraw-limits"], refetchType: "all" });
    }

    return refetchWithdrawLimits;
}

export function useRefetchAccountStatus() {
    const queryClient = useQueryClient();
    const wallet = useWallet();

    const refetchAccountStatus = async (signature?: string) => {
        if (signature) await waitForSignature(signature);
        queryClient.invalidateQueries({ 
          predicate: (query) => query.queryKey.includes(wallet.publicKey?.toBase58()), 
          refetchType: "all" 
        });
    }

    return refetchAccountStatus;
}