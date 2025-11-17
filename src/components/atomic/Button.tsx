import React from 'react';
import { Icon, IconName } from './Icon';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  icon?: IconName;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  icon,
  iconPosition = 'left',
  onClick
}) => {
  const getVariantStyles = (variant: string) => {
    switch (variant) {
      case 'primary':
        return { backgroundColor: '#047857', color: 'white' };
      case 'secondary':
        return { backgroundColor: '#6c757d', color: 'white' };
      case 'danger':
        return { backgroundColor: '#dc3545', color: 'white' };
      case 'outline':
        return { backgroundColor: 'transparent', color: '#047857', border: '1px solid #047857' };
      default:
        return { backgroundColor: '#047857', color: 'white' };
    }
  };

  const getSizeStyles = (size: string) => {
    switch (size) {
      case 'small':
        return { padding: '4px 8px', fontSize: '12px', iconSize: 14, gap: '4px' };
      case 'medium':
        return { padding: '8px 16px', fontSize: '14px', iconSize: 16, gap: '6px' };
      case 'large':
        return { padding: '12px 24px', fontSize: '16px', iconSize: 20, gap: '8px' };
      default:
        return { padding: '8px 16px', fontSize: '14px', iconSize: 16, gap: '6px' };
    }
  };

  const sizeStyles = getSizeStyles(size);
  const variantStyles = getVariantStyles(variant);

  return (
    <button
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
        border: variant === 'outline' ? '1px solid #047857' : 'none',
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