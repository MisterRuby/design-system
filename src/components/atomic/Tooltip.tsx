import React, { useState } from 'react';
import { colors, fontSize, spacing, shadowOpacity } from '../../theme';
import { ComponentSize } from '../../types';

export interface TooltipProps {
  children: React.ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  size?: ComponentSize;
  delay?: number;
  disabled?: boolean;
  maxWidth?: string | number;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = 'top',
  size = 'medium',
  delay = 500,
  disabled = false,
  maxWidth
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const getSizeStyles = (size: ComponentSize) => {
    switch (size) {
      case 'small':
        return {
          fontSize: fontSize.xs,
          padding: `${spacing.xxs} ${spacing.sm}`,
          maxWidth: '250px'
        };
      case 'medium':
        return {
          fontSize: fontSize.sm,
          padding: '6px 12px',
          maxWidth: '320px'
        };
      case 'large':
        return {
          fontSize: fontSize.md,
          padding: `${spacing.sm} ${spacing.lg}`,
          maxWidth: '500px'
        };
      default:
        return {
          fontSize: fontSize.sm,
          padding: '6px 12px',
          maxWidth: '320px'
        };
    }
  };

  const getPositionStyles = (position: string) => {
    switch (position) {
      case 'top':
        return {
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '8px'
        };
      case 'bottom':
        return {
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: spacing.sm
        };
      case 'left':
        return {
          right: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginRight: spacing.sm
        };
      case 'right':
        return {
          left: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginLeft: spacing.sm
        };
      default:
        return {
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '8px'
        };
    }
  };

  const getArrowStyles = (position: string) => {
    const arrowSize = '5px';
    const baseStyles = {
      content: '""',
      position: 'absolute' as const,
      borderStyle: 'solid' as const,
    };

    switch (position) {
      case 'top':
        return {
          ...baseStyles,
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          borderWidth: `${arrowSize} ${arrowSize} 0 ${arrowSize}`,
          borderColor: `${colors.semantic.text} transparent transparent transparent`
        };
      case 'bottom':
        return {
          ...baseStyles,
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          borderWidth: `0 ${arrowSize} ${arrowSize} ${arrowSize}`,
          borderColor: `transparent transparent ${colors.semantic.text} transparent`
        };
      case 'left':
        return {
          ...baseStyles,
          left: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          borderWidth: `${arrowSize} 0 ${arrowSize} ${arrowSize}`,
          borderColor: `transparent transparent transparent ${colors.semantic.text}`
        };
      case 'right':
        return {
          ...baseStyles,
          right: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          borderWidth: `${arrowSize} ${arrowSize} ${arrowSize} 0`,
          borderColor: `transparent ${colors.semantic.text} transparent transparent`
        };
      default:
        return baseStyles;
    }
  };

  const handleMouseEnter = () => {
    if (disabled) return;

    const id = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsVisible(false);
  };

  const sizeStyles = getSizeStyles(size);
  const positionStyles = getPositionStyles(position);
  const arrowStyles = getArrowStyles(position);

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-block'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && !disabled && (
        <div
          style={{
            position: 'absolute',
            backgroundColor: colors.semantic.text,
            color: colors.background.white,
            borderRadius: '4px',
            fontSize: sizeStyles.fontSize,
            padding: sizeStyles.padding,
            maxWidth: maxWidth || sizeStyles.maxWidth,
            width: 'max-content',
            zIndex: 1000,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            ...positionStyles
          }}
        >
          <span
            style={{
              display: 'inline-block',
              whiteSpace: 'normal',
              wordWrap: 'break-word',
              lineHeight: '1.4',
              textAlign: 'left',
              width: '100%',
            }}
          >
            {content}
          </span>
          <div style={arrowStyles} />
        </div>
      )}
    </div>
  );
};