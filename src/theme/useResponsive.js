import { useWindowDimensions } from 'react-native';

export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1440,
};

export const useResponsive = () => {
  const { width, height } = useWindowDimensions();

  const isMobile = width < BREAKPOINTS.mobile;
  const isTablet = width >= BREAKPOINTS.mobile && width < BREAKPOINTS.tablet;
  const isDesktop = width >= BREAKPOINTS.tablet;
  const isWide = width >= BREAKPOINTS.desktop;

  const breakpoint = isMobile
    ? 'mobile'
    : isTablet
    ? 'tablet'
    : isWide
    ? 'wide'
    : 'desktop';

  // Responsive padding
  const contentPadding = isMobile ? 16 : isTablet ? 24 : 32;

  // Max width for desktop content containers
  const maxContentWidth = 1400;

  // Number of grid columns for metric cards or items
  const gridColumns = isMobile ? 1 : isTablet ? 2 : isWide ? 4 : 3;

  /**
   * Helper to pick a value based on the current breakpoint
   * @param {{ mobile?: any, tablet?: any, desktop?: any, wide?: any, default?: any }} options
   */
  const selectResponsive = (options) => {
    if (isWide && options.wide !== undefined) return options.wide;
    if (isDesktop && options.desktop !== undefined) return options.desktop;
    if (isTablet && options.tablet !== undefined) return options.tablet;
    if (isMobile && options.mobile !== undefined) return options.mobile;
    return options.default !== undefined ? options.default : options.mobile;
  };

  return {
    width,
    height,
    isMobile,
    isTablet,
    isDesktop,
    isWide,
    breakpoint,
    contentPadding,
    maxContentWidth,
    gridColumns,
    selectResponsive,
  };
};
