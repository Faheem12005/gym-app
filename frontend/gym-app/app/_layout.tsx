import { Stack } from 'expo-router';
import { SessionProvider } from '@/auth/authContext';



export default function RootLayout() {
  return (
    <SessionProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SessionProvider>
  );
}
