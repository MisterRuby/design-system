// Shadow System (Elevation levels)
export const shadows = {
  // No shadow
  none: 'none',

  // Basic shadows (elevation levels)
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',              // 1dp - Very subtle
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',  // 2dp - Cards
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // 4dp - Raised elements
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // 8dp - Dropdowns
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', // 12dp - Modals
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',     // 16dp - High elevation

  // Inset shadows
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',     // Inner shadow for inputs

  // Colored shadows
  primary: '0 8px 16px -4px rgba(59, 130, 246, 0.4), 0 4px 8px -2px rgba(59, 130, 246, 0.2)',   // Primary color shadow
  success: '0 8px 16px -4px rgba(34, 197, 94, 0.4), 0 4px 8px -2px rgba(34, 197, 94, 0.2)',    // Success color shadow
  error: '0 8px 16px -4px rgba(239, 68, 68, 0.4), 0 4px 8px -2px rgba(239, 68, 68, 0.2)',      // Error color shadow
  warning: '0 8px 16px -4px rgba(245, 158, 11, 0.4), 0 4px 8px -2px rgba(245, 158, 11, 0.2)',   // Warning color shadow
};

// Semantic shadows (Common use cases)
export const semanticShadows = {
  // Card shadows
  cardHover: shadows.md,
  cardResting: shadows.sm,
  cardPressed: shadows.xs,

  // Button shadows
  buttonResting: shadows.sm,
  buttonHover: shadows.md,
  buttonPressed: shadows.xs,
  buttonPrimary: shadows.primary,
  buttonSuccess: shadows.success,
  buttonError: shadows.error,
  buttonWarning: shadows.warning,

  // Modal shadows
  modalBackdrop: '0 0 0 1px rgba(0, 0, 0, 0.05), 0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  modalContent: shadows['2xl'],

  // Dropdown shadows
  dropdown: shadows.lg,
  popover: shadows.lg,
  tooltip: shadows.md,

  // Form element shadows
  inputFocus: '0 0 0 3px rgba(59, 130, 246, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  inputError: '0 0 0 3px rgba(239, 68, 68, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  inputSuccess: '0 0 0 3px rgba(34, 197, 94, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05)',

  // Navigation shadows
  header: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  sidebar: '2px 0 8px 0 rgba(0, 0, 0, 0.1)',

  // Loading states
  skeleton: shadows.inner,
  loadingShimmer: '0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 1px rgba(0, 0, 0, 0.1)',
};

// Types
export type ShadowKey = keyof typeof shadows;
export type SemanticShadowKey = keyof typeof semanticShadows;