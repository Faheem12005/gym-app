import { Router } from 'express';
import { requireAuth } from '../../middleware/auth/auth.middleware';
import { addWorkoutDayExercises } from './workoutExercise.controller';

const router = Router();

router.use(requireAuth);
router.post('/', addWorkoutDayExercises);

export default router;
