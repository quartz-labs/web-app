import type { MarketIndex } from "@/src/config/constants";
import type { PublicKey } from "@solana/web3.js";

export interface Token {
    marketIndex: MarketIndex;
    name: string;
    icon: string;
    coingeckoPriceId: string;
    decimalPrecision: number;
    mintAddress: PublicKey;
}