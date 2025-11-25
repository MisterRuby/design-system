import React from "react";
import { Label, BaseInput } from "../../components";

export default {
  title: "Components/Atomic/Label",
  component: Label,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "폼 필드와 함께 사용되는 라벨 컴포넌트입니다. 필수 필드 표시 기능을 포함합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    required: {
      control: "boolean",
      description: "필수 필드 표시 여부",
    },
    htmlFor: {
      description: "연결된 폼 요소의 ID",
    },
    children: {
      description: "라벨 텍스트",
    },
  },
};

export const Default = {
  args: {
    children: "기본 라벨",
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
        code: `<Label>기본 라벨</Label>`,
      },
    },
  },
};

export const Required = {
  args: {
    children: "필수 입력 항목",
    required: true,
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
        code: `<Label required>필수 입력 항목</Label>`,
      },
    },
  },
};

export const WithFormControl = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "300px" }}>
      <Label htmlFor="email-input" required>
        이메일 주소
      </Label>
      <BaseInput
        id="email-input"
        type="email"
        placeholder="example@email.com"
      />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Label htmlFor="email-input" required>
  이메일 주소
</Label>
<BaseInput
  id="email-input"
  type="email"
  placeholder="example@email.com"
/>`,
      },
    },
  },
};

export const Variants = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-start" }}>
      <Label>일반 라벨</Label>
      <Label required>필수 라벨</Label>
      <Label htmlFor="test-input">연결된 라벨</Label>
      <Label required htmlFor="test-input2">
        필수 + 연결된 라벨
      </Label>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Label>일반 라벨</Label>
<Label required>필수 라벨</Label>
<Label htmlFor="test-input">연결된 라벨</Label>
<Label required htmlFor="test-input2">필수 + 연결된 라벨</Label>`,
      },
    },
  },
};

export const FormExample = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "300px" }}>
      <div>
        <Label htmlFor="name-input" required>
          이름
        </Label>
        <BaseInput
          id="name-input"
          placeholder="이름을 입력하세요"
        />
      </div>

      <div>
        <Label htmlFor="email-input" required>
          이메일
        </Label>
        <BaseInput
          id="email-input"
          type="email"
          placeholder="이메일을 입력하세요"
        />
      </div>

      <div>
        <Label htmlFor="phone-input">
          전화번호 (선택)
        </Label>
        <BaseInput
          id="phone-input"
          type="tel"
          placeholder="전화번호를 입력하세요"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<div>
  <Label htmlFor="name-input" required>이름</Label>
  <BaseInput id="name-input" placeholder="이름을 입력하세요" />
</div>

<div>
  <Label htmlFor="email-input" required>이메일</Label>
  <BaseInput id="email-input" type="email" placeholder="이메일을 입력하세요" />
</div>

<div>
  <Label htmlFor="phone-input">전화번호 (선택)</Label>
  <BaseInput id="phone-input" type="tel" placeholder="전화번호를 입력하세요" />
</div>`,
      },
    },
  },
};