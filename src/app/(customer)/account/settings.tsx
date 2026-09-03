import { router } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../../../components/common/Header";
import colors from "../../../constants/colors";
import spacing from "../../../constants/spacing";

export default function CustomerSettingsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Settings" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.label}>Notifications</Text>
          <Text style={styles.value}>Enabled</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>Delivery reminders</Text>
          <Text style={styles.value}>On</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>Language</Text>
          <Text style={styles.value}>English</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xxl,
  },
  card: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: { color: colors.text, fontWeight: "700" },
  value: { color: colors.textMuted },
});
