export interface UserProfile {
  id: string;
  name: string;
  email: string;
  image?: string;
  joinDate: string;
  bio?: string;
  location?: string;
  height?: number;
  weight?: number;
  goalWeight?: number;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  preferredWorkoutTime: 'morning' | 'afternoon' | 'evening';
}

export interface UserStats {
  totalWorkouts: number;
  totalWorkoutTime: number; // in minutes
  currentStreak: number;
  longestStreak: number;
  favoriteExercise: string;
  totalWeightLifted: number; // in lbs/kg
  averageWorkoutDuration: number; // in minutes
  workoutsThisWeek: number;
  workoutsThisMonth: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  isUnlocked: boolean;
  progress?: number;
  target?: number;
}

export interface RecentWorkout {
  id: string;
  name: string;
  date: string;
  duration: number; // in minutes
  exerciseCount: number;
  totalVolume: number;
}

export interface PreferenceSettings {
  notifications: {
    workoutReminders: boolean;
    achievementAlerts: boolean;
    weeklyReports: boolean;
  };
  units: {
    weight: 'lbs' | 'kg';
    distance: 'miles' | 'km';
  };
  privacy: {
    showStats: boolean;
    showAchievements: boolean;
  };
}