import { View, Text, TextInput, StyleSheet } from "react-native";
import { Exercise } from "@/app/types/generated/zod";
import { Button, ButtonText } from "@/components/ui/button";
import { Box } from "./ui/box";

export interface Props {
  exercise: Exercise;
  values: {
    weight: number;
    reps: number;
    sets: number;
  };
  disabled? : boolean;
  onChange: (values: { sets: number; weight: number; reps: number }) => void;
}

export default function ExerciseView({ exercise, values, onChange }: Props) {
  const addSet = () => {
    onChange({ ...values, sets: values.sets + 1 });
  }
  const removeSet = () => {
    onChange({ ...values, sets: values.sets - 1 });
  };
  return (
    <Box className="bg-white p-4 h-44 rounded-md">
      <Text className="text-black" style={styles.exerciseName}>
        {exercise.name}
      </Text>
      <View style={styles.inputRow}>
        <TextInput
          keyboardType="number-pad"
          placeholder="Weight"
          style={styles.input}
          value={values.weight === 0 ? "" : values.weight.toString()}
          onChangeText={(text) => onChange({ ...values, weight: text ? parseFloat(text) : 0 })}
        />
        <TextInput
          keyboardType="number-pad"
          placeholder="Reps"
          style={styles.input}
          value={values.reps === 0 ? "" : values.reps.toString()}
          onChangeText={(text) => onChange({ ...values, reps: text ? parseInt(text) : 0 })}
        />
      </View>
      <Box className="flex flex-row flex-1 items-center justify-between">
        <Button 
          className="bg-black" 
          isDisabled={values.sets === 1}
          onPress={removeSet}
          >
          <ButtonText className="text-white">Minus</ButtonText>
        </Button>
        <Text className="bg-black text-white p-2 rounded-md font-bold">SETS: {values.sets.toString()}</Text>
        <Button
          onPress={addSet}
          className="bg-black">
          <ButtonText className="text-white">Add</ButtonText>
        </Button>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
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
