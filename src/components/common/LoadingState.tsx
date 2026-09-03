import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import AppLogo from './AppLogo';
import colors from '../../constants/colors';
import spacing from '../../constants/spacing';
import typography from '../../constants/typography';

type LoadingStateProps = {
  label?: string;
};

export default function LoadingState({ label = 'Loading...' }: LoadingStateProps) {
  return (
    <View style={styles.container}>
      <AppLogo size={64} />
      <ActivityIndicator size="small" color={colors.primary} />
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
    gap: spacing.md,
  },
  text: {
    color: colors.textMuted,
    fontSize: typography.bodySmall,
  },
});
