import React from 'react';
import styled, { useTheme, keyframes } from 'styled-components';
import { CheckboxSize } from '../../types';
import { Theme } from '../../theme/theme';

export interface SpinnerProps {
  size?: CheckboxSize;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'white';
  thickness?: number;
  speed?: 'slow' | 'normal' | 'fast';
  label?: string;
}

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const getSizeValue = (size: CheckboxSize) => {
  const sizeMap: Record<CheckboxSize, string> = {
    sm: '16px',
    md: '24px',
    lg: '32px',
  };
  return sizeMap[size];
};

const getAnimationDuration = (speed: string) => {
  const speedMap: Record<string, string> = {
    slow: '1.2s',
    normal: '0.8s',
    fast: '0.5s',
  };
  return speedMap[speed] || '0.8s';
};

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
`;

const StyledSpinner = styled.div<{
  $size: CheckboxSize;
  $color: string;
  $thickness: number;
  $speed: string;
}>`
  display: inline-block;
  width: ${props => getSizeValue(props.$size)};
  height: ${props => getSizeValue(props.$size)};
  border: ${props => props.$thickness}px solid ${props => props.theme.colors.gray[200]};
  border-top: ${props => props.$thickness}px solid ${props =>
    props.$color === 'white'
      ? props.theme.colors.background.white
      : props.theme.colors.semantic[props.$color as keyof typeof props.theme.colors.semantic] || props.theme.colors.semantic.primary
  };
  border-radius: ${props => props.theme.borderRadius.full};
  animation: ${spin} ${props => getAnimationDuration(props.$speed)} linear infinite;
`;

const Label = styled.span`
  font-size: ${props => props.theme.fontSize.xs};
  color: ${props => props.theme.colors.text.primary};
  font-weight: ${props => props.theme.fontWeight.medium};
`;

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'primary',
  thickness = 2,
  speed = 'normal',
  label
}) => {
  if (label) {
    return (
      <Container>
        <StyledSpinner
          $size={size}
          $color={color}
          $thickness={thickness}
          $speed={speed}
          role="status"
          aria-label={label}
        />
        <Label>{label}</Label>
      </Container>
    );
  }

  return (
    <StyledSpinner
      $size={size}
      $color={color}
      $thickness={thickness}
      $speed={speed}
      role="status"
      aria-label="로딩 중"
    />
  );
};
