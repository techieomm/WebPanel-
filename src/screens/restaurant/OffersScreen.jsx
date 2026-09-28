import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import { AppHeader } from '../../components/common/AppHeader';
import { AppButton } from '../../components/common/AppButton';
import { AppCard } from '../../components/common/AppCard';
import { AppIcon } from '../../components/common/AppIcon';
import { useAppNavigation } from '../../navigation/NavigationContext';
export const OffersScreen = () => {
    const { goBack } = useAppNavigation();
    const offers = [
        { code: 'WEEKEND20', desc: '20% off · Min. order ₹499', valid: 'Active until Sunday' },
        { code: 'FIRSTBITE', desc: '₹100 off first order', valid: 'Ongoing promotion' },
        { code: 'LUNCHHOUR', desc: '15% off · 12 PM–3 PM', valid: 'Daily weekdays' },
    ];
    return (<View style={styles.container}>
      <AppHeader title="Offers & coupons" onBack={goBack} action={<TouchableOpacity style={styles.headerBtn}>
            <AppIcon name="plus" size={20} color={colors.black}/>
          </TouchableOpacity>}/>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.eyebrow}>3 ACTIVE OFFERS</Text>

        <View style={styles.offersList}>
          {offers.map((offer) => (<AppCard key={offer.code} style={styles.offerCard}>
              <View style={styles.offerInfo}>
                <View style={styles.codeRow}>
                  <Text style={styles.offerCode}>{offer.code}</Text>
                  <View style={styles.activeBadge}>
                    <Text style={styles.activeBadgeText}>ACTIVE</Text>
                  </View>
                </View>
                <Text style={styles.offerDesc}>{offer.desc}</Text>
                <Text style={styles.offerValid}>{offer.valid}</Text>
              </View>
              <AppIcon name="chevron" size={18} color={colors.charcoal}/>
            </AppCard>))}
        </View>

        <AppButton icon={<AppIcon name="plus" size={16} color={colors.white}/>} style={styles.createBtn}>
          Create new offer
        </AppButton>
      </ScrollView>
    </View>);
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F7F6',
    },
    headerBtn: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        padding: 18,
        paddingBottom: 28,
    },
    eyebrow: {
        fontSize: 10,
        fontWeight: '700',
        fontFamily: 'Poppins, sans-serif',
        letterSpacing: 1.4,
        color: colors.terracotta,
        marginBottom: 14,
    },
    offersList: {
        gap: 12,
        marginBottom: 24,
    },
    offerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    offerInfo: {
        flex: 1,
    },
    codeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 4,
    },
    offerCode: {
        fontSize: 13,
        fontWeight: '700',
        fontFamily: 'Poppins, sans-serif',
        color: colors.black,
    },
    activeBadge: {
        backgroundColor: 'rgba(16, 185, 129, 0.12)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
    },
    activeBadgeText: {
        fontSize: 8.5,
        fontFamily: 'Poppins, sans-serif',
        fontWeight: '700',
        color: colors.success,
    },
    offerDesc: {
        fontSize: 11,
        fontFamily: 'DM Sans, sans-serif',
        color: colors.charcoal,
        marginBottom: 2,
    },
    offerValid: {
        fontSize: 9,
        fontFamily: 'DM Sans, sans-serif',
        color: colors.warmGrey,
    },
    createBtn: {
        marginTop: 8,
    },
});
