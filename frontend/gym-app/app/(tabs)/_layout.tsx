import { Tabs, Redirect } from "expo-router";
import { Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useSession } from "@/app/auth/authContext";

export default function TabLayout() {
  const { session, isLoading } = useSession();
  if(isLoading) {
    return <Text>Loading...</Text>
  }
  if(!session) {
    return <Redirect href="/sign-in" />
  }
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="man" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="(metrics)"
        options={{
          title: "Metrics",
          tabBarIcon: ({ color }) => (
            <Ionicons name="bar-chart" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="(training)"
        options={{
          title: "Training",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="dumbbell" color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
