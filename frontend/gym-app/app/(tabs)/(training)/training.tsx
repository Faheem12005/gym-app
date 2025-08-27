import { VStack } from "@/components/ui/vstack";
import { Calendar } from "react-native-calendars";
import { Text } from "@/components/ui/text";
import ViewPlan from "@/components/training/viewPlan";

export default function TrainingPage() {
  return (
    <VStack className="p-4 flex-1 gap-4">
      <Calendar
        hideArrows
        hideExtraDays
        style={{
          overflow: "hidden",
          borderRadius: 14, // makes corners rounded
        }}
      />
      <ViewPlan/>
    </VStack>
  );
}
