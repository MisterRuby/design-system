import React from "react";
import { action } from "../actions";
import { userEvent, within } from "@storybook/testing-library";
import {
  HeaderSideBarContentLayout,
  HeaderSideBarContentLayoutProps,
} from "../../components/layout/HeaderSideBarContentLayout";
import { Button } from "../../components/atomic/Button";
import { Text } from "../../components/atomic/Text";
import { colors, spacing, fontWeight } from "../../theme";

const meta = {
  title: "Layout/HeaderSideBarContentLayout",
  component: HeaderSideBarContentLayout,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Header, SideBar, Content로 구성된 완전한 레이아웃입니다. 관리자 대시보드, 애플리케이션 메인 화면 등에 적합한 전체 페이지 레이아웃을 제공합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description:
        "레이아웃 스타일 변형. default: 기본 스타일, fixed: 고정 위치, sticky-header: 스티키 헤더",
      control: "select",
      options: ["default", "fixed", "sticky-header"],
    },
    contentPadding: {
      description: "메인 콘텐츠 영역의 패딩",
      control: "text",
    },
    contentBackgroundColor: {
      description: "메인 콘텐츠 영역의 배경색",
      control: "color",
    },
    headerGap: {
      description: "헤더와 콘텐츠 사이의 간격",
      control: "text",
    },
  },
};

export default meta;

// Mock 데이터
const mockHeaderData = {
  logo: (
    <div style={{ fontWeight: fontWeight.bold, fontSize: "18px", color: colors.semantic.primary }}>
      MyApp
    </div>
  ),
  navigation: [
    {
      id: "dashboard",
      label: "대시보드",
      href: "/dashboard",
      active: true,
      onClick: action("nav-dashboard-clicked"),
    },
    {
      id: "analytics",
      label: "분석",
      href: "/analytics",
      onClick: action("nav-analytics-clicked"),
    },
    {
      id: "projects",
      label: "프로젝트",
      href: "/projects",
      onClick: action("nav-projects-clicked"),
    },
    {
      id: "team",
      label: "팀",
      href: "/team",
      onClick: action("nav-team-clicked"),
    },
  ],
  actions: (
    <div style={{ display: "flex", alignItems: "center", gap: spacing.sm }}>
      <Button variant="outline" size="small" onClick={action("notifications-clicked")}>
        알림
      </Button>
      <Button variant="outline" size="small" onClick={action("profile-clicked")}>
        프로필
      </Button>
    </div>
  ),
};

const mockSideBarData = {
  title: "메뉴",
  collapsible: true,
  items: [
    {
      id: "overview",
      label: "개요",
      icon: "home" as const,
      active: true,
      onClick: action("overview-clicked"),
    },
    {
      id: "analytics",
      label: "분석",
      icon: "bar-chart" as const,
      onClick: action("analytics-clicked"),
    },
    {
      id: "projects",
      label: "프로젝트",
      icon: "folder" as const,
      onClick: action("projects-clicked"),
      children: [
        {
          id: "active-projects",
          label: "진행 중",
          onClick: action("active-projects-clicked"),
        },
        {
          id: "completed-projects",
          label: "완료됨",
          onClick: action("completed-projects-clicked"),
        },
        {
          id: "archived-projects",
          label: "보관함",
          onClick: action("archived-projects-clicked"),
        },
      ],
    },
    {
      id: "team",
      label: "팀 관리",
      icon: "user" as const,
      onClick: action("team-clicked"),
      badge: "3",
    },
    {
      id: "settings",
      label: "설정",
      icon: "settings" as const,
      onClick: action("settings-clicked"),
    },
  ],
};

// Mock 콘텐츠 컴포넌트들
const DashboardContent: React.FC = () => (
  <div>
    <div style={{ marginBottom: spacing.xl }}>
      <Text variant="h1" style={{ marginBottom: spacing.sm }}>
        대시보드
      </Text>
      <Text variant="body1" style={{ color: colors.semantic.muted }}>
        시스템 현황과 주요 지표를 확인하세요.
      </Text>
    </div>

    {/* 주요 지표 카드들 */}
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: spacing.lg,
      marginBottom: spacing.xl
    }}>
      {[
        { title: "총 사용자", value: "15,847", change: "+12.3%", positive: true },
        { title: "월간 수익", value: "₩2,450,000", change: "+8.7%", positive: true },
        { title: "활성 프로젝트", value: "23", change: "-2.1%", positive: false },
        { title: "완료율", value: "94.2%", change: "+3.8%", positive: true },
      ].map((metric, index) => (
        <div key={index} style={{
          backgroundColor: colors.background.white,
          border: `1px solid ${colors.border.default}`,
          borderRadius: "12px",
          padding: spacing.lg,
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
        }}>
          <Text variant="caption" style={{
            color: colors.semantic.muted,
            display: "block",
            marginBottom: spacing.xs,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}>
            {metric.title}
          </Text>
          <Text variant="h2" style={{ marginBottom: spacing.xs }}>
            {metric.value}
          </Text>
          <Text variant="caption" style={{
            color: metric.positive ? colors.semantic.success : colors.semantic.error,
            fontWeight: fontWeight.medium,
          }}>
            {metric.change}
          </Text>
        </div>
      ))}
    </div>

    {/* 차트 및 테이블 영역 */}
    <div style={{
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: spacing.xl,
      marginBottom: spacing.xl
    }}>
      {/* 차트 영역 */}
      <div style={{
        backgroundColor: colors.background.white,
        border: `1px solid ${colors.border.default}`,
        borderRadius: "12px",
        padding: spacing.xl,
        minHeight: "400px",
      }}>
        <Text variant="h4" style={{ marginBottom: spacing.lg }}>
          월간 성장 추이
        </Text>
        <div style={{
          height: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.background.gray,
          borderRadius: "8px",
          color: colors.semantic.muted,
        }}>
          <Text variant="body1">차트 영역 (실제 구현 시 차트 라이브러리 사용)</Text>
        </div>
      </div>

      {/* 최근 활동 */}
      <div style={{
        backgroundColor: colors.background.white,
        border: `1px solid ${colors.border.default}`,
        borderRadius: "12px",
        padding: spacing.xl,
      }}>
        <Text variant="h4" style={{ marginBottom: spacing.lg }}>
          최근 활동
        </Text>
        <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
          {[
            "새 프로젝트 'Mobile App' 생성",
            "팀원 3명이 작업 완료",
            "월간 리포트 생성됨",
            "보안 업데이트 적용",
            "백업 완료",
          ].map((activity, index) => (
            <div key={index} style={{
              padding: spacing.sm,
              backgroundColor: index === 0 ? colors.semantic.primary + "20" : colors.background.gray,
              borderRadius: "6px",
            }}>
              <Text variant="body2" style={{
                color: index === 0 ? colors.semantic.primary : colors.semantic.text,
              }}>
                {activity}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* 액션 버튼들 */}
    <div style={{
      display: "flex",
      gap: spacing.md,
      flexWrap: "wrap",
    }}>
      <Button variant="primary" onClick={action("new-project-clicked")}>
        새 프로젝트 생성
      </Button>
      <Button variant="secondary" onClick={action("export-data-clicked")}>
        데이터 내보내기
      </Button>
      <Button variant="outline" onClick={action("view-reports-clicked")}>
        리포트 보기
      </Button>
    </div>
  </div>
);

const TeamManagementContent: React.FC = () => (
  <div>
    <div style={{ marginBottom: spacing.xl }}>
      <Text variant="h1" style={{ marginBottom: spacing.sm }}>
        팀 관리
      </Text>
      <Text variant="body1" style={{ color: colors.semantic.muted }}>
        팀원들의 현황과 권한을 관리하세요.
      </Text>
    </div>

    {/* 팀원 목록 테이블 */}
    <div style={{
      backgroundColor: colors.background.white,
      border: `1px solid ${colors.border.default}`,
      borderRadius: "12px",
      overflow: "hidden",
    }}>
      <div style={{
        padding: spacing.lg,
        borderBottom: `1px solid ${colors.border.default}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <Text variant="h4">팀원 목록</Text>
        <Button variant="primary" size="small" onClick={action("add-member-clicked")}>
          팀원 추가
        </Button>
      </div>

      <div style={{ padding: spacing.lg }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 150px 120px 120px",
          gap: spacing.md,
          alignItems: "center",
          padding: spacing.sm,
          backgroundColor: colors.background.gray,
          borderRadius: "6px",
          marginBottom: spacing.md,
        }}>
          <Text variant="caption" style={{ fontWeight: fontWeight.semibold, color: colors.semantic.muted }}>
            이름
          </Text>
          <Text variant="caption" style={{ fontWeight: fontWeight.semibold, color: colors.semantic.muted }}>
            역할
          </Text>
          <Text variant="caption" style={{ fontWeight: fontWeight.semibold, color: colors.semantic.muted }}>
            상태
          </Text>
          <Text variant="caption" style={{ fontWeight: fontWeight.semibold, color: colors.semantic.muted }}>
            액션
          </Text>
        </div>

        {[
          { name: "김개발", role: "개발자", status: "활성", active: true },
          { name: "이디자인", role: "디자이너", status: "활성", active: true },
          { name: "박기획", role: "기획자", status: "비활성", active: false },
          { name: "최관리", role: "매니저", status: "활성", active: true },
        ].map((member, index) => (
          <div key={index} style={{
            display: "grid",
            gridTemplateColumns: "1fr 150px 120px 120px",
            gap: spacing.md,
            alignItems: "center",
            padding: spacing.sm,
            borderRadius: "6px",
          }}>
            <Text variant="body1">{member.name}</Text>
            <Text variant="body2" style={{ color: colors.semantic.muted }}>{member.role}</Text>
            <div style={{
              display: "inline-block",
              padding: "4px 8px",
              backgroundColor: member.active ? colors.semantic.success + "20" : colors.semantic.muted + "20",
              color: member.active ? colors.semantic.success : colors.semantic.muted,
              borderRadius: "4px",
              fontSize: "12px",
            }}>
              {member.status}
            </div>
            <Button variant="outline" size="small" onClick={action(`edit-${member.name}-clicked`)}>
              편집
            </Button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Stories
export const Default = {
  args: {
    header: mockHeaderData,
    sideBar: mockSideBarData,
    variant: "default",
  },
  render: (args: HeaderSideBarContentLayoutProps) => (
    <HeaderSideBarContentLayout {...args}>
      <DashboardContent />
    </HeaderSideBarContentLayout>
  ),
  parameters: {
    docs: {
      source: {
        code: `<HeaderSideBarContentLayout
  header={{
    logo: <Logo />,
    navigation: navigationItems,
    actions: <UserActions />
  }}
  sideBar={{
    title: "메뉴",
    collapsible: true,
    items: menuItems
  }}
>
  <DashboardContent />
</HeaderSideBarContentLayout>`,
      },
    },
  },
};

export const CollapsibleSideBar = {
  args: {
    ...Default.args,
    sideBar: {
      ...mockSideBarData,
      collapsible: true,
      collapsed: false,
    },
  },
  render: (args: HeaderSideBarContentLayoutProps) => {
    const [collapsed, setCollapsed] = React.useState(false);

    return (
      <HeaderSideBarContentLayout
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
      </HeaderSideBarContentLayout>
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
        code: `const [collapsed, setCollapsed] = React.useState(false);

<HeaderSideBarContentLayout
  header={headerConfig}
  sideBar={{
    ...sideBarConfig,
    collapsible: true,
    collapsed,
    onCollapseToggle: setCollapsed
  }}
>
  <DashboardContent />
</HeaderSideBarContentLayout>`,
      },
    },
  },
};

export const AdminDashboard = {
  args: {
    header: {
      ...mockHeaderData,
      logo: (
        <div style={{ fontWeight: fontWeight.bold, fontSize: "18px", color: colors.semantic.primary }}>
          Admin Panel
        </div>
      ),
      navigation: [
        {
          id: "dashboard",
          label: "대시보드",
          href: "/admin/dashboard",
          active: true,
          onClick: action("admin-dashboard-clicked"),
        },
        {
          id: "users",
          label: "사용자",
          href: "/admin/users",
          onClick: action("admin-users-clicked"),
        },
        {
          id: "system",
          label: "시스템",
          href: "/admin/system",
          onClick: action("admin-system-clicked"),
        },
      ],
    },
    sideBar: {
      title: "관리자 메뉴",
      items: [
        {
          id: "overview",
          label: "대시보드",
          icon: "home" as const,
          active: true,
          onClick: action("admin-overview-clicked"),
        },
        {
          id: "users",
          label: "사용자 관리",
          icon: "user" as const,
          onClick: action("admin-users-clicked"),
        },
        {
          id: "content",
          label: "콘텐츠 관리",
          icon: "file" as const,
          onClick: action("admin-content-clicked"),
        },
        {
          id: "analytics",
          label: "분석",
          icon: "bar-chart" as const,
          onClick: action("admin-analytics-clicked"),
        },
        {
          id: "settings",
          label: "시스템 설정",
          icon: "settings" as const,
          onClick: action("admin-settings-clicked"),
        },
      ],
    },
    variant: "fixed",
  },
  render: (args: HeaderSideBarContentLayoutProps) => (
    <HeaderSideBarContentLayout {...args}>
      <DashboardContent />
    </HeaderSideBarContentLayout>
  ),
  parameters: {
    docs: {
      source: {
        code: `<HeaderSideBarContentLayout
  variant="fixed"
  header={{
    logo: <AdminLogo />,
    navigation: adminNavigation
  }}
  sideBar={{
    title: "관리자 메뉴",
    items: adminMenuItems
  }}
>
  <AdminDashboardContent />
</HeaderSideBarContentLayout>`,
      },
    },
  },
};

export const TeamManagement = {
  args: {
    ...Default.args,
    header: {
      ...mockHeaderData,
      navigation: [
        {
          id: "dashboard",
          label: "대시보드",
          href: "/dashboard",
          onClick: action("nav-dashboard-clicked"),
        },
        {
          id: "team",
          label: "팀",
          href: "/team",
          active: true,
          onClick: action("nav-team-clicked"),
        },
        {
          id: "projects",
          label: "프로젝트",
          href: "/projects",
          onClick: action("nav-projects-clicked"),
        },
      ],
    },
    sideBar: {
      ...mockSideBarData,
      items: mockSideBarData.items.map(item => ({
        ...item,
        active: item.id === "team",
      })),
    },
  },
  render: (args: HeaderSideBarContentLayoutProps) => (
    <HeaderSideBarContentLayout {...args}>
      <TeamManagementContent />
    </HeaderSideBarContentLayout>
  ),
  parameters: {
    docs: {
      source: {
        code: `<HeaderSideBarContentLayout
  header={{
    navigation: [
      { label: "대시보드", href: "/dashboard" },
      { label: "팀", href: "/team", active: true },
      { label: "프로젝트", href: "/projects" }
    ]
  }}
  sideBar={{
    items: sideBarItems
  }}
>
  <TeamManagementContent />
</HeaderSideBarContentLayout>`,
      },
    },
  },
};

export const StickyHeader = {
  args: {
    ...Default.args,
    variant: "sticky-header",
  },
  render: (args: HeaderSideBarContentLayoutProps) => (
    <HeaderSideBarContentLayout {...args}>
      <div>
        <DashboardContent />
        {/* 긴 콘텐츠로 스크롤 테스트 */}
        <div style={{ marginTop: spacing['2xl'] }}>
          <Text variant="h3" style={{ marginBottom: spacing.lg }}>
            추가 콘텐츠 섹션
          </Text>
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} style={{
              marginBottom: spacing.lg,
              padding: spacing.lg,
              backgroundColor: colors.background.gray,
              borderRadius: "8px",
            }}>
              <Text variant="h4" style={{ marginBottom: spacing.sm }}>
                섹션 {i + 1}
              </Text>
              <Text variant="body1" style={{ lineHeight: "1.6" }}>
                이것은 스크롤을 테스트하기 위한 긴 콘텐츠입니다.
                스티키 헤더 변형에서는 헤더가 상단에 고정되어 스크롤할 때도
                항상 보이도록 설정되어 있습니다.
                실제 애플리케이션에서는 이런 방식으로 사용자가
                페이지 어디에 있든 주요 네비게이션에 접근할 수 있습니다.
              </Text>
            </div>
          ))}
        </div>
      </div>
    </HeaderSideBarContentLayout>
  ),
  parameters: {
    docs: {
      source: {
        code: `<HeaderSideBarContentLayout
  variant="sticky-header"
  header={headerConfig}
  sideBar={sideBarConfig}
>
  <LongScrollableContent />
</HeaderSideBarContentLayout>`,
      },
    },
  },
};

export const Variants = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.xl }}>
      <div>
        <Text variant="h3" style={{ marginBottom: spacing.md }}>Default</Text>
        <div style={{ height: "300px", border: `2px solid ${colors.border.default}`, borderRadius: "8px" }}>
          <HeaderSideBarContentLayout
            header={mockHeaderData}
            sideBar={mockSideBarData}
            variant="default"
          >
            <div style={{ padding: spacing.md }}>
              <Text variant="body1">기본 레이아웃 - 일반적인 웹 애플리케이션에 적합</Text>
            </div>
          </HeaderSideBarContentLayout>
        </div>
      </div>

      <div>
        <Text variant="h3" style={{ marginBottom: spacing.md }}>Fixed</Text>
        <div style={{ height: "300px", border: `2px solid ${colors.border.default}`, borderRadius: "8px" }}>
          <HeaderSideBarContentLayout
            header={mockHeaderData}
            sideBar={mockSideBarData}
            variant="fixed"
          >
            <div style={{ padding: spacing.md }}>
              <Text variant="body1">고정 레이아웃 - 전체 화면 애플리케이션에 적합</Text>
            </div>
          </HeaderSideBarContentLayout>
        </div>
      </div>

      <div>
        <Text variant="h3" style={{ marginBottom: spacing.md }}>Sticky Header</Text>
        <div style={{ height: "300px", border: `2px solid ${colors.border.default}`, borderRadius: "8px" }}>
          <HeaderSideBarContentLayout
            header={mockHeaderData}
            sideBar={mockSideBarData}
            variant="scrollable-content"
          >
            <div style={{ padding: spacing.md }}>
              <Text variant="body1">스티키 헤더 - 긴 콘텐츠가 있는 페이지에 적합</Text>
            </div>
          </HeaderSideBarContentLayout>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `// 기본 레이아웃
<HeaderSideBarContentLayout variant="default" />

// 고정 레이아웃
<HeaderSideBarContentLayout variant="fixed" />

// 스티키 헤더
<HeaderSideBarContentLayout variant="scrollable-content" />`,
      },
    },
  },
};
