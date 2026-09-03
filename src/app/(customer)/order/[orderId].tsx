import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import Header from '../../../components/common/Header';
import StatusBadge from '../../../components/common/StatusBadge';
import colors from '../../../constants/colors';
import spacing from '../../../constants/spacing';
import typography from '../../../constants/typography';
import { mockOrders } from '../../../services/mockData';
import { formatCurrency } from '../../../utils/currency';
import { formatDateTime } from '../../../utils/date';

export default function CustomerOrderDetailScreen() {
  const params = useLocalSearchParams<{ orderId: string }>();
  const order = useMemo(() => mockOrders.find((item) => item.id === params.orderId) ?? mockOrders[0], [params.orderId]);

  const tone = order.status === 'DELIVERED' ? 'success' : order.status === 'CANCELLED' ? 'danger' : order.status === 'PENDING' ? 'warning' : 'info';

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title={order.orderNumber} onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Order summary</Text>
          <StatusBadge label={order.status} tone={tone} />
          <Text style={styles.meta}>Placed {formatDateTime(order.createdAt)}</Text>
          <Text style={styles.meta}>Delivery address: {order.address}</Text>
          <Text style={styles.meta}>Payment: Cash on Delivery</Text>
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

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Timeline</Text>
          {order.timeline.map((step) => (
            <View key={`${step.label}-${step.time}`} style={styles.timelineRow}>
              <Text style={styles.timelineLabel}>{step.label}</Text>
              <Text style={styles.timelineTime}>{step.time}</Text>
              {step.note ? <Text style={styles.timelineNote}>{step.note}</Text> : null}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { padding: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.lg },
  card: { backgroundColor: colors.backgroundAlt, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: spacing.lg },
  title: { color: colors.text, fontSize: typography.h3, fontWeight: '700', marginBottom: spacing.md },
  meta: { color: colors.textMuted, marginTop: spacing.sm },
  sectionTitle: { color: colors.text, fontSize: typography.h3, fontWeight: '700', marginBottom: spacing.md },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  itemName: { color: colors.text, flex: 1 },
  itemMeta: { color: colors.textMuted },
  timelineRow: { marginBottom: spacing.md },
  timelineLabel: { color: colors.text, fontWeight: '700' },
  timelineTime: { color: colors.textMuted, fontSize: typography.caption },
  timelineNote: { color: colors.textMuted, marginTop: spacing.xs },
});
