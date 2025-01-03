import type { PublicKey } from "@solana/web3.js";

export interface TokenMetadata {
    name: string;
    mint: PublicKey;
    pythPriceFeedId: string;
    decimalPrecision: number;
    icon: string;
    coingeckoPriceId: string;
}
