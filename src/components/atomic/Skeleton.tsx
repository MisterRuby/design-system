import React from 'react';
import { borderRadius, colors, spacing, animations } from '../../theme';

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

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  variant = 'rectangle',
  animation = 'pulse',
  borderRadius: customBorderRadius,
  lines = 1,
  lineSpacing = spacing.xs,
  className = '',
  style = {}
}) => {
  const getVariantStyles = (variant: string) => {
    switch (variant) {
      case 'text':
        return {
          width: width || '100%',
          height: height || '1em',
          borderRadius: customBorderRadius || borderRadius.xs,
        };
      case 'circle':
        const size = width || height || 40;
        return {
          width: size,
          height: size,
          borderRadius: '50%',
        };
      case 'rectangle':
      default:
        return {
          width: width || '100%',
          height: height || 20,
          borderRadius: customBorderRadius || borderRadius.sm,
        };
    }
  };

  const getAnimationStyles = (animation: string) => {
    const baseKeyframes = {
      pulse: `
        @keyframes skeleton-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `,
      wave: `
        @keyframes skeleton-wave {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `,
    };

    switch (animation) {
      case 'pulse':
        return {
          animation: `skeleton-pulse ${animations.duration.slower} ease-in-out infinite`,
        };
      case 'wave':
        return {
          position: 'relative' as const,
          overflow: 'hidden' as const,
          '::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `linear-gradient(90deg, transparent, ${colors.background.white}, transparent)`,
            animation: `skeleton-wave 1.6s linear infinite`,
          },
        };
      case 'none':
      default:
        return {};
    }
  };

  const variantStyles = getVariantStyles(variant);
  const animationStyles = getAnimationStyles(animation);

  const baseStyles: React.CSSProperties = {
    backgroundColor: colors.gray[200],
    display: 'block',
    ...variantStyles,
    ...animationStyles,
    ...style,
  };

  // Add keyframes to document head
  React.useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      @keyframes skeleton-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }
      @keyframes skeleton-wave {
        0% { transform: translateX(-100%); }
        50% { transform: translateX(100%); }
        100% { transform: translateX(100%); }
      }
      .skeleton-wave {
        position: relative;
        overflow: hidden;
      }
      .skeleton-wave::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
        animation: skeleton-wave 1.6s linear infinite;
      }
    `;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  if (variant === 'text' && lines > 1) {
    return (
      <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: lineSpacing }}>
        {Array.from({ length: lines }, (_, index) => {
          const isLastLine = index === lines - 1;
          const lineWidth = isLastLine ? '60%' : '100%';

          return (
            <div
              key={index}
              className={animation === 'wave' ? 'skeleton-wave' : ''}
              style={{
                ...baseStyles,
                width: width || lineWidth,
              }}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={`${className} ${animation === 'wave' ? 'skeleton-wave' : ''}`}
      style={baseStyles}
    />
  );
};