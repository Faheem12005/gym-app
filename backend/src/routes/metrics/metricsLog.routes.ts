import { Router } from 'express';
import { requireAuth } from '../../middleware/auth/auth.middleware';
import { getAggWorkoutMetricsForUser, getWorkoutSessionsForUser } from './metricsLog.controller';

const router = Router();

router.use(requireAuth);
router.get('/:userId', getWorkoutSessionsForUser);
router.get('/', getAggWorkoutMetricsForUser);

export default router;
