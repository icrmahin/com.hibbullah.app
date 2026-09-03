import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Header from '../../../components/common/Header';
import Button from '../../../components/common/Button';
import colors from '../../../constants/colors';
import spacing from '../../../constants/spacing';
import typography from '../../../constants/typography';
import { mockUser } from '../../../services/mockData';

const menuItems = [
  { label: 'Profile', route: '/(customer)/account/profile' },
  { label: 'Addresses', route: '/(customer)/account/addresses' },
  { label: 'Notifications', route: '/(customer)/account/notifications' },
  { label: 'Settings', route: '/(customer)/account/settings' },
];

export default function CustomerAccountScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Account" subtitle="Your personal preferences" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}><Text style={styles.avatarText}>{mockUser.name[0]}</Text></View>
          <View>
            <Text style={styles.name}>{mockUser.name}</Text>
            <Text style={styles.email}>{mockUser.email}</Text>
          </View>
        </View>

        {menuItems.map((item) => (
          <Text key={item.label} style={styles.menuItem} onPress={() => router.push(item.route as any)}>{item.label}</Text>
        ))}

        <Button title="Logout" variant="secondary" onPress={() => router.replace('/(auth)/welcome')} fullWidth />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { padding: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.lg },
  profileCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.backgroundAlt, padding: spacing.lg, borderRadius: 18, borderWidth: 1, borderColor: colors.border },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.white, fontWeight: '700', fontSize: typography.h3 },
  name: { color: colors.text, fontWeight: '700', fontSize: typography.body },
  email: { color: colors.textMuted, fontSize: typography.bodySmall },
  menuItem: { backgroundColor: colors.backgroundAlt, borderRadius: 14, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, color: colors.text, fontWeight: '600' },
});
