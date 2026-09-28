import React from 'react';
import { useAppNavigation } from './NavigationContext';
import { AppShell } from '../components/layout/AppShell';

// Onboarding Screens (01 - 11)
import { SplashScreen } from '../screens/onboarding/SplashScreen';
import { SignInScreen } from '../screens/auth/SignInScreen';
import { ChooseBusinessScreen } from '../screens/onboarding/ChooseBusinessScreen';
import { MobileVerificationScreen } from '../screens/onboarding/MobileVerificationScreen';
import { BusinessDetailsScreen } from '../screens/onboarding/BusinessDetailsScreen';
import { TaxBankScreen } from '../screens/onboarding/TaxBankScreen';
import { AddressRadiusScreen } from '../screens/onboarding/AddressRadiusScreen';
import { KycDocumentsScreen } from '../screens/onboarding/KycDocumentsScreen';
import { StorePhotosScreen } from '../screens/onboarding/StorePhotosScreen';
import { TermsConditionsScreen } from '../screens/onboarding/TermsConditionsScreen';
import { VerificationPendingScreen } from '../screens/onboarding/VerificationPendingScreen';
import { ApprovalSuccessScreen } from '../screens/onboarding/ApprovalSuccessScreen';

// Restaurant Screens (12 - 23)
import { RestaurantHomeScreen } from '../screens/restaurant/RestaurantHomeScreen';
import { IncomingOrdersScreen } from '../screens/restaurant/IncomingOrdersScreen';
import { ActiveOrdersScreen } from '../screens/restaurant/ActiveOrdersScreen';
import { OrderDetailScreen } from '../screens/restaurant/OrderDetailScreen';
import { MenuManagementScreen } from '../screens/restaurant/MenuManagementScreen';
import { AddMenuItemScreen } from '../screens/restaurant/AddMenuItemScreen';
import { OffersScreen } from '../screens/restaurant/OffersScreen';
import { OperatingHoursScreen } from '../screens/restaurant/OperatingHoursScreen';
import { DeliverySettingsScreen } from '../screens/restaurant/DeliverySettingsScreen';
import { ReviewsRatingsScreen } from '../screens/restaurant/ReviewsRatingsScreen';
import { PayoutReconciliationScreen } from '../screens/restaurant/PayoutReconciliationScreen';
import { SupportCenterScreen } from '../screens/restaurant/SupportCenterScreen';

// Grocery Screens (24 - 31)
import { GroceryHomeScreen } from '../screens/grocery/GroceryHomeScreen';
import { ProductCatalogScreen } from '../screens/grocery/ProductCatalogScreen';
import { AddProductScreen } from '../screens/grocery/AddProductScreen';
import { BulkImportScreen } from '../screens/grocery/BulkImportScreen';
import { InventoryScreen } from '../screens/grocery/InventoryScreen';
import { LowStockAlertsScreen } from '../screens/grocery/LowStockAlertsScreen';
import { OrderPickingScreen } from '../screens/grocery/OrderPickingScreen';
import { SalesAnalyticsScreen } from '../screens/grocery/SalesAnalyticsScreen';

// Shared Screens (32 - 36)
import { NotificationsScreen } from '../screens/shared/NotificationsScreen';
import { ProfileSettingsScreen } from '../screens/shared/ProfileSettingsScreen';
import { BankAccountScreen } from '../screens/shared/BankAccountScreen';
import { StoreSwitcherScreen } from '../screens/shared/StoreSwitcherScreen';
import { EmptyErrorStatesScreen } from '../screens/shared/EmptyErrorStatesScreen';
import { ProfileSectionDetailScreen } from '../screens/shared/ProfileSectionDetailScreen';

export const RootNavigator = () => {
  const { currentScreen } = useAppNavigation();

  const renderScreen = () => {
    switch (currentScreen) {
      // Onboarding
      case 'splash':
        return <SplashScreen />;
      case 'signin':
        return <SignInScreen />;
      case 'role':
        return <ChooseBusinessScreen />;
      case 'phone':
        return <MobileVerificationScreen />;
      case 'business':
        return <BusinessDetailsScreen />;
      case 'tax':
        return <TaxBankScreen />;
      case 'address':
        return <AddressRadiusScreen />;
      case 'kyc':
        return <KycDocumentsScreen />;
      case 'photos':
        return <StorePhotosScreen />;
      case 'terms':
        return <TermsConditionsScreen />;
      case 'pending':
        return <VerificationPendingScreen />;
      case 'approved':
        return <ApprovalSuccessScreen />;

      // Restaurant
      case 'restaurant-home':
        return <RestaurantHomeScreen />;
      case 'incoming':
        return <IncomingOrdersScreen />;
      case 'active':
        return <ActiveOrdersScreen />;
      case 'order-detail':
        return <OrderDetailScreen />;
      case 'menu':
        return <MenuManagementScreen />;
      case 'menu-item':
        return <AddMenuItemScreen />;
      case 'offers':
        return <OffersScreen />;
      case 'hours':
        return <OperatingHoursScreen />;
      case 'delivery':
        return <DeliverySettingsScreen />;
      case 'reviews':
        return <ReviewsRatingsScreen />;
      case 'restaurant-payout':
        return <PayoutReconciliationScreen />;
      case 'support':
        return <SupportCenterScreen />;

      // Grocery
      case 'grocery-home':
        return <GroceryHomeScreen />;
      case 'catalog':
        return <ProductCatalogScreen />;
      case 'product':
        return <AddProductScreen />;
      case 'import':
        return <BulkImportScreen />;
      case 'inventory':
        return <InventoryScreen />;
      case 'low-stock':
        return <LowStockAlertsScreen />;
      case 'picking':
        return <OrderPickingScreen />;
      case 'analytics':
        return <SalesAnalyticsScreen />;

      // Shared
      case 'notifications':
        return <NotificationsScreen />;
      case 'account':
        return <ProfileSettingsScreen />;
      case 'bank':
        return <BankAccountScreen />;
      case 'stores':
        return <StoreSwitcherScreen />;
      case 'profile-business':
        return <ProfileSectionDetailScreen section="business" />;
      case 'profile-kyc':
        return <ProfileSectionDetailScreen section="kyc" />;
      case 'profile-photos':
        return <ProfileSectionDetailScreen section="photos" />;
      case 'profile-location':
        return <ProfileSectionDetailScreen section="location" />;
      case 'onboard-outlet':
        return <ChooseBusinessScreen />;
      case 'states':
        return <EmptyErrorStatesScreen />;

      default:
        return <RestaurantHomeScreen />;
    }
  };

  return <AppShell>{renderScreen()}</AppShell>;
};
