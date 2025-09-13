import { WorkoutPlanWithRelations } from "@/app/types/generated/zod";

export function getCurrentWorkoutDay(workoutPlan: WorkoutPlanWithRelations) {
  const today = new Date().getDay();
  if (!workoutPlan?.workoutDays) return null;
  return workoutPlan.workoutDays.find((day) => day.dayOfWeek === today) || null;
}