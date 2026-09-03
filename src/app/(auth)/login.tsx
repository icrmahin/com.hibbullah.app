import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/common/Button";
import AppLogo from "../../components/common/AppLogo";
import Input from "../../components/common/Input";
import colors from "../../constants/colors";
import spacing from "../../constants/spacing";
import typography from "../../constants/typography";
import { isEmpty, isValidEmail } from "../../utils/validation";

export default function LoginScreen() {
  const [email, setEmail] = useState("amina@hibbullah.app");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (isEmpty(email) || !isValidEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (isEmpty(password) || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace("/(customer)/(tabs)");
    }, 500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <AppLogo size={72} />
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>
          Sign in to continue with your orders and care plan.
        </Text>

        <View style={styles.form}>
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <Text
            style={styles.link}
            onPress={() => router.push("/(auth)/forgot-password")}
          >
            Forgot password?
          </Text>
        </View>

        <View style={styles.actions}>
          <Button
            title={loading ? "Signing in..." : "Login"}
            onPress={handleLogin}
            fullWidth
            disabled={loading}
          />
          <Button
            title="Create account"
            variant="secondary"
            onPress={() => router.push("/(auth)/register")}
            fullWidth
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: {
    flexGrow: 1,
    padding: spacing.xxl,
    justifyContent: "center",
    gap: spacing.xl,
  },
  title: { color: colors.text, fontSize: typography.title, fontWeight: "800" },
  subtitle: { color: colors.textMuted, fontSize: typography.bodySmall },
  form: { gap: spacing.md },
  error: { color: colors.danger, fontSize: typography.caption },
  link: {
    color: colors.primary,
    fontSize: typography.bodySmall,
    textAlign: "right",
    marginTop: spacing.xs,
  },
  actions: { gap: spacing.md },
});
