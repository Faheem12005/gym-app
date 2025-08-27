import CustomHeader from '@/components/CustomHeader';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: () => (
          <CustomHeader heading='TRAINING'/>
        ),
      }}
    >
      <Stack.Screen name='training'/>
    </Stack>
  );
}
