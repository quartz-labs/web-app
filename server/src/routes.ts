import { Express, Request, Response } from 'express';
import { DriftClientManager, getDriftBalances, getDriftRates } from './api/driftClientManager.js';
import { getPriceData } from './api/getPrice.js';

// Initialize cache with a default TTL of 60 seconds
export function setupRoutes(app: Express, driftClientManager: DriftClientManager) {
  // Health check route
  app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK' });
  });

  // Get drift balance for a specific address and market indices
  app.get('/drift-balance', async (req: Request, res: Response) => {
    const address = req.query.address as string;
    const marketIndicesParam = req.query.marketIndices as string;

    try {
      const balances = await getDriftBalances(address, marketIndicesParam, driftClientManager);
      res.status(200).json(balances);
    } catch (error) {
      console.error('Error fetching drift balances:', error);
      res.status(500).json({ error: 'Failed to retrieve balances' });
    }
  });

  app.get('/drift-rates', async (req: Request, res: Response) => {
    const marketIndicesParam = req.query.marketIndices as string;

    try {
      const rates = await getDriftRates(marketIndicesParam, driftClientManager);
      res.status(200).json(rates);
    } catch (error) {
      console.error('Error fetching drift rates:', error);
      res.status(500).json({ error: 'Failed to retrieve rates' });
    }
  });

  app.get('/get-price', async (req: Request, res: Response) => {
    const asset = req.query.asset as string;

    try {
      const data = await getPriceData(asset);
      const priceUsdc = data[asset].usd;
      res.status(200).json(priceUsdc);
    } catch (error) {
      console.error('Error fetching price data:', error);
      res.status(500).json({ error: 'Failed to fetch price data' });
    }
  });
}