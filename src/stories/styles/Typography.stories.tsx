import React from "react";
import { Text } from "../../components";
import { colors, typography, fontSize, fontWeight, semanticBorders, borderRadius } from "../../theme";

export default {
  title: "Styles/Typography",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "프로젝트에서 사용하는 타이포그래피 시스템입니다. 일관된 텍스트 스타일을 위해 정의된 variant와 크기를 사용해주세요.",
      },
    },
  },
};

const TypographyShowcase = ({ items }: {
  items: Array<{
    name: string;
    props: any;
    description: string;
  }>
}) => (
  <div style={{ marginBottom: "48px" }}>
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {items.map(({ name, props, description }) => (
        <div key={name} style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "24px",
          padding: "16px",
          backgroundColor: colors.background.white,
          border: semanticBorders.default,
          borderRadius: borderRadius.md
        }}>
          <div style={{
            flex: "1",
            minWidth: "200px"
          }}>
            <Text {...props}>
              The quick brown fox jumps over the lazy dog
            </Text>
          </div>
          <div style={{
            width: "200px",
            fontSize: fontSize.xs,
            color: colors.gray[600]
          }}>
            <div style={{ fontWeight: fontWeight.semibold, marginBottom: "4px" }}>{name}</div>
            <div style={{ marginBottom: "8px" }}>{description}</div>
            <div style={{
              fontFamily: "monospace",
              fontSize: fontSize.xs,
              color: colors.gray[500],
              backgroundColor: colors.gray[50],
              padding: "4px",
              borderRadius: "4px"
            }}>
              {JSON.stringify(props, null, 2).replace(/[{}",]/g, '').trim()}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const HeadingVariants = {
  render: () => (
    <TypographyShowcase
      items={[
        {
          name: "Heading 1",
          props: { variant: "h1" },
          description: `가장 큰 제목 (${typography.h1.fontSize}, ${typography.h1.fontWeight} weight)`
        },
        {
          name: "Heading 2",
          props: { variant: "h2" },
          description: `주요 섹션 제목 (${typography.h2.fontSize}, ${typography.h2.fontWeight} weight)`
        },
        {
          name: "Heading 3",
          props: { variant: "h3" },
          description: `하위 섹션 제목 (${typography.h3.fontSize}, ${typography.h3.fontWeight} weight)`
        },
        {
          name: "Heading 4",
          props: { variant: "h4" },
          description: `소제목 (${typography.h4.fontSize}, ${typography.h4.fontWeight} weight)`
        },
        {
          name: "Heading 5",
          props: { variant: "h5" },
          description: `작은 제목 (${typography.h5.fontSize}, ${typography.h5.fontWeight} weight)`
        },
        {
          name: "Heading 6",
          props: { variant: "h6" },
          description: `최소 제목 (${typography.h6.fontSize}, ${typography.h6.fontWeight} weight)`
        }
      ]}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Text } from "../../components";
import { typography } from "../../theme";

// 1. 기본 제목 계층 구조
<Text variant="h1">메인 페이지 제목</Text>
<Text variant="h2">주요 섹션</Text>
<Text variant="h3">하위 섹션</Text>
<Text variant="h4">소제목</Text>

// 2. 커스텀 제목 컴포넌트
const PageHeader = ({ title, subtitle }) => (
  <div style={{ marginBottom: '32px' }}>
    <Text variant="h1" color="primary" style={{ marginBottom: '8px' }}>
      {title}
    </Text>
    {subtitle && (
      <Text variant="body1" color="muted">
        {subtitle}
      </Text>
    )}
  </div>
);

// 3. 카드 헤더 컴포넌트
const CardHeader = ({ title, action }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  }}>
    <Text variant="h3">{title}</Text>
    {action && action}
  </div>
);

// 4. CSS-in-JS에서 직접 사용
const customTitleStyle = {
  ...typography.h2,
  color: colors.semantic.primary,
  textAlign: 'center',
  marginBottom: '24px',
  borderBottom: \`2px solid \${colors.border.primary}\`,
  paddingBottom: '16px'
};

// 사용 예시
<PageHeader
  title="대시보드"
  subtitle="프로젝트 현황을 한눈에 확인하세요"
/>`,
      },
    },
  },
};

export const BodyVariants = {
  render: () => (
    <TypographyShowcase
      items={[
        {
          name: "Body 1",
          props: { variant: "body1" },
          description: `기본 본문 텍스트 (${typography.body1.fontSize}, ${typography.body1.fontWeight} weight)`
        },
        {
          name: "Body 2",
          props: { variant: "body2" },
          description: `작은 본문 텍스트 (${typography.body2.fontSize}, ${typography.body2.fontWeight} weight)`
        },
        {
          name: "Caption",
          props: { variant: "caption" },
          description: `설명 텍스트 (${typography.caption.fontSize}, ${typography.caption.fontWeight} weight)`
        },
        {
          name: "Overline",
          props: { variant: "overline" },
          description: `라벨 텍스트 (${typography.overline.fontSize}, ${typography.overline.fontWeight} weight, uppercase)`
        }
      ]}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `// 1. 기본 본문 텍스트
<Text variant="body1">기본 본문 텍스트입니다. 대부분의 콘텐츠에 사용합니다.</Text>
<Text variant="body2">작은 본문 텍스트로 부가 설명이나 섹컨데리 콘텐츠에 사용합니다.</Text>

// 2. 설명과 메타데이터
<Text variant="caption" color="muted">이미지 설명, 날짜, 메타데이터 등에 사용</Text>
<Text variant="overline" color="primary">SECTION LABEL</Text>

// 3. 단락 컴포넌트
const Paragraph = ({ children, size = "body1" }) => (
  <Text variant={size} style={{
    lineHeight: 1.6,
    marginBottom: '16px'
  }}>
    {children}
  </Text>
);

// 4. 인용문 컴포넌트
const Quote = ({ children, author }) => (
  <blockquote style={{
    borderLeft: \`4px solid \${colors.border.primary}\`,
    paddingLeft: '16px',
    margin: '24px 0'
  }}>
    <Text variant="body1" style={{ fontStyle: 'italic', marginBottom: '8px' }}>
      "{children}"
    </Text>
    {author && (
      <Text variant="caption" color="muted">
        — {author}
      </Text>
    )}
  </blockquote>
);

// 사용 예시
<Quote author="사용자 A">
  이 프로덕트는 정말 훌륭합니다!
</Quote>`,
      },
    },
  },
};

export const FontSizes = {
  render: () => (
    <TypographyShowcase
      items={[
        {
          name: "Extra Extra Small",
          props: { size: "xxs" },
          description: `${fontSize.xxs} - 초소형 텍스트`
        },
        {
          name: "Extra Small",
          props: { size: "xs" },
          description: `${fontSize.xs} - 매우 작은 텍스트`
        },
        {
          name: "Small",
          props: { size: "sm" },
          description: `${fontSize.sm} - 작은 텍스트`
        },
        {
          name: "Medium",
          props: { size: "md" },
          description: `${fontSize.md} - 기본 텍스트`
        },
        {
          name: "Large",
          props: { size: "lg" },
          description: `${fontSize.lg} - 큰 텍스트`
        },
        {
          name: "Extra Large",
          props: { size: "xl" },
          description: `${fontSize.xl} - 매우 큰 텍스트`
        },
        {
          name: "2X Large",
          props: { size: "2xl" },
          description: `${fontSize['2xl']} - 특대 텍스트`
        },
        {
          name: "3X Large",
          props: { size: "3xl" },
          description: `${fontSize['3xl']} - 초대형 텍스트`
        },
        {
          name: "4X Large",
          props: { size: "4xl" },
          description: `${fontSize['4xl']} - 최대 텍스트`
        }
      ]}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<Text size="xxs">Extra Extra Small Text</Text>
<Text size="xs">Extra Small Text</Text>
<Text size="sm">Small Text</Text>
<Text size="md">Medium Text</Text>
<Text size="lg">Large Text</Text>
<Text size="xl">Extra Large Text</Text>
<Text size="2xl">2X Large Text</Text>
<Text size="3xl">3X Large Text</Text>
<Text size="4xl">4X Large Text</Text>`,
      },
    },
  },
};

export const FontWeights = {
  render: () => (
    <TypographyShowcase
      items={[
        {
          name: "Light",
          props: { weight: "light" },
          description: `${fontWeight.light} - 얇은 글꼴`
        },
        {
          name: "Normal",
          props: { weight: "normal" },
          description: `${fontWeight.normal} - 기본 글꼴`
        },
        {
          name: "Medium",
          props: { weight: "medium" },
          description: `${fontWeight.medium} - 중간 글꼴`
        },
        {
          name: "Semi Bold",
          props: { weight: "semibold" },
          description: `${fontWeight.semibold} - 반굵은 글꼴`
        },
        {
          name: "Bold",
          props: { weight: "bold" },
          description: `${fontWeight.bold} - 굵은 글꼴`
        }
      ]}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<Text weight="light">Light Text</Text>
<Text weight="normal">Normal Text</Text>
<Text weight="medium">Medium Text</Text>
<Text weight="semibold">Semi Bold Text</Text>
<Text weight="bold">Bold Text</Text>`,
      },
    },
  },
};

export const TextColors = {
  render: () => (
    <TypographyShowcase
      items={[
        {
          name: "Default Text",
          props: { color: "text" },
          description: "기본 텍스트 색상"
        },
        {
          name: "Primary",
          props: { color: "primary" },
          description: "브랜드 주색상"
        },
        {
          name: "Secondary",
          props: { color: "secondary" },
          description: "보조 색상"
        },
        {
          name: "Success",
          props: { color: "success" },
          description: "성공 상태"
        },
        {
          name: "Error",
          props: { color: "error" },
          description: "오류 상태"
        },
        {
          name: "Warning",
          props: { color: "warning" },
          description: "경고 상태"
        },
        {
          name: "Info",
          props: { color: "info" },
          description: "정보 상태"
        },
        {
          name: "Muted",
          props: { color: "muted" },
          description: "비활성 텍스트"
        }
      ]}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<Text color="text">Default Text</Text>
<Text color="primary">Primary Text</Text>
<Text color="secondary">Secondary Text</Text>
<Text color="success">Success Text</Text>
<Text color="error">Error Text</Text>
<Text color="warning">Warning Text</Text>
<Text color="info">Info Text</Text>
<Text color="muted">Muted Text</Text>`,
      },
    },
  },
};

export const TextAlignment = {
  render: () => (
    <div style={{ marginBottom: "32px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {[
          { align: "left", label: "Left Aligned" },
          { align: "center", label: "Center Aligned" },
          { align: "right", label: "Right Aligned" },
          { align: "justify", label: "Justified" }
        ].map(({ align, label }) => (
          <div key={align} style={{
            padding: "16px",
            backgroundColor: colors.background.white,
            border: semanticBorders.default,
            borderRadius: "8px"
          }}>
            <div style={{
              fontSize: fontSize.xs,
              fontWeight: fontWeight.semibold,
              marginBottom: "8px",
              color: colors.gray[600]
            }}>
              {label}
            </div>
            <Text align={align as "left" | "center" | "right" | "justify"}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
            </Text>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Text align="left">Left aligned text</Text>
<Text align="center">Center aligned text</Text>
<Text align="right">Right aligned text</Text>
<Text align="justify">Justified text</Text>`,
      },
    },
  },
};

export const TextTransformations = {
  render: () => (
    <TypographyShowcase
      items={[
        {
          name: "Normal",
          props: { transform: "none" },
          description: "변환 없음"
        },
        {
          name: "Capitalize",
          props: { transform: "capitalize" },
          description: "첫 글자 대문자"
        },
        {
          name: "Uppercase",
          props: { transform: "uppercase" },
          description: "모든 글자 대문자"
        },
        {
          name: "Lowercase",
          props: { transform: "lowercase" },
          description: "모든 글자 소문자"
        }
      ]}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<Text transform="none">Normal text</Text>
<Text transform="capitalize">Capitalized text</Text>
<Text transform="uppercase">Uppercase text</Text>
<Text transform="lowercase">Lowercase text</Text>`,
      },
    },
  },
};

export const TextDecorations = {
  render: () => (
    <TypographyShowcase
      items={[
        {
          name: "None",
          props: { decoration: "none" },
          description: "장식 없음"
        },
        {
          name: "Underline",
          props: { decoration: "underline" },
          description: "밑줄"
        },
        {
          name: "Line Through",
          props: { decoration: "line-through" },
          description: "취소선"
        }
      ]}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<Text decoration="none">Normal text</Text>
<Text decoration="underline">Underlined text</Text>
<Text decoration="line-through">Strikethrough text</Text>`,
      },
    },
  },
};

export const ThemeValues = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", maxWidth: "1200px" }}>
      <div>
        <h3 style={{
          fontSize: fontSize.lg,
          fontWeight: fontWeight.semibold,
          marginBottom: "16px",
          color: colors.gray[900],
          borderBottom: semanticBorders.default,
          paddingBottom: "8px"
        }}>
          Font Sizes
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {Object.entries(fontSize).map(([key, value]) => (
            <div key={key} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 12px",
              backgroundColor: colors.gray[50],
              borderRadius: "4px",
              fontSize: fontSize.xs
            }}>
              <span style={{ fontWeight: fontWeight.semibold }}>{key}</span>
              <span style={{ fontFamily: "monospace", color: colors.gray[600] }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 style={{
          fontSize: fontSize.lg,
          fontWeight: fontWeight.semibold,
          marginBottom: "16px",
          color: colors.gray[900],
          borderBottom: semanticBorders.default,
          paddingBottom: "8px"
        }}>
          Font Weights
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {Object.entries(fontWeight).map(([key, value]) => (
            <div key={key} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 12px",
              backgroundColor: colors.gray[50],
              borderRadius: "4px",
              fontSize: fontSize.xs
            }}>
              <span style={{ fontWeight: fontWeight.semibold }}>{key}</span>
              <span style={{ fontFamily: "monospace", color: colors.gray[600] }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ gridColumn: "1 / -1" }}>
        <h3 style={{
          fontSize: fontSize.lg,
          fontWeight: fontWeight.semibold,
          marginBottom: "16px",
          color: colors.gray[900],
          borderBottom: semanticBorders.default,
          paddingBottom: "8px"
        }}>
          Typography Variants
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {Object.entries(typography).map(([key, value]) => (
            <div key={key} style={{
              padding: "16px",
              backgroundColor: colors.gray[50],
              borderRadius: "8px",
              border: semanticBorders.default
            }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "8px"
              }}>
                <span style={{ fontWeight: fontWeight.semibold, fontSize: fontSize.sm }}>{key}</span>
                <div style={{
                  fontFamily: "monospace",
                  fontSize: fontSize.xxs,
                  color: colors.gray[600],
                  textAlign: "right"
                }}>
                  <div>fontSize: {value.fontSize}</div>
                  <div>fontWeight: {value.fontWeight}</div>
                  <div>lineHeight: {value.lineHeight}</div>
                  {(value as any).letterSpacing && <div>letterSpacing: {(value as any).letterSpacing}</div>}
                  {(value as any).textTransform && <div>textTransform: {(value as any).textTransform}</div>}
                </div>
              </div>
              <Text variant={key as any}>The quick brown fox jumps over the lazy dog</Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { typography, fontSize, fontWeight } from "../../theme";

// Typography theme 값들을 직접 사용 가능
const customStyles = {
  fontSize: fontSize.lg,
  fontWeight: fontWeight.semibold,
  ...typography.h3
};`,
      },
    },
  },
};

export const RealWorldExamples = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {/* 블로그 포스트 예시 */}
      <div style={{
        maxWidth: '600px',
        padding: '24px',
        backgroundColor: colors.background.white,
        border: semanticBorders.default,
        borderRadius: '12px'
      }}>
        <Text variant="overline" color="primary" style={{ marginBottom: '8px' }}>TUTORIAL</Text>
        <Text variant="h1" style={{ marginBottom: '16px' }}>React 컴포넌트 설계 가이드</Text>
        <Text variant="body2" color="muted" style={{ marginBottom: '24px' }}>2024년 11월 25일 · 5분 읽기</Text>
        <Text variant="body1" style={{ marginBottom: '16px', lineHeight: 1.6 }}>
          재사용 가능한 React 컴포넌트를 설계하는 것은 현대 웹 개발에서 매우 중요한 스킬입니다.
          이 가이드에서는 효과적인 컴포넌트 설계 원칙과 실제 적용 방법을 알아보겠습니다.
        </Text>
        <Text variant="h3" style={{ marginBottom: '12px', marginTop: '32px' }}>주요 설계 원칙</Text>
        <Text variant="body1" style={{ marginBottom: '16px', lineHeight: 1.6 }}>
          컴포넌트는 단일 책임 원칙을 따라야 하며, 명확한 인터페이스를 가져야 합니다.
        </Text>
      </div>

      {/* 카드 UI 예시 */}
      <div style={{
        maxWidth: '400px',
        padding: '20px',
        backgroundColor: colors.background.white,
        border: semanticBorders.default,
        borderRadius: '8px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <Text variant="h4" style={{ marginBottom: '4px' }}>프로젝트 알파</Text>
            <Text variant="caption" color="muted">2024.11.25 업데이트</Text>
          </div>
          <Text variant="overline" color="success" style={{
            backgroundColor: colors.success[50],
            padding: '4px 8px',
            borderRadius: '4px',
            border: `1px solid ${colors.success[200]}`
          }}>완료</Text>
        </div>
        <Text variant="body2" style={{ marginBottom: '16px', lineHeight: 1.5 }}>
          새로운 사용자 인터페이스 디자인 시스템을 구축하고 전체 애플리케이션에 적용했습니다.
        </Text>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Text variant="caption" color="muted">담당자:</Text>
          <Text variant="caption" weight="medium">김개발</Text>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `// 실제 애플리케이션에서 Typography 활용 예시

// 1. 블로그 포스트 컴포넌트
const BlogPost = ({ category, title, publishedAt, readTime, content }) => (
  <article style={{
    maxWidth: '600px',
    padding: '24px',
    backgroundColor: colors.background.white,
    border: \`1px solid \${colors.gray[200]}\`,
    borderRadius: '12px'
  }}>
    <Text variant="overline" color="primary">{category.toUpperCase()}</Text>
    <Text variant="h1" style={{ marginBottom: '16px' }}>{title}</Text>
    <Text variant="body2" color="muted" style={{ marginBottom: '24px' }}>
      {publishedAt} · {readTime}
    </Text>
    <Text variant="body1" style={{ lineHeight: 1.6 }}>
      {content}
    </Text>
  </article>
);

// 2. 프로젝트 카드 컴포넌트
const ProjectCard = ({ title, lastUpdated, description, status, assignee }) => (
  <div style={{
    padding: '20px',
    backgroundColor: colors.background.white,
    border: \`1px solid \${colors.gray[200]}\`,
    borderRadius: '8px'
  }}>
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '16px'
    }}>
      <div>
        <Text variant="h4">{title}</Text>
        <Text variant="caption" color="muted">{lastUpdated}</Text>
      </div>
      <StatusBadge status={status} />
    </div>
    <Text variant="body2" style={{ lineHeight: 1.5 }}>
      {description}
    </Text>
    <Text variant="caption" color="muted">
      담당자: <Text variant="caption" weight="medium">{assignee}</Text>
    </Text>
  </div>
);

// 3. 상태 배지 컴포넌트
const StatusBadge = ({ status }) => {
  const statusColors = {
    완료: { bg: colors.success[50], border: colors.success[200], text: 'success' },
    진행중: { bg: colors.info[50], border: colors.info[200], text: 'info' },
    대기: { bg: colors.warning[50], border: colors.warning[200], text: 'warning' }
  };

  const style = statusColors[status];

  return (
    <Text variant="overline" color={style.text} style={{
      backgroundColor: style.bg,
      border: \`1px solid \${style.border}\`,
      padding: '4px 8px',
      borderRadius: '4px'
    }}>
      {status}
    </Text>
  );
};`,
      },
    },
  },
};

export const TypographyHierarchy = {
  render: () => (
    <div style={{ maxWidth: "800px" }}>
      <Text variant="h1" style={{ marginBottom: "16px" }}>
        Typography Hierarchy Example
      </Text>

      <Text variant="h2" style={{ marginBottom: "12px", marginTop: "32px" }}>
        Main Section Heading
      </Text>

      <Text variant="body1" style={{ marginBottom: "16px" }}>
        This is a paragraph of body text that demonstrates how different typography variants work together to create a clear visual hierarchy. The text uses the body1 variant which is perfect for main content.
      </Text>

      <Text variant="h3" style={{ marginBottom: "12px", marginTop: "24px" }}>
        Subsection Heading
      </Text>

      <Text variant="body2" style={{ marginBottom: "8px" }}>
        This paragraph uses body2, which is slightly smaller and works well for secondary information or smaller content blocks.
      </Text>

      <Text variant="caption" color="muted" style={{ marginBottom: "16px" }}>
        This caption text provides additional context or metadata about the content above.
      </Text>

      <Text variant="h4" style={{ marginBottom: "8px", marginTop: "20px" }}>
        Small Heading
      </Text>

      <Text variant="overline" color="primary" style={{ marginBottom: "8px" }}>
        Category Label
      </Text>

      <Text variant="body1">
        Final paragraph that shows how all these elements work together in a real content layout.
      </Text>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Text variant="h1">Typography Hierarchy Example</Text>

<Text variant="h2">Main Section Heading</Text>
<Text variant="body1">
  This is a paragraph of body text...
</Text>

<Text variant="h3">Subsection Heading</Text>
<Text variant="body2">
  This paragraph uses body2...
</Text>
<Text variant="caption" color="muted">
  This caption text provides additional context...
</Text>

<Text variant="h4">Small Heading</Text>
<Text variant="overline" color="primary">Category Label</Text>
<Text variant="body1">Final paragraph...</Text>`,
      },
    },
  },
};
