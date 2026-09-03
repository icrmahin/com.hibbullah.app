import { router, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../../components/common/Header";
import ProductCard from "../../../../components/products/ProductCard";
import colors from "../../../../constants/colors";
import spacing from "../../../../constants/spacing";
import { mockCategories, mockProducts } from "../../../../services/mockData";

export default function CategoryProductsScreen() {
  const params = useLocalSearchParams<{ categoryId: string }>();
  const category =
    mockCategories.find((item) => item.id === params.categoryId) ??
    mockCategories[0];
  const products = useMemo(
    () => mockProducts.filter((product) => product.categoryId === category.id),
    [category.id],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title={category.name} onBack={() => router.back()} />
      <FlatList
        data={products}
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
});
