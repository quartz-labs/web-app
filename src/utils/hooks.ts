import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export function useRefetchAccountData() {
    const queryClient = useQueryClient();

    return useCallback(async (signature?: string) => {
        if (signature) {
            try { 
                await fetch(`/api/confirm-tx?signature=${signature}`); 
                await new Promise(resolve => setTimeout(resolve, 500));
            } catch { }
        }
        queryClient.invalidateQueries({ queryKey: ["user"], refetchType: "all" });
    }, [queryClient]);
}

export function useRefetchWithdrawLimits() {
    const queryClient = useQueryClient();

    return useCallback(async () => {
        queryClient.invalidateQueries({ queryKey: ["user", "withdraw-limits"], refetchType: "all" });
    }, [queryClient]);
}

export function useRefetchAccountStatus() {
    const queryClient = useQueryClient();

    return useCallback(async (signature?: string) => {
        if (signature) {
            try { 
                await fetch(`/api/confirm-tx?signature=${signature}`); 
                await new Promise(resolve => setTimeout(resolve, 500));
            } catch { }
        }

        queryClient.invalidateQueries({ queryKey: ["account-status"], refetchType: "all" });
    }, [queryClient]);
}