import { View, Text, StyleSheet, Pressable } from "react-native";
import { WorkoutDayWithRelations } from "@/app/types/generated/zod";

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
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.dayText}>{dayOfWeekMap[dayOfTheWeek]}</Text>
      <Text style={styles.infoText}>
        {isWorkoutDay ? `Workout ID: ${workoutDay?.id}` : "Rest Day"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  pressed: {
    opacity: 0.7,
  },
  dayText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: "#555",
  },
});
