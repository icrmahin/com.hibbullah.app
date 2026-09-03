import { router } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import AdminHeader from "../../../components/admin/AdminHeader";
import Button from "../../../components/common/Button";
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
        {filtered.map((product) => (
          <View key={product.id} style={styles.row}>
            <View style={styles.image} />
            <View style={styles.textBlock}>
              <Text style={styles.name}>{product.name}</Text>
              <Text style={styles.meta}>{product.stock} in stock</Text>
            </View>
            <Text
              style={styles.link}
              onPress={() =>
                router.push({
                  pathname: "/(admin)/products/[productId]",
                  params: { productId: product.id },
                })
              }
            >
              Edit
            </Text>
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
    alignItems: "center",
    backgroundColor: colors.backgroundAlt,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  image: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: colors.primarySoft,
  },
  textBlock: { flex: 1, marginLeft: spacing.md },
  name: { color: colors.text, fontWeight: "700" },
  meta: { color: colors.textMuted, fontSize: 12 },
  link: { color: colors.primary, fontWeight: "700" },
});
