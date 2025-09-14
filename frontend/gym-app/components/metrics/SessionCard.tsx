import { useState } from "react";
import { Button } from "../ui/button";
import Entypo from "@expo/vector-icons/Entypo";
import { Text } from "../ui/text";
import { Box } from "../ui/box";
import WorkoutLogList from "./WorkoutLogList";

export default function SessionCard({ session }: { session: any }) {
    const [showDetails, setShowDetails] = useState(false);
    const startDate = new Date(session.startTime);
    const endDate = new Date(session.endTime);
    return (
        <Box className="flex flex-col justify-between">
            <Box className="flex flex-row justify-between items-center p-4 bg-white rounded-xl mb-2">
            <Text>{startDate.toLocaleDateString()}</Text>
            <Text>{startDate.toLocaleTimeString()}</Text>
            <Text>--</Text>
            <Text>{endDate.toLocaleTimeString()}</Text>
            <Button onPress={() => setShowDetails(!showDetails)}>
            <Entypo
                name={showDetails ? "chevron-up" : "chevron-down"}
                size={16}
                color="black"
            />
            </Button>
            </Box>

            {showDetails && (
                <WorkoutLogList logs={session.logs} />
            )}
        </Box>
    );
}