import React from "react";
import { within, userEvent } from "@storybook/testing-library";
import { CheckboxField } from "../components";
import { colors } from "../theme";
import { action } from "./actions";

export default {
  title: "Components/Molecules/CheckboxField",
  component: CheckboxField,
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
        code: `<CheckboxField label="체크박스 라벨" onChange={handleChange} />`,
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
        code: `<CheckboxField onChange={handleChange} />`,
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
        code: `<CheckboxField
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
      <CheckboxField
        size="sm"
        label="Small 체크박스"
        onChange={action("small-change")}
      />
      <CheckboxField
        size="md"
        label="Medium 체크박스"
        onChange={action("medium-change")}
      />
      <CheckboxField
        size="lg"
        label="Large 체크박스"
        onChange={action("large-change")}
      />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<CheckboxField size="sm" label="Small 체크박스" />
<CheckboxField size="md" label="Medium 체크박스" />
<CheckboxField size="lg" label="Large 체크박스" />`,
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
      <CheckboxField
        color="primary"
        label="Primary"
        defaultChecked
        onChange={action("primary-change")}
      />
      <CheckboxField
        color="secondary"
        label="Secondary"
        defaultChecked
        onChange={action("secondary-change")}
      />
      <CheckboxField
        color="success"
        label="Success"
        defaultChecked
        onChange={action("success-change")}
      />
      <CheckboxField
        color="error"
        label="Error"
        defaultChecked
        onChange={action("error-change")}
      />
      <CheckboxField
        color="warning"
        label="Warning"
        defaultChecked
        onChange={action("warning-change")}
      />
      <CheckboxField
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
        code: `<CheckboxField color="primary" label="Primary" defaultChecked />
<CheckboxField color="secondary" label="Secondary" defaultChecked />
<CheckboxField color="success" label="Success" defaultChecked />
<CheckboxField color="error" label="Error" defaultChecked />
<CheckboxField color="warning" label="Warning" defaultChecked />
<CheckboxField color="info" label="Info" defaultChecked />`,
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
      <CheckboxField label="기본 상태" onChange={action("normal-change")} />
      <CheckboxField
        label="체크됨"
        defaultChecked
        onChange={action("checked-change")}
      />
      <CheckboxField
        label="비활성화"
        disabled
        onChange={action("disabled-change")}
      />
      <CheckboxField
        label="비활성화 + 체크됨"
        disabled
        defaultChecked
        onChange={action("disabled-checked-change")}
      />
      <CheckboxField
        label="중간 상태"
        indeterminate
        onChange={action("indeterminate-change")}
      />
      <CheckboxField
        label="필수 항목"
        required
        onChange={action("required-change")}
      />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<CheckboxField label="기본 상태" />
<CheckboxField label="체크됨" defaultChecked />
<CheckboxField label="비활성화" disabled />
<CheckboxField label="비활성화 + 체크됨" disabled defaultChecked />
<CheckboxField label="중간 상태" indeterminate />
<CheckboxField label="필수 항목" required />`,
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
        <CheckboxField
          label="제어되는 체크박스"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <div style={{ fontSize: "14px", color: colors.gray[500] }}>
          현재 상태: {checked ? "체크됨" : "체크 안됨"}
        </div>
        <button
          onClick={() => setChecked(!checked)}
          style={{
            padding: "8px 16px",
            border: `1px solid ${colors.border.default}`,
            borderRadius: "4px",
            backgroundColor: colors.background.white,
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
        code: `import { colors } from "../theme";

const [checked, setChecked] = useState(false);

<CheckboxField
  label="제어되는 체크박스"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>

<div style={{ fontSize: "14px", color: colors.gray[500] }}>
  현재 상태: {checked ? "체크됨" : "체크 안됨"}
</div>
<button
  onClick={() => setChecked(!checked)}
  style={{
    padding: "8px 16px",
    border: \`1px solid \${colors.border.default}\`,
    borderRadius: "4px",
    backgroundColor: colors.background.white,
    cursor: "pointer"
  }}
>
  상태 토글
</button>`,
      },
    },
  },
};
