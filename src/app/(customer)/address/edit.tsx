import { router } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../../components/common/Button";
import Header from "../../../components/common/Header";
import Input from "../../../components/common/Input";
import colors from "../../../constants/colors";
import spacing from "../../../constants/spacing";

export default function EditAddressScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Edit address" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.form}>
          <Input label="Label" value="Home" />
          <Input label="Street" value="Nairobi West, Mfangano Street" />
          <Input label="City" value="Nairobi" />
          <Input label="County" value="Nairobi County" />
        </View>
        <Button title="Save address" onPress={() => router.back()} fullWidth />
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
