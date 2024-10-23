import express from 'express';
import { json } from 'express';
import { DriftClientManager } from './driftClientManager.js';
import { setupRoutes } from './routes.js';
import { PORT } from './config.js';

const app = express();
const port = PORT;

// Configure middleware
app.use(json());

const driftClientManager = new DriftClientManager();

setupRoutes(app, driftClientManager);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
