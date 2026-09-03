import { Stack } from 'expo-router';

export default function AdminLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="products" />
      <Stack.Screen name="products/[productId]" />
      <Stack.Screen name="products/[productId]/edit" />
      <Stack.Screen name="products/add" />
      <Stack.Screen name="inventory" />
      <Stack.Screen name="inventory/batches" />
      <Stack.Screen name="inventory/expiry" />
      <Stack.Screen name="inventory/adjustment" />
      <Stack.Screen name="orders" />
      <Stack.Screen name="orders/[orderId]" />
      <Stack.Screen name="customers" />
      <Stack.Screen name="customers/[customerId]" />
      <Stack.Screen name="reports" />
      <Stack.Screen name="reports/sales" />
      <Stack.Screen name="reports/inventory" />
      <Stack.Screen name="returns" />
      <Stack.Screen name="returns/[returnId]" />
      <Stack.Screen name="audit" />
    </Stack>
  );
}
