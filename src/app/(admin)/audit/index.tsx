import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AdminHeader from '../../../components/admin/AdminHeader';
import colors from '../../../constants/colors';
import spacing from '../../../constants/spacing';
import { mockAuditEntries } from '../../../services/mockData';

export default function AuditLogScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <AdminHeader title="Audit log" subtitle="Recent operational activity" />
      <ScrollView contentContainerStyle={styles.container}>
        {mockAuditEntries.map((entry) => (
          <View key={entry.id} style={styles.card}>
            <Text style={styles.action}>{entry.action}</Text>
            <Text style={styles.meta}>{entry.actor}</Text>
            <Text style={styles.meta}>{entry.timestamp}</Text>
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
  action: { color: colors.text, fontWeight: '700' },
  meta: { color: colors.textMuted, marginTop: spacing.xs },
});
