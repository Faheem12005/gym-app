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
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[] | []>([]);

  useEffect(() => {
    const fetchWorkoutPlans = async () => {
      try {
        const response = await api.get("/workout", {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        });
        setWorkoutPlans(response.data);
      } catch (error) {
        console.error("Error fetching workout plans:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkoutPlans();
  }, [session?.token]);

  const onPress = async () => {
    try {
      router.push("/define-plan/cmdwrr0fj0001imkqzfw51yl3");
    } catch (error) {
      console.log("Error creating workout plan:", error);
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
      {loading ? (
        <Button
          className="flex-row items-center bg-app-dark-background gap-2 w-48 absolute bottom-4 right-4 z-10"
          size="lg"
          action="primary"
          disabled
        >
          <ButtonSpinner className="mr-2" />
          <ButtonText className="text-app-light-background text-sm">Loading...</ButtonText>
        </Button>
      ) : (
        <Button
          className="flex-row items-center bg-app-dark-background gap-2 w-48 absolute bottom-4 right-4 z-10"
          onPress={onPress}
          size="lg"
          action="primary"
        >
          <AntDesign name="plus" color={Colors.light.background} size={18} />
          <ButtonText className="text-app-light-background text-sm">NEW PLAN</ButtonText>
        </Button>
      )}
      <FlatList
        ItemSeparatorComponent={() => (
          <Box className="h-3" />
        )}
        data={workoutPlans}
        renderItem={({ item }) => (
          <Box className="bg-black p-5 w-full rounded-lg justify-center items-center">
            <Text size="md" bold className="text-white tracking-wide">{item.name}</Text>
          </Box>
        )}
      />
    </Box>
  );
}
