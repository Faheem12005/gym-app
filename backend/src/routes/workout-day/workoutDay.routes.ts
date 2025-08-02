import { Router } from 'express';
import { requireAuth } from '../../middleware/auth/auth.middleware';
import {
  createWorkoutDay,
  getWorkoutDay,
  updateWorkoutDay,
  deleteWorkoutDay
} from './workoutDay.controller';

const router = Router();

router.use(requireAuth);

router.post('/create', createWorkoutDay);
router.get('/:id', getWorkoutDay);
router.put('/:id', updateWorkoutDay);
router.delete('/:id', deleteWorkoutDay);

export default router;
