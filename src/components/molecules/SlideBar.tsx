import React from "react";
import { Icon, IconName } from "../atomic/Icon";
import {
  colors,
  spacing,
  fontSize,
  fontWeight,
  borderRadius,
  componentBorders,
  semanticBorders,
  shadows
} from "../../theme";

export interface SlideBarItem {
  value: string;
  label: string;
  icon?: IconName;
  badge?: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface SlideBarProps {
  items: SlideBarItem[];
  collapsed?: boolean;
  width?: number | string;
  collapsedWidth?: number | string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  onSelect?: (value: string) => void;
  onToggle?: (nextCollapsed: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const SlideBar: React.FC<SlideBarProps> = ({
  items,
  collapsed = false,
  width = 240,
  collapsedWidth = 72,
  header,
  footer,
  onSelect,
  onToggle,
  className,
  style
}) => {
  const handleSelect = (item: SlideBarItem) => {
    if (item.disabled) return;
    item.onClick?.();
    onSelect?.(item.value);
  };

  const resolvedWidth = collapsed ? collapsedWidth : width;

  return (
    <aside
      className={className}
      style={{
        width: typeof resolvedWidth === "number" ? `${resolvedWidth}px` : resolvedWidth,
        backgroundColor: colors.background.white,
        borderRight: componentBorders.card.default,
        boxShadow: shadows.xs,
        display: "flex",
        flexDirection: "column",
        transition: "width 0.2s ease",
        ...style
      }}
      aria-label="사이드바 내비게이션"
    >
      {header && (
        <div
          style={{
            padding: `${spacing.sm} ${spacing.md}`,
            borderBottom: semanticBorders.default,
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "space-between",
            gap: spacing.sm
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: spacing.sm }}>
            {header}
          </div>
          {onToggle && (
            <button
              type="button"
              onClick={() => onToggle(!collapsed)}
              aria-label={collapsed ? "사이드바 펼치기" : "사이드바 접기"}
              style={{
                border: componentBorders.button.outline,
                backgroundColor: colors.background.white,
                borderRadius: borderRadius.sm,
                padding: `${spacing.xxs} ${spacing.xs}`,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: spacing.xxs,
                fontSize: fontSize.xs,
                color: colors.semantic.text
              }}
            >
              <Icon
                name={collapsed ? "arrow-right" : "arrow-left"}
                size={16}
                color={colors.semantic.text}
              />
              {!collapsed && <span>접기</span>}
            </button>
          )}
        </div>
      )}

      <nav
        aria-label="사이드바 메뉴"
        style={{
          flex: 1,
          padding: `${spacing.sm} ${spacing.xs}`,
          display: "flex",
          flexDirection: "column",
          gap: spacing.xs
        }}
      >
        {items.map((item) => {
          const isActive = item.active;
          return (
            <button
              key={item.value}
              type="button"
              disabled={item.disabled}
              onClick={() => handleSelect(item)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: collapsed ? "center" : "flex-start",
                gap: spacing.xs,
                padding: collapsed ? `${spacing.xs} ${spacing.xs}` : `${spacing.xs} ${spacing.sm}`,
                borderRadius: borderRadius.sm,
                border: "none",
                backgroundColor: isActive ? colors.info[50] : "transparent",
                color: item.disabled ? colors.semantic.muted : colors.semantic.text,
                cursor: item.disabled ? "not-allowed" : "pointer",
                transition: "background-color 0.2s ease, color 0.2s ease",
                boxShadow: isActive ? shadows.xs : "none"
              }}
              aria-pressed={isActive}
            >
              {item.icon && (
                <Icon
                  name={item.icon}
                  size={18}
                  color={item.disabled ? colors.semantic.muted : colors.semantic.text}
                />
              )}
              {!collapsed && (
                <span
                  style={{
                    flex: 1,
                    textAlign: "left",
                    fontSize: fontSize.sm,
                    fontWeight: isActive ? fontWeight.semibold : fontWeight.normal
                  }}
                >
                  {item.label}
                </span>
              )}
              {!collapsed && item.badge && (
                <span
                  style={{
                    minWidth: "20px",
                    padding: `2px ${spacing.xxs}`,
                    borderRadius: borderRadius.full,
                    backgroundColor: colors.semantic.primary,
                    color: colors.background.white,
                    fontSize: fontSize.xs,
                    fontWeight: fontWeight.semibold,
                    textAlign: "center"
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {footer && (
        <div
          style={{
            padding: `${spacing.sm} ${spacing.md}`,
            borderTop: semanticBorders.default
          }}
        >
          {footer}
        </div>
      )}
    </aside>
  );
};
