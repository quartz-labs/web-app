import { useError } from "@/src/context/error-provider";
import { captureError } from "./errors";
import { useQuery } from "@tanstack/react-query";
import { AccountStatus } from "@/src/types/enums/AccountStatus.enum";
import type { PublicKey } from "@solana/web3.js";
import { SUPPORTED_DRIFT_MARKETS } from "@quartz-labs/sdk";
import { DEFAULT_REFETCH_INTERVAL, type MarketIndex } from "@/src/config/constants";
import type { Rate } from "@/src/types/interfaces/Rate.interface";
import { TOKENS } from "../config/tokens";

interface QueryConfig {
    queryKey: string[];
    url: string;
    params?: Record<string, string>;
    transformResponse?: (data: any) => any;
    refetchInterval?: number;
    errorMessage: string;
    enabled?: boolean;
    staleTime?: number;
}

function createQuery<T>({
    queryKey,
    url, 
    params, 
    transformResponse, 
    refetchInterval,
    errorMessage,
    enabled,
    staleTime
}: QueryConfig) {
    return () => {
        const { showError } = useError();

        const searchParams = new URLSearchParams(params);
        const endpoint = `${url}${params ? `?${searchParams.toString()}` : ''}`;

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
            staleTime
        });

        if (response.error) {
            captureError(
                showError, 
                errorMessage, 
                endpoint, 
                response.error, 
                undefined, 
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

export const usePricesQuery = createQuery<Record<MarketIndex, number>>({
    queryKey: ["prices"],
    url: "https://api.quartzpay.io/data/price",
    params: { ids: Object.values(TOKENS).map((token) => token.priceId).join(',') },
    transformResponse: (body) => {
        // Iterate through all tokens and map the marketIndex to the priceId
        return Object.entries(TOKENS).reduce((acc, [marketIndex, token]) => {
            acc[Number(marketIndex) as MarketIndex] = body[token.priceId];
            return acc;
        }, {} as Record<MarketIndex, number>);
    },
    refetchInterval: DEFAULT_REFETCH_INTERVAL,
    errorMessage: "Could not fetch prices"
});

export const useRatesQuery = createQuery<Record<MarketIndex, Rate>>({
    queryKey: ["rates"],
    url: "https://api.quartzpay.io/drift/rate", 
    params: { 
        marketIndices: SUPPORTED_DRIFT_MARKETS.join(',') 
    },
    refetchInterval: DEFAULT_REFETCH_INTERVAL,
    errorMessage: "Could not fetch rates"
});

export const useBalancesQuery = (address: PublicKey | null) => {
    const query = createQuery<Record<MarketIndex, number>>({
        queryKey: ["user", "balances", address?.toBase58() ?? ""],
        url: "https://api.quartzpay.io/drift/balance",
        params: address ? { 
            address: address.toBase58(),
            marketIndices: SUPPORTED_DRIFT_MARKETS.join(',')
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
        url: "https://api.quartzpay.io/drift/withdraw-limit",
        params: address ? { 
            address: address.toBase58(),
            marketIndices: SUPPORTED_DRIFT_MARKETS.join(',')
        } : undefined,
        errorMessage: "Could not fetch withdraw limits",
        refetchInterval: DEFAULT_REFETCH_INTERVAL,
        enabled: address != null,
    });
    return query();
};

export const useHealthQuery = (address: PublicKey | null) => {
    const query = createQuery<number>({
        queryKey: ["user", "health", address?.toBase58() ?? ""],
        url: "https://api.quartzpay.io/drift/health",
        params: address ? { 
            address: address.toBase58()
        } : undefined,
        errorMessage: "Could not fetch health",
        refetchInterval: DEFAULT_REFETCH_INTERVAL,
        enabled: address != null,
    });
    return query();
};