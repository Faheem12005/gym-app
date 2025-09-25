import { Box } from "@/components/ui/box";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { FlatList } from "react-native";
import { useRouter } from "expo-router";
import { useSession } from "@/auth/authContext";
import api from "@/utils/api";
import { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { WorkoutPlan } from "@/app/types/generated/zod";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Spinner } from "@/components/ui/spinner";

export default function CustomPage() {
  const router = useRouter();
  const { session } = useSession();
  const [loading, setLoading] = useState(true);
  const [newPlanLoading, setNewPlanLoading] = useState(false);
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[] | []>([]);

  useEffect(() => {
    const fetchWorkoutPlans = async () => {
      try {
        const response = await api.get("/workout-plans");
        setWorkoutPlans(response.data);
      } catch (error) {
        console.error("Error fetching workout plans:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkoutPlans();
  }, [session?.token]);

  const onPress = async (planId: any) => {
    try {
      router.push(`/define-plan/${planId}`);
    } catch (error) {
      console.log("Error creating workout plan:", error);
    }
  };

  const onCreatePlan = async () => {
    setNewPlanLoading(true);
    try {
      const response = await api.post(
        "/workout-plans",
      );
      setWorkoutPlans((prev) => [...prev, response.data]);
      router.push(`/define-plan/${response.data.id}`);
    } catch (error) {
      console.log("Error creating workout plan:", error);
    } finally {
      setNewPlanLoading(false);
    }
  };

  if (loading) {
    return (
        <Box className="flex-1 justify-center items-center">
          <Spinner size="large" color={Colors.dark.background} />
        </Box>
    );
  }

  return (
      <Box className="flex-1 p-4">
        {newPlanLoading ? (
          <Button
            className="flex-row items-center bg-app-dark-background gap-2 w-48 absolute bottom-4 right-4 z-10"
            size="lg"
            action="primary"
            disabled
          >
            <ButtonSpinner className="mr-2" color="white" />
            <ButtonText className="text-app-light-background text-sm">
              Loading...
            </ButtonText>
          </Button>
        ) : (
          <Button
            className="flex-row items-center bg-gray-800 gap-2 w-48 absolute bottom-4 right-4 z-10 active:bg-gray-700"
            onPress={onCreatePlan}
            size="lg"
            action="primary"
          >
            <AntDesign name="plus" color={Colors.light.background} size={18} />
            <ButtonText className="text-app-light-background text-sm text-white">
              NEW PLAN
            </ButtonText>
          </Button>
        )}
        <FlatList
          ItemSeparatorComponent={() => <Box className="h-3" />}
          data={workoutPlans}
          renderItem={({ item }) => (
            <Button
              onPress={() => onPress(item.id)}
              className="bg-gray-800 h-16 w-full rounded-lg justify-center items-center active:bg-gray-700"
            >
              <Text size="md" bold className="text-white tracking-wide">
                {item.name}
              </Text>
            </Button>
          )}
        />
      </Box>
  );
}
