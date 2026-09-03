import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Header from '../../../components/common/Header';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import colors from '../../../constants/colors';
import spacing from '../../../constants/spacing';
import { mockUser } from '../../../services/mockData';

export default function CustomerProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Profile" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Input label="Full name" value={mockUser.name} />
          <Input label="Email" value={mockUser.email || ''} />
          <Input label="Phone" value={mockUser.phone} />
        </View>
        <Button title="Save changes" onPress={() => router.back()} fullWidth />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xxl },
  card: { gap: spacing.md },
});
