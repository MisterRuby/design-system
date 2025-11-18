import React from "react";
import { Radio } from "../components/atomic/Radio";
import { action } from "./actions";
import { within, userEvent, type StepRunner } from "@storybook/testing-library";

export default {
  title: "Components/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "여러 옵션 중 하나를 선택할 수 있는 라디오 버튼 그룹 컴포넌트입니다.",
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
    direction: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "라디오 버튼 배치 방향",
    },
    disabled: {
      control: "boolean",
      description: "전체 그룹 비활성화 여부",
    },
    required: {
      control: "boolean",
      description: "필수 선택 여부",
    },
    name: {
      description: "라디오 그룹의 name 속성 (필수)",
    },
    label: {
      description: "라디오 그룹의 라벨",
    },
    helperText: {
      description: "라디오 그룹 하단에 표시될 도움말 텍스트",
    },
    errorMessage: {
      description: "오류 상태일 때 표시될 메시지",
    },
    options: {
      description: "선택 가능한 라디오 옵션들의 배열",
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
    name: "default-radio",
    options: defaultOptions,
    onChange: action("radio-change"),
    onFocus: action("radio-focus"),
    onBlur: action("radio-blur"),
  },
  play: async ({
    canvasElement,
    step,
  }: {
    canvasElement: HTMLElement;
    step: StepRunner;
  }) => {
    const canvas = within(canvasElement);
    const radios = canvas.getAllByRole("radio");

    await new Promise((resolve) => setTimeout(resolve, 500));

    await step("첫 번째 옵션 선택", async () => {
      await userEvent.click(radios[0]);
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await step("두 번째 옵션 선택", async () => {
      await userEvent.click(radios[1]);
    });
  },
  parameters: {
    docs: {
      source: {
        code: `<Radio
  name="example"
  options={options}
  onChange={handleChange}
/>`,
      },
    },
  },
};

export const WithLabel = {
  args: {
    name: "theme-radio",
    label: "테마 선택",
    options: [
      { value: "light", label: "라이트" },
      { value: "dark", label: "다크" },
      { value: "auto", label: "시스템 설정" },
    ],
    onChange: action("theme-change"),
  },
  parameters: {
    docs: {
      source: {
        code: `<Radio
  name="theme"
  label="테마 선택"
  options={options}
  onChange={handleChange}
/>`,
      },
    },
  },
};

export const WithDescriptions = {
  args: {
    name: "plan-radio",
    label: "요금제 선택",
    options: [
      {
        value: "free",
        label: "무료",
        description: "기본 기능만 이용 가능합니다.",
      },
      {
        value: "pro",
        label: "프로",
        description: "고급 기능과 우선 지원을 받을 수 있습니다.",
      },
      {
        value: "enterprise",
        label: "엔터프라이즈",
        description: "모든 기능과 전담 지원을 받을 수 있습니다.",
      },
    ],
    onChange: action("plan-change"),
  },
  parameters: {
    docs: {
      source: {
        code: `<Radio
  name="plan"
  label="요금제 선택"
  options={[
    {
      value: "free",
      label: "무료",
      description: "기본 기능만 이용 가능합니다.",
    },
    {
      value: "pro",
      label: "프로",
      description: "고급 기능과 우선 지원을 받을 수 있습니다.",
    },
  ]}
  onChange={handleChange}
/>`,
      },
    },
  },
};

export const Required = {
  args: {
    name: "gender-radio",
    label: "성별",
    options: [
      { value: "male", label: "남성" },
      { value: "female", label: "여성" },
      { value: "other", label: "기타" },
    ],
    required: true,
    onChange: action("gender-change"),
  },
  parameters: {
    docs: {
      source: {
        code: `<Radio
  name="gender"
  label="성별"
  options={options}
  required
  onChange={handleChange}
/>`,
      },
    },
  },
};

export const WithHelperText = {
  args: {
    name: "notification-radio",
    label: "알림 설정",
    options: [
      { value: "all", label: "모든 알림 받기" },
      { value: "important", label: "중요 알림만 받기" },
      { value: "none", label: "알림 받지 않기" },
    ],
    helperText: "언제든지 설정에서 변경할 수 있습니다.",
    onChange: action("notification-change"),
  },
  parameters: {
    docs: {
      source: {
        code: `<Radio
  name="notification"
  label="알림 설정"
  options={options}
  helperText="언제든지 설정에서 변경할 수 있습니다."
  onChange={handleChange}
/>`,
      },
    },
  },
};

export const ErrorState = {
  args: {
    name: "payment-radio",
    label: "결제 방법",
    options: [
      { value: "card", label: "신용카드" },
      { value: "bank", label: "계좌이체" },
      { value: "cash", label: "현금" },
    ],
    required: true,
    errorMessage: "결제 방법을 선택해주세요.",
    onChange: action("payment-change"),
  },
  parameters: {
    docs: {
      source: {
        code: `<Radio
  name="payment"
  label="결제 방법"
  options={options}
  required
  errorMessage="결제 방법을 선택해주세요."
  onChange={handleChange}
/>`,
      },
    },
  },
};

export const Disabled = {
  args: {
    name: "disabled-radio",
    label: "비활성화된 라디오 그룹",
    options: defaultOptions,
    disabled: true,
    onChange: action("disabled-change"),
  },
  parameters: {
    docs: {
      source: {
        code: `<Radio
  name="disabled"
  label="비활성화된 라디오 그룹"
  options={options}
  disabled
  onChange={handleChange}
/>`,
      },
    },
  },
};

export const Sizes = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "400px" }}>
      <Radio
        name="size-sm"
        label="Small"
        size="sm"
        options={defaultOptions}
        onChange={action("small-change")}
      />
      <Radio
        name="size-md"
        label="Medium"
        size="md"
        options={defaultOptions}
        onChange={action("medium-change")}
      />
      <Radio
        name="size-lg"
        label="Large"
        size="lg"
        options={defaultOptions}
        onChange={action("large-change")}
      />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Radio name="example-sm" size="sm" options={options} />
<Radio name="example-md" size="md" options={options} />
<Radio name="example-lg" size="lg" options={options} />`,
      },
    },
  },
};

export const Colors = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "400px" }}>
      <Radio
        name="color-primary"
        label="Primary"
        color="primary"
        options={defaultOptions}
        defaultValue="option1"
        onChange={action("primary-change")}
      />
      <Radio
        name="color-secondary"
        label="Secondary"
        color="secondary"
        options={defaultOptions}
        defaultValue="option1"
        onChange={action("secondary-change")}
      />
      <Radio
        name="color-success"
        label="Success"
        color="success"
        options={defaultOptions}
        defaultValue="option1"
        onChange={action("success-change")}
      />
      <Radio
        name="color-error"
        label="Error"
        color="error"
        options={defaultOptions}
        defaultValue="option1"
        onChange={action("error-change")}
      />
      <Radio
        name="color-warning"
        label="Warning"
        color="warning"
        options={defaultOptions}
        defaultValue="option1"
        onChange={action("warning-change")}
      />
      <Radio
        name="color-info"
        label="Info"
        color="info"
        options={defaultOptions}
        defaultValue="option1"
        onChange={action("info-change")}
      />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Radio color="primary" name="primary" options={options} defaultValue="option1" />
<Radio color="secondary" name="secondary" options={options} defaultValue="option1" />
<Radio color="success" name="success" options={options} defaultValue="option1" />
<Radio color="error" name="error" options={options} defaultValue="option1" />
<Radio color="warning" name="warning" options={options} defaultValue="option1" />
<Radio color="info" name="info" options={options} defaultValue="option1" />`,
      },
    },
  },
};

export const Directions = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px", width: "500px" }}>
      <Radio
        name="direction-vertical"
        label="세로 배치 (기본)"
        direction="vertical"
        options={defaultOptions}
        onChange={action("vertical-change")}
      />
      <Radio
        name="direction-horizontal"
        label="가로 배치"
        direction="horizontal"
        options={defaultOptions}
        onChange={action("horizontal-change")}
      />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Radio
  name="vertical"
  direction="vertical"
  options={options}
/>

<Radio
  name="horizontal"
  direction="horizontal"
  options={options}
/>`,
      },
    },
  },
};

export const WithDisabledOptions = {
  args: {
    name: "shipping-radio",
    label: "배송 방법",
    options: [
      { value: "standard", label: "일반 배송" },
      { value: "express", label: "빠른 배송", disabled: true },
      { value: "overnight", label: "당일 배송", disabled: true },
    ],
    onChange: action("shipping-change"),
  },
  parameters: {
    docs: {
      source: {
        code: `<Radio
  name="shipping"
  label="배송 방법"
  options={[
    { value: "standard", label: "일반 배송" },
    { value: "express", label: "빠른 배송", disabled: true },
    { value: "overnight", label: "당일 배송", disabled: true },
  ]}
  onChange={handleChange}
/>`,
      },
    },
  },
};

export const ControlledExample = {
  render: () => {
    const [value, setValue] = React.useState("");

    const options = [
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "angular", label: "Angular" },
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "300px" }}>
        <Radio
          name="controlled-radio"
          label="프레임워크"
          options={options}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div style={{ fontSize: "14px", color: "#6b7280" }}>
          선택된 값: {value || "없음"}
        </div>
        <button
          onClick={() => setValue("")}
          style={{
            padding: "8px 16px",
            border: "1px solid #d1d5db",
            borderRadius: "4px",
            backgroundColor: "#ffffff",
            cursor: "pointer",
          }}>
          선택 초기화
        </button>
      </div>
    );
  },
  play: async ({
    canvasElement,
    step,
  }: {
    canvasElement: HTMLElement;
    step: StepRunner;
  }) => {
    const canvas = within(canvasElement);
    const radios = canvas.getAllByRole("radio");
    const resetButton = canvas.getByRole("button", { name: "선택 초기화" });

    await new Promise((resolve) => setTimeout(resolve, 500));

    await step("React 선택", async () => {
      await userEvent.click(radios[0]);
    });

    await new Promise((resolve) => setTimeout(resolve, 1200));

    await step("Vue 선택", async () => {
      await userEvent.click(radios[1]);
    });

    await new Promise((resolve) => setTimeout(resolve, 1200));

    await step("선택 초기화", async () => {
      await userEvent.click(resetButton);
    });
  },
  parameters: {
    docs: {
      source: {
        code: `const [value, setValue] = useState("");

<Radio
  name="controlled"
  label="프레임워크"
  options={options}
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>

<div style={{ fontSize: "14px", color: "#6b7280" }}>
  선택된 값: {value || "없음"}
</div>
<button onClick={() => setValue("")}>
  선택 초기화
</button>`,
      },
    },
  },
};