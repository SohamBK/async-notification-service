import express, { Application } from 'express';
import v1Routes from './api/v1';
import { errorHandler } from './middleware/error-handler';
import { requestIdMiddleware } from './middleware/request-id';
import { httpLogger } from './middleware/http-logger';
import { setupSwagger } from './swagger';

export function createApp(): Application {
  const app = express();

  // Request-scoped context
  app.use(requestIdMiddleware);
  app.use(httpLogger);

  app.use(express.json());

  // API routes
  app.use('/api/v1', v1Routes);

  // Swagger docs (must be BEFORE 404)
  app.use('/docs', setupSwagger());

  // 404 handler (LAST non-error middleware)
  app.use((_req, _res, next) => {
    next(new Error('Route not found'));
  });

  // Error handler (ABSOLUTELY LAST)
  app.use(errorHandler);

  return app;
}
