import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/common/Header";
import colors from "../../../constants/colors";
import spacing from "../../../constants/spacing";
import { mockNotifications } from "../../../services/mockData";
import { formatDateTime } from "../../../utils/date";

export default function CustomerNotificationsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Notifications" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.container}>
        {mockNotifications.map((notification) => (
          <View key={notification.id} style={styles.card}>
            <Text style={styles.title}>{notification.title}</Text>
            <Text style={styles.body}>{notification.body}</Text>
            <Text style={styles.time}>
              {formatDateTime(notification.createdAt)}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xxl,
  },
  card: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  title: { color: colors.text, fontWeight: "700", marginBottom: spacing.xs },
  body: { color: colors.textMuted },
  time: { color: colors.primary, marginTop: spacing.sm, fontSize: 12 },
});
