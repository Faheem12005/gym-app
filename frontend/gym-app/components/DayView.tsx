import { WorkoutDayWithRelations } from "@/app/types/generated/zod";
import { Button } from "./ui/button";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface Props {
  isWorkoutDay: boolean;
  dayOfTheWeek: number;
  workoutDay: WorkoutDayWithRelations | null;
  onPress?: () => void;
}

const dayOfWeekMap: Record<number, string> = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

export default function DayView({
  isWorkoutDay,
  dayOfTheWeek,
  workoutDay,
  onPress,
}: Props) {

  return (
    <Button
      className="bg-white h-20 rounded-xl px-10 flex justify-between active:bg-gray-200"
      onPress={onPress}
    >
      <VStack>
        <Text className="font-semibold text-3xl">{dayOfWeekMap[dayOfTheWeek]}</Text>
      </VStack>
      <MaterialCommunityIcons
        name={isWorkoutDay ? "weight-lifter" : "sleep"}
        size={24}
        color="black"
      />
    </Button>
  );
}