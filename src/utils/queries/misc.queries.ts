import { type QuoteResponse, SwapMode } from "@jup-ag/api";
import type { PublicKey } from "@solana/web3.js";
import { createQuery } from "./createQuery";
import { JUPITER_SLIPPAGE_BPS, DEFAULT_REFETCH_INTERVAL } from "@/src/config/constants";

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