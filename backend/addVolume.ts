import prisma from './libs/prisma';


const backfillWorkoutMetrics = async () => {
  console.log('Starting data backfill...');

  try {
    // --- Backfill WorkoutLog volume ---
    console.log('Backfilling WorkoutLog volume...');
    const workoutLogs = await prisma.workoutLog.findMany({
      where: {
        volume: null, // Only fetch records that need backfilling
      },
    });

    for (const log of workoutLogs) {
      // Calculate total volume
      const totalVolume = log.repsPerSet.reduce(
        (sum: number, reps: number, index: number) => sum + reps * log.weightPerSet[index],
        0,
      );

      // Update the record with the calculated volume
      await prisma.workoutLog.update({
        where: { id: log.id },
        data: { volume: totalVolume },
      });
    }
    console.log(`Successfully backfilled ${workoutLogs.length} workout logs.`);

    // --- Backfill WorkoutSession duration ---
    console.log('Backfilling WorkoutSession duration...');
    const workoutSessions = await prisma.workoutSession.findMany({
      where: {
        AND: [
          { endTime: { not: null } }, // Only include completed sessions
          { duration: null }, // Only fetch records that need backfilling
        ],
      },
    });

    for (const session of workoutSessions) {
      // Calculate duration in minutes, handling potential nulls
      const durationMs = session.endTime!.getTime() - session.startTime.getTime();
      const durationMinutes = durationMs / (1000 * 60);

      // Update the record with the calculated duration
      await prisma.workoutSession.update({
        where: { id: session.id },
        data: { duration: durationMinutes },
      });
    }
    console.log(`Successfully backfilled ${workoutSessions.length} workout sessions.`);

  } catch (error) {
    console.error('An error occurred during backfilling:', error);
  } finally {
    await prisma.$disconnect();
    console.log('Backfill process complete.');
  }
};

backfillWorkoutMetrics();