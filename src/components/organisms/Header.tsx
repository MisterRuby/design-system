import React from 'react';
import { Text } from '../atomic/Text';
import { useTheme } from 'styled-components';

export interface HeaderProps {
  logo?: React.ReactNode;
  title?: string;
  navigation?: NavigationItem[];
  actions?: React.ReactNode;
  variant?: 'default' | 'transparent' | 'elevated';
  height?: 'small' | 'medium' | 'large';
  sticky?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface NavigationItem {
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  logo,
  title,
  navigation = [],
  actions,
  variant = 'default',
  height = 'medium',
  sticky = false,
  className = '',
  style = {},
}) => {
  const theme = useTheme();
  const getVariantStyles = () => {
    switch (variant) {
      case 'transparent':
        return {
          backgroundColor: 'transparent',
          border: 'none',
          boxShadow: 'none',
        };
      case 'elevated':
        return {
          backgroundColor: theme.colors.background.white,
          border: theme.componentBorders.card.hover,
          boxShadow: theme.shadows.md,
        };
      case 'default':
      default:
        return {
          backgroundColor: theme.colors.background.white,
          border: theme.componentBorders.card.default,
          boxShadow: theme.semanticShadows.header,
        };
    }
  };

  const getHeightStyles = () => {
    switch (height) {
      case 'small':
        return {
          padding: `${theme.spacing.xs} ${theme.spacing.md}`,
          minHeight: theme.component.heights.md,
        };
      case 'large':
        return {
          padding: `${theme.spacing.md} ${theme.spacing.xl}`,
          minHeight: theme.layout.headerHeight,
        };
      case 'medium':
      default:
        return {
          padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
          minHeight: `calc(${theme.component.heights.lg} + ${theme.spacing.xxs})`,
        };
    }
  };

  const variantStyles = getVariantStyles();
  const heightStyles = getHeightStyles();

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    boxSizing: 'border-box',
    position: sticky ? 'sticky' : 'static',
    top: sticky ? 0 : 'auto',
    zIndex: sticky ? theme.zIndex.sticky : 'auto',
    ...variantStyles,
    ...heightStyles,
    ...style,
  };

  const logoSectionStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.md,
    flex: '0 0 auto',
  };

  const navigationStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.md,
    flex: '1',
    justifyContent: 'center',
  };

  const actionsStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    flex: '0 0 auto',
  };

  const navigationItemStyles = (item: NavigationItem): React.CSSProperties => ({
    color: item.active ? theme.colors.semantic.primary : theme.colors.semantic.text,
    textDecoration: 'none',
    fontWeight: item.active ? theme.fontWeight.semibold : theme.fontWeight.normal,
    cursor: item.disabled ? 'not-allowed' : 'pointer',
    opacity: item.disabled ? 0.5 : 1,
    padding: `${theme.spacing.xxs} ${theme.spacing.xs}`,
    borderRadius: theme.borderRadius.sm,
    transition: theme.transitions.normal,
  });

  const handleNavigationClick = (item: NavigationItem) => {
    if (!item.disabled && item.onClick) {
      item.onClick();
    }
  };

  return (
    <header className={className} style={containerStyles}>
      {/* Logo/Title Section */}
      <div style={logoSectionStyles}>
        {logo && <div>{logo}</div>}
        {title && !logo && (
          <Text variant="h3" style={{ margin: 0 }}>
            {title}
          </Text>
        )}
        {title && logo && (
          <Text variant="h4" style={{ margin: 0 }}>
            {title}
          </Text>
        )}
      </div>

      {/* Navigation Section */}
      {navigation.length > 0 && (
        <nav style={navigationStyles}>
          {navigation.map((item, index) => (
            <div
              key={index}
              style={navigationItemStyles(item)}
              onClick={() => handleNavigationClick(item)}
              onMouseEnter={(e) => {
                if (!item.disabled) {
                  e.currentTarget.style.backgroundColor = theme.colors.background.gray;
                }
              }}
              onMouseLeave={(e) => {
                if (!item.disabled) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <Text
                variant="body1"
                style={{
                  margin: 0,
                  color: 'inherit',
                  fontWeight: 'inherit',
                }}
              >
                {item.label}
              </Text>
            </div>
          ))}
        </nav>
      )}

      {/* Actions Section */}
      {actions && (
        <div style={actionsStyles}>
          {actions}
        </div>
      )}
    </header>
  );
};
