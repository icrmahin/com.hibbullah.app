import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AdminHeader from "../../../components/admin/AdminHeader";
import colors from "../../../constants/colors";
import spacing from "../../../constants/spacing";

export default function AdminInventoryReportScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <AdminHeader title="Inventory report" subtitle="Stock movement summary" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.label}>Low-stock items</Text>
          <Text style={styles.value}>3 products</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { padding: spacing.lg, gap: spacing.md },
  card: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  label: { color: colors.textMuted },
  value: {
    color: colors.text,
    fontWeight: "700",
    marginTop: spacing.xs,
    fontSize: 20,
  },
});
