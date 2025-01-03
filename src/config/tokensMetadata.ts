import { MarketIndex, TOKENS } from "@quartz-labs/sdk";
import type { TokenMetadata } from "../types/interfaces/TokenMetadata.interface";

export const TOKENS_METADATA = Object.fromEntries(
    Object.entries(TOKENS).map(([index, token]) => {
        const coingeckoPriceId = {
            'USDC': 'usd-coin',
            'SOL': 'solana',
            'USDT': 'tether',
            'PYUSD': 'paypal-usd',
            'USDS': 'usds'
        }[token.name];

        if (!coingeckoPriceId) {
            throw new Error(`Coingecko price ID not found for token ${token.name}`);
        }

        return [
            index,
            {
                name: token.name,
                mint: token.mint,
                pythPriceFeedId: token.pythPriceFeedId,
                decimalPrecision: token.decimalPrecision,
                icon: `${token.name.toLowerCase()}.webp`,
                coingeckoPriceId,
            }
        ];
    })
) as Record<MarketIndex, TokenMetadata>;