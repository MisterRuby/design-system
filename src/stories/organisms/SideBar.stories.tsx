import React, { useState } from "react";
import { action } from "../actions";
import { userEvent, within } from "@storybook/testing-library";
import { SideBar, SideBarProps } from "../../components/organisms/SideBar";
import { Button } from "../../components/atomic/Button";
import { Text } from "../../components/atomic/Text";
import { colors, spacing } from "../../tokens";

const meta = {
  title: "Components/Organisms/SideBar",
  component: SideBar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "레이아웃 구성에 사용되는 사이드바 컴포넌트입니다. 네비게이션 메뉴, 계층 구조, 접기/펼치기 기능을 제공합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      description: "사이드바 상단에 표시될 제목",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    variant: {
      description:
        "사이드바의 시각적 스타일. default: 기본 스타일, compact: 간소화된 스타일, floating: 떠있는 스타일",
      control: "select",
      options: ["default", "compact", "floating"],
      table: {
        type: { summary: "default | compact | floating" },
        defaultValue: { summary: "default" },
      },
    },
    width: {
      description:
        "사이드바의 너비 크기. narrow: 200px, medium: 240px, wide: 320px",
      control: "select",
      options: ["narrow", "medium", "wide"],
      table: {
        type: { summary: "narrow | medium | wide" },
        defaultValue: { summary: "medium" },
      },
    },
    itemSpacing: {
      description:
        "메뉴 아이템 간격 크기. compact: 조밀, normal: 보통, comfortable: 넓음",
      control: "select",
      options: ["compact", "normal", "comfortable"],
      table: {
        type: { summary: "compact | normal | comfortable" },
        defaultValue: { summary: "normal" },
      },
    },
    titleSize: {
      description: "타이틀 텍스트 크기. small: 작음, medium: 보통, large: 큼",
      control: "select",
      options: ["small", "medium", "large"],
      table: {
        type: { summary: "small | medium | large" },
        defaultValue: { summary: "medium" },
      },
    },
    menuTextSize: {
      description: "메뉴 텍스트 크기. small: 작음, medium: 보통, large: 큼",
      control: "select",
      options: ["small", "medium", "large"],
      table: {
        type: { summary: "small | medium | large" },
        defaultValue: { summary: "medium" },
      },
    },
    collapsible: {
      description:
        "접기/펼치기 기능 활성화 여부. true일 때 버튼이 표시되어 사이드바를 접을 수 있습니다.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    collapsed: {
      description:
        "접힌 상태 여부 (제어된 컴포넌트). onCollapseToggle과 함께 사용합니다.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    items: {
      description:
        "사이드바 메뉴 아이템 목록. 각 아이템은 id, label, icon, onClick 등의 속성을 가집니다.",
      control: "object",
      table: {
        type: { summary: "SideBarItem[]" },
      },
    },
    logo: {
      description:
        "사이드바 상단에 표시될 로고 컴포넌트. React 노드를 전달할 수 있습니다.",
      control: false,
      table: {
        type: { summary: "React.ReactNode" },
        defaultValue: { summary: "undefined" },
      },
    },
    footer: {
      description:
        "사이드바 하단에 표시될 푸터 컴포넌트. 로그아웃 버튼이나 버전 정보 등을 표시할 수 있습니다.",
      control: false,
      table: {
        type: { summary: "React.ReactNode" },
        defaultValue: { summary: "undefined" },
      },
    },
    onCollapseToggle: {
      description: "접기/펼치기 상태 변경 시 호출되는 콜백 함수",
      control: false,
      table: {
        type: { summary: "(collapsed: boolean) => void" },
        defaultValue: { summary: "undefined" },
      },
    },
    className: {
      description: "추가 CSS 클래스명",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    style: {
      description: "인라인 스타일 객체",
      control: false,
      table: {
        type: { summary: "React.CSSProperties" },
        defaultValue: { summary: "undefined" },
      },
    },
  },
};

export default meta;

const mockItems = [
  {
    id: "dashboard",
    label: "대시보드",
    icon: "home" as const,
    active: true,
    onClick: action("dashboard-click"),
  },
  {
    id: "projects",
    label: "프로젝트",
    icon: "folder" as const,
    onClick: action("projects-click"),
    children: [
      {
        id: "project-1",
        label: "프로젝트 A",
        onClick: action("project-a-click"),
      },
      {
        id: "project-2",
        label: "프로젝트 B",
        onClick: action("project-b-click"),
      },
    ],
  },
  {
    id: "tasks",
    label: "작업",
    icon: "check-square" as const,
    onClick: action("tasks-click"),
  },
  {
    id: "calendar",
    label: "캘린더",
    icon: "calendar" as const,
    onClick: action("calendar-click"),
  },
  {
    id: "messages",
    label: "메시지",
    icon: "message-circle" as const,
    onClick: action("messages-click"),
  },
  {
    id: "settings",
    label: "설정",
    icon: "settings" as const,
    onClick: action("settings-click"),
  },
  {
    id: "help",
    label: "도움말",
    icon: "help-circle" as const,
    disabled: true,
    onClick: action("help-click"),
  },
];

const DemoLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      display: "flex",
      overflow: "hidden",
    }}>
    {children}
    <main
      style={{
        flex: 1,
        padding: spacing.lg,
        backgroundColor: colors.background.gray,
        overflow: "auto",
        minWidth: 0,
      }}>
      <div
        style={{
          backgroundColor: colors.background.white,
          padding: spacing.lg,
          borderRadius: "8px",
          border: `1px solid ${colors.border.default}`,
          height: "fit-content",
          maxWidth: "100%",
        }}>
        <Text
          variant="h2"
          style={{ marginBottom: spacing.md, fontSize: "1.5rem" }}>
          메인 콘텐츠 영역
        </Text>
        <Text
          variant="body2"
          style={{ color: colors.semantic.muted, lineHeight: 1.5 }}>
          사이드바와 함께 사용되는 메인 콘텐츠 영역입니다. 사이드바의 메뉴를
          클릭하면 Actions 패널에서 이벤트를 확인할 수 있습니다.
        </Text>
      </div>
    </main>
  </div>
);

export const Default = {
  args: {
    title: "My App",
    items: mockItems,
  },
  render: (args: SideBarProps) => (
    <DemoLayout>
      <SideBar {...args} />
    </DemoLayout>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SideBar
  title="My App"
  items={[
    {
      id: "dashboard",
      label: "대시보드",
      icon: "home",
      active: true,
      onClick: () => console.log("dashboard clicked"),
    },
    {
      id: "projects",
      label: "프로젝트",
      icon: "folder",
      onClick: () => console.log("projects clicked"),
    },
    // ... 추가 아이템들
  ]}
/>`,
      },
    },
  },
};

export const WithLogo = {
  args: {
    logo: (
      <div
        style={{
          width: "32px",
          height: "32px",
          backgroundColor: colors.semantic.primary,
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: colors.background.white,
          fontWeight: "bold",
        }}>
        A
      </div>
    ),
    title: "Awesome App",
    items: mockItems,
  },
  render: (args: SideBarProps) => (
    <DemoLayout>
      <SideBar {...args} />
    </DemoLayout>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SideBar
  logo={<CustomLogo />}
  title="Awesome App"
  items={menuItems}
/>`,
      },
    },
  },
};

export const Collapsible = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
      <DemoLayout>
        <SideBar
          title="접기 가능한 앱"
          items={mockItems}
          collapsible
          collapsed={collapsed}
          onCollapseToggle={setCollapsed}
        />
      </DemoLayout>
    );
  },
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: any }) => {
    const canvas = within(canvasElement);

    await step("사이드바 접기 버튼 클릭", async () => {
      const collapseButton = canvas.getByRole('button', { name: '사이드바 접기' });
      await userEvent.click(collapseButton);
      await new Promise(resolve => setTimeout(resolve, 1200)); // 접기 애니메이션 완료 대기
    });

    await step("접힌 상태에서 다시 펼치기", async () => {
      await new Promise(resolve => setTimeout(resolve, 600)); // 단계 간 구분을 위한 추가 대기
      const expandButton = canvas.getByRole('button', { name: '사이드바 펼치기' });
      await userEvent.click(expandButton);
      await new Promise(resolve => setTimeout(resolve, 1200)); // 펼치기 애니메이션 완료 대기
    });
  },
  parameters: {
    docs: {
      source: {
        code: `function CollapsibleSideBar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SideBar
      title="접기 가능한 앱"
      items={menuItems}
      collapsible
      collapsed={collapsed}
      onCollapseToggle={setCollapsed}
    />
  );
}`,
      },
    },
  },
};

export const WithFooter = {
  args: {
    title: "Dashboard",
    items: mockItems,
    footer: (
      <div>
        <div style={{ marginBottom: spacing.sm }}>
          <Button variant="outline" size="small" style={{ width: "100%" }}>
            로그아웃
          </Button>
        </div>
        <Text
          variant="caption"
          style={{
            color: colors.semantic.muted,
            textAlign: "center",
            display: "block",
          }}>
          v1.0.0
        </Text>
      </div>
    ),
  },
  render: (args: SideBarProps) => (
    <DemoLayout>
      <SideBar {...args} />
    </DemoLayout>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SideBar
  title="Dashboard"
  items={menuItems}
  footer={
    <div>
      <Button variant="outline" size="small">
        로그아웃
      </Button>
      <Text variant="caption">v1.0.0</Text>
    </div>
  }
/>`,
      },
    },
  },
};

export const Variants = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: spacing.xl,
        height: "100vh",
        padding: spacing.lg,
      }}>
      <SideBar
        title="Default"
        variant="default"
        width="narrow"
        items={mockItems.slice(0, 4)}
      />
      <SideBar
        title="Compact"
        variant="compact"
        width="narrow"
        items={mockItems.slice(0, 4)}
      />
      <SideBar
        title="Floating"
        variant="floating"
        width="narrow"
        items={mockItems.slice(0, 4)}
      />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `// Default 스타일
<SideBar variant="default" />

// Compact 스타일
<SideBar variant="compact" />

// Floating 스타일
<SideBar variant="floating" />`,
      },
    },
  },
};

export const WidthSizes = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: spacing.xl,
        height: "100vh",
        padding: spacing.lg,
      }}>
      <SideBar title="Narrow" width="narrow" items={mockItems.slice(0, 3)} />
      <SideBar title="Medium" width="medium" items={mockItems.slice(0, 3)} />
      <SideBar title="Wide" width="wide" items={mockItems.slice(0, 3)} />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `// 좁은 너비 (200px)
<SideBar width="narrow" />

// 기본 너비 (240px)
<SideBar width="medium" />

// 넓은 너비 (320px)
<SideBar width="wide" />`,
      },
    },
  },
};

export const SpacingOptions = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: spacing.xl,
        height: "100vh",
        padding: spacing.lg,
      }}>
      <SideBar
        title="Compact"
        itemSpacing="compact"
        width="narrow"
        items={mockItems.slice(0, 4)}
      />
      <SideBar
        title="Normal"
        itemSpacing="normal"
        width="medium"
        items={mockItems.slice(0, 4)}
      />
      <SideBar
        title="Comfortable"
        itemSpacing="comfortable"
        width="medium"
        items={mockItems.slice(0, 4)}
      />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `// 조밀한 간격
<SideBar itemSpacing="compact" />

// 기본 간격
<SideBar itemSpacing="normal" />

// 넓은 간격
<SideBar itemSpacing="comfortable" />`,
      },
    },
  },
};

export const TextSizes = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: spacing.xl,
        height: "100vh",
        padding: spacing.lg,
      }}>
      <SideBar
        title="Small Text"
        titleSize="small"
        menuTextSize="small"
        width="narrow"
        items={mockItems.slice(0, 4)}
      />
      <SideBar
        title="Medium Text"
        titleSize="medium"
        menuTextSize="medium"
        width="medium"
        items={mockItems.slice(0, 4)}
      />
      <SideBar
        title="Large Text"
        titleSize="large"
        menuTextSize="large"
        width="medium"
        items={mockItems.slice(0, 4)}
      />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `// 작은 텍스트
<SideBar
  titleSize="small"
  menuTextSize="small"
/>

// 기본 텍스트
<SideBar
  titleSize="medium"
  menuTextSize="medium"
/>

// 큰 텍스트
<SideBar
  titleSize="large"
  menuTextSize="large"
/>`,
      },
    },
  },
};

export const CustomLayout = {
  args: {
    title: "맞춤 설정",
    items: mockItems,
    itemSpacing: "comfortable",
    titleSize: "large",
    menuTextSize: "medium",
    width: "wide",
  },
  render: (args: SideBarProps) => (
    <DemoLayout>
      <SideBar {...args} />
    </DemoLayout>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SideBar
  title="맞춤 설정"
  items={menuItems}
  itemSpacing="comfortable"
  titleSize="large"
  menuTextSize="medium"
  width="wide"
/>`,
      },
    },
  },
};

export const HierarchicalMenu = {
  args: {
    title: "계층형 메뉴",
    items: [
      {
        id: "dashboard",
        label: "대시보드",
        icon: "home" as const,
        active: true,
        onClick: action("dashboard-click"),
      },
      {
        id: "workspace",
        label: "워크스페이스",
        icon: "briefcase" as const,
        onClick: action("workspace-click"),
        children: [
          {
            id: "team-a",
            label: "팀 A",
            onClick: action("team-a-click"),
            children: [
              {
                id: "project-1",
                label: "프로젝트 1",
                onClick: action("project-1-click"),
              },
              {
                id: "project-2",
                label: "프로젝트 2",
                onClick: action("project-2-click"),
              },
            ],
          },
          {
            id: "team-b",
            label: "팀 B",
            onClick: action("team-b-click"),
          },
        ],
      },
      {
        id: "reports",
        label: "리포트",
        icon: "bar-chart" as const,
        onClick: action("reports-click"),
        children: [
          {
            id: "sales",
            label: "매출 리포트",
            onClick: action("sales-click"),
          },
          {
            id: "analytics",
            label: "분석 리포트",
            onClick: action("analytics-click"),
          },
        ],
      },
    ],
  },
  render: (args: SideBarProps) => (
    <DemoLayout>
      <SideBar {...args} />
    </DemoLayout>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SideBar
  items={[
    {
      id: "workspace",
      label: "워크스페이스",
      icon: "briefcase",
      children: [
        {
          id: "team-a",
          label: "팀 A",
          children: [
            { id: "project-1", label: "프로젝트 1" },
            { id: "project-2", label: "프로젝트 2" },
          ],
        },
        { id: "team-b", label: "팀 B" },
      ],
    },
  ]}
/>`,
      },
    },
  },
};
