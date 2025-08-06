import { ScrollView } from "react-native";
import { WorkoutDayWithRelations } from "@/app/types/generated/zod";
import DayView from "./DayView";
import { useRouter } from "expo-router";
import api from "@/utils/api";
import { useSession } from "@/auth/authContext";
import { useState } from "react";
interface Props {
  planId: string;
  workoutDays: WorkoutDayWithRelations[];
}

export default function WeeklyScheduleView({ workoutDays, planId }: Props) {
  const router = useRouter();
  const { session } = useSession();
  const [days, setDays] = useState<WorkoutDayWithRelations[]>(workoutDays);
  const onPressWorkoutDay = async (
    isWorkoutDay: boolean,
    existingId: string | null,
    planId: string,
    dayOfWeek: number
  ) => {
    try {
      if (isWorkoutDay && existingId) {
        router.push(`/(plans)/define-day/${existingId}`);
      } else {
        // Create workout day with empty exercises
        const response = await api.post("/workout-day/create", {
          planId,
          dayOfWeek,
          exercises: [], // initially empty
        },
      {
        headers: {
          Authorization: `Bearer ${session?.token}`
        }
      });
        const newId = response.data.id;
        const newDay = response.data;
        setDays((prev) => [...prev, newDay]);
        router.push(`/(plans)/define-day/${newId}`);
      }
    } catch (error) {
      console.error("Failed to handle workout day press:", error);
    }
  };

  return (
    <ScrollView>
      {Array.from({ length: 7 }, (_, day) => {
        const matchingDay = days.find((wd) => wd.dayOfWeek === day);
        return (
          <DayView
            onPress={() => onPressWorkoutDay(!!matchingDay, matchingDay ? matchingDay.id : null, planId, day)}
            key={day}
            isWorkoutDay={!!matchingDay}
            dayOfTheWeek={day}
            workoutDay={matchingDay ?? null}
          />
        );
      })}
    </ScrollView>
  );
}
