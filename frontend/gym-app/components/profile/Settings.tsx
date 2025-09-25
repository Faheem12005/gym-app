import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';
import { PreferenceSettings } from '@/app/types/profile';

interface SettingItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  showArrow?: boolean;
}

function SettingItem({ icon, title, subtitle, onPress, rightElement, showArrow = true }: SettingItemProps) {
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');

  return (
    <TouchableOpacity 
      style={styles.settingItem} 
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingLeft}>
        <Ionicons name={icon} size={24} color={tintColor} style={styles.settingIcon} />
        <View style={styles.settingText}>
          <Text style={[styles.settingTitle, { color: textColor }]}>{title}</Text>
          {subtitle && (
            <Text style={[styles.settingSubtitle, { color: textColor, opacity: 0.6 }]}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      
      <View style={styles.settingRight}>
        {rightElement}
        {showArrow && onPress && (
          <Ionicons name="chevron-forward" size={20} color={textColor} style={styles.chevron} />
        )}
      </View>
    </TouchableOpacity>
  );
}

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

function SettingsSection({ title, children }: SettingsSectionProps) {
  const textColor = useThemeColor({}, 'text');

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: textColor, opacity: 0.7 }]}>{title}</Text>
      <View style={styles.sectionContent}>
        {children}
      </View>
    </View>
  );
}

interface SettingsProps {
  preferences: PreferenceSettings;
  onPreferenceChange: (key: string, value: any) => void;
  onEditProfile: () => void;
  onChangePassword: () => void;
  onPrivacy: () => void;
  onSupport: () => void;
  onAbout: () => void;
  onSignOut?: () => void;
}

export default function Settings({ 
  preferences, 
  onPreferenceChange,
  onEditProfile,
  onChangePassword,
  onPrivacy,
  onSupport,
  onAbout,
  onSignOut
}: SettingsProps) {
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const cardBackground = useThemeColor({ light: '#ffffff', dark: '#1a1a1a' }, 'background');

  return (
    <View style={[styles.container, { backgroundColor: cardBackground }]}>
      <Text style={[styles.title, { color: textColor }]}>Settings</Text>
      
      <SettingsSection title="PROFILE">
        <SettingItem
          icon="person-outline"
          title="Edit Profile"
          subtitle="Update your personal information"
          onPress={onEditProfile}
        />
        <SettingItem
          icon="lock-closed-outline"
          title="Change Password"
          subtitle="Update your account password"
          onPress={onChangePassword}
        />
      </SettingsSection>

      <SettingsSection title="NOTIFICATIONS">
        <SettingItem
          icon="notifications-outline"
          title="Workout Reminders"
          subtitle="Get reminded about your scheduled workouts"
          rightElement={
            <Switch
              value={preferences.notifications.workoutReminders}
              onValueChange={(value) => onPreferenceChange('notifications.workoutReminders', value)}
              trackColor={{ false: '#767577', true: tintColor }}
              thumbColor={preferences.notifications.workoutReminders ? '#f4f3f4' : '#f4f3f4'}
            />
          }
          showArrow={false}
        />
        <SettingItem
          icon="trophy-outline"
          title="Achievement Alerts"
          subtitle="Get notified when you unlock achievements"
          rightElement={
            <Switch
              value={preferences.notifications.achievementAlerts}
              onValueChange={(value) => onPreferenceChange('notifications.achievementAlerts', value)}
              trackColor={{ false: '#767577', true: tintColor }}
              thumbColor={preferences.notifications.achievementAlerts ? '#f4f3f4' : '#f4f3f4'}
            />
          }
          showArrow={false}
        />
        <SettingItem
          icon="bar-chart-outline"
          title="Weekly Reports"
          subtitle="Receive weekly progress summaries"
          rightElement={
            <Switch
              value={preferences.notifications.weeklyReports}
              onValueChange={(value) => onPreferenceChange('notifications.weeklyReports', value)}
              trackColor={{ false: '#767577', true: tintColor }}
              thumbColor={preferences.notifications.weeklyReports ? '#f4f3f4' : '#f4f3f4'}
            />
          }
          showArrow={false}
        />
      </SettingsSection>

      <SettingsSection title="UNITS & PREFERENCES">
        <SettingItem
          icon="scale-outline"
          title="Weight Units"
          subtitle={`Currently using ${preferences.units.weight}`}
          onPress={() => onPreferenceChange('units.weight', preferences.units.weight === 'lbs' ? 'kg' : 'lbs')}
          rightElement={
            <Text style={[styles.unitText, { color: tintColor }]}>
              {preferences.units.weight.toUpperCase()}
            </Text>
          }
        />
        <SettingItem
          icon="speedometer-outline"
          title="Distance Units"
          subtitle={`Currently using ${preferences.units.distance}`}
          onPress={() => onPreferenceChange('units.distance', preferences.units.distance === 'miles' ? 'km' : 'miles')}
          rightElement={
            <Text style={[styles.unitText, { color: tintColor }]}>
              {preferences.units.distance.toUpperCase()}
            </Text>
          }
        />
      </SettingsSection>

      <SettingsSection title="PRIVACY & SUPPORT">
        <SettingItem
          icon="shield-outline"
          title="Privacy Settings"
          subtitle="Manage your data and privacy preferences"
          onPress={onPrivacy}
        />
        <SettingItem
          icon="help-circle-outline"
          title="Help & Support"
          subtitle="Get help or contact support"
          onPress={onSupport}
        />
        <SettingItem
          icon="information-circle-outline"
          title="About"
          subtitle="App version and information"
          onPress={onAbout}
        />
      </SettingsSection>

      {onSignOut && (
        <SettingsSection title="ACCOUNT">
          <SettingItem
            icon="log-out-outline"
            title="Sign Out"
            subtitle="Sign out of your account"
            onPress={onSignOut}
          />
        </SettingsSection>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  sectionContent: {
    gap: 4,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: 16,
    width: 24,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chevron: {
    marginLeft: 8,
    opacity: 0.5,
  },
  unitText: {
    fontSize: 16,
    fontWeight: '600',
  },
});