import React from "react";
import { BaseRadio } from "../components";
import { action } from "./actions";
import { within, userEvent } from "@storybook/testing-library";

export default {
  title: "Components/Atomic/BaseRadio",
  component: BaseRadio,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "순수한 라디오 버튼 엘리먼트입니다. 라벨이나 그룹 관리 없이 기본적인 라디오 선택 기능만 제공합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "라디오 버튼 크기",
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "success", "error", "warning", "info"],
      description: "라디오 버튼 색상",
    },
    checked: {
      control: "boolean",
      description: "선택 상태",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 상태",
    },
    name: {
      description: "라디오 그룹 이름",
    },
    value: {
      description: "라디오 버튼 값",
    },
  },
};

export const Default = {
  args: {
    name: "default-radio",
    value: "option1",
    onChange: action("radio-change"),
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
    const radio = canvas.getByRole("radio");

    await step("라디오 버튼 선택", async () => {
      await userEvent.click(radio);
      await new Promise(resolve => setTimeout(resolve, 500));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `<BaseRadio name="example" value="option1" onChange={handleChange} />`,
      },
    },
  },
};

export const Sizes = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-start" }}>
      <BaseRadio size="sm" name="size-test" value="small" onChange={action("small-change")} />
      <BaseRadio size="md" name="size-test" value="medium" onChange={action("medium-change")} />
      <BaseRadio size="lg" name="size-test" value="large" onChange={action("large-change")} />
    </div>
  ),
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: any }) => {
    const canvas = within(canvasElement);
    const radios = canvas.getAllByRole("radio");

    await step("각 크기 라디오 버튼 테스트", async () => {
      await userEvent.click(radios[0]); // small
      await new Promise(resolve => setTimeout(resolve, 300));
      await userEvent.click(radios[1]); // medium
      await new Promise(resolve => setTimeout(resolve, 300));
      await userEvent.click(radios[2]); // large
      await new Promise(resolve => setTimeout(resolve, 300));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `<BaseRadio size="sm" name="size" value="small" />
<BaseRadio size="md" name="size" value="medium" />
<BaseRadio size="lg" name="size" value="large" />`,
      },
    },
  },
};

export const Colors = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-start" }}>
      <BaseRadio color="primary" name="color-test" value="primary" defaultChecked onChange={action("primary-change")} />
      <BaseRadio color="secondary" name="color-test2" value="secondary" defaultChecked onChange={action("secondary-change")} />
      <BaseRadio color="success" name="color-test3" value="success" defaultChecked onChange={action("success-change")} />
      <BaseRadio color="error" name="color-test4" value="error" defaultChecked onChange={action("error-change")} />
      <BaseRadio color="warning" name="color-test5" value="warning" defaultChecked onChange={action("warning-change")} />
      <BaseRadio color="info" name="color-test6" value="info" defaultChecked onChange={action("info-change")} />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<BaseRadio color="primary" name="group1" value="primary" />
<BaseRadio color="secondary" name="group2" value="secondary" />
<BaseRadio color="success" name="group3" value="success" />
<BaseRadio color="error" name="group4" value="error" />
<BaseRadio color="warning" name="group5" value="warning" />
<BaseRadio color="info" name="group6" value="info" />`,
      },
    },
  },
};

export const States = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-start" }}>
      <BaseRadio name="state-test" value="unselected" onChange={action("unselected-change")} />
      <BaseRadio name="state-test" value="selected" defaultChecked onChange={action("selected-change")} />
      <BaseRadio name="disabled-test" value="disabled" disabled onChange={action("disabled-change")} />
      <BaseRadio name="disabled-test2" value="disabled-selected" disabled defaultChecked onChange={action("disabled-selected-change")} />
    </div>
  ),
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: any }) => {
    const canvas = within(canvasElement);
    const radios = canvas.getAllByRole("radio");

    await step("활성 상태 라디오 버튼들 테스트", async () => {
      // 비활성화된 라디오를 제외한 첫 번째와 두 번째만 테스트
      await userEvent.click(radios[0]); // unselected
      await new Promise(resolve => setTimeout(resolve, 500));
      await userEvent.click(radios[1]); // selected (같은 그룹이므로 이전 선택 해제됨)
      await new Promise(resolve => setTimeout(resolve, 300));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `<BaseRadio name="group" value="unselected" />
<BaseRadio name="group" value="selected" defaultChecked />
<BaseRadio name="group" value="disabled" disabled />
<BaseRadio name="group" value="disabled-selected" disabled defaultChecked />`,
      },
    },
  },
};

export const RadioGroup = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-start" }}>
      <BaseRadio name="example-group" value="option1" onChange={action("option1-change")} />
      <BaseRadio name="example-group" value="option2" onChange={action("option2-change")} />
      <BaseRadio name="example-group" value="option3" onChange={action("option3-change")} />
    </div>
  ),
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: any }) => {
    const canvas = within(canvasElement);
    const radios = canvas.getAllByRole("radio");

    await step("라디오 그룹 선택 테스트", async () => {
      await userEvent.click(radios[0]); // option1
      await new Promise(resolve => setTimeout(resolve, 500));

      await userEvent.click(radios[1]); // option2 (option1 자동 해제)
      await new Promise(resolve => setTimeout(resolve, 500));

      await userEvent.click(radios[2]); // option3 (option2 자동 해제)
      await new Promise(resolve => setTimeout(resolve, 500));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `<BaseRadio name="group" value="option1" />
<BaseRadio name="group" value="option2" />
<BaseRadio name="group" value="option3" />`,
      },
    },
  },
};

export const Disabled = {
  args: {
    name: "disabled-radio",
    value: "disabled-option",
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
    const radio = canvas.getByRole("radio");

    await step("비활성화된 라디오 버튼 클릭 시도", async () => {
      await userEvent.click(radio);
      await new Promise(resolve => setTimeout(resolve, 500));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `<BaseRadio name="example" value="option" disabled defaultChecked />`,
      },
    },
  },
};