import { Box } from "../ui/box";
import { useEffect, useState } from "react";
import { getWorkoutSession } from "@/services/sessions/workoutSessionService";
import { useSession } from "@/auth/authContext";
import { WorkoutSessionWithRelations } from "@/app/types/generated/zod";
import { Spinner } from "../ui/spinner";
import { Text } from "../ui/text";
import { ScrollView } from "react-native";
import SessionCard from "./SessionCard";

export default function WorkoutHistory() {
  // State for the loaded sessions and the next page cursor
  const [sessions, setSessions] = useState<WorkoutSessionWithRelations[]>([]);
  const [nextCursor, setNextCursor] = useState<string | undefined>(undefined);
  
  // State for loading and to check if there are more sessions to load
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const { session } = useSession();
  const userId = session?.user?.id;

  const fetchWorkoutSessions = async () => {
    if (!userId || isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const data = await getWorkoutSession(userId, nextCursor);
      
      // Append new sessions to the existing list
      setSessions(prevSessions => [...prevSessions, ...data.sessions]);
      
      // Update the cursor for the next fetch
      setNextCursor(data.cursor);

      // Check if the API returned fewer items than requested, indicating no more data
      if (data.sessions.length < 20) { // Assuming a page size of 20
        setHasMore(false);
      }
      
    } catch (error: any) {
      console.error("Error fetching workout session:", error.message);
      // You might want to display an error message to the user here
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch on initial render or when the userId changes
    fetchWorkoutSessions();
  }, [userId]);

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;

    if (isCloseToBottom && !isLoading && hasMore) {
      fetchWorkoutSessions();
    }
  };

  return (
    <Box className="flex-1 bg-gray-100">
      <Box className="p-4">
        <Text className="text-3xl font-bold text-gray-800">
          Workout History
        </Text>
      </Box>
      <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        {sessions.length > 0 ? (
          sessions.map(s => (
            <SessionCard session={s} key={s.id} />
          ))
        ) : (
          <Text className="p-4 text-center text-gray-500">No workout sessions found.</Text>
        )}
        {isLoading && (
          <Box className="p-4 items-center">
            <Spinner />
            <Text className="mt-2 text-gray-500">Loading more sessions...</Text>
          </Box>
        )}
        {!hasMore && (
          <Text className="p-4 text-center text-gray-500">You've reached the end of your sessions.</Text>
        )}
      </ScrollView>
    </Box>
  );
}
