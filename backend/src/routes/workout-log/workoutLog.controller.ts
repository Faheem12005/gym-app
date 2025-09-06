import { Request, Response } from 'express';
import prisma from '../../../libs/prisma';
import { z } from 'zod';

const WorkoutLogSchema = z.object({
  exerciseId: z.string(),
  repsPerSet: z.array(z.number().min(1)),
  weightPerSet: z.array(z.number().min(0)),
  noSets: z.number().min(1),
})

const WorkoutLogSchemaArray = z.array(WorkoutLogSchema);

export const createWorkoutLog = async (
  req: any,
  res: any
) => {
  try {
    const validated = WorkoutLogSchemaArray.parse(req.body);
    const log = await prisma.workoutLog.createMany({
      data: validated.map(entry => ({
        userId: req.user.userId,
        exerciseId: entry.exerciseId,
        repsPerSet: entry.repsPerSet,
        weightPerSet: entry.weightPerSet,
        setsCompleted: entry.noSets,
      })),
    });
    res.status(201).json(log);
  } catch (error) {
    if(error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues });
    }
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteWorkoutLog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.workoutLog.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
