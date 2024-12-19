import type { MarketIndex } from "@/src/config/constants";

export interface Token {
    name: string;
    icon: string;
    priceId: string;
    decimalPrecision: number;
}