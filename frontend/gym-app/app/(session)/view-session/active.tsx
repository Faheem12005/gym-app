import { View, Text, ScrollView } from "react-native";
import { useAsyncStorage } from "@/hooks/useAsyncStorage";
import { Spinner } from "@/components/ui/spinner";
import { AxiosError } from "axios";
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
import { EditIcon } from "@/components/ui/icon";
import { createWorkoutSession } from "@/services/sessions/workoutSessionService";

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
          const response = await api.get(`/exercises/${exercise.exerciseId}`);
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


export default function ActiveSession() {
  const router = useRouter();
  const { session } = useSession();
  const [loadingExercises, setLoadingExercises] = useState(false);
  const [storedPlan, setStoredPlan, loading, remove] = useAsyncStorage<
    WorkoutPlanWithRelations | undefined
  >("plan");

  const workoutDay: WorkoutDayWithRelations | null =
    getCurrentWorkoutDay(storedPlan!);
  const [fullExercises, setFullExercises] = useState<Props[]>([]);
  useEffect(() => {
    if (workoutDay && workoutDay.exercises) {
      setLoadingExercises(true);
      getFullExercise(workoutDay.exercises, session?.token!).then(
        (exercises) => {
          setFullExercises(exercises);
          setLoadingExercises(false);
        }
      );
    }
  }, [session?.token, workoutDay]);

  if (loading || loadingExercises)
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
                  editable={false}
                  key={ex.exercise.id}
                  exercise={ex.exercise}
                  values={ex.values}
                />
              ))}
          </View>
        </ScrollView>
        <Button
          className="bg-blue-500 h-16"
          onPress={() => {
            router.push("/(session)/view-session/run");
          }}
        >
          <ButtonText className="font-bold text-xl text-white">
            START
          </ButtonText>
        </Button>
        <Button
          className="bg-white h-16"
          onPress={() => router.push(`/(plans)/define-day/${workoutDay?.id}`)}
        >
          <ButtonText className="font-bold text-black text-xl">EDIT</ButtonText>
          <ButtonIcon as={EditIcon} />
        </Button>
      </VStack>
    </SafeAreaView>
  );
}
