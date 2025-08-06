import { useEffect, useCallback, useReducer } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

type UseStorageState<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null],
): UseStorageState<T> {
  return useReducer(
    (_: [boolean, T | null], action: T | null = null): [boolean, T | null] => [false, action],
    initialValue
  ) as UseStorageState<T>;
}

async function setStorageItemAsync<T>(key: string, value: T | null) {
  const serialized = value === null ? null : JSON.stringify(value);

  if (Platform.OS === 'web') {
    if (typeof localStorage !== 'undefined') {
      if (serialized === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, serialized);
      }
    }
  } else {
    if (serialized === null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, serialized);
    }
  }
}

export function useStorageState<T>(key: string): UseStorageState<T> {
  const [state, setState] = useAsyncState<T>();

  // Load stored value on mount
  useEffect(() => {
    const load = async () => {
      try {
        let raw: string | null;
        if (Platform.OS === 'web') {
          raw = typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null;
        } else {
          raw = await SecureStore.getItemAsync(key);
        }

        const parsed: T | null = raw ? JSON.parse(raw) : null;
        setState(parsed);
      } catch (err) {
        console.error(`Error loading ${key}:`, err);
        setState(null);
      }
    };

    load();
  }, [key]);

  // Save value
  const setValue = useCallback(
    (value: T | null) => {
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key]
  );

  return [state, setValue];
}
