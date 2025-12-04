import React from 'react';
import styled, { keyframes } from 'styled-components';
import { colors, fontSize, spacing } from '../../tokens';
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

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

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
    small: { height: spacing.xxs, fontSize: fontSize.xs },
    medium: { height: spacing.sm, fontSize: fontSize.sm },
    large: { height: spacing.md, fontSize: fontSize.md },
  };

  const sizeStyles = sizeMap[size] ?? sizeMap.medium;
  const variantColor = variantColors[variant] ?? colors.semantic.primary;

  const displayLabel = showLabel ? (label ?? `${Math.round(percentage)}%`) : '';

  return (
    <Container className={className} style={{ width: '100%', ...style }} data-testid={testId}>
      {displayLabel && (
        <LabelRow $fontSize={sizeStyles.fontSize}>
          <span>{displayLabel}</span>
          {showLabel && !label && (
            <LabelSecondary>
              {Math.round(value)} / {Math.round(max)}
            </LabelSecondary>
          )}
        </LabelRow>
      )}
      <Track
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label || `진행률 ${Math.round(percentage)}%`}
        $height={sizeStyles.height}
      >
        <Fill $height={sizeStyles.height} $color={variantColor} $width={`${percentage}%`}>
          {percentage < 100 && percentage > 0 && (
            <Shimmer data-testid={testId ? `${testId}-shimmer` : undefined} />
          )}
        </Fill>
      </Track>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const LabelRow = styled.div<{ $fontSize: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing.xxs};
  font-family: inherit;
  font-size: ${({ $fontSize }) => $fontSize};
  color: ${colors.semantic.text};
`;

const LabelSecondary = styled.span`
  color: ${colors.semantic.muted};
`;

const Track = styled.div<{ $height: string }>`
  width: 100%;
  height: ${({ $height }) => $height};
  background-color: ${colors.background.gray};
  border-radius: ${({ $height }) => $height};
  overflow: hidden;
  position: relative;
`;

const Fill = styled.div<{ $height: string; $color: string; $width: string }>`
  height: 100%;
  width: ${({ $width }) => $width};
  background-color: ${({ $color }) => $color};
  border-radius: ${({ $height }) => $height};
  transition: width 0.3s ease-in-out;
  position: relative;
  overflow: hidden;
`;

const Shimmer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  animation: ${shimmer} 2s infinite;
`;
