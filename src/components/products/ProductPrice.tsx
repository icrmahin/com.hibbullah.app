import { StyleSheet, Text, View } from "react-native";
import colors from "../../constants/colors";
import spacing from "../../constants/spacing";
import typography from "../../constants/typography";
import { formatCurrency } from "../../utils/currency";

export default function ProductPrice({
  price,
  originalPrice,
}: {
  price: number;
  originalPrice?: number;
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.price}>{formatCurrency(price)}</Text>
      {originalPrice && originalPrice > price ? (
        <Text style={styles.original}>{formatCurrency(originalPrice)}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "baseline", gap: spacing.sm },
  price: { color: colors.text, fontSize: typography.h3, fontWeight: "600" },
  original: {
    color: colors.textMuted,
    fontSize: typography.caption,
    textDecorationLine: "line-through",
  },
});
