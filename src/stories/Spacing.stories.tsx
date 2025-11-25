import React from "react";
import {
  spacing,
  semanticSpacing,
  layout,
  grid,
  colors,
  semanticBorders,
  componentBorders,
  borderRadius,
  fontSize,
  fontWeight,
} from "../theme";

export default {
  title: "Styles/Spacing",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "프로젝트에서 사용하는 spacing 시스템입니다. 일관된 레이아웃을 위해 정의된 spacing 값을 사용해주세요.",
      },
    },
  },
};

const SpacingDemo = ({
  spacingValues,
  type = "square",
}: {
  spacingValues: Record<string, string>;
  type?: "square" | "horizontal" | "vertical";
}) => (
  <div style={{ marginBottom: "48px" }}>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}>
      {Object.entries(spacingValues).map(([key, value]) => {
        const numericValue = parseInt(value);
        const isLarge = numericValue > 64;

        return (
          <div
            key={key}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "16px",
              backgroundColor: colors.gray[50],
              borderRadius: "8px",
              border: semanticBorders.default,
              minHeight: "60px",
            }}>
            <div
              style={{
                width: "180px",
                fontSize: fontSize.sm,
                fontWeight: fontWeight.medium,
                color: colors.gray[900],
                whiteSpace: "nowrap",
              }}>
              {key}
            </div>

            <div
              style={{
                fontSize: fontSize.xs,
                fontFamily: "monospace",
                color: colors.gray[600],
                width: "80px",
                whiteSpace: "nowrap",
              }}>
              {value}
            </div>

            {/* Visual representation */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flex: 1,
              }}>
              {type === "square" && (
                <div
                  style={{
                    width: isLarge ? "64px" : value,
                    height: isLarge ? "64px" : value,
                    backgroundColor: colors.semantic.primary,
                    borderRadius: "4px",
                    border: componentBorders.card.hover,
                    position: "relative",
                  }}>
                  {isLarge && (
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        fontSize: fontSize.xs,
                        color: colors.background.white,
                        fontWeight: fontWeight.medium,
                      }}>
                      {value}
                    </div>
                  )}
                </div>
              )}

              {type === "horizontal" && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: value,
                    maxWidth: "300px",
                  }}>
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      backgroundColor: colors.semantic.primary,
                      borderRadius: "4px",
                    }}
                  />
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      backgroundColor: colors.semantic.success,
                      borderRadius: "4px",
                    }}
                  />
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      backgroundColor: colors.semantic.warning,
                      borderRadius: "4px",
                    }}
                  />
                </div>
              )}

              {type === "vertical" && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: value,
                    maxHeight: "200px",
                  }}>
                  <div
                    style={{
                      width: "80px",
                      height: "16px",
                      backgroundColor: colors.semantic.primary,
                      borderRadius: "4px",
                    }}
                  />
                  <div
                    style={{
                      width: "80px",
                      height: "16px",
                      backgroundColor: colors.semantic.success,
                      borderRadius: "4px",
                    }}
                  />
                  <div
                    style={{
                      width: "80px",
                      height: "16px",
                      backgroundColor: colors.semantic.warning,
                      borderRadius: "4px",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export const BasicSpacing = {
  render: () => (
    <SpacingDemo
      spacingValues={spacing}
      type="square"
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `import { spacing } from "../theme";

// 1. 기본 레이아웃 패턴
const cardLayoutStyle = {
  padding: spacing.md,              // 내부 여백 16px
  margin: spacing.lg,               // 외부 여백 20px
  gap: spacing.sm,                  // 아이템 간격 12px
  borderRadius: spacing.xs,         // 모서리 8px
};

// 2. 그리드 레이아웃
const gridLayout = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: spacing.lg,                  // 그리드 아이템 간격
  padding: spacing.xl,              // 컴테이너 패딩
};

// 3. 버튼 그룹 레이아웃
const ButtonGroup = ({ children }) => (
  <div style={{
    display: 'flex',
    gap: spacing.sm,                // 버튼 간 간격
    flexWrap: 'wrap',
    padding: spacing.xs,            // 그룹 안쪽 패딩
  }}>
    {children}
  </div>
);

// 4. 섹션 간격 관리
const PageSection = ({ title, children }) => (
  <section style={{
    marginBottom: spacing['2xl'],   // 섹션 간 큰 간격
    padding: spacing.lg,            // 섹션 내부 패딩
  }}>
    <h2 style={{ marginBottom: spacing.md }}>{title}</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
      {children}
    </div>
  </section>
);

// 5. 반응형 스페이싱
const responsiveContainerStyle = {
  padding: spacing.sm,              // 모바일: 12px
  '@media (min-width: 768px)': {
    padding: spacing.xl,            // 태블릿: 24px
  },
  '@media (min-width: 1024px)': {
    padding: spacing['2xl'],        // 데스크톱: 32px
  },
};

// 사용 예시
<ButtonGroup>
  <button>저장</button>
  <button>취소</button>
  <button>삭제</button>
</ButtonGroup>`,
      },
    },
  },
};

export const SemanticSpacing = {
  render: () => {
    const examples = {
      componentPaddingSmall: {
        description: "작은 컴포넌트 패딩 (버튼, 입력 필드)",
        example: (
          <button style={{
            padding: semanticSpacing.componentPaddingSmall,
            backgroundColor: colors.semantic.primary,
            color: colors.background.white,
            border: 'none',
            borderRadius: '4px',
            fontSize: fontSize.sm
          }}>
            소형 버튼
          </button>
        )
      },
      componentPaddingMedium: {
        description: "중간 컴포넌트 패딩 (카드 내부)",
        example: (
          <div style={{
            padding: semanticSpacing.componentPaddingMedium,
            backgroundColor: colors.gray[50],
            border: semanticBorders.default,
            borderRadius: '8px',
            fontSize: fontSize.sm
          }}>
            카드 콘텐츠
          </div>
        )
      },
      componentPaddingLarge: {
        description: "큰 컴포넌트 패딩 (모달, 큰 카드)",
        example: (
          <div style={{
            padding: semanticSpacing.componentPaddingLarge,
            backgroundColor: colors.gray[50],
            border: semanticBorders.default,
            borderRadius: '12px',
            fontSize: fontSize.sm,
            maxWidth: '300px'
          }}>
            대형 카드 또는 모달 콘텐츠
          </div>
        )
      },
      gapTiny: {
        description: "극소 요소 간 간격 (아이콘+텍스트)",
        example: (
          <div style={{ display: 'flex', alignItems: 'center', gap: semanticSpacing.gapTiny }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: colors.semantic.primary, borderRadius: '2px' }} />
            <span style={{ fontSize: fontSize.sm }}>아이콘 텍스트</span>
          </div>
        )
      },
      gapSmall: {
        description: "작은 요소 간 간격 (버튼 그룹)",
        example: (
          <div style={{ display: 'flex', gap: semanticSpacing.gapSmall }}>
            <div style={{ width: '32px', height: '32px', backgroundColor: colors.semantic.primary, borderRadius: '4px' }} />
            <div style={{ width: '32px', height: '32px', backgroundColor: colors.semantic.success, borderRadius: '4px' }} />
            <div style={{ width: '32px', height: '32px', backgroundColor: colors.semantic.warning, borderRadius: '4px' }} />
          </div>
        )
      },
      gapMedium: {
        description: "중간 요소 간 간격 (카드 그리드)",
        example: (
          <div style={{ display: 'flex', gap: semanticSpacing.gapMedium }}>
            <div style={{ width: '64px', height: '48px', backgroundColor: colors.semantic.primary, borderRadius: '4px' }} />
            <div style={{ width: '64px', height: '48px', backgroundColor: colors.semantic.success, borderRadius: '4px' }} />
          </div>
        )
      },
      gapLarge: {
        description: "큰 요소 간 간격 (섹션 요소)",
        example: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: semanticSpacing.gapLarge, maxWidth: '200px' }}>
            <div style={{ padding: '16px', backgroundColor: colors.gray[100], borderRadius: '8px', textAlign: 'center' }}>섹션 A</div>
            <div style={{ padding: '16px', backgroundColor: colors.gray[100], borderRadius: '8px', textAlign: 'center' }}>섹션 B</div>
          </div>
        )
      },
      gapXLarge: {
        description: "초대형 요소 간 간격 (메인 섹션)",
        example: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: semanticSpacing.gapXLarge, maxWidth: '240px' }}>
            <div style={{ padding: '20px', backgroundColor: colors.semantic.primary, color: colors.background.white, borderRadius: '8px', textAlign: 'center' }}>헤더</div>
            <div style={{ padding: '20px', backgroundColor: colors.gray[100], borderRadius: '8px', textAlign: 'center' }}>메인 콘텐츠</div>
          </div>
        )
      },
      sectionMarginSmall: {
        description: "작은 섹션 간 간격",
        example: (
          <div>
            <div style={{ padding: '12px', backgroundColor: colors.gray[100], borderRadius: '4px', marginBottom: semanticSpacing.sectionMarginSmall }}>섹션 1</div>
            <div style={{ padding: '12px', backgroundColor: colors.gray[100], borderRadius: '4px' }}>섹션 2</div>
          </div>
        )
      },
      sectionMarginMedium: {
        description: "중간 섹션 간 간격 (메인 콘텐츠 구역)",
        example: (
          <div style={{ maxWidth: '200px' }}>
            <div style={{ padding: '16px', backgroundColor: colors.semantic.primary, color: colors.background.white, borderRadius: '6px', marginBottom: semanticSpacing.sectionMarginMedium, textAlign: 'center' }}>섹션 A</div>
            <div style={{ padding: '16px', backgroundColor: colors.semantic.success, color: colors.background.white, borderRadius: '6px', textAlign: 'center' }}>섹션 B</div>
          </div>
        )
      },
      sectionMarginLarge: {
        description: "큰 섹션 간 간격 (페이지 레벨)",
        example: (
          <div style={{ maxWidth: '200px' }}>
            <div style={{ padding: '20px', backgroundColor: colors.semantic.primary, color: colors.background.white, borderRadius: '8px', textAlign: 'center' }}>헤더 섹션</div>
            <div style={{ fontSize: fontSize.xs, color: colors.gray[500], textAlign: 'center', margin: `${semanticSpacing.sectionMarginLarge} 0 8px` }}>↓ 80px 간격 ↓</div>
            <div style={{ padding: '20px', backgroundColor: colors.gray[100], borderRadius: '8px', textAlign: 'center' }}>메인 콘텐츠</div>
          </div>
        )
      },
      containerPaddingMobile: {
        description: "모바일 컴테이너 패딩",
        example: (
          <div style={{
            padding: semanticSpacing.containerPaddingMobile,
            backgroundColor: colors.gray[50],
            border: `2px dashed ${colors.gray[300]}`,
            borderRadius: '4px',
            maxWidth: '200px',
            fontSize: fontSize.xs
          }}>
            모바일 컴테이너
          </div>
        )
      },
      containerPaddingTablet: {
        description: "태블릿 컴테이너 패딩",
        example: (
          <div style={{
            padding: semanticSpacing.containerPaddingTablet,
            backgroundColor: colors.gray[50],
            border: `2px dashed ${colors.gray[300]}`,
            borderRadius: '6px',
            maxWidth: '240px',
            fontSize: fontSize.sm
          }}>
            태블릿 컴테이너
          </div>
        )
      },
      containerPaddingDesktop: {
        description: "데스크톱 컴테이너 패딩",
        example: (
          <div style={{
            padding: semanticSpacing.containerPaddingDesktop,
            backgroundColor: colors.gray[50],
            border: `2px dashed ${colors.gray[300]}`,
            borderRadius: '8px',
            maxWidth: '280px',
            fontSize: fontSize.sm
          }}>
            데스크톱 컴테이너
          </div>
        )
      },
      formFieldGap: {
        description: "폼 필드 간 간격",
        example: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: semanticSpacing.formFieldGap, maxWidth: '200px' }}>
            <input placeholder="이름" style={{ padding: '8px', border: semanticBorders.strong, borderRadius: '4px' }} />
            <input placeholder="이메일" style={{ padding: '8px', border: semanticBorders.strong, borderRadius: '4px' }} />
          </div>
        )
      },
      formSectionGap: {
        description: "폼 섹션 간 간격",
        example: (
          <div style={{ maxWidth: '200px' }}>
            <div style={{ marginBottom: semanticSpacing.formSectionGap }}>
              <h4 style={{ margin: '0 0 8px', fontSize: fontSize.sm }}>개인 정보</h4>
              <input placeholder="이름" style={{ width: '100%', padding: '6px', border: semanticBorders.strong, borderRadius: '4px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <h4 style={{ margin: '0 0 8px', fontSize: fontSize.sm }}>연락처</h4>
              <input placeholder="이메일" style={{ width: '100%', padding: '6px', border: semanticBorders.strong, borderRadius: '4px', boxSizing: 'border-box' }} />
            </div>
          </div>
        )
      },
      cardPadding: {
        description: "카드 내부 패딩",
        example: (
          <div style={{
            padding: semanticSpacing.cardPadding,
            backgroundColor: colors.background.white,
            border: semanticBorders.default,
            borderRadius: '8px',
            fontSize: fontSize.sm,
            maxWidth: '200px'
          }}>
            카드 내용 예시
          </div>
        )
      },
      cardGap: {
        description: "카드 내부 요소 간격",
        example: (
          <div style={{
            padding: '12px',
            backgroundColor: colors.background.white,
            border: semanticBorders.default,
            borderRadius: '8px',
            maxWidth: '180px'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: semanticSpacing.cardGap }}>
              <h4 style={{ margin: 0, fontSize: fontSize.sm }}>카드 제목</h4>
              <p style={{ margin: 0, fontSize: fontSize.xs, color: colors.gray[600] }}>카드 설명</p>
              <div style={{ fontSize: fontSize.xs, color: colors.gray[500] }}>추가 정보</div>
            </div>
          </div>
        )
      },
      buttonPaddingSmall: {
        description: "소형 버튼 패딩",
        example: (
          <button style={{
            padding: semanticSpacing.buttonPaddingSmall,
            backgroundColor: colors.semantic.primary,
            color: colors.background.white,
            border: 'none',
            borderRadius: '4px',
            fontSize: fontSize.xs,
            cursor: 'pointer'
          }}>
            소형
          </button>
        )
      },
      buttonPaddingMedium: {
        description: "중간 버튼 패딩",
        example: (
          <button style={{
            padding: semanticSpacing.buttonPaddingMedium,
            backgroundColor: colors.semantic.primary,
            color: colors.background.white,
            border: 'none',
            borderRadius: '6px',
            fontSize: fontSize.sm,
            cursor: 'pointer'
          }}>
            중간
          </button>
        )
      },
      buttonPaddingLarge: {
        description: "대형 버튼 패딩",
        example: (
          <button style={{
            padding: semanticSpacing.buttonPaddingLarge,
            backgroundColor: colors.semantic.primary,
            color: colors.background.white,
            border: 'none',
            borderRadius: '8px',
            fontSize: fontSize.md,
            cursor: 'pointer'
          }}>
            대형
          </button>
        )
      }
    };

    return (
      <div>
        <div style={{
          padding: '16px',
          backgroundColor: colors.info[50],
          border: semanticBorders.info,
          borderRadius: '8px',
          marginBottom: '24px'
        }}>
          <p style={{
            margin: 0,
            fontSize: fontSize.sm,
            color: colors.info[700]
          }}>
            각 spacing 값의 실제 사용 예시를 확인하세요. "호버" 시 더 자세한 설명을 볼 수 있습니다.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}>
          {Object.entries(semanticSpacing).map(([key, value]) => {
            const example = examples[key as keyof typeof examples];
            return (
              <div
                key={key}
                style={{
                  padding: "16px",
                  backgroundColor: colors.gray[50],
                  borderRadius: "8px",
                  border: semanticBorders.default,
                }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: example ? "12px" : "0"
                }}>
                  <div style={{ flex: 1 }}>
                    <span
                      style={{
                        fontWeight: fontWeight.semibold,
                        fontSize: fontSize.sm,
                        color: colors.gray[900],
                        display: "block",
                        marginBottom: "4px"
                      }}>
                      {key}
                    </span>
                    {example && (
                      <span style={{
                        fontSize: fontSize.xs,
                        color: colors.gray[600]
                      }}>
                        {example.description}
                      </span>
                    )}
                  </div>
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: fontSize.xs,
                      color: colors.gray[600],
                      backgroundColor: colors.background.white,
                      padding: "4px 8px",
                      borderRadius: "4px",
                      minWidth: "80px",
                      textAlign: "center",
                    }}>
                    {value}
                  </span>
                </div>
                {example && (
                  <div style={{
                    padding: "12px",
                    backgroundColor: colors.background.white,
                    borderRadius: "6px",
                    border: semanticBorders.default
                  }}>
                    {example.example}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `import { semanticSpacing } from "../theme";

// 1. 카드 컴포넌트
const Card = ({ title, children, size = "medium" }) => (
  <div style={{
    padding: size === "large"
      ? semanticSpacing.componentPaddingLarge
      : semanticSpacing.componentPaddingMedium,
    borderRadius: semanticSpacing.borderRadiusMedium,
    backgroundColor: colors.background.white,
    border: \`1px solid \${colors.border.default}\`,
    marginBottom: semanticSpacing.cardGap,
  }}>
    {title && (
      <h3 style={{
        margin: 0,
        marginBottom: semanticSpacing.gapSmall
      }}>
        {title}
      </h3>
    )}
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: semanticSpacing.gapSmall
    }}>
      {children}
    </div>
  </div>
);

// 2. 버튼 컴포넌트
const Button = ({ children, icon, size = "medium" }) => (
  <button style={{
    padding: size === "large"
      ? semanticSpacing.buttonPaddingLarge
      : semanticSpacing.buttonPaddingMedium,
    display: 'flex',
    alignItems: 'center',
    gap: semanticSpacing.buttonGap,
    borderRadius: semanticSpacing.borderRadiusSmall,
    border: \`1px solid \${colors.border.primary}\`,
    backgroundColor: colors.semantic.primary,
    color: colors.background.white,
    cursor: 'pointer'
  }}>
    {icon && <span>{icon}</span>}
    {children}
  </button>
);

// 3. 폼 레이아웃
const FormField = ({ label, children }) => (
  <div style={{ marginBottom: semanticSpacing.formFieldGap }}>
    <label style={{
      display: 'block',
      marginBottom: semanticSpacing.gapXSmall,
      fontWeight: 'medium'
    }}>
      {label}
    </label>
    {children}
  </div>
);

const FormSection = ({ title, children }) => (
  <div style={{ marginBottom: semanticSpacing.formSectionGap }}>
    <h3 style={{ marginBottom: semanticSpacing.gapMedium }}>{title}</h3>
    {children}
  </div>
);

// 4. 네비게이션
const Navigation = ({ items }) => (
  <nav style={{
    padding: semanticSpacing.navigationPadding,
    display: 'flex',
    gap: semanticSpacing.navigationGap
  }}>
    {items.map(item => (
      <a key={item.label} style={{
        padding: semanticSpacing.componentPaddingSmall,
        textDecoration: 'none'
      }}>
        {item.label}
      </a>
    ))}
  </nav>
);

// 사용 예시
<Card title="사용자 정보" size="large">
  <p>사용자 프로필 정보를 표시합니다.</p>
  <Button icon="✏️">편집</Button>
</Card>`,
      },
    },
  },
};

export const LayoutConstants = {
  render: () => {
    const layoutExamples = {
      containerMaxWidth: {
        description: "최대 컴테이너 넓이 (데스크톱 레이아웃)",
        example: (
          <div style={{
            maxWidth: layout.containerMaxWidth,
            margin: '0 auto',
            backgroundColor: colors.gray[50],
            border: `2px dashed ${colors.gray[300]}`,
            padding: '16px',
            borderRadius: '8px',
            textAlign: 'center',
            fontSize: fontSize.sm
          }}>
            컴테이너 (max-width: {layout.containerMaxWidth})
          </div>
        )
      },
      contentMaxWidth: {
        description: "콘텐츠 최대 넓이 (읽기 좋은 텍스트 넓이)",
        example: (
          <div style={{
            maxWidth: layout.contentMaxWidth,
            margin: '0 auto',
            backgroundColor: colors.gray[50],
            border: `2px dashed ${colors.semantic.primary}`,
            padding: '16px',
            borderRadius: '8px',
            fontSize: fontSize.sm
          }}>
            아티클 콘텐츠 영역 (max-width: {layout.contentMaxWidth})
            <p style={{ margin: '8px 0', fontSize: fontSize.xs, color: colors.gray[600] }}>
              디스테이너 노트: 좌우 60-75 문자가 읽기 좋은 줄 길이입니다.
            </p>
          </div>
        )
      },
      sidebarWidth: {
        description: "사이드바 넓이 (네비게이션 패널)",
        example: (
          <div style={{ display: 'flex', gap: '16px', maxWidth: '500px' }}>
            <div style={{
              width: layout.sidebarWidth,
              backgroundColor: colors.semantic.primary,
              color: colors.background.white,
              padding: '16px',
              borderRadius: '8px',
              fontSize: fontSize.sm,
              textAlign: 'center'
            }}>
              사이드바
              <br />
              <span style={{ fontSize: fontSize.xs }}>({layout.sidebarWidth})</span>
            </div>
            <div style={{
              flex: 1,
              backgroundColor: colors.gray[50],
              padding: '16px',
              borderRadius: '8px',
              fontSize: fontSize.sm,
              border: semanticBorders.default
            }}>
              메인 콘텐츠 영역
            </div>
          </div>
        )
      },
      headerHeight: {
        description: "헤더 높이 (상단 네비게이션)",
        example: (
          <div style={{
            height: layout.headerHeight,
            backgroundColor: colors.semantic.primary,
            color: colors.background.white,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            fontSize: fontSize.sm,
            maxWidth: '400px'
          }}>
            헤더 ({layout.headerHeight})
          </div>
        )
      },
      footerHeight: {
        description: "푸터 높이",
        example: (
          <div style={{
            height: layout.footerHeight,
            backgroundColor: colors.gray[700],
            color: colors.background.white,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            fontSize: fontSize.sm,
            maxWidth: '400px'
          }}>
            푸터 ({layout.footerHeight})
          </div>
        )
      },
      navigationHeight: {
        description: "네비게이션 바 높이",
        example: (
          <div style={{
            height: layout.navigationHeight,
            backgroundColor: colors.gray[100],
            border: semanticBorders.strong,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '6px',
            fontSize: fontSize.sm,
            maxWidth: '300px'
          }}>
            네비게이션 바 ({layout.navigationHeight})
          </div>
        )
      },
      minTouchTarget: {
        description: "최소 터치 타겟 크기 (접근성)",
        example: (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button style={{
              width: layout.minTouchTarget,
              height: layout.minTouchTarget,
              backgroundColor: colors.semantic.primary,
              color: colors.background.white,
              border: 'none',
              borderRadius: '8px',
              fontSize: fontSize.xs,
              cursor: 'pointer'
            }}>
              터치
            </button>
            <span style={{ fontSize: fontSize.xs, color: colors.gray[600] }}>
              {layout.minTouchTarget} 이상이 되어야 모바일에서 쉽게 누를 수 있습니다.
            </span>
          </div>
        )
      }
    };

    return (
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}>
          {Object.entries(layout).map(([key, value]) => {
            const example = layoutExamples[key as keyof typeof layoutExamples];
            return (
              <div
                key={key}
                style={{
                  padding: "16px",
                  backgroundColor: colors.gray[50],
                  borderRadius: "8px",
                  border: semanticBorders.default,
                }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: example ? "12px" : "0"
                }}>
                  <div style={{ flex: 1 }}>
                    <span
                      style={{
                        fontWeight: fontWeight.semibold,
                        fontSize: fontSize.sm,
                        color: colors.gray[900],
                        display: "block",
                        marginBottom: "4px"
                      }}>
                      {key}
                    </span>
                    {example && (
                      <span style={{
                        fontSize: fontSize.xs,
                        color: colors.gray[600]
                      }}>
                        {example.description}
                      </span>
                    )}
                  </div>
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: fontSize.xs,
                      color: colors.gray[600],
                      backgroundColor: colors.background.white,
                      padding: "4px 8px",
                      borderRadius: "4px",
                    }}>
                    {value}
                  </span>
                </div>
                {example && (
                  <div style={{
                    padding: "12px",
                    backgroundColor: colors.background.white,
                    borderRadius: "6px",
                    border: semanticBorders.default
                  }}>
                    {example.example}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `import { layout } from "../theme";

// 사용 예시
const containerStyles = {
  maxWidth: layout.containerMaxWidth,     // 1200px
  height: layout.headerHeight,            // 64px
  width: layout.sidebarWidth              // 240px
};`,
      },
    },
  },
};

export const GridSystem = {
  render: () => {
    return (
      <div>
        {/* Grid Values */}
        <div style={{ marginBottom: "32px" }}>
          <h4 style={{ fontSize: fontSize.md, fontWeight: fontWeight.semibold, marginBottom: "16px", color: colors.gray[800] }}>
            Grid Values
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {Object.entries(grid).map(([key, value]) => (
              <div
                key={key}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 12px",
                  backgroundColor: colors.gray[50],
                  borderRadius: "4px",
                  fontSize: fontSize.sm,
                }}>
                <span style={{ fontWeight: fontWeight.medium, color: colors.gray[900] }}>{key}</span>
                <span style={{ fontFamily: "monospace", color: colors.gray[600] }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 12 Column Grid Demo */}
        <div style={{ marginBottom: "32px" }}>
          <h4 style={{ fontSize: fontSize.md, fontWeight: fontWeight.semibold, marginBottom: "16px", color: colors.gray[800] }}>
            12-Column Grid System
          </h4>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${grid.columns}, 1fr)`,
              gap: grid.gutterWidth,
              padding: grid.marginWidth,
              backgroundColor: colors.gray[50],
              border: semanticBorders.default,
              borderRadius: "8px",
              marginBottom: "16px",
            }}>
            {Array.from({ length: grid.columns }, (_, i) => (
              <div
                key={i}
                style={{
                  height: "32px",
                  backgroundColor: colors.semantic.primary,
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: fontSize.xs,
                  color: colors.background.white,
                  fontWeight: fontWeight.medium,
                }}>
                {i + 1}
              </div>
            ))}
          </div>
          <p style={{ fontSize: fontSize.xs, color: colors.gray[600], margin: 0 }}>
            12열 그리드 시스템 (gutter: {grid.gutterWidth}, margin: {grid.marginWidth})
          </p>
        </div>

        {/* Grid Layout Examples */}
        <div style={{ marginBottom: "32px" }}>
          <h4 style={{ fontSize: fontSize.md, fontWeight: fontWeight.semibold, marginBottom: "16px", color: colors.gray[800] }}>
            Common Grid Layouts
          </h4>

          {/* 2 Column Layout */}
          <div style={{ marginBottom: "24px" }}>
            <h5 style={{ fontSize: fontSize.sm, fontWeight: fontWeight.medium, marginBottom: "8px", color: colors.gray[700] }}>
              2-Column Layout (6+6)
            </h5>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: grid.gutterWidth,
                padding: grid.marginWidth,
                backgroundColor: colors.gray[50],
                border: semanticBorders.default,
                borderRadius: "6px",
              }}>
              <div style={{
                padding: "16px",
                backgroundColor: colors.semantic.primary,
                color: colors.background.white,
                borderRadius: "4px",
                textAlign: "center",
                fontSize: fontSize.sm
              }}>
                좌측 컴나 (6/12)
              </div>
              <div style={{
                padding: "16px",
                backgroundColor: colors.semantic.success,
                color: colors.background.white,
                borderRadius: "4px",
                textAlign: "center",
                fontSize: fontSize.sm
              }}>
                우측 컴나 (6/12)
              </div>
            </div>
          </div>

          {/* 3 Column Layout */}
          <div style={{ marginBottom: "24px" }}>
            <h5 style={{ fontSize: fontSize.sm, fontWeight: fontWeight.medium, marginBottom: "8px", color: colors.gray[700] }}>
              3-Column Layout (4+4+4)
            </h5>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: grid.gutterWidth,
                padding: grid.marginWidth,
                backgroundColor: colors.gray[50],
                border: semanticBorders.default,
                borderRadius: "6px",
              }}>
              {[
                { bg: colors.semantic.primary, text: '커리어 (4/12)' },
                { bg: colors.semantic.success, text: '코리아 (4/12)' },
                { bg: colors.semantic.warning, text: '점수 (4/12)' }
              ].map((item, i) => (
                <div key={i} style={{
                  padding: "16px",
                  backgroundColor: item.bg,
                  color: colors.background.white,
                  borderRadius: "4px",
                  textAlign: "center",
                  fontSize: fontSize.sm
                }}>
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar + Main Layout */}
          <div style={{ marginBottom: "24px" }}>
            <h5 style={{ fontSize: fontSize.sm, fontWeight: fontWeight.medium, marginBottom: "8px", color: colors.gray[700] }}>
              Sidebar + Main Layout (3+9)
            </h5>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 3fr",
                gap: grid.gutterWidth,
                padding: grid.marginWidth,
                backgroundColor: colors.gray[50],
                border: semanticBorders.default,
                borderRadius: "6px",
              }}>
              <div style={{
                padding: "16px",
                backgroundColor: colors.gray[600],
                color: colors.background.white,
                borderRadius: "4px",
                fontSize: fontSize.sm,
                minHeight: "80px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                사이드바<br />(3/12)
              </div>
              <div style={{
                padding: "16px",
                backgroundColor: colors.background.white,
                border: semanticBorders.strong,
                borderRadius: "4px",
                fontSize: fontSize.sm,
                minHeight: "80px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                메인 콘텐츠 영역 (9/12)
              </div>
            </div>
          </div>

          {/* Responsive Gutters Example */}
          <div style={{ marginBottom: "24px" }}>
            <h5 style={{ fontSize: fontSize.sm, fontWeight: fontWeight.medium, marginBottom: "8px", color: colors.gray[700] }}>
              반응형 Gutter 예시
            </h5>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { label: '모바일', gutter: grid.gutterMobile, bg: colors.semantic.info },
                { label: '태블릿', gutter: grid.gutterTablet, bg: colors.semantic.success },
                { label: '데스크톱', gutter: grid.gutterDesktop, bg: colors.semantic.primary }
              ].map((item, i) => (
                <div key={i} style={{
                  padding: "12px",
                  backgroundColor: colors.gray[50],
                  border: semanticBorders.default,
                  borderRadius: "6px"
                }}>
                  <div style={{
                    fontSize: fontSize.xs,
                    fontWeight: fontWeight.medium,
                    marginBottom: "8px",
                    color: colors.gray[700]
                  }}>
                    {item.label} (gutter: {item.gutter})
                  </div>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: item.gutter,
                    maxWidth: "300px"
                  }}>
                    {[1, 2, 3].map(num => (
                      <div key={num} style={{
                        height: "24px",
                        backgroundColor: item.bg,
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: fontSize.xs,
                        color: colors.background.white
                      }}>
                        {num}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `import { grid } from "../theme";

// 사용 예시
const gridStyles = {
  display: "grid",
  gridTemplateColumns: \`repeat(\${grid.columns}, 1fr)\`,  // 12 columns
  gap: grid.gutterWidth,                                    // 16px
  padding: grid.marginWidth                                 // 16px
};`,
      },
    },
  },
};

export const SpacingInAction = {
  render: () => {
    const [activeDemo, setActiveDemo] = React.useState("card");

    const demos = {
      card: {
        title: "Card Component Spacing",
        component: (
          <div
            style={{
              backgroundColor: colors.background.white,
              border: componentBorders.card.default,
              borderRadius: "8px",
              padding: semanticSpacing.cardPadding,
              maxWidth: "400px",
            }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: semanticSpacing.cardGap,
              }}>
              <h3
                style={{
                  margin: 0,
                  fontSize: fontSize.lg,
                  fontWeight: fontWeight.semibold,
                  color: colors.gray[900],
                }}>
                Card Title
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: fontSize.sm,
                  color: colors.gray[600],
                  lineHeight: "1.5",
                }}>
                This card demonstrates the use of semantic spacing values for
                consistent layout.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: semanticSpacing.gapSmall,
                  marginTop: spacing.xs,
                }}>
                <button
                  style={{
                    padding: semanticSpacing.buttonPaddingSmall,
                    border: componentBorders.card.hover,
                    backgroundColor: colors.semantic.primary,
                    color: colors.background.white,
                    borderRadius: "4px",
                    fontSize: fontSize.sm,
                    cursor: "pointer",
                  }}>
                  Primary
                </button>
                <button
                  style={{
                    padding: semanticSpacing.buttonPaddingSmall,
                    border: componentBorders.card.default,
                    backgroundColor: colors.background.white,
                    color: colors.semantic.text,
                    borderRadius: "4px",
                    fontSize: fontSize.sm,
                    cursor: "pointer",
                  }}>
                  Secondary
                </button>
              </div>
            </div>
          </div>
        ),
      },
      form: {
        title: "Form Spacing",
        component: (
          <div
            style={{
              backgroundColor: colors.background.white,
              border: componentBorders.card.default,
              borderRadius: "8px",
              padding: semanticSpacing.componentPaddingLarge,
              maxWidth: "400px",
            }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: semanticSpacing.formFieldGap,
              }}>
              <h3
                style={{
                  margin: 0,
                  fontSize: fontSize.lg,
                  fontWeight: fontWeight.semibold,
                  color: colors.gray[900],
                  marginBottom: spacing.xs,
                }}>
                Contact Form
              </h3>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: fontSize.sm,
                    fontWeight: fontWeight.medium,
                    color: colors.gray[700],
                    marginBottom: spacing.xxs,
                  }}>
                  Name
                </label>
                <input
                  style={{
                    width: "100%",
                    padding: semanticSpacing.componentPaddingSmall,
                    border: componentBorders.card.default,
                    borderRadius: "4px",
                    fontSize: fontSize.sm,
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: fontSize.sm,
                    fontWeight: fontWeight.medium,
                    color: colors.gray[700],
                    marginBottom: spacing.xxs,
                  }}>
                  Email
                </label>
                <input
                  style={{
                    width: "100%",
                    padding: semanticSpacing.componentPaddingSmall,
                    border: componentBorders.card.default,
                    borderRadius: "4px",
                    fontSize: fontSize.sm,
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <button
                style={{
                  padding: semanticSpacing.buttonPaddingMedium,
                  border: "none",
                  backgroundColor: colors.semantic.primary,
                  color: colors.background.white,
                  borderRadius: "4px",
                  fontSize: fontSize.sm,
                  fontWeight: fontWeight.medium,
                  cursor: "pointer",
                  marginTop: spacing.xs,
                }}>
                Submit
              </button>
            </div>
          </div>
        ),
      },
      list: {
        title: "List Spacing",
        component: (
          <div
            style={{
              backgroundColor: colors.background.white,
              border: componentBorders.card.default,
              borderRadius: "8px",
              padding: semanticSpacing.componentPaddingMedium,
              maxWidth: "400px",
            }}>
            <h3
              style={{
                margin: 0,
                fontSize: fontSize.lg,
                fontWeight: fontWeight.semibold,
                color: colors.gray[900],
                marginBottom: spacing.md,
              }}>
              Navigation Menu
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: semanticSpacing.gapSmall,
              }}>
              {["Dashboard", "Projects", "Team", "Settings"].map((item) => (
                <div
                  key={item}
                  style={{
                    padding: `${spacing.xs} ${spacing.sm}`,
                    borderRadius: "4px",
                    backgroundColor: colors.gray[50],
                    fontSize: fontSize.sm,
                    color: colors.gray[700],
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                  }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        ),
      },
    };

    return (
      <div>
        <div
          style={{
            display: "flex",
            gap: semanticSpacing.gapSmall,
            marginBottom: spacing.xl,
          }}>
          {Object.entries(demos).map(([key, demo]) => (
            <button
              key={key}
              onClick={() => setActiveDemo(key)}
              style={{
                padding: semanticSpacing.buttonPaddingSmall,
                border:
                  activeDemo === key
                    ? semanticBorders.focus
                    : componentBorders.button.outline,
                backgroundColor:
                  activeDemo === key
                    ? colors.semantic.primary
                    : colors.background.white,
                color:
                  activeDemo === key
                    ? colors.background.white
                    : colors.semantic.text,
                borderRadius: borderRadius.sm,
                fontSize: fontSize.sm,
                cursor: "pointer",
                transition: "all 0.2s",
              }}>
              {demo.title}
            </button>
          ))}
        </div>

        <div>{demos[activeDemo as keyof typeof demos].component}</div>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `import { spacing, semanticSpacing } from "../theme";

// Card 컴포넌트 예시
<div style={{
  padding: semanticSpacing.cardPadding,
  gap: semanticSpacing.cardGap
}}>
  {/* Card 내용 */}
</div>

// Form 컴포넌트 예시
<form style={{
  gap: semanticSpacing.formFieldGap
}}>
  {/* Form 필드들 */}
</form>

// 버튼 패딩 예시
<button style={{
  padding: semanticSpacing.buttonPaddingMedium
}}>
  Button
</button>`,
      },
    },
  },
};
