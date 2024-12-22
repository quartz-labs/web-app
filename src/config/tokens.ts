import { DRIFT_MARKET_INDEX_SOL, DRIFT_MARKET_INDEX_USDC, USDC_MINT, WSOL_MINT } from "@quartz-labs/sdk";
import type { Token } from "../types/interfaces/Token.interface";
import type { MarketIndex } from "./constants";

export const TOKENS: Record<MarketIndex, Token> = {
    [DRIFT_MARKET_INDEX_USDC]: {
        name: "USDC",
        icon: "usdc.webp",
        coingeckoPriceId: "usd-coin",
        decimalPrecision: 6,
        mintAddress: USDC_MINT,
    },
    [DRIFT_MARKET_INDEX_SOL]: {
        name: "SOL",
        icon: "sol.webp",
        coingeckoPriceId: "solana",
        decimalPrecision: 9,
        mintAddress: WSOL_MINT,
    },
};
