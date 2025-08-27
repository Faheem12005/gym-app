import { useStorageState } from "@/utils/useStorageState";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import { WorkoutPlanWithRelations, WorkoutDayWithRelations, Exercise } from "@/app/types/generated/zod";

interface Props {
  exercise: Exercise;
  values: {
    weight: number;
    reps: number;
    sets: number;
    order: number;
  };
}

function getCurrentWorkoutDay(workoutPlan: WorkoutPlanWithRelations) {
  const today = new Date().getDay();
  if (!workoutPlan?.workoutDays) return null;
  return workoutPlan.workoutDays.find(day => day.dayOfWeek === today) || null;
}

const getFullExercise = async (exercises: any[], token: string): Promise<Props[]> => {
  try {
    const results = await Promise.all(
      exercises.map(async (exercise) => {
        try {
          const response = await api.get(`/exercises/${exercise.exerciseId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const exerciseData: Exercise = response.data;
          return {
            exercise: exerciseData,
            values: {
              weight: exercise.weights,
              reps: exercise.reps,
              sets: exercise.sets,
              order: exercise.order,
            },
          };
        } catch (err) {
          console.error(`Failed to fetch exercise ${exercise.exerciseId}:`, err);
          return null;
        }
      })
    );
    return results.filter((item): item is Props => item !== null);
  } catch (err) {
    console.error("Failed to fetch full exercises:", err);
    return [];
  }
};

export function useWorkoutSession(sessionToken: string) {
  const [[loading, storedPlan]] = useStorageState<WorkoutPlanWithRelations | undefined>("plan");
  const workoutDay: WorkoutDayWithRelations | null = getCurrentWorkoutDay(storedPlan!);
  const [fullExercises, setFullExercises] = useState<Props[]>([]);

  useEffect(() => {
    if (workoutDay && workoutDay.exercises) {
      getFullExercise(workoutDay.exercises, sessionToken).then(setFullExercises);
    }
  }, [workoutDay, sessionToken]);

  return { loading, workoutDay, fullExercises };
}
