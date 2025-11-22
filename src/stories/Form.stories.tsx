import { Form } from '../components/organisms/Form';
import type { FormField } from '../components/organisms/Form';
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
        component: '다양한 입력 필드를 조합해서 폼을 구성할 수 있는 컴포넌트입니다. 로그인, 회원가입, 설문조사 등 다양한 폼을 구성할 수 있습니다.',
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
    onSubmit: {
      description: '폼 제출 시 호출되는 함수',
      action: 'form-submitted',
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
      icon: 'mail',
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
      icon: 'lock',
    },
  },
  {
    id: 'remember',
    type: 'checkbox',
    label: '로그인 정보 기억하기',
    props: {},
  },
];

export const LoginForm = {
  args: {
    title: '로그인',
    description: '계정 정보를 입력하여 로그인해주세요.',
    fields: loginFields,
    submitButton: {
      text: '로그인',
      variant: 'primary',
    },
    onSubmit: action('login-submitted'),
  },
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: Step }) => {
    const canvas = within(canvasElement);

    await step('이메일 입력 테스트', async () => {
      const emailInput = canvas.getByLabelText(/이메일/);
      await userEvent.type(emailInput, 'user@example.com', { delay: 100 });
      await new Promise(resolve => setTimeout(resolve, 500));
    });

    await step('비밀번호 입력 테스트', async () => {
      const passwordInput = canvas.getByLabelText(/비밀번호/);
      await userEvent.type(passwordInput, 'password123', { delay: 100 });
      await new Promise(resolve => setTimeout(resolve, 500));
    });

    await step('로그인 정보 기억하기 체크박스 클릭', async () => {
      const checkbox = canvas.getByLabelText('로그인 정보 기억하기');
      await userEvent.click(checkbox);
      await new Promise(resolve => setTimeout(resolve, 500));
    });

    await step('로그인 버튼 클릭', async () => {
      const submitButton = canvas.getByRole('button', { name: /로그인/ });
      await userEvent.click(submitButton);
      await new Promise(resolve => setTimeout(resolve, 300));
    });
  },
};

export const RegistrationForm = {
  args: {
    title: '회원가입',
    description: '새 계정을 만들어보세요.',
    fields: [
      {
        id: 'name',
        type: 'input',
        label: '이름',
        required: true,
        props: {
          type: 'text',
          placeholder: '이름을 입력하세요',
          icon: 'user',
        },
      },
      {
        id: 'email',
        type: 'input',
        label: '이메일',
        required: true,
        props: {
          type: 'email',
          placeholder: 'user@example.com',
          icon: 'mail',
        },
      },
      {
        id: 'password',
        type: 'input',
        label: '비밀번호',
        required: true,
        props: {
          type: 'password',
          placeholder: '6자 이상 입력하세요',
          icon: 'lock',
        },
      },
      {
        id: 'terms',
        type: 'checkbox',
        label: '이용약관에 동의합니다',
        required: true,
        props: {
          color: 'primary',
        },
      },
    ],
    submitButton: {
      text: '회원가입',
      variant: 'success',
    },
    resetButton: {
      text: '초기화',
      variant: 'outline',
    },
    onSubmit: action('registration-submitted'),
  },
};

export const SimpleForm = {
  args: {
    title: '간단한 폼',
    fields: [
      {
        id: 'name',
        type: 'input',
        label: '이름',
        required: true,
        props: {
          type: 'text',
          placeholder: '이름을 입력하세요',
        },
      },
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
    ],
    submitButton: {
      text: '제출',
      variant: 'primary',
    },
    onSubmit: action('simple-form-submitted'),
  },
};