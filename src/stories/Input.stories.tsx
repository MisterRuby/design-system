import React from "react";
import { Input } from "../components/atomic/Input";
import { action } from "./actions";
import { within, userEvent } from "@storybook/testing-library";
import type { StepFunction } from "@storybook/types";

export default {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "다양한 타입과 상태를 지원하는 입력 필드 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url", "search"],
      description: "입력 필드의 타입",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "입력 필드의 크기",
    },
    variant: {
      control: "select",
      options: ["default", "primary", "secondary", "success", "error", "warning", "info"],
      description: "입력 필드의 시각적 상태",
    },
    disabled: {
      control: "boolean",
      description: "입력 필드 비활성화 여부",
    },
    required: {
      control: "boolean",
      description: "필수 입력 여부",
    },
    readOnly: {
      control: "boolean",
      description: "읽기 전용 여부",
    },
    placeholder: {
      description: "입력 필드에 표시될 힌트 텍스트",
    },
    label: {
      description: "입력 필드의 라벨",
    },
    helperText: {
      description: "입력 필드 하단에 표시될 도움말 텍스트",
    },
    errorMessage: {
      description: "오류 상태일 때 표시될 메시지",
    },
    icon: {
      control: "select",
      options: [
        undefined,
        "search",
        "user",
        "mail",
        "phone",
        "lock",
        "unlock",
        "eye",
        "eye-off",
      ],
      description: "입력 필드에 표시할 아이콘",
    },
    iconPosition: {
      control: "select",
      options: ["left", "right"],
      description: "아이콘의 위치",
    },
  },
};

export const Default = {
  args: {
    placeholder: "텍스트를 입력하세요",
    onChange: action("input-change"),
    onFocus: action("input-focus"),
    onBlur: action("input-blur"),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const input = canvasElement.querySelector("input");
    if (input) {
      // 기본 포커스 테스트
      input.focus();
      setTimeout(() => {
        input.blur();
      }, 1500);
    }
  },
  parameters: {
    docs: {
      source: {
        code: `<Input placeholder="텍스트를 입력하세요" />`,
      },
    },
  },
};

export const WithLabel = {
  args: {
    label: "이름",
    placeholder: "이름을 입력하세요",
  },
  parameters: {
    docs: {
      source: {
        code: `<Input label="이름" placeholder="이름을 입력하세요" />`,
      },
    },
  },
};

export const Required = {
  args: {
    label: "이메일",
    type: "email",
    placeholder: "example@email.com",
    required: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<Input
  label="이메일"
  type="email"
  placeholder="example@email.com"
  required
/>`,
      },
    },
  },
};

export const WithHelperText = {
  args: {
    label: "비밀번호",
    type: "password",
    placeholder: "비밀번호를 입력하세요",
    helperText: "8자 이상, 영문+숫자 조합",
  },
  parameters: {
    docs: {
      source: {
        code: `<Input
  label="비밀번호"
  type="password"
  placeholder="비밀번호를 입력하세요"
  helperText="8자 이상, 영문+숫자 조합"
/>`,
      },
    },
  },
};

export const ErrorState = {
  render: () => {
    const [value, setValue] = React.useState("");
    const [variant, setVariant] = React.useState<
      "default" | "primary" | "secondary" | "success" | "error" | "warning" | "info"
    >("default");
    const [errorMessage, setErrorMessage] = React.useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      action("email-change")(e);

      // 입력 중에는 에러 상태 제거 (사용자가 수정 중)
      if (variant === "error") {
        setVariant("default");
        setErrorMessage("");
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      action("email-blur")(e);

      // 빈 값이면 기본 상태
      if (!inputValue) {
        setVariant("default");
        setErrorMessage("");
        return;
      }

      // 입력 완료 후 유효성 검사
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(inputValue)) {
        setVariant("error");
        setErrorMessage("유효한 이메일 주소를 입력해주세요");
      } else {
        setVariant("success");
        setErrorMessage("");
      }
    };

    return (
      <Input
        label="이메일"
        type="email"
        placeholder="example@email.com"
        variant={variant}
        errorMessage={errorMessage}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        style={{ width: "300px" }}
      />
    );
  },
  play: async ({
    canvasElement,
    step,
  }: {
    canvasElement: HTMLElement;
    step: StepFunction;
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("이메일");

    await step("잘못된 이메일 입력", async () => {
      await userEvent.click(input);
      await userEvent.type(input, "invalid-email", { delay: 50 });
    });

    await step("포커스 해제로 에러 상태 확인", async () => {
      await userEvent.tab(); // 포커스 해제로 blur 이벤트 발생
    });
  },
  parameters: {
    docs: {
      source: {
        code: `// 입력 완료 후 유효성 검사 예시
const [value, setValue] = useState('');
const [variant, setVariant] = useState('default');
const [errorMessage, setErrorMessage] = useState('');

const handleChange = (e) => {
  setValue(e.target.value);

  // 입력 중에는 에러 상태 제거 (사용자가 수정 중)
  if (variant === 'error') {
    setVariant('default');
    setErrorMessage('');
  }
};

const handleBlur = (e) => {
  const inputValue = e.target.value;

  if (!inputValue) {
    setVariant('default');
    setErrorMessage('');
    return;
  }

  // 입력 완료 후 유효성 검사
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!emailRegex.test(inputValue)) {
    setVariant('error');
    setErrorMessage('유효한 이메일 주소를 입력해주세요');
  } else {
    setVariant('success');
    setErrorMessage('');
  }
};

<Input
  label="이메일"
  type="email"
  variant={variant}
  errorMessage={errorMessage}
  value={value}
  onChange={handleChange}
  onBlur={handleBlur}
/>`,
      },
    },
  },
};

export const SuccessState = {
  render: () => {
    const [value, setValue] = React.useState("");
    const [variant, setVariant] = React.useState<
      "default" | "primary" | "secondary" | "success" | "error" | "warning" | "info"
    >("default");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      action("email-change")(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      action("email-blur")(e);

      if (!inputValue) {
        setVariant("default");
        return;
      }

      // 올바른 이메일 형식 검사
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(inputValue)) {
        setVariant("success");
      } else {
        setVariant("default");
      }
    };

    return (
      <Input
        label="이메일"
        type="email"
        placeholder="example@email.com"
        variant={variant}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        style={{ width: "300px" }}
      />
    );
  },
  play: async ({
    canvasElement,
    step,
  }: {
    canvasElement: HTMLElement;
    step: StepFunction;
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("이메일");

    await step("올바른 이메일 입력", async () => {
      await userEvent.click(input);
      await userEvent.type(input, "user@example.com", { delay: 50 });
    });

    await step("포커스 해제로 성공 상태 확인", async () => {
      await userEvent.tab(); // 포커스 해제로 blur 이벤트 발생
    });
  },
  parameters: {
    docs: {
      source: {
        code: `// 성공 상태 표시 예시
const [value, setValue] = useState('');
const [variant, setVariant] = useState('default');

const handleBlur = (e) => {
  const inputValue = e.target.value;
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

  if (emailRegex.test(inputValue)) {
    setVariant('success');
  }
};

<Input
  label="이메일"
  type="email"
  variant={variant}
  value={value}
  onChange={handleChange}
  onBlur={handleBlur}
/>`,
      },
    },
  },
};

export const Disabled = {
  args: {
    label: "비활성화된 입력 필드",
    placeholder: "입력할 수 없습니다",
    disabled: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<Input
  label="비활성화된 입력 필드"
  placeholder="입력할 수 없습니다"
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
      <Input size="small" placeholder="Small 크기" label="Small" />
      <Input size="medium" placeholder="Medium 크기" label="Medium" />
      <Input size="large" placeholder="Large 크기" label="Large" />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Input size="small" placeholder="Small 크기" />
<Input size="medium" placeholder="Medium 크기" />
<Input size="large" placeholder="Large 크기" />`,
      },
    },
  },
};

export const Types = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "300px",
      }}>
      <Input type="text" placeholder="텍스트" label="Text" />
      <Input type="email" placeholder="이메일" label="Email" />
      <Input type="password" placeholder="비밀번호" label="Password" />
      <Input type="number" placeholder="숫자" label="Number" />
      <Input type="search" placeholder="검색" label="Search" />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Input type="text" placeholder="텍스트" />
<Input type="email" placeholder="이메일" />
<Input type="password" placeholder="비밀번호" />
<Input type="number" placeholder="숫자" />
<Input type="search" placeholder="검색" />`,
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
      <Input variant="default" placeholder="Default variant" label="Default" />
      <Input variant="primary" placeholder="Primary variant" label="Primary" />
      <Input variant="secondary" placeholder="Secondary variant" label="Secondary" />
      <Input variant="success" placeholder="Success variant" label="Success" />
      <Input variant="error" placeholder="Error variant" label="Error" />
      <Input variant="warning" placeholder="Warning variant" label="Warning" />
      <Input variant="info" placeholder="Info variant" label="Info" />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Input variant="default" placeholder="Default variant" />
<Input variant="primary" placeholder="Primary variant" />
<Input variant="secondary" placeholder="Secondary variant" />
<Input variant="success" placeholder="Success variant" />
<Input variant="error" placeholder="Error variant" />
<Input variant="warning" placeholder="Warning variant" />
<Input variant="info" placeholder="Info variant" />`,
      },
    },
  },
};

export const Icons = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "300px",
      }}>
      <Input
        icon="search"
        placeholder="검색..."
        label="검색"
        onChange={action("search-change")}
      />
      <Input
        icon="mail"
        type="email"
        placeholder="이메일 주소"
        label="이메일"
        onChange={action("email-change")}
      />
      <Input
        icon="phone"
        type="tel"
        placeholder="전화번호"
        label="전화번호"
        onChange={action("phone-change")}
      />
      <Input
        icon="lock"
        type="password"
        placeholder="비밀번호"
        label="비밀번호"
        onChange={action("password-change")}
      />
      <Input
        icon="user"
        iconPosition="right"
        placeholder="사용자명"
        label="사용자명"
        onChange={action("username-change")}
      />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Input icon="search" placeholder="검색..." />
<Input icon="mail" type="email" placeholder="이메일 주소" />
<Input icon="phone" type="tel" placeholder="전화번호" />
<Input icon="lock" type="password" placeholder="비밀번호" />
<Input icon="user" iconPosition="right" placeholder="사용자명" />`,
      },
    },
  },
};
