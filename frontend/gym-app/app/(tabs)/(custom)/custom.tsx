import ThemedButton from "@/components/ThemedButton";
import { Text, FlatList, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { useSession } from "@/auth/authContext";
import api from "@/utils/api";
import { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { WorkoutPlan } from "@/app/types/generated/zod";

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
  }, []);

  const onPress = async () => {
    try {
      //TO DO
      const user = session?.user;
      // await api.post(
      //   "/workout/create",
      //   {
      //     userId: user?.id,
      //     name: "My Workout Plan",
      //     muscleGroups: ["CHEST", "BACK"],
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${session?.token}`,
      //     },
      //   }
      // );
      router.push("/define-plan/cmdwrr0fj0001imkqzfw51yl3");
    } catch (error) {
      console.log("Error creating workout plan:", error);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <ThemedButton href="/create-plan" onPress={onPress}>
        <Text>create plan</Text>
      </ThemedButton>
      <FlatList
      ItemSeparatorComponent={() => <View style={{ height: 10, backgroundColor: Colors.light.background }} />}
        data={workoutPlans}
        renderItem={({ item }) => (
          <Text style={styles.container}>{item.name}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.tint,
    padding: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
