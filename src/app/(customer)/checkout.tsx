import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";
import Header from "../../components/common/Header";
import Input from "../../components/common/Input";
import LoadingState from "../../components/common/LoadingState";
import colors from "../../constants/colors";
import spacing from "../../constants/spacing";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { submitOrder } from "../../services/orderService";
import { formatCurrency } from "../../utils/currency";
import { normalizeError } from "../../utils/errorHandling";

export default function CheckoutScreen() {
  const { items, summary, loading } = useCart();
  const { user } = useAuth();
  const [address, setAddress] = useState("Nairobi West, Mfangano Street");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!items.length || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      await submitOrder({
        customerId: user?.id ?? "user-001",
        customerName: user?.name ?? "Demo customer",
        address: address.trim(),
      });
      setSuccess(true);
    } catch (nextError) {
      setError(normalizeError(nextError).message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingState label="Loading checkout" />;
  if (!items.length) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Header title="Checkout" onBack={() => router.back()} />
        <EmptyState
          title="Your cart is empty"
          message="Add a medicine before checking out."
          actionLabel="Browse products"
          onAction={() => router.replace("/(customer)/(tabs)/products")}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Checkout" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.container}>
        <Input
          label="Customer name"
          value={user?.name ?? "Demo customer"}
          editable={false}
        />
        <Input
          label="Delivery address"
          value={address}
          onChangeText={setAddress}
        />

        <View style={styles.summaryBox}>
          <Text style={styles.sectionTitle}>Order summary</Text>
          {items.map((item) => (
            <View key={item.id} style={styles.row}>
              <Text>{item.product.name}</Text>
              <Text>
                {item.quantity} x {formatCurrency(item.product.price)}
              </Text>
            </View>
          ))}
          <View style={styles.row}>
            <Text>Subtotal</Text>
            <Text>{formatCurrency(summary.subtotal)}</Text>
          </View>
          <View style={styles.row}>
            <Text>Discount</Text>
            <Text>-{formatCurrency(summary.discount)}</Text>
          </View>
          <View style={styles.row}>
            <Text>Delivery</Text>
            <Text>{formatCurrency(summary.deliveryFee)}</Text>
          </View>
          <View style={[styles.row, styles.total]}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalText}>
              {formatCurrency(summary.total)}
            </Text>
          </View>
        </View>

        <View style={styles.paymentBox}>
          <Text style={styles.sectionTitle}>Payment</Text>
          <Text style={styles.paymentMethod}>Cash on Delivery</Text>
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}
        {success ? (
          <Text style={styles.success}>
            Order submitted and added to your delivery cycle.
          </Text>
        ) : null}
        <Button
          title={success ? "View delivery cycle" : "Submit order"}
          onPress={
            success
              ? () => router.replace("/(customer)/delivery-cycle")
              : handleSubmit
          }
          loading={submitting}
          disabled={success || !address.trim()}
          fullWidth
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: {
    padding: spacing.lg,
    gap: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  summaryBox: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  sectionTitle: {
    color: colors.text,
    fontWeight: "700",
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  total: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
    marginTop: spacing.md,
  },
  totalText: { color: colors.text, fontWeight: "800" },
  paymentBox: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  paymentMethod: { color: colors.textMuted },
  error: { color: colors.danger, fontSize: 14, textAlign: "center" },
  success: { color: colors.success, fontSize: 14, textAlign: "center" },
});
