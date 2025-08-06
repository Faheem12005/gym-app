import { View, Text, SectionList, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import api from '@/utils/api';
import { useEffect, useState } from 'react';
import { WorkoutPlanWithRelations, Exercise } from '@/app/types/generated/zod';
import { useSession } from '@/auth/authContext';
import WeeklyScheduleView from '@/components/WeeklyScheduleView';

//TO DO
//convert exercise view into a modal

interface Section {
  title: string;
  data: Exercise[];
}

export default function CreatePlanPage() {
  const { id } = useLocalSearchParams();
  const { session } = useSession();
  const [plan, setPlan] = useState<null | WorkoutPlanWithRelations>(null);
  const [exercises, setExercises] = useState<Section[] | null>(null);
  const [loading, setLoading] = useState(true);
  // const [addedExercises, setAddedExercises] = useState<Exercise[] | []>([]);

  

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await api.get('/exercises', {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        });
        setExercises(response.data);
      } catch (error) {
        console.error('Error fetching Exercises', error);
      }
    };

    const fetchPlan = async () => {
      try {
        const response = await api.get(`/workout/${id}`, {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        });
        console.log('Fetched plan:', response.data);
        setPlan(response.data);
      } catch (error) {
        console.error('Error fetching workout plan:', error);
      }
    };

    const fetchExercisesAndPlans = async () => {
      try {
        await fetchExercises();
        await fetchPlan();
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercisesAndPlans();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{plan?.name}</Text>
      <Text style={styles.subheading}>{plan?.id}</Text>
    {/* Exercises that are already added come here in exercise view */}
      {/* <SectionList
        sections={exercises!}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        renderItem={({ item }) => (
          <Text style={styles.exerciseItem}>{item.name}</Text>
        )}
      /> */}
      <WeeklyScheduleView planId={id} workoutDays={plan?.workoutDays ?? []}/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16, // space from the sides
    paddingTop: 16,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subheading: {
    fontSize: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#eee',
    paddingVertical: 4,
    paddingHorizontal: 8,
    width: '100%',
  },
  exerciseItem: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 8,
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
});
