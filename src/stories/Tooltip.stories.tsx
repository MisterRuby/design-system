import React from "react";
import { Tooltip, Button, Icon } from "../components";
import { action } from "./actions";
import { within, userEvent } from "@storybook/testing-library";

export default {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "마우스 호버 시 추가 정보를 표시하는 툴팁 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    content: {
      description: "툴팁에 표시될 텍스트",
    },
    position: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "툴팁의 표시 위치",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "툴팁의 크기",
    },
    delay: {
      control: "number",
      description: "툴팁 표시 지연 시간 (ms)",
    },
    disabled: {
      control: "boolean",
      description: "툴팁 비활성화 여부",
    },
    maxWidth: {
      control: "text",
      description: "툴팁의 최대 너비 (CSS 값)",
    },
  },
};

export const Default = {
  args: {
    content: "이것은 기본 툴팁입니다",
    children: <Button>기본 버튼</Button>,
  },
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: any }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: '기본 버튼' });

    await step("마우스 호버로 툴팁 표시", async () => {
      await userEvent.hover(button);
    });

    await step("마우스 아웃으로 툴팁 숨김", async () => {
      await userEvent.unhover(button);
    });
  },
  parameters: {
    docs: {
      source: {
        code: `<Tooltip content="이것은 기본 툴팁입니다">
  <Button>기본 버튼</Button>
</Tooltip>`,
      },
    },
  },
};

export const WithIcon = {
  args: {
    content: "도움말 아이콘을 클릭하면 추가 정보를 볼 수 있습니다",
    children: <Icon name="info" size={20} />,
  },
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: any }) => {
    const canvas = within(canvasElement);
    const icon = canvasElement.querySelector('[data-testid="icon"]');

    await step("아이콘 호버로 툴팁 표시", async () => {
      if (icon) {
        await userEvent.hover(icon);
      }
    });
  },
  parameters: {
    docs: {
      source: {
        code: `<Tooltip content="도움말 아이콘을 클릭하면 추가 정보를 볼 수 있습니다">
  <Icon name="info" size={20} />
</Tooltip>`,
      },
    },
  },
};

export const LongContent = {
  args: {
    content: "이것은 매우 긴 툴팁 텍스트입니다. 긴 내용도 적절히 줄바꿈되어 표시되며, 최대 너비를 초과하지 않도록 자동으로 조정됩니다.",
    children: <Button>긴 내용 툴팁</Button>,
  },
  parameters: {
    docs: {
      source: {
        code: `<Tooltip content="이것은 매우 긴 툴팁 텍스트입니다...">
  <Button>긴 내용 툴팁</Button>
</Tooltip>`,
      },
    },
  },
};

export const FastTooltip = {
  args: {
    content: "빠른 표시 툴팁",
    delay: 100,
    children: <Button>빠른 툴팁</Button>,
  },
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: any }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: '빠른 툴팁' });

    await step("빠른 툴팁 표시 테스트", async () => {
      await userEvent.hover(button);
    });
  },
  parameters: {
    docs: {
      source: {
        code: `<Tooltip content="빠른 표시 툴팁" delay={100}>
  <Button>빠른 툴팁</Button>
</Tooltip>`,
      },
    },
  },
};

export const Disabled = {
  args: {
    content: "이 툴팁은 표시되지 않습니다",
    disabled: true,
    children: <Button>비활성화된 툴팁</Button>,
  },
  parameters: {
    docs: {
      source: {
        code: `<Tooltip content="이 툴팁은 표시되지 않습니다" disabled>
  <Button>비활성화된 툴팁</Button>
</Tooltip>`,
      },
    },
  },
};

export const Positions = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gap: "80px",
        padding: "80px",
        alignItems: "center",
        justifyItems: "center",
      }}>
      <Tooltip content="상단 툴팁" position="top">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip content="하단 툴팁" position="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip content="좌측 툴팁" position="left">
        <Button>Left</Button>
      </Tooltip>
      <Tooltip content="우측 툴팁" position="right">
        <Button>Right</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Tooltip content="상단 툴팁" position="top">
  <Button>Top</Button>
</Tooltip>

<Tooltip content="하단 툴팁" position="bottom">
  <Button>Bottom</Button>
</Tooltip>

<Tooltip content="좌측 툴팁" position="left">
  <Button>Left</Button>
</Tooltip>

<Tooltip content="우측 툴팁" position="right">
  <Button>Right</Button>
</Tooltip>`,
      },
    },
  },
};

export const Sizes = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        alignItems: "center",
      }}>
      <Tooltip content="Small 크기 툴팁" size="small">
        <Button size="small">Small</Button>
      </Tooltip>
      <Tooltip content="Medium 크기 툴팁" size="medium">
        <Button size="medium">Medium</Button>
      </Tooltip>
      <Tooltip content="Large 크기 툴팁입니다. 큰 크기에서는 더 많은 텍스트를 편안하게 읽을 수 있습니다." size="large">
        <Button size="large">Large</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Tooltip content="Small 크기 툴팁" size="small">
  <Button size="small">Small</Button>
</Tooltip>

<Tooltip content="Medium 크기 툴팁" size="medium">
  <Button size="medium">Medium</Button>
</Tooltip>

<Tooltip content="Large 크기 툴팁입니다..." size="large">
  <Button size="large">Large</Button>
</Tooltip>`,
      },
    },
  },
};

export const DelayVariations = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "16px",
        alignItems: "center",
      }}>
      <Tooltip content="즉시 표시" delay={0}>
        <Button>즉시 (0ms)</Button>
      </Tooltip>
      <Tooltip content="빠른 표시" delay={200}>
        <Button>빠름 (200ms)</Button>
      </Tooltip>
      <Tooltip content="기본 표시" delay={500}>
        <Button>기본 (500ms)</Button>
      </Tooltip>
      <Tooltip content="느린 표시" delay={1000}>
        <Button>느림 (1000ms)</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Tooltip content="즉시 표시" delay={0}>
  <Button>즉시 (0ms)</Button>
</Tooltip>

<Tooltip content="빠른 표시" delay={200}>
  <Button>빠름 (200ms)</Button>
</Tooltip>

<Tooltip content="기본 표시" delay={500}>
  <Button>기본 (500ms)</Button>
</Tooltip>

<Tooltip content="느린 표시" delay={1000}>
  <Button>느림 (1000ms)</Button>
</Tooltip>`,
      },
    },
  },
};

export const CustomMaxWidth = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        alignItems: "center",
      }}>
      <Tooltip content="짧은 텍스트" maxWidth="100px">
        <Button>짧은 텍스트 (최대 100px)</Button>
      </Tooltip>
      <Tooltip content="최대 너비 150px로 제한된 긴 텍스트 툴팁입니다. 이 텍스트는 적절히 줄바꿈됩니다." maxWidth="150px">
        <Button>긴 텍스트 (최대 150px)</Button>
      </Tooltip>
      <Tooltip content="최대 너비 250px로 더 넓게 설정된 툴팁입니다. 이 정도 길이의 텍스트도 편안하게 읽을 수 있습니다." maxWidth="250px">
        <Button>더 긴 텍스트 (최대 250px)</Button>
      </Tooltip>
      <Tooltip content="기본 최대 너비 (사이즈별 기본값)">
        <Button>기본 최대 너비</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Tooltip content="짧은 텍스트" maxWidth="100px">
  <Button>짧은 텍스트 (최대 100px)</Button>
</Tooltip>

<Tooltip content="최대 너비 150px로 제한된 긴 텍스트..." maxWidth="150px">
  <Button>긴 텍스트 (최대 150px)</Button>
</Tooltip>

<Tooltip content="최대 너비 250px로 더 넓게 설정된 툴팁..." maxWidth="250px">
  <Button>더 긴 텍스트 (최대 250px)</Button>
</Tooltip>

<Tooltip content="기본 최대 너비 (사이즈별 기본값)">
  <Button>기본 최대 너비</Button>
</Tooltip>`,
      },
    },
  },
};