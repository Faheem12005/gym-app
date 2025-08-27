-- AlterTable
ALTER TABLE "public"."WorkoutDay" ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'Workout day';

-- AlterTable
ALTER TABLE "public"."WorkoutDayExercise" ADD COLUMN     "weights" DOUBLE PRECISION NOT NULL DEFAULT 7.5;
