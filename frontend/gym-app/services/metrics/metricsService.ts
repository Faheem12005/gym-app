import api from "@/utils/api";
import { AxiosError } from "axios";

export const getWorkoutSessions = async (userId: string, cursor?: string) => {
    try {
        const { data } = await api.get(`/metrics/${userId}`, {
            params: { cursor }
        });
        return data.sessions;
    }
    catch(error) {
        if (error instanceof AxiosError) {
            console.error("API Error:", error.response?.data || error.message);
        }
        throw error;
    }
}

export const getAggMetrics = async () => {
    try {
        const { data } = await api.get('/metrics');
        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("API Error:", error.response?.data || error.message);
        }
        throw error;
    }
}
