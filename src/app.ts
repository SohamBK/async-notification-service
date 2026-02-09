import express, { Application } from 'express';
import { errorHandler } from './middleware/error-handler';

export function createApp(): Application {
  const app = express();

  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.status(200).json({
      success: true,
      data: { status: 'ok' },
      meta: {},
    });
  });

  // 404 handler (must be AFTER routes)
  app.use((_req, _res, next) => {
    next(new Error('Route not found'));
  });

  // Centralized error handler (last middleware)
  app.use(errorHandler);

  return app;
}
