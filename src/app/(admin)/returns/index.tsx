import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AdminHeader from '../../../components/admin/AdminHeader';
import StatusBadge from '../../../components/common/StatusBadge';
import colors from '../../../constants/colors';
import spacing from '../../../constants/spacing';
import { mockReturns } from '../../../services/mockData';

export default function AdminReturnsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <AdminHeader title="Returns" subtitle="Customer return requests" />
      <ScrollView contentContainerStyle={styles.container}>
        {mockReturns.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.order}>{item.orderId}</Text>
            <Text style={styles.reason}>{item.reason}</Text>
            <StatusBadge label={item.status} tone={item.status === 'APPROVED' ? 'success' : 'warning'} />
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
  order: { color: colors.text, fontWeight: '700' },
  reason: { color: colors.textMuted, marginTop: spacing.xs, marginBottom: spacing.sm },
});
