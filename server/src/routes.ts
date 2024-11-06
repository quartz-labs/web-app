import { Express, Request, Response } from 'express';
import { DriftClientManager, getDriftData } from './api/driftClientManager.js';
import { getPriceData } from './api/getPrice.js';

// Initialize cache with a default TTL of 60 seconds
export function setupRoutes(app: Express, driftClientManager: DriftClientManager) {
  app.get('/drift-data', async (req: Request, res: Response) => {
    const address = req.query.address as string;
    const marketIndicesParam = req.query.marketIndices as string;
    const marketIndices = marketIndicesParam.split(',').map(Number).filter(n => !isNaN(n));

    try {
      const driftData = await getDriftData(address, marketIndices, driftClientManager);
      res.status(200).json(driftData);
    } catch (error) {
      console.error('Error fetching Data data:', error);
      res.status(500).json({ error: 'Failed to retrieve Drift data' });
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