import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CustomHeader from "@/components/CustomHeader";

export default function SessionLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
          <Stack.Screen
            key={"active"}
            name={"active"}
          />
      </Stack>
    </SafeAreaProvider>
  );
}