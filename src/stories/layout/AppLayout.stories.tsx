import React from "react";
import { action } from "../actions";
import {
  AppLayout,
  AppLayoutProps,
} from "../../components/layout/AppLayout";
import { Button } from "../../components/atomic/Button";
import { Text } from "../../components/atomic/Text";
import { colors, spacing, fontWeight } from "../../theme";

const meta = {
  title: "Layout/AppLayout",
  component: AppLayout,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Header와 Content만으로 구성된 간단한 레이아웃입니다. 마케팅 사이트, 블로그, 포트폴리오 등에 적합한 깔끔한 구조를 제공합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description:
        "레이아웃 스타일 변형. default: 기본 스타일, fullwidth: 전체 너비, centered: 중앙 정렬",
      control: "select",
      options: ["default", "fullwidth", "centered"],
      table: {
        type: { summary: "default | fullwidth | centered" },
        defaultValue: { summary: "default" },
      },
    },
    maxWidth: {
      description: "콘텐츠의 최대 너비",
      control: "text",
      table: {
        type: { summary: "string | number" },
        defaultValue: { summary: "1200px" },
      },
    },
    contentPadding: {
      description: "콘텐츠 영역의 패딩",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "2rem" },
      },
    },
    backgroundColor: {
      description: "레이아웃 배경색",
      control: "color",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: colors.background.white },
      },
    },
    header: {
      description: "헤더 컴포넌트 설정",
      control: "object",
      table: {
        type: { summary: "HeaderProps" },
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

// Mock 콘텐츠 컴포넌트들
const SampleContent: React.FC = () => (
  <div>
    <Text variant="h1" style={{ marginBottom: spacing.lg }}>
      Welcome to Our Website
    </Text>
    <Text variant="body1" style={{ marginBottom: spacing.md, lineHeight: 1.6 }}>
      이것은 AppLayout을 사용한 예시 페이지입니다. 마케팅 사이트,
      블로그, 포트폴리오 등 다양한 웹사이트에 활용할 수 있습니다.
    </Text>
    <Text variant="body1" style={{ marginBottom: spacing.lg, lineHeight: 1.6 }}>
      레이아웃은 Header와 Main Content 영역으로 구성되어 있으며, 깔끔하고 심플한
      구조를 제공합니다.
    </Text>
    <div style={{ display: "flex", gap: spacing.md, marginBottom: spacing.xl }}>
      <Button variant="primary" onClick={action("get-started-clicked")}>
        시작하기
      </Button>
      <Button variant="outline" onClick={action("learn-more-clicked")}>
        더 알아보기
      </Button>
    </div>
    <div
      style={{
        backgroundColor: colors.background.gray,
        padding: spacing.lg,
        borderRadius: "8px",
        marginBottom: spacing.lg,
      }}>
      <Text variant="h3" style={{ marginBottom: spacing.md }}>
        주요 특징
      </Text>
      <ul style={{ margin: 0, paddingLeft: spacing.lg }}>
        <li style={{ marginBottom: spacing.xs }}>
          <Text variant="body2">반응형 디자인 지원</Text>
        </li>
        <li style={{ marginBottom: spacing.xs }}>
          <Text variant="body2">커스터마이징 가능한 헤더</Text>
        </li>
        <li style={{ marginBottom: spacing.xs }}>
          <Text variant="body2">유연한 콘텐츠 영역</Text>
        </li>
        <li>
          <Text variant="body2">접근성 최적화</Text>
        </li>
      </ul>
    </div>
  </div>
);

const BlogContent: React.FC = () => (
  <div>
    <Text variant="h1" style={{ marginBottom: spacing.sm }}>
      블로그 포스트 제목
    </Text>
    <Text
      variant="caption"
      style={{ color: colors.semantic.muted, marginBottom: spacing.lg }}>
      2024년 11월 26일 • 5분 읽기
    </Text>
    <Text variant="body1" style={{ marginBottom: spacing.md, lineHeight: 1.6 }}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris.
    </Text>
    <Text variant="body1" style={{ marginBottom: spacing.md, lineHeight: 1.6 }}>
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
      dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </Text>
    <div
      style={{
        backgroundColor: colors.info[50],
        padding: spacing.lg,
        borderLeft: `4px solid ${colors.semantic.info}`,
        marginBottom: spacing.lg,
      }}>
      <Text variant="body2" style={{ fontStyle: "italic" }}>
        "이것은 인용문의 예시입니다. 블로그 포스트에서 중요한 내용을 강조할 때
        사용됩니다."
      </Text>
    </div>
    <Text variant="body1" style={{ marginBottom: spacing.lg, lineHeight: 1.6 }}>
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
      doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
      inventore veritatis.
    </Text>
  </div>
);

const PortfolioContent: React.FC = () => (
  <div>
    <div style={{ textAlign: "center", marginBottom: spacing.xl }}>
      <Text variant="h1" style={{ marginBottom: spacing.md }}>
        John Designer
      </Text>
      <Text
        variant="h4"
        style={{ color: colors.semantic.muted, marginBottom: spacing.lg }}>
        UI/UX Designer & Frontend Developer
      </Text>
      <Text
        variant="body1"
        style={{ maxWidth: "600px", margin: "0 auto", lineHeight: 1.6 }}>
        디지털 경험을 통해 사용자에게 가치를 전달하는 것을 목표로 하는
        디자이너입니다. 사용자 중심의 디자인과 기술적 구현을 통해 의미있는
        제품을 만들어갑니다.
      </Text>
    </div>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: spacing.lg,
        marginBottom: spacing.xl,
      }}>
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          style={{
            backgroundColor: colors.background.white,
            border: `1px solid ${colors.border.default}`,
            borderRadius: "8px",
            overflow: "hidden",
          }}>
          <div
            style={{
              height: "200px",
              backgroundColor: colors.background.gray,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Text variant="body2" style={{ color: colors.semantic.muted }}>
              프로젝트 {item} 이미지
            </Text>
          </div>
          <div style={{ padding: spacing.lg }}>
            <Text variant="h5" style={{ marginBottom: spacing.sm }}>
              프로젝트 {item}
            </Text>
            <Text
              variant="body2"
              style={{ color: colors.semantic.muted, lineHeight: 1.5 }}>
              프로젝트에 대한 간단한 설명이 여기에 들어갑니다.
            </Text>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// 기본 헤더 설정
const defaultHeader = {
  title: "My Website",
  navigation: [
    { label: "Home", active: true, onClick: action("home-clicked") },
    { label: "About", onClick: action("about-clicked") },
    { label: "Services", onClick: action("services-clicked") },
    { label: "Contact", onClick: action("contact-clicked") },
  ],
  actions: (
    <div style={{ display: "flex", gap: spacing.sm }}>
      <Button variant="outline" size="small" onClick={action("login-clicked")}>
        로그인
      </Button>
      <Button variant="primary" size="small" onClick={action("signup-clicked")}>
        회원가입
      </Button>
    </div>
  ),
  variant: "default" as const,
  height: "medium" as const,
};

export const Default = {
  args: {
    header: defaultHeader,
    variant: "default",
    maxWidth: "1200px",
    contentPadding: "2rem",
  },
  render: (args: AppLayoutProps) => (
    <AppLayout {...args}>
      <SampleContent />
    </AppLayout>
  ),
  parameters: {
    docs: {
      source: {
        code: `<AppLayout
  header={{
    title: "My Website",
    navigation: [
      { label: "Home", active: true },
      { label: "About" },
      { label: "Services" },
      { label: "Contact" }
    ],
    actions: <Button>Login</Button>
  }}
>
  <h1>Welcome to Our Website</h1>
  <p>Your content goes here...</p>
</AppLayout>`,
      },
    },
  },
};

export const WithLogo = {
  args: {
    ...Default.args,
    header: {
      ...defaultHeader,
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
            fontWeight: fontWeight.bold,
          }}>
          L
        </div>
      ),
      title: "Logo Brand",
    },
  },
  render: (args: AppLayoutProps) => (
    <AppLayout {...args}>
      <SampleContent />
    </AppLayout>
  ),
  parameters: {
    docs: {
      source: {
        code: `<AppLayout
  header={{
    logo: <LogoComponent />,
    title: "Logo Brand",
    navigation: navigationItems,
    actions: actionButtons
  }}
>
  <YourContent />
</AppLayout>`,
      },
    },
  },
};

export const FullWidth = {
  args: {
    ...Default.args,
    variant: "fullwidth",
    contentPadding: "2rem 1rem",
  },
  render: (args: AppLayoutProps) => (
    <AppLayout {...args}>
      <SampleContent />
    </AppLayout>
  ),
  parameters: {
    docs: {
      source: {
        code: `<AppLayout
  variant="fullwidth"
  contentPadding="2rem 1rem"
  header={headerProps}
>
  <YourContent />
</AppLayout>`,
      },
    },
  },
};

export const Centered = {
  args: {
    ...Default.args,
    variant: "centered",
    maxWidth: "800px",
  },
  render: (args: AppLayoutProps) => (
    <AppLayout {...args}>
      <SampleContent />
    </AppLayout>
  ),
  parameters: {
    docs: {
      source: {
        code: `<AppLayout
  variant="centered"
  maxWidth="800px"
  header={headerProps}
>
  <YourContent />
</AppLayout>`,
      },
    },
  },
};

export const BlogLayout = {
  args: {
    header: {
      title: "Tech Blog",
      navigation: [
        { label: "최신", active: true, onClick: action("latest-clicked") },
        { label: "기술", onClick: action("tech-clicked") },
        { label: "튜토리얼", onClick: action("tutorial-clicked") },
        { label: "소식", onClick: action("news-clicked") },
      ],
      actions: (
        <Button
          variant="outline"
          size="small"
          onClick={action("subscribe-clicked")}>
          구독하기
        </Button>
      ),
      variant: "default" as const,
    },
    variant: "default",
    maxWidth: "800px",
  },
  render: (args: AppLayoutProps) => (
    <AppLayout {...args}>
      <BlogContent />
    </AppLayout>
  ),
  parameters: {
    docs: {
      source: {
        code: `<AppLayout
  header={{
    title: "Tech Blog",
    navigation: blogNavigation,
    actions: <Button>구독하기</Button>
  }}
  maxWidth="800px"
>
  <BlogPost />
</AppLayout>`,
      },
    },
  },
};

export const PortfolioLayout = {
  args: {
    header: {
      title: "Portfolio",
      navigation: [
        { label: "Work", active: true, onClick: action("work-clicked") },
        { label: "About", onClick: action("about-clicked") },
        { label: "Contact", onClick: action("contact-clicked") },
      ],
      variant: "transparent" as const,
      height: "small" as const,
    },
    variant: "default",
    maxWidth: "1000px",
  },
  render: (args: AppLayoutProps) => (
    <AppLayout {...args}>
      <PortfolioContent />
    </AppLayout>
  ),
  parameters: {
    docs: {
      source: {
        code: `<AppLayout
  header={{
    title: "Portfolio",
    navigation: portfolioNavigation,
    variant: "transparent",
    height: "small"
  }}
  maxWidth="1000px"
>
  <PortfolioContent />
</AppLayout>`,
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
        <div
          style={{
            height: "400px",
            overflow: "hidden",
            border: `1px solid ${colors.border.default}`,
          }}>
          <AppLayout
            header={{
              title: "Default Layout",
              navigation: [{ label: "Home", active: true }, { label: "About" }],
            }}
            variant="default">
            <div style={{ padding: spacing.lg }}>
              <Text variant="h4">기본 레이아웃</Text>
              <Text variant="body2">
                최대 너비 제한이 있는 중앙 정렬 콘텐츠
              </Text>
            </div>
          </AppLayout>
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
          Full Width
        </Text>
        <div
          style={{
            height: "400px",
            overflow: "hidden",
            border: `1px solid ${colors.border.default}`,
          }}>
          <AppLayout
            header={{
              title: "Full Width Layout",
              navigation: [{ label: "Home", active: true }, { label: "About" }],
            }}
            variant="fullwidth">
            <div style={{ padding: spacing.lg }}>
              <Text variant="h4">전체 너비 레이아웃</Text>
              <Text variant="body2">화면 전체 너비를 사용하는 콘텐츠</Text>
            </div>
          </AppLayout>
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
          Centered
        </Text>
        <div
          style={{
            height: "400px",
            overflow: "hidden",
            border: `1px solid ${colors.border.default}`,
          }}>
          <AppLayout
            header={{
              title: "Centered Layout",
              navigation: [{ label: "Home", active: true }, { label: "About" }],
            }}
            variant="centered">
            <div>
              <Text variant="h4">중앙 정렬 레이아웃</Text>
              <Text variant="body2">
                텍스트와 콘텐츠가 중앙 정렬된 레이아웃
              </Text>
            </div>
          </AppLayout>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `// Default Variant
<AppLayout variant="default" />

// Full Width Variant
<AppLayout variant="fullwidth" />

// Centered Variant
<AppLayout variant="centered" />`,
      },
    },
  },
};
