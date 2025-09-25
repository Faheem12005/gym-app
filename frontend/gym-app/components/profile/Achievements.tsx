import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Achievement } from '@/app/types/profile';

interface AchievementItemProps {
  achievement: Achievement;
}

function AchievementItem({ achievement }: AchievementItemProps) {
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const cardBackground = useThemeColor({ light: '#f8f9fa', dark: '#2a2a2a' }, 'background');
  
  return (
    <View style={[styles.achievementItem, { backgroundColor: cardBackground }]}>
      <View style={[styles.iconContainer, { 
        backgroundColor: achievement.isUnlocked ? tintColor : 'rgba(128, 128, 128, 0.3)'
      }]}>
        <Ionicons 
          name={achievement.icon as keyof typeof Ionicons.glyphMap} 
          size={24} 
          color={achievement.isUnlocked ? 'white' : 'rgba(128, 128, 128, 0.7)'} 
        />
      </View>
      
      <View style={styles.achievementContent}>
        <Text style={[styles.achievementTitle, { 
          color: textColor,
          opacity: achievement.isUnlocked ? 1 : 0.6
        }]}>
          {achievement.title}
        </Text>
        <Text style={[styles.achievementDescription, { 
          color: textColor,
          opacity: achievement.isUnlocked ? 0.7 : 0.5
        }]}>
          {achievement.description}
        </Text>
        
        {achievement.progress !== undefined && achievement.target !== undefined && (
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { backgroundColor: 'rgba(128, 128, 128, 0.2)' }]}>
              <View style={[styles.progressFill, { 
                width: `${Math.min((achievement.progress / achievement.target) * 100, 100)}%`,
                backgroundColor: tintColor
              }]} />
            </View>
            <Text style={[styles.progressText, { color: textColor, opacity: 0.6 }]}>
              {achievement.progress}/{achievement.target}
            </Text>
          </View>
        )}
        
        {achievement.unlockedAt && (
          <Text style={[styles.unlockedDate, { color: tintColor }]}>
            Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
          </Text>
        )}
      </View>
    </View>
  );
}

interface AchievementsProps {
  achievements: Achievement[];
}

export default function Achievements({ achievements }: AchievementsProps) {
  const textColor = useThemeColor({}, 'text');
  const cardBackground = useThemeColor({ light: '#ffffff', dark: '#1a1a1a' }, 'background');
  
  const unlockedCount = achievements.filter(a => a.isUnlocked).length;

  return (
    <View style={[styles.container, { backgroundColor: cardBackground }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor }]}>Achievements</Text>
        <Text style={[styles.counter, { color: textColor, opacity: 0.7 }]}>
          {unlockedCount}/{achievements.length} unlocked
        </Text>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.achievementsList}
      >
        {achievements.map((achievement) => (
          <AchievementItem key={achievement.id} achievement={achievement} />
        ))}
      </ScrollView>
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
  counter: {
    fontSize: 14,
  },
  achievementsList: {
    paddingRight: 16,
  },
  achievementItem: {
    width: 200,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    textAlign: 'right',
  },
  unlockedDate: {
    fontSize: 12,
    marginTop: 8,
    fontWeight: '500',
  },
});