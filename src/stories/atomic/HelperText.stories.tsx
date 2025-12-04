import React from "react";
import { HelperText, BaseInput, Label } from "../../components";
import { colors } from "../../tokens";

export default {
  title: "Components/Atomic/HelperText",
  component: HelperText,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "폼 필드에 대한 설명이나 도움말을 제공하는 텍스트 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      description: "도움말 텍스트",
      control: "text",
    },
    show: {
      control: "boolean",
      description: "텍스트 표시 여부",
    },
  },
};

export const Default = {
  args: {
    children: "이 필드에 대한 도움말입니다",
    show: true,
  },
  decorators: [
    (Story: any) => (
      <div style={{ padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      source: {
        code: `<HelperText>이 필드에 대한 도움말입니다</HelperText>`,
      },
    },
  },
};

export const Hidden = {
  args: {
    children: "보이지 않는 도움말",
    show: false,
  },
  decorators: [
    (Story: any) => (
      <div style={{ padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      source: {
        code: `<HelperText show={false}>보이지 않는 도움말</HelperText>`,
      },
    },
  },
};

export const Various = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-start" }}>
      <HelperText>8자 이상, 영문+숫자 조합으로 입력하세요</HelperText>
      <HelperText>선택사항입니다. 나중에 변경할 수 있습니다</HelperText>
      <HelperText>이 정보는 공개되지 않습니다</HelperText>
      <HelperText>최대 100글자까지 입력 가능합니다</HelperText>
      <HelperText>형식: YYYY-MM-DD</HelperText>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<HelperText>8자 이상, 영문+숫자 조합으로 입력하세요</HelperText>
<HelperText>선택사항입니다. 나중에 변경할 수 있습니다</HelperText>
<HelperText>이 정보는 공개되지 않습니다</HelperText>
<HelperText>최대 100글자까지 입력 가능합니다</HelperText>
<HelperText>형식: YYYY-MM-DD</HelperText>`,
      },
    },
  },
};

export const WithFormControl = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px", width: "300px" }}>
      <Label htmlFor="password-input" required>
        비밀번호
      </Label>
      <BaseInput
        id="password-input"
        type="password"
        placeholder="비밀번호를 입력하세요"
      />
      <HelperText>
        8자 이상, 영문 대소문자, 숫자, 특수문자를 포함해야 합니다
      </HelperText>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Label htmlFor="password-input" required>비밀번호</Label>
<BaseInput
  id="password-input"
  type="password"
  placeholder="비밀번호를 입력하세요"
/>
<HelperText>
  8자 이상, 영문 대소문자, 숫자, 특수문자를 포함해야 합니다
</HelperText>`,
      },
    },
  },
};

export const FormExample = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "300px" }}>
      <div>
        <Label htmlFor="username-input" required>
          사용자 이름
        </Label>
        <BaseInput
          id="username-input"
          placeholder="사용자 이름을 입력하세요"
        />
        <HelperText>
          3-20자, 영문자와 숫자만 사용 가능합니다
        </HelperText>
      </div>

      <div>
        <Label htmlFor="email-input" required>
          이메일 주소
        </Label>
        <BaseInput
          id="email-input"
          type="email"
          placeholder="이메일을 입력하세요"
        />
        <HelperText>
          계정 인증 및 알림 수신에 사용됩니다
        </HelperText>
      </div>

      <div>
        <Label htmlFor="bio-input">
          자기소개
        </Label>
        <BaseInput
          id="bio-input"
          placeholder="간단한 자기소개를 입력하세요"
        />
        <HelperText>
          선택사항입니다. 최대 200자까지 입력 가능합니다
        </HelperText>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<div>
  <Label htmlFor="username-input" required>사용자 이름</Label>
  <BaseInput id="username-input" placeholder="사용자 이름을 입력하세요" />
  <HelperText>3-20자, 영문자와 숫자만 사용 가능합니다</HelperText>
</div>

<div>
  <Label htmlFor="email-input" required>이메일 주소</Label>
  <BaseInput id="email-input" type="email" placeholder="이메일을 입력하세요" />
  <HelperText>계정 인증 및 알림 수신에 사용됩니다</HelperText>
</div>

<div>
  <Label htmlFor="bio-input">자기소개</Label>
  <BaseInput id="bio-input" placeholder="간단한 자기소개를 입력하세요" />
  <HelperText>선택사항입니다. 최대 200자까지 입력 가능합니다</HelperText>
</div>`,
      },
    },
  },
};

export const ConditionalDisplay = {
  render: () => {
    const [showHelper, setShowHelper] = React.useState(true);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "300px" }}>
        <div>
          <Label>설정 옵션</Label>
          <BaseInput placeholder="설정 값을 입력하세요" />
          <HelperText show={showHelper}>
            이 설정은 즉시 적용되며, 언제든 변경할 수 있습니다
          </HelperText>
        </div>

        <button
          onClick={() => setShowHelper(!showHelper)}
          style={{
            padding: "8px 16px",
            border: `1px solid ${colors.border.default}`,
            borderRadius: "4px",
            backgroundColor: colors.background.white,
            cursor: "pointer",
          }}>
          {showHelper ? "도움말 숨기기" : "도움말 표시"}
        </button>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `import { colors } from "../../tokens";

const [showHelper, setShowHelper] = useState(true);

<div>
  <Label>설정 옵션</Label>
  <BaseInput placeholder="설정 값을 입력하세요" />
  <HelperText show={showHelper}>
    이 설정은 즉시 적용되며, 언제든 변경할 수 있습니다
  </HelperText>
</div>

<button
  onClick={() => setShowHelper(!showHelper)}
  style={{
    padding: "8px 16px",
    border: \`1px solid \${colors.border.default}\`,
    borderRadius: "4px",
    backgroundColor: colors.background.white,
    cursor: "pointer"
  }}
>
  {showHelper ? "도움말 숨기기" : "도움말 표시"}
</button>`,
      },
    },
  },
};
