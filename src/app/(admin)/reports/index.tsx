import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import AdminHeader from '../../../components/admin/AdminHeader';
import colors from '../../../constants/colors';
import spacing from '../../../constants/spacing';

const reports = [
  { label: 'Revenue today', value: 'KSh 128,400' },
  { label: 'Orders today', value: '86' },
  { label: 'Avg order value', value: 'KSh 1,492' },
  { label: 'Repeat customers', value: '42%' },
];

export default function AdminReportsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <AdminHeader title="Reports" subtitle="High-level performance" />
      <ScrollView contentContainerStyle={styles.container}>
        {reports.map((report) => (
          <View key={report.label} style={styles.card}>
            <Text style={styles.label}>{report.label}</Text>
            <Text style={styles.value}>{report.value}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxl },
  card: { backgroundColor: colors.backgroundAlt, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: spacing.lg },
  label: { color: colors.textMuted },
  value: { color: colors.text, fontWeight: '700', marginTop: spacing.xs, fontSize: 20 },
});
