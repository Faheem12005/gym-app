import { Exercise } from "@/app/types/generated/zod";
import { Box } from "./ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "./ui/vstack";
import { TextInput, Text } from "react-native";

export interface Props {
  exercise: Exercise;
  values: {
    weight: number;
    reps: number;
    sets: number;
  };
  disabled?: boolean;
  onChange: (values: { sets: number; weight: number; reps: number }) => void;
}

export default function ExerciseView({
  exercise,
  values,
  onChange,
  disabled,
}: Props) {

  return (
    <Box className="bg-white rounded-xl p-4">
      <Box className="flex flex-row justify-between items-center">
        <Text className="font-semibold text-2xl">{exercise.name}</Text>
        <Text>
          {values.sets}
          {values.sets > 1 ? " Sets" : " Set"}
        </Text>
      </Box>
      <Box>
        <VStack className="gap-2">
          <Box
            key={exercise.id}
            className="flex flex-row justify-between items-center h-16 p-4 rounded-xl bg-gray-100"
          >
            <Box className="flex flex-row items-center justify-center gap-4">
              <TextInput
                className="bg-gray-200 h-full rounded-md p-2 text-2xl font-bold w-14"
                placeholder="Reps"
                value={values.reps.toString()}
                keyboardType="numeric"
                onChangeText={(val) =>
                  onChange({ ...values, reps: Number(val) })
                }
              />
              <Text className="text-2xl font-bold">Reps</Text>
            </Box>
            <Box className="flex flex-row items-center justify-center gap-4">
              <TextInput
                className="bg-gray-200 h-full rounded-md p-2 text-2xl font-bold w-14"
                placeholder="Weight"
                value={values.weight.toString()}
                keyboardType="numeric"
                onChangeText={(val) =>
                  onChange({ ...values, weight: Number(val) })
                }
              />
              <Text className="text-2xl font-bold">KG</Text>
            </Box>
          </Box>
          <Box className="flex flex-row items-center justify-between gap-2 mt-2">
            <Button
              onPress={() =>
                onChange({ ...values, sets: Math.max(1, values.sets - 1) })
              }
              isDisabled={values.sets === 1 || disabled}
              className="bg-gray-200"
            >
              <ButtonText>- Remove Set</ButtonText>
            </Button>
            <Button
              onPress={() => onChange({ ...values, sets: values.sets + 1 })}
              isDisabled={disabled}
              className="bg-gray-200"
            >
              <ButtonText>+ Add Set</ButtonText>
            </Button>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
}
