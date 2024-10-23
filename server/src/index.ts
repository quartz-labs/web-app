import express from 'express';
import cors from 'cors';
import { json } from 'express';
import { DriftClientManager } from './driftClientManager.js';
import { setupRoutes } from './routes.js';

// Set up Express server
const app = express();
const port = process.env.PORT || 3000;

// Configure middleware
//app.use(cors());
app.use(json());

// Initialize DriftClientManager
const driftClientManager = new DriftClientManager();

// Set up API routes
setupRoutes(app, driftClientManager);

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
