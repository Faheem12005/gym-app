import { View, Text, ScrollView } from "react-native";
import { useAsyncStorage } from "@/hooks/useAsyncStorage";
import { Spinner } from "@/components/ui/spinner";
import {
  WorkoutPlanWithRelations,
  WorkoutDayWithRelations,
  Exercise,
} from "@/app/types/generated/zod";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import { useSession } from "@/auth/authContext";
import { VStack } from "@/components/ui/vstack";
import SessionExerciseView from "@/components/SessionExerciseView";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { AxiosError } from "axios";

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
  return workoutPlan.workoutDays.find((day) => day.dayOfWeek === today) || null;
}

const getFullExercise = async (
  exercises: any[],
  token: string
): Promise<Props[]> => {
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
          console.error(
            `Failed to fetch exercise ${exercise.exerciseId}:`,
            err
          );
          return null;
        }
      })
    );
    return results.filter((item): item is Props => item !== null);
  } catch (err) {
    if (err instanceof AxiosError) {
      console.error("Failed to fetch full exercises:", err.message);
    } else {
      console.error("Failed to fetch full exercises:", err);
    }
    return [];
  }
};

export default function RunSession() {
  const router = useRouter();
  const { session } = useSession();
  const [storedPlan, setStoredPlan, loading, remove] = useAsyncStorage<
    WorkoutPlanWithRelations | undefined
  >("plan");
  const workoutDay: WorkoutDayWithRelations | null = getCurrentWorkoutDay(
    storedPlan!
  );
  const [fullExercises, setFullExercises] = useState<Props[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [exercisesLoading, setExercisesLoading] = useState(false);
  const [exerciseState, setExerciseState] = useState<{
    [exerciseId: string]: {
      completed: boolean;
      reps: number;
      weight: number;
    }[];
  }>({});

  const removeSet = (exerciseId: string) => {
    setExerciseState((prev) => {
      const sets = prev[exerciseId];
      if (!sets || sets.length === 0) return prev;
      return {
        ...prev,
        [exerciseId]: sets.slice(0, -1),
      };
    });
  };

  const addSet = (exerciseId: string) => {
    setExerciseState((prev) => ({
      ...prev,
      [exerciseId]: [
        ...prev[exerciseId],
        {
          completed: false,
          reps: prev[exerciseId][0]?.reps ?? 10,
          weight: prev[exerciseId][0]?.weight ?? 10,
        },
      ],
    }));
  };

  const updateSet = (
    exerciseId: string,
    newData: Partial<{ completed: boolean; reps: number; weight: number }>,
    setIdx?: number
  ) => {
    if (typeof setIdx !== "number") return;
    setExerciseState((prev) => ({
      ...prev,
      [exerciseId]: prev[exerciseId].map((set, idx) =>
        idx === setIdx ? { ...set, ...newData } : set
      ),
    }));
  };

  const saveSession = async () => {
    setIsSaving(true);
    const reqBody = Object.entries(exerciseState).map(([exerciseId, sets]) => ({
      exerciseId,
      repsPerSet: sets.map((set) => set.reps),
      weightPerSet: sets.map((set) => set.weight),
      noSets: sets.length,
    }));
    try {
      await api.post(`/workout-logs/create`, reqBody, {
        headers: { Authorization: `Bearer ${session?.token}` },
      });
      router.replace("/(session)/view-session/post");
    } catch (error) {
      console.error("Failed to save workout log:", error);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (loading || !storedPlan || !session?.token) return;

    const workoutDay = getCurrentWorkoutDay(storedPlan);
    if (!workoutDay || !workoutDay.exercises) return;

    const fetchAndInitialize = async () => {
      try {
        setExercisesLoading(true);
        const exercises = await getFullExercise(
          workoutDay.exercises,
          session.token
        );
        setFullExercises(exercises);

        // Initialize exerciseState
        const initialState: Record<
          string,
          { completed: boolean; reps: number; weight: number }[]
        > = {};
        exercises.forEach((ex) => {
          initialState[ex.exercise.id] = Array(ex.values.sets)
            .fill(null)
            .map(() => ({
              completed: false,
              reps: ex.values.reps,
              weight: ex.values.weight,
            }));
        });
        setExerciseState(initialState);
      } catch (err) {
        console.error("Failed to fetch and initialize exercises:", err);
      } finally {
        setExercisesLoading(false);
      }
    };

    fetchAndInitialize();
  }, [loading, storedPlan, session?.token]);

  if (loading || isSaving || exercisesLoading)
    return (
      <View className="flex-1 justify-center items-center">
        <Spinner color="black" size="large" />
      </View>
    );

  const allCompleted =
    fullExercises.length > 0 &&
    fullExercises.every((ex) => {
      const sets = exerciseState[ex.exercise.id];
      return sets && sets.length > 0 && sets.every((set) => set.completed);
    });

  return (
    <SafeAreaView className="flex-1">
      <VStack className="flex-1 p-4 gap-2">
        <Text className="text-2xl font-bold">{workoutDay?.name}</Text>
        <ScrollView>
          <View className="flex-col gap-4">
            {fullExercises
              .sort((a, b) => a.values.order - b.values.order)
              .map((ex) => (
                <SessionExerciseView
                  addSet={addSet}
                  editable={true}
                  key={ex.exercise.id}
                  exercise={ex.exercise}
                  values={ex.values}
                  exerciseState={exerciseState}
                  updateSet={updateSet}
                  removeSet={removeSet}
                />
              ))}
          </View>
        </ScrollView>
        {!allCompleted ? (
          <Button className="bg-blue-500 h-16 active:bg-blue-400">
            <ButtonText className="font-bold text-xl text-white">
              LOG NEXT SET
            </ButtonText>
          </Button>
        ) : (
          <Button
            className="bg-blue-500 h-16 active:bg-blue-400"
            onPress={saveSession}
          >
            <ButtonText className="font-bold text-xl text-white">
              FINISH
            </ButtonText>
          </Button>
        )}
      </VStack>
    </SafeAreaView>
  );
}
