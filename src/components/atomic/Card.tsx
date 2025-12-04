import React from 'react';
import { borderRadius, colors, semanticShadows, transitions } from '../../tokens';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  hoverable = false,
  onClick,
  style = {},
  className = ''
}) => {
  const getVariantStyles = (variant: string) => {
    switch (variant) {
      case 'outlined':
        return {
          backgroundColor: colors.background.white,
          border: `1px solid ${colors.border.default}`,
          boxShadow: 'none'
        };
      case 'elevated':
        return {
          backgroundColor: colors.background.white,
          border: 'none',
          boxShadow: semanticShadows.modalContent
        };
      case 'default':
      default:
        return {
          backgroundColor: colors.background.white,
          border: `1px solid ${colors.border.light}`,
          boxShadow: semanticShadows.cardResting
        };
    }
  };

  const getPaddingStyles = (padding: string) => {
    switch (padding) {
      case 'none':
        return '0';
      case 'sm':
        return '12px';
      case 'md':
        return '16px';
      case 'lg':
        return '24px';
      default:
        return '16px';
    }
  };

  const variantStyles = getVariantStyles(variant);
  const paddingValue = getPaddingStyles(padding);

  const cardStyles: React.CSSProperties = {
    borderRadius: borderRadius.md,
    padding: paddingValue,
    transition: transitions.normal,
    cursor: hoverable || onClick ? 'pointer' : 'default',
    ...variantStyles,
    ...style,
  };

  const hoverStyles: React.CSSProperties = hoverable || onClick ? {
    transform: 'translateY(-2px)',
    boxShadow: semanticShadows.cardHover,
  } : {};

  return (
    <div
      className={className}
      onClick={onClick}
      style={cardStyles}
      onMouseEnter={(e) => {
        if (hoverable || onClick) {
          Object.assign(e.currentTarget.style, hoverStyles);
        }
      }}
      onMouseLeave={(e) => {
        if (hoverable || onClick) {
          Object.assign(e.currentTarget.style, cardStyles);
        }
      }}
    >
      {children}
    </div>
  );
};
