import { useEffect, useState } from "react";
import { getAggMetrics } from "@/services/metrics/metricsService";
import { Box } from "../ui/box";
import { Text } from "../ui/text";

interface AggMetrics {
  totalDuration: number;
  totalVolume: number;
  totalSets: number;
}

export default function WorkoutSummary() {
  const [data, setData] = useState<AggMetrics | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data: AggMetrics = await getAggMetrics();
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <Box className="bg-white p-4 rounded-lg shadow-md">
      <Box className="flex-row justify-around">
        <Box className="items-center">
          <Text className="text-2xl font-bold text-blue-500">
            {data ? data.totalDuration : "..."}
          </Text>
          <Text className="text-sm text-gray-600">Total Duration (min)</Text>
        </Box>
        <Box className="items-center">
          <Text className="text-2xl font-bold text-blue-500">
            {data ? data.totalVolume : "..."}
          </Text>
          <Text className="text-sm text-gray-600">Total Volume (kg)</Text>
        </Box>
        <Box className="items-center">
          <Text className="text-2xl font-bold text-blue-500">
            {data ? data.totalSets : "..."}
          </Text>
          <Text className="text-sm text-gray-600">Total Sets</Text>
        </Box>
      </Box>
    </Box>
  );
}
