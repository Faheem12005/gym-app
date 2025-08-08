// components/ExerciseItem.tsx
import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Exercise } from "@/app/types/generated/zod";

interface Props {
  exercise: Exercise;
  isSelected: boolean;
  onToggle: (exercise: Exercise) => void;
}

const ExerciseItem: React.FC<Props> = ({ exercise, isSelected, onToggle }) => {
  return (
    <Pressable onPress={() => onToggle(exercise)}>
      <View style={styles.container}>
        <Text style={styles.label}>{exercise.name}</Text>
        <BouncyCheckbox
          isChecked={isSelected}
          disableText
          fillColor="#4caf50"
          size={30}
          onPress={() => onToggle(exercise)}
          iconStyle={{ borderColor: "#4caf50" }}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
  },
  label: {
    fontSize: 16,
  },
});

export default ExerciseItem;
