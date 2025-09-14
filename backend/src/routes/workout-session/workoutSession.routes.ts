import { Router } from 'express';
import { requireAuth } from '../../middleware/auth/auth.middleware';
import { createWorkoutSession, deleteWorkoutSession, checkIfWorkoutSessionExists, getWorkoutSessionById, updateWorkoutSession } from './workoutSession.controller';

const router = Router();

router.use(requireAuth);
router.post('/create', createWorkoutSession);
router.delete('/:id', deleteWorkoutSession);
router.get('/exists', checkIfWorkoutSessionExists);
router.get('/:id', getWorkoutSessionById)
router.put('/:id', updateWorkoutSession); // Reuse create for upsert

export default router;
