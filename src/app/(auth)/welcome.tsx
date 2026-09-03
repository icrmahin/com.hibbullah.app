import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/common/Button";
import AppLogo from "../../components/common/AppLogo";
import colors from "../../constants/colors";
import spacing from "../../constants/spacing";
import typography from "../../constants/typography";

export default function WelcomeScreen() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 350);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.brandWrap}>
          <AppLogo size={88} />
          <Text style={styles.brand}>Hibbullah</Text>
        </View>

        <View style={styles.hero}>
          <Text style={styles.title}>Your pharmacy, simplified.</Text>
          <Text style={styles.subtitle}>
            Browse essentials, manage orders, and keep your care plan on track
            with a clear and trusted mobile experience.
          </Text>
        </View>

        <View style={styles.featureList}>
          <Text style={styles.feature}>• Fast product discovery</Text>
          <Text style={styles.feature}>• 24-hour delivery cycle</Text>
          <Text style={styles.feature}>• Clear order tracking</Text>
        </View>

        <View style={styles.actions}>
          <Button
            title={isReady ? "Login" : "Continue"}
            onPress={() => router.push("/(auth)/login")}
            fullWidth
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
    justifyContent: "center",
    padding: spacing.xxl,
    gap: spacing.xxl,
  },
  brandWrap: { alignItems: "center", gap: spacing.md },
  brand: { color: colors.text, fontSize: typography.h3, fontWeight: "600" },
  hero: { gap: spacing.md },
  title: {
    color: colors.text,
    fontSize: typography.title,
    fontWeight: "800",
    lineHeight: 36,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: 26,
  },
  featureList: { gap: spacing.sm },
  feature: { color: colors.text, fontSize: typography.bodySmall },
  actions: { gap: spacing.md },
});
