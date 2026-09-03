import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Header from '../../components/common/Header';
import colors from '../../constants/colors';
import spacing from '../../constants/spacing';
import typography from '../../constants/typography';

export default function ResetPasswordScreen() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="New password" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.subtitle}>Choose a new secure password to complete the reset.</Text>
        <View style={styles.form}>
          <Input label="New password" value={password} onChangeText={setPassword} secureTextEntry />
          <Input label="Confirm password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
        </View>
        <Button title="Update password" onPress={() => router.replace('/(auth)/login')} fullWidth />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flexGrow: 1, padding: spacing.xxl, gap: spacing.xl },
  subtitle: { color: colors.textMuted, fontSize: typography.bodySmall },
  form: { gap: spacing.md },
});
