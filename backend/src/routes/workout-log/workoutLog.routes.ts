import { Router } from 'express';
import { requireAuth } from '../../middleware/auth/auth.middleware';
import { createWorkoutLog, deleteWorkoutLog } from './workoutLog.controller';

const router = Router();

router.use(requireAuth);
router.post('/create', createWorkoutLog);
router.delete('/:id', deleteWorkoutLog);

export default router;
