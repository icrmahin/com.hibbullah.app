import { router, usePathname } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "../../constants/colors";
import { useCart } from "../../providers/CartProvider";

const navigationItems = [
  {
    label: "Home",
    path: "/(customer)/(tabs)",
    icon: { ios: "house.fill", android: "home", web: "home" },
  },
  {
    label: "Products",
    path: "/(customer)/(tabs)/products",
    icon: {
      ios: "square.grid.2x2.fill",
      android: "grid_view",
      web: "grid_view",
    },
  },
  {
    label: "Orders",
    path: "/(customer)/(tabs)/orders",
    icon: {
      ios: "shippingbox.fill",
      android: "inventory_2",
      web: "inventory_2",
    },
  },
  {
    label: "Cart",
    path: "/(customer)/(tabs)/cart",
    icon: { ios: "cart.fill", android: "shopping_cart", web: "shopping_cart" },
  },
  {
    label: "Account",
    path: "/(customer)/(tabs)/account",
    icon: { ios: "person.fill", android: "person", web: "person" },
  },
] as const;

function getActivePath(pathname: string) {
  if (pathname.includes("/cart")) return "/(customer)/(tabs)/cart";
  if (pathname.includes("/products")) return "/(customer)/(tabs)/products";
  if (pathname.includes("/orders") || pathname.includes("/order/"))
    return "/(customer)/(tabs)/orders";
  if (pathname.includes("/account") || pathname.includes("/address"))
    return "/(customer)/(tabs)/account";
  return "/(customer)/(tabs)";
}

export default function CustomerNavigation() {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const { itemCount } = useCart();
  const activePath = getActivePath(pathname);

  return (
    <View
      style={[styles.container, { paddingBottom: Math.max(insets.bottom, 8) }]}
    >
      {navigationItems.map((item) => {
        const active = item.path === activePath;
        return (
          <Pressable
            key={item.label}
            style={styles.item}
            onPress={() => router.replace(item.path as never)}
            accessibilityRole="button"
            accessibilityLabel={`Open ${item.label}`}
            accessibilityState={{ selected: active }}
          >
            <SymbolView
              name={item.icon}
              tintColor={active ? colors.primary : colors.textMuted}
              size={21}
            />
            {item.label === "Cart" && itemCount > 0 ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {itemCount > 99 ? "99+" : itemCount}
                </Text>
              </View>
            ) : null}
            <Text style={[styles.label, active && styles.activeLabel]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.backgroundAlt,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
  },
  item: {
    flex: 1,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: 0,
    marginLeft: 22,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 3,
    borderRadius: 8,
    backgroundColor: colors.gold,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: colors.white,
    fontSize: 9,
    fontWeight: "700",
  },
  label: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "600",
  },
  activeLabel: { color: colors.primary },
});
