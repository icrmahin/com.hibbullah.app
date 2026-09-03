import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import Header from '../../../components/common/Header';
import LoadingState from '../../../components/common/LoadingState';
import OrderCard from '../../../components/orders/OrderCard';
import colors from '../../../constants/colors';
import spacing from '../../../constants/spacing';
import { getOrders } from '../../../services/orderService';
import type { Order } from '../../../types/order';

export default function CustomerOrdersScreen() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders().then((result) => {
      setOrders(result);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingState label="Loading your orders" />;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Orders" subtitle="Track current and previous deliveries" />
      <ScrollView contentContainerStyle={styles.container}>
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} onPress={(item) => router.push({ pathname: '/(customer)/order/[orderId]', params: { orderId: item.id } })} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { padding: spacing.lg, paddingBottom: spacing.xxl },
});
