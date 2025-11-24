import React from 'react';
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

  const getVariantColor = (variant: SemanticVariant) => {
    switch (variant) {
      case 'primary':
        return colors.semantic.primary;
      case 'secondary':
        return colors.semantic.secondary;
      case 'success':
        return colors.semantic.success;
      case 'error':
        return colors.semantic.error;
      case 'warning':
        return colors.semantic.warning;
      case 'info':
        return colors.semantic.info;
      default:
        return colors.semantic.primary;
    }
  };

  const getSizeStyles = (size: ComponentSize) => {
    switch (size) {
      case 'small':
        return { height: '4px', fontSize: fontSize.xs };
      case 'medium':
        return { height: '8px', fontSize: fontSize.sm };
      case 'large':
        return { height: '12px', fontSize: fontSize.md };
      default:
        return { height: '8px', fontSize: fontSize.sm };
    }
  };

  const sizeStyles = getSizeStyles(size);
  const variantColor = getVariantColor(variant);

  const displayLabel = label || (showLabel ? `${Math.round(percentage)}%` : '');

  return (
    <div
      className={className}
      style={{
        width: '100%',
        ...style,
      }}
      data-testid={testId}
    >
      {displayLabel && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '4px',
            fontSize: sizeStyles.fontSize,
            color: colors.semantic.text,
            fontFamily: 'inherit',
          }}
        >
          <span>{displayLabel}</span>
          {showLabel && !label && (
            <span style={{ color: colors.semantic.muted }}>
              {Math.round(value)} / {Math.round(max)}
            </span>
          )}
        </div>
      )}
      <div
        style={{
          width: '100%',
          height: sizeStyles.height,
          backgroundColor: colors.background.gray,
          borderRadius: sizeStyles.height,
          overflow: 'hidden',
          position: 'relative',
        }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label || `진행률 ${Math.round(percentage)}%`}
      >
        <div
          style={{
            height: '100%',
            width: `${percentage}%`,
            backgroundColor: variantColor,
            borderRadius: sizeStyles.height,
            transition: 'width 0.3s ease-in-out',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* 진행 중 애니메이션 효과 */}
          {percentage < 100 && percentage > 0 && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(
                  90deg,
                  transparent,
                  rgba(255, 255, 255, 0.2),
                  transparent
                )`,
                animation: 'progress-shimmer 2s infinite',
              }}
            />
          )}
        </div>
      </div>
      <style>
        {`
          @keyframes progress-shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}
      </style>
    </div>
  );
};