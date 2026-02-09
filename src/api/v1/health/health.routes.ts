import { Router } from 'express';
import { liveness, readiness } from './health.controller';
import { success } from '../../../utils/response';

const router = Router();

/**
 * Liveness probe
 * Used by container orchestrators to check if app is alive
 */
router.get('/live', async (_req, res, next) => {
  try {
    const data = await liveness();
    return success(res, data);
  } catch (err) {
    next(err);
  }
});

/**
 * Readiness probe
 * Checks if dependencies (DB, etc.) are ready
 */
router.get('/ready', async (_req, res, next) => {
  try {
    const data = await readiness();
    return success(res, data);
  } catch (err) {
    next(err);
  }
});

export default router;
