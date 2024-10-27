import { PublicKey } from "@solana/web3.js";

export const FUNDS_PROGRAM_ID = new PublicKey("6JjHXLheGSNvvexgzMthEcgjkcirDrGduc3HAKB2P1v2");
export const FUNDS_PROGRAM_ADDRESS_TABLE = new PublicKey("3ND9hEwC75yqtYbXY6ZLZXsqB9q6zn7VX4u7LVMofqcA");

export const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL ?? "https://janella-g42vor-fast-mainnet.helius-rpc.com";

// export const USDC_MINT = new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"); // Real devnet mint
// export const USDC_MINT = new PublicKey("8zGuJQqwhZafTah7Uc7Z4tXRnguqkn5KLFAP8oV6PHe2"); // Drift's devnet mint
export const USDC_MINT = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"); // Mainnet devnet mint
export const USDT_MINT = new PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB");
export const WSOL_MINT = new PublicKey("So11111111111111111111111111111111111111112");

export const DRIFT_PROGRAM_ID = new PublicKey("dRiftyHA39MWEi3m9aunc5MzRF1JYuBsbn6VPcn33UH");
export const DRIFT_SIGNER = new PublicKey("JCNCMFXo5M5qwUPg2Utu1u6YWp3MbygxqBsBeXXJfrw");
export const DRIFT_SPOT_MARKET_SOL = new PublicKey("3x85u7SWkmmr7YQGYhtjARgxwegTLJgkSLRprfXod6rh");
export const DRIFT_SPOT_MARKET_USDC = new PublicKey("6gMq3mRCKf8aP3ttTyYhuijVZ2LGi14oDsBbkgubfLB3");

// export const DRIFT_ORACLE_1 = new PublicKey("J83w4HKfqxwcq3BEMMkPFSppX3gqekLyLJBexebFVkix"); // Devnet
// export const DRIFT_ORACLE_2 = new PublicKey("5SSkXsEKQepHHAewytPVwdej4epN1nxgLVM84L4KXgy7"); // Devnet
export const DRIFT_ORACLE_1 = new PublicKey("BAtFj4kQttZRVep3UZS2aZRDixkGYgWsbqTBVDbnSsPF"); // Mainnet
export const DRIFT_ORACLE_2 = new PublicKey("En8hkHLkRe9d9DraYmBTrus518BvmVH448YcvmrFM6Ce"); // Mainnet

export const DRIFT_MARKET_INDEX_USDC = 0;
export const DRIFT_MARKET_INDEX_SOL = 1;

export const DECIMALS_SOL = 9;
export const DECIMALS_USDC = 6;
export const MICRO_CENTS_PER_USDC = 1000000;

export const MARGINFI_GROUP_1 = new PublicKey("4qp6Fx6tnZkY5Wropq9wUYgtFxXKwE6viZxFHg3rdAG8");
