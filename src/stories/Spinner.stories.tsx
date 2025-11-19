import React from "react";
import { Spinner } from "../components";
import { action } from "./actions";
import { within, userEvent } from "@storybook/testing-library";

export default {
  title: "Components/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "로딩 상태를 나타내는 회전 애니메이션 스피너 컴포넌트입니다.",
      },
      story: {
        inline: true,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "스피너 크기",
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "success", "error", "warning", "info", "white"],
      description: "스피너 색상",
    },
    thickness: {
      control: { type: "range", min: 1, max: 8, step: 1 },
      description: "스피너 선 두께",
    },
    speed: {
      control: "select",
      options: ["slow", "normal", "fast"],
      description: "회전 속도",
    },
    label: {
      description: "스피너 하단에 표시될 라벨",
    },
  },
};

export const Default = {
  args: {},
  parameters: {
    docs: {
      source: {
        code: `<Spinner />`,
      },
    },
  },
};

export const WithLabel = {
  args: {
    label: "로딩 중...",
  },
  parameters: {
    docs: {
      source: {
        code: `<Spinner label="로딩 중..." />`,
      },
    },
  },
};

export const CustomThickness = {
  args: {
    thickness: 4,
    size: "lg",
  },
  parameters: {
    docs: {
      source: {
        code: `<Spinner thickness={4} size="lg" />`,
      },
    },
  },
};

export const FastSpeed = {
  args: {
    speed: "fast",
    color: "success",
  },
  parameters: {
    docs: {
      source: {
        code: `<Spinner speed="fast" color="success" />`,
      },
    },
  },
};

export const Sizes = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "48px",
        alignItems: "flex-end",
        justifyContent: "center",
        padding: "20px",
      }}>
      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
        <Spinner size="sm" />
        <div style={{ fontSize: "12px", color: "#6b7280", fontWeight: "500" }}>
          Small (16px)
        </div>
      </div>
      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
        <Spinner size="md" />
        <div style={{ fontSize: "12px", color: "#6b7280", fontWeight: "500" }}>
          Medium (24px)
        </div>
      </div>
      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
        <Spinner size="lg" />
        <div style={{ fontSize: "12px", color: "#6b7280", fontWeight: "500" }}>
          Large (32px)
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />`,
      },
    },
  },
};

export const Colors = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        padding: "20px",
        alignItems: "center",
      }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "24px",
        alignItems: "center",
        justifyItems: "center",
        width: "300px"
      }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <Spinner color="primary" />
          <span style={{ fontSize: "11px", color: "#6b7280" }}>Primary</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <Spinner color="secondary" />
          <span style={{ fontSize: "11px", color: "#6b7280" }}>Secondary</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <Spinner color="success" />
          <span style={{ fontSize: "11px", color: "#6b7280" }}>Success</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <Spinner color="error" />
          <span style={{ fontSize: "11px", color: "#6b7280" }}>Error</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <Spinner color="warning" />
          <span style={{ fontSize: "11px", color: "#6b7280" }}>Warning</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <Spinner color="info" />
          <span style={{ fontSize: "11px", color: "#6b7280" }}>Info</span>
        </div>
      </div>
      <div style={{
        backgroundColor: "#1f2937",
        padding: "20px",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        minWidth: "120px"
      }}>
        <Spinner color="white" />
        <span style={{ fontSize: "11px", color: "#9ca3af" }}>White</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Spinner color="primary" />
<Spinner color="secondary" />
<Spinner color="success" />
<Spinner color="error" />
<Spinner color="warning" />
<Spinner color="info" />
<Spinner color="white" />`,
      },
    },
  },
};

export const Speeds = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "48px",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}>
      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
        <Spinner speed="slow" color="warning" />
        <div style={{ fontSize: "12px", color: "#6b7280", fontWeight: "500" }}>
          Slow (1.2s)
        </div>
      </div>
      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
        <Spinner speed="normal" color="primary" />
        <div style={{ fontSize: "12px", color: "#6b7280", fontWeight: "500" }}>
          Normal (0.8s)
        </div>
      </div>
      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
        <Spinner speed="fast" color="success" />
        <div style={{ fontSize: "12px", color: "#6b7280", fontWeight: "500" }}>
          Fast (0.5s)
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Spinner speed="slow" />
<Spinner speed="normal" />
<Spinner speed="fast" />`,
      },
    },
  },
};

export const LoadingStates = {
  render: () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [loadingText, setLoadingText] = React.useState("시작하기");

    const handleLoad = async () => {
      setIsLoading(true);
      setLoadingText("로딩 중...");

      // 3초 후 완료
      setTimeout(() => {
        setIsLoading(false);
        setLoadingText("완료!");
        setTimeout(() => {
          setLoadingText("시작하기");
        }, 2000);
      }, 3000);
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          alignItems: "center",
          width: "300px",
        }}>
        <button
          onClick={handleLoad}
          disabled={isLoading}
          style={{
            padding: "12px 24px",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            backgroundColor: isLoading ? "#f3f4f6" : "#ffffff",
            cursor: isLoading ? "not-allowed" : "pointer",
            fontSize: "14px",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            minWidth: "140px",
            justifyContent: "center",
          }}>
          {isLoading && <Spinner size="sm" />}
          {loadingText}
        </button>

        {isLoading && (
          <div style={{
            textAlign: "center",
            padding: "20px",
            backgroundColor: "#f9fafb",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            width: "100%"
          }}>
            <Spinner label="데이터를 불러오는 중입니다..." color="primary" />
          </div>
        )}
      </div>
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
    const button = canvas.getByRole("button");

    await step("로딩 시작", async () => {
      await userEvent.click(button);
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await step("로딩 진행 중", async () => {
      // 라벨이 있는 스피너 확인
      const spinner = canvas.getByRole("status", { name: "데이터를 불러오는 중입니다..." });
      // 스피너가 DOM에 있는지 확인 (getByRole이 성공하면 존재함을 의미)
    });
  },
  parameters: {
    docs: {
      source: {
        code: `const [isLoading, setIsLoading] = useState(false);

<button onClick={handleLoad} disabled={isLoading}>
  {isLoading && <Spinner size="sm" />}
  {isLoading ? "로딩 중..." : "시작하기"}
</button>

{isLoading && (
  <Spinner label="데이터를 불러오는 중입니다..." />
)}`,
      },
    },
  },
};

export const OverlayExample = {
  render: () => {
    const [showOverlay, setShowOverlay] = React.useState(false);

    const handleShowOverlay = () => {
      setShowOverlay(true);
      setTimeout(() => {
        setShowOverlay(false);
      }, 3000);
    };

    return (
      <div style={{ width: "300px", height: "200px" }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            backgroundColor: "#f9fafb",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            boxSizing: "border-box",
          }}>
          <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>
            콘텐츠 영역
          </h3>
          <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>
            여기에 실제 콘텐츠가 표시됩니다.
          </p>
          <button
            onClick={handleShowOverlay}
            disabled={showOverlay}
            style={{
              padding: "8px 16px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              backgroundColor: "#ffffff",
              cursor: showOverlay ? "not-allowed" : "pointer",
              fontSize: "12px",
              alignSelf: "flex-start",
            }}>
            로딩 오버레이 표시
          </button>

          {showOverlay && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                backdropFilter: "blur(1px)",
              }}>
              <Spinner label="처리 중..." size="lg" />
            </div>
          )}
        </div>
      </div>
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
    const button = canvas.getByRole("button", { name: "로딩 오버레이 표시" });

    await step("오버레이 표시", async () => {
      await userEvent.click(button);
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await step("오버레이 확인", async () => {
      const spinner = canvas.getByRole("status", { name: "처리 중..." });
      // 스피너가 DOM에 있는지 확인 (getByRole이 성공하면 존재함을 의미)
    });
  },
  parameters: {
    docs: {
      source: {
        code: `{showOverlay && (
  <div style={{
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}>
    <Spinner label="처리 중..." size="lg" />
  </div>
)}`,
      },
    },
  },
};