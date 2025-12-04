import React from 'react';
import styled, { keyframes, useTheme } from 'styled-components';
import { SemanticVariant, ComponentSize } from '../../types/common';
import { Theme } from '../../theme/theme';

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

const Container = styled.div`
  width: 100%;
`;

const LabelRow = styled.div<{ $fontSize: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.xxs};
  font-family: inherit;
  font-size: ${({ $fontSize }) => $fontSize};
  color: ${props => props.theme.colors.text.primary};
`;

const LabelSecondary = styled.span`
  color: ${props => props.theme.colors.text.muted};
`;

const Track = styled.div<{ $height: string }>`
  width: 100%;
  height: ${({ $height }) => $height};
  background-color: ${props => props.theme.colors.background.gray};
  border-radius: ${({ $height }) => $height};
  overflow: hidden;
  position: relative;
`;

const Fill = styled.div<{ $height: string; $color: string; $width: string }>`
  height: 100%;
  width: ${({ $width }) => $width};
  background-color: ${({ $color }) => $color};
  border-radius: ${({ $height }) => $height};
  transition: width ${props => props.theme.transitions.normal};
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
  const theme = useTheme() as Theme;
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const getSizeStyles = () => {
    const sizeMap: Record<ComponentSize, { height: string; fontSize: string }> = {
      small: { height: theme.spacing.xxs, fontSize: theme.fontSize.xs },
      medium: { height: theme.spacing.sm, fontSize: theme.fontSize.sm },
      large: { height: theme.spacing.md, fontSize: theme.fontSize.md },
    };
    return sizeMap[size] ?? sizeMap.medium;
  };

  const getVariantColor = () => {
    return theme.colors.semantic[variant] || theme.colors.semantic.primary;
  };

  const sizeStyles = getSizeStyles();
  const variantColor = getVariantColor();
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
