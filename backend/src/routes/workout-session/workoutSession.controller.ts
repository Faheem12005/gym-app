import { Request, Response } from 'express';
import prisma from '../../../libs/prisma';
import { z } from 'zod';

const WorkoutSessionSchema = z.object({
  userId: z.string(),
  workoutDayId: z.string(),
  notes: z.string().max(500).optional(),
});

export const createWorkoutSession = async (
  req: Request,
  res: Response
) => {
  try {
    const validated = WorkoutSessionSchema.parse(req.body);
    const session = await prisma.workoutSession.create({
        data: {
            userId: validated.userId,
            workoutDayId: validated.workoutDayId,
        }
    })
    res.status(201).json(session);
  } catch (error) {
    if(error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues });
    }
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteWorkoutSession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.workoutSession.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const checkIfWorkoutSessionExists = async (req: Request, res: Response) => {
  try {
    const { userId, workoutDayId } = req.query;
    if (!userId || !workoutDayId) {
      return res.status(400).json({ error: 'userId and workoutDayId are required.' });
    }
    if (typeof userId !== "string" || typeof workoutDayId !== "string") {
      return res.status(400).json({ error: "userId and workoutDayId must be strings" });
    }
    const session = await prisma.workoutSession.findFirst({
      where: {
        userId,
        workoutDayId
      },
      orderBy: { startTime: 'desc' },
    });

    if (session) {
      console.log("Found workout session:", session);
      return res.status(200).json({ exists: true, session });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};