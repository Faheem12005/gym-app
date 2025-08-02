
import { Request, Response } from 'express';
import prisma from '../../../libs/prisma';

export const createWorkoutPlan = async (req: Request, res: Response) => {
  try {
    const { userId, name } = req.body;
    if (!userId || !name) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }
    const plan = await prisma.workoutPlan.create({
      data: {
        userId,
        name,
      }
    });
    res.status(201).json(plan);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: errorMessage });
  }
};

export const getWorkoutPlan = async (req: Request, res: Response) => {
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

export const updateWorkoutPlan = async (req: Request, res: Response) => {
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

export const deleteWorkoutPlan = async (req: Request, res: Response) => {
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


