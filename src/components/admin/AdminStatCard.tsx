import { StyleSheet, Text, View } from "react-native";
import colors from "../../constants/colors";
import sizes from "../../constants/sizes";
import spacing from "../../constants/spacing";
import typography from "../../constants/typography";

type AdminStatCardProps = {
	label: string;
	value: string | number;
	detail?: string;
	accent?: "green" | "gold" | "neutral";
};

export default function AdminStatCard({ label, value, detail, accent = "neutral" }: AdminStatCardProps) {
	return (
		<View style={styles.card}>
			<View style={[styles.marker, accent === "green" && styles.greenMarker, accent === "gold" && styles.goldMarker]} />
			<Text style={styles.label}>{label}</Text>
			<Text style={styles.value} numberOfLines={1}>{value}</Text>
			{detail ? <Text style={styles.detail}>{detail}</Text> : null}
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		flex: 1,
		minWidth: "45%",
		backgroundColor: colors.backgroundAlt,
		borderRadius: sizes.cardRadius,
		borderWidth: 1,
		borderColor: colors.border,
		padding: spacing.lg,
	},
	marker: { width: 24, height: 3, borderRadius: 2, backgroundColor: colors.textMuted, marginBottom: spacing.md },
	greenMarker: { backgroundColor: colors.primary },
	goldMarker: { backgroundColor: colors.gold },
	label: { color: colors.textMuted, fontSize: typography.caption, fontWeight: "600" },
	value: { color: colors.text, fontSize: typography.h2, fontWeight: "800", marginTop: spacing.xs },
	detail: { color: colors.textMuted, fontSize: typography.caption, marginTop: spacing.xs },
});
