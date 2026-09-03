import { router } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/common/Header";
import SearchBar from "../../components/common/SearchBar";
import ProductCard from "../../components/products/ProductCard";
import colors from "../../constants/colors";
import spacing from "../../constants/spacing";
import { mockProducts } from "../../services/mockData";

export default function CustomerSearchScreen() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return mockProducts;
    const q = query.toLowerCase();
    return mockProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(q) ||
        product.brand.toLowerCase().includes(q) ||
        product.genericName.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Search" onBack={() => router.back()} />
      <FlatList
        data={results}
        contentContainerStyle={styles.container}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={(product) =>
              router.push({
                pathname: "/(customer)/products/[productId]",
                params: { productId: product.id },
              })
            }
          />
        )}
        ListHeaderComponent={
          <SearchBar
            value={query}
            onChangeText={setQuery}
            placeholder="Search by medicine, brand or generic"
          />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              No products matched your search.
            </Text>
          </View>
        }
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={5}
        removeClippedSubviews
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { padding: spacing.lg, paddingBottom: spacing.xxl },
  empty: { alignItems: "center", paddingVertical: spacing.xxl },
  emptyText: { color: colors.textMuted },
});
