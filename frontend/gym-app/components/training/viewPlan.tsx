
import { useAsyncStorage } from "@/hooks/useAsyncStorage";
import { Text } from "../ui/text";
import { useState } from "react";
import { Box } from "../ui/box";
import Entypo from "@expo/vector-icons/Entypo";
import { Button, ButtonIcon, ButtonText } from "../ui/button";
import ShowPlansModal from "@/components/training/showPlansModal";
import { WorkoutPlanWithRelations } from "@/app/types/generated/zod";
import { useRouter } from "expo-router";

export default function ViewPlan() {
  const [storedPlan, setStoredPlan, loading] = useAsyncStorage<WorkoutPlanWithRelations | undefined>("plan");
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <ShowPlansModal
        activePlanId={storedPlan?.id}
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        onSelect={(selectedPlan) => {
          setStoredPlan(selectedPlan);
          setShowModal(false);
        }}
      />
      <Box className="p-4 h-40 bg-gray-800 rounded-xl flex-row items-center justify-between">
        {storedPlan?.id ? (
          <>
            <Text className="text-white font-medium text-3xl">{storedPlan.name}</Text>
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
