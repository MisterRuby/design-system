import React, { useState } from 'react';
import { borderRadius, colors, fontSize, transitions, borderWidth } from '../../tokens';
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
          padding: '6px 12px',
          fontSize: fontSize.xs,
          gap: '4px'
        };
      case 'medium':
        return {
          padding: '8px 16px',
          fontSize: fontSize.sm,
          gap: '6px'
        };
      case 'large':
        return {
          padding: '12px 20px',
          fontSize: fontSize.md,
          gap: '8px'
        };
      default:
        return {
          padding: '8px 16px',
          fontSize: fontSize.sm,
          gap: '6px'
        };
    }
  };

  const getVariantStyles = (variant: string, isActive: boolean, isDisabled: boolean) => {
    const baseStyles = {
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      opacity: isDisabled ? 0.5 : 1,
      transition: transitions.normal,
      border: 'none',
      backgroundColor: 'transparent' as string,
      borderBottom: 'none' as string,
      borderRadius: borderRadius.sm,
      borderBottomLeftRadius: borderRadius.sm,
      borderBottomRightRadius: borderRadius.sm,
    };

    switch (variant) {
      case 'underline':
        return {
          ...baseStyles,
          borderBottom: isActive
            ? `${borderWidth[2]} solid ${colors.semantic.primary}`
            : `${borderWidth[1]} solid transparent`,
          color: isActive ? colors.semantic.primary : colors.text.secondary,
          borderRadius: '0',
          borderBottomLeftRadius: '0',
          borderBottomRightRadius: '0',
        };
      case 'pills':
        return {
          ...baseStyles,
          backgroundColor: isActive ? colors.semantic.primary : 'transparent',
          color: isActive ? colors.background.white : colors.text.primary,
          borderRadius: borderRadius.full,
          borderBottomLeftRadius: borderRadius.full,
          borderBottomRightRadius: borderRadius.full,
        };
      default:
        return {
          ...baseStyles,
          backgroundColor: isActive ? colors.background.white : colors.background.gray50,
          color: isActive ? colors.semantic.primary : colors.text.secondary,
          border: isActive
            ? `${borderWidth[1]} solid ${colors.semantic.primary}`
            : `${borderWidth[1]} solid ${colors.border.light}`,
          borderBottomLeftRadius: variant === 'default' && isActive ? '0' : borderRadius.sm,
          borderBottomRightRadius: variant === 'default' && isActive ? '0' : borderRadius.sm,
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
          borderBottom: variant === 'underline' ? `${borderWidth[1]} solid ${colors.border.light}` : 'none',
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
                fontWeight: isActive ? '600' : '400',
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
                    e.currentTarget.style.backgroundColor = colors.background.gray100;
                  } else if (variant === 'underline') {
                    e.currentTarget.style.color = colors.text.primary;
                  } else {
                    e.currentTarget.style.backgroundColor = colors.background.gray100;
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
                  size={sizeStyles.fontSize === fontSize.xs ? 14 : sizeStyles.fontSize === fontSize.sm ? 16 : 18}
                  style={{ marginRight: '6px' }}
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
            border: `${borderWidth[1]} solid ${colors.border.light}`,
            borderTop: 'none',
            borderRadius: borderRadius.sm,
            borderTopLeftRadius: '0',
            borderTopRightRadius: '0',
            backgroundColor: colors.background.white,
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
            border: `${borderWidth[1]} solid ${colors.border.light}`,
            borderRadius: borderRadius.sm,
            borderTopLeftRadius: variant === 'underline' ? '0' : borderRadius.sm,
            borderTopRightRadius: variant === 'underline' ? '0' : borderRadius.sm,
            backgroundColor: colors.background.white,
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
