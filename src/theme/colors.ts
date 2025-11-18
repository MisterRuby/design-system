export const colors = {
  // Primary colors
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },

  // Gray colors
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },

  // Semantic colors
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },

  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },

  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },

  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },

  // Semantic colors - 모든 컴포넌트에서 공통 사용
  semantic: {
    primary: '#2563eb', // blue-600 - 브랜드 주색상
    secondary: '#6b7280', // gray-500 - 보조색상
    success: '#15803d', // green-700 - 성공
    error: '#dc2626', // red-600 - 오류
    warning: '#d97706', // amber-600 - 경고
    info: '#0891b2', // cyan-600 - 정보
    muted: '#9ca3af', // gray-400 - 비활성
    // Text specific
    text: '#374151', // gray-700 - 기본 텍스트 (가독성)
  },

  border: {
    default: '#d1d5db', // gray-300
    primary: '#2563eb', // blue-600 - primary와 동일
    secondary: '#6b7280', // gray-500 - secondary와 동일
    success: '#15803d', // green-700 - success와 동일
    error: '#dc2626', // red-600 - error와 동일
    warning: '#d97706', // amber-600 - warning과 동일
    info: '#0891b2', // cyan-600 - info와 동일
    focus: {
      primary: '#2563eb', // blue-600 - primary와 동일
      secondary: '#6b7280', // gray-500 - secondary와 동일
      success: '#15803d', // green-700 - success와 동일
      error: '#dc2626', // red-600 - error와 동일
      warning: '#d97706', // amber-600 - warning과 동일
      info: '#0891b2', // cyan-600 - info와 동일
    }
  },

  background: {
    white: '#ffffff',
    gray: '#f3f4f6', // gray-100
    disabled: '#f3f4f6', // gray-100
  },

  // Focus ring colors with opacity
  focusRing: {
    primary: 'rgba(37, 99, 235, 0.1)', // blue-600 with 10% opacity
    secondary: 'rgba(107, 114, 128, 0.1)', // gray-500 with 10% opacity
    success: 'rgba(21, 128, 61, 0.1)', // green-700 with 10% opacity
    error: 'rgba(220, 38, 38, 0.1)', // red-600 with 10% opacity
    warning: 'rgba(217, 119, 6, 0.1)', // amber-600 with 10% opacity
    info: 'rgba(8, 145, 178, 0.1)', // cyan-600 with 10% opacity
  },
} as const;