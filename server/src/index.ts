import express from 'express';
import { json } from 'express';
import { DriftClientManager } from './driftClientManager.js';
import { setupRoutes } from './routes.js';

const app = express();
const port = process.env.PORT || 3000;

// Configure middleware
app.use(json());

const driftClientManager = new DriftClientManager();

setupRoutes(app, driftClientManager);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
