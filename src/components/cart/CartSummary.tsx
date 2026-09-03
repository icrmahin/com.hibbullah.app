import { StyleSheet, Text, View } from "react-native";
import colors from "../../constants/colors";
import sizes from "../../constants/sizes";
import spacing from "../../constants/spacing";
import type { CartSummary } from "../../types/cart";
import { formatCurrency } from "../../utils/currency";

export default function CartSummary({ summary }: { summary: CartSummary }) {
  return (
    <View style={styles.box}>
      <Row label="Subtotal" value={formatCurrency(summary.subtotal)} />
      <Row label="Discount" value={`-${formatCurrency(summary.discount)}`} />
      <Row label="Delivery" value={formatCurrency(summary.deliveryFee)} />
      <View style={styles.totalRow}>
        <Text style={styles.total}>Total</Text>
        <Text style={styles.total}>{formatCurrency(summary.total)}</Text>
      </View>
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: sizes.cardRadius,
    borderWidth: 1,
    borderColor: colors.hairline,
    padding: spacing.lg,
  },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: spacing.sm },
  label: { color: colors.textMuted },
  value: { color: colors.text },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.hairline,
  },
  total: { color: colors.text, fontWeight: "700" },
});
