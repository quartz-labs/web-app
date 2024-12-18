import { useError } from "@/context/error-provider";
import { captureError } from "./errors";
import { useQuery, type QueryKey, type StaleTime } from "@tanstack/react-query";
import { AccountStatus } from "@/types/enums/accountStatus.enum";
import type { PublicKey } from "@solana/web3.js";

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

export const useAccountStatusQuery = (wallet: PublicKey | null) => {
    const query = createQuery<AccountStatus>({
        queryKey: ["account-status", wallet?.toBase58() ?? ""],
        url: "/api/account-status",
        params: wallet ? {
            wallet: wallet.toBase58()
        } : undefined,
        transformResponse: (data) => {
            if (typeof data.status !== 'string' || !Object.values(AccountStatus).includes(data.status as AccountStatus)) {
                throw new Error('Invalid account status received from API');
            }
            return data.status as unknown as AccountStatus;
        },
        errorMessage: "Could not fetch account status",
        enabled: wallet != null,
        staleTime: Infinity
    });
    return query();
};