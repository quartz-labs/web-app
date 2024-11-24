import dotenv from 'dotenv';

dotenv.config();

export const RPC_URL = process.env.RPC_URL || 'https://api.mainnet-beta.solana.com';
export const PORT = process.env.PORT || 3000;

export const DRIFT_MARKET_INDEX_USDC = 0;
export const DRIFT_MARKET_INDEX_SOL = 1;
export const MICRO_CENTS_PER_USDC = 1000000;
