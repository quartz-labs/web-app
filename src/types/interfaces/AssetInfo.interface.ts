import type { MarketIndex } from "@/src/config/constants";
import type { Rate } from "@/src/types/interfaces/Rate.interface";

export interface AssetInfo {
    marketIndex: MarketIndex;
    balance: number;
    price: number;
    rate: number;
}