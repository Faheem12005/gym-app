import { Exercise } from '../../../generated/prisma';
import { Request, Response } from 'express';
import prisma from '../../../libs/prisma';

export const createWorkoutDay = async (req: Request, res: Response) => {
  try {
    const { planId, dayOfWeek, exercises } = req.body;
    if (!planId || dayOfWeek === undefined || !Array.isArray(exercises)) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }
    const workoutDay = await prisma.workoutDay.create({
      data: {
        ...req.body,
        exercises: {
          create: req.body.exercises.map((ex: Exercise) => ({
            ...ex,
            exercise: { connect: { id: ex.id } }
          }))
        }
      },
      include: { exercises: true }
    });
    res.status(201).json(workoutDay);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getWorkoutDay = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workoutDay = await prisma.workoutDay.findUnique({
      where: { id },
      include: { 
        exercises: {
          include: {
            exercise: true,
          }
        }
      }
    });
    if (!workoutDay) return res.status(404).json({ error: 'Workout day not found.' });
    res.json(workoutDay);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateWorkoutDay = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { dayOfWeek } = req.body;
    const workoutDay = await prisma.workoutDay.update({
      where: { id },
      data: {
        dayOfWeek,
        // For exercises, you may want to handle update logic more granularly
      }
    });
    res.json(workoutDay);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteWorkoutDay = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.workoutDay.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
