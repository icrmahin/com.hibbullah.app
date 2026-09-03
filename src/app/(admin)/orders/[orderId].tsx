import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import AdminHeader from '../../../components/admin/AdminHeader';
import Button from '../../../components/common/Button';
import StatusBadge from '../../../components/common/StatusBadge';
import colors from '../../../constants/colors';
import spacing from '../../../constants/spacing';
import typography from '../../../constants/typography';
import { mockOrders } from '../../../services/mockData';
import { formatCurrency } from '../../../utils/currency';

export default function AdminOrderDetailScreen() {
  const params = useLocalSearchParams<{ orderId: string }>();
  const order = mockOrders.find((item) => item.id === params.orderId) ?? mockOrders[0];

  return (
    <SafeAreaView style={styles.safeArea}>
      <AdminHeader title={order.orderNumber} subtitle="Review order details" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.customer}>{order.customerName}</Text>
          <StatusBadge label={order.status} tone={order.status === 'PENDING' ? 'warning' : order.status === 'DELIVERED' ? 'success' : 'info'} />
          <Text style={styles.meta}>Total: {formatCurrency(order.total)}</Text>
          <Text style={styles.meta}>Address: {order.address}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Products</Text>
          {order.items.map((item) => (
            <View key={item.id} style={styles.row}>
              <Text style={styles.itemName}>{item.productName}</Text>
              <Text style={styles.itemMeta}>{item.quantity} × {formatCurrency(item.unitPrice)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.actions}>
          <Button title="Confirm order" onPress={() => router.back()} fullWidth />
          <Button title="Cancel order" variant="secondary" onPress={() => router.back()} fullWidth />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xxl },
  card: { backgroundColor: colors.backgroundAlt, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: spacing.lg },
  customer: { color: colors.text, fontSize: typography.h3, fontWeight: '700', marginBottom: spacing.sm },
  meta: { color: colors.textMuted, marginTop: spacing.sm },
  sectionTitle: { color: colors.text, fontSize: typography.h3, fontWeight: '700', marginBottom: spacing.md },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  itemName: { color: colors.text, flex: 1 },
  itemMeta: { color: colors.textMuted },
  actions: { gap: spacing.md },
});
