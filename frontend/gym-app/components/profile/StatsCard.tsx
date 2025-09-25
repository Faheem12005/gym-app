import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';
import { UserStats } from '@/app/types/profile';

interface StatItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string | number;
  subtitle?: string;
}

function StatItem({ icon, label, value, subtitle }: StatItemProps) {
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');

  return (
    <View style={styles.statItem}>
      <Ionicons name={icon} size={24} color={tintColor} style={styles.statIcon} />
      <Text style={[styles.statValue, { color: textColor }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: textColor, opacity: 0.7 }]}>{label}</Text>
      {subtitle && (
        <Text style={[styles.statSubtitle, { color: textColor, opacity: 0.5 }]}>{subtitle}</Text>
      )}
    </View>
  );
}

interface StatsCardProps {
  stats: UserStats;
}

export default function StatsCard({ stats }: StatsCardProps) {
  const cardBackground = useThemeColor({ light: '#ffffff', dark: '#1a1a1a' }, 'background');

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const formatWeight = (weight: number) => {
    if (weight >= 1000) {
      return `${(weight / 1000).toFixed(1)}K`;
    }
    return weight.toString();
  };

  return (
    <View style={[styles.container, { backgroundColor: cardBackground }]}>
      <Text style={[styles.title, { color: useThemeColor({}, 'text') }]}>Your Stats</Text>
      
      <View style={styles.statsGrid}>
        <StatItem
          icon="barbell-outline"
          label="Total Workouts"
          value={stats.totalWorkouts}
        />
        <StatItem
          icon="time-outline"
          label="Total Time"
          value={formatDuration(stats.totalWorkoutTime)}
        />
        <StatItem
          icon="flame-outline"
          label="Current Streak"
          value={stats.currentStreak}
          subtitle={`Best: ${stats.longestStreak}`}
        />
        <StatItem
          icon="trophy-outline"
          label="Weight Lifted"
          value={`${formatWeight(stats.totalWeightLifted)} lbs`}
        />
        <StatItem
          icon="heart-outline"
          label="Favorite Exercise"
          value={stats.favoriteExercise}
        />
        <StatItem
          icon="pulse-outline"
          label="Avg Duration"
          value={formatDuration(stats.averageWorkoutDuration)}
        />
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressItem}>
          <Text style={[styles.progressLabel, { color: useThemeColor({}, 'text'), opacity: 0.7 }]}>
            This Week
          </Text>
          <Text style={[styles.progressValue, { color: useThemeColor({}, 'tint') }]}>
            {stats.workoutsThisWeek} workouts
          </Text>
        </View>
        <View style={styles.progressItem}>
          <Text style={[styles.progressLabel, { color: useThemeColor({}, 'text'), opacity: 0.7 }]}>
            This Month
          </Text>
          <Text style={[styles.progressValue, { color: useThemeColor({}, 'tint') }]}>
            {stats.workoutsThisMonth} workouts
          </Text>
        </View>
      </View>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 20,
    minHeight: 80,
    justifyContent: 'center',
  },
  statIcon: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    textAlign: 'center',
  },
  statSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  progressSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  progressItem: {
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  progressValue: {
    fontSize: 16,
    fontWeight: '600',
  },
});