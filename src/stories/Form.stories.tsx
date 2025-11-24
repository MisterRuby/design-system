import { Form, FormField } from '../components/organisms/Form';
import { action } from './actions';
import { within, userEvent } from '@storybook/testing-library';
import { Step } from './types';

export default {
  title: "Components/Organisms/Form",
  component: Form,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '다양한 필드 타입을 지원하는 폼 컴포넌트입니다. 유효성 검사, 에러 처리, 여러 레이아웃을 제공합니다.',
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      description: '폼의 제목',
      control: 'text',
    },
    description: {
      description: '폼의 설명',
      control: 'text',
    },
    fields: {
      description: '폼 필드들의 배열',
      control: false,
    },
    layout: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
      description: '필드 배치 방향',
    },
    fieldSpacing: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: '필드 간격 크기',
    },
    showRequiredIndicator: {
      control: 'boolean',
      description: '필수 항목 표시 여부',
    },
    onSubmit: {
      action: 'submitted',
      description: '폼 제출 시 호출되는 함수',
    },
    onReset: {
      action: 'reset',
      description: '폼 초기화 시 호출되는 함수',
    },
  },
};

const loginFields: FormField[] = [
  {
    id: 'email',
    type: 'input',
    label: '이메일',
    required: true,
    props: {
      type: 'email',
      placeholder: 'user@example.com',
    },
  },
  {
    id: 'password',
    type: 'input',
    label: '비밀번호',
    required: true,
    props: {
      type: 'password',
      placeholder: '비밀번호를 입력하세요',
    },
  },
  {
    id: 'remember',
    type: 'checkbox',
    label: '로그인 정보 기억하기',
    props: {
      label: '로그인 정보 기억하기',
    },
  },
];

const contactFormFields: FormField[] = [
  {
    id: 'name',
    type: 'input',
    label: '성명',
    required: true,
    props: {
      type: 'text',
      placeholder: '성명을 입력하세요',
    },
  },
  {
    id: 'email',
    type: 'input',
    label: '이메일',
    required: true,
    props: {
      type: 'email',
      placeholder: 'example@email.com',
    },
  },
  {
    id: 'subject',
    type: 'select',
    label: '문의 유형',
    required: true,
    props: {
      options: [
        { value: 'general', label: '일반 문의' },
        { value: 'support', label: '기술 지원' },
        { value: 'billing', label: '결제 관련' },
        { value: 'partnership', label: '제휴 문의' },
      ],
      placeholder: '문의 유형을 선택하세요',
    },
  },
  {
    id: 'priority',
    type: 'radio',
    label: '우선순위',
    required: true,
    props: {
      name: 'priority',
      options: [
        { value: 'low', label: '낮음' },
        { value: 'medium', label: '보통' },
        { value: 'high', label: '높음' },
      ],
    },
  },
];

export const Default = {
  args: {
    title: '로그인',
    description: '계정 정보를 입력하여 로그인해주세요.',
    fields: loginFields,
    submitButton: {
      text: '로그인',
      variant: 'primary',
    },
    onSubmit: action('login-submitted'),
    onReset: action('login-reset'),
  },
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: Step }) => {
    const canvas = within(canvasElement);

    await step('폼 필드 입력', async () => {
      const emailInput = canvas.getByLabelText(/이메일/);
      const passwordInput = canvas.getByLabelText(/비밀번호/);
      const checkbox = canvas.getByLabelText('로그인 정보 기억하기');

      await userEvent.type(emailInput, 'user@example.com');
      await userEvent.type(passwordInput, 'password123');
      await userEvent.click(checkbox);
    });

    await step('로그인 버튼 클릭', async () => {
      const submitButton = canvas.getByRole('button', { name: '로그인' });
      await userEvent.click(submitButton);
    });
  },
  parameters: {
    docs: {
      source: {
        code: `// 기본 로그인 폼 예시
const loginFields = [
  {
    id: 'email',
    type: 'input',
    label: '이메일',
    required: true,
    props: {
      type: 'email',
      placeholder: 'user@example.com',
    },
  },
  {
    id: 'password',
    type: 'input',
    label: '비밀번호',
    required: true,
    props: {
      type: 'password',
      placeholder: '비밀번호를 입력하세요',
    },
  },
  {
    id: 'remember',
    type: 'checkbox',
    label: '로그인 정보 기억하기',
    props: {
      label: '로그인 정보 기억하기',
    },
  },
];

function LoginForm() {
  const handleSubmit = (formData) => {
    console.log('폼 제출 데이터:', formData);
    // API 호출 등의 로직
  };

  return (
    <Form
      title="로그인"
      description="계정 정보를 입력하여 로그인해주세요."
      fields={loginFields}
      submitButton={{
        text: '로그인',
        variant: 'primary',
      }}
      onSubmit={handleSubmit}
    />
  );
}`,
      },
    },
  },
};

export const ContactForm = {
  args: {
    title: '고객 문의',
    description: '궁금한 사항이나 요청 사항을 아래 양식으로 보내주세요.',
    fields: contactFormFields,
    submitButton: {
      text: '문의하기',
      variant: 'primary',
    },
    resetButton: {
      text: '다시 작성',
      variant: 'outline',
    },
    onSubmit: action('contact-submitted'),
    onReset: action('contact-reset'),
  },
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: Step }) => {
    const canvas = within(canvasElement);

    await step('문의 폼 작성', async () => {
      const nameInput = canvas.getByLabelText(/성명/);
      const emailInput = canvas.getByLabelText(/이메일/);
      const subjectSelect = canvas.getByLabelText(/문의 유형/);
      const priorityRadio = canvas.getByLabelText('보통');

      await userEvent.type(nameInput, '이영희');
      await userEvent.type(emailInput, 'lee@company.com');
      await userEvent.selectOptions(subjectSelect, 'support');
      await userEvent.click(priorityRadio);
    });

    await step('폼 제출', async () => {
      const submitButton = canvas.getByRole('button', { name: '문의하기' });
      await userEvent.click(submitButton);
    });
  },
  parameters: {
    docs: {
      source: {
        code: `// 복잡한 문의 폼 예시 (select, radio 포함)
const contactFormFields = [
  {
    id: 'name',
    type: 'input',
    label: '성명',
    required: true,
    props: {
      type: 'text',
      placeholder: '성명을 입력하세요',
    },
  },
  {
    id: 'email',
    type: 'input',
    label: '이메일',
    required: true,
    props: {
      type: 'email',
      placeholder: 'example@email.com',
    },
  },
  {
    id: 'subject',
    type: 'select',
    label: '문의 유형',
    required: true,
    props: {
      options: [
        { value: 'general', label: '일반 문의' },
        { value: 'support', label: '기술 지원' },
        { value: 'billing', label: '결제 관련' },
        { value: 'partnership', label: '제휴 문의' },
      ],
      placeholder: '문의 유형을 선택하세요',
    },
  },
  {
    id: 'priority',
    type: 'radio',
    label: '우선순위',
    required: true,
    props: {
      name: 'priority',
      options: [
        { value: 'low', label: '낮음' },
        { value: 'medium', label: '보통' },
        { value: 'high', label: '높음' },
      ],
    },
  },
];

function ContactForm() {
  const handleSubmit = (formData) => {
    console.log('문의 데이터:', formData);
    // API로 문의사항 전송
  };

  const handleReset = () => {
    console.log('폼 초기화');
  };

  return (
    <Form
      title="고객 문의"
      description="궁금한 사항이나 요청 사항을 아래 양식으로 보내주세요."
      fields={contactFormFields}
      submitButton={{
        text: '문의하기',
        variant: 'primary',
      }}
      resetButton={{
        text: '다시 작성',
        variant: 'outline',
      }}
      onSubmit={handleSubmit}
      onReset={handleReset}
    />
  );
}`,
      },
    },
  },
};

export const HorizontalLayout = {
  args: {
    title: '가로 레이아웃 폼',
    fields: [
      {
        id: 'firstName',
        type: 'input',
        label: '이름',
        required: true,
        props: {
          type: 'text',
          placeholder: '이름',
        },
      },
      {
        id: 'lastName',
        type: 'input',
        label: '성',
        required: true,
        props: {
          type: 'text',
          placeholder: '성',
        },
      },
      {
        id: 'age',
        type: 'select',
        label: '연령대',
        props: {
          options: [
            { value: '20s', label: '20대' },
            { value: '30s', label: '30대' },
            { value: '40s', label: '40대' },
            { value: '50s', label: '50대 이상' },
          ],
          placeholder: '연령대 선택',
        },
      },
    ],
    layout: 'horizontal',
    onSubmit: action('horizontal-submit'),
  },
  parameters: {
    docs: {
      source: {
        code: `// 가로 레이아웃 폼 (한 줄에 여러 필드)
const horizontalFields = [
  {
    id: 'firstName',
    type: 'input',
    label: '이름',
    required: true,
    props: { type: 'text', placeholder: '이름' },
  },
  {
    id: 'lastName',
    type: 'input',
    label: '성',
    required: true,
    props: { type: 'text', placeholder: '성' },
  },
  {
    id: 'age',
    type: 'select',
    label: '연령대',
    props: {
      options: [
        { value: '20s', label: '20대' },
        { value: '30s', label: '30대' },
        { value: '40s', label: '40대' },
        { value: '50s', label: '50대 이상' },
      ],
      placeholder: '연령대 선택',
    },
  },
];

function HorizontalForm() {
  return (
    <Form
      title="가로 레이아웃 폼"
      fields={horizontalFields}
      layout="horizontal"  // 가로 배치
      onSubmit={(data) => console.log(data)}
    />
  );
}`,
      },
    },
  },
};

export const ValidationDemo = {
  args: {
    title: '유효성 검사 데모',
    description: '필수 항목을 비워두고 제출해보세요.',
    fields: [
      {
        id: 'email',
        type: 'input',
        label: '이메일',
        required: true,
        props: {
          type: 'email',
          placeholder: '올바른 이메일 형식을 입력하세요',
        },
      },
      {
        id: 'password',
        type: 'input',
        label: '비밀번호',
        required: true,
        props: {
          type: 'password',
          placeholder: '최소 6자 이상 입력하세요',
        },
      },
    ],
    onSubmit: action('validation-submit'),
  },
  parameters: {
    docs: {
      source: {
        code: `// 유효성 검사 기능이 있는 폼
const validationFields = [
  {
    id: 'email',
    type: 'input',
    label: '이메일',
    required: true,  // 필수 항목
    props: {
      type: 'email',  // 이메일 형식 검사
      placeholder: '올바른 이메일 형식을 입력하세요',
    },
  },
  {
    id: 'password',
    type: 'input',
    label: '비밀번호',
    required: true,  // 필수 항목
    props: {
      type: 'password',  // 최소 6자 검사
      placeholder: '최소 6자 이상 입력하세요',
    },
  },
];

function ValidationForm() {
  const handleSubmit = (formData) => {
    // 유효성 검사를 통과한 데이터만 여기서 받음
    console.log('검증된 데이터:', formData);
  };

  return (
    <Form
      title="유효성 검사 데모"
      description="필수 항목을 비워두고 제출해보세요."
      fields={validationFields}
      onSubmit={handleSubmit}
    />
  );
}

// 지원되는 유효성 검사:
// - required: true (필수 항목)
// - type: 'email' (이메일 형식)
// - type: 'password' (최소 6자)`,
      },
    },
  },
};

export const LoadingState = {
  args: {
    title: '제출 중...',
    fields: loginFields,
    submitButton: {
      text: '제출',
      loading: true,
      disabled: true,
    },
    onSubmit: action('loading-submit'),
  },
  parameters: {
    docs: {
      source: {
        code: `// 로딩 상태 폼 (제출 중 상태)
function LoadingForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    try {
      // API 호출
      await fetch('/api/submit', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error('제출 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form
      title="제출 중..."
      fields={loginFields}
      submitButton={{
        text: '제출',
        loading: isLoading,  // 로딩 상태
        disabled: isLoading, // 버튼 비활성화
      }}
      onSubmit={handleSubmit}
    />
  );
}`,
      },
    },
  },
};

// 추가 필드 스페이싱 예시
export const FieldSpacingExamples = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Form
        title="Small Spacing"
        fields={[
          { id: 'field1', type: 'input', label: 'Field 1', props: { type: 'text' } },
          { id: 'field2', type: 'input', label: 'Field 2', props: { type: 'text' } },
        ]}
        fieldSpacing="small"
        onSubmit={action('small-spacing')}
      />
      <Form
        title="Medium Spacing (기본값)"
        fields={[
          { id: 'field1', type: 'input', label: 'Field 1', props: { type: 'text' } },
          { id: 'field2', type: 'input', label: 'Field 2', props: { type: 'text' } },
        ]}
        fieldSpacing="medium"
        onSubmit={action('medium-spacing')}
      />
      <Form
        title="Large Spacing"
        fields={[
          { id: 'field1', type: 'input', label: 'Field 1', props: { type: 'text' } },
          { id: 'field2', type: 'input', label: 'Field 2', props: { type: 'text' } },
        ]}
        fieldSpacing="large"
        onSubmit={action('large-spacing')}
      />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `// 필드 간격 조절 옵션
<Form
  fields={fields}
  fieldSpacing="small"   // 작은 간격
  onSubmit={handleSubmit}
/>

<Form
  fields={fields}
  fieldSpacing="medium"  // 보통 간격 (기본값)
  onSubmit={handleSubmit}
/>

<Form
  fields={fields}
  fieldSpacing="large"   // 큰 간격
  onSubmit={handleSubmit}
/>`,
      },
    },
  },
};