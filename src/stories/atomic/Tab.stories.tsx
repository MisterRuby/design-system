import React from "react";
import { Tab, TabItem } from '../../components';
import { action } from "../actions";
import { within, userEvent } from '@storybook/testing-library';
import { Step } from '../types';
import { spacing } from '../../theme';

export default {
  title: "Components/Atomic/Tab",
  component: Tab,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "다양한 스타일과 크기를 지원하는 탭 컴포넌트입니다. 탭 간 전환과 콘텐츠 표시를 제공합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    items: {
      description: "탭 아이템들의 배열 (id, label, content, disabled, icon 속성 포함)",
    },
    defaultActiveTab: {
      description: "초기에 활성화될 탭의 ID",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "탭의 크기",
    },
    variant: {
      control: "select",
      options: ["default", "underline", "pills"],
      description: "탭의 시각적 스타일 유형",
    },
    onChange: {
      description: "탭 변경 시 실행될 함수",
    },
  },
};

const sampleItems: TabItem[] = [
  {
    id: 'tab1',
    label: '첫 번째 탭',
    content: <div>첫 번째 탭의 내용입니다.</div>
  },
  {
    id: 'tab2',
    label: '두 번째 탭',
    content: <div>두 번째 탭의 내용입니다.</div>
  },
  {
    id: 'tab3',
    label: '세 번째 탭',
    content: <div>세 번째 탭의 내용입니다.</div>
  }
];

const longContentItems: TabItem[] = [
  {
    id: 'home',
    label: '홈',
    icon: 'home',
    content: (
      <div>
        <h3>홈 페이지</h3>
        <p>메인 콘텐츠가 여기에 표시됩니다. 대시보드, 최근 활동, 주요 알림 등을 확인할 수 있습니다.</p>
        <ul>
          <li>최근 프로젝트 현황</li>
          <li>팀 멤버 활동</li>
          <li>중요한 업데이트</li>
        </ul>
      </div>
    )
  },
  {
    id: 'profile',
    label: '프로필',
    icon: 'user',
    content: (
      <div>
        <h3>사용자 프로필</h3>
        <p>개인정보, 설정, 계정 관리 등을 할 수 있습니다.</p>
        <div style={{ marginTop: '16px' }}>
          <strong>이름:</strong> 홍길동<br/>
          <strong>이메일:</strong> hong@example.com<br/>
          <strong>역할:</strong> 관리자
        </div>
      </div>
    )
  },
  {
    id: 'settings',
    label: '설정',
    icon: 'settings',
    content: (
      <div>
        <h3>시스템 설정</h3>
        <p>애플리케이션 환경 설정을 변경할 수 있습니다.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
          <label><input type="checkbox" defaultChecked /> 알림 받기</label>
          <label><input type="checkbox" /> 다크 모드</label>
          <label><input type="checkbox" defaultChecked /> 자동 저장</label>
        </div>
      </div>
    )
  }
];

const itemsWithDisabled: TabItem[] = [
  {
    id: 'available',
    label: '사용 가능',
    content: <div>이 탭은 정상적으로 동작합니다.</div>
  },
  {
    id: 'disabled',
    label: '비활성화됨',
    content: <div>이 탭은 비활성화되어 있습니다.</div>,
    disabled: true
  },
  {
    id: 'another',
    label: '다른 탭',
    content: <div>다른 정상 탭입니다.</div>
  }
];

export const Default = {
  args: {
    items: sampleItems,
    onChange: action('tab-change'),
  },
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: Step }) => {
    const canvas = within(canvasElement);

    await step("탭 클릭 테스트", async () => {
      const secondTab = canvas.getByRole('tab', { name: '두 번째 탭' });
      await userEvent.click(secondTab);
    });
  },
  parameters: {
    docs: {
      source: {
        code: `const items = [
  {
    id: 'tab1',
    label: '첫 번째 탭',
    content: <div>첫 번째 탭의 내용입니다.</div>
  },
  {
    id: 'tab2',
    label: '두 번째 탭',
    content: <div>두 번째 탭의 내용입니다.</div>
  }
];

<Tab items={items} />`,
      },
    },
  },
};

export const Variants = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.xl, width: "600px" }}>
      <div>
        <h4 style={{ marginBottom: spacing.sm }}>Default</h4>
        <Tab
          items={sampleItems}
          variant="default"
          onChange={action('default-tab-change')}
        />
      </div>

      <div>
        <h4 style={{ marginBottom: spacing.sm }}>Underline</h4>
        <Tab
          items={sampleItems}
          variant="underline"
          onChange={action('underline-tab-change')}
        />
      </div>

      <div>
        <h4 style={{ marginBottom: spacing.sm }}>Pills</h4>
        <Tab
          items={sampleItems}
          variant="pills"
          onChange={action('pills-tab-change')}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Tab items={items} variant="default" />
<Tab items={items} variant="underline" />
<Tab items={items} variant="pills" />`,
      },
    },
  },
};

export const Sizes = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.xl, width: "500px" }}>
      <div>
        <h4 style={{ marginBottom: spacing.sm }}>Small</h4>
        <Tab
          items={sampleItems}
          size="small"
          onChange={action('small-tab-change')}
        />
      </div>

      <div>
        <h4 style={{ marginBottom: spacing.sm }}>Medium</h4>
        <Tab
          items={sampleItems}
          size="medium"
          onChange={action('medium-tab-change')}
        />
      </div>

      <div>
        <h4 style={{ marginBottom: spacing.sm }}>Large</h4>
        <Tab
          items={sampleItems}
          size="large"
          onChange={action('large-tab-change')}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Tab items={items} size="small" />
<Tab items={items} size="medium" />
<Tab items={items} size="large" />`,
      },
    },
  },
};

export const WithLongContent = {
  args: {
    items: longContentItems,
    defaultActiveTab: 'home',
    onChange: action('content-tab-change'),
  },
  parameters: {
    docs: {
      source: {
        code: `const items = [
  {
    id: 'home',
    label: '홈',
    content: (
      <div>
        <h3>홈 페이지</h3>
        <p>메인 콘텐츠가 여기에 표시됩니다...</p>
      </div>
    )
  },
  // ... 다른 탭들
];

<Tab items={items} defaultActiveTab="home" />`,
      },
    },
  },
};

export const WithDisabledTabs = {
  args: {
    items: itemsWithDisabled,
    onChange: action('disabled-tab-change'),
  },
  parameters: {
    docs: {
      source: {
        code: `const items = [
  {
    id: 'available',
    label: '사용 가능',
    content: <div>이 탭은 정상적으로 동작합니다.</div>
  },
  {
    id: 'disabled',
    label: '비활성화됨',
    content: <div>이 탭은 비활성화되어 있습니다.</div>,
    disabled: true
  }
];

<Tab items={items} />`,
      },
    },
  },
};

export const WithIcons = {
  render: () => {
    const iconItems: TabItem[] = [
      {
        id: 'dashboard',
        label: '대시보드',
        icon: 'bar-chart',
        content: <div>대시보드 내용입니다. 차트와 데이터를 확인할 수 있습니다.</div>
      },
      {
        id: 'messages',
        label: '메시지',
        icon: 'message-circle',
        content: <div>메시지 목록입니다. 새로운 메시지를 확인하고 답장할 수 있습니다.</div>
      },
      {
        id: 'calendar',
        label: '일정',
        icon: 'calendar',
        content: <div>일정 관리 페이지입니다. 새로운 일정을 추가하고 관리할 수 있습니다.</div>
      },
      {
        id: 'documents',
        label: '문서',
        icon: 'folder',
        content: <div>문서 보관함입니다. 중요한 파일들을 저장하고 관리할 수 있습니다.</div>
      }
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: spacing.xl, width: "500px" }}>
        <div>
          <h4 style={{ marginBottom: spacing.sm }}>Default with Icons</h4>
          <Tab
            items={iconItems}
            variant="default"
            onChange={action('icon-default-change')}
          />
        </div>

        <div>
          <h4 style={{ marginBottom: spacing.sm }}>Underline with Icons</h4>
          <Tab
            items={iconItems}
            variant="underline"
            onChange={action('icon-underline-change')}
          />
        </div>

        <div>
          <h4 style={{ marginBottom: spacing.sm }}>Pills with Icons</h4>
          <Tab
            items={iconItems}
            variant="pills"
            onChange={action('icon-pills-change')}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `const iconItems = [
  { id: 'dashboard', label: '대시보드', icon: 'bar-chart' },
  { id: 'messages', label: '메시지', icon: 'message-circle' },
  { id: 'calendar', label: '일정', icon: 'calendar' },
  { id: 'documents', label: '문서', icon: 'folder' }
];

<Tab items={iconItems} variant="default" />
<Tab items={iconItems} variant="underline" />
<Tab items={iconItems} variant="pills" />`,
      },
    },
  },
};

export const TabsWithoutContent = {
  render: () => {
    const itemsNoContent: TabItem[] = [
      { id: 'nav1', label: '내비게이션 1' },
      { id: 'nav2', label: '내비게이션 2' },
      { id: 'nav3', label: '내비게이션 3' },
      { id: 'nav4', label: '내비게이션 4' }
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: spacing.lg, width: "500px" }}>
        <div>
          <h4 style={{ marginBottom: spacing.sm }}>Underline Navigation</h4>
          <Tab
            items={itemsNoContent}
            variant="underline"
            onChange={action('nav-underline-change')}
          />
        </div>

        <div>
          <h4 style={{ marginBottom: spacing.sm }}>Pills Navigation</h4>
          <Tab
            items={itemsNoContent}
            variant="pills"
            onChange={action('nav-pills-change')}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `const navigationItems = [
  { id: 'nav1', label: '내비게이션 1' },
  { id: 'nav2', label: '내비게이션 2' },
  { id: 'nav3', label: '내비게이션 3' }
];

<Tab items={navigationItems} variant="underline" />
<Tab items={navigationItems} variant="pills" />`,
      },
    },
  },
};