import { Stack } from "expo-router";
import { SessionProvider } from "@/auth/authContext";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <SessionProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
            </Stack>
        </SessionProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}