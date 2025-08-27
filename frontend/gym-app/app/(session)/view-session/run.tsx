import { View, Text, ScrollView } from "react-native";
import { useStorageState } from "@/utils/useStorageState";
import { Spinner } from "@/components/ui/spinner";
import {
  WorkoutPlanWithRelations,
  WorkoutDayWithRelations,
} from "@/app/types/generated/zod";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import { Exercise } from "@/app/types/generated/zod";
import { useSession } from "@/auth/authContext";
import { VStack } from "@/components/ui/vstack";
import SessionExerciseView from "@/components/SessionExerciseView";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { EditIcon } from "@/components/ui/icon";

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
    console.error("Failed to fetch full exercises:", err);
    return [];
  }
};

const onChange = (values: { sets: number; weight: number; reps: number }) => {
  console.log("onChange called with:", values);
};

export default function RunSession() {
  const router = useRouter();
  const { session } = useSession();
  const [[loading, storedPlan], setStoredPlan] = useStorageState<
    WorkoutPlanWithRelations | undefined
  >("plan");
  const workoutDay: WorkoutDayWithRelations | null = getCurrentWorkoutDay(
    storedPlan!
  );
  const [fullExercises, setFullExercises] = useState<Props[]>([]);
  useEffect(() => {
    if (workoutDay && workoutDay.exercises) {
      getFullExercise(workoutDay.exercises, session?.token!).then(
        setFullExercises
      );
    }
  }, [workoutDay]);

  if (loading)
    return (
      <View className="flex-1 justify-center items-center">
        <Spinner color="black" size="large" />
      </View>
    );

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
                  editable={true}
                  key={ex.exercise.id}
                  exercise={ex.exercise}
                  values={ex.values}
                />
              ))}
          </View>
        </ScrollView>
        <Button className="bg-blue-500 h-16 active:bg-blue-400">
          <ButtonText className="font-bold text-xl text-white">LOG NEXT SET</ButtonText>
        </Button>
      </VStack>
    </SafeAreaView>
  );
}
