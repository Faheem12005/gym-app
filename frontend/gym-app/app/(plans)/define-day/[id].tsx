import { useLocalSearchParams, useRouter } from "expo-router";
import { useSession } from "@/auth/authContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Modal, ScrollView, SectionList } from "react-native";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import ExerciseItem from "@/components/ExerciseItem";
import { useEditDay } from "@/hooks/useEditDay";
import ExerciseView from "@/components/ExerciseView";
import { useState } from "react";

export default function EditDayPage() {
  const { id } = useLocalSearchParams();
  const { session } = useSession();
  const router = useRouter();

  const {
    loading,
    saveLoading,
    exercises,
    addedExercises,
    setAddedExercises,
    selectedExercises,
    setSelectedExercises,
    addSelectedExercises,
    saveExercises,
  } = useEditDay(id, session?.token);

  const [modalVisible, setModalVisible] = useState(false);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Spinner size="large" color="black" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 p-4 gap-2">
      <Text className="font-semibold text-3xl">Edit Day</Text>
      <ScrollView className="flex-1" contentContainerStyle={{ gap: 12 }}>
        {addedExercises.map((exercise) => (
          <ExerciseView
            key={exercise.exercise.id}
            exercise={exercise.exercise}
            values={{
              weight: exercise.weights,
              reps: exercise.reps,
              sets: exercise.sets,
            }}
            onChange={(newValues) =>
              setAddedExercises((prev) =>
                prev.map((ex) =>
                  ex.exercise.id === exercise.exercise.id
                    ? {
                        ...ex,
                        sets: newValues.sets,
                        reps: newValues.reps,
                        weights: newValues.weight,
                      }
                    : ex
                )
              )
            }
          />
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <SafeAreaView>
          <SectionList
            sections={exercises!}
            keyExtractor={(item) => item.id}
            renderSectionHeader={({ section }) => <Text className="px-3 text-2xl bg-gray-200 border border-gray-400">{section.title}</Text>}
            renderItem={({ item }) => {
              const isSelected = selectedExercises.some(
                (ex) => ex.id === item.id
              );
              return (
                <ExerciseItem
                  exercise={item}
                  isSelected={isSelected}
                  onToggle={() => {
                    setSelectedExercises((prev) =>
                      prev.some((ex) => ex.id === item.id)
                        ? prev.filter((ex) => ex.id !== item.id)
                        : [...prev, item]
                    );
                  }}
                />
              );
            }}
          />
          {selectedExercises.length > 0 && (
            <View>
              <Button
                onPress={() => {
                  addSelectedExercises();
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
        className="bg-black active:bg-gray-800 h-16"
        onPress={() => {
          setSelectedExercises([]);
          setModalVisible(true);
        }}
      >
        <ButtonText className="text-white font-bold">ADD EXERCISES</ButtonText>
      </Button>

      {addedExercises.length > 0 && (
        <Button
          disabled={saveLoading}
          className="bg-cyan-500 h-16 active:bg-cyan-300"
          onPress={async () => {
            await saveExercises();
            router.replace("/custom");
          }}
        >
          {saveLoading ? (
            <>
              <ButtonText className="text-white font-bold">SAVE</ButtonText>
              <ButtonSpinner size="small" color="white" />
            </>
          ) : (
            <ButtonText className="text-white font-bold">SAVE</ButtonText>
          )}
        </Button>
      )}
    </SafeAreaView>
  );
}
