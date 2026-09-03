import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import ProductCard from '../../../components/products/ProductCard';
import SearchBar from '../../../components/common/SearchBar';
import LoadingState from '../../../components/common/LoadingState';
import ErrorState from '../../../components/common/ErrorState';
import colors from '../../../constants/colors';
import spacing from '../../../constants/spacing';
import typography from '../../../constants/typography';
import { mockCategories, mockManufacturers, mockProducts } from '../../../services/mockData';
import type { Product } from '../../../types/product';

export default function CustomerHomeScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasProducts = mockProducts.length > 0;
      if (!hasProducts) {
        setError('No products found.');
      }
      setLoading(false);
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  const featured = useMemo(() => mockProducts.filter((product) => product.isFeatured), []);
  const newProducts = useMemo(() => [...mockProducts].slice(0, 3), []);
  const discounted = useMemo(() => mockProducts.filter((product) => product.discountPercent), []);

  if (loading) return <LoadingState label="Loading your pharmacy" />;
  if (error) return <ErrorState message={error} />;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.eyebrow}>Good morning</Text>
            <Text style={styles.title}>Hibbullah</Text>
          </View>
          <Text style={styles.cartCount}>Cart 2</Text>
        </View>

        <SearchBar value="" onChangeText={() => router.push('/(customer)/search')} placeholder="Search medicines" />

        <View style={styles.heroCard}>
          <Text style={styles.heroLabel}>Product of the day</Text>
          <Text style={styles.heroTitle}>{mockProducts[0].name}</Text>
          <Text style={styles.heroText}>{mockProducts[0].brand} · {mockProducts[0].genericName}</Text>
          <Text style={styles.heroPrice}>KSh {mockProducts[0].price}</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending</Text>
          <Text style={styles.link} onPress={() => router.push('/(customer)/(tabs)/products')}>See all</Text>
        </View>
        <FlatList
          data={featured}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: spacing.lg }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <View style={styles.horizontalCard}><ProductCard product={item} onPress={(product: Product) => router.push({ pathname: '/(customer)/products/[productId]', params: { productId: product.id } })} /></View>}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>New arrivals</Text>
        </View>
        {newProducts.map((product) => (
          <ProductCard key={product.id} product={product} onPress={(p: Product) => router.push({ pathname: '/(customer)/products/[productId]', params: { productId: p.id } })} />
        ))}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Discounted</Text>
        </View>
        {discounted.slice(0, 2).map((product) => (
          <ProductCard key={product.id} product={product} onPress={(p: Product) => router.push({ pathname: '/(customer)/products/[productId]', params: { productId: p.id } })} />
        ))}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured categories</Text>
          <Text style={styles.link} onPress={() => router.push('/(customer)/products/categories')}>View all</Text>
        </View>
        <View style={styles.chipGrid}>
          {mockCategories.slice(0, 4).map((category) => (
            <Text key={category.id} style={styles.chip} onPress={() => router.push({ pathname: '/(customer)/products/category/[categoryId]', params: { categoryId: category.id } })}>{category.name}</Text>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured manufacturers</Text>
          <Text style={styles.link} onPress={() => router.push('/(customer)/products/manufacturers')}>View all</Text>
        </View>
        <View style={styles.chipGrid}>
          {mockManufacturers.slice(0, 4).map((manufacturer) => (
            <Text key={manufacturer.id} style={styles.chip} onPress={() => router.push({ pathname: '/(customer)/products/manufacturer/[manufacturerId]', params: { manufacturerId: manufacturer.id } })}>{manufacturer.name}</Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { padding: spacing.lg, paddingBottom: spacing.xxl },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  eyebrow: { color: colors.textMuted, fontSize: typography.caption },
  title: { color: colors.text, fontSize: typography.title, fontWeight: '800' },
  cartCount: { color: colors.primary, fontWeight: '700', fontSize: typography.bodySmall },
  heroCard: { backgroundColor: colors.primarySoft, borderRadius: 18, padding: spacing.xl, marginBottom: spacing.xl },
  heroLabel: { color: colors.primary, fontSize: typography.caption, fontWeight: '700', textTransform: 'uppercase' },
  heroTitle: { color: colors.text, fontSize: typography.h2, fontWeight: '700', marginTop: spacing.sm },
  heroText: { color: colors.textMuted, marginTop: spacing.xs },
  heroPrice: { color: colors.text, fontSize: typography.h3, fontWeight: '800', marginTop: spacing.md },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md, marginTop: spacing.xl },
  sectionTitle: { color: colors.text, fontSize: typography.h3, fontWeight: '700' },
  link: { color: colors.primary, fontSize: typography.bodySmall, fontWeight: '600' },
  horizontalCard: { width: 260, marginRight: spacing.md },
  chipGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: { backgroundColor: colors.backgroundAlt, borderWidth: 1, borderColor: colors.border, borderRadius: 999, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, color: colors.text, fontWeight: '600' },
});
