import { use, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from '@/hooks/useStorageState';
import api from '@/utils/api';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export type AuthResponse = {
  user: {
    id: string;
    name: string | null;
    email: string;
    emailVerified: string | null;
    image: string | null;
    passwordHash: string;
    provider: string | null;
    providerId: string | null;
    createdAt: string;  // ISO 8601 date string
    updatedAt: string;
  };
  token: string;
};


const AuthContext = createContext<{
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  clearAllStorage: () => Promise<void>;
  session?: AuthResponse | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  clearAllStorage: async () => {},
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />');
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState<AuthResponse>('session');

  const clearAllStorage = async () => {
    try {
      // Clear SecureStore items
      if (Platform.OS !== 'web') {
        const secureStoreKeys = ['session', 'authToken', 'plan']; // Add any other keys you use
        await Promise.all(
          secureStoreKeys.map(async (key) => {
            try {
              await SecureStore.deleteItemAsync(key);
            } catch (error) {
              console.warn(`Failed to clear SecureStore key ${key}:`, error);
            }
          })
        );
      }

      // Clear AsyncStorage items  
      const asyncStorageKeys = ['plan', 'workoutSession', 'userPreferences']; // Add any other keys you use
      await Promise.all(
        asyncStorageKeys.map(async (key) => {
          try {
            await AsyncStorage.removeItem(key);
          } catch (error) {
            console.warn(`Failed to clear AsyncStorage key ${key}:`, error);
          }
        })
      );

      // Clear localStorage (web)
      if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
        const localStorageKeys = ['session', 'authToken', 'plan', 'workoutSession', 'userPreferences'];
        localStorageKeys.forEach((key) => {
          try {
            localStorage.removeItem(key);
          } catch (error) {
            console.warn(`Failed to clear localStorage key ${key}:`, error);
          }
        });
      }

      console.log('All storage cleared successfully');
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn: async (email: string, password: string) => {
          try {
            const response = await api.post('/users/login', {
                email,
                password
            });
            setSession(response.data);
          } catch(error) {
            console.error('Login failed:', error);
          }
        },
        signOut: async () => {
          setSession(null);
          await clearAllStorage();
        },
        clearAllStorage,
        session,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}