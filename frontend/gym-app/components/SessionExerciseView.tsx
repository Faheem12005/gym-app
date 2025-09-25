import { Exercise } from "@/app/types/generated/zod";
import { Text } from "./ui/text";
import { Box } from "./ui/box";
import { Button, ButtonIcon, ButtonText } from "./ui/button";
import { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { VStack } from "./ui/vstack";
import { TextInput } from "react-native";
import { Checkbox, CheckboxIndicator, CheckboxIcon } from "./ui/checkbox";
import { CheckIcon, AddIcon } from "@/components/ui/icon";
import ExercisePopover from "./exercise/exercisePopover";

interface Props {
  updateSet?: (
    exerciseId: string,
    newData: Partial<{ completed: boolean; reps: number; weight: number }>,
    setIdx?: number,
  ) => void;
  removeSet?: (exerciseId: string) => void;
  addSet?: (exerciseId: string) => void;
  exerciseState?: {
    [exerciseId: string]: {
      completed: boolean;
      reps: number;
      weight: number;
    }[];
  };
  editable?: boolean;
  exercise: Exercise;
  values: {
    weight: number;
    reps: number;
    sets: number;
    order: number;
  };
}

const SessionExerciseView = ({
  exercise,
  values,
  editable,
  updateSet,
  addSet,
  removeSet,
  exerciseState,
}: Props) => {
  const [details, showDetails] = useState(false);
  const setsState =
    exerciseState?.[exercise.id] ??
    Array(values.sets).fill({
      completed: false,
      reps: values.reps,
      weight: values.weight,
    });

  return (
    <Box className="bg-white rounded-xl p-4">
      <Box className="flex flex-row justify-between">
        {editable && (
          <Button className="bg-white" onPress={() => showDetails(!details)}>
            <Entypo
              name={details ? "chevron-up" : "chevron-down"}
              size={16}
              color="black"
            />
          </Button>
        )}
        <Text className="font-semibold text-2xl">{exercise.name}</Text>

        {!editable && (
          <Text>
            {values.sets}
            {values.sets > 1 ? " Sets" : " Set"}
          </Text>
        )}
        {editable && removeSet && (
          <ExercisePopover exerciseId={exercise.id} removeSet={removeSet} />
        )}
      </Box>
      <Box>
        {details && (
          <VStack className="gap-2">
            {setsState.map((set, i) => (
              <Box
                key={exercise.id + i}
                className={`flex flex-row justify-between items-center h-16 p-4 rounded-xl ${set.completed ? 'bg-gray-300' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                <Checkbox
                  isChecked={set.completed}
                  size="lg"
                  value={set.completed ? "completed" : "not-completed"}
                  onChange={() =>
                    updateSet && 
                    updateSet(exercise.id, { completed: !set.completed }, i)
                  }
                  className={`rounded-md border-white text-white focus:ring-2 focus:ring-white ${set.completed ? 'bg-black' : 'bg-white hover:bg-gray-800'}`}
                >
                  <CheckboxIndicator>
                    <CheckboxIcon as={CheckIcon} className="text-white" />
                  </CheckboxIndicator>
                </Checkbox>

                <Text className="text-2xl font-bold">{i + 1}</Text>
                <Box className="flex flex-row items-center justify-center gap-4">
                  <TextInput
                    className="bg-gray-200 h-full rounded-md p-2 text-2xl font-bold w-14"
                    placeholder="Reps"
                    value={set.reps.toString()}
                    keyboardType="numeric"
                    onChangeText={(val) =>
                      updateSet &&
                      updateSet(exercise.id, { reps: Number(val) }, i)
                    }
                  />
                  <Text className="text-2xl font-bold">Reps</Text>
                </Box>
                <Box className="flex flex-row items-center justify-center gap-4">
                  <TextInput
                    className="bg-gray-200 h-full rounded-md p-2 text-2xl font-bold w-14"
                    placeholder="Weight"
                    value={set.weight.toString()}
                    keyboardType="numeric"
                    onChangeText={(val) =>
                      updateSet &&
                      updateSet(exercise.id, { weight: Number(val) }, i)
                    }
                  />
                  <Text className="text-2xl font-bold">KG</Text>
                </Box>
              </Box>
            ))}
            <Button onPress={() => addSet && addSet(exercise.id)} className="bg-gray-100 rounded-xl h-16 active:bg-gray-200">
              <ButtonIcon as={AddIcon} />
              <ButtonText>Add a Set</ButtonText>
            </Button>
          </VStack>
        )}
      </Box>
    </Box>
  );
};

export default SessionExerciseView;
