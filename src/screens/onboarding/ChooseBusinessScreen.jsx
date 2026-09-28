import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { AppHeader } from '../../components/common/AppHeader';
import { AppLogo } from '../../components/common/AppLogo';
import { AppIcon } from '../../components/common/AppIcon';
import { AppCard } from '../../components/common/AppCard';
import { useResponsive } from '../../theme/useResponsive';
import { useAppNavigation } from '../../navigation/NavigationContext';
import { useOnboarding } from '../../context/OnboardingContext';
import { useVendor } from '../../context/VendorContext';

export const ChooseBusinessScreen = () => {
  const { navigate, goBack } = useAppNavigation();
  const { setVendorRole } = useOnboarding();
  const { setVendorType } = useVendor();
  const { isMobile } = useResponsive();

  const handleSelectRole = (role) => {
    setVendorRole(role);
    setVendorType(role);
    navigate('phone');
  };

  return (
    <View style={styles.container}>
      {isMobile && <AppHeader onBack={goBack} action={<View style={{ width: 40 }} />} />}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          !isMobile && styles.scrollContentDesktop,
        ]}
      >
        {isMobile && (
          <View style={styles.brandRow}>
            <AppLogo />
          </View>
        )}

        <View style={styles.headingSection}>
          <Text style={styles.eyebrow}>GET STARTED</Text>
          <Text style={styles.title}>What kind of business do you run?</Text>
          <Text style={styles.subtitle}>
            Choose your merchant profile. You can register multiple outlets later.
          </Text>
        </View>

        <View style={styles.cardsContainer}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => handleSelectRole('restaurant')}>
            <AppCard style={styles.roleCard}>
              <View style={styles.roleIconBox}>
                <AppIcon name="orders" size={26} color={colors.terracotta} />
              </View>
              <View style={styles.roleInfo}>
                <Text style={styles.roleTitle}>Become a Restaurant Vendor</Text>
                <Text style={styles.roleDesc}>
                  Manage kitchen orders, menus, preparation times & delivery dispatch
                </Text>
              </View>
              <AppIcon name="chevron" size={18} color={colors.charcoal} />
            </AppCard>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} onPress={() => handleSelectRole('grocery')}>
            <AppCard style={styles.roleCard}>
              <View style={styles.roleIconBox}>
                <AppIcon name="catalog" size={26} color={colors.terracotta} />
              </View>
              <View style={styles.roleInfo}>
                <Text style={styles.roleTitle}>Become a Grocery Vendor</Text>
                <Text style={styles.roleDesc}>
                  Manage product catalog, inventory tracking, picking lists & bulk imports
                </Text>
              </View>
              <AppIcon name="chevron" size={18} color={colors.charcoal} />
            </AppCard>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Already registered?{' '}
            <Text style={styles.signInLink} onPress={() => navigate('signin')}>
              Sign in to Vendor Portal
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  scrollContentDesktop: {
    padding: 36,
  },
  brandRow: {
    marginBottom: 20,
  },
  headingSection: {
    marginBottom: 24,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'Poppins, sans-serif',
    letterSpacing: 1.4,
    color: colors.terracotta,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'Poppins, sans-serif',
    color: colors.black,
    lineHeight: 28,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: 'DM Sans, sans-serif',
    color: colors.charcoal,
    lineHeight: 18,
  },
  cardsContainer: {
    gap: 16,
    marginBottom: 30,
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    minHeight: 90,
  },
  roleIconBox: {
    width: 48,
    height: 48,
    borderRadius: radius.card,
    backgroundColor: 'rgba(163, 94, 71, 0.11)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  roleInfo: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Poppins, sans-serif',
    color: colors.black,
    marginBottom: 4,
  },
  roleDesc: {
    fontSize: 11.5,
    fontFamily: 'DM Sans, sans-serif',
    color: colors.charcoal,
    lineHeight: 16,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  footerText: {
    fontSize: 12,
    fontFamily: 'DM Sans, sans-serif',
    color: colors.charcoal,
  },
  signInLink: {
    color: colors.terracotta,
    fontWeight: '600',
  },
});
