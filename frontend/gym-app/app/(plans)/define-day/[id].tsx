import { View, SectionList, Modal } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Exercise } from "@/app/types/generated/zod";
import { useState, useEffect } from "react";
import { useSession } from "@/auth/authContext";
import api from "@/utils/api";
import ExerciseItem from "@/components/ExerciseItem";
import { SafeAreaView } from "react-native-safe-area-context";
import ExerciseView from "@/components/ExerciseView";

interface Section {
  title: string;
  data: Exercise[];
}

type OrderedExercise = Exercise & { order: number };

export default function EditDayPage() {
  const { id } = useLocalSearchParams();
  const { session } = useSession();
  const router = useRouter();
  const [exercises, setExercises] = useState<Section[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [addedExercises, setAddedExercises] = useState<OrderedExercise[] | []>(
    []
  );
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [exerciseInputs, setExerciseInputs] = useState<{
    [exerciseId: string]: { weight: string; reps: string };
  }>({});

  useEffect(() => {
    const fetchDayExercises = async () => {
      try {
        const response = await api.get(`/workout-day/${id}`, {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        });
        const orderedExercises: OrderedExercise[] = response.data.exercises.map(
          (item: any) => ({
            ...item.exercise,
            order: item.order, 
          })
        );
        setAddedExercises(orderedExercises);
      } catch (error) {
        console.error("Error fetching day exercises", error);
      }
    };
    const fetchAllExercises = async () => {
      try {
        const response = await api.get("/exercises", {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        });
        setExercises(response.data);
      } catch (error) {
        console.error("Error fetching Exercises", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDayExercises();
    fetchAllExercises();
  }, []);
  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const filteredExercises = exercises
    ?.map((section) => ({
      ...section,
      data: section.data.filter(
        (exercise) => !addedExercises.some((ex) => ex.id === exercise.id)
      ),
    }))
    .filter((section) => section.data.length > 0);

  return (
    <SafeAreaView className="flex-1 p-4">
      <Text>Edit Day page {id}</Text>
      {addedExercises.map((exercise) => (
        <ExerciseView
          key={exercise.id}
          exercise={exercise}
          values={exerciseInputs[exercise.id] || { weight: "", reps: "" }}
          onChange={(newValues) =>
            setExerciseInputs((prev) => ({
              ...prev,
              [exercise.id]: newValues,
            }))
          }
        />
      ))}
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <SafeAreaView>
          <SectionList
            sections={filteredExercises!}
            keyExtractor={(item) => item.id}
            renderSectionHeader={({ section }) => <Text>{section.title}</Text>}
            renderItem={({ item }) => {
              const isSelected = selectedExercises.some(
                (ex) => ex.id === item.id
              );

              const handleToggle = (exercise: Exercise) => {
                setSelectedExercises((prev) =>
                  prev.some((ex) => ex.id === exercise.id)
                    ? prev.filter((ex) => ex.id !== exercise.id)
                    : [...prev, exercise]
                );
              };

              return (
                <ExerciseItem
                  exercise={item}
                  isSelected={isSelected}
                  onToggle={handleToggle}
                />
              );
            }}
          />
          {selectedExercises.length > 0 && (
            <View>
              <Button
                onPress={() => {
                  setAddedExercises((prev) => [
                    ...prev,
                    ...selectedExercises.map((exercise, index) => ({
                      ...exercise,
                      order: prev.length + index,
                    })),
                  ]);

                  setSelectedExercises([]);
                  setModalVisible(false);
                }}
              >
                <Text>Add Selected Exercises</Text>
              </Button>
            </View>
          )}
        </SafeAreaView>
      </Modal>
      <Button
        onPress={() => {
          setSelectedExercises([]);
          setModalVisible(true);
        }}
      >
        <Text>Add Exercises</Text>
      </Button>
      {addedExercises.length > 0 && (
        <Button
          onPress={async () => {
            const dataToSave = addedExercises.map((exercise) => {
              const { weight, reps } = exerciseInputs[exercise.id] || {};
              return {
                id: exercise.id,
                order: exercise.order,
                sets: Number(weight) || 3,
                reps: Number(reps) || 10,
                restSeconds: 60,
              };
            });
            try {
              await api.post(
                "/workout-exercise",
                {
                  workoutDayId: id,
                  exercises: dataToSave,
                },
                {
                  headers: {
                    Authorization: `Bearer ${session?.token}`,
                  },
                }
              );
            } catch (error) {
              console.error("Error adding workout exercises: ", error);
            } finally {
              router.replace("/(tabs)/(profile)/profile");
            }
          }}
        >
          <Text>Save</Text>
        </Button>
      )}
    </SafeAreaView>
  );
}
