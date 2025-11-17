import React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
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
        return { padding: '4px 8px', fontSize: '12px' };
      case 'medium':
        return { padding: '8px 16px', fontSize: '14px' };
      case 'large':
        return { padding: '12px 24px', fontSize: '16px' };
      default:
        return { padding: '8px 16px', fontSize: '14px' };
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...getVariantStyles(variant),
        ...getSizeStyles(size),
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
      {children}
    </button>
  );
};