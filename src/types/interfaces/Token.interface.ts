import type { MarketIndex } from "@/src/config/constants";
import type { PublicKey } from "@solana/web3.js";

export interface Token {
    name: string;
    icon: string;
    priceId: string;
    decimalPrecision: number;
    mintAddress: PublicKey;
}