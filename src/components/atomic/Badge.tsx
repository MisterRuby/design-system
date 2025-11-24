import React from 'react';
import { colors, fontSize, fontWeight, spacing, semanticSpacing } from '../../theme';
import { CheckboxSize } from '../../types';
import { Icon, IconName } from './Icon';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'solid' | 'outline' | 'soft';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  size?: CheckboxSize;
  rounded?: boolean;
  removable?: boolean;
  onRemove?: () => void;
  disabled?: boolean;
  icon?: IconName;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'solid',
  color = 'primary',
  size = 'md',
  rounded = false,
  removable = false,
  onRemove,
  disabled = false,
  icon
}) => {
  const getSizeStyles = (size: CheckboxSize) => {
    switch (size) {
      case 'sm':
        return {
          padding: `2px ${spacing.xxs}`,
          fontSize: fontSize.xxs,
          lineHeight: '12px',
          iconSize: '12px',
          gap: spacing.xxs
        };
      case 'md':
        return {
          padding: `${spacing.xxs} ${spacing.xs}`,
          fontSize: fontSize.xs,
          lineHeight: '16px',
          iconSize: '14px',
          gap: spacing.xxs
        };
      case 'lg':
        return {
          padding: `${spacing.xxs} ${spacing.sm}`,
          fontSize: fontSize.sm,
          lineHeight: '20px',
          iconSize: '16px',
          gap: '6px'
        };
      default:
        return {
          padding: `${spacing.xxs} ${spacing.xs}`,
          fontSize: fontSize.xs,
          lineHeight: '16px',
          iconSize: '14px',
          gap: spacing.xxs
        };
    }
  };

  const getColorStyles = (color: string, variant: string) => {
    if (disabled) {
      return {
        backgroundColor: colors.background.disabled,
        color: colors.semantic.muted,
        borderColor: colors.gray[200]
      };
    }

    const colorMap = {
      primary: colors.semantic.primary,
      secondary: colors.semantic.secondary,
      success: colors.semantic.success,
      error: colors.semantic.error,
      warning: colors.semantic.warning,
      info: colors.semantic.info
    };

    const mainColor = colorMap[color as keyof typeof colorMap];

    switch (variant) {
      case 'solid':
        return {
          backgroundColor: mainColor,
          color: colors.background.white,
          borderColor: mainColor
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: mainColor,
          borderColor: mainColor
        };
      case 'soft':
        const softColorMap = {
          primary: colors.primary[100],
          secondary: colors.gray[100],
          success: colors.success[100],
          error: colors.error[100],
          warning: colors.warning[100],
          info: colors.info[100]
        };
        return {
          backgroundColor: softColorMap[color as keyof typeof softColorMap],
          color: mainColor,
          borderColor: 'transparent'
        };
      default:
        return {
          backgroundColor: mainColor,
          color: colors.background.white,
          borderColor: mainColor
        };
    }
  };

  const sizeStyles = getSizeStyles(size);
  const colorStyles = getColorStyles(color, variant);

  const badgeStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: sizeStyles.gap,
    padding: sizeStyles.padding,
    fontSize: sizeStyles.fontSize,
    lineHeight: sizeStyles.lineHeight,
    fontWeight: fontWeight.medium,
    backgroundColor: colorStyles.backgroundColor,
    color: colorStyles.color,
    border: `1px solid ${colorStyles.borderColor}`,
    borderRadius: rounded ? '50px' : spacing.xxs,
    whiteSpace: 'nowrap',
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? 'not-allowed' : 'default',
    transition: 'all 0.2s ease',
    maxWidth: 'fit-content'
  };

  const removeButtonStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: sizeStyles.iconSize,
    height: sizeStyles.iconSize,
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: fontSize.xxs,
    color: 'currentColor',
    transition: 'background-color 0.2s ease',
    marginLeft: '2px'
  };


  return (
    <span style={badgeStyles}>
      {icon && (
        <Icon
          name={icon}
          size={sizeStyles.iconSize}
          color="currentColor"
        />
      )}
      {children}
      {removable && (
        <button
          type="button"
          onClick={!disabled ? onRemove : undefined}
          style={removeButtonStyles}
          onMouseEnter={(e) => {
            if (!disabled) {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
          }}
          aria-label="제거"
        >
          ×
        </button>
      )}
    </span>
  );
};