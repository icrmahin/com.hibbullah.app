import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminStatCard from "../../components/admin/AdminStatCard";
import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";
import LoadingState from "../../components/common/LoadingState";
import StatusBadge from "../../components/common/StatusBadge";
import colors from "../../constants/colors";
import spacing from "../../constants/spacing";
import typography from "../../constants/typography";
import { mockInventory, mockOrders } from "../../services/mockData";
import { formatCurrency } from "../../utils/currency";

export default function AdminDashboardScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingState label="Loading dashboard" />;

  const pendingOrders = mockOrders.filter(
    (order) => order.status === "PENDING",
  ).length;
  const todaySales = mockOrders.reduce((sum, order) => sum + order.total, 0);
  const lowStock = mockInventory.filter(
    (item) => item.status !== "healthy",
  ).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <AdminHeader
        title="Dashboard"
        subtitle="Operations overview"
        action={
          <Button
            title="Add product"
            onPress={() => router.push("/(admin)/products/add")}
          />
        }
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.grid}>
          <AdminStatCard
            label="Pending orders"
            value={pendingOrders}
            detail="Needs review"
            accent="gold"
          />
          <AdminStatCard
            label="Today sales"
            value={formatCurrency(todaySales)}
            detail="All demo orders"
            accent="green"
          />
          <AdminStatCard label="Active cycles" value={2} detail="In progress" />
          <AdminStatCard
            label="Low stock"
            value={lowStock}
            detail="Needs attention"
            accent="gold"
          />
        </View>

        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Recent orders</Text>
          {mockOrders.length === 0 ? (
            <EmptyState
              title="No recent orders"
              message="New customer orders will appear here."
            />
          ) : (
            mockOrders.map((order) => (
              <View key={order.id} style={styles.listRow}>
                <View>
                  <Text style={styles.listTitle}>{order.orderNumber}</Text>
                  <Text style={styles.listMeta}>{order.customerName}</Text>
                </View>
                <StatusBadge
                  label={order.status}
                  tone={
                    order.status === "DELIVERED"
                      ? "success"
                      : order.status === "PENDING"
                        ? "warning"
                        : "info"
                  }
                />
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: {
    padding: spacing.lg,
    gap: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  sectionBox: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: typography.h3,
    fontWeight: "700",
    marginBottom: spacing.md,
  },
  listRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  listTitle: { color: colors.text, fontWeight: "700" },
  listMeta: { color: colors.textMuted, fontSize: typography.caption },
});
