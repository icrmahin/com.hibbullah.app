import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Header from '../../components/common/Header';
import colors from '../../constants/colors';
import spacing from '../../constants/spacing';
import typography from '../../constants/typography';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('amina@hibbullah.app');

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Reset password" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.subtitle}>Enter the email address associated with your account and we’ll send a reset link.</Text>
        <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <Button title="Send reset link" onPress={() => router.push('/(auth)/reset-password')} fullWidth />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flexGrow: 1, padding: spacing.xxl, gap: spacing.xl },
  subtitle: { color: colors.textMuted, fontSize: typography.bodySmall },
});
