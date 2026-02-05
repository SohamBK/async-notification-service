import express, { Application } from 'express';

export function createApp(): Application {
  const app = express();

  // Core middleware
  app.use(express.json());

  // Health check (used by Docker / k8s / monitoring)
  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  return app;
}
