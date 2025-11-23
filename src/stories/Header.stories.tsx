import { Header } from '../components/molecules/Header';
import { Button } from '../components/atomic/Button';
import { Text } from '../components/atomic/Text';
import { action } from './actions';
import { within, userEvent } from '@storybook/testing-library';
import { Step } from './types';

export default {
  title: "Components/Layout/Header",
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '웹사이트나 앱의 상단 헤더 컴포넌트입니다. 로고, 네비게이션, 액션 버튼 등을 포함할 수 있습니다.',
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'transparent', 'elevated'],
      description: '헤더의 스타일 변형',
    },
    height: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '헤더의 높이',
    },
    sticky: {
      control: 'boolean',
      description: '스크롤 시 헤더 고정 여부',
    },
    title: {
      control: 'text',
      description: '헤더 제목',
    },
  },
};

export const Default = {
  args: {
    title: 'My Website',
    variant: 'default',
    height: 'medium',
  },
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: Step }) => {
    const canvas = within(canvasElement);

    await step('헤더 표시 확인', async () => {
      const header = canvas.getByRole('banner');
      await userEvent.hover(header);
    });
  },
};

export const WithNavigation = {
  args: {
    title: 'Company',
    navigation: [
      { label: '홈', active: true, onClick: action('home-clicked') },
      { label: '서비스', onClick: action('services-clicked') },
      { label: '회사소개', onClick: action('about-clicked') },
      { label: '고객지원', onClick: action('support-clicked') },
      { label: '블로그', onClick: action('blog-clicked') },
    ],
    variant: 'default',
    height: 'medium',
  },
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: Step }) => {
    const canvas = within(canvasElement);

    await step('네비게이션 메뉴 클릭 테스트', async () => {
      const serviceLink = canvas.getByText('서비스');
      await userEvent.click(serviceLink);
      await new Promise(resolve => setTimeout(resolve, 300));
    });

    await step('다른 메뉴 클릭 테스트', async () => {
      const aboutLink = canvas.getByText('회사소개');
      await userEvent.click(aboutLink);
      await new Promise(resolve => setTimeout(resolve, 300));
    });
  },
};

export const WithActions = {
  args: {
    title: 'Dashboard',
    actions: (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button variant="outline" size="small" onClick={action('login-clicked')}>
          로그인
        </Button>
        <Button variant="primary" size="small" onClick={action('signup-clicked')}>
          회원가입
        </Button>
      </div>
    ),
    variant: 'default',
    height: 'medium',
  },
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: Step }) => {
    const canvas = within(canvasElement);

    await step('로그인 버튼 클릭', async () => {
      const loginButton = canvas.getByText('로그인');
      await userEvent.click(loginButton);
      await new Promise(resolve => setTimeout(resolve, 300));
    });

    await step('회원가입 버튼 클릭', async () => {
      const signupButton = canvas.getByText('회원가입');
      await userEvent.click(signupButton);
      await new Promise(resolve => setTimeout(resolve, 300));
    });
  },
};

export const CompleteHeader = {
  args: {
    logo: (
      <div style={{
        width: '32px',
        height: '32px',
        backgroundColor: '#2563eb',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text variant="body1" style={{ color: 'white', fontWeight: 'bold', margin: 0 }}>
          L
        </Text>
      </div>
    ),
    title: 'Logo Brand',
    navigation: [
      { label: '제품', active: true, onClick: action('products-clicked') },
      { label: '솔루션', onClick: action('solutions-clicked') },
      { label: '가격', onClick: action('pricing-clicked') },
      { label: '리소스', disabled: true },
    ],
    actions: (
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Text variant="body1" style={{ margin: 0 }}>사용자님</Text>
        <Button variant="outline" size="small" onClick={action('profile-clicked')}>
          프로필
        </Button>
      </div>
    ),
    variant: 'elevated',
    height: 'medium',
  },
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: Step }) => {
    const canvas = within(canvasElement);

    await step('로고 영역 호버', async () => {
      const logo = canvas.getByText('L');
      await userEvent.hover(logo);
      await new Promise(resolve => setTimeout(resolve, 300));
    });

    await step('활성 메뉴 확인', async () => {
      const activeMenu = canvas.getByText('제품');
      await userEvent.hover(activeMenu);
      await new Promise(resolve => setTimeout(resolve, 300));
    });

    await step('비활성 메뉴 클릭 시도', async () => {
      const disabledMenu = canvas.getByText('리소스');
      await userEvent.hover(disabledMenu);
      await new Promise(resolve => setTimeout(resolve, 300));
    });

    await step('프로필 버튼 클릭', async () => {
      const profileButton = canvas.getByText('프로필');
      await userEvent.click(profileButton);
      await new Promise(resolve => setTimeout(resolve, 300));
    });
  },
};

export const TransparentHeader = {
  args: {
    title: 'Minimal Site',
    navigation: [
      { label: 'Work', onClick: action('work-clicked') },
      { label: 'About', onClick: action('about-clicked') },
      { label: 'Contact', onClick: action('contact-clicked') },
    ],
    actions: (
      <Button variant="outline" size="small" onClick={action('menu-clicked')}>
        Menu
      </Button>
    ),
    variant: 'transparent',
    height: 'small',
  },
};

export const StickyHeader = {
  args: {
    title: 'Sticky Navigation',
    navigation: [
      { label: 'Home', active: true },
      { label: 'Features', onClick: action('features-clicked') },
      { label: 'Pricing', onClick: action('pricing-clicked') },
      { label: 'Contact', onClick: action('contact-clicked') },
    ],
    actions: (
      <Button variant="primary" size="small" onClick={action('get-started-clicked')}>
        Get Started
      </Button>
    ),
    variant: 'default',
    height: 'medium',
    sticky: true,
  },
  parameters: {
    docs: {
      description: {
        story: '스크롤 시 상단에 고정되는 헤더입니다. 긴 페이지에서 항상 네비게이션에 접근할 수 있습니다.',
      },
    },
  },
};

export const HeightVariations = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Header
        title="Small Header"
        height="small"
        navigation={[
          { label: 'Menu 1' },
          { label: 'Menu 2' },
        ]}
        actions={<Button size="small">Action</Button>}
      />
      <Header
        title="Medium Header"
        height="medium"
        navigation={[
          { label: 'Menu 1' },
          { label: 'Menu 2' },
        ]}
        actions={<Button size="small">Action</Button>}
      />
      <Header
        title="Large Header"
        height="large"
        navigation={[
          { label: 'Menu 1' },
          { label: 'Menu 2' },
        ]}
        actions={<Button size="small">Action</Button>}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '헤더의 다양한 높이 옵션을 보여줍니다.',
      },
    },
  },
};

export const VariantComparison = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Header
        title="Default Header"
        variant="default"
        navigation={[{ label: 'Nav 1' }, { label: 'Nav 2' }]}
        actions={<Button size="small">Action</Button>}
      />
      <Header
        title="Transparent Header"
        variant="transparent"
        navigation={[{ label: 'Nav 1' }, { label: 'Nav 2' }]}
        actions={<Button size="small">Action</Button>}
      />
      <Header
        title="Elevated Header"
        variant="elevated"
        navigation={[{ label: 'Nav 1' }, { label: 'Nav 2' }]}
        actions={<Button size="small">Action</Button>}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '헤더의 다양한 스타일 변형을 비교할 수 있습니다.',
      },
    },
  },
};