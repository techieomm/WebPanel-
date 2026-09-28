import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { AppLogo } from '../../components/common/AppLogo';
import { AppButton } from '../../components/common/AppButton';
import { useResponsive } from '../../theme/useResponsive';
import { useAppNavigation } from '../../navigation/NavigationContext';

export const SplashScreen = () => {
  const { navigate } = useAppNavigation();
  const { isMobile } = useResponsive();

  return (
    <View style={styles.container}>
      <View style={[styles.card, !isMobile && styles.cardDesktop]}>
        {/* Core Branding */}
        <View style={styles.centerContent}>
          <AppLogo scale={1.4} />
          <Text style={styles.tagline}>
            Run your business.{'\n'}We’ll move the rest.
          </Text>
        </View>

        {/* Bottom Actions */}
        <View style={styles.bottomSection}>
          <AppButton
            onPress={() => navigate('role')}
            style={styles.getStartedBtn}
          >
            Get Started as New Partner
          </AppButton>

          <TouchableOpacity
            style={styles.signInBtn}
            onPress={() => navigate('signin')}
          >
            <Text style={styles.signInText}>
              Already a partner?{' '}
              <Text style={styles.signInLink}>Sign In with OTP</Text>
            </Text>
          </TouchableOpacity>

          <Text style={styles.caption}>MERCHANT OPERATIONS</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  card: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 28,
    paddingTop: 48,
    paddingBottom: 32,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardDesktop: {
    maxWidth: 460,
    maxHeight: 560,
    borderRadius: radius.card,
    backgroundColor: colors.white,
    paddingHorizontal: 40,
    paddingVertical: 44,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 4,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  tagline: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 20,
    fontWeight: '600',
    color: colors.charcoal,
    textAlign: 'center',
    marginTop: 24,
    lineHeight: 28,
  },
  bottomSection: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  getStartedBtn: {
    minHeight: 48,
    width: '100%',
  },
  signInBtn: {
    paddingVertical: 4,
  },
  signInText: {
    fontSize: 12.5,
    fontFamily: 'DM Sans, sans-serif',
    color: colors.charcoal,
  },
  signInLink: {
    color: colors.terracotta,
    fontWeight: '600',
  },
  caption: {
    fontSize: 9,
    fontFamily: 'Poppins, sans-serif',
    letterSpacing: 2,
    color: colors.warmGrey,
    fontWeight: '600',
    marginTop: 6,
  },
});
