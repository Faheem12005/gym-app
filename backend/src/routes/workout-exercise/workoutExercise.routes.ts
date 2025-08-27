import { Router } from 'express';
import { requireAuth } from '../../middleware/auth/auth.middleware';
import { addWorkoutDayExercises, updateWorkoutDayExercises } from './workoutExercise.controller';

const router = Router();

router.use(requireAuth);
router.post('/', addWorkoutDayExercises);
router.put('/', updateWorkoutDayExercises);

export default router;
