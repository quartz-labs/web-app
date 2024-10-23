import { Express, Request, Response } from 'express';
import { DriftClientManager } from './driftClientManager.js';

export function setupRoutes(app: Express, driftClientManager: DriftClientManager) {
  // Health check route
  app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK' });
  });

  // Get drift balance for a specific address and market indices
  //@ts-ignore
  app.get('/drift-balance', async (req: Request, res: Response) => {
    console.log("req.query:", req.query);

    const address = req.query.address as string;
    const marketIndicesParam = req.query.marketIndices as string;

    console.log("address:", address);
    console.log("marketIndicesParam:", marketIndicesParam);

    if (!address || !marketIndicesParam) {
      return res.status(400).json({ error: 'Missing address or marketIndices parameter' });
    }

    const marketIndices = marketIndicesParam.split(',').map(Number).filter(n => !isNaN(n));

    console.log('address', address);
    console.log('marketIndices', marketIndices);

    try {
      const balances = await driftClientManager.getUserBalances(address, marketIndices);
      res.status(200).json(balances);
    } catch (error) {
      console.error('Error fetching drift balances:', error);
      res.status(500).json({ error: 'Failed to retrieve balances' });
    }
  });
}