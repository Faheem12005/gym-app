import { Request, Response } from 'express';
import prisma from '../../../libs/prisma';
import { Prisma } from '../../../generated/prisma';

export const createWorkoutLog = async (
  req: Request<{}, {}, Prisma.WorkoutLogCreateInput>,
  res: Response
) => {
  try {
    const log = await prisma.workoutLog.create({
      data: req.body
    });
    res.status(201).json(log);
  } catch (error) {
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
