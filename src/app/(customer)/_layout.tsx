import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import CustomerNavigation from "../../components/common/CustomerNavigation";

export default function CustomerLayout() {
  return (
    <View style={styles.container}>
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
      <CustomerNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
