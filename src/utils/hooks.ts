import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useWallet, type WalletContextState } from "@solana/wallet-adapter-react";
import { useCallback } from "react";
import base58 from "bs58";
import config from "../config/config";
import { fetchAndParse } from "./helpers";
import { useStore } from "./store";

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
    const wallet = useWallet();

    return useCallback(async (signature?: string) => {
        if (signature) {
            try { 
                await fetch(`/api/confirm-tx?signature=${signature}`); 
                await new Promise(resolve => setTimeout(resolve, 500));
            } catch { }
        }

        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey.includes(wallet.publicKey?.toBase58()), 
          refetchType: "all" 
        });
    }, [queryClient, wallet.publicKey]);
}

export function useRefetchCardDetails() {
    const queryClient = useQueryClient();

    return useCallback(async () => {
        queryClient.invalidateQueries({ queryKey: ["card-user", "cards"], refetchType: "all" });
    }, [queryClient]);
}

export function useRefetchUserInfo() {
    const queryClient = useQueryClient();

    return useCallback(async () => {
        queryClient.invalidateQueries({ queryKey: ["card-user"], refetchType: "all" });
    }, [queryClient]);
}
  
export function useLoginCardUser(wallet: WalletContextState | undefined) {
    const { setJwtToken } = useStore();

    const signMessage = async (wallet: WalletContextState, message: string) => {
        if (!wallet.signMessage) throw new Error("Wallet does not support message signing");

        const messageBytes = new TextEncoder().encode(message);
        const signatureBytes = await wallet.signMessage(messageBytes);
        return base58.encode(signatureBytes);
    }
  
    return useMutation({
      mutationKey: ['login-card-user', wallet?.publicKey?.toBase58()],
      mutationFn: async () => {
        if (!wallet) throw new Error("Wallet not found");

        const message = `
        Sign this message to authenticate ownership. This signature will not trigger any blockchain transaction or cost any gas fees.\n\n
        Wallet address: ${wallet.publicKey}\n
        Timestamp: ${Date.now()}\n
        `;
        const signature = await signMessage(wallet, message);

        const cardToken = await fetchAndParse(`${config.NEXT_PUBLIC_INTERNAL_API_URL}/auth/user`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              accept: 'application/json'
            },
            body: JSON.stringify({
              publicKey: wallet.publicKey,
              signature,
              message
            })
        });

        setJwtToken(cardToken.token);
      },
      onError: (error) => {
        console.error("Failed to log in: ", error);
      },
      // TODO: Add pending state
    })
}