import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import Button from '../../components/common/Button';
import Header from '../../components/common/Header';
import Input from '../../components/common/Input';
import colors from '../../constants/colors';
import spacing from '../../constants/spacing';
import { mockAddresses, mockCartItems } from '../../services/mockData';
import { formatCurrency } from '../../utils/currency';

export default function CheckoutScreen() {
  const subtotal = mockCartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = mockCartItems.reduce((sum, item) => sum + (item.product.originalPrice ? item.product.originalPrice - item.product.price : 0) * item.quantity, 0);
  const deliveryFee = 150;
  const total = subtotal - discount + deliveryFee;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Checkout" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.container}>
        <Input label="Customer name" value="Amina Karim" />
        <Input label="Delivery address" value={mockAddresses[0].street} />

        <View style={styles.summaryBox}>
          <Text style={styles.sectionTitle}>Order summary</Text>
          {mockCartItems.map((item) => (
            <View key={item.id} style={styles.row}>
              <Text>{item.product.name}</Text>
              <Text>{item.quantity} x {formatCurrency(item.product.price)}</Text>
            </View>
          ))}
          <View style={styles.row}><Text>Subtotal</Text><Text>{formatCurrency(subtotal)}</Text></View>
          <View style={styles.row}><Text>Discount</Text><Text>-{formatCurrency(discount)}</Text></View>
          <View style={styles.row}><Text>Delivery</Text><Text>{formatCurrency(deliveryFee)}</Text></View>
          <View style={[styles.row, styles.total]}><Text style={styles.totalText}>Total</Text><Text style={styles.totalText}>{formatCurrency(total)}</Text></View>
        </View>

        <View style={styles.paymentBox}>
          <Text style={styles.sectionTitle}>Payment</Text>
          <Text style={styles.paymentMethod}>Cash on Delivery</Text>
        </View>

        <Button title="Submit order" onPress={() => router.push('/(customer)/delivery-cycle')} fullWidth />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xxl },
  summaryBox: { backgroundColor: colors.backgroundAlt, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: spacing.lg },
  sectionTitle: { color: colors.text, fontWeight: '700', marginBottom: spacing.md },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  total: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing.md, marginTop: spacing.md },
  totalText: { color: colors.text, fontWeight: '800' },
  paymentBox: { backgroundColor: colors.backgroundAlt, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: spacing.lg },
  paymentMethod: { color: colors.textMuted },
});
