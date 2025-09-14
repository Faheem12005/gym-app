import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { View } from "react-native";

interface WorkoutSummaryCardProps {
  totalExercises: number;
  totalSets: number;
  totalReps: number;
  totalWeightLifted: number;
}

export default function WorkoutSummaryCard({
  totalExercises,
  totalSets,
  totalReps,
  totalWeightLifted,
}: WorkoutSummaryCardProps) {
  return (
    <Box className="bg-white p-4 mx-4 rounded-lg shadow-md mt-4">
      <Text className="text-xl font-bold mb-4 text-center text-gray-800">
        Workout Summary
      </Text>
      <View className="flex-row justify-around">
        <View className="items-center gap-1">
          <Text className="text-xl font-bold text-blue-500">
            {totalExercises}
          </Text>
          <Text className="text-xs text-gray-600">Exercises</Text>
        </View>
        <View className="items-center gap-1">
          <Text className="text-xl font-bold text-blue-500">
            {totalSets}
          </Text>
          <Text className="text-xs text-gray-600">Total Sets</Text>
        </View>
        <View className="items-center gap-1">
          <Text className="text-xl font-bold text-blue-500">
            {totalReps}
          </Text>
          <Text className="text-xs text-gray-600">Total Reps</Text>
        </View>
        <View className="items-center gap-1">
          <Text className="text-xl font-bold text-blue-500">
            {totalWeightLifted}
          </Text>
          <Text className="text-xs text-gray-600">Total Weight (kg)</Text>
        </View>
      </View>
    </Box>
  );
}
