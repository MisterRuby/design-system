import React from "react";
import { within, userEvent } from "@storybook/testing-library";
import { SelectField } from "../components";
import { colors, fontSize } from "../theme";
import { action } from "./actions";

export default {
  title: "Components/Molecules/SelectField",
  component: SelectField,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "다양한 옵션을 선택할 수 있는 드롭다운 선택 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "선택 필드의 크기",
    },
    variant: {
      control: "select",
      options: [
        "default",
        "primary",
        "secondary",
        "success",
        "error",
        "warning",
        "info",
      ],
      description: "선택 필드의 시각적 상태",
    },
    disabled: {
      control: "boolean",
      description: "선택 필드 비활성화 여부",
    },
    required: {
      control: "boolean",
      description: "필수 선택 여부",
    },
    multiple: {
      control: "boolean",
      description: "다중 선택 여부",
    },
    placeholder: {
      description: "선택 필드에 표시될 힌트 텍스트",
    },
    label: {
      description: "선택 필드의 라벨",
    },
    helperText: {
      description: "선택 필드 하단에 표시될 도움말 텍스트",
    },
    errorMessage: {
      description: "오류 상태일 때 표시될 메시지",
    },
    allowClear: {
      control: "boolean",
      description: "선택 해제 허용 여부 (placeholder 또는 별도 옵션 제공)",
    },
    options: {
      description: "선택 가능한 옵션들의 배열",
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
  play: async ({
    canvasElement,
    step,
  }: {
    canvasElement: HTMLElement;
    step: any;
  }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox");

    await new Promise((resolve) => setTimeout(resolve, 500));

    await step("드롭다운 열기", async () => {
      await userEvent.click(select);
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await step("옵션 선택", async () => {
      await userEvent.selectOptions(select, "option2");
    });
  },
  parameters: {
    docs: {
      source: {
        code: `<SelectField
  options={options}
  placeholder="옵션을 선택하세요"
  onChange={handleChange}
/>`,
      },
    },
  },
};

export const WithLabel = {
  args: {
    label: "카테고리",
    options: [
      { value: "tech", label: "기술" },
      { value: "design", label: "디자인" },
      { value: "marketing", label: "마케팅" },
    ],
    placeholder: "카테고리를 선택하세요",
    onChange: action("category-change"),
  },
  parameters: {
    docs: {
      source: {
        code: `<SelectField
  label="카테고리"
  options={options}
  placeholder="카테고리를 선택하세요"
/>`,
      },
    },
  },
};

export const Required = {
  args: {
    label: "우선순위",
    options: [
      { value: "high", label: "높음" },
      { value: "medium", label: "보통" },
      { value: "low", label: "낮음" },
    ],
    placeholder: "우선순위를 선택하세요",
    required: true,
    onChange: action("priority-change"),
  },
  parameters: {
    docs: {
      source: {
        code: `<SelectField
  label="우선순위"
  options={options}
  placeholder="우선순위를 선택하세요"
  required
/>`,
      },
    },
  },
};

export const WithHelperText = {
  args: {
    label: "언어",
    options: [
      { value: "ko", label: "한국어" },
      { value: "en", label: "영어" },
      { value: "ja", label: "일본어" },
    ],
    placeholder: "언어를 선택하세요",
    helperText: "인터페이스에 사용할 언어를 선택해주세요",
    onChange: action("language-change"),
  },
  parameters: {
    docs: {
      source: {
        code: `<SelectField
  label="언어"
  options={options}
  placeholder="언어를 선택하세요"
  helperText="인터페이스에 사용할 언어를 선택해주세요"
/>`,
      },
    },
  },
};

export const ErrorState = {
  args: {
    label: "지역",
    options: [
      { value: "seoul", label: "서울" },
      { value: "busan", label: "부산" },
      { value: "incheon", label: "인천" },
    ],
    placeholder: "지역을 선택하세요",
    variant: "error",
    errorMessage: "지역을 반드시 선택해야 합니다",
    required: true,
    value: "", // 빈 값으로 설정하여 에러 상태를 명확히 표시
    onChange: action("region-change"),
  },
  parameters: {
    docs: {
      source: {
        code: `<SelectField
  label="지역"
  options={options}
  placeholder="지역을 선택하세요"
  variant="error"
  errorMessage="지역을 반드시 선택해야 합니다"
  required
  value=""
  onChange={handleChange}
/>`,
      },
    },
  },
};

export const Disabled = {
  args: {
    label: "비활성화된 선택 필드",
    options: defaultOptions,
    placeholder: "선택할 수 없습니다",
    disabled: true,
    onChange: action("disabled-change"),
  },
  parameters: {
    docs: {
      source: {
        code: `<SelectField
  label="비활성화된 선택 필드"
  options={options}
  placeholder="선택할 수 없습니다"
  disabled
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
        width: "300px",
      }}>
      <SelectField
        size="small"
        label="Small"
        options={defaultOptions}
        placeholder="Small 크기"
        onChange={action("small-change")}
      />
      <SelectField
        size="medium"
        label="Medium"
        options={defaultOptions}
        placeholder="Medium 크기"
        onChange={action("medium-change")}
      />
      <SelectField
        size="large"
        label="Large"
        options={defaultOptions}
        placeholder="Large 크기"
        onChange={action("large-change")}
      />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SelectField size="small" options={options} placeholder="Small 크기" />
<SelectField size="medium" options={options} placeholder="Medium 크기" />
<SelectField size="large" options={options} placeholder="Large 크기" />`,
      },
    },
  },
};

export const Variants = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "300px",
      }}>
      <SelectField
        variant="default"
        label="Default"
        options={defaultOptions}
        placeholder="Default variant"
        onChange={action("default-change")}
      />
      <SelectField
        variant="primary"
        label="Primary"
        options={defaultOptions}
        placeholder="Primary variant"
        onChange={action("primary-change")}
      />
      <SelectField
        variant="secondary"
        label="Secondary"
        options={defaultOptions}
        placeholder="Secondary variant"
        onChange={action("secondary-change")}
      />
      <SelectField
        variant="success"
        label="Success"
        options={defaultOptions}
        placeholder="Success variant"
        onChange={action("success-change")}
      />
      <SelectField
        variant="error"
        label="Error"
        options={defaultOptions}
        placeholder="Error variant"
        onChange={action("error-change")}
      />
      <SelectField
        variant="warning"
        label="Warning"
        options={defaultOptions}
        placeholder="Warning variant"
        onChange={action("warning-change")}
      />
      <SelectField
        variant="info"
        label="Info"
        options={defaultOptions}
        placeholder="Info variant"
        onChange={action("info-change")}
      />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SelectField variant="default" options={options} placeholder="Default variant" />
<SelectField variant="primary" options={options} placeholder="Primary variant" />
<SelectField variant="secondary" options={options} placeholder="Secondary variant" />
<SelectField variant="success" options={options} placeholder="Success variant" />
<SelectField variant="error" options={options} placeholder="Error variant" />
<SelectField variant="warning" options={options} placeholder="Warning variant" />
<SelectField variant="info" options={options} placeholder="Info variant" />`,
      },
    },
  },
};

export const WithDisabledOptions = {
  args: {
    label: "상태",
    options: [
      { value: "active", label: "활성" },
      { value: "inactive", label: "비활성" },
      { value: "pending", label: "대기중", disabled: true },
      { value: "archived", label: "보관됨", disabled: true },
    ],
    placeholder: "상태를 선택하세요",
    onChange: action("status-change"),
  },
  parameters: {
    docs: {
      source: {
        code: `<SelectField
  label="상태"
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

export const AllowClear = {
  args: {
    label: "테마",
    options: [
      { value: "light", label: "라이트" },
      { value: "dark", label: "다크" },
      { value: "auto", label: "자동" },
    ],
    placeholder: "테마를 선택하세요",
    allowClear: true,
    onChange: action("theme-change"),
  },
  parameters: {
    docs: {
      source: {
        code: `<SelectField
  label="테마"
  options={options}
  placeholder="테마를 선택하세요"
  allowClear
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          width: "300px",
        }}>
        <SelectField
          label="프레임워크"
          options={options}
          value={value}
          placeholder="프레임워크를 선택하세요"
          onChange={(e) => setValue(e.target.value)}
        />
        <div style={{ fontSize: fontSize.sm, color: colors.gray[500] }}>
          선택된 값: {value || "없음"}
        </div>
        <button
          onClick={() => setValue("")}
          style={{
            padding: "8px 16px",
            border: `1px solid ${colors.border.default}`,
            borderRadius: "4px",
            backgroundColor: colors.background.white,
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
    step: any;
  }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox");
    const resetButton = canvas.getByRole("button", { name: "선택 초기화" });

    await new Promise((resolve) => setTimeout(resolve, 500));

    await step("프레임워크 선택", async () => {
      await userEvent.selectOptions(select, "react");
    });

    await new Promise((resolve) => setTimeout(resolve, 1200));

    await step("다른 프레임워크 선택", async () => {
      await userEvent.selectOptions(select, "vue");
    });

    await new Promise((resolve) => setTimeout(resolve, 1200));

    await step("선택 초기화", async () => {
      await userEvent.click(resetButton);
    });
  },
  parameters: {
    docs: {
      source: {
        code: `import { colors } from "../theme";

const [value, setValue] = useState("");

<SelectField
  label="프레임워크"
  options={options}
  value={value}
  placeholder="프레임워크를 선택하세요"
  onChange={(e) => setValue(e.target.value)}
/>

<div style={{ fontSize: "14px", color: colors.gray[500] }}>
  선택된 값: {value || "없음"}
</div>
<button onClick={() => setValue("")}>
  선택 초기화
</button>`,
      },
    },
  },
};
