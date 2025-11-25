import { colors } from './colors';

// Border radius values
export const borderRadius = {
  none: '0px',
  xs: '2px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  '3xl': '24px',
  full: '9999px',
} as const;

// Border width values
export const borderWidth = {
  0: '0px',
  1: '1px',
  2: '2px',
  3: '3px',
  4: '4px',
  8: '8px',
} as const;

// Semantic border styles
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

// Border style combinations
export const borderStyles = {
  solid: 'solid',
  dashed: 'dashed',
  dotted: 'dotted',
  double: 'double',
  none: 'none',
} as const;

// Common border combinations for components
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

// TypeScript types
export type BorderRadiusKey = keyof typeof borderRadius;
export type BorderWidthKey = keyof typeof borderWidth;
export type SemanticBorderKey = keyof typeof semanticBorders;
export type BorderStyleKey = keyof typeof borderStyles;
export type ComponentBorderKey = keyof typeof componentBorders;