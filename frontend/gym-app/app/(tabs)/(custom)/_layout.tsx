import { Stack } from "expo-router";
import CustomHeader from "@/components/CustomHeader";

export default function RootLayout() {
  return (
      <Stack
        screenOptions={{
          headerShown: true,
          header: () => (
            <CustomHeader heading="CUSTOM" />
          ),
        }}
      >
        {/* Optionally configure static options outside the route.*/}
        <Stack.Screen name="custom" />
      </Stack>
  );
}
