import { VStack } from "@/components/ui/vstack";
import ViewPlan from "@/components/training/viewPlan";

export default function TrainingPage() {
  return (
    <VStack className="p-4 flex-1 gap-4">
      <ViewPlan/>
    </VStack>
  );
}
