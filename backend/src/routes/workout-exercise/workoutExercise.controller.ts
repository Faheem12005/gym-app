import { Request, Response } from 'express';
import prisma from '../../../libs/prisma';

export const addWorkoutDayExercises = async (req: Request, res: Response) => {
  try {
    const { workoutDayId, exercises } = req.body;

    if (!workoutDayId || !Array.isArray(exercises)) {
      return res.status(400).json({ error: 'Invalid request body.' });
    }

    // Step 1: Delete old exercises
    await prisma.workoutDayExercise.deleteMany({
      where: { dayId: workoutDayId },
    });

    // Step 2: Insert new ones
    const created = await prisma.workoutDayExercise.createMany({
      data: exercises.map((ex: any, index: number) => ({
        dayId: workoutDayId,
        exerciseId: ex.id,
        order: ex.order ?? index, // fallback to index if not provided
        sets: ex.sets ?? 3,
        reps: ex.reps ?? 10,
        restSeconds: ex.restSeconds ?? 60,
      })),
    });

    return res.status(201).json({ count: created.count });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ error: errorMessage });
  }
};
