import React, { useState } from 'react';
import { useTheme } from 'styled-components';
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
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const getSizeStyles = (size: ComponentSize) => {
    switch (size) {
      case 'small':
        return {
          fontSize: theme.fontSize.xs,
          padding: `${theme.spacing.xxs} ${theme.spacing.sm}`,
          maxWidth: theme.component.tooltip.maxWidth.sm
        };
      case 'medium':
        return {
          fontSize: theme.fontSize.sm,
          padding: `${theme.spacing.xxs} ${theme.spacing.sm}`,
          maxWidth: theme.component.tooltip.maxWidth.md
        };
      case 'large':
        return {
          fontSize: theme.fontSize.md,
          padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
          maxWidth: theme.component.tooltip.maxWidth.lg
        };
      default:
        return {
          fontSize: theme.fontSize.sm,
          padding: `${theme.spacing.xxs} ${theme.spacing.sm}`,
          maxWidth: theme.component.tooltip.maxWidth.md
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
          marginBottom: theme.spacing.xs
        };
      case 'bottom':
        return {
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: theme.spacing.sm
        };
      case 'left':
        return {
          right: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginRight: theme.spacing.sm
        };
      case 'right':
        return {
          left: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginLeft: theme.spacing.sm
        };
      default:
        return {
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: theme.spacing.xs
        };
    }
  };

  const getArrowStyles = (position: string) => {
    const tooltipArrowSize = theme.component.tooltip.arrowSize;
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
          borderWidth: `${tooltipArrowSize} ${tooltipArrowSize} 0 ${tooltipArrowSize}`,
          borderColor: `${theme.colors.semantic.text} transparent transparent transparent`
        };
      case 'bottom':
        return {
          ...baseStyles,
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          borderWidth: `0 ${tooltipArrowSize} ${tooltipArrowSize} ${tooltipArrowSize}`,
          borderColor: `transparent transparent ${theme.colors.semantic.text} transparent`
        };
      case 'left':
        return {
          ...baseStyles,
          left: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          borderWidth: `${tooltipArrowSize} 0 ${tooltipArrowSize} ${tooltipArrowSize}`,
          borderColor: `transparent transparent transparent ${theme.colors.semantic.text}`
        };
      case 'right':
        return {
          ...baseStyles,
          right: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          borderWidth: `${tooltipArrowSize} ${tooltipArrowSize} ${tooltipArrowSize} 0`,
          borderColor: `transparent ${theme.colors.semantic.text} transparent transparent`
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
            backgroundColor: theme.colors.semantic.text,
            color: theme.colors.background.white,
            borderRadius: theme.borderRadius.sm,
            fontSize: sizeStyles.fontSize,
            padding: sizeStyles.padding,
            maxWidth: maxWidth || sizeStyles.maxWidth,
            width: 'max-content',
            zIndex: theme.zIndex.tooltip,
            boxShadow: theme.shadows.md,
            ...positionStyles
          }}
        >
          <span
            style={{
              display: 'inline-block',
              whiteSpace: 'normal',
              wordWrap: 'break-word',
              lineHeight: theme.lineHeight.normal,
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
