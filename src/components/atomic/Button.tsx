import React from 'react';
import { Icon, IconName } from './Icon';
import { colors, fontSize } from '../../theme';
import { ButtonVariant, ComponentSize } from '../../types';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ComponentSize;
  disabled?: boolean;
  icon?: IconName;
  iconPosition?: 'left' | 'right';
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  icon,
  iconPosition = 'left',
  type = 'button',
  onClick
}) => {
  const getVariantStyles = (variant: string) => {
    switch (variant) {
      case 'primary':
        return { backgroundColor: colors.semantic.primary, color: colors.background.white, borderColor: colors.semantic.primary };
      case 'secondary':
        return { backgroundColor: colors.semantic.secondary, color: colors.background.white, borderColor: colors.semantic.secondary };
      case 'success':
        return { backgroundColor: colors.semantic.success, color: colors.background.white, borderColor: colors.semantic.success };
      case 'error':
        return { backgroundColor: colors.semantic.error, color: colors.background.white, borderColor: colors.semantic.error };
      case 'warning':
        return { backgroundColor: colors.semantic.warning, color: colors.background.white, borderColor: colors.semantic.warning };
      case 'info':
        return { backgroundColor: colors.semantic.info, color: colors.background.white, borderColor: colors.semantic.info };
      case 'outline':
        return { backgroundColor: 'transparent', color: colors.semantic.primary, borderColor: colors.semantic.primary };
      default:
        return { backgroundColor: colors.semantic.primary, color: colors.background.white, borderColor: colors.semantic.primary };
    }
  };

  const getSizeStyles = (size: string) => {
    switch (size) {
      case 'small':
        return { padding: '4px 8px', fontSize: fontSize.xs, iconSize: 14, gap: '4px' };
      case 'medium':
        return { padding: '8px 16px', fontSize: fontSize.sm, iconSize: 16, gap: '6px' };
      case 'large':
        return { padding: '12px 24px', fontSize: fontSize.md, iconSize: 20, gap: '8px' };
      default:
        return { padding: '8px 16px', fontSize: fontSize.sm, iconSize: 16, gap: '6px' };
    }
  };

  const sizeStyles = getSizeStyles(size);
  const variantStyles = getVariantStyles(variant);

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
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
        border: variant === 'outline' ? `1px solid ${variantStyles.borderColor}` : 'none',
        borderRadius: '4px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        fontFamily: 'inherit',
        transition: 'all 0.2s ease-in-out',
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.opacity = '0.9';
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