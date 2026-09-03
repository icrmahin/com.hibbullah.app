import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Header from '../../components/common/Header';
import StatusBadge from '../../components/common/StatusBadge';
import colors from '../../constants/colors';
import spacing from '../../constants/spacing';
import typography from '../../constants/typography';
import { mockDeliveryCycle } from '../../services/mockData';
import { formatCurrency } from '../../utils/currency';
import { formatDateTime } from '../../utils/date';

export default function DeliveryCycleScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Delivery cycle" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Active order cycle</Text>
          <StatusBadge label={mockDeliveryCycle.status} tone={mockDeliveryCycle.status === 'PENDING' ? 'warning' : 'info'} />
          <Text style={styles.meta}>Start: {formatDateTime(mockDeliveryCycle.startedAt)}</Text>
          <Text style={styles.meta}>Closes: {formatDateTime(mockDeliveryCycle.closesAt)}</Text>
          <Text style={styles.total}>Estimated total: {formatCurrency(mockDeliveryCycle.estimatedTotal)}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Products in cycle</Text>
          {mockDeliveryCycle.products.map((product) => (
            <View key={product.id} style={styles.row}>
              <Text style={styles.itemName}>{product.name}</Text>
              <Text style={styles.itemPrice}>{formatCurrency(product.price)}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xxl },
  card: { backgroundColor: colors.backgroundAlt, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: spacing.lg },
  title: { color: colors.text, fontSize: typography.h3, fontWeight: '700', marginBottom: spacing.md },
  meta: { color: colors.textMuted, marginTop: spacing.sm },
  total: { marginTop: spacing.md, color: colors.text, fontWeight: '700' },
  sectionTitle: { color: colors.text, fontSize: typography.h3, fontWeight: '700', marginBottom: spacing.md },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  itemName: { color: colors.text, flex: 1 },
  itemPrice: { color: colors.text },
});
