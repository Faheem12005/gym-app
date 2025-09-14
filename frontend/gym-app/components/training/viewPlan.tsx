import { useAsyncStorage } from "@/hooks/useAsyncStorage";
import { Text } from "../ui/text";
import { useEffect, useState } from "react";
import { Box } from "../ui/box";
import Entypo from "@expo/vector-icons/Entypo";
import { Button, ButtonIcon, ButtonText } from "../ui/button";
import ShowPlansModal from "@/components/training/showPlansModal";
import { WorkoutPlanWithRelations } from "@/app/types/generated/zod";
import { useRouter, useSegments } from "expo-router";
import { checkIfWorkoutSessionExists } from "@/services/sessions/workoutSessionService";
import { getCurrentWorkoutDay } from "@/utils/getCurrentWorkoutDay";
import { useSession } from "@/auth/authContext";

export default function ViewPlan() {
  const [storedPlan, setStoredPlan, loading] = useAsyncStorage<
    WorkoutPlanWithRelations | undefined
  >("plan");
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const day = getCurrentWorkoutDay(storedPlan!);
  const [completedToday, setCompletedToday] = useState(false);
  const { session } = useSession();
  useEffect(() => {
    const checkSession = async () => {
      if (day) {
        const exists = await checkIfWorkoutSessionExists(
          session?.user.id!,
          day.id
        );
        setCompletedToday(exists);
      } else {
        setCompletedToday(false);
      }
    };
    checkSession();
  }, [day, loading, storedPlan, session?.user.id]);

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
      <Box
        className={`p-4 h-40 ${
          completedToday ? "bg-emerald-400" : "bg-gray-800"
        } rounded-xl flex-row items-center justify-between`}
      >
        {storedPlan?.id ? (
          <>
            <Box>
              <Text className="text-white font-medium text-3xl">
                {storedPlan.name}
              </Text>
              {!day && <Text className="text-white">No Workout Scheduled</Text>}
              {completedToday && (
                <Text className="text-white">Completed Todays Workout!</Text>
              )}
            </Box>

            {/* Button logic */}
            {day ? (
              completedToday ? (
                <Button
                  onPress={() => router.push('/metrics')}
                  className="h-20"
                >
                  <Entypo name="check" size={50} color="white" />
                </Button>
              ) : (
                <Button
                  onPress={() => router.push("/(session)/view-session/active")}
                  className="h-20"
                >
                  <Entypo
                    name="chevron-with-circle-right"
                    size={50}
                    color="white"
                  />
                </Button>
              )
            ) : (
              <Button
                onPress={() => router.push(`/define-plan/${storedPlan?.id}`)}
                className="h-20"
              >
                <Entypo name="plus" size={50} color="white" />
              </Button>
            )}
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
      <Button
        onPress={() => setShowModal(true)}
        className="bg-gray-800 rounded-xl"
      >
        <ButtonText className="text-white">Change your plan</ButtonText>
      </Button>
    </>
  );
}
