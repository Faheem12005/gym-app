import HeatmapCalendar from "@/components/metrics/workoutHeatmap";
import WorkoutSummary from "@/components/metrics/WorkoutSummary";
import { VStack } from "@/components/ui/vstack";
import WorkoutHistory from "@/components/metrics/WorkoutHistory";

export default function MetricsPage() {
  return (
    <VStack className="gap-4 flex-1">
      <HeatmapCalendar />
      <WorkoutSummary />
      <WorkoutHistory/>
    </VStack>
  );
}
