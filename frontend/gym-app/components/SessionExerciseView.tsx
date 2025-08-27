import { Exercise } from "@/app/types/generated/zod";
import { Text } from "./ui/text";
import { Box } from "./ui/box";
import { Button, ButtonIcon, ButtonText } from "./ui/button";
import { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { VStack } from "./ui/vstack";
import { TextInput } from "react-native";
import { Radio, RadioGroup, RadioIcon, RadioIndicator } from "./ui/radio";
import { CircleIcon, AddIcon } from "@/components/ui/icon";

interface Props {
  editable?: boolean;
  exercise: Exercise;
  values: {
    weight: number;
    reps: number;
    sets: number;
    order: number;
  };
}

const SessionExerciseView = ({ exercise, values, editable }: Props) => {
  const [details, showDetails] = useState(false);
  return (
    <Box className="bg-white rounded-xl p-4">
      <Box className="flex flex-row justify-between">
        {editable && (
          <Button onPress={() => showDetails(!details)}>
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
        {editable && (
          <Button>
            <Entypo name="dots-three-vertical" size={14} color="black" />
          </Button>
        )}
      </Box>
      <Box>
        {details && (
          <VStack className="gap-2">
            {[...Array(values.sets)].map((_, i) => (
              <Box
                key={exercise.id + i}
                className="flex flex-row justify-between items-center h-16 p-4 bg-gray-100 rounded-xl"
              >
                <RadioGroup>
                  <Radio value={""}>
                    <RadioIndicator>
                      <RadioIcon as={CircleIcon} />
                    </RadioIndicator>
                  </Radio>
                </RadioGroup>

                <Text className="text-2xl font-bold">{i + 1}</Text>
                <Box className="flex flex-row items-center justify-center gap-4">
                  <TextInput
                    className="bg-gray-200 h-full rounded-md p-2 text-2xl font-bold w-14"
                    placeholder="Reps"
                    value={values.reps.toString()}
                    keyboardType="numeric"
                  />
                  <Text className="text-2xl font-bold">Reps</Text>
                </Box>
                <Box className="flex flex-row items-center justify-center gap-4">
                  <TextInput
                    className="bg-gray-200 h-full rounded-md p-2 text-2xl font-bold w-14"
                    placeholder="Weight"
                    value={values.weight.toString()}
                    keyboardType="numeric"
                  />
                  <Text className="text-2xl font-bold">KG</Text>
                </Box>
              </Box>
            ))}
            <Button className="bg-gray-100 rounded-xl h-16 active:bg-gray-200">
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
