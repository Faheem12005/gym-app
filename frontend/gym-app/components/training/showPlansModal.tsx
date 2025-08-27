import { useEffect, useState } from "react";
import { Modal, View, FlatList } from "react-native";
import { Text } from "../ui/text";
import { Button, ButtonText } from "../ui/button";
import { WorkoutPlanWithRelations } from "@/app/types/generated/zod";
import { useSession } from "@/auth/authContext";
import api from "@/utils/api";

interface ShowPlansModalProps {
  isVisible: boolean;
  onSelect?: (plan: WorkoutPlanWithRelations) => void;
  onClose?: () => void;
  activePlanId: string | undefined;
}

export default function ShowPlansModal({ activePlanId, isVisible, onSelect, onClose }: ShowPlansModalProps) {
  const [plans, setPlans] = useState<WorkoutPlanWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const { session } = useSession();
  useEffect(() => {
    const fetchWorkoutPlans = async () => {
      try {
        const response = await api.get("/workout-plan", {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        });
        setPlans(response.data);
      } catch (error) {
        console.error("Error fetching workout plans:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkoutPlans();
  }, []);

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end items-center bg-black/40">
        <View className="w-full h-[80vh] bg-white rounded-t-2xl p-6 shadow-lg">
          <Text className="text-lg font-bold mb-4 text-center">SELECT A WORKOUT PLAN</Text>
          <FlatList
            data={plans}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              if(item.id === activePlanId) {
                return null;
              }
              return (
                <Button
                  className="mb-2 bg-gray-300 rounded-xl h-16 active:bg-gray-400"
                  onPress={() => onSelect?.(item)}
                >
                  <Text className="text-black text-base font-medium">{item.name}</Text>
                </Button>
              );
            }}
          />
          <Button className="bg-black h-16 mt-4 justify-center items-center" onPress={onClose}>
            <ButtonText className="text-white">Close</ButtonText>
          </Button>
        </View>
      </View>
    </Modal>
  );
}
