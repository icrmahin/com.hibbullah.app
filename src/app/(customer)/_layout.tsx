import { Stack } from "expo-router";

export default function CustomerLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="search" />
      <Stack.Screen name="checkout" />
      <Stack.Screen name="delivery-cycle" />
      <Stack.Screen name="order/[orderId]" />
      <Stack.Screen name="products" />
      <Stack.Screen name="account" />
      <Stack.Screen name="address" />
    </Stack>
  );
}
