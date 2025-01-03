import type { MarketIndex } from "@quartz-labs/sdk";

export interface AssetInfo {
    marketIndex: MarketIndex;
    balance: number;
    price: number;
    rate: number;
}