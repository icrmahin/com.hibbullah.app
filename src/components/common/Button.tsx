import { Pressable, StyleSheet, Text, type PressableProps, type ViewStyle } from "react-native";
import colors from "../../constants/colors";
import sizes from "../../constants/sizes";
import spacing from "../../constants/spacing";
import typography from "../../constants/typography";

type ButtonProps = PressableProps & {
  title: string;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  fullWidth?: boolean;
  loading?: boolean;
  style?: ViewStyle;
};

export default function Button({
  title,
  variant = "primary",
  fullWidth = false,
  loading = false,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const palette = {
    primary: { background: colors.primary, text: colors.white },
    secondary: { background: colors.backgroundAlt, text: colors.primary, border: colors.primary },
    danger: { background: colors.redSoft, text: colors.danger },
    ghost: { background: colors.primarySoft, text: colors.primary },
  }[variant];

  return (
    <Pressable
      {...props}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: palette.background },
        "border" in palette && palette.border
          ? { borderWidth: 1, borderColor: palette.border }
          : null,
        fullWidth && styles.fullWidth,
        pressed && styles.pressed,
        (disabled || loading) && styles.disabled,
        style,
      ]}
    >
      <Text style={[styles.text, { color: palette.text }]}>
        {loading ? "Please wait…" : title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: sizes.buttonHeight,
    paddingHorizontal: spacing.xl,
    paddingVertical: 11,
    borderRadius: sizes.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  fullWidth: { width: "100%" },
  pressed: { transform: [{ scale: 0.95 }], opacity: 0.92 },
  disabled: { opacity: 0.5 },
  text: {
    fontSize: typography.body,
    fontWeight: "600",
    letterSpacing: typography.letterSpacingBody,
  },
});
