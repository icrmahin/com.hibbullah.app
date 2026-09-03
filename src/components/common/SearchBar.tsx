import { SymbolView } from "expo-symbols";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import colors from "../../constants/colors";
import sizes from "../../constants/sizes";
import spacing from "../../constants/spacing";
import typography from "../../constants/typography";

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onSubmit?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search products",
  onSubmit,
  onFocus,
  onBlur,
}: SearchBarProps) {
  return (
    <View style={styles.wrapper}>
      <SymbolView
        name={{ ios: "magnifyingglass", android: "search", web: "search" }}
        tintColor={colors.textMuted}
        size={18}
        style={styles.icon}
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        onSubmitEditing={onSubmit}
        onFocus={onFocus}
        onBlur={onBlur}
        returnKeyType="search"
        style={styles.input}
      />
      {value ? (
        <Pressable onPress={() => onChangeText("")} style={styles.clearButton}>
          <SymbolView
            name={{ ios: "xmark", android: "close", web: "close" }}
            tintColor={colors.primary}
            size={13}
          />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: colors.backgroundAlt,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.primaryDark,
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    paddingHorizontal: spacing.md,
    minHeight: 46,
  },
  icon: {
    fontSize: 18,
    color: colors.textMuted,
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: typography.bodySmall,
    paddingVertical: spacing.sm,
  },
  clearButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
});
