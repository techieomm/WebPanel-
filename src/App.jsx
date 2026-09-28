import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationProvider } from './navigation/NavigationContext';
import { VendorProvider } from './context/VendorContext';
import { OnboardingProvider } from './context/OnboardingContext';
import { OrderProvider } from './context/OrderContext';
import { MenuProvider } from './context/MenuContext';
import { RootNavigator } from './navigation/RootNavigator';

export default function App() {
  return (
    <View style={styles.appContainer}>
      <VendorProvider>
        <OnboardingProvider>
          <OrderProvider>
            <MenuProvider>
              <NavigationProvider initialScreen="splash">
                <RootNavigator />
              </NavigationProvider>
            </MenuProvider>
          </OrderProvider>
        </OnboardingProvider>
      </VendorProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#F8F7F6',
  },
});
