import React from "react";
import { BaseCheckbox } from "../../components";
import { action } from "../actions";
import { within, userEvent } from "@storybook/testing-library";

export default {
  title: "Components/Atomic/BaseCheckbox",
  component: BaseCheckbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "순수한 체크박스 엘리먼트입니다. 라벨이나 설명 없이 기본적인 체크 기능만 제공합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "체크박스 크기",
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "success", "error", "warning", "info"],
      description: "체크박스 색상",
    },
    checked: {
      control: "boolean",
      description: "체크 상태",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 상태",
    },
    indeterminate: {
      control: "boolean",
      description: "중간 상태 (일부 선택)",
    },
  },
};

export const Default = {
  args: {
    onChange: action("checkbox-change"),
  },
  decorators: [
    (Story: any) => (
      <div style={{ padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: any }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");

    await step("체크박스 선택", async () => {
      await userEvent.click(checkbox);
      await new Promise(resolve => setTimeout(resolve, 500));
    });

    await step("체크박스 해제", async () => {
      await userEvent.click(checkbox);
      await new Promise(resolve => setTimeout(resolve, 300));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `<BaseCheckbox onChange={handleChange} />`,
      },
    },
  },
};

export const Sizes = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-start" }}>
      <BaseCheckbox size="sm" defaultChecked onChange={action("small-change")} />
      <BaseCheckbox size="md" defaultChecked onChange={action("medium-change")} />
      <BaseCheckbox size="lg" defaultChecked onChange={action("large-change")} />
    </div>
  ),
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: any }) => {
    const canvas = within(canvasElement);
    const checkboxes = canvas.getAllByRole("checkbox");

    await step("각 크기 체크박스 테스트", async () => {
      await userEvent.click(checkboxes[0]); // small
      await new Promise(resolve => setTimeout(resolve, 300));
      await userEvent.click(checkboxes[1]); // medium
      await new Promise(resolve => setTimeout(resolve, 300));
      await userEvent.click(checkboxes[2]); // large
      await new Promise(resolve => setTimeout(resolve, 300));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `<BaseCheckbox size="sm" />
<BaseCheckbox size="md" />
<BaseCheckbox size="lg" />`,
      },
    },
  },
};

export const Colors = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-start" }}>
      <BaseCheckbox color="primary" defaultChecked onChange={action("primary-change")} />
      <BaseCheckbox color="secondary" defaultChecked onChange={action("secondary-change")} />
      <BaseCheckbox color="success" defaultChecked onChange={action("success-change")} />
      <BaseCheckbox color="error" defaultChecked onChange={action("error-change")} />
      <BaseCheckbox color="warning" defaultChecked onChange={action("warning-change")} />
      <BaseCheckbox color="info" defaultChecked onChange={action("info-change")} />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<BaseCheckbox color="primary" />
<BaseCheckbox color="secondary" />
<BaseCheckbox color="success" />
<BaseCheckbox color="error" />
<BaseCheckbox color="warning" />
<BaseCheckbox color="info" />`,
      },
    },
  },
};

export const States = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-start" }}>
      <BaseCheckbox onChange={action("unchecked-change")} />
      <BaseCheckbox defaultChecked onChange={action("checked-change")} />
      <BaseCheckbox indeterminate onChange={action("indeterminate-change")} />
      <BaseCheckbox disabled onChange={action("disabled-change")} />
      <BaseCheckbox disabled defaultChecked onChange={action("disabled-checked-change")} />
    </div>
  ),
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: any }) => {
    const canvas = within(canvasElement);
    const checkboxes = canvas.getAllByRole("checkbox");

    await step("활성 상태 체크박스들 테스트", async () => {
      // 비활성화된 체크박스들을 제외한 처음 3개만 테스트
      await userEvent.click(checkboxes[0]); // unchecked
      await new Promise(resolve => setTimeout(resolve, 300));
      await userEvent.click(checkboxes[1]); // checked
      await new Promise(resolve => setTimeout(resolve, 300));
      await userEvent.click(checkboxes[2]); // indeterminate
      await new Promise(resolve => setTimeout(resolve, 300));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `<BaseCheckbox />
<BaseCheckbox defaultChecked />
<BaseCheckbox indeterminate />
<BaseCheckbox disabled />
<BaseCheckbox disabled defaultChecked />`,
      },
    },
  },
};

export const Disabled = {
  args: {
    disabled: true,
    defaultChecked: true,
    onChange: action("disabled-change"),
  },
  decorators: [
    (Story: any) => (
      <div style={{ padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: any }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");

    await step("비활성화된 체크박스 클릭 시도", async () => {
      await userEvent.click(checkbox);
      await new Promise(resolve => setTimeout(resolve, 500));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `<BaseCheckbox disabled defaultChecked />`,
      },
    },
  },
};