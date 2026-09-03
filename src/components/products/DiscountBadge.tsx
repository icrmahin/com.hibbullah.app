import { StyleSheet, Text } from "react-native";
import colors from "../../constants/colors";
import sizes from "../../constants/sizes";
import spacing from "../../constants/spacing";
import typography from "../../constants/typography";

export default function DiscountBadge({ percent }: { percent: number }) {
  return <Text style={styles.badge}>-{percent}%</Text>;
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: colors.goldSoft,
    color: colors.gold,
    borderRadius: sizes.pill,
    overflow: "hidden",
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    fontSize: typography.caption,
    fontWeight: "600",
  },
});
