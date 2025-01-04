import type { MarketIndex } from "@quartz-labs/sdk/browser";

export interface AssetInfo {
    marketIndex: MarketIndex;
    balance: number;
    price: number;
    rate: number;
}