import React, { useState, useEffect } from "react";
import { Skeleton, Card, Alert } from '../../components';
import { action } from "../actions";
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { Step } from '../types';
import { spacing } from '../../theme';

export default {
  title: "Components/Atomic/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "콘텐츠 로딩 상태를 시각적으로 표현하는 스켈레톤 컴포넌트입니다. 다양한 형태와 애니메이션을 지원합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["rectangle", "circle", "text"],
      description: "스켈레톤의 형태",
    },
    animation: {
      control: "select",
      options: ["pulse", "wave", "none"],
      description: "애니메이션 유형",
    },
    width: {
      control: "text",
      description: "너비 (px, %, em 등)",
    },
    height: {
      control: "text",
      description: "높이 (px, %, em 등)",
    },
    lines: {
      control: "number",
      description: "텍스트 라인 수 (text variant에서만 적용)",
    },
    lineSpacing: {
      control: "text",
      description: "텍스트 라인 간격",
    },
    borderRadius: {
      control: "text",
      description: "모서리 둥글기",
    },
  },
};

export const Default = {
  args: {},
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: Step }) => {
    await step("기본 스켈레톤 표시 확인", async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
    });

    await step("펄스 애니메이션 관찰", async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `<Skeleton />`,
      },
    },
  },
};

export const Variants = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.lg, width: "100%" }}>
      <div>
        <h4 style={{ marginBottom: spacing.sm }}>Rectangle (기본)</h4>
        <Skeleton width="100%" height={60} />
      </div>

      <div>
        <h4 style={{ marginBottom: spacing.sm }}>Circle</h4>
        <Skeleton variant="circle" width={60} height={60} />
      </div>

      <div>
        <h4 style={{ marginBottom: spacing.sm }}>Text (단일 라인)</h4>
        <Skeleton variant="text" width="70%" />
      </div>

      <div>
        <h4 style={{ marginBottom: spacing.sm }}>Text (다중 라인)</h4>
        <Skeleton variant="text" lines={3} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Skeleton variant="rectangle" width="100%" height={60} />
<Skeleton variant="circle" width={60} height={60} />
<Skeleton variant="text" width="70%" />
<Skeleton variant="text" lines={3} />`,
      },
    },
  },
};

export const Animations = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.lg, width: "100%" }}>
      <div>
        <h4 style={{ marginBottom: spacing.sm }}>Pulse (기본)</h4>
        <Skeleton animation="pulse" height={40} />
      </div>

      <div>
        <h4 style={{ marginBottom: spacing.sm }}>Wave</h4>
        <Skeleton animation="wave" height={40} />
      </div>

      <div>
        <h4 style={{ marginBottom: spacing.sm }}>None (정적)</h4>
        <Skeleton animation="none" height={40} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Skeleton animation="pulse" height={40} />
<Skeleton animation="wave" height={40} />
<Skeleton animation="none" height={40} />`,
      },
    },
  },
};

export const Sizes = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.md, width: "100%" }}>
      <Skeleton height={20} />
      <Skeleton height={40} />
      <Skeleton height={60} />
      <div style={{ display: "flex", gap: spacing.md, alignItems: "center" }}>
        <Skeleton variant="circle" width={32} height={32} />
        <Skeleton variant="circle" width={48} height={48} />
        <Skeleton variant="circle" width={64} height={64} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Skeleton height={20} />
<Skeleton height={40} />
<Skeleton height={60} />
<Skeleton variant="circle" width={32} height={32} />
<Skeleton variant="circle" width={48} height={48} />
<Skeleton variant="circle" width={64} height={64} />`,
      },
    },
  },
};

const LoadingSimulation = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleReload = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <div style={{ width: "100%" }}>
      <button
        onClick={handleReload}
        style={{
          marginBottom: spacing.lg,
          padding: `${spacing.xs} ${spacing.sm}`,
          border: '1px solid #ccc',
          borderRadius: '4px',
          background: 'white',
          cursor: 'pointer'
        }}
      >
        다시 로딩
      </button>

      <Card>
        {isLoading ? (
          <div style={{ display: "flex", gap: spacing.md }}>
            <Skeleton variant="circle" width={50} height={50} />
            <div style={{ flex: 1 }}>
              <Skeleton variant="text" width="60%" height={20} />
              <Skeleton variant="text" lines={2} lineSpacing={spacing.xs} />
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", gap: spacing.md }}>
            <div style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              backgroundColor: "#e3f2fd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              color: "#1976d2"
            }}>
              HG
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: "0 0 8px 0" }}>홍길동</h3>
              <p style={{ margin: "0", color: "#666" }}>
                프로젝트 매니저로 5년간 근무하며 다양한 프로젝트를 성공적으로 이끌었습니다.
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export const LoadingDemo = {
  render: LoadingSimulation,
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: Step }) => {
    const canvas = within(canvasElement);

    await step("로딩 상태 확인", async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
    });

    await step("스켈레톤 애니메이션 관찰", async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
    });

    await step("콘텐츠 로드 완료 대기", async () => {
      await waitFor(() => {
        return canvas.queryByText('홍길동') !== null;
      }, { timeout: 5000 });
    });

    await step("다시 로딩 버튼 클릭", async () => {
      const reloadButton = canvas.getByText('다시 로딩');
      await userEvent.click(reloadButton);
      await new Promise(resolve => setTimeout(resolve, 500));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `const [isLoading, setIsLoading] = useState(true);

return (
  <Card>
    {isLoading ? (
      <div style={{ display: "flex", gap: "16px" }}>
        <Skeleton variant="circle" width={50} height={50} />
        <div style={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" height={20} />
          <Skeleton variant="text" lines={2} />
        </div>
      </div>
    ) : (
      <div style={{ display: "flex", gap: "16px" }}>
        <Avatar src="user.jpg" />
        <div>
          <h3>홍길동</h3>
          <p>프로젝트 매니저로 5년간 근무했습니다.</p>
        </div>
      </div>
    )}
  </Card>
);`,
      },
    },
  },
};

export const ComplexLayouts = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.lg, width: "100%" }}>
      {/* 프로필 카드 스켈레톤 */}
      <Card>
        <div style={{ display: "flex", alignItems: "center", gap: spacing.md, marginBottom: spacing.md }}>
          <Skeleton variant="circle" width={60} height={60} />
          <div style={{ flex: 1 }}>
            <Skeleton variant="text" width="40%" height={20} />
            <Skeleton variant="text" width="60%" height={16} />
          </div>
        </div>
        <Skeleton variant="text" lines={3} />
      </Card>

      {/* 리스트 아이템 스켈레톤들 */}
      <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} style={{
            display: "flex",
            alignItems: "center",
            gap: spacing.sm,
            padding: spacing.sm,
            border: "1px solid #eee",
            borderRadius: "8px"
          }}>
            <Skeleton variant="circle" width={40} height={40} />
            <div style={{ flex: 1 }}>
              <Skeleton variant="text" width="70%" height={16} />
              <Skeleton variant="text" width="50%" height={14} />
            </div>
            <Skeleton width={60} height={32} />
          </div>
        ))}
      </div>

      {/* 대시보드 그리드 스켈레톤 */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: spacing.md
      }}>
        {Array.from({ length: 6 }, (_, i) => (
          <Card key={i}>
            <Skeleton variant="text" width="50%" height={16} />
            <Skeleton height={80} style={{ margin: `${spacing.sm} 0` }} />
            <Skeleton variant="text" width="30%" height={14} />
          </Card>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
  {/* 프로필 카드 스켈레톤 */}
  <Card>
    <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
      <Skeleton variant="circle" width={60} height={60} />
      <div style={{ flex: 1 }}>
        <Skeleton variant="text" width="40%" height={20} />
        <Skeleton variant="text" width="60%" height={16} />
      </div>
    </div>
    <Skeleton variant="text" lines={3} />
  </Card>

  {/* 리스트 아이템 스켈레톤들 */}
  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
    {Array.from({ length: 4 }, (_, i) => (
      <div key={i} style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px",
        border: "1px solid #eee",
        borderRadius: "8px"
      }}>
        <Skeleton variant="circle" width={40} height={40} />
        <div style={{ flex: 1 }}>
          <Skeleton variant="text" width="70%" height={16} />
          <Skeleton variant="text" width="50%" height={14} />
        </div>
        <Skeleton width={60} height={32} />
      </div>
    ))}
  </div>

  {/* 대시보드 그리드 스켈레톤 */}
  <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px"
  }}>
    {Array.from({ length: 6 }, (_, i) => (
      <Card key={i}>
        <Skeleton variant="text" width="50%" height={16} />
        <Skeleton height={80} style={{ margin: "12px 0" }} />
        <Skeleton variant="text" width="30%" height={14} />
      </Card>
    ))}
  </div>
</div>`,
      },
    },
  },
};