import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, StyleSheet, Alert, RefreshControl } from 'react-native';
import { useSession } from '@/auth/authContext';
import { useThemeColor } from '@/hooks/useThemeColor';

// Profile Components
import ProfileHeader from '@/components/profile/ProfileHeader';
import QuickStats from '@/components/profile/QuickStats';
import StatsCard from '@/components/profile/StatsCard';
import Achievements from '@/components/profile/Achievements';
import RecentActivity from '@/components/profile/RecentActivity';
import Settings from '@/components/profile/Settings';

// Types
import { 
  UserProfile, 
  UserStats, 
  Achievement, 
  RecentWorkout, 
  PreferenceSettings 
} from '@/app/types/profile';

export default function ProfilePage() {
  const { session, signOut } = useSession();
  const backgroundColor = useThemeColor({}, 'background');
  
  const [refreshing, setRefreshing] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [recentWorkouts, setRecentWorkouts] = useState<RecentWorkout[]>([]);
  const [preferences, setPreferences] = useState<PreferenceSettings>({
    notifications: {
      workoutReminders: true,
      achievementAlerts: true,
      weeklyReports: false,
    },
    units: {
      weight: 'lbs',
      distance: 'miles',
    },
    privacy: {
      showStats: true,
      showAchievements: true,
    },
  });

  const loadProfileData = useCallback(async () => {
    if (!session?.user) return;

    // Mock data - replace with actual API calls
    setProfile({
      id: session.user.id,
      name: session.user.name || 'User',
      email: session.user.email,
      image: session.user.image || undefined,
      joinDate: session.user.createdAt,
      bio: 'Fitness enthusiast on a journey to better health',
      location: 'New York, NY',
      height: 70, // inches
      weight: 180, // lbs
      goalWeight: 175,
      fitnessLevel: 'intermediate',
      preferredWorkoutTime: 'morning',
    });

    setStats({
      totalWorkouts: 47,
      totalWorkoutTime: 2340, // 39 hours
      currentStreak: 7,
      longestStreak: 14,
      favoriteExercise: 'Bench Press',
      totalWeightLifted: 125000,
      averageWorkoutDuration: 50,
      workoutsThisWeek: 4,
      workoutsThisMonth: 16,
    });

    setAchievements([
      {
        id: '1',
        title: 'First Workout',
        description: 'Complete your first workout session',
        icon: 'trophy',
        isUnlocked: true,
        unlockedAt: '2025-01-15',
      },
      {
        id: '2',
        title: 'Consistency King',
        description: 'Complete 7 workouts in a row',
        icon: 'flame',
        isUnlocked: true,
        unlockedAt: '2025-02-01',
      },
      {
        id: '3',
        title: 'Heavy Lifter',
        description: 'Lift 1000 lbs total in a single workout',
        icon: 'barbell',
        isUnlocked: false,
        progress: 750,
        target: 1000,
      },
      {
        id: '4',
        title: 'Marathon Trainer',
        description: 'Complete 50 total workouts',
        icon: 'medal',
        isUnlocked: false,
        progress: 47,
        target: 50,
      },
    ]);

    setRecentWorkouts([
      {
        id: '1',
        name: 'Push Day',
        date: '2025-09-25',
        duration: 65,
        exerciseCount: 6,
        totalVolume: 3250,
      },
      {
        id: '2',
        name: 'Pull Day',
        date: '2025-09-23',
        duration: 55,
        exerciseCount: 5,
        totalVolume: 2800,
      },
      {
        id: '3',
        name: 'Leg Day',
        date: '2025-09-21',
        duration: 70,
        exerciseCount: 7,
        totalVolume: 4200,
      },
    ]);
  }, [session]);

  // Initialize mock data - replace with API calls
  useEffect(() => {
    loadProfileData();
  }, [loadProfileData]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProfileData();
    setRefreshing(false);
  };

  const handlePreferenceChange = (key: string, value: any) => {
    const keys = key.split('.');
    setPreferences(prev => {
      const updated = { ...prev };
      let current: any = updated;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing feature coming soon!');
  };

  const handleChangePassword = () => {
    Alert.alert('Change Password', 'Password change feature coming soon!');
  };

  const handlePrivacy = () => {
    Alert.alert('Privacy Settings', 'Privacy settings feature coming soon!');
  };

  const handleSupport = () => {
    Alert.alert('Support', 'Support feature coming soon!');
  };

  const handleAbout = () => {
    Alert.alert('About', 'Gym App v1.0.0\nBuilt with React Native & Expo');
  };

  const handleWorkoutPress = (workoutId: string) => {
    Alert.alert('Workout Details', `Opening workout: ${workoutId}`);
    // router.push(`/workout/${workoutId}` as any);
  };

  const handleViewAllWorkouts = () => {
    Alert.alert('All Workouts', 'View all workouts feature coming soon!');
    // router.push('/workouts' as any);
  };

  if (!session || !profile || !stats) {
    return null; // Loading state - you might want to add a spinner here
  }

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor }]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
    >
      <ProfileHeader 
        profile={profile} 
        onEditPress={handleEditProfile}
      />
      
      <QuickStats 
        currentStreak={stats.currentStreak}
        workoutsThisWeek={stats.workoutsThisWeek}
        totalWorkouts={stats.totalWorkouts}
      />
      
      <StatsCard stats={stats} />
      
      <Achievements achievements={achievements} />
      
      <RecentActivity 
        recentWorkouts={recentWorkouts}
        onWorkoutPress={handleWorkoutPress}
        onViewAllPress={handleViewAllWorkouts}
      />
      
      <Settings
        preferences={preferences}
        onPreferenceChange={handlePreferenceChange}
        onEditProfile={handleEditProfile}
        onChangePassword={handleChangePassword}
        onPrivacy={handlePrivacy}
        onSupport={handleSupport}
        onAbout={handleAbout}
        onSignOut={signOut}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
