import React, { createContext, useContext, useState, useEffect } from 'react';

export const SCREEN_TO_PATH = {
  // Onboarding & Auth
  'splash': '/',
  'signin': '/signin',
  'role': '/onboarding/business-type',
  'phone': '/onboarding/mobile',
  'business': '/onboarding/business-details',
  'tax': '/onboarding/tax-bank',
  'address': '/onboarding/location',
  'kyc': '/onboarding/kyc',
  'photos': '/onboarding/store-photos',
  'terms': '/onboarding/agreement',
  'pending': '/onboarding/verification-pending',
  'approved': '/onboarding/approval-success',

  // Restaurant
  'restaurant-home': '/dashboard',
  'incoming': '/orders/incoming',
  'active': '/orders/active',
  'order-detail': '/orders/detail',
  'menu': '/menu',
  'menu-item': '/menu/edit',
  'offers': '/offers',
  'hours': '/operating-hours',
  'delivery': '/delivery-settings',
  'reviews': '/reviews',
  'restaurant-payout': '/payouts',
  'support': '/support',

  // Grocery
  'grocery-home': '/grocery/dashboard',
  'catalog': '/grocery/catalog',
  'product': '/grocery/product',
  'import': '/grocery/import',
  'inventory': '/grocery/inventory',
  'low-stock': '/grocery/low-stock',
  'picking': '/grocery/picking',
  'analytics': '/grocery/analytics',

  // Shared
  'notifications': '/notifications',
  'account': '/account',
  'bank': '/account/bank',
  'stores': '/account/stores',
  'profile-business': '/account/business',
  'profile-kyc': '/account/kyc',
  'profile-photos': '/account/photos',
  'profile-location': '/account/location',
  'onboard-outlet': '/onboarding/new-outlet',
};

export const PATH_TO_SCREEN = Object.entries(SCREEN_TO_PATH).reduce((acc, [screen, path]) => {
  acc[path] = screen;
  return acc;
}, {});

const getInitialScreenFromUrl = (fallback = 'splash') => {
  if (typeof window === 'undefined') return fallback;

  // Check pathname
  const pathname = window.location.pathname.replace(/\/$/, '') || '/';
  if (PATH_TO_SCREEN[pathname]) {
    return PATH_TO_SCREEN[pathname];
  }

  // Check hash fallback (e.g. #/menu)
  if (window.location.hash) {
    const hashPath = window.location.hash.replace(/^#/, '').replace(/\/$/, '') || '/';
    if (PATH_TO_SCREEN[hashPath]) {
      return PATH_TO_SCREEN[hashPath];
    }
  }

  // Check sessionStorage
  const savedScreen = sessionStorage.getItem('rr_current_screen');
  if (savedScreen && SCREEN_TO_PATH[savedScreen]) {
    return savedScreen;
  }

  return fallback;
};

const NavigationContext = createContext(undefined);

export const NavigationProvider = ({ initialScreen = 'splash', children }) => {
  const [currentScreen, setCurrentScreen] = useState(() => getInitialScreenFromUrl(initialScreen));
  const [history, setHistory] = useState([currentScreen]);
  const [params, setParams] = useState({});

  // Sync state with URL history
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const path = SCREEN_TO_PATH[currentScreen] || '/';
    const currentPath = window.location.pathname.replace(/\/$/, '') || '/';

    if (currentPath !== path) {
      window.history.replaceState({ screen: currentScreen, params }, '', path);
    }
    sessionStorage.setItem('rr_current_screen', currentScreen);

    const handlePopState = (event) => {
      let targetScreen = null;
      if (event.state && event.state.screen) {
        targetScreen = event.state.screen;
        if (event.state.params) {
          setParams(event.state.params);
        }
      } else {
        const p = window.location.pathname.replace(/\/$/, '') || '/';
        targetScreen = PATH_TO_SCREEN[p] || 'splash';
      }

      if (targetScreen) {
        setCurrentScreen(targetScreen);
        sessionStorage.setItem('rr_current_screen', targetScreen);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentScreen, params]);

  const navigate = (screen, newParams) => {
    if (newParams) {
      setParams(newParams);
    }

    const path = SCREEN_TO_PATH[screen] || '/';
    if (typeof window !== 'undefined') {
      window.history.pushState({ screen, params: newParams || {} }, '', path);
      sessionStorage.setItem('rr_current_screen', screen);
    }

    setHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back();
    } else if (history.length > 1) {
      const nextHistory = [...history];
      nextHistory.pop();
      const previousScreen = nextHistory[nextHistory.length - 1];
      setHistory(nextHistory);
      setCurrentScreen(previousScreen);
      if (typeof window !== 'undefined') {
        const path = SCREEN_TO_PATH[previousScreen] || '/';
        window.history.replaceState({ screen: previousScreen }, '', path);
      }
    }
  };

  return (
    <NavigationContext.Provider
      value={{
        currentScreen,
        navigate,
        goBack,
        history,
        params,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useAppNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useAppNavigation must be used within a NavigationProvider');
  }
  return context;
};
