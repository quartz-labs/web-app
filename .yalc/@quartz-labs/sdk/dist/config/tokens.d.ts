import type { Token } from "../types/interfaces/token.interface.js";
export declare const MarketIndex: readonly [1, 0, 5, 22, 28, 3];
export type MarketIndex = (typeof MarketIndex)[number];
export declare function getMarketIndicesRecord<T>(defaultValue: T): Record<MarketIndex, T>;
export declare const TOKENS: Record<MarketIndex, Token>;
//# sourceMappingURL=tokens.d.ts.map