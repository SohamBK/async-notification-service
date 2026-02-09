import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

export function setupSwagger() {
  const router = Router();

  const swaggerDocument = YAML.load(path.join(__dirname, 'openapi.yaml'));

  router.use(
    '/',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      explorer: true,
      customSiteTitle: 'Async Notification Service Docs',
    }),
  );

  return router;
}
