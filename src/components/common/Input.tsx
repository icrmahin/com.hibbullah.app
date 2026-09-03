import { StyleSheet, Text, TextInput, View, type TextInputProps } from "react-native";
import colors from "../../constants/colors";
import sizes from "../../constants/sizes";
import spacing from "../../constants/spacing";
import typography from "../../constants/typography";

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
};

export default function Input({ label, error, ...props }: InputProps) {
  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        {...props}
        style={[styles.input, !!error && styles.inputError, props.multiline && styles.textArea]}
        placeholderTextColor={colors.textMuted}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: spacing.xs },
  label: {
    color: colors.text,
    fontSize: typography.bodySmall,
    fontWeight: "600",
    letterSpacing: typography.letterSpacingBody,
  },
  input: {
    minHeight: sizes.inputHeight,
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: sizes.pill,
    backgroundColor: colors.backgroundAlt,
    paddingHorizontal: spacing.lg,
    color: colors.text,
    fontSize: typography.body,
  },
  textArea: {
    minHeight: 120,
    borderRadius: sizes.cardRadius,
    textAlignVertical: "top",
    paddingTop: spacing.lg,
  },
  inputError: { borderColor: colors.danger },
  error: { color: colors.danger, fontSize: typography.caption },
});
