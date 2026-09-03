import { router } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import AdminHeader from "../../../components/admin/AdminHeader";
import Button from "../../../components/common/Button";
import LoadingState from "../../../components/common/LoadingState";
import colors from "../../../constants/colors";
import spacing from "../../../constants/spacing";
import { getInventory } from "../../../services/admin/inventoryService";
import type { InventoryItem } from "../../../types/inventory";

export default function AdminInventoryScreen() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInventory().then((result) => {
      setItems(result);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingState label="Loading inventory" />;

  return (
    <SafeAreaView style={styles.safeArea}>
      <AdminHeader
        title="Inventory"
        subtitle="Stock overview"
        action={
          <Button
            title="Adjust"
            onPress={() => router.push("/(admin)/inventory/adjustment")}
          />
        }
      />
      <ScrollView contentContainerStyle={styles.container}>
        {items.map((item) => (
          <View key={item.id} style={styles.row}>
            <View>
              <Text style={styles.name}>{item.productName}</Text>
              <Text style={styles.meta}>{item.batchNumber}</Text>
            </View>
            <Text style={styles.qty}>{item.quantity}</Text>
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.backgroundAlt,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  name: { color: colors.text, fontWeight: "700" },
  meta: { color: colors.textMuted, fontSize: 12 },
  qty: { color: colors.primary, fontWeight: "700" },
});
