import { VStack } from "@/components/ui/vstack";
import { Spinner } from "@/components/ui/spinner";
import SessionExerciseView from "@/components/SessionExerciseView";
import { Text, ScrollView, View } from "react-native";
import { WorkoutDayWithRelations } from "@/app/types/generated/zod";

interface Props {
  loading: boolean;
  workoutDay: WorkoutDayWithRelations | null;
  fullExercises: any[];
  title?: string;
}

export default function WorkoutSessionScreen({ loading, workoutDay, fullExercises, title }: Props) {
  if (loading) return (
    <View className="flex-1 justify-center items-center">
      <Spinner color="black" size="large" />
    </View>
  );

  return (
    <VStack className="flex-1 p-4 gap-2">
      <Text className="text-2xl font-bold">{title || workoutDay?.name}</Text>
      <ScrollView>
        <View className="flex-col gap-4">
          {fullExercises.map((ex) => (
            <SessionExerciseView key={ex.exercise.id} exercise={ex.exercise} values={ex.values} />
          ))}
        </View>
      </ScrollView>
    </VStack>
  );
}
