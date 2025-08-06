import { Router } from 'express';
import { requireAuth } from '../../middleware/auth/auth.middleware';
import { getAllExercises } from './exercise.controller';

const router = Router();

router.use(requireAuth);
router.get("/", getAllExercises);

export default router