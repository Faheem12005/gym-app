import { useLocalSearchParams } from "expo-router";
import { Text } from "@/components/ui/text";
import api from "@/utils/api";
import { useEffect, useState } from "react";
import { WorkoutPlanWithRelations } from "@/app/types/generated/zod";
import { useSession } from "@/auth/authContext";
import WeeklyScheduleView from "@/components/WeeklyScheduleView";
import { SafeAreaView } from "react-native-safe-area-context";
import { Spinner } from "@/components/ui/spinner";
import { View } from "react-native";

export default function CreatePlanPage() {
  const { id } = useLocalSearchParams();
  const { session } = useSession();
  const [plan, setPlan] = useState<null | WorkoutPlanWithRelations>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await api.get(`/workout-plans/${id}`, {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        });
        setPlan(response.data);
      } catch (error) {
        console.error("Error fetching workout plan:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Spinner size="large" color="black" />
      </View>
    );
  }

  return (
    <SafeAreaView className="p-4 flex-1 gap-2">
      <Text className="font-bold text-3xl">{plan?.name}</Text>
      <Text className="font-light">{plan?.id}</Text>
      <WeeklyScheduleView planId={id} workoutDays={plan?.workoutDays ?? []} />
    </SafeAreaView>
  );
}
