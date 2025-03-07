import type { PublicKey } from "@solana/web3.js";
import { useStore } from "../store";
import { createQuery } from "./createQuery";
import config from "@/src/config/config";
import type { CardUser } from "@/src/types/CardUser.interface";
import type { Card } from "@/src/types/Card.interface";
import type { CardTransaction } from "@/src/types/CardTransaction.interface";

export const useCardUserQuery = (publicKey: PublicKey | null, refetch: boolean = false) => {
    const { setCardUser } = useStore();

    const query = createQuery<CardUser | null>({
        queryKey: ["card-user", publicKey?.toBase58() ?? ""],
        url: `${config.NEXT_PUBLIC_CARD_API_URL}/user`,
        params: publicKey ? {
            publicKey: publicKey.toBase58()
        } : undefined,
        errorMessage: "Could not fetch Card User",
        enabled: publicKey != null,
        refetchInterval: refetch ? 3_000 : undefined,
        staleTime: refetch ? 3_000 : Infinity,
        accept404: true,
        onSuccess: (data) => setCardUser(data)
    });
    return query();
};

export const useCardDetailsQuery = (publicKey: PublicKey | null, enabled: boolean) => {
    const { setCardDetails } = useStore();

    const query = createQuery<Card>({
        queryKey: ["card-user", "card", publicKey?.toBase58() ?? ""],
        url: `${config.NEXT_PUBLIC_CARD_API_URL}/card`,
        params: publicKey ? {
            publicKey: publicKey.toBase58()
        } : undefined,
        errorMessage: "Could not fetch card details",
        enabled: publicKey != null && enabled,
        staleTime: Infinity,
        onSuccess: (data) => setCardDetails(data)
    });
    return query();
};

export const useCardTransactionsQuery = (publicKey: PublicKey | null, enabled: boolean) => {
    const { setTxHistory } = useStore();

    const query = createQuery<CardTransaction[]>({
        queryKey: ["card-user", "transactions", publicKey?.toBase58() ?? ""],
        url: `${config.NEXT_PUBLIC_CARD_API_URL}/user/transactions`,
        params: publicKey ? { 
            publicKey: publicKey.toBase58()
        } : undefined,
        errorMessage: "Could not fetch card transactions",
        refetchInterval: 60_000,
        enabled: publicKey != null && enabled,
        onSuccess: (data) => setTxHistory(data)
    });
    return query();
};