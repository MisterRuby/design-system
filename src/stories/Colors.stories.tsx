import React from "react";
import { colors, fontSize, fontWeight } from "../theme";

export default {
  title: "Style Guide/Colors",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "프로젝트에서 사용하는 색상 시스템입니다. 일관된 디자인을 위해 정의된 색상을 사용해주세요.",
      },
    },
  },
  tags: ["autodocs"],
};

const ColorSwatch = ({ color, name, description }: { color: string; name: string; description?: string }) => (
  <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
    <div
      style={{
        width: "48px",
        height: "48px",
        backgroundColor: color,
        borderRadius: "8px",
        marginRight: "16px",
        border: `1px solid ${colors.gray[200]}`,
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      }}
    />
    <div>
      <div style={{ fontWeight: fontWeight.semibold, fontSize: fontSize.sm, color: colors.semantic.text }}>{name}</div>
      <div style={{ fontSize: fontSize.xs, color: colors.gray[500], fontFamily: "monospace" }}>{color}</div>
      {description && (
        <div style={{ fontSize: fontSize.xs, color: colors.semantic.muted, marginTop: "2px" }}>{description}</div>
      )}
    </div>
  </div>
);

const ColorPalette = ({ title, colors: colorSet, descriptions }: {
  title: string;
  colors: Record<string, string>;
  descriptions?: Record<string, string>;
}) => (
  <div style={{ marginBottom: "32px" }}>
    <h3 style={{ fontSize: fontSize.lg, fontWeight: fontWeight.semibold, marginBottom: "16px", color: colors.gray[900] }}>
      {title}
    </h3>
    <div>
      {Object.entries(colorSet).map(([key, value]) => {
        // 중첩된 객체는 건너뛰기
        if (typeof value === 'object') return null;
        return (
          <ColorSwatch
            key={key}
            color={value}
            name={key}
            description={descriptions?.[key]}
          />
        );
      })}
    </div>
  </div>
);

export const SemanticColors = {
  render: () => (
    <ColorPalette
      title="Semantic Colors"
      colors={colors.semantic}
      descriptions={{
        primary: "브랜드 주색상 - 주요 액션, 링크",
        secondary: "보조색상 - 부가적인 요소",
        success: "성공 상태 - 완료, 성공 메시지",
        error: "오류 상태 - 에러, 실패 메시지",
        warning: "경고 상태 - 주의, 경고 메시지",
        info: "정보 상태 - 안내, 정보 메시지",
        muted: "비활성 상태 - 비활성화된 요소",
        text: "기본 텍스트 색상",
      }}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `import { colors } from "../theme";

// 사용 예시
<Text color="primary">Primary 색상</Text>
<Text color="success">Success 색상</Text>
<Button variant="error">Error 버튼</Button>`,
      },
    },
  },
};

export const GrayScale = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "16px" }}>
      {Object.entries(colors.gray).map(([shade, color]) => (
        <div key={shade} style={{ textAlign: "center" }}>
          <div
            style={{
              width: "100%",
              height: "80px",
              backgroundColor: color,
              borderRadius: "8px",
              marginBottom: "8px",
              border: `1px solid ${colors.gray[200]}`,
            }}
          />
          <div style={{ fontSize: fontSize.xs, fontWeight: fontWeight.semibold, color: colors.semantic.text }}>gray-{shade}</div>
          <div style={{ fontSize: fontSize.xs, color: colors.gray[500], fontFamily: "monospace" }}>{color}</div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { colors } from "../theme";

// 사용 예시
backgroundColor: colors.gray[100]
border: \`1px solid \${colors.gray[300]}\``,
      },
    },
  },
};

export const StatusColors = {
  render: () => (
    <div>
      <ColorPalette title="Success Colors" colors={colors.success} />
      <ColorPalette title="Error Colors" colors={colors.error} />
      <ColorPalette title="Warning Colors" colors={colors.warning} />
      <ColorPalette title="Info Colors" colors={colors.info} />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { colors } from "../theme";

// 사용 예시
backgroundColor: colors.success[50]  // 연한 배경
color: colors.success[700]          // 진한 텍스트
border: \`1px solid \${colors.error[300]}\``,
      },
    },
  },
};

export const BorderColors = {
  render: () => (
    <div>
      <ColorPalette
        title="Border Colors"
        colors={{
          default: colors.border.default,
          primary: colors.border.primary,
          secondary: colors.border.secondary,
          success: colors.border.success,
          error: colors.border.error,
        }}
        descriptions={{
          default: "기본 테두리 색상",
          primary: "Primary 상태 테두리",
          secondary: "Secondary 상태 테두리",
          success: "Success 상태 테두리",
          error: "Error 상태 테두리",
        }}
      />
      <ColorPalette
        title="Focus Border Colors"
        colors={colors.border.focus}
        descriptions={{
          primary: "Primary 포커스 테두리",
          secondary: "Secondary 포커스 테두리",
          success: "Success 포커스 테두리",
          error: "Error 포커스 테두리",
        }}
      />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { colors } from "../theme";

// 사용 예시
border: \`1px solid \${colors.border.default}\`
border: \`2px solid \${colors.border.primary}\`
border: \`2px solid \${colors.border.focus.primary}\` // 포커스 상태`,
      },
    },
  },
};

export const BackgroundColors = {
  render: () => (
    <ColorPalette
      title="Background Colors"
      colors={colors.background}
      descriptions={{
        white: "기본 배경색",
        gray: "중성 배경색",
        disabled: "비활성 요소 배경색",
      }}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `import { colors } from "../theme";

// 사용 예시
backgroundColor: colors.background.white
backgroundColor: colors.background.disabled`,
      },
    },
  },
};

export const FocusRingColors = {
  render: () => (
    <div>
      <ColorPalette
        title="Focus Ring Colors"
        colors={colors.focusRing}
        descriptions={{
          primary: "Primary 요소 포커스 링",
          secondary: "Secondary 요소 포커스 링",
          success: "Success 요소 포커스 링",
          error: "Error 요소 포커스 링",
          warning: "Warning 요소 포커스 링",
          info: "Info 요소 포커스 링",
        }}
      />
      <div style={{ marginTop: "24px", padding: "16px", backgroundColor: colors.gray[50], borderRadius: "8px" }}>
        <h4 style={{ fontSize: fontSize.sm, fontWeight: fontWeight.semibold, marginBottom: "12px", color: colors.semantic.text }}>
          Focus Ring 사용 예시
        </h4>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {Object.entries(colors.focusRing).map(([type, color]) => (
            <button
              key={type}
              style={{
                padding: "8px 16px",
                border: `2px solid ${colors.border[type as keyof typeof colors.border] || colors.border.default}`,
                borderRadius: "6px",
                backgroundColor: colors.background.white,
                color: colors.semantic[type as keyof typeof colors.semantic] || colors.semantic.text,
                fontSize: fontSize.sm,
                cursor: "pointer",
                outline: "none",
                boxShadow: `0 0 0 3px ${color}`,
              }}
            >
              {type} focus
            </button>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { colors } from "../theme";

// 사용 예시
&:focus {
  outline: none;
  box-shadow: 0 0 0 3px \${colors.focusRing.primary};
}`,
      },
    },
  },
};
