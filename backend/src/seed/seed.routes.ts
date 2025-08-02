import { Router } from 'express';
import { PrismaClient, MuscleGroup, Prisma } from '../../generated/prisma';

const router = Router();
const prisma = new PrismaClient();

const seedExercises: Prisma.ExerciseCreateManyInput[] = [
  { name: 'Bench Press', description: 'Chest exercise', userDefined: false, muscleGroups: { set: [MuscleGroup.CHEST, MuscleGroup.TRICEPS, MuscleGroup.SHOULDERS] } },
  { name: 'Squat', description: 'Leg exercise', userDefined: false, muscleGroups: { set: [MuscleGroup.LEGS, MuscleGroup.GLUTES] } },
  { name: 'Deadlift', description: 'Back exercise', userDefined: false, muscleGroups: { set: [MuscleGroup.BACK, MuscleGroup.LEGS, MuscleGroup.GLUTES] } },
  { name: 'Overhead Press', description: 'Shoulder exercise', userDefined: false, muscleGroups: { set: [MuscleGroup.SHOULDERS, MuscleGroup.TRICEPS] } },
  { name: 'Barbell Row', description: 'Back exercise', userDefined: false, muscleGroups: { set: [MuscleGroup.BACK, MuscleGroup.BICEPS] } },
  { name: 'Pull Up', description: 'Back exercise', userDefined: false, muscleGroups: { set: [MuscleGroup.BACK, MuscleGroup.BICEPS] } },
  { name: 'Bicep Curl', description: 'Arm exercise', userDefined: false, muscleGroups: { set: [MuscleGroup.BICEPS] } },
  { name: 'Tricep Extension', description: 'Arm exercise', userDefined: false, muscleGroups: { set: [MuscleGroup.TRICEPS] } },
  { name: 'Lunge', description: 'Leg exercise', userDefined: false, muscleGroups: { set: [MuscleGroup.LEGS, MuscleGroup.GLUTES] } },
  { name: 'Plank', description: 'Core exercise', userDefined: false, muscleGroups: { set: [MuscleGroup.CORE] } }
];

router.post('/exercises', async (req, res) => {
  try {
    await prisma.exercise.createMany({ data: seedExercises });
    res.status(201).json({ message: 'Seed exercises inserted.' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;