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

  return (
    <SafeAreaView className="flex-1">
      <VStack className="gap-2 flex-1">
        <Box className="bg-blue-500 py-4 px-6 flex flex-row justify-between items-center">
          <Box>
            <Text className="font-medium text-gray-200">CONGRATULATIONS!</Text>
            <Text className="text-3xl font-bold text-gray-200">WORKOUT</Text>
            <Text className="text-3xl font-bold text-gray-200">COMPLETED!</Text>
          </Box>
          <Animated.View style={animatedStyle}>
            <Image
              source={require("@/assets/images/trophy.png")}
              className="w-20 h-20 mt-4"
            />
          </Animated.View>
        </Box>

        <Box className="bg-white p-4 mx-4 rounded-lg shadow-md mt-2">
          <Text className="text-2xl font-bold mb-2 text-center">
            Workout Summary
          </Text>
          <Box className="flex-row justify-around">
            <Box className="items-center">
              <Text className="text-lg font-bold text-blue-500">
                {workoutSession?.logs.length}
              </Text>
              <Text className="text-sm text-gray-600">Exercises</Text>
            </Box>
            <Box className="items-center">
              <Text className="text-lg font-bold text-blue-500">
                {totalSets}
              </Text>
              <Text className="text-sm text-gray-600">Total Sets</Text>
            </Box>
            <Box className="items-center">
              <Text className="text-lg font-bold text-blue-500">
                {totalReps}
              </Text>
              <Text className="text-sm text-gray-600">Total Reps</Text>
            </Box>
            <Box className="items-center">
              <Text className="text-lg font-bold text-blue-500">
                {totalWeightLifted}
              </Text>
              <Text className="text-sm text-gray-600">Total Weight (kg)</Text>
            </Box>
          </Box>
        </Box>

        <ScrollView className="flex-1">
          {workoutSession?.logs.map((log) => (
            <Box
              key={log.id}
              className="p-4 border-b border-gray-200 bg-white rounded-md mt-4 mx-4"
            >
              <Text className="text-3xl font-bold mb-2">
                {log.exercise.name}
              </Text>
              {log.repsPerSet.map((reps, index) => (
                <Box
                  key={log.id + index}
                  className="mb-1 flex flex-row gap-2 items-center"
                >
                  <Text className="text-white text-xl bg-black rounded-full p-2 font-bold">
                    {index + 1}
                  </Text>
                  <Text className="font-bold text-xl">
                    {reps} reps at {log.weightPerSet[index]} kg
                  </Text>
                </Box>
              ))}
            </Box>
          ))}
        </ScrollView>
        <Button
          className="bg-blue-500 h-16 active:bg-blue-400"
          onPress={() => router.push("/metrics")}
        >
          <ButtonText className="font-bold text-xl text-white">
            FINISHED
          </ButtonText>
        </Button>
      </VStack>
    </SafeAreaView>
  );
}
