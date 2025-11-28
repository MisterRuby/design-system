import React from 'react';
import { Icon, IconName } from './Icon';
import { borderRadius, borderWidth, colors, fontSize } from '../../theme';
import { ButtonVariant, ComponentSize } from '../../types';

// Button 설정 상수
const BUTTON_CONFIG = {
  sizes: {
    small: {
      padding: '4px 8px',
      fontSize: fontSize.xs,
      iconSize: 14,
      gap: '4px'
    },
    medium: {
      padding: '8px 16px',
      fontSize: fontSize.sm,
      iconSize: 16,
      gap: '6px'
    },
    large: {
      padding: '12px 24px',
      fontSize: fontSize.md,
      iconSize: 20,
      gap: '8px'
    },
  },
  variants: {
    solid: {
      primary: {
        backgroundColor: colors.semantic.primary,
        color: colors.background.white,
        borderColor: colors.semantic.primary
      },
      secondary: {
        backgroundColor: colors.semantic.secondary,
        color: colors.background.white,
        borderColor: colors.semantic.secondary
      },
      success: {
        backgroundColor: colors.semantic.success,
        color: colors.background.white,
        borderColor: colors.semantic.success
      },
      error: {
        backgroundColor: colors.semantic.error,
        color: colors.background.white,
        borderColor: colors.semantic.error
      },
      warning: {
        backgroundColor: colors.semantic.warning,
        color: colors.background.white,
        borderColor: colors.semantic.warning
      },
      info: {
        backgroundColor: colors.semantic.info,
        color: colors.background.white,
        borderColor: colors.semantic.info
      },
    },
    outline: {
      backgroundColor: 'transparent',
      color: colors.semantic.primary,
      borderColor: colors.semantic.primary
    },
  },
  effects: {
    transition: 'all 0.2s ease-in-out',
    hoverOpacity: '0.9',
    disabledOpacity: 0.6,
  },
} as const;

export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ComponentSize;
  disabled?: boolean;
  icon?: IconName;
  iconPosition?: 'left' | 'right';
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  icon,
  iconPosition = 'left',
  type = 'button',
  onClick,
  style = {},
  className = ''
}) => {
  const getVariantStyles = (variant: string) => {
    if (variant === 'outline') {
      return BUTTON_CONFIG.variants.outline;
    }
    return BUTTON_CONFIG.variants.solid[variant as keyof typeof BUTTON_CONFIG.variants.solid] ||
           BUTTON_CONFIG.variants.solid.primary;
  };

  const getSizeStyles = (size: string) => {
    return BUTTON_CONFIG.sizes[size as keyof typeof BUTTON_CONFIG.sizes] ||
           BUTTON_CONFIG.sizes.medium;
  };

  const sizeStyles = getSizeStyles(size);
  const variantStyles = getVariantStyles(variant);

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: icon ? sizeStyles.gap : '0',
        flexDirection: iconPosition === 'right' ? 'row-reverse' : 'row',
        backgroundColor: variantStyles.backgroundColor,
        color: variantStyles.color,
        padding: sizeStyles.padding,
        fontSize: sizeStyles.fontSize,
        border: variant === 'outline' ? `${borderWidth[1]} solid ${variantStyles.borderColor}` : 'none',
        borderRadius: borderRadius.sm,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? BUTTON_CONFIG.effects.disabledOpacity : 1,
        fontFamily: 'inherit',
        transition: BUTTON_CONFIG.effects.transition,
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.opacity = BUTTON_CONFIG.effects.hoverOpacity;
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.opacity = '1';
        }
      }}
    >
      {icon && (
        <Icon
          name={icon}
          size={sizeStyles.iconSize}
          color="currentColor"
        />
      )}
      {children}
    </button>
  );
};
