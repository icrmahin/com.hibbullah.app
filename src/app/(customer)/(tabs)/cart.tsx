import { router } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Button from "../../../components/common/Button";
import Header from "../../../components/common/Header";
import LoadingState from "../../../components/common/LoadingState";
import colors from "../../../constants/colors";
import spacing from "../../../constants/spacing";
import typography from "../../../constants/typography";
import { useCart } from "../../../hooks/useCart";
import { formatCurrency } from "../../../utils/currency";

export default function CustomerCartScreen() {
  const { items, summary, loading } = useCart();

  if (loading) return <LoadingState label="Loading your cart" />;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Cart" subtitle="Review and checkout your items" />
      <ScrollView contentContainerStyle={styles.container}>
        {items.length === 0 ? (
          <Text style={styles.empty}>Your cart is empty.</Text>
        ) : (
          items.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <View style={styles.image} />
              <View style={styles.itemInfo}>
                <Text style={styles.name}>{item.product.name}</Text>
                <Text style={styles.meta}>
                  {item.quantity} x {formatCurrency(item.product.price)}
                </Text>
              </View>
              <Text style={styles.price}>
                {formatCurrency(item.product.price * item.quantity)}
              </Text>
            </View>
          ))
        )}

        <View style={styles.summaryBox}>
          <View style={styles.summaryRow}>
            <Text>Subtotal</Text>
            <Text>{formatCurrency(summary.subtotal)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Discount</Text>
            <Text>-{formatCurrency(summary.discount)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Delivery fee</Text>
            <Text>{formatCurrency(summary.deliveryFee)}</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalText}>
              {formatCurrency(summary.total)}
            </Text>
          </View>
        </View>

        <View style={styles.actions}>
          <Button
            title="Continue shopping"
            variant="secondary"
            onPress={() => router.push("/(customer)/(tabs)/products")}
            fullWidth
          />
          <Button
            title="Proceed to checkout"
            onPress={() => router.push("/(customer)/checkout")}
            fullWidth
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    gap: spacing.lg,
  },
  empty: { color: colors.textMuted, fontSize: typography.bodySmall },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.backgroundAlt,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  image: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: colors.primarySoft,
  },
  itemInfo: { flex: 1, marginLeft: spacing.md },
  name: { color: colors.text, fontWeight: "700" },
  meta: { color: colors.textMuted, fontSize: typography.caption },
  price: { color: colors.text, fontWeight: "700" },
  summaryBox: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  totalRow: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  totalText: { color: colors.text, fontWeight: "800" },
  actions: { gap: spacing.md },
});
