import * as SecureStore from 'expo-secure-store';

const SESSION_KEY = 'session'; 

export async function getAuthToken(): Promise<string | null> {
  try {
    // Await the retrieval of the serialized session string
    const raw = await SecureStore.getItemAsync(SESSION_KEY);

    if (raw) {
      // Parse the JSON string to get the session object
      const parsed = JSON.parse(raw);
      
      return parsed.token || null;
    }
    return null; // Return null if nothing is found
  } catch (err) {
    console.error(`Error retrieving token from SecureStore:`, err);
    return null;
  }
}