import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../../constants/colors';
import spacing from '../../constants/spacing';
import typography from '../../constants/typography';

type StatusBadgeProps = {
  label: string;
  tone?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
};

export default function StatusBadge({ label, tone = 'neutral' }: StatusBadgeProps) {
  const palette = {
    success: { background: colors.greenSoft, text: colors.success },
    warning: { background: colors.amberSoft, text: colors.warning },
    danger: { background: colors.redSoft, text: colors.danger },
    info: { background: colors.primarySoft, text: colors.primary },
    neutral: { background: colors.background, text: colors.textMuted },
  }[tone];

  return (
    <View style={[styles.badge, { backgroundColor: palette.background }]} accessibilityLabel={label}>
      <Text style={[styles.text, { color: palette.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 999,
  },
  text: {
    fontSize: typography.caption,
    fontWeight: '700',
  },
});
