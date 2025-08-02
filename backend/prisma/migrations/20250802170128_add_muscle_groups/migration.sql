-- CreateEnum
CREATE TYPE "public"."MuscleGroup" AS ENUM ('CHEST', 'BACK', 'LEGS', 'SHOULDERS', 'BICEPS', 'TRICEPS', 'CORE', 'GLUTES', 'FULL_BODY');

-- AlterTable
ALTER TABLE "public"."Exercise" ADD COLUMN     "muscleGroups" "public"."MuscleGroup"[];

-- AlterTable
ALTER TABLE "public"."WorkoutPlan" ADD COLUMN     "muscleGroups" "public"."MuscleGroup"[];
