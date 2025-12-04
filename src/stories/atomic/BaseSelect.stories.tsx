import React from "react";
import { BaseSelect } from "../../components";
import { action } from "../actions";
import { within, userEvent } from "@storybook/testing-library";

export default {
  title: "Components/Atomic/BaseSelect",
  component: BaseSelect,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "순수한 select 엘리먼트입니다. 라벨이나 에러 메시지 없이 기본적인 선택 기능만 제공합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "선택 필드 크기",
    },
    variant: {
      control: "select",
      options: ["default", "primary", "secondary", "success", "error", "warning", "info"],
      description: "선택 필드 스타일",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 상태",
    },
    options: {
      description: "선택 가능한 옵션들의 배열",
    },
    placeholder: {
      description: "선택 필드에 표시될 힌트 텍스트",
    },
  },
};

const defaultOptions = [
  { value: "option1", label: "옵션 1" },
  { value: "option2", label: "옵션 2" },
  { value: "option3", label: "옵션 3" },
];

export const Default = {
  args: {
    options: defaultOptions,
    placeholder: "옵션을 선택하세요",
    onChange: action("select-change"),
    onFocus: action("select-focus"),
    onBlur: action("select-blur"),
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
    const select = canvas.getByRole("combobox");

    await step("드롭다운 열기 및 옵션 선택", async () => {
      await userEvent.click(select);
      await new Promise(resolve => setTimeout(resolve, 400));
      const option = canvas.getByRole("option", { name: "옵션 2" });
      await userEvent.click(option);
      await new Promise(resolve => setTimeout(resolve, 400));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `<BaseSelect options={options} placeholder="옵션을 선택하세요" onChange={handleChange} />`,
      },
    },
  },
};

export const Sizes = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "300px" }}>
      <BaseSelect size="small" options={defaultOptions} placeholder="Small 크기" onChange={action("small-change")} />
      <BaseSelect size="medium" options={defaultOptions} placeholder="Medium 크기" onChange={action("medium-change")} />
      <BaseSelect size="large" options={defaultOptions} placeholder="Large 크기" onChange={action("large-change")} />
    </div>
  ),
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: any }) => {
    const canvas = within(canvasElement);
    const selects = canvas.getAllByRole("combobox");

    await step("각 크기별 선택 테스트", async () => {
      await userEvent.click(selects[0]);
      await userEvent.click(canvas.getByRole("option", { name: "옵션 1" }));
      await new Promise(resolve => setTimeout(resolve, 300));

      await userEvent.click(selects[1]);
      await userEvent.click(canvas.getByRole("option", { name: "옵션 2" }));
      await new Promise(resolve => setTimeout(resolve, 300));

      await userEvent.click(selects[2]);
      await userEvent.click(canvas.getByRole("option", { name: "옵션 3" }));
      await new Promise(resolve => setTimeout(resolve, 300));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `<BaseSelect size="small" options={options} placeholder="Small 크기" />
<BaseSelect size="medium" options={options} placeholder="Medium 크기" />
<BaseSelect size="large" options={options} placeholder="Large 크기" />`,
      },
    },
  },
};

export const Variants = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "300px" }}>
      <BaseSelect variant="default" options={defaultOptions} placeholder="Default variant" onChange={action("default-change")} />
      <BaseSelect variant="primary" options={defaultOptions} placeholder="Primary variant" onChange={action("primary-change")} />
      <BaseSelect variant="secondary" options={defaultOptions} placeholder="Secondary variant" onChange={action("secondary-change")} />
      <BaseSelect variant="success" options={defaultOptions} placeholder="Success variant" onChange={action("success-change")} />
      <BaseSelect variant="error" options={defaultOptions} placeholder="Error variant" onChange={action("error-change")} />
      <BaseSelect variant="warning" options={defaultOptions} placeholder="Warning variant" onChange={action("warning-change")} />
      <BaseSelect variant="info" options={defaultOptions} placeholder="Info variant" onChange={action("info-change")} />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<BaseSelect variant="default" options={options} placeholder="Default variant" />
<BaseSelect variant="primary" options={options} placeholder="Primary variant" />
<BaseSelect variant="secondary" options={options} placeholder="Secondary variant" />
<BaseSelect variant="success" options={options} placeholder="Success variant" />
<BaseSelect variant="error" options={options} placeholder="Error variant" />
<BaseSelect variant="warning" options={options} placeholder="Warning variant" />
<BaseSelect variant="info" options={options} placeholder="Info variant" />`,
      },
    },
  },
};

export const WithDisabledOptions = {
  args: {
    options: [
      { value: "active", label: "활성" },
      { value: "inactive", label: "비활성" },
      { value: "pending", label: "대기중", disabled: true },
      { value: "archived", label: "보관됨", disabled: true },
    ],
    placeholder: "상태를 선택하세요",
    onChange: action("status-change"),
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
    const select = canvas.getByRole("combobox");

    await step("활성 옵션 선택 테스트", async () => {
      await userEvent.click(select);
      await new Promise(resolve => setTimeout(resolve, 300));
      await userEvent.click(canvas.getByRole("option", { name: "활성" }));
      await new Promise(resolve => setTimeout(resolve, 400));

      await userEvent.click(select);
      await new Promise(resolve => setTimeout(resolve, 300));
      await userEvent.click(canvas.getByRole("option", { name: "비활성" }));
      await new Promise(resolve => setTimeout(resolve, 400));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `<BaseSelect
  options={[
    { value: "active", label: "활성" },
    { value: "inactive", label: "비활성" },
    { value: "pending", label: "대기중", disabled: true },
    { value: "archived", label: "보관됨", disabled: true },
  ]}
  placeholder="상태를 선택하세요"
/>`,
      },
    },
  },
};


export const Disabled = {
  args: {
    options: defaultOptions,
    placeholder: "선택할 수 없습니다",
    disabled: true,
    onChange: action("disabled-change"),
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
    const select = canvas.getByRole("combobox");

    await step("비활성화된 선택 필드 클릭 시도", async () => {
      await userEvent.click(select);
      await new Promise(resolve => setTimeout(resolve, 500));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `<BaseSelect options={options} placeholder="선택할 수 없습니다" disabled />`,
      },
    },
  },
};
