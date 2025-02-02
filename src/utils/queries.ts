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
import { SwapMode, type QuoteResponse } from "@jup-ag/api";
import type { CardsForUserResponse, ProviderCardUser } from "../types/interfaces/CardUserResponse.interface";
import type { QuartzCardUser } from "../types/interfaces/CardUserResponse.interface";
import { useStore } from "./store";

interface QueryConfig<T> {
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
    accept404?: boolean;
    onSuccess?: (data: T) => void;
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
    ignoreError = false,
    accept404 = false,
    onSuccess
}: QueryConfig<T>) {
    return () => {
        const { showError } = useError();

        const endpoint = buildEndpointURL(url, params);
        const queryFn = async (): Promise<T> => {
            const response = await fetch(endpoint);
            const body = await response.json();

            if (!response.ok) {
                if (response.status !== 404 || !accept404) {
                    throw new Error(body.message ?? errorMessage);
                }
            }

            const data = transformResponse ? transformResponse(body) : body;
            if (onSuccess) onSuccess(data);
            return data;
        };

        const response = useQuery<T>({
            queryKey: queryKey,
            queryFn,
            refetchInterval,
            enabled,
            staleTime,
            retry : retry ? 3 : false,
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
        transformResponse: (data: any) => {
            if (typeof data.status !== 'string' || !Object.values(AccountStatus).includes(data.status as AccountStatus)) {
                throw new Error('Invalid account status received from API');
            }
            return data.status as unknown as AccountStatus;
        },
        errorMessage: "Could not fetch account status",
        enabled: address != null,
        staleTime: Infinity,
    });
    return query();
};

export const usePricesQuery = () => {
    const { setPrices } = useStore();

    const query = createQuery<Record<MarketIndex, number>>({
        queryKey: ["prices"],
        url: `${config.NEXT_PUBLIC_API_URL}/data/price`,
        params: { ids: Object.values(TOKENS).map((token) => token.coingeckoPriceId).join(',') },
        transformResponse: (body: any) => {
            // Iterate through all tokens and map the marketIndex to the priceId
            return Object.entries(TOKENS).reduce((acc, [marketIndex, token]) => {
                acc[Number(marketIndex) as MarketIndex] = body[token.coingeckoPriceId];
                return acc;
            }, {} as Record<MarketIndex, number>);
        },
        refetchInterval: DEFAULT_REFETCH_INTERVAL,
        errorMessage: "Could not fetch prices",
        onSuccess: (data) => setPrices(data)
    })
    return query();
};

export const useRatesQuery = () => {
    const { setRates } = useStore();

    const query = createQuery<Record<MarketIndex, Rate>>({
        queryKey: ["rates"],
        url: `${config.NEXT_PUBLIC_API_URL}/user/rate`,
        params: { 
        marketIndices: MarketIndex.join(',') 
    },
        refetchInterval: DEFAULT_REFETCH_INTERVAL,
        errorMessage: "Could not fetch rates",
        onSuccess: (data) => setRates(data)
    })
    return query();
};

export const useBalancesQuery = (address: PublicKey | null) => {
    const { setBalances } = useStore();

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
        onSuccess: (data) => setBalances(data)
    });
    return query();
};

export const useWithdrawLimitsQuery = (address: PublicKey | null) => {
    const { setWithdrawLimits } = useStore();

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
        onSuccess: (data) => setWithdrawLimits(data)
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
    const { setHealth } = useStore();

    const query = createQuery<number>({
        queryKey: ["user", "health", address?.toBase58() ?? ""],
        url: "https://api.quartzpay.io/user/health",
        params: address ? { 
            address: address.toBase58()
        } : undefined,
        errorMessage: "Could not fetch health",
        refetchInterval: DEFAULT_REFETCH_INTERVAL,
        enabled: address != null,
        onSuccess: (data) => setHealth(data)
    });
    return query();
};

export const useQuartzCardUserQuery = (publicKey: PublicKey | null) => {
    const { setQuartzCardUser } = useStore();

    const query = createQuery<QuartzCardUser>({
        queryKey: ["card-user", "quartz-card-user", publicKey?.toBase58() ?? ""],
        url: `${config.NEXT_PUBLIC_INTERNAL_API_URL}/auth/user-info`,
        params: publicKey ? {
            publicKey: publicKey.toBase58()
        } : undefined,
        errorMessage: "Could not fetch account information",
        enabled: publicKey != null,
        staleTime: Infinity,
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

    const query = createQuery<CardsForUserResponse[]>({
        queryKey: ["card-user", "provider-card-user", "card", cardUserId ?? ""],
        url: `${config.NEXT_PUBLIC_INTERNAL_API_URL}/card/issuing/user`,
        params: cardUserId ? {
            id: cardUserId
        } : undefined,
        errorMessage: "Could not fetch account information",
        enabled: cardUserId != null && enabled,
        staleTime: Infinity,
        onSuccess: (data) => setCardDetails(data)
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
