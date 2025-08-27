import { useStorageState } from "@/utils/useStorageState";
import { VStack } from "../ui/vstack";
import { Text } from "../ui/text";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import { Box } from "../ui/box";
import Entypo from "@expo/vector-icons/Entypo";
import { Button, ButtonIcon, ButtonText } from "../ui/button";
import ShowPlansModal from "@/components/training/showPlansModal";
import { WorkoutPlanWithRelations } from "@/app/types/generated/zod";
import { useSession } from "@/auth/authContext";
import { useRouter } from "expo-router";

export default function ViewPlan() {
  const [[loading, storedPlan], setStoredPlan] = useStorageState<WorkoutPlanWithRelations | undefined>("plan");
  const [planId, setPlanId] = useState<string | undefined>(storedPlan?.id);
  const [plan, setPlan] = useState<WorkoutPlanWithRelations | undefined>(storedPlan ?? undefined);
  const [showModal, setShowModal] = useState(false);
  const { session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!planId) return;
    const fetchPlan = async () => {
      try {
        const response = await api.get(`/workout-plan/${planId}`, {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        });
        setPlan(response.data);
        setStoredPlan(response.data);
      } catch (error) {
        console.error("Error fetching workout plan:", error);
      }
    };
    fetchPlan();
  }, [planId, session?.token]);

  useEffect(() => {
    if (storedPlan?.id && !planId) {
      setPlanId(storedPlan.id);
    }
  }, [storedPlan]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <ShowPlansModal
        activePlanId={planId}
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        onSelect={(selectedPlan) => {
          setPlanId(selectedPlan.id);
          setShowModal(false);
        }}
      />
      <Box className="p-4 h-40 bg-gray-800 rounded-xl flex-row items-center justify-between">
        {plan?.id ? (
          <>
            <Text className="text-white font-medium text-3xl">{plan.name}</Text>
            <Button onPress={() => router.push('/(session)/view-session/active')} className="h-20">
              <Entypo
                name="chevron-with-circle-right"
                size={50}
                color="white"
              />
            </Button>
          </>
        ) : (
          <>
            <Text className="text-white font-medium text-3xl">
              SELECT A PLAN
            </Text>
            <Button onPress={() => setShowModal(true)} className="h-20">
              <Entypo
                name="chevron-with-circle-right"
                size={50}
                color="white"
              />
            </Button>
          </>
        )}
      </Box>
      <Button onPress={() => setShowModal(true)} className="bg-gray-800 rounded-xl">
        <ButtonText className="text-white">Change your plan</ButtonText>
      </Button>
    </>
  );
}
