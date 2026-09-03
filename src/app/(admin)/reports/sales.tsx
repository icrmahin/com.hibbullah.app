import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AdminHeader from "../../../components/admin/AdminHeader";
import colors from "../../../constants/colors";
import spacing from "../../../constants/spacing";

export default function AdminSalesReportScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <AdminHeader title="Sales report" subtitle="Revenue overview" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.label}>Revenue</Text>
          <Text style={styles.value}>KSh 128,400</Text>
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
