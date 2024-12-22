import type { MarketIndex } from "@/src/config/constants";

export interface AssetInfo {
    marketIndex: MarketIndex;
    balance: number;
    price: number;
    rate: number;
}