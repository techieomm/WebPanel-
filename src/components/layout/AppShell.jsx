import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { colors } from '../../theme/colors';
import { useResponsive } from '../../theme/useResponsive';
import { useAppNavigation } from '../../navigation/NavigationContext';
import { DesktopSidebar } from './DesktopSidebar';
import { DesktopTopNav } from './DesktopTopNav';
import { DesktopOnboardingShell } from './DesktopOnboardingShell';
import { BottomTabBar } from '../navigation/BottomTabBar';

const ONBOARDING_SCREENS = [
  'splash',
  'role',
  'phone',
  'business',
  'tax',
  'address',
  'kyc',
  'photos',
  'terms',
  'pending',
  'approved',
];

const FULLSCREEN_MODAL_SCREENS = [
  'order-detail',
  'menu-item',
  'product',
  'import',
  'picking',
  'bank',
  'stores',
  'states',
];

export const AppShell = ({ children }) => {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const { currentScreen } = useAppNavigation();

  const isOnboarding = ONBOARDING_SCREENS.includes(currentScreen);
  const hideMobileBottomBar =
    isOnboarding || FULLSCREEN_MODAL_SCREENS.includes(currentScreen);

  // 1. Splash Screen Mode (Welcome Entry)
  if (currentScreen === 'splash') {
    return (
      <SafeAreaView style={styles.mobileSafeArea}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
        <View style={styles.splashWrapper}>{children}</View>
      </SafeAreaView>
    );
  }

  // 2. Onboarding Steps Mode (role, phone, business, tax, address, kyc, photos, terms, pending, approved)
  if (isOnboarding) {
    if (isDesktop || isTablet) {
      return <DesktopOnboardingShell>{children}</DesktopOnboardingShell>;
    }

    // Mobile Onboarding
    return (
      <SafeAreaView style={styles.mobileSafeArea}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
        <View style={styles.mobileContent}>{children}</View>
      </SafeAreaView>
    );
  }

  // 3. Desktop Mode (Laptop & Desktop Displays >= 1024px)
  if (isDesktop) {
    return (
      <View style={styles.desktopRoot}>
        <DesktopSidebar />
        <View style={styles.desktopMain}>
          <DesktopTopNav />
          <View style={styles.desktopContentArea}>{children}</View>
        </View>
      </View>
    );
  }

  // 4. Tablet Mode (768px - 1023px)
  if (isTablet) {
    return (
      <View style={styles.tabletRoot}>
        <DesktopSidebar isCollapsed />
        <View style={styles.tabletMain}>
          <DesktopTopNav />
          <View style={styles.tabletContentArea}>{children}</View>
        </View>
      </View>
    );
  }

  // 5. Mobile Mode (< 768px)
  return (
    <SafeAreaView style={styles.mobileSafeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <View style={styles.mobileContent}>{children}</View>
      {!hideMobileBottomBar && <BottomTabBar />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Desktop
  desktopRoot: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    backgroundColor: colors.background,
  },
  desktopMain: {
    flex: 1,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.background,
  },
  desktopContentArea: {
    flex: 1,
    overflow: 'auto',
    backgroundColor: colors.background,
  },

  // Tablet
  tabletRoot: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    backgroundColor: colors.background,
  },
  tabletMain: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.background,
  },
  tabletContentArea: {
    flex: 1,
    overflow: 'auto',
    backgroundColor: colors.background,
  },

  // Mobile
  mobileSafeArea: {
    flex: 1,
    backgroundColor: colors.white,
    width: '100%',
    height: '100%',
  },
  mobileContent: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.background,
  },
  splashWrapper: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
});
