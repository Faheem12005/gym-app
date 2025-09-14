import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import { WorkoutSessionWithRelations } from "@/app/types/generated/zod";
import api from "@/utils/api";
import { Spinner } from "@/components/ui/spinner";
import { Box } from "@/components/ui/box";
import { Colors } from "@/constants/Colors";
import { useSession } from "@/auth/authContext";

interface WorkoutLogData {
  volume: number;
}

const getColor = (volume: number) => {
  if (volume < 500) return "bg-[#c6e48b]";
  if (volume < 1000) return "bg-[#7bc96f]";
  if (volume < 2000) return "bg-[#239a3b]";
  return "bg-[#196127]";
};

interface DayCellProps {
  date?: any;
  state?: string;
  workoutData: Record<string, WorkoutLogData>;
}

function DayCell({ date, state, workoutData }: DayCellProps) {
  const workout = workoutData[date.dateString];
  const color = workout ? getColor(workout.volume) : "bg-[#ebedf0]";
  const opacity = state === "disabled" ? "opacity-40" : "";
  return (
    <View
      className={`w-12 h-12 items-center justify-center rounded-sm ${color} ${opacity}`}
    >
      <Text className="text-[8px] text-black">{date.day}</Text>
    </View>
  );
}

export default function HeatmapCalendar() {
  const { session } = useSession();
  const [workoutData, setWorkoutData] = useState<Record<string, WorkoutLogData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().slice(0, 7));
  const [cursor, setCursor] = useState<string | undefined>(undefined);

  const fetchSessions = async (month: string) => {
    setIsLoading(true);
    try {
      const [year, monthNum] = month.split("-");
      const startDate = new Date(parseInt(year), parseInt(monthNum) - 1, 1).toISOString();
      const endDate = new Date(parseInt(year), parseInt(monthNum), 0, 23, 59, 59, 999).toISOString();

      const response = await api.get(`/metrics/${session?.user.id}`);
      const processedData: Record<string, WorkoutLogData> = {};
      let totalVolume = 0;
      response.data.sessions.forEach((session: WorkoutSessionWithRelations) => {
        const sessionDate = (typeof session.startTime === "string"
          ? session.startTime
          : session.startTime.toISOString()
        ).split('T')[0];
        totalVolume = session.logs.reduce((sum, log) => sum + log.volume!, 0);

        if (processedData[sessionDate]) {
          processedData[sessionDate].volume += totalVolume;
        } else {
          processedData[sessionDate] = { volume: totalVolume };
        }
      });

      setWorkoutData(processedData);
      setCursor(response.data.cursor);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions(currentMonth);
  }, [currentMonth]);

  if (isLoading) {
    return (
      <Box className="flex-1 justify-center items-center">
        <Spinner size="large" color={Colors.dark.background} />
      </Box>
    );
  }

  return (
    <Calendar
      dayComponent={(props) => <DayCell {...props} workoutData={workoutData} />}
      onMonthChange={(month) => {
        const newMonth = `${month.year}-${String(month.month).padStart(2, '0')}`;
        setCurrentMonth(newMonth);
      }}
      disableArrowLeft
      disableArrowRight
      renderArrow={() => null}
      renderHeader={() => null}
      hideExtraDays
      firstDay={1}
      initialDate={new Date().toISOString().slice(0, 10)}
    />
  );
}