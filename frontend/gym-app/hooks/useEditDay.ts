// hooks/useEditDay.ts
import { useEffect, useState } from "react";
import api from "@/utils/api";
import { Exercise } from "@/app/types/generated/zod";

export type OrderedExercise = {
  exercise: Exercise;
  id: string | null;
  order: number;
  sets: number;
  reps: number;
  weights: number;
  restSeconds: number;
  exerciseId: string;
  dayId: string;
  isNew?: boolean;
};

interface Section {
  title: string;
  data: Exercise[];
}

export function useEditDay(dayId: string | string[] | undefined, token?: string) {
  const [exercises, setExercises] = useState<Section[] | null>(null);
  const [addedExercises, setAddedExercises] = useState<OrderedExercise[]>([]);
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);

  // Fetch exercises for the day
  useEffect(() => {
    const fetchDayExercises = async () => {
      try {
        const response = await api.get(`/workout-days/${dayId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const orderedExercises: OrderedExercise[] = response.data.exercises.map(
          (item: any) => ({
            exercise: item.exercise,
            order: item.order,
            id: item.id,
            reps: item.reps,
            sets: item.sets,
            weights: item.weights,
            restSeconds: item.restSeconds,
            exerciseId: item.exerciseId,
            dayId: item.dayId,
            isNew: false,
          })
        );
        setAddedExercises(orderedExercises);
      } catch (error) {
        console.error("Error fetching day exercises", error);
      }
    };

    const fetchAllExercises = async () => {
      try {
        const response = await api.get("/exercises", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExercises(response.data);
      } catch (error) {
        console.error("Error fetching exercises", error);
      } finally {
        setLoading(false);
      }
    };

    if (dayId && token) {
      fetchDayExercises();
      fetchAllExercises();
    }
  }, [dayId, token]);

  // Add selected exercises to the day
  const addSelectedExercises = () => {
    setAddedExercises((prev) => [
      ...prev,
      ...selectedExercises.map((exercise, index) => ({
        exercise,
        id: null,
        order: prev.length + index,
        sets: 3,
        reps: 10,
        weights: 10,
        restSeconds: 60,
        exerciseId: exercise.id,
        dayId: typeof dayId === "string" ? dayId : "",
        isNew: true,
      })),
    ]);
    setSelectedExercises([]);
  };

  // Save exercises (new and existing)
  const saveExercises = async () => {
    setSaveLoading(true);
    const newExercises = addedExercises.filter((ex) => ex.isNew);
    const existingExercises = addedExercises.filter((ex) => !ex.isNew);

    try {
      if (newExercises.length > 0) {
        await api.post(
          "/workout-exercises",
          { exercises: newExercises, workoutDayId: dayId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      if (existingExercises.length > 0) {
        await api.put(
          "/workout-exercises",
          { exercises: existingExercises },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    } catch (error) {
      console.error("Error saving exercises", error);
    } finally {
      setSaveLoading(false);
    }
  };

  const filteredExercises = exercises
    ?.map((section) => ({
      ...section,
      data: section.data.filter(
        (exercise) => !addedExercises.some((ex) => ex.exerciseId === exercise.id)
      ),
    }))
    .filter((section) => section.data.length > 0);

  return {
    loading,
    saveLoading,
    exercises: filteredExercises,
    addedExercises,
    setAddedExercises,
    selectedExercises,
    setSelectedExercises,
    addSelectedExercises,
    saveExercises,
  };
}
