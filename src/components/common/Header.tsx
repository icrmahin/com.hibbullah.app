import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "../../constants/colors";
import sizes from "../../constants/sizes";
import spacing from "../../constants/spacing";
import typography from "../../constants/typography";

type HeaderProps = {
  title: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
  onBack?: () => void;
};

export default function Header({
  title,
  subtitle,
  rightAction,
  onBack,
}: HeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.md }]}>
      <View style={styles.row}>
        {onBack ? (
          <Pressable
            onPress={onBack}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            hitSlop={8}
          >
            <Text style={styles.backText}>‹</Text>
          </Pressable>
        ) : null}
        <View style={styles.titleArea}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          ) : null}
        </View>
        {rightAction ? <View style={styles.action}>{rightAction}</View> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundAlt,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    minHeight: 44,
  },
  backButton: {
    width: sizes.touch,
    height: sizes.touch,
    borderRadius: sizes.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  backText: {
    fontSize: 32,
    color: colors.primary,
    lineHeight: 34,
    marginTop: -2,
  },
  titleArea: { flex: 1 },
  title: {
    color: colors.text,
    fontSize: typography.h3,
    fontWeight: "600",
    letterSpacing: typography.letterSpacingBody,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: typography.caption,
    marginTop: 2,
  },
  action: { alignItems: "center", justifyContent: "center" },
});
