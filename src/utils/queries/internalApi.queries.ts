import type { QuartzCardUser } from "@/src/types/interfaces/QuartzCardUser.interface";
import type { PublicKey } from "@solana/web3.js";
import { useStore } from "../store";
import { createQuery } from "./createQuery";
import config from "@/src/config/config";
import type { CardsForUserResponse } from "@/src/types/interfaces/CardsForUserResponse.interface";
import type { ProviderCardUser } from "@/src/types/interfaces/ProviderCardUser.interface";

export const useQuartzCardUserQuery = (publicKey: PublicKey | null, refetch: boolean) => {
    const { setQuartzCardUser } = useStore();

    const query = createQuery<QuartzCardUser>({
        queryKey: ["card-user", "quartz-card-user", publicKey?.toBase58() ?? ""],
        url: `${config.NEXT_PUBLIC_INTERNAL_API_URL}/auth/user-info`,
        params: publicKey ? {
            publicKey: publicKey.toBase58()
        } : undefined,
        errorMessage: "Could not fetch account information",
        enabled: publicKey != null,
        staleTime: refetch ? 5_000 : Infinity,
        refetchInterval: refetch ? 5_000 : undefined,
        accept404: true,
        onSuccess: (data) => setQuartzCardUser(data)
    });
    return query();
};

export const useProviderCardUserQuery = (cardUserId: string | null, refetch: boolean) => {
    const { setProviderCardUser } = useStore();

    const query = createQuery<ProviderCardUser>({
        queryKey: ["card-user", "provider-card-user", "user", cardUserId ?? ""],
        url: `${config.NEXT_PUBLIC_INTERNAL_API_URL}/card/user`,
        params: cardUserId ? {
            id: cardUserId
        } : undefined,
        errorMessage: "Could not fetch account information",
        enabled: cardUserId != null,
        staleTime: refetch ? 5_000 : Infinity,
        refetchInterval: refetch ? 5_000 : undefined,
        onSuccess: (data) => setProviderCardUser(data)
    });
    return query();
};

export const useCardDetailsQuery = (cardUserId: string | null, enabled: boolean) => {
    const { setCardDetails } = useStore();

    const query = createQuery<CardsForUserResponse | null>({
        queryKey: ["card-user", "provider-card-user", "card", cardUserId ?? ""],
        url: `${config.NEXT_PUBLIC_INTERNAL_API_URL}/card/issuing/user`,
        params: cardUserId ? {
            id: cardUserId
        } : undefined,
        transformResponse: (data: CardsForUserResponse[]) => {
            if (data[0] === undefined) return null;
            return data[0];
        },
        errorMessage: "Could not fetch account information",
        enabled: cardUserId != null && enabled,
        staleTime: Infinity,
        onSuccess: (data) => setCardDetails(data)
    });
    return query();
};