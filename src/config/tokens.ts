import { DRIFT_MARKET_INDEX_SOL, DRIFT_MARKET_INDEX_USDC } from "@quartz-labs/sdk";
import type { Token } from "../types/interfaces/Token.interface";
import type { MarketIndex } from "./constants";

export const TOKENS: Record<MarketIndex, Token> = {
    [DRIFT_MARKET_INDEX_USDC]: {
        name: "USDC",
        icon: "usdc.webp",
        priceId: "usd-coin",
        decimalPrecision: 6,
    },
    [DRIFT_MARKET_INDEX_SOL]: {
        name: "SOL",
        icon: "sol.webp",
        priceId: "solana",
        decimalPrecision: 9,
    },
};
