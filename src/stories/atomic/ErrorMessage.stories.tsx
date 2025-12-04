import React from "react";
import { ErrorMessage, BaseInput, Label } from "../../components";
import {
  borderRadius,
  colors,
  componentBorders,
  semanticSpacing,
  spacing,
} from "../../tokens";

export default {
  title: "Components/Atomic/ErrorMessage",
  component: ErrorMessage,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "폼 필드의 오류 상태를 표시하는 메시지 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      description: "오류 메시지 텍스트",
      control: "text",
    },
    show: {
      control: "boolean",
      description: "메시지 표시 여부",
    },
  },
};

export const Default = {
  args: {
    children: "이 필드는 필수입니다",
    show: true,
  },
  decorators: [
    (Story: any) => (
      <div style={{ padding: spacing.lg }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      source: {
        code: `<ErrorMessage>이 필드는 필수입니다</ErrorMessage>`,
      },
    },
  },
};

export const Hidden = {
  args: {
    children: "보이지 않는 오류 메시지",
    show: false,
  },
  decorators: [
    (Story: any) => (
      <div style={{ padding: spacing.lg }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      source: {
        code: `<ErrorMessage show={false}>보이지 않는 오류 메시지</ErrorMessage>`,
      },
    },
  },
};

export const Various = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: spacing.xs,
        alignItems: "flex-start",
      }}>
      <ErrorMessage>필수 필드입니다</ErrorMessage>
      <ErrorMessage>유효한 이메일 주소를 입력해주세요</ErrorMessage>
      <ErrorMessage>비밀번호는 8자 이상이어야 합니다</ErrorMessage>
      <ErrorMessage>특수문자는 사용할 수 없습니다</ErrorMessage>
      <ErrorMessage>이미 사용 중인 아이디입니다</ErrorMessage>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<ErrorMessage>필수 필드입니다</ErrorMessage>
<ErrorMessage>유효한 이메일 주소를 입력해주세요</ErrorMessage>
<ErrorMessage>비밀번호는 8자 이상이어야 합니다</ErrorMessage>
<ErrorMessage>특수문자는 사용할 수 없습니다</ErrorMessage>
<ErrorMessage>이미 사용 중인 아이디입니다</ErrorMessage>`,
      },
    },
  },
};

export const WithFormControl = {
  render: () => {
    const [email, setEmail] = React.useState("");
    const [error, setError] = React.useState("");

    const handleBlur = () => {
      if (!email) {
        setError("이메일 주소를 입력해주세요");
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError("유효한 이메일 주소를 입력해주세요");
      } else {
        setError("");
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      if (error) {
        setError(""); // 입력 중에는 에러 초기화
      }
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: spacing.xxs,
          width: "300px",
        }}>
        <Label htmlFor="email-input" required>
          이메일 주소
        </Label>
        <BaseInput
          id="email-input"
          type="email"
          placeholder="이메일을 입력하세요"
          variant={error ? "error" : "default"}
          value={email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <ErrorMessage show={!!error}>
          {error}
        </ErrorMessage>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `const [email, setEmail] = useState("");
const [error, setError] = useState("");

const handleBlur = () => {
  if (!email) {
    setError("이메일 주소를 입력해주세요");
  } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
    setError("유효한 이메일 주소를 입력해주세요");
  } else {
    setError("");
  }
};

<div>
  <Label htmlFor="email-input" required>이메일 주소</Label>
  <BaseInput
    id="email-input"
    type="email"
    variant={error ? "error" : "default"}
    value={email}
    onChange={handleChange}
    onBlur={handleBlur}
  />
  <ErrorMessage show={!!error}>{error}</ErrorMessage>
</div>`,
      },
    },
  },
};

export const ConditionalDisplay = {
  render: () => {
    const [showError, setShowError] = React.useState(false);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: spacing.sm,
          width: "300px",
        }}>
        <div>
          <Label>사용자 입력 필드</Label>
          <BaseInput
            placeholder="무언가를 입력해보세요"
            variant={showError ? "error" : "default"}
          />
          <ErrorMessage show={showError}>
            입력 값이 유효하지 않습니다
          </ErrorMessage>
        </div>

        <button
          onClick={() => setShowError(!showError)}
          style={{
            padding: semanticSpacing.buttonPaddingMedium,
            border: componentBorders.button.outline,
            borderRadius: borderRadius.sm,
            backgroundColor: colors.background.white,
            cursor: "pointer",
          }}>
          {showError ? "에러 숨기기" : "에러 표시"}
        </button>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `import {
  borderRadius,
  colors,
  componentBorders,
  semanticSpacing,
} from "../../tokens";

const [showError, setShowError] = useState(false);

<div>
  <Label>사용자 입력 필드</Label>
  <BaseInput
    placeholder="무언가를 입력해보세요"
    variant={showError ? "error" : "default"}
  />
  <ErrorMessage show={showError}>
    입력 값이 유효하지 않습니다
  </ErrorMessage>
</div>

<button
  onClick={() => setShowError(!showError)}
  style={{
    padding: semanticSpacing.buttonPaddingMedium,
    border: componentBorders.button.outline,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.background.white,
    cursor: "pointer"
  }}
>
  {showError ? "에러 숨기기" : "에러 표시"}
</button>`,
      },
    },
  },
};
