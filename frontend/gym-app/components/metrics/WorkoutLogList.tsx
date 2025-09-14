import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { WorkoutSessionWithRelations } from "@/app/types/generated/zod";

type WorkoutLog = WorkoutSessionWithRelations['logs'][number];

interface WorkoutLogListProps {
  logs: WorkoutLog[];
}

export default function WorkoutLogList({ logs }: WorkoutLogListProps) {
  return (
    <VStack className="gap-4 mx-4 mb-4">
      {logs.map((log) => (
        <Box
          key={log.id}
          className="p-4 bg-white rounded-lg shadow-md mt-4"
        >
          <Text className="text-xl font-bold mb-2 text-gray-800">
            {log.exercise.name}
          </Text>
          {log.repsPerSet.map((reps, index) => (
            <Box
              key={log.id + index}
              className="mb-1 flex flex-row gap-2 items-center"
            >
              <Box className="w-8 h-8 rounded-full bg-blue-500 justify-center items-center">
                <Text className="text-sm font-bold text-white">
                  {index + 1}
                </Text>
              </Box>
              <Text className="font-medium text-base text-gray-800">
                <Text className="font-bold">{reps}</Text> reps at{" "}
                <Text className="font-bold">{log.weightPerSet[index]}</Text> kg
              </Text>
            </Box>
          ))}
        </Box>
      ))}
    </VStack>
  );
}
