import { ScrollView, Image } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { WorkoutSessionWithRelations } from "@/app/types/generated/zod";
import { Spinner } from "@/components/ui/spinner";
import { Box } from "@/components/ui/box";
import api from "@/utils/api";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  withRepeat,
  withSequence,
} from "react-native-reanimated";
import { Button, ButtonText } from "@/components/ui/button";
import SummaryCard from "@/components/metrics/SummaryCard";

export default function PostSession() {
  const { id } = useLocalSearchParams();
  const [workoutSession, setWorkoutSession] =
    useState<WorkoutSessionWithRelations | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Create shared value for animation scale
  const scale = useSharedValue(1);

  // Define the animation style
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  // Effect to fetch session data
  useEffect(() => {
    const fetchWorkoutSession = async () => {
      setLoading(true);
      try {
        const workoutSession = await api.get(`/workout-sessions/${id}`);
        setWorkoutSession(workoutSession.data);
      } catch (error) {
        console.error("Error fetching workout session:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkoutSession();
  }, [id]);

  // Effect to trigger the animation when the component loads
  useEffect(() => {
    // Animate the scale to 1.2, then back to 1, and repeat forever
    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) })
      ),
      -1, // -1 means it will repeat forever
      true // Reverse the animation on each repeat
    );
  }, []);

  if (loading) {
    return (
      <Box className="flex-1 justify-center items-center">
        <Spinner size="large" color={"black"} />
      </Box>
    );
  }

  // Calculate summary stats
  const totalReps = workoutSession?.logs.reduce((acc, log) => {
    return acc + log.repsPerSet.reduce((sum, reps) => sum + reps, 0);
  }, 0);

  const totalSets = workoutSession?.logs.reduce((acc, log) => {
    return acc + log.repsPerSet.length;
  }, 0);

  const totalWeightLifted = workoutSession?.logs.reduce((acc, log) => {
    let logWeight = 0;
    for (let i = 0; i < log.repsPerSet.length; i++) {
      logWeight += log.repsPerSet[i] * log.weightPerSet[i];
    }
    return acc + logWeight;
  }, 0);

  const totalExercises = workoutSession?.logs.length || 0;

  return (
    <SafeAreaView className="flex-1">
      <VStack className="gap-2 flex-1 bg-gray-50">
        <Box className="bg-white py-6 px-6 flex flex-row justify-between items-center border-b border-gray-200">
          <Box className="flex-1">
            <Text className="font-medium text-gray-400 text-sm">CONGRATULATIONS!</Text>
            <Text className="text-3xl font-bold text-gray-800 mt-1">WORKOUT</Text>
            <Text className="text-3xl font-bold text-gray-800">COMPLETED!</Text>
          </Box>
          <Animated.View style={animatedStyle}>
            <Image
              source={require("@/assets/images/trophy.png")}
              className="w-20 h-20"
            />
          </Animated.View>
        </Box>
        
        {/* Use the new component and pass the calculated props */}
        <SummaryCard
          totalExercises={totalExercises!}
          totalSets={totalSets!}
          totalReps={totalReps!}
          totalWeightLifted={totalWeightLifted!}
        />

        <ScrollView className="flex-1">
          <VStack className="gap-4 mx-4 mb-4">
            {workoutSession?.logs.map((log) => (
              <Box
                key={log.id}
                className="p-4 bg-white rounded-lg shadow-md mt-4"
              >
                <Text className="text-xl font-bold mb-2 text-gray-800">
                  {log.exercise.name}
                </Text>
                {log.repsPerSet.map((reps, index) => (
                  <Box
                    key={log.id + index}
                    className="mb-1 flex flex-row gap-2 items-center"
                  >
                    <Box className="w-8 h-8 rounded-full bg-blue-500 justify-center items-center">
                      <Text className="text-sm font-bold text-white">
                        {index + 1}
                      </Text>
                    </Box>
                    <Text className="font-medium text-base text-gray-800">
                      <Text className="font-bold">{reps}</Text> reps at{" "}
                      <Text className="font-bold">{log.weightPerSet[index]}</Text> kg
                    </Text>
                  </Box>
                ))}
              </Box>
            ))}
          </VStack>
        </ScrollView>
        <Button
          className="bg-blue-500 h-16 active:bg-blue-400 mx-4 mb-4 rounded-lg"
          onPress={() => router.push("/metrics")}
        >
          <ButtonText className="font-bold text-lg text-white">
            FINISH
          </ButtonText>
        </Button>
      </VStack>
    </SafeAreaView>
  );
}
