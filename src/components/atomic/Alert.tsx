import React from 'react';
import { borderRadius, borderWidth, colors, fontSize, fontWeight, spacing, transitions } from '../../tokens';
import { SemanticVariant } from '../../types';
import { Icon, IconName } from './Icon';

export interface AlertProps {
  children: React.ReactNode;
  variant?: SemanticVariant;
  title?: string;
  closable?: boolean;
  onClose?: () => void;
  icon?: IconName | boolean;
  style?: React.CSSProperties;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'info',
  title,
  closable = false,
  onClose,
  icon,
  style = {},
  className = ''
}) => {
  const getVariantStyles = (variant: SemanticVariant) => {
    const variantConfig = {
      primary: {
        backgroundColor: colors.primary[50],
        borderColor: colors.primary[200],
        iconColor: colors.semantic.primary,
        titleColor: colors.primary[900],
        textColor: colors.primary[800],
        defaultIcon: 'info' as IconName
      },
      secondary: {
        backgroundColor: colors.gray[50],
        borderColor: colors.gray[200],
        iconColor: colors.semantic.secondary,
        titleColor: colors.gray[900],
        textColor: colors.gray[800],
        defaultIcon: 'info' as IconName
      },
      success: {
        backgroundColor: colors.success[50],
        borderColor: colors.success[200],
        iconColor: colors.semantic.success,
        titleColor: colors.success[900],
        textColor: colors.success[800],
        defaultIcon: 'check' as IconName
      },
      error: {
        backgroundColor: colors.error[50],
        borderColor: colors.error[200],
        iconColor: colors.semantic.error,
        titleColor: colors.error[900],
        textColor: colors.error[800],
        defaultIcon: 'close' as IconName
      },
      warning: {
        backgroundColor: colors.warning[50],
        borderColor: colors.warning[200],
        iconColor: colors.semantic.warning,
        titleColor: colors.warning[900],
        textColor: colors.warning[800],
        defaultIcon: 'warning' as IconName
      },
      info: {
        backgroundColor: colors.info[50],
        borderColor: colors.info[200],
        iconColor: colors.semantic.info,
        titleColor: colors.info[900],
        textColor: colors.info[800],
        defaultIcon: 'info' as IconName
      }
    };

    return variantConfig[variant];
  };

  const variantStyles = getVariantStyles(variant);

  const getIconName = (): IconName | null => {
    if (icon === false) return null;
    if (typeof icon === 'string') return icon;
    return variantStyles.defaultIcon;
  };

  const iconName = getIconName();

  const alertStyles: React.CSSProperties = {
    display: 'flex',
    gap: spacing.sm,
    padding: spacing.md,
    backgroundColor: variantStyles.backgroundColor,
    border: `${borderWidth[1]} solid ${variantStyles.borderColor}`,
    borderRadius: borderRadius.md,
    fontSize: fontSize.sm,
    lineHeight: '1.5',
    color: variantStyles.textColor,
    position: 'relative',
    ...style,
  };

  const contentStyles: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
  };

  const titleStyles: React.CSSProperties = {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: variantStyles.titleColor,
    margin: '0 0 4px 0',
  };

  const closeButtonStyles: React.CSSProperties = {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '2px',
    borderRadius: borderRadius.sm,
    color: variantStyles.textColor,
    transition: transitions.normal,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div className={className} style={alertStyles} role="alert">
      {iconName && (
        <div style={{ flexShrink: 0, marginTop: '2px' }}>
          <Icon
            name={iconName}
            size={16}
            color={variantStyles.iconColor}
          />
        </div>
      )}

      <div style={contentStyles}>
        {title && <div style={titleStyles}>{title}</div>}
        <div>{children}</div>
      </div>

      {closable && (
        <button
          type="button"
          onClick={onClose}
          style={closeButtonStyles}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
          aria-label="알림 닫기"
        >
          <Icon
            name="close"
            size={14}
            color="currentColor"
          />
        </button>
      )}
    </div>
  );
};
