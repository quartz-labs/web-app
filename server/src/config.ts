import dotenv from 'dotenv';

dotenv.config();

export const LOCAL_SECRET = process.env.SECRET;
export const HELIUS_RPC_URL = process.env.HELIUS_RPC_URL;
export const PORT = process.env.PORT || 3000;

export const DRIFT_MARKET_INDEX_USDC = 0;
export const DRIFT_MARKET_INDEX_SOL = 1;
export const MICRO_CENTS_PER_USDC = 1000000;
