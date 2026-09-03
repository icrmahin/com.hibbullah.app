import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppLogo from "../../../components/common/AppLogo";
import ErrorState from "../../../components/common/ErrorState";
import LoadingState from "../../../components/common/LoadingState";
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
import type { Product } from "../../../types/product";

export default function CustomerHomeScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasProducts = mockProducts.length > 0;
      if (!hasProducts) {
        setError("No products found.");
      }
      setLoading(false);
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  const featured = useMemo(
    () => mockProducts.filter((product) => product.isFeatured),
    [],
  );
  const newProducts = useMemo(() => [...mockProducts].slice(0, 3), []);
  const discounted = useMemo(
    () => mockProducts.filter((product) => product.discountPercent),
    [],
  );
  const searchResults = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return mockProducts.slice(0, 4);
    return mockProducts
      .filter((product) =>
        [product.name, product.brand, product.genericName, product.description]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery),
      )
      .slice(0, 5);
  }, [query]);

  const openProduct = (product: Product) => {
    setSearchFocused(false);
    router.push({
      pathname: "/(customer)/products/[productId]",
      params: { productId: product.id },
    });
  };

  if (loading) return <LoadingState label="Loading your pharmacy" />;
  if (error) return <ErrorState message={error} />;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <View style={styles.brandRow}>
            <AppLogo size={38} />
            <Text style={styles.brandName}>Hibbullah</Text>
          </View>
          <Pressable
            style={styles.cartButton}
            onPress={() => router.push("/(customer)/(tabs)/cart")}
            accessibilityRole="button"
            accessibilityLabel="Open cart"
          >
            <SymbolView
              name={{
                ios: "cart.fill",
                android: "shopping_cart",
                web: "shopping_cart",
              }}
              tintColor={colors.primary}
              size={23}
            />
            <Text style={styles.cartCount}>2</Text>
          </Pressable>
        </View>

        <View style={styles.searchArea}>
          <SearchBar
            value={query}
            onChangeText={setQuery}
            onFocus={() => setSearchFocused(true)}
            placeholder="Search medicines"
          />
          {searchFocused ? (
            // Keep discovery contextual while the keyboard and home content stay in place.
            <View style={styles.searchPanel}>
              <Text style={styles.searchPanelTitle}>
                {query ? "Recommended matches" : "Popular medicines"}
              </Text>
              <FlatList
                data={searchResults}
                keyboardShouldPersistTaps="handled"
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <Pressable
                    style={styles.searchResult}
                    onPress={() => openProduct(item)}
                  >
                    <Text style={styles.searchResultName} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text style={styles.searchResultMeta} numberOfLines={1}>
                      {item.brand} · {item.genericName}
                    </Text>
                  </Pressable>
                )}
                ListEmptyComponent={
                  <Text style={styles.noResults}>No medicines found</Text>
                }
              />
            </View>
          ) : null}
        </View>

        <View style={styles.heroCard}>
          <Text style={styles.heroLabel}>Product of the day</Text>
          <Text style={styles.heroTitle}>{mockProducts[0].name}</Text>
          <Text style={styles.heroText}>
            {mockProducts[0].brand} · {mockProducts[0].genericName}
          </Text>
          <Text style={styles.heroPrice}>KSh {mockProducts[0].price}</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending</Text>
          <Text
            style={styles.link}
            onPress={() => router.push("/(customer)/(tabs)/products")}
          >
            See all
          </Text>
        </View>
        <FlatList
          data={featured}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: spacing.lg }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.horizontalCard}>
              <ProductCard product={item} onPress={openProduct} />
            </View>
          )}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>New arrivals</Text>
        </View>
        {newProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onPress={openProduct}
          />
        ))}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Discounted</Text>
        </View>
        {discounted.slice(0, 2).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onPress={openProduct}
          />
        ))}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured categories</Text>
          <Text
            style={styles.link}
            onPress={() => router.push("/(customer)/products/categories")}
          >
            View all
          </Text>
        </View>
        <View style={styles.chipGrid}>
          {mockCategories.slice(0, 4).map((category) => (
            <Text
              key={category.id}
              style={styles.chip}
              onPress={() =>
                router.push({
                  pathname: "/(customer)/products/category/[categoryId]",
                  params: { categoryId: category.id },
                })
              }
            >
              {category.name}
            </Text>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured manufacturers</Text>
          <Text
            style={styles.link}
            onPress={() => router.push("/(customer)/products/manufacturers")}
          >
            View all
          </Text>
        </View>
        <View style={styles.chipGrid}>
          {mockManufacturers.slice(0, 4).map((manufacturer) => (
            <Text
              key={manufacturer.id}
              style={styles.chip}
              onPress={() =>
                router.push({
                  pathname:
                    "/(customer)/products/manufacturer/[manufacturerId]",
                  params: { manufacturerId: manufacturer.id },
                })
              }
            >
              {manufacturer.name}
            </Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { padding: spacing.lg, paddingBottom: spacing.xxl },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  brandRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  brandName: {
    color: colors.text,
    fontSize: typography.bodySmall,
    fontWeight: "600",
  },
  cartButton: {
    minWidth: 44,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  cartCount: {
    position: "absolute",
    top: 0,
    right: 0,
    minWidth: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: colors.gold,
    color: colors.white,
    fontSize: 10,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 17,
  },
  searchArea: { position: "relative", zIndex: 10 },
  searchPanel: {
    position: "absolute",
    top: 54,
    left: 0,
    right: 0,
    maxHeight: 290,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    zIndex: 20,
    elevation: 5,
  },
  searchPanelTitle: {
    color: colors.textMuted,
    fontSize: typography.caption,
    fontWeight: "700",
    marginBottom: spacing.xs,
  },
  searchResult: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSoft,
  },
  searchResultName: {
    color: colors.text,
    fontSize: typography.bodySmall,
    fontWeight: "700",
  },
  searchResultMeta: {
    color: colors.textMuted,
    fontSize: typography.caption,
    marginTop: 2,
  },
  noResults: { color: colors.textMuted, paddingVertical: spacing.md },
  heroCard: {
    backgroundColor: colors.primarySoft,
    borderRadius: 18,
    padding: spacing.xl,
    marginBottom: spacing.xl,
  },
  heroLabel: {
    color: colors.primary,
    fontSize: typography.caption,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  heroTitle: {
    color: colors.text,
    fontSize: typography.h2,
    fontWeight: "700",
    marginTop: spacing.sm,
  },
  heroText: { color: colors.textMuted, marginTop: spacing.xs },
  heroPrice: {
    color: colors.text,
    fontSize: typography.h3,
    fontWeight: "800",
    marginTop: spacing.md,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
    marginTop: spacing.xl,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: typography.h3,
    fontWeight: "700",
  },
  link: {
    color: colors.primary,
    fontSize: typography.bodySmall,
    fontWeight: "600",
  },
  horizontalCard: { width: 260, marginRight: spacing.md },
  chipGrid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  chip: {
    backgroundColor: colors.backgroundAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: colors.text,
    fontWeight: "600",
  },
});
