import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Header from '../../../components/common/Header';
import colors from '../../../constants/colors';
import spacing from '../../../constants/spacing';
import typography from '../../../constants/typography';
import { mockManufacturers } from '../../../services/mockData';

export default function CustomerManufacturersScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Manufacturers" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.container}>
        {mockManufacturers.map((manufacturer) => (
          <Text key={manufacturer.id} style={styles.card} onPress={() => router.push({ pathname: '/(customer)/products/manufacturer/[manufacturerId]', params: { manufacturerId: manufacturer.id } })}>
            {manufacturer.name}
          </Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { padding: spacing.lg, gap: spacing.md },
  card: { backgroundColor: colors.backgroundAlt, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, color: colors.text, fontSize: typography.body, fontWeight: '600' },
});
