// CSS variable-backed design tokens
export const colors = {
  primary: {
    50: 'var(--color-primary-50)',
    100: 'var(--color-primary-100)',
    200: 'var(--color-primary-200)',
    300: 'var(--color-primary-300)',
    400: 'var(--color-primary-400)',
    500: 'var(--color-primary-500)',
    600: 'var(--color-primary-600)',
    700: 'var(--color-primary-700)',
    800: 'var(--color-primary-800)',
    900: 'var(--color-primary-900)',
  },
  gray: {
    50: 'var(--color-gray-50)',
    100: 'var(--color-gray-100)',
    200: 'var(--color-gray-200)',
    300: 'var(--color-gray-300)',
    400: 'var(--color-gray-400)',
    500: 'var(--color-gray-500)',
    600: 'var(--color-gray-600)',
    700: 'var(--color-gray-700)',
    800: 'var(--color-gray-800)',
    900: 'var(--color-gray-900)',
  },
  success: {
    50: 'var(--color-success-50)',
    100: 'var(--color-success-100)',
    200: 'var(--color-success-200)',
    300: 'var(--color-success-300)',
    400: 'var(--color-success-400)',
    500: 'var(--color-success-500)',
    600: 'var(--color-success-600)',
    700: 'var(--color-success-700)',
    800: 'var(--color-success-800)',
    900: 'var(--color-success-900)',
  },
  error: {
    50: 'var(--color-error-50)',
    100: 'var(--color-error-100)',
    200: 'var(--color-error-200)',
    300: 'var(--color-error-300)',
    400: 'var(--color-error-400)',
    500: 'var(--color-error-500)',
    600: 'var(--color-error-600)',
    700: 'var(--color-error-700)',
    800: 'var(--color-error-800)',
    900: 'var(--color-error-900)',
  },
  warning: {
    50: 'var(--color-warning-50)',
    100: 'var(--color-warning-100)',
    200: 'var(--color-warning-200)',
    300: 'var(--color-warning-300)',
    400: 'var(--color-warning-400)',
    500: 'var(--color-warning-500)',
    600: 'var(--color-warning-600)',
    700: 'var(--color-warning-700)',
    800: 'var(--color-warning-800)',
    900: 'var(--color-warning-900)',
  },
  info: {
    50: 'var(--color-info-50)',
    100: 'var(--color-info-100)',
    200: 'var(--color-info-200)',
    300: 'var(--color-info-300)',
    400: 'var(--color-info-400)',
    500: 'var(--color-info-500)',
    600: 'var(--color-info-600)',
    700: 'var(--color-info-700)',
    800: 'var(--color-info-800)',
    900: 'var(--color-info-900)',
  },
  semantic: {
    primary: 'var(--color-semantic-primary)',
    secondary: 'var(--color-semantic-secondary)',
    success: 'var(--color-semantic-success)',
    error: 'var(--color-semantic-error)',
    warning: 'var(--color-semantic-warning)',
    info: 'var(--color-semantic-info)',
    muted: 'var(--color-semantic-muted)',
    text: 'var(--color-semantic-text)',
  },
  background: {
    white: 'var(--color-background-white)',
    gray50: 'var(--color-background-gray50)',
    gray100: 'var(--color-background-gray100)',
    gray: 'var(--color-background-gray)',
    disabled: 'var(--color-background-disabled)',
  },
  text: {
    primary: 'var(--color-text-primary)',
    secondary: 'var(--color-text-secondary)',
    muted: 'var(--color-text-muted)',
  },
  border: {
    light: 'var(--color-border-light)',
    default: 'var(--color-border-default)',
    primary: 'var(--color-border-primary)',
    secondary: 'var(--color-border-secondary)',
    success: 'var(--color-border-success)',
    error: 'var(--color-border-error)',
    warning: 'var(--color-border-warning)',
    info: 'var(--color-border-info)',
    focus: {
      primary: 'var(--color-border-primary)',
      secondary: 'var(--color-border-secondary)',
      success: 'var(--color-border-success)',
      error: 'var(--color-border-error)',
      warning: 'var(--color-border-warning)',
      info: 'var(--color-border-info)',
    },
  },
  focusRing: {
    primary: 'var(--color-focus-ring-primary)',
    secondary: 'var(--color-focus-ring-secondary)',
    success: 'var(--color-focus-ring-success)',
    error: 'var(--color-focus-ring-error)',
    warning: 'var(--color-focus-ring-warning)',
    info: 'var(--color-focus-ring-info)',
  },
} as const;

export const spacing = {
  none: 'var(--spacing-none)',
  xxs: 'var(--spacing-xxs)',
  xs: 'var(--spacing-xs)',
  sm: 'var(--spacing-sm)',
  md: 'var(--spacing-md)',
  lg: 'var(--spacing-lg)',
  xl: 'var(--spacing-xl)',
  '2xl': 'var(--spacing-2xl)',
  '3xl': 'var(--spacing-3xl)',
  '4xl': 'var(--spacing-4xl)',
  '5xl': 'var(--spacing-5xl)',
  '6xl': 'var(--spacing-6xl)',
  '7xl': 'var(--spacing-7xl)',
  '8xl': 'var(--spacing-8xl)',
  '9xl': 'var(--spacing-9xl)',
  '10xl': 'var(--spacing-10xl)',
  '11xl': 'var(--spacing-11xl)',
  '12xl': 'var(--spacing-12xl)',
} as const;

export const semanticSpacing = {
  componentPaddingSmall: spacing.xs,
  componentPaddingMedium: spacing.md,
  componentPaddingLarge: spacing.xl,
  gapTiny: spacing.xxs,
  gapSmall: spacing.xs,
  gapMedium: spacing.md,
  gapLarge: spacing.xl,
  gapXLarge: spacing['2xl'],
  sectionMarginSmall: spacing.xl,
  sectionMarginMedium: spacing['4xl'],
  sectionMarginLarge: spacing['6xl'],
  containerPaddingMobile: spacing.md,
  containerPaddingTablet: spacing.xl,
  containerPaddingDesktop: spacing['2xl'],
  formFieldGap: spacing.md,
  formSectionGap: spacing['2xl'],
  cardPadding: spacing.md,
  cardGap: spacing.md,
  buttonPaddingSmall: `${spacing.xxs} ${spacing.xs}`,
  buttonPaddingMedium: `${spacing.xs} ${spacing.md}`,
  buttonPaddingLarge: `${spacing.sm} ${spacing.xl}`,
} as const;

export const layout = {
  containerMaxWidth: '1200px',
  contentMaxWidth: '800px',
  sidebarWidth: '240px',
  headerHeight: '64px',
  footerHeight: '80px',
  navigationHeight: '48px',
  minTouchTarget: '44px',
} as const;

export const fontFamily = {
  sans: 'var(--font-family-sans)',
  mono: 'var(--font-family-mono)',
};

export const fontSize = {
  xxs: 'var(--font-size-xxs)',
  xs: 'var(--font-size-xs)',
  sm: 'var(--font-size-sm)',
  md: 'var(--font-size-md)',
  lg: 'var(--font-size-lg)',
  xl: 'var(--font-size-xl)',
  '2xl': 'var(--font-size-2xl)',
  '3xl': 'var(--font-size-3xl)',
  '4xl': 'var(--font-size-4xl)',
};

export const fontWeight = {
  light: 'var(--font-weight-light)',
  normal: 'var(--font-weight-normal)',
  medium: 'var(--font-weight-medium)',
  semibold: 'var(--font-weight-semibold)',
  bold: 'var(--font-weight-bold)',
};

export const lineHeight = {
  tight: 'var(--line-height-tight)',
  snug: 'var(--line-height-snug)',
  normal: 'var(--line-height-normal)',
  relaxed: 'var(--line-height-relaxed)',
  loose: 'var(--line-height-loose)',
};

export const letterSpacing = {
  tighter: 'var(--letter-spacing-tighter)',
  tight: 'var(--letter-spacing-tight)',
  normal: 'var(--letter-spacing-normal)',
  wide: 'var(--letter-spacing-wide)',
  wider: 'var(--letter-spacing-wider)',
  widest: 'var(--letter-spacing-widest)',
};

export const typography = {
  h1: { fontSize: fontSize['4xl'], fontWeight: fontWeight.bold, lineHeight: lineHeight.tight, letterSpacing: letterSpacing.tight },
  h2: { fontSize: fontSize['3xl'], fontWeight: fontWeight.semibold, lineHeight: lineHeight.snug, letterSpacing: letterSpacing.tight },
  h3: { fontSize: fontSize['2xl'], fontWeight: fontWeight.semibold, lineHeight: lineHeight.normal, letterSpacing: letterSpacing.normal },
  h4: { fontSize: fontSize.xl, fontWeight: fontWeight.semibold, lineHeight: lineHeight.relaxed, letterSpacing: letterSpacing.normal },
  h5: { fontSize: fontSize.lg, fontWeight: fontWeight.semibold, lineHeight: lineHeight.relaxed, letterSpacing: letterSpacing.normal },
  h6: { fontSize: fontSize.md, fontWeight: fontWeight.semibold, lineHeight: lineHeight.relaxed, letterSpacing: letterSpacing.normal },
  body1: { fontSize: fontSize.md, fontWeight: fontWeight.normal, lineHeight: lineHeight.loose, letterSpacing: letterSpacing.normal },
  body2: { fontSize: fontSize.sm, fontWeight: fontWeight.normal, lineHeight: lineHeight.loose, letterSpacing: letterSpacing.normal },
  caption: { fontSize: fontSize.xs, fontWeight: fontWeight.normal, lineHeight: lineHeight.normal, letterSpacing: letterSpacing.normal },
  overline: { fontSize: fontSize.xs, fontWeight: fontWeight.semibold, lineHeight: lineHeight.normal, letterSpacing: letterSpacing.widest, textTransform: 'uppercase' as const },
};

export const borderRadius = {
  none: 'var(--radius-none)',
  xs: 'var(--radius-xs)',
  sm: 'var(--radius-sm)',
  md: 'var(--radius-md)',
  lg: 'var(--radius-lg)',
  xl: 'var(--radius-xl)',
  '2xl': 'var(--radius-2xl)',
  '3xl': 'var(--radius-3xl)',
  full: 'var(--radius-full)',
} as const;

export const borderWidth = {
  0: 'var(--border-width-0)',
  1: 'var(--border-width-1)',
  2: 'var(--border-width-2)',
  3: 'var(--border-width-3)',
  4: 'var(--border-width-4)',
  8: 'var(--border-width-8)',
} as const;

export const semanticBorders = {
  default: `1px solid ${colors.gray[200]}`,
  muted: `1px solid ${colors.gray[100]}`,
  strong: `1px solid ${colors.gray[300]}`,
  focus: `2px solid ${colors.primary[500]}`,
  error: `1px solid ${colors.error[500]}`,
  success: `1px solid ${colors.success[500]}`,
  warning: `1px solid ${colors.warning[500]}`,
  info: `1px solid ${colors.info[500]}`,
} as const;

export const borderStyles = {
  solid: 'solid',
  dashed: 'dashed',
  dotted: 'dotted',
  double: 'double',
  none: 'none',
} as const;

export const componentBorders = {
  input: {
    default: semanticBorders.default,
    focus: semanticBorders.focus,
    error: semanticBorders.error,
    disabled: semanticBorders.muted,
  },
  card: {
    default: semanticBorders.default,
    hover: semanticBorders.strong,
  },
  button: {
    outline: semanticBorders.default,
    focus: semanticBorders.focus,
  },
  divider: {
    light: semanticBorders.muted,
    default: semanticBorders.default,
    strong: semanticBorders.strong,
  },
} as const;

export const transitions = {
  fast: 'var(--transition-fast)',
  normal: 'var(--transition-normal)',
  slow: 'var(--transition-slow)',
  easeIn: 'var(--transition-ease-in)',
  easeOut: 'var(--transition-ease-out)',
  easeInOut: 'var(--transition-ease-in-out)',
} as const;

export const animations = {
  duration: {
    fast: 'var(--animation-duration-fast)',
    normal: 'var(--animation-duration-normal)',
    slow: 'var(--animation-duration-slow)',
    slower: 'var(--animation-duration-slower)',
  },
  easing: {
    ease: 'var(--animation-easing-ease)',
    easeIn: 'var(--animation-easing-ease-in)',
    easeOut: 'var(--animation-easing-ease-out)',
    easeInOut: 'var(--animation-easing-ease-in-out)',
  },
} as const;

export const opacity = {
  hidden: 'var(--opacity-hidden)',
  disabled: 'var(--opacity-disabled)',
  loading: 'var(--opacity-loading)',
  hover: 'var(--opacity-hover)',
  visible: 'var(--opacity-visible)',
} as const;

export const shadowOpacity = {
  light: 'var(--shadow-opacity-light)',
  medium: 'var(--shadow-opacity-medium)',
  heavy: 'var(--shadow-opacity-heavy)',
  dark: 'var(--shadow-opacity-dark)',
} as const;

export const shadows = {
  none: 'var(--shadow-none)',
  xs: 'var(--shadow-xs)',
  sm: 'var(--shadow-sm)',
  md: 'var(--shadow-md)',
  lg: 'var(--shadow-lg)',
  xl: 'var(--shadow-xl)',
  '2xl': 'var(--shadow-2xl)',
  inner: 'var(--shadow-inner)',
  primary: 'var(--shadow-primary)',
  success: 'var(--shadow-success)',
  error: 'var(--shadow-error)',
  warning: 'var(--shadow-warning)',
} as const;

export const semanticShadows = {
  cardHover: 'var(--shadow-semantic-card-hover)',
  cardResting: 'var(--shadow-semantic-card-resting)',
  cardPressed: 'var(--shadow-semantic-card-pressed)',
  buttonResting: 'var(--shadow-semantic-button-resting)',
  buttonHover: 'var(--shadow-semantic-button-hover)',
  buttonPressed: 'var(--shadow-semantic-button-pressed)',
  buttonPrimary: 'var(--shadow-semantic-button-primary)',
  buttonSuccess: 'var(--shadow-semantic-button-success)',
  buttonError: 'var(--shadow-semantic-button-error)',
  buttonWarning: 'var(--shadow-semantic-button-warning)',
  modalBackdrop: 'var(--shadow-semantic-modal-backdrop)',
  modalContent: 'var(--shadow-semantic-modal-content)',
  dropdown: 'var(--shadow-semantic-dropdown)',
  popover: 'var(--shadow-semantic-popover)',
  tooltip: 'var(--shadow-semantic-tooltip)',
  inputFocus: 'var(--shadow-semantic-input-focus)',
  inputError: 'var(--shadow-semantic-input-error)',
  inputSuccess: 'var(--shadow-semantic-input-success)',
  header: 'var(--shadow-semantic-header)',
  sidebar: 'var(--shadow-semantic-sidebar)',
  skeleton: 'var(--shadow-semantic-skeleton)',
  loadingShimmer: 'var(--shadow-semantic-loading-shimmer)',
} as const;

export const grid = {
  columns: 12,
  gutter: {
    sm: spacing.sm,
    md: spacing.md,
    lg: spacing.xl,
  },
  margin: {
    sm: spacing.sm,
    md: spacing.md,
    lg: spacing.xl,
  },
} as const;

export const gridTemplates = {
  twoColumn: 'repeat(2, minmax(0, 1fr))',
  threeColumn: 'repeat(3, minmax(0, 1fr))',
  twelveColumns: 'repeat(12, minmax(0, 1fr))',
  autoFitQuarter: 'repeat(auto-fit, minmax(25%, 1fr))',
} as const;

export const gridHelpers = {
  span: (count: number) => `span ${count}`,
};

export const componentHeights = {
  sm: 'var(--component-height-sm)',
  md: 'var(--component-height-md)',
  lg: 'var(--component-height-lg)',
} as const;

export const toggleSizes = {
  width: {
    sm: 'var(--toggle-width-sm)',
    md: 'var(--toggle-width-md)',
    lg: 'var(--toggle-width-lg)',
  },
  height: {
    sm: 'var(--toggle-height-sm)',
    md: 'var(--toggle-height-md)',
    lg: 'var(--toggle-height-lg)',
  },
  thumb: {
    sm: 'var(--toggle-thumb-sm)',
    md: 'var(--toggle-thumb-md)',
    lg: 'var(--toggle-thumb-lg)',
  },
  thumbOffset: 'var(--toggle-thumb-offset)',
} as const;

export const iconSizes = {
  xs: 'var(--icon-size-xs)',
  sm: 'var(--icon-size-sm)',
  md: 'var(--icon-size-md)',
  lg: 'var(--icon-size-lg)',
  xl: 'var(--icon-size-xl)',
  '2xl': 'var(--icon-size-2xl)',
  '3xl': 'var(--icon-size-3xl)',
} as const;

export const gaps = {
  xs: 'var(--gap-xs)',
  sm: 'var(--gap-sm)',
  md: 'var(--gap-md)',
} as const;

export const pixelLineHeights = {
  12: 'var(--line-height-12)',
  16: 'var(--line-height-16)',
  20: 'var(--line-height-20)',
} as const;

export const zIndex = {
  base: 'var(--z-index-base)',
  dropdown: 'var(--z-index-dropdown)',
  sticky: 'var(--z-index-sticky)',
  fixed: 'var(--z-index-fixed)',
  modalBackdrop: 'var(--z-index-modal-backdrop)',
  modal: 'var(--z-index-modal)',
  popover: 'var(--z-index-popover)',
  tooltip: 'var(--z-index-tooltip)',
} as const;

export const arrowSize = 'var(--arrow-size)';

export const transforms = {
  hoverLift: 'var(--transform-hover-lift)',
} as const;

export const tooltipMaxWidths = {
  sm: 'var(--tooltip-max-width-sm)',
  md: 'var(--tooltip-max-width-md)',
  lg: 'var(--tooltip-max-width-lg)',
} as const;

export const tabContainerWidth = 'var(--tab-container-width)';

export const cardPadding = {
  none: 'var(--card-padding-none)',
  sm: 'var(--card-padding-sm)',
  md: 'var(--card-padding-md)',
  lg: 'var(--card-padding-lg)',
} as const;
