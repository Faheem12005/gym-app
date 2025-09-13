
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAsyncStorage<T = any>(key: string, initialValue?: T) {
	const [storedValue, setStoredValue] = useState<T | undefined>(undefined);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				const item = await AsyncStorage.getItem(key);
				if (item !== null) {
					setStoredValue(JSON.parse(item));
				} else if (initialValue !== undefined) {
					setStoredValue(initialValue);
				}
			} catch (error) {
				console.error('AsyncStorage get error:', error);
			} finally {
				setLoading(false);
			}
		})();
	}, [initialValue, key]);

	const setValue = useCallback(async (value: T) => {
		try {
			await AsyncStorage.setItem(key, JSON.stringify(value));
			setStoredValue(value);
		} catch (error) {
			console.error('AsyncStorage set error:', error);
		}
	}, [key]);

	const remove = useCallback(async () => {
		try {
			await AsyncStorage.removeItem(key);
			setStoredValue(undefined);
		} catch (error) {
			console.error('AsyncStorage remove error:', error);
		}
	}, [key]);

	return [storedValue, setValue, loading, remove] as const;
}

