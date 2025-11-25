import React from "react";
import { within, userEvent } from "@storybook/testing-library";
import { SlideBar } from "../components";
import { SlideBarItem } from "../components/molecules/SlideBar";
import { action } from "./actions";
import { colors, componentBorders, fontSize, fontWeight, spacing, borderRadius, shadows } from "../theme";

export default {
  title: "Layout/SlideBar",
  component: SlideBar,
  tags: ["autodocs"],
  argTypes: {
    collapsed: { control: "boolean", description: "사이드바 접힘 여부" },
    width: { control: "number", description: "펼침 상태 너비 (px)" },
    collapsedWidth: { control: "number", description: "접힘 상태 너비 (px)" },
    onSelect: { action: "item-select", description: "아이템 선택 이벤트" },
    onToggle: { action: "toggle", description: "접힘/펼침 토글 이벤트" },
  },
};

const sampleItems: SlideBarItem[] = [
  { value: "dashboard", label: "대시보드", icon: "home" },
  { value: "projects", label: "프로젝트", icon: "bookmark", badge: "3" },
  { value: "calendar", label: "캘린더", icon: "calendar" },
  { value: "team", label: "팀", icon: "user" },
  { value: "settings", label: "설정", icon: "settings" },
];

const HeaderContent = ({ collapsed }: { collapsed: boolean }) => (
  <div style={{ display: "flex", alignItems: "center", gap: spacing.xs }}>
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: borderRadius.full,
        backgroundColor: colors.semantic.primary,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: colors.background.white,
        fontWeight: fontWeight.semibold,
        fontSize: fontSize.sm,
        boxShadow: shadows.xs,
      }}
      aria-hidden
    >
      S
    </div>
    {!collapsed && (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontWeight: fontWeight.semibold, fontSize: fontSize.sm, color: colors.semantic.text }}>
          Schedule AI
        </span>
        <span style={{ fontSize: fontSize.xs, color: colors.semantic.muted }}>프로젝트 허브</span>
      </div>
    )}
  </div>
);

const FooterContent = ({ collapsed }: { collapsed: boolean }) => (
  <button
    type="button"
    style={{
      width: "100%",
      padding: `${spacing.xs} ${spacing.sm}`,
      display: "flex",
      alignItems: "center",
      justifyContent: collapsed ? "center" : "space-between",
      gap: spacing.xs,
      border: componentBorders.button.outline,
      borderRadius: borderRadius.sm,
      backgroundColor: colors.background.white,
      color: colors.semantic.text,
      cursor: "pointer",
    }}
    onClick={action("새 프로젝트")}
  >
    <span style={{ fontSize: fontSize.sm }}>새 프로젝트</span>
    {!collapsed && (
      <span
        aria-hidden
        style={{
          width: 20,
          height: 20,
          borderRadius: borderRadius.full,
          backgroundColor: colors.semantic.primary,
          color: colors.background.white,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: fontSize.xs,
          fontWeight: fontWeight.semibold,
        }}
      >
        +
      </span>
    )}
  </button>
);

export const Default = {
  args: {
    items: sampleItems,
    collapsed: false,
    width: 240,
    collapsedWidth: 72,
    onSelect: action("item-select"),
    onToggle: action("toggle"),
  },
  render: (args) => {
    const [collapsed, setCollapsed] = React.useState<boolean>(args.collapsed ?? false);
    const [active, setActive] = React.useState<string>(args.items?.[0]?.value || "dashboard");

    React.useEffect(() => {
      setCollapsed(args.collapsed ?? false);
    }, [args.collapsed]);

    const resolvedItems = (args.items || sampleItems).map((item) => ({
      ...item,
      active: item.value === active,
    }));

    const handleSelect = (value: string) => {
      setActive(value);
      args.onSelect?.(value);
    };

    const handleToggle = (next: boolean) => {
      setCollapsed(next);
      args.onToggle?.(next);
    };

    return (
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: spacing.lg, height: 420 }}>
        <SlideBar
          {...args}
          items={resolvedItems}
          collapsed={collapsed}
          header={<HeaderContent collapsed={collapsed} />}
          footer={<FooterContent collapsed={collapsed} />}
          onSelect={handleSelect}
          onToggle={handleToggle}
        />
        <div
          style={{
            border: componentBorders.card.default,
            borderRadius: borderRadius.md,
            padding: spacing.lg,
            backgroundColor: colors.gray[50],
            minHeight: "100%",
          }}
        >
          <h3 style={{ margin: 0, fontSize: fontSize.lg, fontWeight: fontWeight.semibold, color: colors.semantic.text }}>
            {active === "dashboard" ? "대시보드" : `${active} 뷰`}
          </h3>
          <p style={{ marginTop: spacing.xs, color: colors.semantic.muted, fontSize: fontSize.sm }}>
            사이드바에서 메뉴를 선택해 내용을 전환해보세요.
          </p>
          <div
            style={{
              marginTop: spacing.md,
              padding: spacing.md,
              borderRadius: borderRadius.sm,
              backgroundColor: colors.background.white,
              border: componentBorders.card.default,
            }}
          >
            현재 선택: <strong>{active}</strong>
          </div>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: any }) => {
    const canvas = within(canvasElement);
    await step("프로젝트 탭 선택", async () => {
      const projects = canvas.getByRole("button", { name: /프로젝트/ });
      await userEvent.click(projects);
    });
    await step("캘린더 탭 선택", async () => {
      const calendar = canvas.getByRole("button", { name: /캘린더/ });
      await userEvent.click(calendar);
    });
  },
  parameters: {
    docs: {
      source: {
        code: `import { SlideBar } from "../components";

const items = [
  { value: "dashboard", label: "대시보드", icon: "home" },
  { value: "projects", label: "프로젝트", icon: "folder", badge: "3" },
  { value: "calendar", label: "캘린더", icon: "calendar" },
];

<SlideBar
  items={items}
  collapsed={false}
  onSelect={(value) => console.log("select", value)}
  onToggle={(next) => console.log("toggle", next)}
/>;`,
      },
    },
  },
};
