import { WorkoutSession } from "@/app/types/generated/zod";
import api from "@/utils/api";
import { AxiosError } from "axios";


export const createWorkoutSession = async (data: {
  userId: string;
  workoutDayId: string;
}) => {
  try {
    const response = await api.post("/workout-sessions/create", data);
    return response.data;
  } catch (error) {
    console.error("Error creating workout session:", error);
    throw error;
  }
};

export const deleteWorkoutSession = async (id: string) => {
  try {
    await api.delete(`/workout-sessions/${id}`);
  } catch (error) {
    console.error("Error deleting workout session:", error);
    throw error;
  }
};


export const checkIfWorkoutSessionExists = async (
  userId: string,
  workoutDayId: string
): Promise<boolean> => {
  try {
    const { data } = await api.get<{ exists: boolean; session?: WorkoutSession }>(
      `/workout-sessions/exists`,
      { params: { userId, workoutDayId } }
    );

    if (data.exists) {
      if (data.session?.startTime) {
        const startTime = new Date(data.session.startTime);
        const today = new Date();
        if (startTime.toDateString() === today.toDateString()) {
          return true;
        }
      }
    }
    return false;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      return false;
    }
    else {
      console.error("Error checking workout session existence:", error);
      throw error;
    }
  }
};

export const getWorkoutSession = async (id: string, cursor?: string) => {
  try {
    const response = await api.get(`/metrics/${id}`, {
      params: { cursor }
    });
    return response.data;
  } catch (error: AxiosError | any) {
    console.error("Error fetching workout session:", error.message);
    throw error;
  }
}
