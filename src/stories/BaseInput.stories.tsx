import React from "react";
import { BaseInput } from "../components";
import { action } from "./actions";
import { within, userEvent } from "@storybook/testing-library";

export default {
  title: "Components/Atomic/BaseInput",
  component: BaseInput,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "순수한 input 엘리먼트입니다. 라벨이나 에러 메시지 없이 기본적인 입력 기능만 제공합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url", "search"],
      description: "input 타입",
    },
    placeholder: {
      control: "text",
      description: "플레이스홀더 텍스트",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "입력 필드 크기",
    },
    variant: {
      control: "select",
      options: ["default", "primary", "secondary", "success", "error", "warning", "info"],
      description: "입력 필드 스타일",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 상태",
    },
  },
};

export const Default = {
  args: {
    placeholder: "텍스트를 입력하세요",
    onChange: action("change"),
  },
  decorators: [
    (Story: any) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: any }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('텍스트를 입력하세요');

    await step("입력 필드에 텍스트 입력", async () => {
      await userEvent.type(input, 'Hello World');
      await new Promise(resolve => setTimeout(resolve, 500));
    });

    await step("입력 필드 포커스 해제", async () => {
      await userEvent.click(document.body);
      await new Promise(resolve => setTimeout(resolve, 300));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `<BaseInput placeholder="텍스트를 입력하세요" onChange={handleChange} />`,
      },
    },
  },
};

export const Variants = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "300px" }}>
      <BaseInput placeholder="Default" variant="default" />
      <BaseInput placeholder="Primary" variant="primary" />
      <BaseInput placeholder="Secondary" variant="secondary" />
      <BaseInput placeholder="Success" variant="success" />
      <BaseInput placeholder="Error" variant="error" />
      <BaseInput placeholder="Warning" variant="warning" />
      <BaseInput placeholder="Info" variant="info" />
    </div>
  ),
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: any }) => {
    const canvas = within(canvasElement);

    await step("모든 variant 확인", async () => {
      const defaultInput = canvas.getByPlaceholderText('Default');
      const primaryInput = canvas.getByPlaceholderText('Primary');

      await userEvent.type(defaultInput, 'Default');
      await new Promise(resolve => setTimeout(resolve, 300));
      await userEvent.type(primaryInput, 'Primary');
      await new Promise(resolve => setTimeout(resolve, 300));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `<BaseInput placeholder="Default" variant="default" />
<BaseInput placeholder="Primary" variant="primary" />
<BaseInput placeholder="Success" variant="success" />
<BaseInput placeholder="Error" variant="error" />`,
      },
    },
  },
};

export const Sizes = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "300px" }}>
      <BaseInput placeholder="Small input" size="small" />
      <BaseInput placeholder="Medium input" size="medium" />
      <BaseInput placeholder="Large input" size="large" />
    </div>
  ),
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: any }) => {
    const canvas = within(canvasElement);

    await step("각 크기별 입력 테스트", async () => {
      const smallInput = canvas.getByPlaceholderText('Small input');
      const mediumInput = canvas.getByPlaceholderText('Medium input');
      const largeInput = canvas.getByPlaceholderText('Large input');

      await userEvent.type(smallInput, 'Small');
      await new Promise(resolve => setTimeout(resolve, 200));
      await userEvent.type(mediumInput, 'Medium');
      await new Promise(resolve => setTimeout(resolve, 200));
      await userEvent.type(largeInput, 'Large');
      await new Promise(resolve => setTimeout(resolve, 200));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `<BaseInput placeholder="Small input" size="small" />
<BaseInput placeholder="Medium input" size="medium" />
<BaseInput placeholder="Large input" size="large" />`,
      },
    },
  },
};

export const Disabled = {
  args: {
    placeholder: "비활성화된 입력 필드",
    disabled: true,
    defaultValue: "수정할 수 없습니다",
  },
  decorators: [
    (Story: any) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: any }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByDisplayValue('수정할 수 없습니다');

    await step("비활성화된 입력 필드 클릭 시도", async () => {
      await userEvent.click(input);
      await new Promise(resolve => setTimeout(resolve, 500));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `<BaseInput placeholder="비활성화된 입력 필드" disabled defaultValue="수정할 수 없습니다" />`,
      },
    },
  },
};