import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { AppHeader } from '../../components/common/AppHeader';
import { AppCard } from '../../components/common/AppCard';
import { useAppNavigation } from '../../navigation/NavigationContext';
import { mockCategoryShares, mockTopProducts } from '../../data/mockAnalytics';
export const SalesAnalyticsScreen = () => {
    const { goBack } = useAppNavigation();
    const [period, setPeriod] = useState('30');
    return (<View style={styles.container}>
      <AppHeader title="Sales analytics" onBack={goBack}/>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Period Filter Pills */}
        <View style={styles.filterPills}>
          {['7', '30', '90'].map((p) => {
            const isActive = period === p;
            return (<TouchableOpacity key={p} onPress={() => setPeriod(p)} style={[styles.pill, isActive && styles.pillActive]}>
                <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
                  {p} days
                </Text>
              </TouchableOpacity>);
        })}
        </View>

        {/* Analytics Hero Card with SVG Trend Graph */}
        <AppCard style={styles.heroCard}>
          <Text style={styles.heroLabel}>NET SALES</Text>
          <Text style={styles.heroAmount}>₹2,84,620</Text>
          <Text style={styles.heroTrend}>+12.8% from previous period</Text>

          <View style={styles.chartWrapper}>
            <Svg width="100%" height={90} viewBox="0 0 330 90">
              <Path d="M0 79 C40 74 60 60 90 68 S140 58 180 62 S250 42 330 46" fill="none" stroke={colors.warmGrey} strokeWidth={1.5} strokeDasharray="4 4"/>
              <Path d="M0 72 C35 58 42 74 78 52 S125 60 153 36 S205 52 235 24 S290 36 330 8" fill="none" stroke={colors.terracotta} strokeWidth={3} strokeLinecap="round"/>
            </Svg>
          </View>
        </AppCard>

        {/* Top Products Section */}
        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>Top products</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View all</Text>
          </TouchableOpacity>
        </View>

        <AppCard style={styles.rankCard}>
          {mockTopProducts.map((p, idx) => (<View key={p.name} style={[
                styles.rankRow,
                idx === mockTopProducts.length - 1 && styles.lastRankRow,
            ]}>
              <Text style={styles.rankIndex}>0{idx + 1}</Text>
              <View style={styles.rankInfo}>
                <Text style={styles.rankTitle}>{p.name}</Text>
                <Text style={styles.rankSub}>{p.unitsSold} units sold</Text>
              </View>
              <Text style={styles.rankRevenue}>{p.revenue}</Text>
            </View>))}
        </AppCard>

        {/* Category Performance */}
        <View style={[styles.sectionHeading, { marginTop: 22 }]}>
          <Text style={styles.sectionTitle}>Category performance</Text>
        </View>

        <AppCard style={styles.categoryCard}>
          {mockCategoryShares.map((cat, idx) => (<View key={cat.category} style={[
                styles.catRow,
                idx === mockCategoryShares.length - 1 && styles.lastCatRow,
            ]}>
              <View style={styles.catLabels}>
                <Text style={styles.catName}>{cat.category}</Text>
                <Text style={styles.catPercent}>{cat.percentage}%</Text>
              </View>
              <View style={styles.catTrack}>
                <View style={[styles.catFill, { width: `${cat.percentage}%` }]}/>
              </View>
            </View>))}
        </AppCard>
      </ScrollView>
    </View>);
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F7F6',
    },
    scrollContent: {
        padding: 18,
        paddingBottom: 28,
    },
    filterPills: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 16,
    },
    pill: {
        minHeight: 34,
        paddingHorizontal: 14,
        borderRadius: radius.pill,
        borderWidth: 1,
        borderColor: 'rgba(156, 154, 154, 0.35)',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    pillActive: {
        backgroundColor: colors.black,
        borderColor: colors.black,
    },
    pillText: {
        fontSize: 10,
        fontFamily: 'Poppins, sans-serif',
        fontWeight: '500',
        color: colors.charcoal,
    },
    pillTextActive: {
        color: colors.white,
        fontWeight: '600',
    },
    heroCard: {
        padding: 16,
        marginBottom: 20,
    },
    heroLabel: {
        fontSize: 9,
        fontFamily: 'Poppins, sans-serif',
        fontWeight: '700',
        color: colors.charcoal,
        letterSpacing: 1.4,
    },
    heroAmount: {
        fontSize: 28,
        fontWeight: '700',
        fontFamily: 'Poppins, sans-serif',
        color: colors.black,
        marginVertical: 4,
    },
    heroTrend: {
        fontSize: 10,
        fontWeight: '600',
        fontFamily: 'DM Sans, sans-serif',
        color: colors.terracotta,
    },
    chartWrapper: {
        marginTop: 14,
        height: 90,
    },
    sectionHeading: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        fontFamily: 'Poppins, sans-serif',
        color: colors.black,
    },
    viewAllText: {
        fontSize: 12,
        fontWeight: '600',
        fontFamily: 'DM Sans, sans-serif',
        color: colors.terracotta,
    },
    rankCard: {
        padding: 6,
    },
    rankRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(156, 154, 154, 0.18)',
        gap: 12,
    },
    lastRankRow: {
        borderBottomWidth: 0,
    },
    rankIndex: {
        fontSize: 12,
        fontFamily: 'Poppins, sans-serif',
        fontWeight: '700',
        color: colors.warmGrey,
        width: 24,
    },
    rankInfo: {
        flex: 1,
    },
    rankTitle: {
        fontSize: 12,
        fontWeight: '600',
        fontFamily: 'Poppins, sans-serif',
        color: colors.black,
    },
    rankSub: {
        fontSize: 9.5,
        fontFamily: 'DM Sans, sans-serif',
        color: colors.charcoal,
        marginTop: 2,
    },
    rankRevenue: {
        fontSize: 12,
        fontWeight: '700',
        fontFamily: 'Poppins, sans-serif',
        color: colors.black,
    },
    categoryCard: {
        padding: 16,
    },
    catRow: {
        marginBottom: 14,
    },
    lastCatRow: {
        marginBottom: 0,
    },
    catLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    catName: {
        fontSize: 11,
        fontFamily: 'DM Sans, sans-serif',
        color: colors.charcoal,
    },
    catPercent: {
        fontSize: 11,
        fontWeight: '700',
        fontFamily: 'Poppins, sans-serif',
        color: colors.black,
    },
    catTrack: {
        height: 5,
        borderRadius: 3,
        backgroundColor: 'rgba(156, 154, 154, 0.20)',
        overflow: 'hidden',
    },
    catFill: {
        height: '100%',
        backgroundColor: colors.terracotta,
        borderRadius: 3,
    },
});
