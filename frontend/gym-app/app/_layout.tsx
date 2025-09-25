import 'react-native-reanimated';
import '../global.css';

import { Stack } from 'expo-router';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { SessionProvider } from '@/auth/authContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <GluestackUIProvider mode="light">
        <SessionProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="sign-in" />
            <Stack.Screen name="(tabs)" />
          </Stack>
        </SessionProvider>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}