import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import AdminHeader from "../../../../components/admin/AdminHeader";
import Button from "../../../../components/common/Button";
import StatusBadge from "../../../../components/common/StatusBadge";
import colors from "../../../../constants/colors";
import spacing from "../../../../constants/spacing";
import typography from "../../../../constants/typography";
import { mockProducts } from "../../../../services/mockData";
import { formatCurrency } from "../../../../utils/currency";

export default function AdminProductDetailScreen() {
  const params = useLocalSearchParams<{ productId: string }>();
  const product =
    mockProducts.find((item) => item.id === params.productId) ??
    mockProducts[0];

  return (
    <SafeAreaView style={styles.safeArea}>
      <AdminHeader title={product.name} subtitle="Product overview" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.name}>{product.name}</Text>
          <View style={styles.metaRow}>
            <StatusBadge
              label={product.stock > 0 ? "Available" : "Out of stock"}
              tone={product.stock > 0 ? "success" : "danger"}
            />
            <StatusBadge
              label={product.isActive ? "Active" : "Inactive"}
              tone={product.isActive ? "info" : "neutral"}
            />
          </View>
          <Text style={styles.price}>{formatCurrency(product.price)}</Text>
          <Text style={styles.text}>{product.description}</Text>
        </View>

        <Button
          title="Edit product"
          onPress={() =>
            router.push({
              pathname: "/(admin)/products/[productId]/edit",
              params: { productId: product.id },
            })
          }
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
  card: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  brand: {
    color: colors.textMuted,
    fontSize: typography.caption,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  name: {
    color: colors.text,
    fontSize: typography.h2,
    fontWeight: "700",
    marginTop: spacing.xs,
  },
  metaRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  price: {
    color: colors.text,
    fontSize: typography.h3,
    fontWeight: "800",
    marginBottom: spacing.md,
  },
  text: { color: colors.textMuted },
});
