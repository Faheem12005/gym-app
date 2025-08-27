import { Request, Response } from 'express';
import prisma from '../../../libs/prisma';
import jwt from 'jsonwebtoken';
import { groupByFirstLetter } from '../../utils/exerciseUtils';

export const getAllExercises = async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: 'Authorization header missing' });
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
        const userId = decoded.userId;
        const exercises = await prisma.exercise.findMany({
            where: {
                OR: [
                    {createdBy: null},
                    {createdById: userId},
                ]
            },
            orderBy: {
                name: 'asc',
            }
        })
        const grouped = groupByFirstLetter(exercises);
        res.status(200).json(grouped);
    } catch(error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        res.status(500).json({ error: errorMessage });
    }
};

export const getExerciseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Exercise id is required.' });
    }
    const exercise = await prisma.exercise.findUnique({
      where: { id },
    });
    if (!exercise) {
      return res.status(404).json({ error: 'Exercise not found.' });
    }
    return res.json(exercise);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ error: errorMessage });
  }
};
