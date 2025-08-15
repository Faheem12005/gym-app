import { Stack } from "expo-router";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { SessionProvider } from "@/auth/authContext";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light"><SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <SessionProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
              </Stack>
          </SessionProvider>
        </SafeAreaView>
      </SafeAreaProvider></GluestackUIProvider>
  );
}