import { Pressable, StyleSheet, Text } from "react-native";
import colors from "../../constants/colors";
import sizes from "../../constants/sizes";
import spacing from "../../constants/spacing";
import typography from "../../constants/typography";
import type { Category } from "../../types/category";

export default function CategoryCard({
  category,
  onPress,
}: {
  category: Category;
  onPress?: () => void;
}) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.name}>{category.name}</Text>
      <Text style={styles.meta}>{category.productCount ?? 0} products</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: sizes.cardRadius,
    borderWidth: 1,
    borderColor: colors.hairline,
    padding: spacing.lg,
  },
  name: { color: colors.text, fontSize: typography.body, fontWeight: "600" },
  meta: { color: colors.textMuted, fontSize: typography.caption, marginTop: 4 },
});
