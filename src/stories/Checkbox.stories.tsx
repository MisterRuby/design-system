import React from "react";
import { Checkbox } from "../components";
import { action } from "./actions";
import { within, userEvent } from "@storybook/testing-library";

export default {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      description: "체크박스 크기",
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    color: {
      description: "체크박스 색상",
      control: { type: "select" },
      options: ["primary", "secondary", "success", "error", "warning", "info"],
    },
    checked: {
      description: "체크 상태",
      control: { type: "boolean" },
    },
    disabled: {
      description: "비활성화 상태",
      control: { type: "boolean" },
    },
    required: {
      description: "필수 입력 여부",
      control: { type: "boolean" },
    },
    indeterminate: {
      description: "중간 상태 (일부 선택)",
      control: { type: "boolean" },
    },
    label: {
      description: "라벨 텍스트",
      control: { type: "text" },
    },
    description: {
      description: "설명 텍스트",
      control: { type: "text" },
    },
    onChange: {
      description: "값 변경 시 호출되는 함수",
    },
  },
};

export const Default = {
  args: {
    label: "체크박스 라벨",
    onChange: action("checkbox-change"),
  },
  play: async ({
    canvasElement,
    step,
  }: {
    canvasElement: HTMLElement;
    step: any;
  }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");

    await new Promise(resolve => setTimeout(resolve, 500));

    await step("체크박스 클릭 테스트", async () => {
      await userEvent.click(checkbox);
    });

    await new Promise(resolve => setTimeout(resolve, 1000));

    await step("체크박스 언체크 테스트", async () => {
      await userEvent.click(checkbox);
    });
  },
  parameters: {
    docs: {
      source: {
        code: `<Checkbox label="체크박스 라벨" onChange={handleChange} />`,
      },
    },
  },
};

export const WithoutLabel = {
  args: {
    onChange: action("checkbox-change"),
  },
  parameters: {
    docs: {
      source: {
        code: `<Checkbox onChange={handleChange} />`,
      },
    },
  },
};

export const WithDescription = {
  args: {
    label: "이용약관 동의",
    description: "서비스 이용을 위해 약관에 동의해주세요.",
    required: true,
    onChange: action("checkbox-change"),
  },
  parameters: {
    docs: {
      source: {
        code: `<Checkbox
  label="이용약관 동의"
  description="서비스 이용을 위해 약관에 동의해주세요."
  required
  onChange={handleChange}
/>`,
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
        gap: "16px",
        alignItems: "flex-start",
      }}>
      <Checkbox
        size="sm"
        label="Small 체크박스"
        onChange={action("small-change")}
      />
      <Checkbox
        size="md"
        label="Medium 체크박스"
        onChange={action("medium-change")}
      />
      <Checkbox
        size="lg"
        label="Large 체크박스"
        onChange={action("large-change")}
      />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Checkbox size="sm" label="Small 체크박스" />
<Checkbox size="md" label="Medium 체크박스" />
<Checkbox size="lg" label="Large 체크박스" />`,
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
        gap: "12px",
        alignItems: "flex-start",
      }}>
      <Checkbox
        color="primary"
        label="Primary"
        defaultChecked
        onChange={action("primary-change")}
      />
      <Checkbox
        color="secondary"
        label="Secondary"
        defaultChecked
        onChange={action("secondary-change")}
      />
      <Checkbox
        color="success"
        label="Success"
        defaultChecked
        onChange={action("success-change")}
      />
      <Checkbox
        color="error"
        label="Error"
        defaultChecked
        onChange={action("error-change")}
      />
      <Checkbox
        color="warning"
        label="Warning"
        defaultChecked
        onChange={action("warning-change")}
      />
      <Checkbox
        color="info"
        label="Info"
        defaultChecked
        onChange={action("info-change")}
      />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Checkbox color="primary" label="Primary" defaultChecked />
<Checkbox color="secondary" label="Secondary" defaultChecked />
<Checkbox color="success" label="Success" defaultChecked />
<Checkbox color="error" label="Error" defaultChecked />
<Checkbox color="warning" label="Warning" defaultChecked />
<Checkbox color="info" label="Info" defaultChecked />`,
      },
    },
  },
};

export const States = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        alignItems: "flex-start",
      }}>
      <Checkbox label="기본 상태" onChange={action("normal-change")} />
      <Checkbox
        label="체크됨"
        defaultChecked
        onChange={action("checked-change")}
      />
      <Checkbox
        label="비활성화"
        disabled
        onChange={action("disabled-change")}
      />
      <Checkbox
        label="비활성화 + 체크됨"
        disabled
        defaultChecked
        onChange={action("disabled-checked-change")}
      />
      <Checkbox
        label="중간 상태"
        indeterminate
        onChange={action("indeterminate-change")}
      />
      <Checkbox
        label="필수 항목"
        required
        onChange={action("required-change")}
      />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Checkbox label="기본 상태" />
<Checkbox label="체크됨" defaultChecked />
<Checkbox label="비활성화" disabled />
<Checkbox label="비활성화 + 체크됨" disabled defaultChecked />
<Checkbox label="중간 상태" indeterminate />
<Checkbox label="필수 항목" required />`,
      },
    },
  },
};

export const ControlledExample = {
  render: () => {
    const [checked, setChecked] = React.useState(false);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          alignItems: "flex-start",
        }}>
        <Checkbox
          label="제어되는 체크박스"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <div style={{ fontSize: "14px", color: "#6b7280" }}>
          현재 상태: {checked ? "체크됨" : "체크 안됨"}
        </div>
        <button
          onClick={() => setChecked(!checked)}
          style={{
            padding: "8px 16px",
            border: "1px solid #d1d5db",
            borderRadius: "4px",
            backgroundColor: "#ffffff",
            cursor: "pointer",
          }}>
          상태 토글
        </button>
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
    const checkbox = canvas.getByRole("checkbox");
    const toggleButton = canvas.getByRole("button", { name: "상태 토글" });

    await new Promise(resolve => setTimeout(resolve, 500));

    await step("체크박스 직접 클릭", async () => {
      await userEvent.click(checkbox);
    });

    await new Promise(resolve => setTimeout(resolve, 1200));

    await step("버튼으로 상태 토글", async () => {
      await userEvent.click(toggleButton);
    });

    await new Promise(resolve => setTimeout(resolve, 1200));

    await step("다시 버튼으로 토글", async () => {
      await userEvent.click(toggleButton);
    });
  },
  parameters: {
    docs: {
      source: {
        code: `const [checked, setChecked] = useState(false);

<Checkbox
  label="제어되는 체크박스"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>

<div style={{ fontSize: "14px", color: "#6b7280" }}>
  현재 상태: {checked ? "체크됨" : "체크 안됨"}
</div>
<button
  onClick={() => setChecked(!checked)}
  style={{
    padding: "8px 16px",
    border: "1px solid #d1d5db",
    borderRadius: "4px",
    backgroundColor: "#ffffff",
    cursor: "pointer"
  }}
>
  상태 토글
</button>`,
      },
    },
  },
};
