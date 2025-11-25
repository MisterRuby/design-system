import { spacing } from './spacing';

// Breakpoints
export const breakpoints = {
  xs: '0px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  '2xl': '1400px',
} as const;

// Grid System
export const grid = {
  // 기본 설정
  columns: 12,

  // Gutter (열 사이 간격)
  gutter: {
    xs: spacing.md,    // 16px
    sm: spacing.md,    // 16px
    md: spacing.xl,    // 24px
    lg: spacing['2xl'], // 32px
    xl: spacing['2xl'], // 32px
    '2xl': spacing['2xl'], // 32px
  },

  // Container 최대 너비
  container: {
    xs: '100%',
    sm: '540px',
    md: '720px',
    lg: '960px',
    xl: '1140px',
    '2xl': '1320px',
  },

  // Container 패딩
  containerPadding: {
    xs: spacing.md,    // 16px
    sm: spacing.md,    // 16px
    md: spacing.xl,    // 24px
    lg: spacing.xl,    // 24px
    xl: spacing['2xl'], // 32px
    '2xl': spacing['2xl'], // 32px
  },
} as const;

// Grid 헬퍼 함수들
export const gridHelpers = {
  // 컬럼 너비 계산 (percentage)
  getColumnWidth: (columns: number, totalColumns: number = grid.columns): string => {
    return `${(columns / totalColumns) * 100}%`;
  },

  // offset 계산
  getColumnOffset: (offset: number, totalColumns: number = grid.columns): string => {
    return `${(offset / totalColumns) * 100}%`;
  },

  // 미디어 쿼리 생성
  mediaQuery: (breakpoint: keyof typeof breakpoints): string => {
    return `@media (min-width: ${breakpoints[breakpoint]})`;
  },

  // Container CSS 생성
  getContainerCSS: (): string => {
    return `
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      padding-left: ${grid.containerPadding.xs};
      padding-right: ${grid.containerPadding.xs};

      ${gridHelpers.mediaQuery('sm')} {
        max-width: ${grid.container.sm};
        padding-left: ${grid.containerPadding.sm};
        padding-right: ${grid.containerPadding.sm};
      }

      ${gridHelpers.mediaQuery('md')} {
        max-width: ${grid.container.md};
        padding-left: ${grid.containerPadding.md};
        padding-right: ${grid.containerPadding.md};
      }

      ${gridHelpers.mediaQuery('lg')} {
        max-width: ${grid.container.lg};
        padding-left: ${grid.containerPadding.lg};
        padding-right: ${grid.containerPadding.lg};
      }

      ${gridHelpers.mediaQuery('xl')} {
        max-width: ${grid.container.xl};
        padding-left: ${grid.containerPadding.xl};
        padding-right: ${grid.containerPadding.xl};
      }

      ${gridHelpers.mediaQuery('2xl')} {
        max-width: ${grid.container['2xl']};
        padding-left: ${grid.containerPadding['2xl']};
        padding-right: ${grid.containerPadding['2xl']};
      }
    `;
  },

  // Row CSS 생성
  getRowCSS: (): string => {
    return `
      display: flex;
      flex-wrap: wrap;
      margin-left: -${grid.gutter.xs};
      margin-right: -${grid.gutter.xs};

      ${gridHelpers.mediaQuery('sm')} {
        margin-left: -${grid.gutter.sm};
        margin-right: -${grid.gutter.sm};
      }

      ${gridHelpers.mediaQuery('md')} {
        margin-left: -${grid.gutter.md};
        margin-right: -${grid.gutter.md};
      }

      ${gridHelpers.mediaQuery('lg')} {
        margin-left: -${grid.gutter.lg};
        margin-right: -${grid.gutter.lg};
      }

      ${gridHelpers.mediaQuery('xl')} {
        margin-left: -${grid.gutter.xl};
        margin-right: -${grid.gutter.xl};
      }

      ${gridHelpers.mediaQuery('2xl')} {
        margin-left: -${grid.gutter['2xl']};
        margin-right: -${grid.gutter['2xl']};
      }
    `;
  },

  // Column CSS 생성
  getColumnCSS: (columns?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  }, offset?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  }): string => {
    let css = `
      position: relative;
      width: 100%;
      padding-left: ${grid.gutter.xs};
      padding-right: ${grid.gutter.xs};
    `;

    if (columns?.xs) {
      css += `
        flex: 0 0 ${gridHelpers.getColumnWidth(columns.xs)};
        max-width: ${gridHelpers.getColumnWidth(columns.xs)};
      `;
    }

    if (offset?.xs) {
      css += `
        margin-left: ${gridHelpers.getColumnOffset(offset.xs)};
      `;
    }

    // Responsive breakpoints
    (['sm', 'md', 'lg', 'xl', '2xl'] as const).forEach((bp) => {
      css += `
        ${gridHelpers.mediaQuery(bp)} {
          padding-left: ${grid.gutter[bp]};
          padding-right: ${grid.gutter[bp]};
      `;

      if (columns?.[bp]) {
        css += `
          flex: 0 0 ${gridHelpers.getColumnWidth(columns[bp]!)};
          max-width: ${gridHelpers.getColumnWidth(columns[bp]!)};
        `;
      }

      if (offset?.[bp]) {
        css += `
          margin-left: ${gridHelpers.getColumnOffset(offset[bp]!)};
        `;
      }

      css += '}';
    });

    return css;
  },
};

// Common grid template presets
export const gridTemplates = {
  twoColumn: "repeat(2, 1fr)",
  threeColumn: "repeat(3, 1fr)",
  twelveColumns: `repeat(${grid.columns}, 1fr)`,
  // Auto-fit with minimum 3/12 columns (~25%) per item
  autoFitQuarter: `repeat(auto-fit, minmax(${gridHelpers.getColumnWidth(3)}, 1fr))`,
  // Auto-fit with minimum 4/12 columns (~33%) per item
  autoFitThird: `repeat(auto-fit, minmax(${gridHelpers.getColumnWidth(4)}, 1fr))`,
  // Sidebar + content layout (1/4 + 3/4)
  sidebarContent: `${gridHelpers.getColumnWidth(3)} ${gridHelpers.getColumnWidth(9)}`,
} as const;

// Types
export type Breakpoint = keyof typeof breakpoints;

// 의미론적 그리드 컬럼 타입 (일관된 디자인을 위한 제한된 선택)
export type GridColumns =
  | 1   // 특수 용도 (선 형태 요소)
  | 2   // 6열 카드 그리드 (2 + 2 + 2 + 2 + 2 + 2)
  | 3   // 1/4 폭, 4열 카드 그리드
  | 4   // 1/3 폭, 3열 카드 그리드
  | 6   // 1/2 폭, 2열 카드 그리드
  | 8   // 2/3 폭
  | 9   // 3/4 폭
  | 12; // 전체 폭


export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

export interface GridConfig {
  columns?: ResponsiveValue<GridColumns>;
  offset?: ResponsiveValue<GridColumns>;
}

export type GridTemplateKey = keyof typeof gridTemplates;
