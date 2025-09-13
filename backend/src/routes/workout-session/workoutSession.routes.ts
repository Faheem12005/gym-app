import { Router } from 'express';
import { requireAuth } from '../../middleware/auth/auth.middleware';
import { createWorkoutSession, deleteWorkoutSession, checkIfWorkoutSessionExists, getWorkoutSessionById } from './workoutSession.controller';

const router = Router();

router.use(requireAuth);
router.post('/create', createWorkoutSession);
router.delete('/:id', deleteWorkoutSession);
router.get('/exists', checkIfWorkoutSessionExists);
router.get('/:id', getWorkoutSessionById)

export default router;
