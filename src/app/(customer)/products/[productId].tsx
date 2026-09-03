import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../../components/common/Button";
import EmptyState from "../../../components/common/EmptyState";
import Header from "../../../components/common/Header";
import StatusBadge from "../../../components/common/StatusBadge";
import ProductImage from "../../../components/products/ProductImage";
import colors from "../../../constants/colors";
import spacing from "../../../constants/spacing";
import typography from "../../../constants/typography";
import { useCart } from "../../../hooks/useCart";
import {
  mockCategories,
  mockManufacturers,
  mockProducts,
} from "../../../services/mockData";
import { formatCurrency } from "../../../utils/currency";
import { formatDate } from "../../../utils/date";
import { normalizeError } from "../../../utils/errorHandling";

export default function ProductDetailScreen() {
  const params = useLocalSearchParams<{ productId: string }>();
  const product = useMemo(
    () => mockProducts.find((item) => item.id === params.productId),
    [params.productId],
  );
  const [quantity, setQuantity] = useState(1);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const { addItem } = useCart();

  if (!product) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Header title="Product details" onBack={() => router.back()} />
        <EmptyState
          title="Product not found"
          message="This medicine is no longer available."
          actionLabel="Browse products"
          onAction={() => router.replace("/(customer)/(tabs)/products")}
        />
      </SafeAreaView>
    );
  }

  const handleAddToCart = async () => {
    setAdding(true);
    setFeedback(null);
    try {
      await addItem(product.id, quantity);
      setFeedback(`${product.name} added to your cart.`);
    } catch (error) {
      setFeedback(normalizeError(error).message);
    } finally {
      setAdding(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Product details" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.container}>
        <ProductImage
          uri={product.image}
          recyclingKey={product.id}
          style={styles.image}
        />
        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.generic}>{product.genericName}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatCurrency(product.price)}</Text>
          {product.originalPrice ? (
            <Text style={styles.original}>
              {formatCurrency(product.originalPrice)}
            </Text>
          ) : null}
        </View>
        <View style={styles.metaRow}>
          <StatusBadge
            label={product.stock > 0 ? "In stock" : "Out of stock"}
            tone={product.stock > 0 ? "success" : "danger"}
          />
          {product.discountPercent ? (
            <StatusBadge
              label={`${product.discountPercent}% off`}
              tone="info"
            />
          ) : null}
        </View>
        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.infoBlock}>
          <Text style={styles.infoTitle}>Product details</Text>
          <Text style={styles.infoText}>
            Manufacturer:{" "}
            {mockManufacturers.find(
              (item) => item.id === product.manufacturerId,
            )?.name ?? "Not specified"}
          </Text>
          <Text style={styles.infoText}>
            Category:{" "}
            {mockCategories.find((item) => item.id === product.categoryId)
              ?.name ?? "Not specified"}
          </Text>
          <Text style={styles.infoText}>Batch: {product.batchNumber}</Text>
          <Text style={styles.infoText}>
            Expiry: {formatDate(product.expiryDate ?? new Date())}
          </Text>
        </View>

        <View style={styles.quantityRow}>
          <Text style={styles.qtyLabel}>Quantity</Text>
          <View style={styles.qtySelector}>
            <Text
              style={styles.qtyAction}
              onPress={() => setQuantity((value) => Math.max(1, value - 1))}
            >
              −
            </Text>
            <Text style={styles.qtyValue}>{quantity}</Text>
            <Text
              style={styles.qtyAction}
              onPress={() => setQuantity((value) => value + 1)}
            >
              +
            </Text>
          </View>
        </View>

        {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}
        <Button
          title={product.stock > 0 ? "Add to cart" : "Out of stock"}
          onPress={handleAddToCart}
          loading={adding}
          disabled={product.stock === 0}
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
    paddingBottom: spacing.xxl,
    gap: spacing.lg,
  },
  image: {
    width: "100%",
    height: 220,
    backgroundColor: colors.primarySoft,
    borderRadius: 18,
  },
  brand: {
    color: colors.textMuted,
    fontSize: typography.caption,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  name: { color: colors.text, fontSize: typography.title, fontWeight: "800" },
  generic: { color: colors.textMuted, fontSize: typography.bodySmall },
  priceRow: { flexDirection: "row", alignItems: "baseline", gap: spacing.sm },
  price: { color: colors.text, fontSize: typography.title, fontWeight: "800" },
  original: { color: colors.textMuted, textDecorationLine: "line-through" },
  metaRow: { flexDirection: "row", gap: spacing.sm, flexWrap: "wrap" },
  description: { color: colors.textMuted, lineHeight: 22 },
  infoBlock: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  infoTitle: {
    color: colors.text,
    fontWeight: "700",
    marginBottom: spacing.sm,
  },
  infoText: { color: colors.textMuted, marginBottom: spacing.xs },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  qtyLabel: { color: colors.text, fontWeight: "700" },
  qtySelector: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  qtyAction: { color: colors.primary, fontSize: 24, fontWeight: "700" },
  qtyValue: { color: colors.text, fontWeight: "700" },
  feedback: {
    color: colors.success,
    fontSize: typography.bodySmall,
    textAlign: "center",
  },
});
