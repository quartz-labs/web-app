import { useError } from "@/src/context/error-provider";
import { captureError } from "./errors";
import { useQuery } from "@tanstack/react-query";
import { AccountStatus } from "@/src/types/enums/AccountStatus.enum";
import type { PublicKey } from "@solana/web3.js";
import { DEFAULT_REFETCH_INTERVAL, JUPITER_SLIPPAGE_BPS } from "@/src/config/constants";
import type { Rate } from "@/src/types/interfaces/Rate.interface";
import { MarketIndex, TOKENS } from "@quartz-labs/sdk/browser";
import config from "../config/config";
import { buildEndpointURL } from "./helpers";
import type { QuoteResponse } from "@jup-ag/api";
import type { CardsForUserResponse, CardUserBase } from "../types/interfaces/CardUserResponse.interface";
import type { UserFromDatabase } from "../types/interfaces/CardUserResponse.interface";

interface QueryConfig {
    queryKey: string[];
    url: string;
    params?: Record<string, string>;
    transformResponse?: (data: any) => any;
    refetchInterval?: number;
    errorMessage: string;
    enabled?: boolean;
    staleTime?: number;
    retry?: boolean;
    ignoreError?: boolean;
}

function createQuery<T>({
    queryKey,
    url, 
    params, 
    transformResponse, 
    refetchInterval,
    errorMessage,
    enabled,
    staleTime,
    retry = true,
    ignoreError = false
}: QueryConfig) {
    return () => {
        const { showError } = useError();

        const endpoint = buildEndpointURL(url, params);
        
        const queryFn = async (): Promise<T> => {
            const response = await fetch(endpoint);
            const body = await response.json();

            if (!response.ok) throw new Error(body.message || errorMessage);

            return transformResponse ? transformResponse(body) : body;
        };

        const response = useQuery({
            queryKey: queryKey,
            queryFn,
            refetchInterval,
            enabled,
            staleTime,
            retry : retry ? 3 : false
        });

        if (!ignoreError && response.error) {
            captureError(
                showError, 
                errorMessage, 
                endpoint, 
                response.error, 
                null, 
                true // TODO - This is silent to prevent infinite refresh, add some way of showing feedback
            );
        }

        return response;
    }
}

export const useAccountStatusQuery = (address: PublicKey | null) => {
    const query = createQuery<AccountStatus>({
        queryKey: ["account-status", address?.toBase58() ?? ""],
        url: "/api/account-status",
        params: address ? {
            wallet: address.toBase58()
        } : undefined,
        transformResponse: (data) => {
            if (typeof data.status !== 'string' || !Object.values(AccountStatus).includes(data.status as AccountStatus)) {
                throw new Error('Invalid account status received from API');
            }
            return data.status as unknown as AccountStatus;
        },
        errorMessage: "Could not fetch account status",
        enabled: address != null,
        staleTime: Infinity
    });
    return query();
};

export const useUserFromDatabaseQuery = (publicKey: PublicKey | null) => {
    const query = createQuery<UserFromDatabase>({
        queryKey: ["card-user", publicKey?.toBase58() ?? ""],
        url: `${config.NEXT_PUBLIC_INTERNAL_API_URL}/auth/user-info`,
        params: publicKey ? {
            publicKey: publicKey.toBase58()
        } : undefined,
        errorMessage: "Could not fetch account information",
        enabled: publicKey != null,
        staleTime: Infinity
    });
    return query();
};

export const useCardUserInfoQuery = (cardUserId: string | null, enabled: boolean) => {
    const query = createQuery<CardUserBase>({
        queryKey: ["card-user", cardUserId ?? ""],
        url: `${config.NEXT_PUBLIC_INTERNAL_API_URL}/card/user`,
        params: cardUserId ? {
            id: cardUserId
        } : undefined,
        errorMessage: "Could not fetch account information",
        enabled: cardUserId != null && enabled,
        staleTime: 5_000,
        refetchInterval: 5_000
    });
    return query();
};

export const useCardsForUserQuery = (cardUserId: string | null) => {
    const query = createQuery<CardsForUserResponse[]>({
        queryKey: ["card-user", cardUserId ?? ""],
        url: `${config.NEXT_PUBLIC_INTERNAL_API_URL}/card/issuing/user`,
        params: cardUserId ? {
            id: cardUserId
        } : undefined,
        errorMessage: "Could not fetch account information",
        enabled: cardUserId != null,
        staleTime: Infinity
    });
    return query();
};

export const usePricesQuery = createQuery<Record<MarketIndex, number>>({
    queryKey: ["prices"],
    url: `${config.NEXT_PUBLIC_API_URL}/data/price`,
    params: { ids: Object.values(TOKENS).map((token) => token.coingeckoPriceId).join(',') },
    transformResponse: (body) => {
        // Iterate through all tokens and map the marketIndex to the priceId
        return Object.entries(TOKENS).reduce((acc, [marketIndex, token]) => {
            acc[Number(marketIndex) as MarketIndex] = body[token.coingeckoPriceId];
            return acc;
        }, {} as Record<MarketIndex, number>);
    },
    refetchInterval: DEFAULT_REFETCH_INTERVAL,
    errorMessage: "Could not fetch prices"
});

export const useRatesQuery = createQuery<Record<MarketIndex, Rate>>({
    queryKey: ["rates"],
    url: `${config.NEXT_PUBLIC_API_URL}/user/rate`,
    params: { 
        marketIndices: MarketIndex.join(',') 
    },
    refetchInterval: DEFAULT_REFETCH_INTERVAL,
    errorMessage: "Could not fetch rates"
});

export const useBalancesQuery = (address: PublicKey | null) => {
    const query = createQuery<Record<MarketIndex, number>>({
        queryKey: ["user", "balances", address?.toBase58() ?? ""],
        url: `${config.NEXT_PUBLIC_API_URL}/user/balance`,
        params: address ? { 
            address: address.toBase58(),
            marketIndices: MarketIndex.join(',')
        } : undefined,
        errorMessage: "Could not fetch balances",
        refetchInterval: DEFAULT_REFETCH_INTERVAL,
        enabled: address != null,
    });
    return query();
};

export const useWithdrawLimitsQuery = (address: PublicKey | null) => {
    const query = createQuery<Record<MarketIndex, number>>({
        queryKey: ["user", "withdraw-limits", address?.toBase58() ?? ""],
        url: `${config.NEXT_PUBLIC_API_URL}/user/withdraw-limit`,
        params: address ? { 
            address: address.toBase58(),
            marketIndices: MarketIndex.join(',')
        } : undefined,
        errorMessage: "Could not fetch withdraw limits",
        refetchInterval: DEFAULT_REFETCH_INTERVAL,
        enabled: address != null,
    });
    return query();
};

export const useDepositLimitsQuery = (address: PublicKey | null, marketIndex: MarketIndex) => {
    const query = createQuery<number>({
        queryKey: ["user", "deposit-limits", address?.toBase58() ?? "", marketIndex.toString()],
        url: "/api/deposit-limit",
        params: address ? { 
            address: address.toBase58(),
            marketIndex: marketIndex.toString()
        } : undefined,
        enabled: address != null,
        errorMessage: "Could not fetch deposit limits",
    });
    return query();
};

export const useHealthQuery = (address: PublicKey | null) => {
    const query = createQuery<number>({
        queryKey: ["user", "health", address?.toBase58() ?? ""],
        url: "https://api.quartzpay.io/user/health",
        params: address ? { 
            address: address.toBase58()
        } : undefined,
        errorMessage: "Could not fetch health",
        refetchInterval: DEFAULT_REFETCH_INTERVAL,
        enabled: address != null,
    });
    return query();
};

export const useJupiterQuoteQuery = (
    swapMode: "ExactIn" | "ExactOut",
    inputMint: PublicKey, 
    outputMint: PublicKey,
) => {
    const query = createQuery<QuoteResponse>({
        queryKey: ["jupiter", swapMode, inputMint.toBase58(), outputMint.toBase58()],
        url: "https://quote-api.jup.ag/v6/quote",
        params: {
            swapMode,
            inputMint: inputMint.toBase58(),
            outputMint: outputMint.toBase58(),
            amount: "1",
            slippageBps: JUPITER_SLIPPAGE_BPS.toString(),
            onlyDirectRoutes: "true"
        },
        errorMessage: "Could not fetch Jupiter quote",
        refetchInterval: DEFAULT_REFETCH_INTERVAL,
        retry: false,
        ignoreError: true
    });
    return query();
};