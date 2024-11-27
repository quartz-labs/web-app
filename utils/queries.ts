import { useQuery } from "@tanstack/react-query";
import { DEFAULT_REFETCH_INTERVAL, DRIFT_MARKET_INDEX_SOL, DRIFT_MARKET_INDEX_USDC } from "./constants";
import { captureError } from "./errors";
import { useError } from "@/context/error-provider";
import { useAnchorWallet } from "@solana/wallet-adapter-react"
import { Balance } from "@/interfaces/balance.interface";

type QueryConfig = {
    path: string;
    params?: Record<string, string>;
    requiresAddress?: boolean;
    transformResponse?: (data: any) => any;
    refetchInterval?: number;
    errorMessage: string;   
}


function createQuery<T>({
    path, 
    params, 
    requiresAddress,
    transformResponse, 
    refetchInterval,
    errorMessage
}: QueryConfig) {
    return () => {
        const { showError } = useError();
        const wallet = useAnchorWallet();

        if (requiresAddress && wallet) {
            params = {
                ...params,
                address: wallet.publicKey.toBase58()
            };
        }

        const searchParams = new URLSearchParams(params);
        const url = `/api/${path}${params ? `?${searchParams.toString()}` : ''}`;

        const queryKey = [path.replace('/', '-')];
        const queryFn = async (): Promise<T> => {
            if (requiresAddress && !wallet) throw new Error("No wallet provided");

            const response = await fetch(url);
            const body = await response.json();

            if (!response.ok) throw new Error(body.message || errorMessage);

            return transformResponse ? transformResponse(body) : body;
        };

        const response = useQuery({
            queryKey,
            queryFn,
            refetchInterval: refetchInterval ?? DEFAULT_REFETCH_INTERVAL
        });

        if (response.error) {
            captureError(
                showError, 
                errorMessage, 
                url, 
                response.error, 
                wallet?.publicKey, 
                true // TODO - This is silent to prevent infinite refresh, add some way of showing feedback
            );
        }

        return response;
    }
}


export const useSolPriceQuery = createQuery<number>({
    path: 'data/price',
    params: { ids: "solana" },
    transformResponse: (body) => body.solana,
    errorMessage: "Could not fetch SOL price"
});


export const useDriftRateQuery = createQuery<Balance>({
    path: 'drift/rate',
    params: { 
        marketIndices: [DRIFT_MARKET_INDEX_SOL, DRIFT_MARKET_INDEX_USDC].join(',') 
    },
    transformResponse: (body) => ({
        lamports: body[0].depositRate,
        usdc: body[1].borrowRate
    }),
    errorMessage: "Could not fetch Drift rate"
});


export const useDriftBalanceQuery = createQuery<Balance>({
    path: 'drift/balance',
    params: { 
        marketIndices: [DRIFT_MARKET_INDEX_SOL, DRIFT_MARKET_INDEX_USDC].join(',') 
    },
    requiresAddress: true,
    transformResponse: (body) => ({
        lamports: body[0],
        usdc: Math.abs(body[1])
    }),
    errorMessage: "Could not fetch Drift balance"
});


export const useDriftWithdrawLimitQuery = createQuery<Balance>({
    path: 'drift/withdraw-limit',
    params: { 
        marketIndices: [DRIFT_MARKET_INDEX_SOL, DRIFT_MARKET_INDEX_USDC].join(',') 
    },
    requiresAddress: true,
    transformResponse: (body) => ({
        lamports: body[0],
        usdc: body[1]
    }),
    errorMessage: "Could not fetch Drift withdrawal limit"
});


export const useDriftHealthQuery = createQuery<number>({
    path: 'drift/health',
    requiresAddress: true,
    errorMessage: "Could not fetch Drift health"
});
