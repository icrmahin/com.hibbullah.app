import { useState } from "react";
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
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        {...props}
        onFocus={(event) => {
          setFocused(true);
          props.onFocus?.(event);
        }}
        onBlur={(event) => {
          setFocused(false);
          props.onBlur?.(event);
        }}
        style={[styles.input, focused && styles.inputFocused, !!error && styles.inputError, props.multiline && styles.textArea, props.editable === false && styles.inputDisabled]}
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
    borderRadius: sizes.borderRadius,
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
  inputFocused: { borderColor: colors.primary, borderWidth: 2 },
  inputDisabled: { backgroundColor: colors.background, color: colors.textMuted },
  error: { color: colors.danger, fontSize: typography.caption },
});
