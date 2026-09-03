import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import Button from '../../../components/common/Button';
import Header from '../../../components/common/Header';
import colors from '../../../constants/colors';
import spacing from '../../../constants/spacing';
import { mockAddresses } from '../../../services/mockData';

export default function CustomerAddressesScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Addresses" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.container}>
        {mockAddresses.map((address) => (
          <View key={address.id} style={styles.card}>
            <Text style={styles.label}>{address.label}</Text>
            <Text style={styles.text}>{address.street}</Text>
            <Text style={styles.text}>{address.city}</Text>
          </View>
        ))}
        <Button title="Add address" onPress={() => router.push('/(customer)/address/edit')} fullWidth />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxl },
  card: { backgroundColor: colors.backgroundAlt, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: spacing.lg },
  label: { color: colors.text, fontWeight: '700', marginBottom: spacing.xs },
  text: { color: colors.textMuted },
});
