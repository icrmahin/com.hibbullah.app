import { router } from "expo-router";
import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import AdminHeader from "../../../components/admin/AdminHeader";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import colors from "../../../constants/colors";
import spacing from "../../../constants/spacing";

export default function AdminAddProductScreen() {
  const [name, setName] = useState("Vitamin C Plus");
  const [brand, setBrand] = useState("Cebion");
  const [genericName, setGenericName] = useState("Ascorbic Acid");
  const [price, setPrice] = useState("320");
  const [stock, setStock] = useState("26");

  return (
    <SafeAreaView style={styles.safeArea}>
      <AdminHeader title="Add product" subtitle="Create new catalog item" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.form}>
          <Input label="Product name" value={name} onChangeText={setName} />
          <Input label="Brand" value={brand} onChangeText={setBrand} />
          <Input
            label="Generic name"
            value={genericName}
            onChangeText={setGenericName}
          />
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
          <Input label="Batch number" value="VIT-1148" />
          <Input label="Expiry date" value="2028-01-18" />
          <Input label="Description" value="Immune support vitamin" multiline />
        </View>
        <Button title="Save product" onPress={() => router.back()} fullWidth />
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
