import { cache } from "../index.js";

export async function getPriceData(asset: string): Promise<any> {
    const cacheKey = `price_${asset}`;
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
        return cachedData;
    }

    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${asset}&vs_currencies=usd`);
    const data = await response.json();

    cache.set(cacheKey, data);

    return data;
}
