import React from "react";
import {
  borderRadius,
  borderWidth,
  semanticBorders,
  borderStyles,
  componentBorders,
  colors,
  fontSize,
  fontWeight,
} from "../theme";

export default {
  title: "Styles/Borders",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "프로젝트에서 사용하는 border 시스템입니다. 일관된 테두리와 모서리 처리를 위해 정의된 border 값들을 사용해주세요.",
      },
    },
  },
};

const BorderDemo = ({
  borderValues,
  type = "radius",
}: {
  borderValues: Record<string, string>;
  type?: "radius" | "width" | "semantic" | "style";
}) => (
  <div style={{ marginBottom: "48px" }}>
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          type === "radius"
            ? "repeat(auto-fit, minmax(140px, 1fr))"
            : "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "24px",
        marginBottom: "16px",
      }}>
      {Object.entries(borderValues).map(([key, value]) => (
        <div key={key} style={{ textAlign: "center" }}>
          <div
            style={{
              width: "100%",
              height: type === "width" ? "60px" : "100px",
              backgroundColor: colors.background.white,
              border:
                type === "semantic" || type === "style"
                  ? value
                  : type === "width"
                  ? `${value} solid ${colors.gray[400]}`
                  : `1px solid ${colors.gray[300]}`,
              borderRadius: type === "radius" ? value : "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "12px",
              color: colors.gray[600],
              fontSize: fontSize.sm,
              fontWeight: fontWeight.medium,
            }}>
            {key}
          </div>
          <div
            style={{
              fontSize: fontSize.xs,
              color: colors.gray[500],
              fontFamily: "monospace",
              marginBottom: "4px",
            }}>
            {key}
          </div>
          <div
            style={{
              fontSize: fontSize.xs,
              color: colors.gray[400],
              fontFamily: "monospace",
            }}>
            {value}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const BorderRadius = {
  render: () => <BorderDemo borderValues={borderRadius} type="radius" />,
  parameters: {
    docs: {
      source: {
        code: `import { borderRadius } from '../theme';

// 사용 예시
<div style={{ borderRadius: borderRadius.md }}>
  Medium rounded corners
</div>

// 값들
borderRadius.none   // 0px
borderRadius.xs     // 2px
borderRadius.sm     // 4px
borderRadius.md     // 8px
borderRadius.lg     // 12px
borderRadius.xl     // 16px
borderRadius['2xl'] // 20px
borderRadius['3xl'] // 24px
borderRadius.full   // 9999px`,
      },
    },
  },
};

export const BorderWidth = {
  render: () => <BorderDemo borderValues={borderWidth} type="width" />,
  parameters: {
    docs: {
      source: {
        code: `import { borderWidth } from '../theme';

// 사용 예시
<div style={{
  border: \`\${borderWidth[2]} solid #e5e7eb\`
}}>
  2px border
</div>

// 값들
borderWidth[0]  // 0px
borderWidth[1]  // 1px
borderWidth[2]  // 2px
borderWidth[3]  // 3px
borderWidth[4]  // 4px
borderWidth[8]  // 8px`,
      },
    },
  },
};

export const SemanticBorders = {
  render: () => <BorderDemo borderValues={semanticBorders} type="semantic" />,
  parameters: {
    docs: {
      source: {
        code: `import { semanticBorders } from '../theme';

// 사용 예시
<input style={{ border: semanticBorders.default }} />
<input style={{ border: semanticBorders.focus }} />
<input style={{ border: semanticBorders.error }} />

// 의미별 테두리
semanticBorders.default  // 기본 테두리
semanticBorders.muted    // 연한 테두리
semanticBorders.strong   // 진한 테두리
semanticBorders.focus    // 포커스 상태
semanticBorders.error    // 오류 상태
semanticBorders.success  // 성공 상태
semanticBorders.warning  // 경고 상태
semanticBorders.info     // 정보 상태`,
      },
    },
  },
};

export const BorderStyles = {
  render: () => (
    <div style={{ marginBottom: "48px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "24px",
          marginBottom: "16px",
        }}>
        {Object.entries(borderStyles).map(([key, value]) => (
          <div key={key} style={{ textAlign: "center" }}>
            <div
              style={{
                width: "100%",
                height: "80px",
                backgroundColor: colors.background.white,
                border:
                  value === "none"
                    ? "none"
                    : `2px ${value} ${colors.gray[400]}`,
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "12px",
                color: colors.gray[600],
                fontSize: fontSize.sm,
                fontWeight: fontWeight.medium,
              }}>
              {key}
            </div>
            <div
              style={{
                fontSize: fontSize.xs,
                color: colors.gray[500],
                fontFamily: "monospace",
                marginBottom: "4px",
              }}>
              {key}
            </div>
            <div
              style={{
                fontSize: fontSize.xs,
                color: colors.gray[400],
                fontFamily: "monospace",
              }}>
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { borderStyles } from '../theme';

// 사용 예시
<div style={{
  borderStyle: borderStyles.solid,
  borderWidth: '2px',
  borderColor: '#e5e7eb'
}}>
  Solid border
</div>

// 스타일 종류
borderStyles.solid   // solid
borderStyles.dashed  // dashed
borderStyles.dotted  // dotted
borderStyles.double  // double
borderStyles.none    // none`,
      },
    },
  },
};

export const ComponentBorders = {
  render: () => (
    <div
      style={{
        marginBottom: "48px",
        padding: "24px 16px",
        overflow: "visible",
      }}>
      {Object.entries(componentBorders).map(([componentName, borders]) => (
        <div
          key={componentName}
          style={{
            marginBottom: "32px",
            padding: "16px 0",
            overflow: "visible",
          }}>
          <h4
            style={{
              fontSize: fontSize.md,
              fontWeight: fontWeight.medium,
              marginBottom: "16px",
              color: colors.gray[800],
              textTransform: "capitalize",
            }}>
            {componentName}
          </h4>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
              padding: "16px 8px",
              overflow: "visible",
            }}>
            {Object.entries(borders).map(([stateName, borderValue]) => (
              <div
                key={stateName}
                style={{ textAlign: "center", padding: "6px" }}>
                <div
                  style={{
                    width: "calc(100% - 8px)",
                    height: componentName === "divider" ? "20px" : "60px",
                    backgroundColor: colors.background.white,
                    border: componentName === "divider" ? "none" : borderValue,
                    borderTop: borderValue,
                    borderRadius:
                      componentName === "card"
                        ? "8px"
                        : componentName === "divider"
                        ? undefined
                        : "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "8px auto 12px auto",
                    color: colors.gray[600],
                    fontSize: fontSize.xs,
                    fontWeight: fontWeight.medium,
                    boxSizing: "border-box",
                  }}>
                  {componentName === "divider" ? "" : stateName}
                </div>
                <div
                  style={{
                    fontSize: fontSize.xs,
                    color: colors.gray[500],
                    fontFamily: "monospace",
                  }}>
                  {stateName}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { componentBorders } from '../theme';

// 컴포넌트별 테두리 사용 예시

// Input 컴포넌트
<input
  style={{ border: componentBorders.input.default }}
  onFocus={(e) => e.target.style.border = componentBorders.input.focus}
/>

// Card 컴포넌트
<div
  style={{ border: componentBorders.card.default }}
  onMouseEnter={(e) => e.target.style.border = componentBorders.card.hover}
>
  Card content
</div>

// Button 컴포넌트
<button style={{ border: componentBorders.button.outline }}>
  Outline Button
</button>

// Divider 컴포넌트
<hr style={{ border: componentBorders.divider.default }} />`,
      },
    },
  },
};

export const UsageExamples = {
  render: () => (
    <div style={{ marginBottom: "48px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "24px",
        }}>
        {/* Card 예시 */}
        <div
          style={{
            border: semanticBorders.default,
            borderRadius: borderRadius.lg,
            padding: "20px",
            backgroundColor: colors.background.white,
          }}>
          <h4
            style={{
              fontSize: fontSize.md,
              fontWeight: fontWeight.semibold,
              marginBottom: "12px",
            }}>
            Card Component
          </h4>
          <p
            style={{
              fontSize: fontSize.sm,
              color: colors.gray[600],
              margin: 0,
            }}>
            border: semanticBorders.default
            <br />
            borderRadius: borderRadius.lg
          </p>
        </div>

        {/* Input 예시 */}
        <div style={{ padding: "20px" }}>
          <label
            style={{
              fontSize: fontSize.sm,
              fontWeight: fontWeight.medium,
              display: "block",
              marginBottom: "8px",
            }}>
            Input Field
          </label>
          <input
            type="text"
            placeholder="Enter text..."
            style={{
              width: "100%",
              border: semanticBorders.default,
              borderRadius: borderRadius.sm,
              padding: "8px 12px",
              fontSize: fontSize.sm,
              outline: "none",
            }}
            onFocus={(e) => (e.target.style.border = semanticBorders.focus)}
            onBlur={(e) => (e.target.style.border = semanticBorders.default)}
          />
          <p
            style={{
              fontSize: fontSize.xs,
              color: colors.gray[500],
              margin: "4px 0 0 0",
            }}>
            default → focus 상태 변경
          </p>
        </div>

        {/* Button 예시 */}
        <div
          style={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}>
          <button
            style={{
              border: semanticBorders.default,
              borderRadius: borderRadius.md,
              padding: "8px 16px",
              backgroundColor: colors.background.white,
              fontSize: fontSize.sm,
              cursor: "pointer",
            }}>
            Outline Button
          </button>
          <button
            style={{
              border: `${borderWidth[2]} solid ${colors.primary[500]}`,
              borderRadius: borderRadius.full,
              padding: "10px 20px",
              backgroundColor: colors.primary[500],
              color: colors.background.white,
              fontSize: fontSize.sm,
              cursor: "pointer",
            }}>
            Primary Button
          </button>
          <p
            style={{
              fontSize: fontSize.xs,
              color: colors.gray[500],
              margin: 0,
            }}>
            다양한 border 조합 예시
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `// Card 컴포넌트 예시
<div style={{
  border: semanticBorders.default,
  borderRadius: borderRadius.lg,
  padding: '20px'
}}>
  Card content
</div>

// Input 필드 예시
<input style={{
  border: semanticBorders.default,
  borderRadius: borderRadius.sm,
  padding: '8px 12px'
}}
onFocus={(e) => e.target.style.border = semanticBorders.focus}
/>

// Button 예시
<button style={{
  border: semanticBorders.default,
  borderRadius: borderRadius.md,
  padding: '8px 16px'
}}>
  Outline Button
</button>

<button style={{
  border: \`\${borderWidth[2]} solid \${colors.primary[500]}\`,
  borderRadius: borderRadius.full,
  padding: '10px 20px'
}}>
  Primary Button
</button>`,
      },
    },
  },
};
