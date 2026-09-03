import { Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../../constants/colors";
import sizes from "../../constants/sizes";
import spacing from "../../constants/spacing";
import typography from "../../constants/typography";
import type { Product } from "../../types/product";
import ProductImage from "../products/ProductImage";
import ProductPrice from "../products/ProductPrice";
import StatusBadge from "../common/StatusBadge";

export default function AdminProductCard({ product, onPress }: { product: Product; onPress?: (product: Product) => void }) {
	const available = product.isActive && product.stock > 0;
	return (
		<Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]} onPress={() => onPress?.(product)} accessibilityRole="button" accessibilityLabel={`Edit ${product.name}`}>
			<ProductImage uri={product.image} recyclingKey={product.id} style={styles.image} />
			<View style={styles.content}>
				<View style={styles.topRow}>
					<Text style={styles.name} numberOfLines={2}>{product.name}</Text>
					<StatusBadge label={!product.isActive ? "Inactive" : product.stock === 0 ? "Out of stock" : product.stock < 10 ? "Low stock" : "Active"} tone={!product.isActive || product.stock === 0 ? "danger" : product.stock < 10 ? "warning" : "success"} />
				</View>
				<Text style={styles.meta}>{product.brand} · {product.genericName}</Text>
				<View style={styles.footer}>
					<ProductPrice price={product.price} originalPrice={product.originalPrice} />
					<Text style={[styles.stock, !available && styles.unavailable]}>{product.stock} units</Text>
				</View>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	card: { flexDirection: "row", backgroundColor: colors.backgroundAlt, borderRadius: sizes.cardRadius, borderWidth: 1, borderColor: colors.border, overflow: "hidden" },
	pressed: { opacity: 0.78 },
	image: { width: 88, height: 104 },
	content: { flex: 1, padding: spacing.md, gap: spacing.xs },
	topRow: { flexDirection: "row", alignItems: "flex-start", gap: spacing.sm },
	name: { flex: 1, color: colors.text, fontSize: typography.bodySmall, fontWeight: "700" },
	meta: { color: colors.textMuted, fontSize: typography.caption },
	footer: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", marginTop: "auto" },
	stock: { color: colors.success, fontSize: typography.caption, fontWeight: "600" },
	unavailable: { color: colors.danger },
});
