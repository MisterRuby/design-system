import React from 'react';
import { Text } from '../atomic/Text';
import { colors, fontWeight } from '../../theme';

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
          backgroundColor: colors.background.white,
          border: `1px solid ${colors.border.default}`,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        };
      case 'default':
      default:
        return {
          backgroundColor: colors.background.white,
          border: `1px solid ${colors.border.default}`,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        };
    }
  };

  const getHeightStyles = () => {
    switch (height) {
      case 'small':
        return {
          padding: '8px 16px',
          minHeight: '40px',
        };
      case 'large':
        return {
          padding: '16px 24px',
          minHeight: '64px',
        };
      case 'medium':
      default:
        return {
          padding: '12px 20px',
          minHeight: '52px',
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
    zIndex: sticky ? 1000 : 'auto',
    ...variantStyles,
    ...heightStyles,
    ...style,
  };

  const logoSectionStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flex: '0 0 auto',
  };

  const navigationStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flex: '1',
    justifyContent: 'center',
  };

  const actionsStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: '0 0 auto',
  };

  const navigationItemStyles = (item: NavigationItem): React.CSSProperties => ({
    color: item.active ? colors.semantic.primary : colors.semantic.text,
    textDecoration: 'none',
    fontWeight: item.active ? fontWeight.semibold : fontWeight.normal,
    cursor: item.disabled ? 'not-allowed' : 'pointer',
    opacity: item.disabled ? 0.5 : 1,
    padding: '6px 10px',
    borderRadius: '4px',
    transition: 'all 0.2s ease-in-out',
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
                  e.currentTarget.style.backgroundColor = colors.background.gray;
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
