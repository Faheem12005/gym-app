import { View, Text, TextInput, StyleSheet } from "react-native";
import { Exercise } from "@/app/types/generated/zod";

interface Props {
  exercise: Exercise;
  values: {
    weight: string;
    reps: string;
  };
  onChange: (values: { weight: string; reps: string }) => void;
}

export default function ExerciseView({ exercise, values, onChange }: Props) {
  return (
    <View style={styles.container}>
      <Text className="text-black" style={styles.exerciseName}>{exercise.name}</Text>
      <View style={styles.inputRow}>
        <TextInput
          keyboardType="number-pad"
          placeholder="Weight"
          style={styles.input}
          value={values.weight}
          onChangeText={(text) => onChange({ ...values, weight: text })}
        />
        <TextInput
          keyboardType="number-pad"
          placeholder="Reps"
          style={styles.input}
          value={values.reps}
          onChangeText={(text) => onChange({ ...values, reps: text })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#f8f8f8",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: "row",
    gap: 12,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
});
