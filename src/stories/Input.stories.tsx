import React from 'react';
import { Input } from '../components/atomic/Input';

export default {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '다양한 타입과 상태를 지원하는 입력 필드 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: '입력 필드의 타입',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '입력 필드의 크기',
    },
    variant: {
      control: 'select',
      options: ['default', 'error', 'success'],
      description: '입력 필드의 시각적 상태',
    },
    disabled: {
      control: 'boolean',
      description: '입력 필드 비활성화 여부',
    },
    required: {
      control: 'boolean',
      description: '필수 입력 여부',
    },
    readOnly: {
      control: 'boolean',
      description: '읽기 전용 여부',
    },
    placeholder: {
      description: '입력 필드에 표시될 힌트 텍스트',
    },
    label: {
      description: '입력 필드의 라벨',
    },
    helperText: {
      description: '입력 필드 하단에 표시될 도움말 텍스트',
    },
    errorMessage: {
      description: '오류 상태일 때 표시될 메시지',
    },
    icon: {
      control: 'select',
      options: [undefined, 'search', 'user', 'mail', 'phone', 'lock', 'unlock', 'eye', 'eye-off'],
      description: '입력 필드에 표시할 아이콘',
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: '아이콘의 위치',
    },
  },
};

export const Default = {
  args: {
    placeholder: '텍스트를 입력하세요',
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
    label: '이름',
    placeholder: '이름을 입력하세요',
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
    label: '이메일',
    type: 'email',
    placeholder: 'example@email.com',
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
    label: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력하세요',
    helperText: '8자 이상, 영문+숫자 조합',
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
  args: {
    label: '이메일',
    type: 'email',
    placeholder: 'example@email.com',
    variant: 'error',
    errorMessage: '유효한 이메일 주소를 입력해주세요',
    value: 'invalid-email',
  },
  parameters: {
    docs: {
      source: {
        code: `<Input
  label="이메일"
  type="email"
  variant="error"
  errorMessage="유효한 이메일 주소를 입력해주세요"
  value="invalid-email"
/>`,
      },
    },
  },
};

export const SuccessState = {
  args: {
    label: '이메일',
    type: 'email',
    placeholder: 'example@email.com',
    variant: 'success',
    value: 'user@example.com',
  },
  parameters: {
    docs: {
      source: {
        code: `<Input
  label="이메일"
  type="email"
  variant="success"
  value="user@example.com"
/>`,
      },
    },
  },
};

export const Disabled = {
  args: {
    label: '비활성화된 입력 필드',
    placeholder: '입력할 수 없습니다',
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
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

export const WithIcon = {
  args: {
    label: '검색',
    placeholder: '검색어를 입력하세요',
    icon: 'search',
  },
  parameters: {
    docs: {
      source: {
        code: `<Input icon="search" placeholder="검색어를 입력하세요" />`,
      },
    },
  },
};

export const IconRight = {
  args: {
    label: '사용자',
    placeholder: '사용자명을 입력하세요',
    icon: 'user',
    iconPosition: 'right',
  },
  parameters: {
    docs: {
      source: {
        code: `<Input icon="user" iconPosition="right" placeholder="사용자명을 입력하세요" />`,
      },
    },
  },
};

export const IconExamples = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Input icon="search" placeholder="검색..." label="검색" />
      <Input icon="mail" type="email" placeholder="이메일 주소" label="이메일" />
      <Input icon="phone" type="tel" placeholder="전화번호" label="전화번호" />
      <Input icon="lock" type="password" placeholder="비밀번호" label="비밀번호" />
      <Input icon="user" iconPosition="right" placeholder="사용자명" label="사용자명" />
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