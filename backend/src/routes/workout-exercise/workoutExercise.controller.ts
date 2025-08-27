import { Request, Response } from 'express';
import prisma from '../../../libs/prisma';

export const addWorkoutDayExercises = async (req: Request, res: Response) => {
  try {
    const { workoutDayId, exercises } = req.body;
    if (!workoutDayId || !Array.isArray(exercises)) {
      return res.status(400).json({ error: 'Invalid request body.' });
    }
    // Step 2: Insert new ones
    const created = await prisma.workoutDayExercise.createMany({
      data: exercises.map((ex: any, index: number) => ({
        dayId: workoutDayId,
        exerciseId: ex.exercise.id,
        order: ex.order ?? index, // fallback to index if not provided
        sets: ex.sets ?? 3,
        reps: ex.reps ?? 10,
        weights: ex.weights ?? 10,
        restSeconds: ex.restSeconds ?? 60,
      })),
    });

    return res.status(201).json({ count: created.count });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ error: errorMessage });
  }
};

export const updateWorkoutDayExercises = async (req: Request, res: Response) => {
  try {
    const { exercises } = req.body;
    if (!Array.isArray(exercises) || exercises.length === 0) {
      return res.status(400).json({ error: 'No exercises provided for update.' });
    }
    // Update each exercise in the array
    const updateResults = await Promise.all(
      exercises.map(async (ex: any) => {
        return prisma.workoutDayExercise.update({
          where: { id: ex.id },
          data: {
            sets: ex.sets,
            reps: ex.reps,
            weights: ex.weights,
            restSeconds: ex.restSeconds,
            order: ex.order,
            exerciseId: ex.exercise.id,
            dayId: ex.dayId,
          },
        });
      })
    );
    return res.status(200).json({ updated: updateResults });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ error: errorMessage });
  }
};
