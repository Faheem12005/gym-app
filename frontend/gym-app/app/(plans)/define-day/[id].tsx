import {
  Text,
  StyleSheet,
  View,
  SectionList,
  Modal,
  Pressable,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Exercise } from "@/app/types/generated/zod";
import { useState, useEffect } from "react";
import { useSession } from "@/auth/authContext";
import api from "@/utils/api";
import ExerciseItem from "@/components/ExerciseItem";
import { SafeAreaView } from "react-native-safe-area-context";
import ExerciseView from "@/components/ExerciseView";
import { useRouter } from "expo-router";

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
    const fetchExercises = async () => {
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

    fetchExercises();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
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
    <View style={styles.container}>
      <Text style={styles.subheading}>Edit Day page {id}</Text>
      {/* Exercises that are already added come here in exercise view */}
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
            renderSectionHeader={({ section }) => (
              <Text style={styles.sectionHeader}>{section.title}</Text>
            )}
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
            <View style={styles.addButtonContainer}>
              <Pressable
                style={styles.addButton}
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
                <Text style={styles.addButtonText}>Add Selected Exercises</Text>
              </Pressable>
            </View>
          )}
        </SafeAreaView>
      </Modal>
      <Pressable
        style={styles.addButton}
        onPress={() => {
          setSelectedExercises([]);
          setModalVisible(true);
        }}
      >
        <Text>Add Exercises</Text>
      </Pressable>
      {addedExercises.length > 0 && (
        <Pressable
          style={styles.addButton}
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
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16, // space from the sides
    paddingTop: 16,
    backgroundColor: "#fff",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subheading: {
    fontSize: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#eee",
    paddingVertical: 4,
    paddingHorizontal: 8,
    width: "100%",
  },
  exerciseItem: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 8,
    width: "100%",
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
  },
  addButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ccc",
  },

  addButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
