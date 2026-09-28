import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { AppHeader } from '../../components/common/AppHeader';
import { AppCard } from '../../components/common/AppCard';
import { AppIcon } from '../../components/common/AppIcon';
import { StatusBadge } from '../../components/common/StatusBadge';
import { useAppNavigation } from '../../navigation/NavigationContext';

export const BankAccountScreen = () => {
  const { goBack } = useAppNavigation();

  const settlementHistory = [
    {
      id: 'st-1',
      date: '14 Jun 2026',
      amount: '₹32,800.00',
      utr: 'HDFC9821401',
      status: 'Deposited',
      account: 'HDFC Bank ••4821',
    },
    {
      id: 'st-2',
      date: '07 Jun 2026',
      amount: '₹45,210.00',
      utr: 'HDFC8710392',
      status: 'Deposited',
      account: 'HDFC Bank ••4821',
    },
    {
      id: 'st-3',
      date: '31 May 2026',
      amount: '₹52,400.00',
      utr: 'HDFC7601928',
      status: 'Deposited',
      account: 'HDFC Bank ••4821',
    },
    {
      id: 'st-4',
      date: '24 May 2026',
      amount: '₹54,110.00',
      utr: 'HDFC6590214',
      status: 'Deposited',
      account: 'HDFC Bank ••4821',
    },
  ];

  return (
    <View style={styles.container}>
      <AppHeader title="Settlement Details" onBack={goBack} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>SETTLEMENT RECONCILIATION</Text>
        <Text style={styles.title}>Account & Settlements</Text>
        <Text style={styles.subtitle}>
          All earnings from RoadRider customer orders are automatically deposited into your verified bank account.
        </Text>

        {/* Current Settlement Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>TOTAL TRANSFERRED TO BANK</Text>
          <Text style={styles.summaryAmount}>₹1,84,520</Text>
          <View style={styles.summaryMetaRow}>
            <View style={styles.summaryMetaItem}>
              <Text style={styles.metaLabel}>Last Payout Transferred</Text>
              <Text style={styles.metaValue}>₹32,800 on 14 Jun 2026</Text>
            </View>
            <View style={styles.summaryMetaItem}>
              <Text style={styles.metaLabel}>Next Auto Settlement</Text>
              <Text style={styles.metaValueHighlight}>Mon, 17 Jun 2026</Text>
            </View>
          </View>
        </View>

        {/* Destination Bank Account Card */}
        <View style={styles.bankCard}>
          <View style={styles.bankCardTop}>
            <Text style={styles.bankName}>DESTINATION BANK ACCOUNT</Text>
            <StatusBadge>Verified & Active</StatusBadge>
          </View>
          <Text style={styles.accountNumber}>•••• •••• 4821</Text>
          <View style={styles.bankMetaList}>
            <View style={styles.bankMetaRow}>
              <Text style={styles.bankMetaKey}>Account Holder:</Text>
              <Text style={styles.bankMetaVal}>The Copper Kitchen Pvt Ltd</Text>
            </View>
            <View style={styles.bankMetaRow}>
              <Text style={styles.bankMetaKey}>Bank & Branch:</Text>
              <Text style={styles.bankMetaVal}>HDFC Bank, Indiranagar Branch</Text>
            </View>
            <View style={styles.bankMetaRow}>
              <Text style={styles.bankMetaKey}>IFSC Code:</Text>
              <Text style={styles.bankMetaVal}>HDFC0001245</Text>
            </View>
            <View style={styles.bankMetaRow}>
              <Text style={styles.bankMetaKey}>Account Type:</Text>
              <Text style={styles.bankMetaVal}>Current Business Account</Text>
            </View>
          </View>
        </View>

        {/* Settlement Information Card */}
        <AppCard style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>Automated Settlement Policy</Text>
          <View style={styles.infoRow}>
            <AppIcon name="clock" size={16} color={colors.terracotta} />
            <Text style={styles.infoText}>
              Daily automated settlement schedule (T+1). All completed orders are cleared and transferred overnight.
            </Text>
          </View>
          <View style={styles.infoRow}>
            <AppIcon name="receipt" size={16} color={colors.terracotta} />
            <Text style={styles.infoText}>
              Vendor net earnings = Gross sales − 8% RoadRider platform commission − 18% GST on platform fee.
            </Text>
          </View>
        </AppCard>

        {/* Withdrawal / Transfer History */}
        <View style={styles.historySection}>
          <Text style={styles.sectionHeading}>Previous Transfer History</Text>
          <AppCard style={styles.historyCard}>
            {settlementHistory.map((item, idx) => (
              <View
                key={item.id}
                style={[
                  styles.historyRow,
                  idx === settlementHistory.length - 1 && styles.lastHistoryRow,
                ]}
              >
                <View style={styles.historyLeft}>
                  <View style={styles.historyTopRow}>
                    <Text style={styles.historyAmount}>{item.amount}</Text>
                    <View style={styles.depositedBadge}>
                      <Text style={styles.depositedText}>Deposited</Text>
                    </View>
                  </View>
                  <Text style={styles.historyDetails}>
                    {item.account} · UTR: {item.utr}
                  </Text>
                </View>
                <Text style={styles.historyDate}>{item.date}</Text>
              </View>
            ))}
          </AppCard>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F7F6',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
    maxWidth: 720,
    width: '100%',
    marginHorizontal: 'auto',
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'Poppins, sans-serif',
    letterSpacing: 1.4,
    color: colors.terracotta,
    marginBottom: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'Poppins, sans-serif',
    color: colors.black,
    lineHeight: 28,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 12.5,
    fontFamily: 'DM Sans, sans-serif',
    color: colors.charcoal,
    lineHeight: 18,
    marginBottom: 18,
  },
  summaryCard: {
    backgroundColor: colors.black,
    borderRadius: radius.card,
    padding: 20,
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 9.5,
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '700',
    color: colors.warmGrey,
    letterSpacing: 1.2,
  },
  summaryAmount: {
    fontSize: 32,
    fontWeight: '700',
    fontFamily: 'Poppins, sans-serif',
    color: colors.white,
    marginVertical: 8,
  },
  summaryMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.12)',
    paddingTop: 12,
    marginTop: 4,
    gap: 12,
  },
  summaryMetaItem: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 9.5,
    fontFamily: 'DM Sans, sans-serif',
    color: colors.warmGrey,
  },
  metaValue: {
    fontSize: 11.5,
    fontWeight: '600',
    fontFamily: 'Poppins, sans-serif',
    color: colors.white,
    marginTop: 2,
  },
  metaValueHighlight: {
    fontSize: 11.5,
    fontWeight: '600',
    fontFamily: 'Poppins, sans-serif',
    color: colors.terracotta,
    marginTop: 2,
  },
  bankCard: {
    borderRadius: radius.card,
    backgroundColor: colors.white,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E6E3E0',
    marginBottom: 16,
  },
  bankCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  bankName: {
    fontSize: 10,
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '700',
    color: colors.charcoal,
    letterSpacing: 1,
  },
  accountNumber: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Poppins, sans-serif',
    color: colors.black,
    marginBottom: 14,
  },
  bankMetaList: {
    gap: 6,
    borderTopWidth: 1,
    borderTopColor: '#F0ECE8',
    paddingTop: 12,
  },
  bankMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bankMetaKey: {
    fontSize: 11,
    fontFamily: 'DM Sans, sans-serif',
    color: colors.charcoal,
  },
  bankMetaVal: {
    fontSize: 11,
    fontFamily: 'DM Sans, sans-serif',
    fontWeight: '600',
    color: colors.black,
  },
  infoCard: {
    padding: 16,
    marginBottom: 20,
    backgroundColor: colors.surfaceSubtle,
    borderRadius: radius.card,
    gap: 10,
  },
  infoCardTitle: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Poppins, sans-serif',
    color: colors.black,
    marginBottom: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 11.5,
    fontFamily: 'DM Sans, sans-serif',
    color: colors.charcoal,
    lineHeight: 16,
  },
  historySection: {
    marginBottom: 16,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Poppins, sans-serif',
    color: colors.black,
    marginBottom: 12,
  },
  historyCard: {
    padding: 0,
    borderRadius: radius.card,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#E6E3E0',
    overflow: 'hidden',
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F2EFEB',
  },
  lastHistoryRow: {
    borderBottomWidth: 0,
  },
  historyLeft: {
    flex: 1,
  },
  historyTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  historyAmount: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Poppins, sans-serif',
    color: colors.black,
  },
  depositedBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
  },
  depositedText: {
    fontSize: 9,
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '600',
    color: '#059669',
  },
  historyDetails: {
    fontSize: 10,
    fontFamily: 'DM Sans, sans-serif',
    color: colors.charcoal,
    marginTop: 2,
  },
  historyDate: {
    fontSize: 11,
    fontFamily: 'DM Sans, sans-serif',
    color: colors.charcoal,
  },
});

