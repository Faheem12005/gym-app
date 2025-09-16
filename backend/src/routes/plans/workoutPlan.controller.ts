
import { Request, Response } from 'express';
import prisma from '../../libs/prisma';
import { JwtPayload } from 'jsonwebtoken';

type AuthenticatedRequest = Request & {
  user?: JwtPayload & { userId: string };
};

export const createWorkoutPlan = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }
    const count = await prisma.workoutPlan.count({
      where: { userId }
    });

    const plan = await prisma.workoutPlan.create({
      data: {
        userId: userId,
        name: `My Workout Plan ${count + 1}`,
        muscleGroups: [],
      }
    });
    res.status(201).json(plan);
    console.log("Workout plan created successfully:", plan);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: errorMessage });
  }
};

export const getAllWorkoutPlansForUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required.' });
    }
    const plans = await prisma.workoutPlan.findMany({
      where: { userId },
      include: {
        workoutDays: {
          include: { exercises: true }
        }
      }
    });
    return res.json(plans);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

export const getWorkoutPlan = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const plan = await prisma.workoutPlan.findUnique({
      where: { id },
      include: {
        workoutDays: {
          include: { exercises: true }
        }
      }
    });
    if (!plan) return res.status(404).json({ error: 'Workout plan not found.' });
    res.json(plan);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateWorkoutPlan = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const plan = await prisma.workoutPlan.update({
      where: { id },
      data: { name },
    });
    res.json(plan);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteWorkoutPlan = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    // Cascade delete workoutDays and their exercises
    await prisma.workoutDayExercise.deleteMany({
      where: {
        day: {
          planId: id
        }
      }
    });
    await prisma.workoutDay.deleteMany({ where: { planId: id } });
    await prisma.workoutPlan.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};


