import { Pressable, StyleSheet, Text } from "react-native";
import colors from "../../constants/colors";
import sizes from "../../constants/sizes";
import spacing from "../../constants/spacing";
import typography from "../../constants/typography";

export default function FilterChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, selected && styles.selected]}>
      <Text style={[styles.text, selected && styles.selectedText]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: colors.backgroundAlt,
    borderColor: colors.hairline,
    borderWidth: 1,
    borderRadius: sizes.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 36,
    justifyContent: "center",
  },
  selected: { backgroundColor: colors.primarySoft, borderColor: colors.primary },
  text: { color: colors.text, fontWeight: "600", fontSize: typography.bodySmall },
  selectedText: { color: colors.primary },
});
