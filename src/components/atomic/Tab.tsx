import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { ComponentSize } from '../../types';
import { Icon, IconName } from './Icon';

export interface TabItem {
  id: string;
  label: string;
  content?: React.ReactNode;
  disabled?: boolean;
  icon?: IconName;
}

export interface TabProps {
  items: TabItem[];
  defaultActiveTab?: string;
  size?: ComponentSize;
  variant?: 'default' | 'underline' | 'pills';
  onChange?: (tabId: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const Tab: React.FC<TabProps> = ({
  items,
  defaultActiveTab,
  size = 'medium',
  variant = 'default',
  onChange,
  className = '',
  style = {}
}) => {
  const theme = useTheme();
  const iconSizeMap: Record<ComponentSize, number> = {
    small: parseInt(theme.component.iconSizes.md, 10),
    medium: parseInt(theme.component.iconSizes.lg, 10),
    large: parseInt(theme.component.iconSizes.xl, 10),
  };
  const [activeTab, setActiveTab] = useState(defaultActiveTab || items[0]?.id);

  const handleTabClick = (tabId: string) => {
    const item = items.find(item => item.id === tabId);
    if (item?.disabled) return;

    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const getSizeStyles = (size: ComponentSize) => {
    switch (size) {
      case 'small':
        return {
          padding: `calc(${theme.spacing.xs} - ${theme.spacing.xxs} / 2) ${theme.spacing.sm}`,
          fontSize: theme.fontSize.xs,
          gap: theme.spacing.xxs
        };
      case 'medium':
        return {
          padding: `${theme.spacing.xs} ${theme.spacing.md}`,
          fontSize: theme.fontSize.sm,
          gap: `calc(${theme.spacing.xs} - ${theme.spacing.xxs} / 2)`
        };
      case 'large':
        return {
          padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
          fontSize: theme.fontSize.md,
          gap: theme.spacing.xs
        };
      default:
        return {
          padding: `${theme.spacing.xs} ${theme.spacing.md}`,
          fontSize: theme.fontSize.sm,
          gap: `calc(${theme.spacing.xs} - ${theme.spacing.xxs} / 2)`
        };
    }
  };

  const getVariantStyles = (variant: string, isActive: boolean, isDisabled: boolean) => {
    const baseStyles = {
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      opacity: isDisabled ? 0.5 : 1,
      transition: theme.transitions.normal,
      border: 'none',
      backgroundColor: 'transparent' as string,
      borderBottom: 'none' as string,
      borderRadius: theme.borderRadius.sm,
      borderBottomLeftRadius: theme.borderRadius.sm,
      borderBottomRightRadius: theme.borderRadius.sm,
    };

    switch (variant) {
      case 'underline':
        return {
          ...baseStyles,
          borderBottom: isActive
            ? `${theme.borderWidth[2]} solid ${theme.colors.semantic.primary}`
            : `${theme.borderWidth[1]} solid transparent`,
          color: isActive ? theme.colors.semantic.primary : theme.colors.text.secondary,
          borderRadius: '0',
          borderBottomLeftRadius: '0',
          borderBottomRightRadius: '0',
        };
      case 'pills':
        return {
          ...baseStyles,
          backgroundColor: isActive ? theme.colors.semantic.primary : 'transparent',
          color: isActive ? theme.colors.background.white : theme.colors.text.primary,
          borderRadius: theme.borderRadius.full,
          borderBottomLeftRadius: theme.borderRadius.full,
          borderBottomRightRadius: theme.borderRadius.full,
        };
      default:
        return {
          ...baseStyles,
          backgroundColor: isActive ? theme.colors.background.white : theme.colors.background.gray50,
          color: isActive ? theme.colors.semantic.primary : theme.colors.text.secondary,
          border: isActive
            ? `${theme.borderWidth[1]} solid ${theme.colors.semantic.primary}`
            : `${theme.borderWidth[1]} solid ${theme.colors.border.light}`,
          borderBottomLeftRadius: variant === 'default' && isActive ? '0' : theme.borderRadius.sm,
          borderBottomRightRadius: variant === 'default' && isActive ? '0' : theme.borderRadius.sm,
        };
    }
  };

  const sizeStyles = getSizeStyles(size);
  const activeItem = items.find(item => item.id === activeTab);

  return (
    <div className={className} style={{ width: '500px', minWidth: '500px', maxWidth: '500px', ...style }}>
      <div
        style={{
          display: 'flex',
          gap: variant === 'default' ? '0' : sizeStyles.gap,
          borderBottom: variant === 'underline' ? `${theme.borderWidth[1]} solid ${theme.colors.border.light}` : 'none',
          marginBottom: variant === 'default' ? '-1px' : '0',
          width: '100%',
          position: 'relative'
        }}
        role="tablist"
      >
        {items.map((item) => {
          const isActive = activeTab === item.id;
          const variantStyles = getVariantStyles(variant, isActive, item.disabled || false);

          return (
            <button
              key={item.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${item.id}`}
              disabled={item.disabled}
              onClick={() => handleTabClick(item.id)}
              style={{
                flex: variant === 'default' ? '0 0 auto' : '1',
                minWidth: variant === 'default' ? 'auto' : '0',
                padding: sizeStyles.padding,
                fontSize: sizeStyles.fontSize,
                fontFamily: 'inherit',
                fontWeight: isActive ? theme.fontWeight.semibold : theme.fontWeight.normal,
                textAlign: 'center',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                ...variantStyles,
              }}
              onMouseEnter={(e) => {
                if (!item.disabled && !isActive) {
                  if (variant === 'pills') {
                    e.currentTarget.style.backgroundColor = theme.colors.background.gray100;
                  } else if (variant === 'underline') {
                    e.currentTarget.style.color = theme.colors.text.primary;
                  } else {
                    e.currentTarget.style.backgroundColor = theme.colors.background.gray100;
                  }
                }
              }}
              onMouseLeave={(e) => {
                if (!item.disabled && !isActive) {
                  const defaultStyles = getVariantStyles(variant, false, false);
                  e.currentTarget.style.backgroundColor = defaultStyles.backgroundColor || 'transparent';
                  e.currentTarget.style.color = defaultStyles.color;
                }
              }}
            >
              {item.icon && (
                <Icon
                  name={item.icon}
                  size={iconSizeMap[size]}
                  style={{ marginRight: `calc(${theme.spacing.xs} - ${theme.spacing.xxs} / 2)` }}
                />
              )}
              {item.label}
            </button>
          );
        })}
      </div>

      {variant === 'default' && activeItem?.content && (
        <div
          id={`tabpanel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          style={{
            width: '500px',
            minWidth: '500px',
            maxWidth: '500px',
            padding: sizeStyles.padding,
            border: `${theme.borderWidth[1]} solid ${theme.colors.border.light}`,
            borderTop: 'none',
            borderRadius: theme.borderRadius.sm,
            borderTopLeftRadius: '0',
            borderTopRightRadius: '0',
            backgroundColor: theme.colors.background.white,
            boxSizing: 'border-box',
            wordWrap: 'break-word',
            overflowWrap: 'break-word'
          }}
        >
          {activeItem.content}
        </div>
      )}

      {variant !== 'default' && activeItem?.content && (
        <div
          id={`tabpanel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          style={{
            width: '500px',
            minWidth: '500px',
            maxWidth: '500px',
            marginTop: variant === 'underline' ? '0' : sizeStyles.gap,
            padding: sizeStyles.padding,
            border: `${theme.borderWidth[1]} solid ${theme.colors.border.light}`,
            borderRadius: theme.borderRadius.sm,
            borderTopLeftRadius: variant === 'underline' ? '0' : theme.borderRadius.sm,
            borderTopRightRadius: variant === 'underline' ? '0' : theme.borderRadius.sm,
            backgroundColor: theme.colors.background.white,
            boxSizing: 'border-box',
            wordWrap: 'break-word',
            overflowWrap: 'break-word'
          }}
        >
          {activeItem.content}
        </div>
      )}
    </div>
  );
};
