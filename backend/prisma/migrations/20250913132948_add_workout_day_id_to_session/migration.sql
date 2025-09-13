/*
  Warnings:

  - Added the required column `workoutDayId` to the `WorkoutSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."WorkoutSession" ADD COLUMN     "workoutDayId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."WorkoutSession" ADD CONSTRAINT "WorkoutSession_workoutDayId_fkey" FOREIGN KEY ("workoutDayId") REFERENCES "public"."WorkoutDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
