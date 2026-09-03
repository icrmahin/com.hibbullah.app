import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AdminHeader from "../../../components/admin/AdminHeader";
import AdminProductCard from "../../../components/admin/AdminProductCard";
import Button from "../../../components/common/Button";
import EmptyState from "../../../components/common/EmptyState";
import LoadingState from "../../../components/common/LoadingState";
import SearchBar from "../../../components/common/SearchBar";
import colors from "../../../constants/colors";
import spacing from "../../../constants/spacing";
import { getAdminProducts } from "../../../services/admin/adminProductService";
import type { Product } from "../../../types/product";

export default function AdminProductsScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getAdminProducts().then((result) => {
      setProducts(result);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingState label="Loading products" />;

  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <AdminHeader
        title="Products"
        subtitle="Manage catalog and stock"
        action={
          <Button
            title="Add"
            onPress={() => router.push("/(admin)/products/add")}
          />
        }
      />
      <ScrollView contentContainerStyle={styles.container}>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder="Search products"
        />
        {filtered.length === 0 ? (
          <EmptyState
            title="No products found"
            message="Try a different name or add a new product."
            actionLabel="Add product"
            onAction={() => router.push("/(admin)/products/add")}
          />
        ) : (
          filtered.map((product) => (
            <AdminProductCard
              key={product.id}
              product={product}
              onPress={(item) =>
                router.push({
                  pathname: "/(admin)/products/[productId]",
                  params: { productId: item.id },
                })
              }
            />
          ))
        )}
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
});
