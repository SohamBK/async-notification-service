import express, { Application } from 'express';
import { errorHandler } from './middleware/error-handler';
import { requestIdMiddleware } from './middleware/request-id';
import { httpLogger } from './middleware/http-logger';

export function createApp(): Application {
  const app = express();

  // Request-scoped context
  app.use(requestIdMiddleware);
  app.use(httpLogger);

  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.status(200).json({
      success: true,
      data: { status: 'ok' },
      meta: {},
    });
  });

  app.use((_req, _res, next) => {
    next(new Error('Route not found'));
  });

  app.use(errorHandler);

  return app;
}
