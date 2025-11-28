import React from "react";
import { within, userEvent } from "@storybook/testing-library";
import { Toggle } from "../../components";
import { colors, componentBorders, fontSize } from "../../theme";
import { action } from "../actions";

export default {
  title: "Components/Atomic/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "사용자가 옵션을 켜고 끌 수 있는 토글 스위치 컴포넌트입니다.",
      },
      story: {
        inline: true,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "토글 스위치 크기",
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "success", "error", "warning", "info"],
      description: "토글 스위치 색상",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 여부",
    },
    checked: {
      control: "boolean",
      description: "체크 상태 (제어 모드)",
    },
    defaultChecked: {
      control: "boolean",
      description: "기본 체크 상태 (비제어 모드)",
    },
    label: {
      description: "토글 스위치 라벨",
    },
    helperText: {
      description: "도움말 텍스트",
    },
    errorMessage: {
      description: "오류 상태일 때 표시될 메시지",
    },
  },
};

export const Default = {
  args: {
    onChange: action("toggle-change"),
    onFocus: action("toggle-focus"),
    onBlur: action("toggle-blur"),
  },
  play: async ({
    canvasElement,
    step,
  }: {
    canvasElement: HTMLElement;
    step: any;
  }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole("checkbox");

    await step("토글 켜기", async () => {
      await userEvent.click(toggle);
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await step("토글 끄기", async () => {
      await userEvent.click(toggle);
    });
  },
  parameters: {
    docs: {
      source: {
        code: `<Toggle onChange={handleToggle} />`,
      },
    },
  },
};

export const WithLabel = {
  args: {
    label: "알림 받기",
    onChange: action("notification-toggle"),
  },
  parameters: {
    docs: {
      source: {
        code: `<Toggle
  label="알림 받기"
  onChange={handleToggle}
/>`,
      },
    },
  },
};

export const WithHelperText = {
  args: {
    label: "다크 모드",
    helperText: "시스템 외관을 어둡게 변경합니다.",
    onChange: action("dark-mode-toggle"),
  },
  parameters: {
    docs: {
      source: {
        code: `<Toggle
  label="다크 모드"
  helperText="시스템 외관을 어둡게 변경합니다."
  onChange={handleToggle}
/>`,
      },
    },
  },
};

export const DefaultChecked = {
  args: {
    label: "자동 저장",
    defaultChecked: true,
    onChange: action("auto-save-toggle"),
  },
  parameters: {
    docs: {
      source: {
        code: `<Toggle
  label="자동 저장"
  defaultChecked
  onChange={handleToggle}
/>`,
      },
    },
  },
};

export const ErrorState = {
  render: () => {
    const [isAgreed, setIsAgreed] = React.useState(false);

    return (
      <Toggle
        label="이용약관 동의"
        checked={isAgreed}
        errorMessage={!isAgreed ? "이용약관에 동의해주세요." : undefined}
        onChange={(e) => {
          setIsAgreed(e.target.checked);
          action("terms-toggle")(e);
        }}
      />
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
    const toggle = canvas.getByRole("checkbox");

    await step("약관 동의", async () => {
      await userEvent.click(toggle);
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await step("동의 취소", async () => {
      await userEvent.click(toggle);
    });
  },
  parameters: {
    docs: {
      source: {
        code: `const [isAgreed, setIsAgreed] = useState(false);

<Toggle
  label="이용약관 동의"
  checked={isAgreed}
  errorMessage={!isAgreed ? "이용약관에 동의해주세요." : undefined}
  onChange={(e) => setIsAgreed(e.target.checked)}
/>`,
      },
    },
  },
};

export const Disabled = {
  args: {
    label: "비활성화된 토글",
    disabled: true,
    onChange: action("disabled-toggle"),
  },
  parameters: {
    docs: {
      source: {
        code: `<Toggle
  label="비활성화된 토글"
  disabled
  onChange={handleToggle}
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
        gap: "24px",
        width: "300px",
      }}>
      <Toggle
        label="Small"
        size="sm"
        onChange={action("small-toggle")}
      />
      <Toggle
        label="Medium"
        size="md"
        onChange={action("medium-toggle")}
      />
      <Toggle
        label="Large"
        size="lg"
        onChange={action("large-toggle")}
      />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Toggle size="sm" label="Small" onChange={handleToggle} />
<Toggle size="md" label="Medium" onChange={handleToggle} />
<Toggle size="lg" label="Large" onChange={handleToggle} />`,
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
        gap: "16px",
        width: "300px",
      }}>
      <Toggle
        label="Primary"
        color="primary"
        defaultChecked
        onChange={action("primary-toggle")}
      />
      <Toggle
        label="Secondary"
        color="secondary"
        defaultChecked
        onChange={action("secondary-toggle")}
      />
      <Toggle
        label="Success"
        color="success"
        defaultChecked
        onChange={action("success-toggle")}
      />
      <Toggle
        label="Error"
        color="error"
        defaultChecked
        onChange={action("error-toggle")}
      />
      <Toggle
        label="Warning"
        color="warning"
        defaultChecked
        onChange={action("warning-toggle")}
      />
      <Toggle
        label="Info"
        color="info"
        defaultChecked
        onChange={action("info-toggle")}
      />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Toggle color="primary" label="Primary" defaultChecked />
<Toggle color="secondary" label="Secondary" defaultChecked />
<Toggle color="success" label="Success" defaultChecked />
<Toggle color="error" label="Error" defaultChecked />
<Toggle color="warning" label="Warning" defaultChecked />
<Toggle color="info" label="Info" defaultChecked />`,
      },
    },
  },
};

export const ControlledExample = {
  render: () => {
    const [isEnabled, setIsEnabled] = React.useState(false);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          width: "300px",
        }}>
        <Toggle
          label="알림 설정"
          checked={isEnabled}
          onChange={(e) => setIsEnabled(e.target.checked)}
        />
        <div style={{ fontSize: fontSize.sm, color: colors.gray[500] }}>
          상태: {isEnabled ? "켜짐" : "꺼짐"}
        </div>
        <button
          onClick={() => setIsEnabled(!isEnabled)}
          style={{
            padding: "8px 16px",
            border: componentBorders.button.outline,
            borderRadius: "4px",
            backgroundColor: colors.background.white,
            cursor: "pointer",
          }}>
          토글 전환
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
    const toggle = canvas.getByRole("checkbox");
    const button = canvas.getByRole("button", { name: "토글 전환" });

    await step("토글로 켜기", async () => {
      await userEvent.click(toggle);
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await step("버튼으로 끄기", async () => {
      await userEvent.click(button);
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await step("버튼으로 켜기", async () => {
      await userEvent.click(button);
    });
  },
  parameters: {
    docs: {
      source: {
        code: `import { colors, componentBorders } from "../../theme";

const [isEnabled, setIsEnabled] = useState(false);

<Toggle
  label="알림 설정"
  checked={isEnabled}
  onChange={(e) => setIsEnabled(e.target.checked)}
/>

<div style={{ fontSize: "14px", color: colors.gray[500] }}>
  상태: {isEnabled ? "켜짐" : "꺼짐"}
</div>
<button
  onClick={() => setIsEnabled(!isEnabled)}
  style={{
    padding: "8px 16px",
    border: componentBorders.button.outline,
    borderRadius: "4px",
    backgroundColor: colors.background.white,
    cursor: "pointer"
  }}
>
  토글 전환
</button>`,
      },
    },
  },
};
