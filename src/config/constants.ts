import { BN_MAX } from "@drift-labs/sdk";
import { BN } from "bn.js";

export const DEFAULT_REFETCH_INTERVAL = 60_000;
export const MICRO_LAMPORTS_PER_LAMPORT = 1_000_000;
export const JUPITER_SLIPPAGE_BPS = 50;
export const DEFAULT_COMPUTE_UNIT_LIMIT = 400_000;

export const DEFAULT_CARD_TRANSACTION_LIMIT = new BN(10_000_000_000);
export const DEFAULT_CARD_TIMEFRAME_LIMIT = BN_MAX;
export const DEFAULT_CARD_TIMEFRAME = BN_MAX;