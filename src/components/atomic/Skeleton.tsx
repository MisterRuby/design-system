import React from 'react';
import styled, { css, keyframes } from 'styled-components';

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  variant?: 'text' | 'circle' | 'rectangle';
  animation?: 'pulse' | 'wave' | 'none';
  borderRadius?: string | number;
  lines?: number;
  lineSpacing?: string;
  className?: string;
  style?: React.CSSProperties;
}

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`;

const wave = keyframes`
  0% { transform: translateX(-100%); }
  50% { transform: translateX(100%); }
  100% { transform: translateX(100%); }
`;

const SkeletonBase = styled.div<{
  $width?: string | number;
  $height?: string | number;
  $variant: 'text' | 'circle' | 'rectangle';
  $animation: 'pulse' | 'wave' | 'none';
  $borderRadius?: string | number;
}>`
  background-color: ${props => props.theme.colors.gray[200]};
  display: block;

  width: ${props => {
    if (props.$width) return typeof props.$width === 'number' ? `${props.$width}px` : props.$width;
    if (props.$variant === 'circle') return props.$height ? (typeof props.$height === 'number' ? `${props.$height}px` : props.$height) : '40px';
    return '100%';
  }};

  height: ${props => {
    if (props.$height) return typeof props.$height === 'number' ? `${props.$height}px` : props.$height;
    if (props.$variant === 'text') return '1em';
    if (props.$variant === 'circle') return props.$width ? (typeof props.$width === 'number' ? `${props.$width}px` : props.$width) : '40px';
    return '20px';
  }};

  border-radius: ${props => {
    if (props.$borderRadius) return typeof props.$borderRadius === 'number' ? `${props.$borderRadius}px` : props.$borderRadius;
    if (props.$variant === 'circle') return '50%';
    if (props.$variant === 'text') return props.theme.borderRadius.xs;
    return props.theme.borderRadius.sm;
  }};

  ${props => props.$animation === 'pulse' && css`
    animation: ${pulse} 1.5s ease-in-out infinite;
  `}

  ${props => props.$animation === 'wave' && css`
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
      animation: ${wave} 1.6s linear infinite;
    }
  `}
`;

const LinesContainer = styled.div<{ $gap: string }>`
  display: flex;
  flex-direction: column;
  gap: ${props => props.$gap};
`;

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  variant = 'rectangle',
  animation = 'pulse',
  borderRadius,
  lines = 1,
  lineSpacing,
  className = '',
  style = {}
}) => {
  if (variant === 'text' && lines > 1) {
    return (
      <LinesContainer $gap={lineSpacing || '8px'} className={className}>
        {Array.from({ length: lines }, (_, index) => {
          const isLastLine = index === lines - 1;
          const lineWidth = isLastLine ? '60%' : '100%';

          return (
            <SkeletonBase
              key={index}
              $width={width || lineWidth}
              $height={height}
              $variant={variant}
              $animation={animation}
              $borderRadius={borderRadius}
              style={style}
            />
          );
        })}
      </LinesContainer>
    );
  }

  return (
    <SkeletonBase
      className={className}
      $width={width}
      $height={height}
      $variant={variant}
      $animation={animation}
      $borderRadius={borderRadius}
      style={style}
    />
  );
};
