import express, { json } from "express";
import NodeCache from "node-cache";
import { DriftClientManager } from "./api/driftClientManager.js";
import { PORT } from "./config.js";
import { setupRoutes } from "./routes.js";

const app = express();
const port = PORT;

// Configure middleware
app.use(json());

export const cache = new NodeCache({ stdTTL: 60 });

const driftClientManager = new DriftClientManager();

setupRoutes(app, driftClientManager);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
