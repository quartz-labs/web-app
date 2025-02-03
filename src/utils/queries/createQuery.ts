import { useError } from "@/src/context/error-provider";
import { buildEndpointURL } from "../helpers";
import { captureError } from "../errors";
import { useQuery } from "@tanstack/react-query";

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

export function createQuery<T>({
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
                    throw new Error(`${errorMessage} - ${body.message}`);
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