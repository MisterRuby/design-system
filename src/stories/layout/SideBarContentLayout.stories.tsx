import React from "react";
import { action } from "../actions";
import { userEvent, within } from "@storybook/testing-library";
import {
  SideBarContentLayout,
  SideBarContentLayoutProps,
} from "../../components/layout/SideBarContentLayout";
import { Button } from "../../components/atomic/Button";
import { Text } from "../../components/atomic/Text";
import { colors, spacing, fontWeight } from "../../theme";

const meta = {
  title: "Layout/SideBarContentLayout",
  component: SideBarContentLayout,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "SideBar와 Content로 구성된 레이아웃입니다. 대시보드, 문서 사이트, 관리자 패널 등에 적합한 사이드 네비게이션 구조를 제공합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description:
        "레이아웃 스타일 변형. default: 기본 스타일, fixed: 고정 위치, overlay: 오버레이 스타일",
      control: "select",
      options: ["default", "fixed", "overlay"],
      table: {
        type: { summary: "default | fixed | overlay" },
        defaultValue: { summary: "default" },
      },
    },
    contentPadding: {
      description: "콘텐츠 영역의 패딩",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: spacing.xl },
      },
    },
    contentBackgroundColor: {
      description: "콘텐츠 영역의 배경색",
      control: "color",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: colors.background.white },
      },
    },
    gap: {
      description: "사이드바와 콘텐츠 사이 간격",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "0" },
      },
    },
    sideBar: {
      description: "사이드바 컴포넌트 설정",
      control: "object",
      table: {
        type: { summary: "SideBarProps" },
      },
    },
    children: {
      description: "메인 콘텐츠",
      control: false,
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
  },
};

export default meta;

// Mock 사이드바 아이템들
const dashboardItems = [
  {
    id: "dashboard",
    label: "대시보드",
    icon: "home" as const,
    active: true,
    onClick: action("dashboard-clicked"),
  },
  {
    id: "analytics",
    label: "분석",
    icon: "bar-chart" as const,
    onClick: action("analytics-clicked"),
  },
  {
    id: "users",
    label: "사용자 관리",
    icon: "user" as const,
    onClick: action("users-clicked"),
  },
  {
    id: "projects",
    label: "프로젝트",
    icon: "folder" as const,
    onClick: action("projects-clicked"),
    children: [
      {
        id: "active-projects",
        label: "진행 중인 프로젝트",
        onClick: action("active-projects-clicked"),
      },
      {
        id: "completed-projects",
        label: "완료된 프로젝트",
        onClick: action("completed-projects-clicked"),
      },
    ],
  },
  {
    id: "tasks",
    label: "작업 관리",
    icon: "check-square" as const,
    onClick: action("tasks-clicked"),
  },
  {
    id: "messages",
    label: "메시지",
    icon: "message-circle" as const,
    onClick: action("messages-clicked"),
  },
  {
    id: "settings",
    label: "설정",
    icon: "settings" as const,
    onClick: action("settings-clicked"),
  },
];

const docsItems = [
  {
    id: "getting-started",
    label: "시작하기",
    icon: "star" as const,
    active: true,
    onClick: action("getting-started-clicked"),
  },
  {
    id: "installation",
    label: "설치",
    icon: "download" as const,
    onClick: action("installation-clicked"),
  },
  {
    id: "components",
    label: "컴포넌트",
    icon: "briefcase" as const,
    onClick: action("components-clicked"),
    children: [
      {
        id: "buttons",
        label: "버튼",
        onClick: action("buttons-clicked"),
      },
      {
        id: "inputs",
        label: "입력 필드",
        onClick: action("inputs-clicked"),
      },
      {
        id: "navigation",
        label: "네비게이션",
        onClick: action("navigation-clicked"),
      },
    ],
  },
  {
    id: "guides",
    label: "가이드",
    icon: "help-circle" as const,
    onClick: action("guides-clicked"),
    children: [
      {
        id: "best-practices",
        label: "모범 사례",
        onClick: action("best-practices-clicked"),
      },
      {
        id: "accessibility",
        label: "접근성",
        onClick: action("accessibility-clicked"),
      },
    ],
  },
  {
    id: "api",
    label: "API 참조",
    icon: "folder" as const,
    onClick: action("api-clicked"),
  },
];

// Mock 콘텐츠 컴포넌트들
const DashboardContent: React.FC = () => (
  <div>
    <div style={{ marginBottom: spacing.xl }}>
      <Text variant="h1" style={{ marginBottom: spacing.sm }}>
        대시보드
      </Text>
      <Text variant="body1" style={{ color: colors.semantic.muted }}>
        시스템 현황과 주요 지표를 한눈에 확인하세요.
      </Text>
    </div>

    {/* 통계 카드들 */}
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: spacing.lg,
      marginBottom: spacing.xl
    }}>
      {[
        { title: "총 사용자", value: "12,345", change: "+5.2%" },
        { title: "월간 방문자", value: "89,123", change: "+12.5%" },
        { title: "수익", value: "₩1,234,567", change: "+8.1%" },
        { title: "전환율", value: "3.4%", change: "-0.3%" },
      ].map((stat, index) => (
        <div key={index} style={{
          backgroundColor: colors.background.white,
          border: `1px solid ${colors.border.default}`,
          borderRadius: "8px",
          padding: spacing.lg,
        }}>
          <Text variant="caption" style={{ color: colors.semantic.muted, display: "block", marginBottom: spacing.xs }}>
            {stat.title}
          </Text>
          <Text variant="h3" style={{ marginBottom: spacing.xs }}>
            {stat.value}
          </Text>
          <Text variant="caption" style={{
            color: stat.change.startsWith('+') ? colors.semantic.success : colors.semantic.error
          }}>
            {stat.change}
          </Text>
        </div>
      ))}
    </div>

    {/* 차트 영역 */}
    <div style={{
      backgroundColor: colors.background.white,
      border: `1px solid ${colors.border.default}`,
      borderRadius: "8px",
      padding: spacing.lg,
      marginBottom: spacing.xl,
    }}>
      <Text variant="h4" style={{ marginBottom: spacing.md }}>
        월별 트렌드
      </Text>
      <div style={{
        height: "200px",
        backgroundColor: colors.background.gray,
        borderRadius: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Text variant="body2" style={{ color: colors.semantic.muted }}>
          차트 영역 (실제 구현 시 차트 라이브러리 사용)
        </Text>
      </div>
    </div>

    {/* 액션 버튼들 */}
    <div style={{ display: "flex", gap: spacing.md }}>
      <Button variant="primary" onClick={action("export-clicked")}>
        데이터 내보내기
      </Button>
      <Button variant="outline" onClick={action("refresh-clicked")}>
        새로고침
      </Button>
    </div>
  </div>
);

const DocumentationContent: React.FC = () => (
  <div>
    <div style={{ marginBottom: spacing.xl }}>
      <Text variant="h1" style={{ marginBottom: spacing.sm }}>
        시작하기
      </Text>
      <Text variant="body1" style={{ color: colors.semantic.muted, lineHeight: 1.6 }}>
        이 가이드는 프로젝트를 시작하는데 필요한 모든 정보를 제공합니다.
      </Text>
    </div>

    {/* 단계별 가이드 */}
    <div style={{ marginBottom: spacing.xl }}>
      <Text variant="h3" style={{ marginBottom: spacing.lg }}>
        설치 단계
      </Text>

      {[
        {
          step: 1,
          title: "패키지 설치",
          description: "npm 또는 yarn을 사용하여 패키지를 설치하세요.",
          code: "npm install @company/design-system"
        },
        {
          step: 2,
          title: "설정",
          description: "프로젝트에 필요한 기본 설정을 진행하세요.",
          code: "import { ThemeProvider } from '@company/design-system'"
        },
        {
          step: 3,
          title: "첫 번째 컴포넌트",
          description: "Button 컴포넌트로 시작해보세요.",
          code: '<Button variant="primary">클릭하세요</Button>'
        }
      ].map((item) => (
        <div key={item.step} style={{
          marginBottom: spacing.lg,
          border: `1px solid ${colors.border.default}`,
          borderRadius: "8px",
          overflow: "hidden"
        }}>
          <div style={{
            padding: spacing.lg,
            backgroundColor: colors.background.gray,
            borderBottom: `1px solid ${colors.border.default}`
          }}>
            <Text variant="h5" style={{ marginBottom: spacing.xs }}>
              {item.step}단계: {item.title}
            </Text>
            <Text variant="body2" style={{ color: colors.semantic.muted }}>
              {item.description}
            </Text>
          </div>
          <div style={{
            padding: spacing.md,
            backgroundColor: colors.gray[900],
            color: colors.background.white,
            fontFamily: "monospace",
            fontSize: "14px"
          }}>
            {item.code}
          </div>
        </div>
      ))}
    </div>

    {/* 다음 단계 */}
    <div style={{
      backgroundColor: colors.info[50],
      padding: spacing.lg,
      borderRadius: "8px",
      borderLeft: `4px solid ${colors.semantic.info}`
    }}>
      <Text variant="h5" style={{ marginBottom: spacing.sm }}>
        다음 단계
      </Text>
      <Text variant="body2" style={{ marginBottom: spacing.md, lineHeight: 1.6 }}>
        기본 설정이 완료되었다면 다음 가이드를 확인해보세요:
      </Text>
      <ul style={{ margin: 0, paddingLeft: spacing.lg }}>
        <li style={{ marginBottom: spacing.xs }}>
          <Text variant="body2">컴포넌트 가이드</Text>
        </li>
        <li style={{ marginBottom: spacing.xs }}>
          <Text variant="body2">테마 커스터마이징</Text>
        </li>
        <li>
          <Text variant="body2">모범 사례</Text>
        </li>
      </ul>
    </div>
  </div>
);

const AdminPanelContent: React.FC = () => (
  <div>
    <div style={{ marginBottom: spacing.xl }}>
      <Text variant="h1" style={{ marginBottom: spacing.sm }}>
        사용자 관리
      </Text>
      <Text variant="body1" style={{ color: colors.semantic.muted }}>
        시스템 사용자를 관리하고 권한을 설정하세요.
      </Text>
    </div>

    {/* 액션 바 */}
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: spacing.lg,
      padding: spacing.md,
      backgroundColor: colors.background.gray,
      borderRadius: "8px"
    }}>
      <Text variant="body1" style={{ fontWeight: fontWeight.semibold }}>
        총 247명의 사용자
      </Text>
      <div style={{ display: "flex", gap: spacing.sm }}>
        <Button variant="outline" size="small" onClick={action("filter-clicked")}>
          필터
        </Button>
        <Button variant="primary" size="small" onClick={action("add-user-clicked")}>
          사용자 추가
        </Button>
      </div>
    </div>

    {/* 사용자 테이블 */}
    <div style={{
      backgroundColor: colors.background.white,
      border: `1px solid ${colors.border.default}`,
      borderRadius: "8px",
      overflow: "hidden"
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr 1fr 120px",
        gap: spacing.md,
        padding: spacing.md,
        backgroundColor: colors.background.gray,
        fontWeight: fontWeight.semibold,
        borderBottom: `1px solid ${colors.border.default}`
      }}>
        <Text variant="caption">이름</Text>
        <Text variant="caption">이메일</Text>
        <Text variant="caption">역할</Text>
        <Text variant="caption">상태</Text>
        <Text variant="caption">액션</Text>
      </div>

      {[
        { name: "김철수", email: "kim@example.com", role: "관리자", status: "활성", id: 1 },
        { name: "이영희", email: "lee@example.com", role: "사용자", status: "활성", id: 2 },
        { name: "박민수", email: "park@example.com", role: "사용자", status: "비활성", id: 3 },
        { name: "최지현", email: "choi@example.com", role: "편집자", status: "활성", id: 4 },
        { name: "장수현", email: "jang@example.com", role: "사용자", status: "활성", id: 5 },
      ].map((user) => (
        <div key={user.id} style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr 120px",
          gap: spacing.md,
          padding: spacing.md,
          borderBottom: `1px solid ${colors.border.default}`,
          alignItems: "center"
        }}>
          <Text variant="body2">{user.name}</Text>
          <Text variant="body2" style={{ color: colors.semantic.muted }}>{user.email}</Text>
          <Text variant="body2">{user.role}</Text>
          <div style={{
            padding: `${spacing.xxs} ${spacing.xs}`,
            borderRadius: "12px",
            backgroundColor: user.status === "활성" ? colors.success[100] : colors.gray[100],
            color: user.status === "활성" ? colors.success[700] : colors.gray[600],
            fontSize: "12px",
            textAlign: "center"
          }}>
            {user.status}
          </div>
          <Button variant="outline" size="small" onClick={action(`edit-user-${user.id}`)}>
            편집
          </Button>
        </div>
      ))}
    </div>
  </div>
);

// 기본 사이드바 설정들
const dashboardSideBar = {
  title: "Dashboard",
  items: dashboardItems,
  variant: "default" as const,
  width: "medium" as const,
  itemSpacing: "normal" as const,
};

const docsSideBar = {
  title: "Documentation",
  items: docsItems,
  variant: "default" as const,
  width: "medium" as const,
  itemSpacing: "normal" as const,
};

const adminSideBar = {
  title: "Admin Panel",
  items: dashboardItems,
  variant: "default" as const,
  width: "medium" as const,
  itemSpacing: "normal" as const,
};

export const Default = {
  args: {
    sideBar: dashboardSideBar,
    variant: "default",
    contentPadding: spacing.xl,
  },
  render: (args: SideBarContentLayoutProps) => (
    <SideBarContentLayout {...args}>
      <DashboardContent />
    </SideBarContentLayout>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SideBarContentLayout
  sideBar={{
    title: "Dashboard",
    items: dashboardItems
  }}
>
  <DashboardContent />
</SideBarContentLayout>`,
      },
    },
  },
};

export const CollapsibleSideBar = {
  args: {
    ...Default.args,
    sideBar: {
      ...dashboardSideBar,
      collapsible: true,
      collapsed: false,
    },
  },
  render: (args: SideBarContentLayoutProps) => {
    const [collapsed, setCollapsed] = React.useState(false);

    return (
      <SideBarContentLayout
        {...args}
        sideBar={{
          ...args.sideBar,
          collapsed,
          onCollapseToggle: (newCollapsed: boolean) => {
            setCollapsed(newCollapsed);
            action('sidebar-collapse-toggle')(newCollapsed);
          },
        }}
      >
        <DashboardContent />
      </SideBarContentLayout>
    );
  },
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: any }) => {
    const canvas = within(canvasElement);

    await step("사이드바 접기 버튼 클릭", async () => {
      const collapseButton = canvas.getByRole('button', { name: '사이드바 접기' });
      await userEvent.click(collapseButton);
      await new Promise(resolve => setTimeout(resolve, 1200)); // 접기 애니메이션 완료 대기 (0.4s + 여유 시간)
    });

    await step("접힌 상태에서 다시 펼치기", async () => {
      await new Promise(resolve => setTimeout(resolve, 600)); // 단계 간 구분을 위한 추가 대기
      const expandButton = canvas.getByRole('button', { name: '사이드바 펼치기' });
      await userEvent.click(expandButton);
      await new Promise(resolve => setTimeout(resolve, 1200)); // 펼치기 애니메이션 완료 대기 (0.4s + 여유 시간)
    });
  },
  parameters: {
    docs: {
      source: {
        code: `const [collapsed, setCollapsed] = React.useState(false);

<SideBarContentLayout
  sideBar={{
    title: "Dashboard",
    items: dashboardItems,
    collapsible: true,
    collapsed,
    onCollapseToggle: setCollapsed
  }}
>
  <DashboardContent />
</SideBarContentLayout>`,
      },
    },
  },
};

export const DocumentationLayout = {
  args: {
    sideBar: docsSideBar,
    variant: "default",
    contentPadding: `${spacing.xl} ${spacing.xl}`,
  },
  render: (args: SideBarContentLayoutProps) => (
    <SideBarContentLayout {...args}>
      <DocumentationContent />
    </SideBarContentLayout>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SideBarContentLayout
  sideBar={{
    title: "Documentation",
    items: docsItems
  }}
  contentPadding="2rem"
>
  <DocumentationContent />
</SideBarContentLayout>`,
      },
    },
  },
};

export const AdminPanelLayout = {
  args: {
    sideBar: adminSideBar,
    variant: "default",
    contentPadding: spacing.lg,
    contentBackgroundColor: colors.background.gray,
  },
  render: (args: SideBarContentLayoutProps) => (
    <SideBarContentLayout {...args}>
      <AdminPanelContent />
    </SideBarContentLayout>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SideBarContentLayout
  sideBar={{
    title: "Admin Panel",
    items: adminItems
  }}
  contentBackgroundColor={colors.background.gray}
>
  <AdminPanelContent />
</SideBarContentLayout>`,
      },
    },
  },
};

export const CompactSideBar = {
  args: {
    sideBar: {
      ...dashboardSideBar,
      variant: "compact",
      itemSpacing: "compact",
      width: "narrow",
    },
    variant: "default",
    contentPadding: spacing.lg,
  },
  render: (args: SideBarContentLayoutProps) => (
    <SideBarContentLayout {...args}>
      <DashboardContent />
    </SideBarContentLayout>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SideBarContentLayout
  sideBar={{
    title: "Dashboard",
    items: dashboardItems,
    variant: "compact",
    itemSpacing: "compact",
    width: "narrow"
  }}
>
  <DashboardContent />
</SideBarContentLayout>`,
      },
    },
  },
};

export const WithGap = {
  args: {
    ...Default.args,
    gap: spacing.md,
    sideBar: {
      ...dashboardSideBar,
      variant: "floating",
    },
  },
  render: (args: SideBarContentLayoutProps) => (
    <SideBarContentLayout {...args}>
      <DashboardContent />
    </SideBarContentLayout>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SideBarContentLayout
  sideBar={{
    title: "Dashboard",
    items: dashboardItems,
    variant: "floating"
  }}
  gap="1rem"
>
  <DashboardContent />
</SideBarContentLayout>`,
      },
    },
  },
};

export const Variants = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.xl }}>
      <div>
        <Text
          variant="h6"
          style={{
            marginBottom: spacing.xs,
            color: colors.semantic.text,
            fontWeight: fontWeight.semibold,
          }}>
          Default
        </Text>
        <div style={{ height: "300px", overflow: "hidden", border: `1px solid ${colors.border.default}` }}>
          <SideBarContentLayout
            sideBar={{
              title: "Default",
              items: dashboardItems.slice(0, 3),
              width: "narrow",
            }}
            contentPadding={spacing.md}
          >
            <div style={{ padding: spacing.lg }}>
              <Text variant="h4">기본 레이아웃</Text>
              <Text variant="body2">사이드바와 콘텐츠가 나란히 배치</Text>
            </div>
          </SideBarContentLayout>
        </div>
      </div>

      <div>
        <Text
          variant="h6"
          style={{
            marginBottom: spacing.xs,
            color: colors.semantic.text,
            fontWeight: fontWeight.semibold,
          }}>
          Compact
        </Text>
        <div style={{ height: "300px", overflow: "hidden", border: `1px solid ${colors.border.default}` }}>
          <SideBarContentLayout
            sideBar={{
              title: "Compact",
              items: dashboardItems.slice(0, 3),
              variant: "compact",
              width: "narrow",
              itemSpacing: "compact",
            }}
            contentPadding={spacing.md}
          >
            <div style={{ padding: spacing.lg }}>
              <Text variant="h4">컴팩트 레이아웃</Text>
              <Text variant="body2">더 조밀한 사이드바 스타일</Text>
            </div>
          </SideBarContentLayout>
        </div>
      </div>

      <div>
        <Text
          variant="h6"
          style={{
            marginBottom: spacing.xs,
            color: colors.semantic.text,
            fontWeight: fontWeight.semibold,
          }}>
          Floating
        </Text>
        <div style={{ height: "300px", overflow: "hidden", border: `1px solid ${colors.border.default}` }}>
          <SideBarContentLayout
            sideBar={{
              title: "Floating",
              items: dashboardItems.slice(0, 3),
              variant: "floating",
              width: "narrow",
            }}
            contentPadding={spacing.md}
            gap={spacing.sm}
          >
            <div style={{ padding: spacing.lg }}>
              <Text variant="h4">플로팅 레이아웃</Text>
              <Text variant="body2">떠있는 사이드바 스타일</Text>
            </div>
          </SideBarContentLayout>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `// Default Variant
<SideBarContentLayout variant="default" />

// Compact Variant
<SideBarContentLayout
  sideBar={{ variant: "compact", itemSpacing: "compact" }}
/>

// Floating Variant
<SideBarContentLayout
  sideBar={{ variant: "floating" }}
  gap="0.5rem"
/>`,
      },
    },
  },
};
