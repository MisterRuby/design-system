import React from 'react';
import styles from './Progress.module.css';
import { colors, fontSize } from '../../theme';
import { SemanticVariant, ComponentSize } from '../../types/common';

export interface ProgressProps {
  value: number;
  max?: number;
  variant?: SemanticVariant;
  size?: ComponentSize;
  showLabel?: boolean;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  variant = 'primary',
  size = 'medium',
  showLabel = false,
  label,
  className = '',
  style = {},
  'data-testid': testId,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const variantColors: Record<SemanticVariant, string> = {
    primary: colors.semantic.primary,
    secondary: colors.semantic.secondary,
    success: colors.semantic.success,
    error: colors.semantic.error,
    warning: colors.semantic.warning,
    info: colors.semantic.info,
  };

  const sizeMap: Record<ComponentSize, { height: string; fontSize: string }> = {
    small: { height: '4px', fontSize: fontSize.xs },
    medium: { height: '8px', fontSize: fontSize.sm },
    large: { height: '12px', fontSize: fontSize.md },
  };

  const sizeStyles = sizeMap[size] ?? sizeMap.medium;
  const variantColor = variantColors[variant] ?? colors.semantic.primary;

  const displayLabel = showLabel ? (label ?? `${Math.round(percentage)}%`) : '';

  const cssVars: Record<string, string | number> = {
    '--progress-height': sizeStyles.height,
    '--progress-font-size': sizeStyles.fontSize,
    '--progress-color': variantColor,
    '--progress-track-color': colors.background.gray,
    '--progress-label-color': colors.semantic.text,
    '--progress-muted-color': colors.semantic.muted,
    '--progress-percentage': `${percentage}%`,
  };

  return (
    <div
      className={[styles.container, className].filter(Boolean).join(' ')}
      style={{
        ...(cssVars as React.CSSProperties),
        width: '100%',
        ...style,
      }}
      data-testid={testId}
    >
      {displayLabel && (
        <div className={styles.labelRow}>
          <span>{displayLabel}</span>
          {showLabel && !label && (
            <span className={styles.labelSecondary}>
              {Math.round(value)} / {Math.round(max)}
            </span>
          )}
        </div>
      )}
      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label || `진행률 ${Math.round(percentage)}%`}
      >
        <div
          className={styles.fill}
        >
          {/* 진행 중 애니메이션 효과 */}
          {percentage < 100 && percentage > 0 && (
            <div className={styles.shimmer} />
          )}
        </div>
      </div>
    </div>
  );
};
