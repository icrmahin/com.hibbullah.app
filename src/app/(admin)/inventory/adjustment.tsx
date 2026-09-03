import { router } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import AdminHeader from "../../../components/admin/AdminHeader";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import colors from "../../../constants/colors";
import spacing from "../../../constants/spacing";

export default function InventoryAdjustmentScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <AdminHeader title="Stock adjustment" subtitle="Record stock changes" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.form}>
          <Input label="Product" value="Amoxicillin 250mg" />
          <Input label="Batch number" value="AMX-732" />
          <Input label="Adjustment reason" value="Order fulfillment" />
          <Input label="Quantity" value="-6" keyboardType="numeric" />
        </View>
        <Button
          title="Save adjustment"
          onPress={() => router.back()}
          fullWidth
        />
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
