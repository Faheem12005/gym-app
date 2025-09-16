import { Request, Response } from 'express';
import prisma from '../../libs/prisma';
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

export const getWorkoutSessionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Workout session id is required.' });
    }
    const session = await prisma.workoutSession.findUnique({
      where: { id },
      include: {
        logs: {
          include: {
            exercise: true,
          }
        }
        
      }
    });
    if (!session) {
      return res.status(404).json({ error: 'Workout session not found.' });
    }
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

export const updateWorkoutSession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Get the existing session so we can read its startTime
    const existing = await prisma.workoutSession.findUnique({
      where: { id },
      select: { startTime: true },
    });

    if (!existing?.startTime) {
      return res.status(400).json({ error: "Session startTime not found" });
    }

    const endTime = new Date();
    const durationMs = endTime.getTime() - existing.startTime.getTime();
    const durationMinutes = Math.floor(durationMs / 1000 / 60); // store in minutes

    const session = await prisma.workoutSession.update({
      where: { id },
      data: {
        endTime,
        duration: durationMinutes,
      },
    });

    res.status(200).json(session);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues });
    }
    res.status(500).json({ error: (error as Error).message });
  }
};
