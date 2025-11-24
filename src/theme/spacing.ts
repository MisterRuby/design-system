// Spacing Scale (T-shirt sizes)
export const spacing = {
  none: '0px',       // 0px
  xxs: '4px',        // 4px
  xs: '8px',         // 8px
  sm: '12px',        // 12px
  md: '16px',        // 16px
  lg: '20px',        // 20px
  xl: '24px',        // 24px
  '2xl': '32px',     // 32px
  '3xl': '40px',     // 40px
  '4xl': '48px',     // 48px
  '5xl': '64px',     // 64px
  '6xl': '80px',     // 80px
  '7xl': '96px',     // 96px
  '8xl': '128px',    // 128px
  '9xl': '160px',    // 160px
  '10xl': '192px',   // 192px
  '11xl': '224px',   // 224px
  '12xl': '256px',   // 256px
};

// Semantic Spacing (Common use cases)
export const semanticSpacing = {
  // Component Internal Spacing
  componentPaddingSmall: spacing.xs,      // 8px
  componentPaddingMedium: spacing.md,     // 16px
  componentPaddingLarge: spacing.xl,      // 24px

  // Gaps between related elements
  gapTiny: spacing.xxs,                   // 4px
  gapSmall: spacing.xs,                   // 8px
  gapMedium: spacing.md,                  // 16px
  gapLarge: spacing.xl,                   // 24px
  gapXLarge: spacing['2xl'],              // 32px

  // Margins for sections
  sectionMarginSmall: spacing.xl,         // 24px
  sectionMarginMedium: spacing['4xl'],    // 48px
  sectionMarginLarge: spacing['6xl'],     // 80px

  // Container padding
  containerPaddingMobile: spacing.md,     // 16px
  containerPaddingTablet: spacing.xl,     // 24px
  containerPaddingDesktop: spacing['2xl'], // 32px

  // Form spacing
  formFieldGap: spacing.md,               // 16px
  formSectionGap: spacing['2xl'],         // 32px

  // Card spacing
  cardPadding: spacing.md,                // 16px
  cardGap: spacing.md,                    // 16px

  // Button spacing
  buttonPaddingSmall: `${spacing.xxs} ${spacing.xs}`,     // 4px 8px
  buttonPaddingMedium: `${spacing.xs} ${spacing.md}`,     // 8px 16px
  buttonPaddingLarge: `${spacing.sm} ${spacing.xl}`,      // 12px 24px
};

// Layout Constants
export const layout = {
  // Container max widths
  containerMaxWidth: '1200px',
  contentMaxWidth: '800px',
  sidebarWidth: '240px',

  // Common heights
  headerHeight: '64px',
  footerHeight: '80px',
  navigationHeight: '48px',

  // Minimum touch target size (for accessibility)
  minTouchTarget: '44px',
};

// Grid System
export const grid = {
  columns: 12,
  gutterWidth: spacing.md,        // 16px
  marginWidth: spacing.md,        // 16px

  // Breakpoint specific gutters
  gutterMobile: spacing.md,       // 16px
  gutterTablet: spacing.xl,       // 24px
  gutterDesktop: spacing['2xl'],  // 32px
};

// Types
export type SpacingKey = keyof typeof spacing;
export type SemanticSpacingKey = keyof typeof semanticSpacing;
export type LayoutKey = keyof typeof layout;
export type GridKey = keyof typeof grid;