import type { PublicKey } from "@solana/web3.js";

export interface Token {
    name: string;
    icon: string;
    coingeckoPriceId: string;
    decimalPrecision: number;
    mintAddress: PublicKey;
}