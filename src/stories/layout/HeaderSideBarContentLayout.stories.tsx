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
        "레이아웃 스타일 변형. default: 기본 스타일, fixed: 고정 위치, scrollable-content: 스크롤 가능한 콘텐츠",
      control: "select",
      options: ["default", "fixed", "scrollable-content"],
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
    <div
      style={{
        fontWeight: fontWeight.bold,
        fontSize: "18px",
        color: colors.semantic.primary,
      }}>
      MyApp
    </div>
  ),
  navigation: [
    {
      label: "대시보드",
      href: "/dashboard",
      active: true,
      onClick: action("nav-dashboard-clicked"),
    },
    {
      label: "분석",
      href: "/analytics",
      onClick: action("nav-analytics-clicked"),
    },
    {
      label: "프로젝트",
      href: "/projects",
      onClick: action("nav-projects-clicked"),
    },
    {
      label: "팀",
      href: "/team",
      onClick: action("nav-team-clicked"),
    },
  ],
  actions: (
    <div style={{ display: "flex", alignItems: "center", gap: spacing.sm }}>
      <Button
        variant="outline"
        size="small"
        onClick={action("notifications-clicked")}>
        알림
      </Button>
      <Button
        variant="outline"
        size="small"
        onClick={action("profile-clicked")}>
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
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: spacing.lg,
        marginBottom: spacing.xl,
      }}>
      {[
        {
          title: "총 사용자",
          value: "15,847",
          change: "+12.3%",
          positive: true,
        },
        {
          title: "월간 수익",
          value: "₩2,450,000",
          change: "+8.7%",
          positive: true,
        },
        {
          title: "활성 프로젝트",
          value: "23",
          change: "-2.1%",
          positive: false,
        },
        { title: "완료율", value: "94.2%", change: "+3.8%", positive: true },
      ].map((metric, index) => (
        <div
          key={index}
          style={{
            backgroundColor: colors.background.white,
            border: `1px solid ${colors.border.default}`,
            borderRadius: "12px",
            padding: spacing.lg,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
          }}>
          <Text
            variant="caption"
            style={{
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
          <Text
            variant="caption"
            style={{
              color: metric.positive
                ? colors.semantic.success
                : colors.semantic.error,
              fontWeight: fontWeight.medium,
            }}>
            {metric.change}
          </Text>
        </div>
      ))}
    </div>

    {/* 차트 및 테이블 영역 */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: spacing.xl,
        marginBottom: spacing.xl,
      }}>
      {/* 차트 영역 */}
      <div
        style={{
          backgroundColor: colors.background.white,
          border: `1px solid ${colors.border.default}`,
          borderRadius: "12px",
          padding: spacing.xl,
          minHeight: "400px",
        }}>
        <Text variant="h4" style={{ marginBottom: spacing.lg }}>
          월간 성장 추이
        </Text>
        <div
          style={{
            height: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.background.gray,
            borderRadius: "8px",
            color: colors.semantic.muted,
          }}>
          <Text variant="body1">
            차트 영역 (실제 구현 시 차트 라이브러리 사용)
          </Text>
        </div>
      </div>

      {/* 최근 활동 */}
      <div
        style={{
          backgroundColor: colors.background.white,
          border: `1px solid ${colors.border.default}`,
          borderRadius: "12px",
          padding: spacing.xl,
        }}>
        <Text variant="h4" style={{ marginBottom: spacing.lg }}>
          최근 활동
        </Text>
        <div
          style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
          {[
            "새 프로젝트 'Mobile App' 생성",
            "팀원 3명이 작업 완료",
            "월간 리포트 생성됨",
            "보안 업데이트 적용",
            "백업 완료",
          ].map((activity, index) => (
            <div
              key={index}
              style={{
                padding: spacing.sm,
                backgroundColor:
                  index === 0
                    ? colors.semantic.primary + "20"
                    : colors.background.gray,
                borderRadius: "6px",
              }}>
              <Text
                variant="body2"
                style={{
                  color:
                    index === 0
                      ? colors.semantic.primary
                      : colors.semantic.text,
                }}>
                {activity}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* 액션 버튼들 */}
    <div
      style={{
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
    <div
      style={{
        backgroundColor: colors.background.white,
        border: `1px solid ${colors.border.default}`,
        borderRadius: "12px",
        overflow: "hidden",
      }}>
      <div
        style={{
          padding: spacing.lg,
          borderBottom: `1px solid ${colors.border.default}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Text variant="h4">팀원 목록</Text>
        <Button
          variant="primary"
          size="small"
          onClick={action("add-member-clicked")}>
          팀원 추가
        </Button>
      </div>

      <div style={{ padding: spacing.lg }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 150px 120px 120px",
            gap: spacing.md,
            alignItems: "center",
            padding: spacing.sm,
            backgroundColor: colors.background.gray,
            borderRadius: "6px",
            marginBottom: spacing.md,
          }}>
          <Text
            variant="caption"
            style={{
              fontWeight: fontWeight.semibold,
              color: colors.semantic.muted,
            }}>
            이름
          </Text>
          <Text
            variant="caption"
            style={{
              fontWeight: fontWeight.semibold,
              color: colors.semantic.muted,
            }}>
            역할
          </Text>
          <Text
            variant="caption"
            style={{
              fontWeight: fontWeight.semibold,
              color: colors.semantic.muted,
            }}>
            상태
          </Text>
          <Text
            variant="caption"
            style={{
              fontWeight: fontWeight.semibold,
              color: colors.semantic.muted,
            }}>
            액션
          </Text>
        </div>

        {[
          { name: "김개발", role: "개발자", status: "활성", active: true },
          { name: "이디자인", role: "디자이너", status: "활성", active: true },
          { name: "박기획", role: "기획자", status: "비활성", active: false },
          { name: "최관리", role: "매니저", status: "활성", active: true },
        ].map((member, index) => (
          <div
            key={index}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 150px 120px 120px",
              gap: spacing.md,
              alignItems: "center",
              padding: spacing.sm,
              borderRadius: "6px",
            }}>
            <Text variant="body1">{member.name}</Text>
            <Text variant="body2" style={{ color: colors.semantic.muted }}>
              {member.role}
            </Text>
            <div
              style={{
                display: "inline-block",
                padding: "4px 8px",
                backgroundColor: member.active
                  ? colors.semantic.success + "20"
                  : colors.semantic.muted + "20",
                color: member.active
                  ? colors.semantic.success
                  : colors.semantic.muted,
                borderRadius: "4px",
                fontSize: "12px",
              }}>
              {member.status}
            </div>
            <Button
              variant="outline"
              size="small"
              onClick={action(`edit-${member.name}-clicked`)}>
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
  }}>
  <DashboardContent />
</HeaderSideBarContentLayout>`,
      },
    },
  },
};

export const Variants = {
  render: () => {
    const previewContainerStyle: React.CSSProperties = {
      height: "520px",
      border: `1px solid ${colors.border.default}`,
      borderRadius: "12px",
      overflow: "hidden",
      position: "relative",
    };

    const layoutStyle: React.CSSProperties = {
      height: "100%",
      position: "relative",
      top: "auto",
      left: "auto",
      right: "auto",
      bottom: "auto",
    };

    return (
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
          <div style={previewContainerStyle}>
            <HeaderSideBarContentLayout
              header={{
                ...mockHeaderData,
                logo: (
                  <div
                    style={{
                      fontWeight: fontWeight.bold,
                      fontSize: "16px",
                      color: colors.semantic.primary,
                    }}>
                    기본 레이아웃
                  </div>
                ),
              }}
              sideBar={{
                ...mockSideBarData,
                title: "기본 메뉴",
              }}
              variant="default"
              contentPadding={spacing.lg}
              style={layoutStyle}>
              <DashboardContent />
            </HeaderSideBarContentLayout>
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
            Fixed
          </Text>
          <div style={previewContainerStyle}>
            <HeaderSideBarContentLayout
              header={{
                ...mockHeaderData,
                logo: (
                  <div
                    style={{
                      fontWeight: fontWeight.bold,
                      fontSize: "16px",
                      color: colors.semantic.info,
                    }}>
                    고정 레이아웃
                  </div>
                ),
              }}
              sideBar={{
                ...mockSideBarData,
                title: "고정 메뉴",
                collapsible: false,
              }}
              variant="fixed"
              contentPadding={spacing.md}
              style={layoutStyle}>
              <DashboardContent />
            </HeaderSideBarContentLayout>
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
            Scrollable Content
          </Text>
          <div style={previewContainerStyle}>
            <HeaderSideBarContentLayout
              header={{
                ...mockHeaderData,
                logo: (
                  <div
                    style={{
                      fontWeight: fontWeight.bold,
                      fontSize: "16px",
                      color: colors.semantic.success,
                    }}>
                    스크롤 콘텐츠
                  </div>
                ),
              }}
              sideBar={{
                ...mockSideBarData,
                title: "스크롤 메뉴",
                collapsible: true,
              }}
              variant="scrollable-content"
              contentPadding={spacing.lg}
              headerGap={spacing.sm}
              style={layoutStyle}>
              <TeamManagementContent />
            </HeaderSideBarContentLayout>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `// Default Variant
<HeaderSideBarContentLayout
  variant="default"
  header={headerConfig}
  sideBar={sideBarConfig}
/>

// Fixed Variant (전체 뷰포트 고정)
<HeaderSideBarContentLayout
  variant="fixed"
  header={headerConfig}
  sideBar={sideBarConfig}
/>

// Scrollable Content Variant (헤더/사이드바 고정)
<HeaderSideBarContentLayout
  variant="scrollable-content"
  header={headerConfig}
  sideBar={sideBarConfig}
/>`,
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
            action("sidebar-collapse-toggle")(newCollapsed);
          },
        }}>
        <DashboardContent />
      </HeaderSideBarContentLayout>
    );
  },
  play: async ({
    canvasElement,
    step,
  }: {
    canvasElement: HTMLElement;
    step: any;
  }) => {
    const canvas = within(canvasElement);

    await step("사이드바 접기 버튼 클릭", async () => {
      const collapseButton = canvas.getByRole("button", {
        name: "사이드바 접기",
      });
      await userEvent.click(collapseButton);
      await new Promise((resolve) => setTimeout(resolve, 1200)); // 접기 애니메이션 완료 대기
    });

    await step("접힌 상태에서 다시 펼치기", async () => {
      await new Promise((resolve) => setTimeout(resolve, 600)); // 단계 간 구분을 위한 추가 대기
      const expandButton = canvas.getByRole("button", {
        name: "사이드바 펼치기",
      });
      await userEvent.click(expandButton);
      await new Promise((resolve) => setTimeout(resolve, 1200)); // 펼치기 애니메이션 완료 대기
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
  }}>
  <DashboardContent />
</HeaderSideBarContentLayout>`,
      },
    },
  },
};
