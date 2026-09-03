import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/common/Header";
import SearchBar from "../../../components/common/SearchBar";
import ProductCard from "../../../components/products/ProductCard";
import colors from "../../../constants/colors";
import spacing from "../../../constants/spacing";
import typography from "../../../constants/typography";
import {
  mockCategories,
  mockManufacturers,
  mockProducts,
} from "../../../services/mockData";

export default function CustomerProductsScreen() {
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [manufacturerId, setManufacturerId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesQuery =
        !query ||
        [product.name, product.brand, product.genericName]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase());
      const matchesCategory = !categoryId || product.categoryId === categoryId;
      const matchesManufacturer =
        !manufacturerId || product.manufacturerId === manufacturerId;
      return matchesQuery && matchesCategory && matchesManufacturer;
    });
  }, [categoryId, manufacturerId, query]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Products" subtitle="Browse by category and manufacturer" />
      <FlatList
        data={filteredProducts}
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
          <View>
            <SearchBar
              value={query}
              onChangeText={setQuery}
              placeholder="Search products"
            />

            <Text style={styles.label}>Categories</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipsRow}
            >
              <Text
                style={[styles.chip, !categoryId && styles.chipSelected]}
                onPress={() => setCategoryId(null)}
              >
                All
              </Text>
              {mockCategories.map((category) => (
                <Text
                  key={category.id}
                  style={[
                    styles.chip,
                    categoryId === category.id && styles.chipSelected,
                  ]}
                  onPress={() => setCategoryId(category.id)}
                >
                  {category.name}
                </Text>
              ))}
            </ScrollView>

            <Text style={styles.label}>Manufacturers</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipsRow}
            >
              <Text
                style={[styles.chip, !manufacturerId && styles.chipSelected]}
                onPress={() => setManufacturerId(null)}
              >
                All
              </Text>
              {mockManufacturers.map((manufacturer) => (
                <Text
                  key={manufacturer.id}
                  style={[
                    styles.chip,
                    manufacturerId === manufacturer.id && styles.chipSelected,
                  ]}
                  onPress={() => setManufacturerId(manufacturer.id)}
                >
                  {manufacturer.name}
                </Text>
              ))}
            </ScrollView>

            <Text style={styles.resultText}>
              {filteredProducts.length} products
            </Text>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.resultText}>No products found</Text>
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
  label: {
    color: colors.text,
    fontWeight: "700",
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },
  chipsRow: { paddingVertical: spacing.sm, gap: spacing.sm },
  chip: {
    backgroundColor: colors.backgroundAlt,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: colors.text,
    marginRight: spacing.sm,
  },
  chipSelected: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
    color: colors.primary,
  },
  resultText: {
    color: colors.textMuted,
    fontSize: typography.caption,
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
});
