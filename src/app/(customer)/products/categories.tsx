import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Header from '../../../components/common/Header';
import colors from '../../../constants/colors';
import spacing from '../../../constants/spacing';
import typography from '../../../constants/typography';
import { mockCategories } from '../../../services/mockData';

export default function CustomerCategoriesScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Categories" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.container}>
        {mockCategories.map((category) => (
          <Text key={category.id} style={styles.card} onPress={() => router.push({ pathname: '/(customer)/products/category/[categoryId]', params: { categoryId: category.id } })}>
            {category.name}
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
