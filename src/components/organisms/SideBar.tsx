import React from 'react';
import { Text } from '../atomic/Text';
import { Icon, IconName } from '../atomic/Icon';
import { colors, componentBorders, fontWeight, spacing, borderRadius } from '../../theme';

/**
 * 사이드바 메뉴 아이템 인터페이스
 */
export interface SideBarItem {
  /** 고유 식별자 */
  id: string;
  /** 표시될 라벨 텍스트 */
  label: string;
  /** 아이콘 이름 (선택사항) */
  icon?: IconName;
  /** 링크 URL (선택사항) */
  href?: string;
  /** 클릭 이벤트 핸들러 (선택사항) */
  onClick?: () => void;
  /** 활성 상태 여부 */
  active?: boolean;
  /** 비활성 상태 여부 */
  disabled?: boolean;
  /** 뱃지 텍스트 또는 숫자 (선택사항) */
  badge?: string | number;
  /** 하위 메뉴 아이템들 (선택사항) */
  children?: SideBarItem[];
}

/**
 * 사이드바 컴포넌트 Props
 */
export interface SideBarProps {
  /** 사이드바 상단에 표시될 제목 */
  title?: string;
  /** 사이드바 상단에 표시될 로고 컴포넌트 */
  logo?: React.ReactNode;
  /** 메뉴 아이템 목록 */
  items: SideBarItem[];
  /** 사이드바 스타일 변형 */
  variant?: 'default' | 'compact' | 'floating';
  /** 사이드바 너비 크기 */
  width?: 'narrow' | 'medium' | 'wide';
  /** 메뉴 아이템 간격 크기 */
  itemSpacing?: 'compact' | 'normal' | 'comfortable';
  /** 타이틀 텍스트 크기 */
  titleSize?: 'small' | 'medium' | 'large';
  /** 메뉴 텍스트 크기 */
  menuTextSize?: 'small' | 'medium' | 'large';
  /** 접기/펼치기 기능 활성화 여부 */
  collapsible?: boolean;
  /** 접힌 상태 여부 (제어된 컴포넌트) */
  collapsed?: boolean;
  /** 접기/펼치기 상태 변경 콜백 */
  onCollapseToggle?: (collapsed: boolean) => void;
  /** 사이드바 하단에 표시될 푸터 컴포넌트 */
  footer?: React.ReactNode;
  /** CSS 클래스명 */
  className?: string;
  /** 인라인 스타일 */
  style?: React.CSSProperties;
}

/**
 * 레이아웃 구성에 사용되는 사이드바 컴포넌트
 *
 * 네비게이션 메뉴, 계층 구조, 접기/펼치기 기능을 제공합니다.
 *
 * @example
 * ```tsx
 * const menuItems = [
 *   {
 *     id: 'dashboard',
 *     label: '대시보드',
 *     icon: 'home',
 *     active: true,
 *     onClick: () => navigate('/dashboard'),
 *   },
 *   {
 *     id: 'projects',
 *     label: '프로젝트',
 *     icon: 'folder',
 *     badge: '3',
 *     children: [
 *       {
 *         id: 'project-a',
 *         label: '프로젝트 A',
 *         onClick: () => navigate('/projects/a'),
 *       },
 *     ],
 *   },
 * ];
 *
 * <SideBar
 *   title="My App"
 *   items={menuItems}
 *   collapsible
 *   width="medium"
 * />
 * ```
 */
export const SideBar: React.FC<SideBarProps> = ({
  title,
  logo,
  items,
  variant = 'default',
  width = 'medium',
  itemSpacing = 'normal',
  titleSize = 'medium',
  menuTextSize = 'medium',
  collapsible = false,
  collapsed = false,
  onCollapseToggle,
  footer,
  className = '',
  style = {},
}) => {
  const [expandedItems, setExpandedItems] = React.useState<Set<string>>(new Set());
  const getWidthStyles = () => {
    if (collapsed) {
      return { width: '64px', minWidth: '64px' };
    }

    switch (width) {
      case 'narrow':
        return { width: '200px', minWidth: '200px' };
      case 'wide':
        return { width: '320px', minWidth: '320px' };
      case 'medium':
      default:
        return { width: '240px', minWidth: '240px' };
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return {
          backgroundColor: colors.gray[50],
          border: `1px solid ${colors.border.default}`,
          padding: spacing.xs,
        };
      case 'floating':
        return {
          backgroundColor: colors.background.white,
          border: componentBorders.card.default,
          borderRadius: borderRadius.lg,
          margin: spacing.md,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: spacing.md,
        };
      case 'default':
      default:
        return {
          backgroundColor: colors.background.white,
          borderRight: `1px solid ${colors.border.default}`,
          padding: spacing.md,
        };
    }
  };

  const widthStyles = getWidthStyles();
  const variantStyles = getVariantStyles();

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    boxSizing: 'border-box',
    transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1), min-width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    ...widthStyles,
    ...variantStyles,
    ...style,
  };

  const headerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
    padding: collapsed ? spacing.xs : spacing.sm,
    borderRadius: borderRadius.sm,
    justifyContent: collapsed ? 'center' : 'space-between',
  };

  const navigationStyles: React.CSSProperties = {
    flex: '1',
    overflowY: 'auto',
    overflowX: 'hidden',
  };

  const footerStyles: React.CSSProperties = {
    marginTop: 'auto',
    paddingTop: spacing.md,
    borderTop: `1px solid ${colors.border.default}`,
  };

  const collapseButtonStyles: React.CSSProperties = {
    width: '28px',
    height: '28px',
    border: `1px solid ${colors.border.default}`,
    borderRadius: '6px',
    backgroundColor: colors.background.white,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    color: colors.semantic.text,
    transition: 'all 0.2s ease-in-out',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  };

  const handleCollapseToggle = () => {
    onCollapseToggle?.(!collapsed);
  };

  const toggleItemExpansion = (itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const getItemSpacingStyles = () => {
    switch (itemSpacing) {
      case 'compact':
        return { marginBottom: spacing.xxs, padding: `${spacing.xxs} ${spacing.xs}` };
      case 'comfortable':
        return { marginBottom: spacing.sm, padding: `${spacing.sm} ${spacing.md}` };
      case 'normal':
      default:
        return { marginBottom: spacing.xxs, padding: `${spacing.xs} ${spacing.sm}` };
    }
  };

  const getTitleSize = () => {
    switch (titleSize) {
      case 'small':
        return 'h6';
      case 'large':
        return 'h4';
      case 'medium':
      default:
        return 'h5';
    }
  };

  const getMenuTextSize = () => {
    switch (menuTextSize) {
      case 'small':
        return 'caption';
      case 'large':
        return 'body1';
      case 'medium':
      default:
        return 'body2';
    }
  };

  const renderSideBarItem = (item: SideBarItem, level: number = 0) => {
    const spacingStyles = getItemSpacingStyles();
    const itemStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: collapsed ? '0' : spacing.sm,
      padding: collapsed ? spacing.xs : spacingStyles.padding,
      marginBottom: spacingStyles.marginBottom,
      borderRadius: borderRadius.sm,
      cursor: item.disabled ? 'not-allowed' : 'pointer',
      opacity: item.disabled ? 0.5 : 1,
      backgroundColor: item.active ? colors.semantic.primary + '10' : 'transparent',
      color: item.active ? colors.semantic.primary : colors.semantic.text,
      transition: 'all 0.2s ease-in-out',
      position: 'relative',
      marginLeft: level > 0 ? spacing.lg : '0',
      justifyContent: collapsed ? 'center' : 'flex-start',
      minHeight: itemSpacing === 'comfortable' ? '44px' : itemSpacing === 'compact' ? '32px' : '36px',
    };

    const badgeStyles: React.CSSProperties = {
      backgroundColor: colors.semantic.error,
      color: colors.background.white,
      fontSize: '10px',
      fontWeight: fontWeight.semibold,
      padding: '2px 6px',
      borderRadius: '10px',
      minWidth: '16px',
      height: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 'auto',
    };

    const handleItemClick = () => {
      if (item.disabled) return;

      // 하위 메뉴가 있는 경우 expansion 토글
      if (item.children && item.children.length > 0) {
        toggleItemExpansion(item.id);
      } else if (item.onClick) {
        // 하위 메뉴가 없는 경우에만 onClick 실행
        item.onClick();
      }
    };

    const isExpanded = expandedItems.has(item.id);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <React.Fragment key={item.id}>
        <div
          style={itemStyles}
          onClick={handleItemClick}
          onMouseEnter={(e) => {
            if (!item.disabled && !item.active) {
              e.currentTarget.style.backgroundColor = colors.background.gray;
            }
          }}
          onMouseLeave={(e) => {
            if (!item.disabled && !item.active) {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
        >
          {item.icon && (
            <Icon
              name={item.icon}
              size={16}
              color={item.active ? colors.semantic.primary : colors.semantic.text}
            />
          )}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flex: 1,
              gap: spacing.xs,
              opacity: collapsed ? 0 : 1,
              transition: 'opacity 0.3s ease-in-out',
              overflow: 'hidden',
              pointerEvents: collapsed ? 'none' : 'auto',
            }}
          >
            <Text
              variant={getMenuTextSize() as any}
              style={{
                margin: 0,
                color: 'inherit',
                fontWeight: item.active ? fontWeight.semibold : fontWeight.normal,
                flex: 1,
                whiteSpace: 'nowrap',
              }}
            >
              {item.label}
            </Text>
            {item.badge && (
              <div style={badgeStyles}>
                {item.badge}
              </div>
            )}
            {hasChildren && (
              <Icon
                name="chevron-right"
                size={12}
                color={colors.semantic.muted}
                style={{
                  transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease-in-out',
                }}
              />
            )}
          </div>
        </div>
        {!collapsed && hasChildren && (
          <div
            style={{
              overflow: 'hidden',
              maxHeight: isExpanded ? '1000px' : '0px',
              transition: 'max-height 0.3s ease-in-out',
            }}
          >
            {item.children!.map(child =>
              renderSideBarItem(child, level + 1)
            )}
          </div>
        )}
      </React.Fragment>
    );
  };

  return (
    <aside className={className}>
      <div style={containerStyles}>
        {/* Header Section */}
        {(title || logo || collapsible) && (
          <div style={headerStyles}>
            {!collapsed && (
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
                {logo && <div>{logo}</div>}
                {title && (
                  <Text
                    variant={getTitleSize() as any}
                    style={{
                      margin: 0,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {title}
                  </Text>
                )}
              </div>
            )}
            {collapsible && (
              <button
                style={collapseButtonStyles}
                onClick={handleCollapseToggle}
                aria-label={collapsed ? "사이드바 펼치기" : "사이드바 접기"}
                title={collapsed ? "사이드바 펼치기" : "사이드바 접기"}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.background.gray;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.background.white;
                }}
              >
                <Icon
                  name={collapsed ? "arrow-right" : "arrow-left"}
                  size={12}
                  color={colors.semantic.text}
                />
              </button>
            )}
          </div>
        )}

        {/* Navigation Section */}
        <nav style={navigationStyles}>
          {items.map(item => renderSideBarItem(item))}
        </nav>

        {/* Footer Section */}
        {footer && (
          <div
            style={{
              ...footerStyles,
              opacity: collapsed ? 0 : 1,
              transition: 'opacity 0.3s ease-in-out',
              pointerEvents: collapsed ? 'none' : 'auto',
              overflow: 'hidden',
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </aside>
  );
};