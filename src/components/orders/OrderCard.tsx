import { Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../../constants/colors";
import spacing from "../../constants/spacing";
import typography from "../../constants/typography";
import type { Order } from "../../types/order";
import { formatCurrency } from "../../utils/currency";
import { formatDate } from "../../utils/date";
import OrderStatus from "./OrderStatus";

type OrderCardProps = {
  order: Order;
  onPress?: (order: Order) => void;
};

export default function OrderCard({ order, onPress }: OrderCardProps) {
  return (
    <Pressable style={styles.card} onPress={() => onPress?.(order)}>
      <View style={styles.headerRow}>
        <Text style={styles.orderNumber}>{order.orderNumber}</Text>
        <OrderStatus status={order.status} />
      </View>
      <Text style={styles.date}>{formatDate(order.createdAt)}</Text>
      <Text style={styles.items}>{order.items.length} item(s)</Text>
      <View style={styles.footer}>
        <Text style={styles.total}>{formatCurrency(order.total)}</Text>
        <Text style={styles.more}>View details</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  orderNumber: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: "700",
  },
  date: {
    color: colors.textMuted,
    fontSize: typography.bodySmall,
    marginTop: spacing.sm,
  },
  items: {
    color: colors.textMuted,
    fontSize: typography.bodySmall,
    marginTop: 2,
  },
  footer: {
    marginTop: spacing.lg,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  total: {
    color: colors.text,
    fontSize: typography.h3,
    fontWeight: "700",
  },
  more: {
    color: colors.primary,
    fontSize: typography.bodySmall,
    fontWeight: "600",
  },
});
