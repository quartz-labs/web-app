import { BN } from "bn.js";

export const DEFAULT_REFETCH_INTERVAL = 60_000;
export const MICRO_LAMPORTS_PER_LAMPORT = 1_000_000;
export const JUPITER_SLIPPAGE_BPS = 50;
export const DEFAULT_COMPUTE_UNIT_LIMIT = 400_000;
export const DEFAULT_COMPUTE_UNIT_PRICE = 1_250_000;

export const SECONDS_PER_DAY = 60 * 60 * 24;

export const DEFAULT_CARD_TRANSACTION_LIMIT = new BN(1000_000_000); //$1,000
export const DEFAULT_CARD_TIMEFRAME_LIMIT = new BN(0);
export const DEFAULT_CARD_TIMEFRAME = new BN(SECONDS_PER_DAY);
export const DEFAULT_CARD_TIMEFRAME_RESET = new BN(0);

export const DUST_BUFFER_BASE_UNITS = 100;

export const UNSUPPORTED_STATES = [
    "NEVADA",
    "NEW MEXICO",
    "NORTH DAKOTA",
    "SOUTH DAKOTA",
    "WISCONSIN",
    "VERMONT",
    "DELAWARE",
    "GEORGIA",
    "IDAHO",
    "LOUISIANA",
    "MARYLAND",
    "MISSOURI",
    "MONTANA",
    "UTAH",
    "WASHINGTON",
    "WYOMING",
    "OHIO",
    "OREGON",
    "RHODE ISLAND",
    "ARIZONA",
]