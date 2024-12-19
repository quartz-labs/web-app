import { SUPPORTED_DRIFT_MARKETS } from "@quartz-labs/sdk";

export type MarketIndex = typeof SUPPORTED_DRIFT_MARKETS[number];
export const DEFAULT_REFETCH_INTERVAL = 60_000;