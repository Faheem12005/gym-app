import { View, Text } from "react-native";
import { Exercise } from "@/app/types/generated/zod";

interface Props {
    exercise: Exercise
}

export default function ExerciseView({ exercise }: Props) {
    return (
        <View>
            <Text>{exercise.name}</Text>
            
        </View>
    );
}