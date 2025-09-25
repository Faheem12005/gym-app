import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';
import { UserProfile } from '@/app/types/profile';

interface ProfileHeaderProps {
  profile: UserProfile;
  onEditPress: () => void;
}

export default function ProfileHeader({ profile, onEditPress }: ProfileHeaderProps) {
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');
  const tintColor = useThemeColor({}, 'tint');

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.headerContent}>
        <View style={styles.avatarContainer}>
          {profile.image ? (
            <Image source={{ uri: profile.image }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatarPlaceholder, { backgroundColor: tintColor }]}>
              <Ionicons name="person" size={40} color="white" />
            </View>
          )}
        </View>
        
        <View style={styles.userInfo}>
          <Text style={[styles.name, { color: textColor }]}>{profile.name}</Text>
          <Text style={[styles.email, { color: textColor, opacity: 0.7 }]}>{profile.email}</Text>
          {profile.bio && (
            <Text style={[styles.bio, { color: textColor, opacity: 0.8 }]}>{profile.bio}</Text>
          )}
          <View style={styles.detailsRow}>
            {profile.location && (
              <View style={styles.detailItem}>
                <Ionicons name="location-outline" size={14} color={textColor} style={styles.detailIcon} />
                <Text style={[styles.detailText, { color: textColor, opacity: 0.7 }]}>{profile.location}</Text>
              </View>
            )}
            <View style={styles.detailItem}>
              <Ionicons name="calendar-outline" size={14} color={textColor} style={styles.detailIcon} />
              <Text style={[styles.detailText, { color: textColor, opacity: 0.7 }]}>
                Joined {new Date(profile.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
          <Ionicons name="pencil" size={20} color={tintColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    marginBottom: 8,
  },
  bio: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  detailsRow: {
    flexDirection: 'column',
    gap: 6,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIcon: {
    marginRight: 6,
  },
  detailText: {
    fontSize: 14,
  },
  editButton: {
    padding: 8,
    marginLeft: 8,
  },
});