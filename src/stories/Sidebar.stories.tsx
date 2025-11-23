import { Sidebar } from '../components/molecules/Sidebar';
import { Text } from '../components/atomic/Text';
import { action } from './actions';
import { within, userEvent } from '@storybook/testing-library';
import { Step } from './types';

export default {
  title: "Components/Layout/Sidebar",
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '웹사이트나 앱의 사이드바 네비게이션 컴포넌트입니다. 메뉴 항목, 로고, 푸터 등을 포함할 수 있습니다.',
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'dark', 'light'],
      description: '사이드바의 스타일 테마',
    },
    width: {
      control: 'select',
      options: ['narrow', 'medium', 'wide'],
      description: '사이드바의 너비',
    },
    collapsed: {
      control: 'boolean',
      description: '사이드바 축소 여부',
    },
    position: {
      control: 'select',
      options: ['left', 'right'],
      description: '사이드바 위치',
    },
    title: {
      control: 'text',
      description: '사이드바 제목',
    },
  },
};

const basicNavigation = [
  {
    id: 'dashboard',
    label: '대시보드',
    icon: '📊',
    active: true,
    onClick: action('dashboard-clicked'),
  },
  {
    id: 'projects',
    label: '프로젝트',
    icon: '📁',
    onClick: action('projects-clicked'),
  },
  {
    id: 'tasks',
    label: '작업',
    icon: '✅',
    onClick: action('tasks-clicked'),
  },
  {
    id: 'reports',
    label: '보고서',
    icon: '📈',
    onClick: action('reports-clicked'),
  },
];

export const Default = {
  args: {
    title: 'My App',
    navigation: basicNavigation,
    width: 'medium',
    variant: 'default',
  },
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: Step }) => {
    const canvas = within(canvasElement);

    await step('사이드바 표시 확인', async () => {
      const sidebar = canvas.getByRole('complementary');
      await userEvent.hover(sidebar);
    });
  },
};

export const WithLogo = {
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
          A
        </Text>
      </div>
    ),
    title: 'Admin Panel',
    navigation: basicNavigation,
    width: 'medium',
    variant: 'default',
  },
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: Step }) => {
    const canvas = within(canvasElement);

    await step('로고 영역 호버', async () => {
      const logo = canvas.getByText('A');
      await userEvent.hover(logo);
      await new Promise(resolve => setTimeout(resolve, 300));
    });
  },
};

export const DarkTheme = {
  args: {
    title: 'Dark Sidebar',
    navigation: [
      {
        id: 'home',
        label: '홈',
        icon: '🏠',
        active: true,
        onClick: action('home-clicked'),
      },
      {
        id: 'users',
        label: '사용자',
        icon: '👥',
        onClick: action('users-clicked'),
      },
      {
        id: 'settings',
        label: '설정',
        icon: '⚙️',
        onClick: action('settings-clicked'),
      },
      {
        id: 'help',
        label: '도움말',
        icon: '❓',
        disabled: true,
      },
    ],
    variant: 'dark',
    width: 'medium',
  },
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: Step }) => {
    const canvas = within(canvasElement);

    await step('사용자 메뉴 클릭', async () => {
      const usersMenu = canvas.getByText('사용자');
      await userEvent.click(usersMenu);
      await new Promise(resolve => setTimeout(resolve, 300));
    });

    await step('비활성 메뉴 호버', async () => {
      const helpMenu = canvas.getByText('도움말');
      await userEvent.hover(helpMenu);
      await new Promise(resolve => setTimeout(resolve, 300));
    });
  },
};

export const WithNestedNavigation = {
  args: {
    title: 'Enterprise',
    navigation: [
      {
        id: 'dashboard',
        label: '대시보드',
        icon: '📊',
        active: true,
        onClick: action('dashboard-clicked'),
      },
      {
        id: 'management',
        label: '관리',
        icon: '🏢',
        onClick: action('management-clicked'),
        children: [
          {
            id: 'users',
            label: '사용자 관리',
            onClick: action('users-management-clicked'),
          },
          {
            id: 'roles',
            label: '권한 관리',
            onClick: action('roles-management-clicked'),
          },
          {
            id: 'departments',
            label: '부서 관리',
            onClick: action('departments-management-clicked'),
          },
        ],
      },
      {
        id: 'analytics',
        label: '분석',
        icon: '📈',
        onClick: action('analytics-clicked'),
        children: [
          {
            id: 'performance',
            label: '성능 분석',
            onClick: action('performance-clicked'),
          },
          {
            id: 'usage',
            label: '사용량 분석',
            onClick: action('usage-clicked'),
          },
        ],
      },
    ],
    variant: 'default',
    width: 'wide',
  },
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: Step }) => {
    const canvas = within(canvasElement);

    await step('중첩 메뉴 항목 클릭', async () => {
      const usersManagement = canvas.getByText('사용자 관리');
      await userEvent.click(usersManagement);
      await new Promise(resolve => setTimeout(resolve, 300));
    });

    await step('다른 중첩 메뉴 클릭', async () => {
      const performance = canvas.getByText('성능 분석');
      await userEvent.click(performance);
      await new Promise(resolve => setTimeout(resolve, 300));
    });
  },
};

export const WithFooter = {
  args: {
    title: 'Dashboard',
    navigation: basicNavigation,
    footer: (
      <div style={{ textAlign: 'center' }}>
        <Text variant="caption" style={{ color: '#6b7280', margin: 0 }}>
          © 2024 My Company
        </Text>
        <Text variant="caption" style={{ color: '#6b7280', margin: 0 }}>
          v1.2.3
        </Text>
      </div>
    ),
    variant: 'default',
    width: 'medium',
  },
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: Step }) => {
    const canvas = within(canvasElement);

    await step('푸터 영역 확인', async () => {
      const footer = canvas.getByText('© 2024 My Company');
      await userEvent.hover(footer);
      await new Promise(resolve => setTimeout(resolve, 300));
    });
  },
};

export const Collapsed = {
  args: {
    title: 'Collapsed',
    navigation: basicNavigation,
    collapsed: true,
    variant: 'default',
  },
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: Step }) => {
    const canvas = within(canvasElement);

    await step('축소된 메뉴 아이콘 클릭', async () => {
      const dashboardIcon = canvas.getByText('📊');
      await userEvent.click(dashboardIcon);
      await new Promise(resolve => setTimeout(resolve, 300));
    });

    await step('다른 아이콘 호버', async () => {
      const projectIcon = canvas.getByText('📁');
      await userEvent.hover(projectIcon);
      await new Promise(resolve => setTimeout(resolve, 300));
    });
  },
};

export const WidthVariations = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', height: '400px' }}>
      <Sidebar
        title="Narrow"
        width="narrow"
        navigation={[
          { id: '1', label: '홈', icon: '🏠', active: true },
          { id: '2', label: '설정', icon: '⚙️' },
        ]}
      />
      <Sidebar
        title="Medium"
        width="medium"
        navigation={[
          { id: '1', label: '홈', icon: '🏠', active: true },
          { id: '2', label: '설정', icon: '⚙️' },
        ]}
      />
      <Sidebar
        title="Wide"
        width="wide"
        navigation={[
          { id: '1', label: '홈', icon: '🏠', active: true },
          { id: '2', label: '설정', icon: '⚙️' },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '사이드바의 다양한 너비 옵션을 보여줍니다.',
      },
    },
  },
};

export const ThemeComparison = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', height: '400px' }}>
      <Sidebar
        title="Default"
        variant="default"
        navigation={[
          { id: '1', label: '홈', icon: '🏠', active: true },
          { id: '2', label: '프로필', icon: '👤' },
          { id: '3', label: '설정', icon: '⚙️' },
        ]}
      />
      <Sidebar
        title="Light"
        variant="light"
        navigation={[
          { id: '1', label: '홈', icon: '🏠', active: true },
          { id: '2', label: '프로필', icon: '👤' },
          { id: '3', label: '설정', icon: '⚙️' },
        ]}
      />
      <Sidebar
        title="Dark"
        variant="dark"
        navigation={[
          { id: '1', label: '홈', icon: '🏠', active: true },
          { id: '2', label: '프로필', icon: '👤' },
          { id: '3', label: '설정', icon: '⚙️' },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '사이드바의 다양한 테마를 비교할 수 있습니다.',
      },
    },
  },
};