import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import AdminHeader from '../../../components/admin/AdminHeader';
import SearchBar from '../../../components/common/SearchBar';
import LoadingState from '../../../components/common/LoadingState';
import colors from '../../../constants/colors';
import spacing from '../../../constants/spacing';
import { mockCustomerList } from '../../../services/mockData';

export default function AdminCustomersScreen() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingState label="Loading customers" />;

  const filtered = mockCustomerList.filter((customer) => customer.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <SafeAreaView style={styles.safeArea}>
      <AdminHeader title="Customers" subtitle="Manage customer records" />
      <ScrollView contentContainerStyle={styles.container}>
        <SearchBar value={query} onChangeText={setQuery} placeholder="Search customer" />
        {filtered.map((customer) => (
          <View key={customer.id} style={styles.row}>
            <View>
              <Text style={styles.name}>{customer.name}</Text>
              <Text style={styles.info}>{customer.phone}</Text>
            </View>
            <Text style={styles.link} onPress={() => router.push({ pathname: '/(admin)/customers/[customerId]', params: { customerId: customer.id } })}>View</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxl },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.backgroundAlt, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: spacing.md },
  name: { color: colors.text, fontWeight: '700' },
  info: { color: colors.textMuted, fontSize: 12 },
  link: { color: colors.primary, fontWeight: '700' },
});
