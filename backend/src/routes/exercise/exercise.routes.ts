import { Router } from 'express';
import { requireAuth } from '../../middleware/auth/auth.middleware';
import { getAllExercises, getExerciseById } from './exercise.controller';

const router = Router();

router.use(requireAuth);
router.get("/", getAllExercises);
router.get("/:id", getExerciseById);

export default router