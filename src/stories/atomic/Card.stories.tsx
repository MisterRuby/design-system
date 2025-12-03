import React from "react";
import { Card } from '../../components';
import { action } from "../actions";
import { within, userEvent } from '@storybook/testing-library';
import { Step } from '../types';
import { spacing } from '../../theme';

export default {
  title: "Components/Atomic/Card",
  component: Card,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "콘텐츠를 그룹핑하는 카드 컴포넌트입니다. 다양한 스타일과 상호작용을 지원합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outlined", "elevated"],
      description: "카드의 시각적 스타일 유형",
    },
    padding: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
      description: "카드 내부 여백 크기",
    },
    hoverable: {
      control: "boolean",
      description: "호버 효과 활성화 여부",
    },
    children: {
      description: "카드 내부에 표시될 내용",
    },
    onClick: {
      description: "카드 클릭 시 실행될 함수",
    },
  },
};

export const Default = {
  args: {
    children: (
      <div>
        <h3>카드 제목</h3>
        <p>카드 내용입니다. 여기에 다양한 콘텐츠를 넣을 수 있습니다.</p>
      </div>
    ),
    onClick: action('card-click'),
  },
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: Step }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByText('카드 제목').closest('div') as HTMLElement;

    await step("카드 클릭 테스트", async () => {
      await userEvent.click(card);
      await new Promise(resolve => setTimeout(resolve, 500));
    });

    await step("카드 호버 테스트", async () => {
      await userEvent.hover(card);
      await new Promise(resolve => setTimeout(resolve, 800));
      await userEvent.unhover(card);
      await new Promise(resolve => setTimeout(resolve, 300));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `<Card>
  <div>
    <h3>카드 제목</h3>
    <p>카드 내용입니다. 여기에 다양한 콘텐츠를 넣을 수 있습니다.</p>
  </div>
</Card>`,
      },
    },
  },
};

export const Variants = {
  render: () => (
    <div style={{ display: "flex", gap: spacing.lg, flexWrap: "wrap", width: "100%" }}>
      <Card variant="default" style={{ minWidth: "200px" }}>
        <h4>Default Card</h4>
        <p>기본 카드 스타일</p>
      </Card>
      <Card variant="outlined" style={{ minWidth: "200px" }}>
        <h4>Outlined Card</h4>
        <p>외곽선이 있는 카드</p>
      </Card>
      <Card variant="elevated" style={{ minWidth: "200px" }}>
        <h4>Elevated Card</h4>
        <p>그림자가 강조된 카드</p>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Card variant="default">
  <h4>Default Card</h4>
  <p>기본 카드 스타일</p>
</Card>
<Card variant="outlined">
  <h4>Outlined Card</h4>
  <p>외곽선이 있는 카드</p>
</Card>
<Card variant="elevated">
  <h4>Elevated Card</h4>
  <p>그림자가 강조된 카드</p>
</Card>`,
      },
    },
  },
};

export const Padding = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.md, width: "100%" }}>
      <Card padding="none" style={{ border: "1px dashed #ccc" }}>
        <div style={{ padding: "8px", backgroundColor: "#f0f0f0" }}>Padding: None</div>
      </Card>
      <Card padding="sm" style={{ border: "1px dashed #ccc" }}>
        <div style={{ backgroundColor: "#f0f0f0" }}>Padding: Small</div>
      </Card>
      <Card padding="md" style={{ border: "1px dashed #ccc" }}>
        <div style={{ backgroundColor: "#f0f0f0" }}>Padding: Medium</div>
      </Card>
      <Card padding="lg" style={{ border: "1px dashed #ccc" }}>
        <div style={{ backgroundColor: "#f0f0f0" }}>Padding: Large</div>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Card padding="none">여백 없음</Card>
<Card padding="sm">작은 여백</Card>
<Card padding="md">보통 여백</Card>
<Card padding="lg">큰 여백</Card>`,
      },
    },
  },
};

export const Interactive = {
  args: {
    children: (
      <div>
        <h3>클릭 가능한 카드</h3>
        <p>이 카드는 클릭할 수 있으며, 호버 효과가 있습니다.</p>
      </div>
    ),
    hoverable: true,
    onClick: action('interactive-card-click'),
  },
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: Step }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByText('클릭 가능한 카드').closest('div') as HTMLElement;

    await step("호버 효과 테스트", async () => {
      await userEvent.hover(card);
      await new Promise(resolve => setTimeout(resolve, 1000));
    });

    await step("카드 클릭 상호작용 테스트", async () => {
      await userEvent.click(card);
      await new Promise(resolve => setTimeout(resolve, 600));
    });

    await step("호버 해제 테스트", async () => {
      await userEvent.unhover(card);
      await new Promise(resolve => setTimeout(resolve, 400));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `<Card hoverable onClick={() => console.log('카드 클릭!')}>
  <div>
    <h3>클릭 가능한 카드</h3>
    <p>이 카드는 클릭할 수 있으며, 호버 효과가 있습니다.</p>
  </div>
</Card>`,
      },
    },
  },
};

export const ContentExamples = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: spacing.lg, width: "100%" }}>
      <Card>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: "60px",
            height: "60px",
            backgroundColor: "#e3f2fd",
            borderRadius: "50%",
            margin: "0 auto 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            fontWeight: "bold",
            color: "#1976d2"
          }}>
            DASH
          </div>
          <h3 style={{ margin: "0 0 8px 0" }}>Dashboard</h3>
          <p style={{ margin: "0", color: "#666" }}>데이터 현황을 한눈에 확인하세요</p>
        </div>
      </Card>

      <Card hoverable onClick={action('profile-card-click')}>
        <div style={{ display: "flex", alignItems: "center", gap: spacing.md }}>
          <div style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: "#f3e5f5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold"
          }}>
            HG
          </div>
          <div>
            <h4 style={{ margin: "0 0 4px 0" }}>홍길동</h4>
            <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>
              프로젝트 매니저
            </p>
          </div>
        </div>
      </Card>

      <Card variant="elevated">
        <h4 style={{ margin: "0 0 12px 0", color: "#1976d2" }}>알림</h4>
        <ul style={{ margin: "0", padding: "0 0 0 16px" }}>
          <li>새로운 메시지가 3개 있습니다</li>
          <li>회의가 30분 후에 시작됩니다</li>
          <li>업데이트가 완료되었습니다</li>
        </ul>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Card>
  <div style={{ textAlign: "center" }}>
    <div style={{ color: "#1976d2", fontWeight: "bold" }}>DASH</div>
    <h3>Dashboard</h3>
    <p>데이터 현황을 한눈에 확인하세요</p>
  </div>
</Card>

<Card hoverable onClick={() => console.log('프로필 클릭')}>
  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
    <div style={{ fontWeight: "bold" }}>HG</div>
    <div>
      <h4>홍길동</h4>
      <p>프로젝트 매니저</p>
    </div>
  </div>
</Card>

<Card variant="elevated">
  <h4>알림</h4>
  <ul>
    <li>새로운 메시지가 3개 있습니다</li>
    <li>회의가 30분 후에 시작됩니다</li>
    <li>업데이트가 완료되었습니다</li>
  </ul>
</Card>`,
      },
    },
  },
};