import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';

interface QuickStatsProps {
  currentStreak: number;
  workoutsThisWeek: number;
  totalWorkouts: number;
}

export default function QuickStats({ currentStreak, workoutsThisWeek, totalWorkouts }: QuickStatsProps) {
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const cardBackground = useThemeColor({ light: '#ffffff', dark: '#1a1a1a' }, 'background');

  return (
    <View style={[styles.container, { backgroundColor: cardBackground }]}>
      <View style={styles.statRow}>
        <View style={styles.quickStat}>
          <Ionicons name="flame" size={20} color={tintColor} />
          <Text style={[styles.quickStatValue, { color: textColor }]}>{currentStreak}</Text>
          <Text style={[styles.quickStatLabel, { color: textColor, opacity: 0.7 }]}>Day Streak</Text>
        </View>
        
        <View style={styles.quickStat}>
          <Ionicons name="calendar" size={20} color={tintColor} />
          <Text style={[styles.quickStatValue, { color: textColor }]}>{workoutsThisWeek}</Text>
          <Text style={[styles.quickStatLabel, { color: textColor, opacity: 0.7 }]}>This Week</Text>
        </View>
        
        <View style={styles.quickStat}>
          <Ionicons name="trophy" size={20} color={tintColor} />
          <Text style={[styles.quickStatValue, { color: textColor }]}>{totalWorkouts}</Text>
          <Text style={[styles.quickStatLabel, { color: textColor, opacity: 0.7 }]}>Total</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: -20,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 1,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickStat: {
    alignItems: 'center',
    flex: 1,
  },
  quickStatValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  quickStatLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
});