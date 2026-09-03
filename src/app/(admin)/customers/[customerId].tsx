import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import AdminHeader from '../../../components/admin/AdminHeader';
import colors from '../../../constants/colors';
import spacing from '../../../constants/spacing';
import { mockCustomerList } from '../../../services/mockData';

export default function AdminCustomerDetailScreen() {
  const params = useLocalSearchParams<{ customerId: string }>();
  const customer = mockCustomerList.find((item) => item.id === params.customerId) ?? mockCustomerList[0];

  return (
    <SafeAreaView style={styles.safeArea}>
      <AdminHeader title={customer.name} subtitle="Customer overview" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{customer.phone}</Text>
          <Text style={styles.label}>Orders</Text>
          <Text style={styles.value}>{customer.orderCount}</Text>
          <Text style={styles.label}>Total spending</Text>
          <Text style={styles.value}>KSh {customer.totalSpent}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xxl },
  card: { backgroundColor: colors.backgroundAlt, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: spacing.lg },
  label: { color: colors.text, fontWeight: '700', marginTop: spacing.md },
  value: { color: colors.textMuted, marginTop: spacing.xs },
});
