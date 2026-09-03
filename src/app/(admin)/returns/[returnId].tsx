import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AdminHeader from "../../../components/admin/AdminHeader";
import colors from "../../../constants/colors";
import spacing from "../../../constants/spacing";
import { mockReturns } from "../../../services/mockData";

export default function AdminReturnDetailScreen() {
  const params = useLocalSearchParams<{ returnId: string }>();
  const item =
    mockReturns.find((entry) => entry.id === params.returnId) ?? mockReturns[0];

  return (
    <SafeAreaView style={styles.safeArea}>
      <AdminHeader title={item.id} subtitle="Return request" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.label}>Order</Text>
          <Text style={styles.value}>{item.orderId}</Text>
          <Text style={styles.label}>Product</Text>
          <Text style={styles.value}>{item.productName}</Text>
          <Text style={styles.label}>Reason</Text>
          <Text style={styles.value}>{item.reason}</Text>
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
  label: { color: colors.text, fontWeight: "700", marginTop: spacing.md },
  value: { color: colors.textMuted, marginTop: spacing.xs },
});
