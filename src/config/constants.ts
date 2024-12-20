import { SUPPORTED_DRIFT_MARKETS } from "@quartz-labs/sdk";

export type MarketIndex = typeof SUPPORTED_DRIFT_MARKETS[number];
export const DEFAULT_REFETCH_INTERVAL = 60_000;
export const MICRO_LAMPORTS_PER_LAMPORT = 1_000_000;
