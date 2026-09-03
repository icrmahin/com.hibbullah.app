import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import colors from '../../constants/colors';
import spacing from '../../constants/spacing';
import typography from '../../constants/typography';
import { isEmpty, isValidEmail, isValidPhone } from '../../utils/validation';

export default function RegisterScreen() {
  const [name, setName] = useState('Amina Karim');
  const [phone, setPhone] = useState('+254712345678');
  const [email, setEmail] = useState('amina@hibbullah.app');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = () => {
    if (isEmpty(name)) {
      setError('Please enter your full name.');
      return;
    }
    if (!isValidPhone(phone)) {
      setError('Please enter a valid phone number.');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    router.replace('/(customer)/(tabs)');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.subtitle}>Join Hibbullah to manage your medicine needs.</Text>

        <View style={styles.form}>
          <Input label="Full name" value={name} onChangeText={setName} />
          <Input label="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          <Input label="Password" value={password} onChangeText={setPassword} secureTextEntry />
          <Input label="Confirm password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
          {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>

        <Button title="Create account" onPress={handleRegister} fullWidth />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flexGrow: 1, padding: spacing.xxl, justifyContent: 'center', gap: spacing.xl },
  title: { color: colors.text, fontSize: typography.title, fontWeight: '800' },
  subtitle: { color: colors.textMuted, fontSize: typography.bodySmall },
  form: { gap: spacing.md },
  error: { color: colors.danger, fontSize: typography.caption },
});
