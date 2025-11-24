import React from "react";
import { colors, fontSize, fontWeight } from "../theme";

export default {
  title: "Style Guide/Colors",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "프로젝트에서 사용하는 색상 시스템입니다. 일관된 디자인을 위해 정의된 색상을 사용해주세요.",
      },
    },
  },
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

// 1. 기본 버튼 스타일링
const primaryButton = {
  backgroundColor: colors.semantic.primary,
  color: colors.background.white,
  border: \`1px solid \${colors.semantic.primary}\`,
  padding: "12px 24px",
  borderRadius: "6px",
  cursor: "pointer",
};

// 2. 상태별 알림 메시지
const alertStyles = {
  success: {
    backgroundColor: colors.success[50],
    borderLeft: \`4px solid \${colors.semantic.success}\`,
    color: colors.success[800],
    padding: "12px 16px",
  },
  error: {
    backgroundColor: colors.error[50],
    borderLeft: \`4px solid \${colors.semantic.error}\`,
    color: colors.error[800],
    padding: "12px 16px",
  },
  warning: {
    backgroundColor: colors.warning[50],
    borderLeft: \`4px solid \${colors.semantic.warning}\`,
    color: colors.warning[800],
    padding: "12px 16px",
  },
};

// 3. 텍스트 계층 구조
const textHierarchy = {
  title: { color: colors.semantic.text, fontWeight: 600 },
  body: { color: colors.gray[700] },
  caption: { color: colors.semantic.muted },
  link: { color: colors.semantic.primary },
};

// 4. 실제 컴포넌트 사용 예시
function AlertMessage({ type, children }) {
  return (
    <div style={alertStyles[type]}>
      {children}
    </div>
  );
}

// 사용법
<AlertMessage type="success">성공적으로 저장되었습니다!</AlertMessage>
<AlertMessage type="error">오류가 발생했습니다.</AlertMessage>`,
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

// 그레이 스케일 사용 예시
const cardStyle = {
  backgroundColor: colors.gray[50],    // 매우 밝은 배경
  border: \`1px solid \${colors.gray[200]}\`, // 연한 경계선
  borderRadius: "8px",
  padding: "16px",
};

const textStyles = {
  title: { color: colors.gray[900] },      // 진한 텍스트 (제목)
  body: { color: colors.gray[700] },       // 보통 텍스트 (본문)
  muted: { color: colors.gray[500] },      // 흐린 텍스트 (부가정보)
  disabled: { color: colors.gray[400] },   // 비활성 텍스트
};

// 구분선 및 경계선
const dividerStyle = {
  height: "1px",
  backgroundColor: colors.gray[300],  // 구분선
  margin: "16px 0",
};

// 입력 필드 스타일링
const inputStyle = {
  border: \`1px solid \${colors.gray[300]}\`,
  backgroundColor: colors.gray[50],
  ':focus': {
    borderColor: colors.gray[500],
    backgroundColor: colors.background.white,
  },
};`,
      },
    },
  },
};

export const StatusColors = {
  render: () => (
    <div>
      <h3 style={{ fontSize: fontSize.lg, fontWeight: fontWeight.semibold, marginBottom: "24px", color: colors.gray[900] }}>
        Status Colors
      </h3>

      {/* Success Colors Row */}
      <div style={{ marginBottom: "32px" }}>
        <h4 style={{ fontSize: fontSize.md, fontWeight: fontWeight.semibold, marginBottom: "16px", color: colors.gray[800] }}>
          Success Colors
        </h4>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "12px" }}>
          {Object.entries(colors.success).map(([shade, color]) => (
            <div key={shade} style={{ textAlign: "center" }}>
              <div style={{
                width: "100%",
                height: "60px",
                backgroundColor: color,
                borderRadius: "6px",
                marginBottom: "8px",
                border: `1px solid ${colors.gray[200]}`,
              }} />
              <div style={{ fontSize: fontSize.xs, fontWeight: fontWeight.semibold, color: colors.gray[700] }}>
                {shade}
              </div>
              <div style={{ fontSize: fontSize.xs, color: colors.gray[500], fontFamily: "monospace" }}>
                {color}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Error Colors Row */}
      <div style={{ marginBottom: "32px" }}>
        <h4 style={{ fontSize: fontSize.md, fontWeight: fontWeight.semibold, marginBottom: "16px", color: colors.gray[800] }}>
          Error Colors
        </h4>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "12px" }}>
          {Object.entries(colors.error).map(([shade, color]) => (
            <div key={shade} style={{ textAlign: "center" }}>
              <div style={{
                width: "100%",
                height: "60px",
                backgroundColor: color,
                borderRadius: "6px",
                marginBottom: "8px",
                border: `1px solid ${colors.gray[200]}`,
              }} />
              <div style={{ fontSize: fontSize.xs, fontWeight: fontWeight.semibold, color: colors.gray[700] }}>
                {shade}
              </div>
              <div style={{ fontSize: fontSize.xs, color: colors.gray[500], fontFamily: "monospace" }}>
                {color}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Warning Colors Row */}
      <div style={{ marginBottom: "32px" }}>
        <h4 style={{ fontSize: fontSize.md, fontWeight: fontWeight.semibold, marginBottom: "16px", color: colors.gray[800] }}>
          Warning Colors
        </h4>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "12px" }}>
          {Object.entries(colors.warning).map(([shade, color]) => (
            <div key={shade} style={{ textAlign: "center" }}>
              <div style={{
                width: "100%",
                height: "60px",
                backgroundColor: color,
                borderRadius: "6px",
                marginBottom: "8px",
                border: `1px solid ${colors.gray[200]}`,
              }} />
              <div style={{ fontSize: fontSize.xs, fontWeight: fontWeight.semibold, color: colors.gray[700] }}>
                {shade}
              </div>
              <div style={{ fontSize: fontSize.xs, color: colors.gray[500], fontFamily: "monospace" }}>
                {color}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Colors Row */}
      <div style={{ marginBottom: "32px" }}>
        <h4 style={{ fontSize: fontSize.md, fontWeight: fontWeight.semibold, marginBottom: "16px", color: colors.gray[800] }}>
          Info Colors
        </h4>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "12px" }}>
          {Object.entries(colors.info).map(([shade, color]) => (
            <div key={shade} style={{ textAlign: "center" }}>
              <div style={{
                width: "100%",
                height: "60px",
                backgroundColor: color,
                borderRadius: "6px",
                marginBottom: "8px",
                border: `1px solid ${colors.gray[200]}`,
              }} />
              <div style={{ fontSize: fontSize.xs, fontWeight: fontWeight.semibold, color: colors.gray[700] }}>
                {shade}
              </div>
              <div style={{ fontSize: fontSize.xs, color: colors.gray[500], fontFamily: "monospace" }}>
                {color}
              </div>
            </div>
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
      <h3 style={{ fontSize: fontSize.lg, fontWeight: fontWeight.semibold, marginBottom: "24px", color: colors.gray[900] }}>
        Border Colors
      </h3>

      {/* Basic Border Colors */}
      <div style={{ marginBottom: "48px" }}>
        <h4 style={{ fontSize: fontSize.md, fontWeight: fontWeight.semibold, marginBottom: "16px", color: colors.gray[800] }}>
          Basic Border Colors
        </h4>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "24px" }}>
          {[
            { name: 'default', color: colors.border.default, label: 'Default Border' },
            { name: 'primary', color: colors.border.primary, label: 'Primary Border' },
            { name: 'secondary', color: colors.border.secondary, label: 'Secondary Border' },
            { name: 'success', color: colors.border.success, label: 'Success Border' },
            { name: 'error', color: colors.border.error, label: 'Error Border' }
          ].map(({ name, color, label }) => (
            <div key={name} style={{ textAlign: "center" }}>
              <div style={{
                padding: "16px",
                border: `2px solid ${color}`,
                borderRadius: "8px",
                backgroundColor: colors.background.white,
                marginBottom: "8px",
                minHeight: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <span style={{ fontSize: fontSize.sm, color: colors.gray[600] }}>
                  {label}
                </span>
              </div>
              <div style={{ fontSize: fontSize.xs, fontWeight: fontWeight.semibold, color: colors.gray[700] }}>
                {name}
              </div>
              <div style={{ fontSize: fontSize.xs, color: colors.gray[500], fontFamily: "monospace" }}>
                {color}
              </div>
            </div>
          ))}
        </div>

        {/* Border Usage Examples */}
        <div style={{
          padding: "24px",
          backgroundColor: colors.gray[50],
          borderRadius: "8px",
          border: `1px solid ${colors.gray[200]}`
        }}>
          <h5 style={{ fontSize: fontSize.sm, fontWeight: fontWeight.semibold, marginBottom: "16px", color: colors.gray[800] }}>
            실제 사용 예시
          </h5>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px" }}>

            {/* Input Examples */}
            <div>
              <label style={{ fontSize: fontSize.xs, color: colors.gray[600], marginBottom: "4px", display: "block" }}>
                기본 입력 필드
              </label>
              <input
                placeholder="기본 테두리"
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: `1px solid ${colors.border.default}`,
                  borderRadius: "4px",
                  fontSize: fontSize.sm,
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: fontSize.xs, color: colors.gray[600], marginBottom: "4px", display: "block" }}>
                포커스 상태
              </label>
              <input
                placeholder="포커스된 상태"
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: `2px solid ${colors.border.focus.primary}`,
                  borderRadius: "4px",
                  fontSize: fontSize.sm,
                  outline: "none",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: fontSize.xs, color: colors.gray[600], marginBottom: "4px", display: "block" }}>
                성공 상태
              </label>
              <input
                placeholder="유효한 입력"
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: `1px solid ${colors.border.success}`,
                  borderRadius: "4px",
                  fontSize: fontSize.sm,
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: fontSize.xs, color: colors.gray[600], marginBottom: "4px", display: "block" }}>
                오류 상태
              </label>
              <input
                placeholder="잘못된 입력"
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: `1px solid ${colors.border.error}`,
                  borderRadius: "4px",
                  fontSize: fontSize.sm,
                  boxSizing: "border-box"
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Focus Border Colors */}
      <div style={{ marginBottom: "32px" }}>
        <h4 style={{ fontSize: fontSize.md, fontWeight: fontWeight.semibold, marginBottom: "16px", color: colors.gray[800] }}>
          Focus Border Colors
        </h4>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "12px" }}>
          {Object.entries(colors.border.focus).map(([variant, color]) => (
            <div key={variant} style={{ textAlign: "center" }}>
              <div style={{
                padding: "12px",
                border: `2px solid ${color}`,
                borderRadius: "6px",
                backgroundColor: colors.background.white,
                marginBottom: "8px",
                minHeight: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 0 2px ${color}33` // 투명도 추가
              }}>
                <span style={{ fontSize: fontSize.xs, color: colors.gray[600] }}>
                  Focus
                </span>
              </div>
              <div style={{ fontSize: fontSize.xs, fontWeight: fontWeight.semibold, color: colors.gray[700] }}>
                {variant}
              </div>
              <div style={{ fontSize: fontSize.xs, color: colors.gray[500], fontFamily: "monospace" }}>
                {color}
              </div>
            </div>
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
