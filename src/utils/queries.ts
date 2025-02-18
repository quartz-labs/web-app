import { useError } from "@/src/context/error-provider";
import { captureError } from "./errors";
import { useQuery } from "@tanstack/react-query";
import { AccountStatus } from "@/src/types/enums/AccountStatus.enum";
import type { PublicKey } from "@solana/web3.js";
import { DEFAULT_REFETCH_INTERVAL, JUPITER_SLIPPAGE_BPS } from "@/src/config/constants";
import type { Rate } from "@/src/types/interfaces/Rate.interface";
import { MarketIndex } from "@quartz-labs/sdk/browser";
import config from "../config/config";
import { buildEndpointURL } from "./helpers";
import { SwapMode, type QuoteResponse } from "@jup-ag/api";

interface QueryConfig {
    queryKey: string[];
    url: string;
    params?: Record<string, string>;
    transformResponse?: (data: any) => any;
    refetchInterval?: number;
    errorMessage: string;
    enabled?: boolean;
    staleTime?: number;
    retry?: boolean | number;
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
        staleTime: Infinity,
        retry: 5
    });
    return query();
};

export const usePricesQuery = createQuery<Record<MarketIndex, number>>({
    queryKey: ["prices"],
    url: `${config.NEXT_PUBLIC_API_URL}/data/price`,
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

export const useBorrowLimitsQuery = (address: PublicKey | null) => {
    const query = createQuery<Record<MarketIndex, number>>({
        queryKey: ["user", "borrow-limits", address?.toBase58() ?? ""],
        url: `${config.NEXT_PUBLIC_API_URL}/user/borrow-limit`,
        params: address ? { 
            address: address.toBase58(),
            marketIndices: MarketIndex.join(',')
        } : undefined,
        errorMessage: "Could not fetch borrow limits",
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

export const useJupiterSwapModeQuery = (
    inputMint: PublicKey, 
    outputMint: PublicKey,
): {
    data: SwapMode | null,
    isLoading: boolean
} => {
    const exactInQuery = createQuery<QuoteResponse>({
        queryKey: ["jupiter", inputMint.toBase58(), outputMint.toBase58(), "exactIn"],
        url: "https://quote-api.jup.ag/v6/quote",
        params: {
            swapMode: SwapMode.ExactIn,
            inputMint: inputMint.toBase58(),
            outputMint: outputMint.toBase58(),
            amount: "1",
            slippageBps: JUPITER_SLIPPAGE_BPS.toString(),
            onlyDirectRoutes: "true"
        },
        errorMessage: "Could not fetch Jupiter ExactIn quote",
        refetchInterval: DEFAULT_REFETCH_INTERVAL,
        retry: false,
        ignoreError: true
    });

    const exactOutQuery = createQuery<QuoteResponse>({
        queryKey: ["jupiter", inputMint.toBase58(), outputMint.toBase58(), "exactOut"],
        url: "https://quote-api.jup.ag/v6/quote",
        params: {
            swapMode: SwapMode.ExactOut,
            inputMint: inputMint.toBase58(),
            outputMint: outputMint.toBase58(),
            amount: "1",
            slippageBps: JUPITER_SLIPPAGE_BPS.toString(),
            onlyDirectRoutes: "true"
        },
        errorMessage: "Could not fetch Jupiter ExactOut quote",
        refetchInterval: DEFAULT_REFETCH_INTERVAL,
        retry: false,
        ignoreError: true
    });

    const { isError: jupiterQuoteExactOutError, isLoading: jupiterQuoteExactOutLoading } = exactOutQuery();
    const { isError: jupiterQuoteExactInError, isLoading: jupiterQuoteExactInLoading } = exactInQuery();

    let swapMode: SwapMode | null = null;
    if (!jupiterQuoteExactOutError) swapMode = SwapMode.ExactOut;
    else if (!jupiterQuoteExactInError) swapMode = SwapMode.ExactIn;

    return {
        data: swapMode,
        isLoading: jupiterQuoteExactOutLoading || jupiterQuoteExactInLoading
    }
};