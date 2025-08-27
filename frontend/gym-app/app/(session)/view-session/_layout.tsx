import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function SessionLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: true }}>
        <Stack.Screen name="run" />
        <Stack.Screen name="active" />
        <Stack.Screen name="post" />
      </Stack>
    </SafeAreaProvider>
  );
}