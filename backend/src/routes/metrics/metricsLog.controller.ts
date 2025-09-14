import { Request, Response } from 'express';
import prisma from '../../../libs/prisma';
import { startOfMonth, endOfMonth } from "date-fns";

export const getAggWorkoutMetricsForUser = async (req: Request, res: Response) => {
  const { userId } = req.user;
    try {
        const totalDuration = await prisma.workoutSession.aggregate({
            _sum: {
                duration: true,
            }
        });
        const totalVolume = await prisma.workoutLog.aggregate({
            _sum: {
                volume: true,
                setsCompleted: true,
            }
        });
        const userMetrics = {
            totalDuration: totalDuration._sum.duration || 0,
            totalVolume: totalVolume._sum.volume || 0,
            totalSets: totalVolume._sum.setsCompleted || 0,
        }
        res.status(200).json(userMetrics);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return res.status(500).json({ error: errorMessage });
    }
}

export const getWorkoutSessionsForUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { cursor } = req.query;

    let date: Date;
    if (cursor) {
      // cursor = start of month previously fetched
      date = new Date(cursor as string);
      // move one month back
      date = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() - 1, 1));
    } else {
      // initial load → current month
      const now = new Date();
      date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
    }

    const start = startOfMonth(date);
    const end = endOfMonth(date);

    const sessions = await prisma.workoutSession.findMany({
      where: {
        userId: userId as string,
        endTime: {
          gte: start,
          lte: end,
        },
      },
      orderBy: { endTime: "desc" },
      include: { 
        logs: {
        include: {
          exercise: true
        }
      } }, // optional
    });

    res.json({
      month: `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}`,
      cursor: start.toISOString(), // return start of this month
      sessions,
    });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
