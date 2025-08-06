import { use, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from '@/utils/useStorageState';
import api from '@/utils/api';

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
  signIn: () => void;
  signOut: () => void;
  session?: AuthResponse | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
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

  return (
    <AuthContext.Provider
      value={{
        signIn: async () => {
          try {
            const response = await api.post('/user/login', {
              //TO DO
                email: 'test@gmail.com',
                password: '123'
            });
            setSession(response.data);
          } catch(error) {
            console.error('Login failed:', error);
          }
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
