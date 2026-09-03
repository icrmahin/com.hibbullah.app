import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AdminHeader from "../../../components/admin/AdminHeader";
import colors from "../../../constants/colors";
import spacing from "../../../constants/spacing";
import { mockInventory } from "../../../services/mockData";

export default function InventoryBatchesScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <AdminHeader title="Batches" subtitle="Track each batch independently" />
      <ScrollView contentContainerStyle={styles.container}>
        {mockInventory.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.heading}>{item.batchNumber}</Text>
            <Text style={styles.meta}>{item.productName}</Text>
            <Text style={styles.meta}>Quantity: {item.quantity}</Text>
          </View>
        ))}
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
  },
  heading: { color: colors.text, fontWeight: "700" },
  meta: { color: colors.textMuted, marginTop: spacing.xs },
});
