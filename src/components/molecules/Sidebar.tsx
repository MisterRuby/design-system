import React from 'react';
import { Text } from '../atomic/Text';
import { colors } from '../../theme';

export interface SidebarProps {
  logo?: React.ReactNode;
  title?: string;
  navigation?: NavigationItem[];
  footer?: React.ReactNode;
  width?: 'narrow' | 'medium' | 'wide';
  variant?: 'default' | 'dark' | 'light';
  collapsed?: boolean;
  position?: 'left' | 'right';
  className?: string;
  style?: React.CSSProperties;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  children?: NavigationItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  logo,
  title,
  navigation = [],
  footer,
  width = 'medium',
  variant = 'default',
  collapsed = false,
  position = 'left',
  className = '',
  style = {},
}) => {
  const getWidthStyles = () => {
    if (collapsed) {
      return { width: '64px' };
    }

    switch (width) {
      case 'narrow':
        return { width: '200px' };
      case 'wide':
        return { width: '320px' };
      case 'medium':
      default:
        return { width: '256px' };
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'dark':
        return {
          backgroundColor: colors.gray[800],
          borderColor: colors.gray[700],
          color: colors.gray[100],
        };
      case 'light':
        return {
          backgroundColor: colors.gray[50],
          borderColor: colors.gray[200],
          color: colors.gray[800],
        };
      case 'default':
      default:
        return {
          backgroundColor: colors.background.white,
          borderColor: colors.border.default,
          color: colors.semantic.text,
        };
    }
  };

  const widthStyles = getWidthStyles();
  const variantStyles = getVariantStyles();

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderLeft: position === 'right' ? `1px solid ${variantStyles.borderColor}` : 'none',
    borderRight: position === 'left' ? `1px solid ${variantStyles.borderColor}` : 'none',
    backgroundColor: variantStyles.backgroundColor,
    color: variantStyles.color,
    transition: 'width 0.3s ease-in-out',
    overflow: 'hidden',
    ...widthStyles,
    ...style,
  };

  const headerStyles: React.CSSProperties = {
    padding: collapsed ? '16px 8px' : '20px 16px',
    borderBottom: `1px solid ${variantStyles.borderColor}`,
    display: 'flex',
    alignItems: 'center',
    gap: collapsed ? '0' : '12px',
    flexShrink: 0,
  };

  const navigationStyles: React.CSSProperties = {
    flex: 1,
    padding: collapsed ? '16px 8px' : '16px',
    overflow: 'auto',
  };

  const footerStyles: React.CSSProperties = {
    padding: collapsed ? '16px 8px' : '16px',
    borderTop: `1px solid ${variantStyles.borderColor}`,
    flexShrink: 0,
  };

  const getNavigationItemStyles = (item: NavigationItem, isChild = false): React.CSSProperties => {
    const baseStyles = {
      display: 'flex',
      alignItems: 'center',
      gap: collapsed ? '0' : '12px',
      padding: collapsed ? '10px 8px' : isChild ? '8px 12px 8px 32px' : '10px 12px',
      marginBottom: '4px',
      borderRadius: '6px',
      cursor: item.disabled ? 'not-allowed' : 'pointer',
      opacity: item.disabled ? 0.5 : 1,
      transition: 'all 0.2s ease-in-out',
      textDecoration: 'none',
      color: 'inherit',
      justifyContent: collapsed ? 'center' : 'flex-start',
    };

    if (item.active) {
      return {
        ...baseStyles,
        backgroundColor: variant === 'dark' ? colors.primary[600] : colors.primary[50],
        color: variant === 'dark' ? colors.background.white : colors.primary[700],
        fontWeight: '600',
      };
    }

    return baseStyles;
  };

  const handleNavigationClick = (item: NavigationItem) => {
    if (!item.disabled && item.onClick) {
      item.onClick();
    }
  };

  const renderNavigationItem = (item: NavigationItem, isChild = false) => (
    <div key={item.id}>
      <div
        style={getNavigationItemStyles(item, isChild)}
        onClick={() => handleNavigationClick(item)}
        onMouseEnter={(e) => {
          if (!item.disabled && !item.active) {
            e.currentTarget.style.backgroundColor = variant === 'dark'
              ? colors.gray[700]
              : colors.gray[100];
          }
        }}
        onMouseLeave={(e) => {
          if (!item.disabled && !item.active) {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
      >
        {item.icon && (
          <div style={{
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '16px'
          }}>
            {item.icon}
          </div>
        )}
        {!collapsed && (
          <Text
            variant="body2"
            style={{
              margin: 0,
              color: 'inherit',
              fontWeight: 'inherit',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {item.label}
          </Text>
        )}
      </div>
      {!collapsed && item.children && item.children.length > 0 && (
        <div style={{ marginLeft: '8px' }}>
          {item.children.map(child => renderNavigationItem(child, true))}
        </div>
      )}
    </div>
  );

  return (
    <aside className={className} style={containerStyles}>
      {/* Header Section */}
      {(logo || title) && (
        <div style={headerStyles}>
          {logo && <div>{logo}</div>}
          {!collapsed && title && (
            <Text variant="h4" style={{ margin: 0, color: 'inherit', fontWeight: '600' }}>
              {title}
            </Text>
          )}
        </div>
      )}

      {/* Navigation Section */}
      <nav style={navigationStyles}>
        {navigation.map(item => renderNavigationItem(item))}
      </nav>

      {/* Footer Section */}
      {footer && !collapsed && (
        <div style={footerStyles}>
          {footer}
        </div>
      )}
    </aside>
  );
};