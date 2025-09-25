import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';
import { RecentWorkout } from '@/app/types/profile';

interface WorkoutItemProps {
  workout: RecentWorkout;
  onPress: (workoutId: string) => void;
}

function WorkoutItem({ workout, onPress }: WorkoutItemProps) {
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const cardBackground = useThemeColor({ light: '#f8f9fa', dark: '#2a2a2a' }, 'background');
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      return 'Today';
    } else if (diffDays === 2) {
      return 'Yesterday';
    } else if (diffDays <= 7) {
      return `${diffDays - 1} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <TouchableOpacity 
      style={[styles.workoutItem, { backgroundColor: cardBackground }]}
      onPress={() => onPress(workout.id)}
    >
      <View style={styles.workoutHeader}>
        <Text style={[styles.workoutName, { color: textColor }]}>{workout.name}</Text>
        <Text style={[styles.workoutDate, { color: textColor, opacity: 0.6 }]}>
          {formatDate(workout.date)}
        </Text>
      </View>
      
      <View style={styles.workoutStats}>
        <View style={styles.statItem}>
          <Ionicons name="time-outline" size={16} color={tintColor} />
          <Text style={[styles.statText, { color: textColor, opacity: 0.7 }]}>
            {formatDuration(workout.duration)}
          </Text>
        </View>
        
        <View style={styles.statItem}>
          <Ionicons name="barbell-outline" size={16} color={tintColor} />
          <Text style={[styles.statText, { color: textColor, opacity: 0.7 }]}>
            {workout.exerciseCount} exercises
          </Text>
        </View>
        
        <View style={styles.statItem}>
          <Ionicons name="trending-up-outline" size={16} color={tintColor} />
          <Text style={[styles.statText, { color: textColor, opacity: 0.7 }]}>
            {workout.totalVolume.toLocaleString()} lbs
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

interface RecentActivityProps {
  recentWorkouts: RecentWorkout[];
  onWorkoutPress: (workoutId: string) => void;
  onViewAllPress: () => void;
}

export default function RecentActivity({ 
  recentWorkouts, 
  onWorkoutPress, 
  onViewAllPress 
}: RecentActivityProps) {
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const cardBackground = useThemeColor({ light: '#ffffff', dark: '#1a1a1a' }, 'background');

  return (
    <View style={[styles.container, { backgroundColor: cardBackground }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor }]}>Recent Workouts</Text>
        <TouchableOpacity onPress={onViewAllPress}>
          <Text style={[styles.viewAllText, { color: tintColor }]}>View All</Text>
        </TouchableOpacity>
      </View>
      
      {recentWorkouts.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="barbell-outline" size={48} color={textColor} style={styles.emptyIcon} />
          <Text style={[styles.emptyText, { color: textColor, opacity: 0.6 }]}>
            No workouts yet
          </Text>
          <Text style={[styles.emptySubtext, { color: textColor, opacity: 0.5 }]}>
            Start your fitness journey today!
          </Text>
        </View>
      ) : (
        <View style={styles.workoutsList}>
          {recentWorkouts.slice(0, 5).map((workout) => (
            <WorkoutItem 
              key={workout.id} 
              workout={workout} 
              onPress={onWorkoutPress} 
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewAllText: {
    fontSize: 16,
    fontWeight: '500',
  },
  workoutsList: {
    gap: 12,
  },
  workoutItem: {
    padding: 16,
    borderRadius: 12,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  workoutName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  workoutDate: {
    fontSize: 14,
    marginLeft: 8,
  },
  workoutStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    minWidth: 80,
  },
  statText: {
    fontSize: 14,
    marginLeft: 6,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyIcon: {
    opacity: 0.3,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
});