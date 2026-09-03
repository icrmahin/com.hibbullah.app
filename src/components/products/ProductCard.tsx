import { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../../constants/colors";
import sizes from "../../constants/sizes";
import spacing from "../../constants/spacing";
import typography from "../../constants/typography";
import type { Product } from "../../types/product";
import DiscountBadge from "./DiscountBadge";
import ProductImage from "./ProductImage";
import ProductPrice from "./ProductPrice";

type ProductCardProps = {
  product: Product;
  compact?: boolean;
  onPress?: (product: Product) => void;
};

function ProductCard({ product, compact, onPress }: ProductCardProps) {
  return (
    <Pressable
      style={[styles.card, compact && styles.compact]}
      onPress={() => onPress?.(product)}
    >
      <ProductImage uri={product.image} recyclingKey={product.id} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.generic} numberOfLines={1}>
          {product.genericName}
        </Text>
        <ProductPrice price={product.price} originalPrice={product.originalPrice} />
        <View style={styles.footer}>
          <Text style={[styles.stock, product.stock > 0 ? styles.inStock : styles.outOfStock]}>
            {product.stock > 0 ? "In stock" : "Out of stock"}
          </Text>
          {product.discountPercent ? <DiscountBadge percent={product.discountPercent} /> : null}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: sizes.cardRadius,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.hairline,
    marginBottom: spacing.lg,
  },
  compact: { marginBottom: 0 },
  image: { height: 132 },
  content: { padding: spacing.lg },
  brand: {
    color: colors.textMuted,
    fontSize: typography.caption,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  name: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: "600",
    letterSpacing: typography.letterSpacingBody,
    marginTop: spacing.xs,
  },
  generic: { color: colors.textMuted, fontSize: typography.caption, marginTop: 2 },
  footer: {
    marginTop: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stock: { fontSize: typography.caption, fontWeight: "600" },
  inStock: { color: colors.success },
  outOfStock: { color: colors.danger },
});

export default memo(ProductCard);
