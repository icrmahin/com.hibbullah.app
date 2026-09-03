import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AdminHeader from "../../../../components/admin/AdminHeader";
import Button from "../../../../components/common/Button";
import Input from "../../../../components/common/Input";
import colors from "../../../../constants/colors";
import spacing from "../../../../constants/spacing";
import { mockProducts } from "../../../../services/mockData";

export default function AdminEditProductScreen() {
  const params = useLocalSearchParams<{ productId: string }>();
  const product =
    mockProducts.find((item) => item.id === params.productId) ??
    mockProducts[0];
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(String(product.price));
  const [stock, setStock] = useState(String(product.stock));

  return (
    <SafeAreaView style={styles.safeArea}>
      <AdminHeader title="Edit product" subtitle="Update catalog item" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.form}>
          <Input label="Product name" value={name} onChangeText={setName} />
          <Input
            label="Price"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
          <Input
            label="Stock"
            value={stock}
            onChangeText={setStock}
            keyboardType="numeric"
          />
          <Input label="Description" value={product.description} multiline />
        </View>
        <Button title="Save changes" onPress={() => router.back()} fullWidth />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: {
    padding: spacing.lg,
    gap: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  form: { gap: spacing.md },
});
