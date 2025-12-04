import React from "react";
import { action } from "../actions";
import { Footer, FooterProps } from "../../components/organisms/Footer";
import { Text } from "../../components/atomic/Text";
import { colors, spacing, fontWeight } from "../../tokens";

const meta = {
  title: "Components/Organisms/Footer",
  component: Footer,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "웹사이트 하단에 표시되는 푸터 컴포넌트입니다. 회사 정보, 네비게이션 링크, 소셜 미디어, 저작권 정보 등을 제공합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    brandName: {
      description: "회사명 또는 사이트명",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    description: {
      description: "브랜드 설명 텍스트",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    variant: {
      description:
        "푸터의 시각적 스타일. default: 기본 스타일, minimal: 미니멀 스타일, dark: 다크 스타일",
      control: "select",
      options: ["default", "minimal", "dark"],
      table: {
        type: { summary: "default | minimal | dark" },
        defaultValue: { summary: "default" },
      },
    },
    showNewsletter: {
      description: "뉴스레터 구독 기능 활성화 여부",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    copyrightText: {
      description: "저작권 텍스트",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    sections: {
      description: "푸터 섹션 목록. 각 섹션은 제목과 링크 목록을 가집니다.",
      control: "object",
      table: {
        type: { summary: "FooterSection[]" },
      },
    },
    socialLinks: {
      description: "소셜 미디어 링크 목록",
      control: "object",
      table: {
        type: { summary: "SocialLink[]" },
      },
    },
    bottomLinks: {
      description: "푸터 하단에 표시될 추가 링크",
      control: "object",
      table: {
        type: { summary: "FooterLink[]" },
      },
    },
    logo: {
      description: "푸터 상단에 표시될 로고 컴포넌트",
      control: false,
      table: {
        type: { summary: "React.ReactNode" },
        defaultValue: { summary: "undefined" },
      },
    },
    onNewsletterSubmit: {
      description: "뉴스레터 구독 시 호출되는 콜백 함수",
      action: "newsletter-submitted",
      table: {
        type: { summary: "(email: string) => void" },
        defaultValue: { summary: "undefined" },
      },
    },
  },
};

export default meta;

// Mock 데이터
const mockSections = [
  {
    id: "company",
    title: "회사 정보",
    links: [
      {
        id: "about",
        label: "회사 소개",
        href: "/about",
        onClick: action("about-clicked"),
      },
      {
        id: "careers",
        label: "채용",
        href: "/careers",
        onClick: action("careers-clicked"),
      },
      {
        id: "press",
        label: "보도자료",
        href: "/press",
        onClick: action("press-clicked"),
      },
      {
        id: "contact",
        label: "문의하기",
        href: "/contact",
        onClick: action("contact-clicked"),
      },
    ],
  },
  {
    id: "products",
    title: "제품",
    links: [
      {
        id: "features",
        label: "주요 기능",
        href: "/features",
        onClick: action("features-clicked"),
      },
      {
        id: "pricing",
        label: "요금제",
        href: "/pricing",
        onClick: action("pricing-clicked"),
      },
      {
        id: "enterprise",
        label: "기업용",
        href: "/enterprise",
        onClick: action("enterprise-clicked"),
      },
      {
        id: "api",
        label: "API",
        href: "/api",
        onClick: action("api-clicked"),
        external: true,
      },
    ],
  },
  {
    id: "support",
    title: "지원",
    links: [
      {
        id: "help",
        label: "도움말",
        href: "/help",
        onClick: action("help-clicked"),
      },
      {
        id: "documentation",
        label: "문서",
        href: "/docs",
        onClick: action("docs-clicked"),
        external: true,
      },
      {
        id: "community",
        label: "커뮤니티",
        href: "/community",
        onClick: action("community-clicked"),
      },
      {
        id: "status",
        label: "서비스 상태",
        href: "/status",
        onClick: action("status-clicked"),
        external: true,
      },
    ],
  },
];

const mockSocialLinks = [
  {
    id: "twitter",
    name: "Twitter",
    icon: "share" as const,
    href: "https://twitter.com",
    onClick: action("twitter-clicked"),
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: "share" as const,
    href: "https://facebook.com",
    onClick: action("facebook-clicked"),
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "briefcase" as const,
    href: "https://linkedin.com",
    onClick: action("linkedin-clicked"),
  },
  {
    id: "github",
    name: "GitHub",
    icon: "star" as const,
    href: "https://github.com",
    onClick: action("github-clicked"),
  },
];

const mockBottomLinks = [
  {
    id: "privacy",
    label: "개인정보처리방침",
    href: "/privacy",
    onClick: action("privacy-clicked"),
  },
  {
    id: "terms",
    label: "이용약관",
    href: "/terms",
    onClick: action("terms-clicked"),
  },
  {
    id: "cookies",
    label: "쿠키 정책",
    href: "/cookies",
    onClick: action("cookies-clicked"),
  },
];

// Demo Layout Component
const DemoLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column" }}>
    {/* 메인 콘텐츠 영역 */}
    <main
      style={{
        flex: 1,
        padding: spacing.lg,
        backgroundColor: colors.background.white,
      }}>
      <div style={{ padding: spacing.md }}>
        <Text variant="h3" style={{ marginBottom: spacing.sm }}>
          페이지 콘텐츠
        </Text>
        <Text
          variant="body2"
          style={{
            color: colors.semantic.muted,
            lineHeight: 1.5,
          }}>
          푸터 컴포넌트 미리보기를 위한 콘텐츠 영역입니다.
        </Text>
      </div>
    </main>

    {/* 푸터 */}
    {children}
  </div>
);

export const Default = {
  args: {
    brandName: "My Company",
    description: "혁신적인 솔루션을 제공하는 기업입니다.",
    sections: mockSections,
    socialLinks: mockSocialLinks,
    copyrightText: "© 2024 My Company. All rights reserved.",
    bottomLinks: mockBottomLinks,
  },
  render: (args: FooterProps) => (
    <DemoLayout>
      <Footer {...args} />
    </DemoLayout>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Footer
  brandName="My Company"
  description="혁신적인 솔루션을 제공하는 기업입니다."
  sections={footerSections}
  socialLinks={socialLinks}
  copyrightText="© 2024 My Company. All rights reserved."
  bottomLinks={bottomLinks}
/>`,
      },
    },
  },
};

export const WithLogo = {
  args: {
    ...Default.args,
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
    brandName: "Logo Brand",
  },
  render: (args: FooterProps) => (
    <DemoLayout>
      <Footer {...args} />
    </DemoLayout>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Footer
  logo={<LogoComponent />}
  brandName="Logo Brand"
  sections={footerSections}
  socialLinks={socialLinks}
  copyrightText="© 2024 Logo Brand. All rights reserved."
/>`,
      },
    },
  },
};

export const WithNewsletter = {
  args: {
    ...Default.args,
    showNewsletter: true,
    onNewsletterSubmit: action("newsletter-submitted"),
  },
  render: (args: FooterProps) => (
    <DemoLayout>
      <Footer {...args} />
    </DemoLayout>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Footer
  brandName="My Company"
  sections={footerSections}
  socialLinks={socialLinks}
  showNewsletter={true}
  onNewsletterSubmit={(email) => console.log('구독:', email)}
  copyrightText="© 2024 My Company. All rights reserved."
/>`,
      },
    },
  },
};

export const Minimal = {
  args: {
    brandName: "Minimal Brand",
    variant: "minimal",
    sections: [mockSections[0]], // 하나의 섹션만
    copyrightText: "© 2024 Minimal Brand.",
    bottomLinks: mockBottomLinks.slice(0, 2), // 적은 수의 링크
  },
  render: (args: FooterProps) => (
    <DemoLayout>
      <Footer {...args} />
    </DemoLayout>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Footer
  brandName="Minimal Brand"
  variant="minimal"
  sections={minimalSections}
  copyrightText="© 2024 Minimal Brand."
  bottomLinks={essentialLinks}
/>`,
      },
    },
  },
};

export const Dark = {
  args: {
    ...Default.args,
    brandName: "Dark Theme",
    variant: "dark",
  },
  render: (args: FooterProps) => (
    <DemoLayout>
      <Footer {...args} />
    </DemoLayout>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Footer
  brandName="Dark Theme"
  variant="dark"
  sections={footerSections}
  socialLinks={socialLinks}
  copyrightText="© 2024 Dark Theme. All rights reserved."
  bottomLinks={bottomLinks}
/>`,
      },
    },
  },
};

export const Variants = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.lg }}>
      <div>
        <Text
          variant="h6"
          style={{
            marginBottom: spacing.xs,
            textAlign: "left",
            color: colors.semantic.text,
            fontWeight: fontWeight.semibold,
          }}>
          Default
        </Text>
        <Footer
          brandName="Default Company"
          variant="default"
          sections={[mockSections[0]]}
          socialLinks={mockSocialLinks.slice(0, 2)}
          copyrightText="© 2024 Default Company."
        />
      </div>
      <div>
        <Text
          variant="h6"
          style={{
            marginBottom: spacing.xs,
            textAlign: "left",
            color: colors.semantic.text,
            fontWeight: fontWeight.semibold,
          }}>
          Minimal
        </Text>
        <Footer
          brandName="Minimal Company"
          variant="minimal"
          sections={[mockSections[0]]}
          socialLinks={mockSocialLinks.slice(0, 2)}
          copyrightText="© 2024 Minimal Company."
        />
      </div>
      <div>
        <Text
          variant="h6"
          style={{
            marginBottom: spacing.xs,
            textAlign: "left",
            color: colors.semantic.text,
            fontWeight: fontWeight.semibold,
          }}>
          Dark
        </Text>
        <Footer
          brandName="Dark Company"
          variant="dark"
          sections={[mockSections[0]]}
          socialLinks={mockSocialLinks.slice(0, 2)}
          copyrightText="© 2024 Dark Company."
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `// Default Variant
<Footer variant="default" />

// Minimal Variant
<Footer variant="minimal" />

// Dark Variant
<Footer variant="dark" />`,
      },
    },
  },
};

export const CompactLayout = {
  args: {
    brandName: "Compact",
    description: "간단한 설명입니다.",
    sections: [
      {
        id: "links",
        title: "링크",
        links: [
          { id: "about", label: "소개", onClick: action("about-clicked") },
          {
            id: "contact",
            label: "연락처",
            onClick: action("contact-clicked"),
          },
        ],
      },
    ],
    socialLinks: mockSocialLinks.slice(0, 2),
    copyrightText: "© 2024 Compact.",
  },
  render: (args: FooterProps) => (
    <DemoLayout>
      <Footer {...args} />
    </DemoLayout>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Footer
  brandName="Compact"
  description="간단한 설명입니다."
  sections={compactSections}
  socialLinks={limitedSocialLinks}
  copyrightText="© 2024 Compact."
/>`,
      },
    },
  },
};

export const FullFeature = {
  args: {
    logo: (
      <div
        style={{
          width: "40px",
          height: "40px",
          backgroundColor: colors.semantic.primary,
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: colors.background.white,
          fontWeight: fontWeight.bold,
          fontSize: "18px",
        }}>
        F
      </div>
    ),
    brandName: "Full Feature",
    description:
      "모든 기능을 갖춘 종합적인 푸터 예시입니다. 뉴스레터, 소셜 링크, 다양한 섹션을 포함합니다.",
    sections: mockSections,
    socialLinks: mockSocialLinks,
    copyrightText: "© 2024 Full Feature Company. All rights reserved.",
    bottomLinks: mockBottomLinks,
    showNewsletter: true,
    onNewsletterSubmit: action("newsletter-submitted"),
    variant: "default",
  },
  render: (args: FooterProps) => (
    <DemoLayout>
      <Footer {...args} />
    </DemoLayout>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Footer
  logo={<LogoComponent />}
  brandName="Full Feature"
  description="모든 기능을 갖춘 종합적인 푸터 예시입니다."
  sections={allSections}
  socialLinks={allSocialLinks}
  copyrightText="© 2024 Full Feature Company. All rights reserved."
  bottomLinks={allBottomLinks}
  showNewsletter={true}
  onNewsletterSubmit={(email) => handleNewsletterSubmit(email)}
/>`,
      },
    },
  },
};
