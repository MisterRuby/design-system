import React from "react";
import { shadows, semanticShadows, colors, fontSize, fontWeight } from "../theme";

export default {
  title: "Styles/Shadows",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "프로젝트에서 사용하는 그림자 시스템입니다. 컴포넌트의 높이감과 시각적 계층 구조를 표현하기 위해 정의된 shadow 값들을 사용해주세요.",
      },
    },
  },
};

const ShadowDemo = ({
  shadowValues,
  type = "basic"
}: {
  shadowValues: Record<string, string>;
  type?: "basic" | "semantic";
}) => (
  <div style={{ marginBottom: "48px" }}>
    <div style={{
      display: "grid",
      gridTemplateColumns: type === "basic" ? "repeat(auto-fit, minmax(200px, 1fr))" : "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "24px",
      marginBottom: "16px"
    }}>
      {Object.entries(shadowValues).map(([key, value]) => (
        <div key={key} style={{ textAlign: "center" }}>
          <div
            style={{
              width: "100%",
              height: "120px",
              backgroundColor: colors.background.white,
              borderRadius: "8px",
              boxShadow: value,
              marginBottom: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: value === 'none' ? `1px solid ${colors.gray[200]}` : 'none',
              fontSize: fontSize.sm,
              color: colors.gray[600]
            }}>
            {key}
          </div>
          <div style={{ fontSize: fontSize.xs, fontWeight: fontWeight.semibold, marginBottom: "4px", color: colors.gray[700] }}>
            {key}
          </div>
          <div style={{
            fontSize: fontSize.xs,
            color: colors.gray[500],
            fontFamily: "monospace",
            wordBreak: "break-all",
            lineHeight: 1.3
          }}>
            {value.length > 50 ? `${value.substring(0, 50)}...` : value}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const ElevationLevels = {
  render: () => (
    <div>
      <ShadowDemo
        shadowValues={{
          none: shadows.none,
          xs: shadows.xs,
          sm: shadows.sm,
          md: shadows.md,
          lg: shadows.lg,
          xl: shadows.xl,
          "2xl": shadows['2xl']
        }}
        type="basic"
      />

      <div style={{
        padding: '16px',
        backgroundColor: colors.info[50],
        border: `1px solid ${colors.info[200]}`,
        borderRadius: '8px',
        marginBottom: '24px'
      }}>
        <h4 style={{ margin: '0 0 8px', fontSize: fontSize.sm, fontWeight: fontWeight.semibold, color: colors.info[700] }}>
          사용 가이드
        </h4>
        <ul style={{ margin: 0, paddingLeft: '16px', fontSize: fontSize.xs, color: colors.info[700] }}>
          <li><strong>none</strong>: 평면적인 요소</li>
          <li><strong>xs</strong>: 매우 미묘한 구분 (테이블 행, 구분선)</li>
          <li><strong>sm</strong>: 카드, 버튼 기본 상태</li>
          <li><strong>md</strong>: 호버 상태, 약간 떠있는 요소</li>
          <li><strong>lg</strong>: 드롭다운, 팝오버</li>
          <li><strong>xl</strong>: 모달, 다이얼로그</li>
          <li><strong>2xl</strong>: 최고 레벨 (전면 모달, 오버레이)</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { shadows } from "../theme";

// 1. 기본 카드 스타일링
const Card = ({ children, elevated = false }: { children: React.ReactNode; elevated?: boolean }) => (
  <div style={{
    padding: '16px',
    backgroundColor: colors.background.white,
    borderRadius: '8px',
    boxShadow: elevated ? shadows.md : shadows.sm,
    transition: 'box-shadow 0.2s ease',
    ':hover': {
      boxShadow: shadows.lg
    }
  }}>
    {children}
  </div>
);

// 2. 버튼 상태별 그림자
const Button = ({ children, variant = "primary" }: { children: React.ReactNode; variant?: string }) => (
  <button style={{
    padding: '12px 24px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: colors.semantic.primary,
    color: colors.background.white,
    boxShadow: shadows.sm,
    transition: 'all 0.2s ease',
    ':hover': {
      boxShadow: shadows.md,
      transform: 'translateY(-1px)'
    },
    ':active': {
      boxShadow: shadows.xs,
      transform: 'translateY(0)'
    }
  }}>
    {children}
  </button>
);

// 3. 모달 스타일링
const Modal = ({ children, isOpen }: { children: React.ReactNode; isOpen: boolean }) => (
  isOpen && (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: colors.background.white,
        borderRadius: '12px',
        padding: '24px',
        maxWidth: '500px',
        width: '90%',
        boxShadow: shadows['2xl']
      }}>
        {children}
      </div>
    </div>
  )
);`,
      },
    },
  },
};

export const ColoredShadows = {
  render: () => (
    <div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "24px",
        marginBottom: "24px"
      }}>
        {[
          { name: 'primary', shadow: shadows.primary, color: colors.semantic.primary },
          { name: 'success', shadow: shadows.success, color: colors.semantic.success },
          { name: 'error', shadow: shadows.error, color: colors.semantic.error },
          { name: 'warning', shadow: shadows.warning, color: colors.semantic.warning },
        ].map(({ name, shadow, color }) => (
          <div key={name} style={{ textAlign: "center" }}>
            <div
              style={{
                width: "100%",
                height: "80px",
                backgroundColor: colors.background.white,
                borderRadius: "8px",
                boxShadow: shadow,
                marginBottom: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: color,
                fontSize: fontSize.sm,
                fontWeight: fontWeight.semibold,
                border: `2px solid ${color}`
              }}>
              {name.toUpperCase()}
            </div>
            <div style={{ fontSize: fontSize.xs, color: colors.gray[600] }}>
              브랜드 {name} 그림자
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `// 브랜드 컬러 그림자 사용 예시
const PrimaryButton = ({ children }: { children: React.ReactNode }) => (
  <button style={{
    backgroundColor: colors.semantic.primary,
    color: colors.background.white,
    padding: '12px 24px',
    borderRadius: '6px',
    border: 'none',
    boxShadow: shadows.primary, // 브랜드 그림자
    transition: 'all 0.2s ease'
  }}>
    {children}
  </button>
);

// 상태별 컬러 그림자
const StatusCard = ({ status, children }: { status: string; children: React.ReactNode }) => {
  const statusStyles = {
    success: { bg: colors.semantic.success, shadow: shadows.success },
    error: { bg: colors.semantic.error, shadow: shadows.error },
    warning: { bg: colors.semantic.warning, shadow: shadows.warning }
  };

  const style = statusStyles[status];

  return (
    <div style={{
      padding: '16px',
      backgroundColor: style.bg,
      color: colors.background.white,
      borderRadius: '8px',
      boxShadow: style.shadow
    }}>
      {children}
    </div>
  );
};`,
      },
    },
  },
};

export const SemanticShadows = {
  render: () => {
    const shadowExamples = {
      // Card shadows (3개)
      cardResting: {
        description: "카드 기본 상태",
        example: (
          <div style={{
            padding: '16px',
            backgroundColor: colors.background.white,
            borderRadius: '8px',
            boxShadow: semanticShadows.cardResting,
            fontSize: fontSize.sm
          }}>
            기본 카드
          </div>
        )
      },
      cardHover: {
        description: "카드 호버 상태",
        example: (
          <div style={{
            padding: '16px',
            backgroundColor: colors.background.white,
            borderRadius: '8px',
            boxShadow: semanticShadows.cardHover,
            fontSize: fontSize.sm
          }}>
            호버된 카드
          </div>
        )
      },
      cardPressed: {
        description: "카드 눌림 상태",
        example: (
          <div style={{
            padding: '16px',
            backgroundColor: colors.background.white,
            borderRadius: '8px',
            boxShadow: semanticShadows.cardPressed,
            fontSize: fontSize.sm
          }}>
            눌린 카드
          </div>
        )
      },

      // Button shadows (7개)
      buttonResting: {
        description: "버튼 기본 상태",
        example: (
          <button style={{
            padding: '10px 20px',
            backgroundColor: colors.gray[100],
            color: colors.gray[700],
            border: 'none',
            borderRadius: '6px',
            boxShadow: semanticShadows.buttonResting,
            fontSize: fontSize.sm,
            cursor: 'pointer'
          }}>
            기본 버튼
          </button>
        )
      },
      buttonHover: {
        description: "버튼 호버 상태",
        example: (
          <button style={{
            padding: '10px 20px',
            backgroundColor: colors.gray[200],
            color: colors.gray[800],
            border: 'none',
            borderRadius: '6px',
            boxShadow: semanticShadows.buttonHover,
            fontSize: fontSize.sm,
            cursor: 'pointer'
          }}>
            호버 버튼
          </button>
        )
      },
      buttonPressed: {
        description: "버튼 눌림 상태",
        example: (
          <button style={{
            padding: '10px 20px',
            backgroundColor: colors.gray[300],
            color: colors.gray[800],
            border: 'none',
            borderRadius: '6px',
            boxShadow: semanticShadows.buttonPressed,
            fontSize: fontSize.sm,
            cursor: 'pointer'
          }}>
            눌린 버튼
          </button>
        )
      },
      buttonPrimary: {
        description: "Primary 버튼 그림자",
        example: (
          <button style={{
            padding: '10px 20px',
            backgroundColor: colors.semantic.primary,
            color: colors.background.white,
            border: 'none',
            borderRadius: '6px',
            boxShadow: semanticShadows.buttonPrimary,
            fontSize: fontSize.sm,
            cursor: 'pointer'
          }}>
            Primary 버튼
          </button>
        )
      },
      buttonSuccess: {
        description: "Success 버튼 그림자",
        example: (
          <button style={{
            padding: '10px 20px',
            backgroundColor: colors.semantic.success,
            color: colors.background.white,
            border: 'none',
            borderRadius: '6px',
            boxShadow: semanticShadows.buttonSuccess,
            fontSize: fontSize.sm,
            cursor: 'pointer'
          }}>
            Success 버튼
          </button>
        )
      },
      buttonError: {
        description: "Error 버튼 그림자",
        example: (
          <button style={{
            padding: '10px 20px',
            backgroundColor: colors.semantic.error,
            color: colors.background.white,
            border: 'none',
            borderRadius: '6px',
            boxShadow: semanticShadows.buttonError,
            fontSize: fontSize.sm,
            cursor: 'pointer'
          }}>
            Error 버튼
          </button>
        )
      },
      buttonWarning: {
        description: "Warning 버튼 그림자",
        example: (
          <button style={{
            padding: '10px 20px',
            backgroundColor: colors.semantic.warning,
            color: colors.background.white,
            border: 'none',
            borderRadius: '6px',
            boxShadow: semanticShadows.buttonWarning,
            fontSize: fontSize.sm,
            cursor: 'pointer'
          }}>
            Warning 버튼
          </button>
        )
      },

      // Modal shadows (2개)
      modalBackdrop: {
        description: "모달 배경",
        example: (
          <div style={{
            padding: '20px',
            backgroundColor: colors.gray[900],
            borderRadius: '12px',
            boxShadow: semanticShadows.modalBackdrop,
            fontSize: fontSize.sm,
            color: colors.background.white,
            opacity: 0.95
          }}>
            모달 배경
          </div>
        )
      },
      modalContent: {
        description: "모달 콘텐츠",
        example: (
          <div style={{
            padding: '20px',
            backgroundColor: colors.background.white,
            borderRadius: '12px',
            boxShadow: semanticShadows.modalContent,
            fontSize: fontSize.sm,
            maxWidth: '200px'
          }}>
            모달 내용
          </div>
        )
      },

      // Dropdown shadows (3개)
      dropdown: {
        description: "드롭다운 메뉴",
        example: (
          <div style={{
            padding: '8px 0',
            backgroundColor: colors.background.white,
            border: `1px solid ${colors.gray[200]}`,
            borderRadius: '6px',
            boxShadow: semanticShadows.dropdown,
            fontSize: fontSize.sm,
            minWidth: '150px'
          }}>
            <div style={{ padding: '8px 12px', cursor: 'pointer' }}>메뉴 항목 1</div>
            <div style={{ padding: '8px 12px', cursor: 'pointer' }}>메뉴 항목 2</div>
            <div style={{ padding: '8px 12px', cursor: 'pointer' }}>메뉴 항목 3</div>
          </div>
        )
      },
      popover: {
        description: "팝오버",
        example: (
          <div style={{
            padding: '12px 16px',
            backgroundColor: colors.background.white,
            border: `1px solid ${colors.gray[200]}`,
            borderRadius: '8px',
            boxShadow: semanticShadows.popover,
            fontSize: fontSize.sm,
            maxWidth: '200px'
          }}>
            팝오버 내용입니다
          </div>
        )
      },
      tooltip: {
        description: "툴팁",
        example: (
          <div style={{
            padding: '6px 10px',
            backgroundColor: colors.gray[800],
            color: colors.background.white,
            borderRadius: '4px',
            boxShadow: semanticShadows.tooltip,
            fontSize: fontSize.xs,
            whiteSpace: 'nowrap'
          }}>
            툴팁 메시지
          </div>
        )
      },

      // Form element shadows (3개)
      inputFocus: {
        description: "입력 필드 포커스",
        example: (
          <input
            placeholder="포커스된 입력 필드"
            style={{
              padding: '8px 12px',
              border: `1px solid ${colors.semantic.primary}`,
              borderRadius: '4px',
              boxShadow: semanticShadows.inputFocus,
              fontSize: fontSize.sm,
              outline: 'none',
              width: '180px'
            }}
          />
        )
      },
      inputError: {
        description: "입력 필드 에러",
        example: (
          <input
            placeholder="에러 상태 입력 필드"
            style={{
              padding: '8px 12px',
              border: `1px solid ${colors.semantic.error}`,
              borderRadius: '4px',
              boxShadow: semanticShadows.inputError,
              fontSize: fontSize.sm,
              outline: 'none',
              width: '180px'
            }}
          />
        )
      },
      inputSuccess: {
        description: "입력 필드 성공",
        example: (
          <input
            placeholder="성공 상태 입력 필드"
            style={{
              padding: '8px 12px',
              border: `1px solid ${colors.semantic.success}`,
              borderRadius: '4px',
              boxShadow: semanticShadows.inputSuccess,
              fontSize: fontSize.sm,
              outline: 'none',
              width: '180px'
            }}
          />
        )
      },

      // Navigation shadows (2개)
      header: {
        description: "헤더/네비게이션",
        example: (
          <div style={{
            padding: '12px 16px',
            backgroundColor: colors.background.white,
            borderRadius: '6px',
            boxShadow: semanticShadows.header,
            fontSize: fontSize.sm,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minWidth: '200px'
          }}>
            <span style={{ fontWeight: fontWeight.semibold }}>로고</span>
            <span>메뉴</span>
          </div>
        )
      },
      sidebar: {
        description: "사이드바",
        example: (
          <div style={{
            padding: '16px 12px',
            backgroundColor: colors.background.white,
            borderRadius: '6px',
            boxShadow: semanticShadows.sidebar,
            fontSize: fontSize.sm,
            minWidth: '120px'
          }}>
            <div style={{ marginBottom: '8px', fontWeight: fontWeight.medium }}>사이드바</div>
            <div style={{ fontSize: fontSize.xs, color: colors.gray[600] }}>메뉴 항목들</div>
          </div>
        )
      },

      // Loading states (2개)
      skeleton: {
        description: "스켈레톤 로더",
        example: (
          <div style={{
            height: '16px',
            backgroundColor: colors.gray[200],
            borderRadius: '4px',
            boxShadow: semanticShadows.skeleton,
            width: '150px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(90deg, transparent, ${colors.gray[100]}, transparent)`,
              animation: 'shimmer 1.5s ease-in-out infinite'
            }} />
          </div>
        )
      },
      loadingShimmer: {
        description: "로딩 시머",
        example: (
          <div style={{
            padding: '12px',
            backgroundColor: colors.gray[100],
            borderRadius: '6px',
            boxShadow: semanticShadows.loadingShimmer,
            fontSize: fontSize.sm,
            color: colors.gray[500],
            textAlign: 'center'
          }}>
            로딩 중...
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
          {Object.entries(semanticShadows).map(([key, value]) => {
            const example = shadowExamples[key as keyof typeof shadowExamples];
            return (
              <div
                key={key}
                style={{
                  padding: "16px",
                  backgroundColor: colors.gray[50],
                  borderRadius: "8px",
                  border: `1px solid ${colors.gray[200]}`,
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
                      maxWidth: "200px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                    }}>
                    {value.length > 30 ? `${value.substring(0, 30)}...` : value}
                  </span>
                </div>
                {example && (
                  <div style={{
                    padding: "16px",
                    backgroundColor: colors.gray[100],
                    borderRadius: "6px",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '60px'
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
        code: `import { semanticShadows } from "../theme";

// 1. 인터랙티브 카드 컴포넌트
const InteractiveCard = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div
      style={{
        padding: '16px',
        backgroundColor: colors.background.white,
        borderRadius: '8px',
        boxShadow: isPressed
          ? semanticShadows.cardPressed
          : isHovered
            ? semanticShadows.cardHover
            : semanticShadows.cardResting,
        transition: 'all 0.2s ease',
        cursor: onClick ? 'pointer' : 'default',
        transform: isPressed ? 'translateY(1px)' : isHovered ? 'translateY(-1px)' : 'translateY(0)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// 2. 폼 입력 필드 컴포넌트
const FormInput = ({ label, error, ...props }: { label: string; error?: boolean; [key: string]: any }) => (
  <div>
    <label style={{ display: 'block', marginBottom: '4px' }}>{label}</label>
    <input
      style={{
        width: '100%',
        padding: '8px 12px',
        border: error ? '1px solid #dc2626' : '1px solid #d1d5db',
        borderRadius: '4px',
        boxShadow: error
          ? semanticShadows.inputError
          : 'none',
        ':focus': {
          boxShadow: error
            ? semanticShadows.inputError
            : semanticShadows.inputFocus,
          outline: 'none'
        }
      }}
      {...props}
    />
  </div>
);

// 3. 모달 컴포넌트
const Modal = ({ isOpen, children, onClose }: { isOpen: boolean; children: React.ReactNode; onClose: () => void }) => (
  isOpen && (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: colors.background.white,
        borderRadius: '12px',
        padding: '24px',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: semanticShadows.modalContent
      }}>
        {children}
      </div>
    </div>
  )
);`,
      },
    },
  },
};

export const ShadowInteractions = {
  render: () => {
    const [hoveredCard, setHoveredCard] = React.useState<string | null>(null);
    const [pressedButton, setPressedButton] = React.useState<string | null>(null);

    return (
      <div>
        {/* Interactive Cards */}
        <div style={{ marginBottom: '32px' }}>
          <h4 style={{ fontSize: fontSize.md, fontWeight: fontWeight.semibold, marginBottom: '16px', color: colors.gray[800] }}>
            인터랙티브 카드 (호버해보세요)
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {['card1', 'card2', 'card3'].map((cardId) => (
              <div
                key={cardId}
                style={{
                  padding: '16px',
                  backgroundColor: colors.background.white,
                  borderRadius: '8px',
                  boxShadow: hoveredCard === cardId ? semanticShadows.cardHover : semanticShadows.cardResting,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: hoveredCard === cardId ? 'translateY(-4px)' : 'translateY(0)',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
                onMouseEnter={() => setHoveredCard(cardId)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={{ fontSize: fontSize.sm, color: colors.gray[600] }}>
                  인터랙티브 카드 {cardId.slice(-1)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Buttons */}
        <div style={{ marginBottom: '32px' }}>
          <h4 style={{ fontSize: fontSize.md, fontWeight: fontWeight.semibold, marginBottom: '16px', color: colors.gray[800] }}>
            인터랙티브 버튼 (클릭해보세요)
          </h4>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {[
              { id: 'primary', bg: colors.semantic.primary, shadow: semanticShadows.buttonPrimary },
              { id: 'success', bg: colors.semantic.success, shadow: semanticShadows.buttonSuccess },
              { id: 'error', bg: colors.semantic.error, shadow: semanticShadows.buttonError },
            ].map(({ id, bg, shadow }) => (
              <button
                key={id}
                style={{
                  padding: '10px 20px',
                  backgroundColor: bg,
                  color: colors.background.white,
                  border: 'none',
                  borderRadius: '6px',
                  boxShadow: pressedButton === id ? semanticShadows.buttonPressed : shadow,
                  transition: 'all 0.2s ease',
                  transform: pressedButton === id ? 'translateY(1px)' : 'translateY(0)',
                  fontSize: fontSize.sm,
                  fontWeight: fontWeight.medium,
                  cursor: 'pointer'
                }}
                onMouseDown={() => setPressedButton(id)}
                onMouseUp={() => setPressedButton(null)}
                onMouseLeave={() => setPressedButton(null)}
              >
                {id} Button
              </button>
            ))}
          </div>
        </div>

        {/* Elevation Comparison */}
        <div>
          <h4 style={{ fontSize: fontSize.md, fontWeight: fontWeight.semibold, marginBottom: '16px', color: colors.gray[800] }}>
            높이감 비교 (Elevation Comparison)
          </h4>
          <div style={{
            display: 'flex',
            alignItems: 'end',
            gap: '16px',
            padding: '40px 20px',
            backgroundColor: colors.gray[100],
            borderRadius: '8px'
          }}>
            {[
              { name: 'Ground', height: '40px', shadow: shadows.none, bg: colors.gray[200] },
              { name: 'Low', height: '50px', shadow: shadows.sm, bg: colors.background.white },
              { name: 'Medium', height: '60px', shadow: shadows.md, bg: colors.background.white },
              { name: 'High', height: '70px', shadow: shadows.lg, bg: colors.background.white },
              { name: 'Highest', height: '80px', shadow: shadows.xl, bg: colors.background.white },
            ].map(({ name, height, shadow, bg }) => (
              <div key={name} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '80px',
                    height: height,
                    backgroundColor: bg,
                    borderRadius: '8px',
                    boxShadow: shadow,
                    border: shadow === shadows.none ? `1px solid ${colors.gray[300]}` : 'none',
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: fontSize.xs,
                    color: colors.gray[600]
                  }}>
                  {name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `// 인터랙티브 그림자 효과 구현 예시
const InteractiveCard = ({ children }: { children: React.ReactNode }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div
      style={{
        padding: '16px',
        backgroundColor: colors.background.white,
        borderRadius: '8px',

        // 상태별 그림자 적용
        boxShadow: isPressed
          ? semanticShadows.cardPressed
          : isHovered
            ? semanticShadows.cardHover
            : semanticShadows.cardResting,

        // 부드러운 전환 효과
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

        // Y축 이동으로 높이감 강화
        transform: isPressed
          ? 'translateY(1px)'
          : isHovered
            ? 'translateY(-4px)'
            : 'translateY(0)',

        cursor: 'pointer'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      {children}
    </div>
  );
};

// 높이감 시스템 활용 예시
const ComponentHierarchy = () => (
  <div>
    {/* Background layer */}
    <div style={{ boxShadow: shadows.none }}>Background</div>

    {/* Card layer */}
    <div style={{ boxShadow: shadows.sm }}>Cards</div>

    {/* Raised elements */}
    <div style={{ boxShadow: shadows.md }}>Buttons, Raised cards</div>

    {/* Floating elements */}
    <div style={{ boxShadow: shadows.lg }}>Dropdowns, Tooltips</div>

    {/* Modal layer */}
    <div style={{ boxShadow: shadows.xl }}>Modals, Dialogs</div>

    {/* Overlay layer */}
    <div style={{ boxShadow: shadows['2xl'] }}>Full-screen overlays</div>
  </div>
);`,
      },
    },
  },
};
