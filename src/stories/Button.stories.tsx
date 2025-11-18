import React from "react";
import { Button } from '../components';
import { action } from "./actions";
import { within, userEvent } from '@storybook/testing-library';
import { Step } from './types';

export default {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "다양한 스타일, 크기, 상태를 지원하는 버튼 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "success", "error", "warning", "info", "outline"],
      description: "버튼의 시각적 스타일 유형",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "버튼의 크기",
    },
    disabled: {
      control: "boolean",
      description: "버튼 비활성화 여부",
    },
    children: {
      description: "버튼 내부에 표시될 내용",
    },
    icon: {
      control: 'select',
      options: [undefined, 'search', 'user', 'settings', 'plus', 'arrow-right', 'check', 'close'],
      description: '버튼에 표시할 아이콘',
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: '아이콘의 위치',
    },
    onClick: {
      description: "버튼 클릭 시 실행될 함수",
    },
  },
};

export const Default = {
  args: {
    children: "Button",
    onClick: action('button-click'),
  },
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: Step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Button' });

    await step("기본 버튼 클릭 테스트", async () => {
      await userEvent.click(button);
    });
  },
  parameters: {
    docs: {
      source: {
        code: `<Button>Button</Button>`,
      },
    },
  },
};

export const Variants = {
  render: () => (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="success">Success</Button>
      <Button variant="error">Error</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="info">Info</Button>
      <Button variant="outline">Outline</Button>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="success">Success</Button>
<Button variant="error">Error</Button>
<Button variant="warning">Warning</Button>
<Button variant="info">Info</Button>
<Button variant="outline">Outline</Button>`,
      },
    },
  },
};

export const Sizes = {
  render: () => (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>`,
      },
    },
  },
};


export const Disabled = {
  args: {
    children: "Disabled Button",
    disabled: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<Button disabled>Disabled Button</Button>`,
      },
    },
  },
};

export const Icons = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <Button icon="plus" onClick={action('add-clicked')}>추가</Button>
        <Button icon="search" onClick={action('search-clicked')}>검색</Button>
        <Button icon="user" onClick={action('profile-clicked')}>프로필</Button>
        <Button icon="settings" onClick={action('settings-clicked')}>설정</Button>
      </div>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <Button icon="check" variant="secondary" onClick={action('complete-clicked')}>완료</Button>
        <Button icon="close" variant="error" onClick={action('close-clicked')}>닫기</Button>
        <Button icon="arrow-right" iconPosition="right" variant="outline" onClick={action('next-clicked')}>다음</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Button icon="plus">추가</Button>
<Button icon="search">검색</Button>
<Button icon="user">프로필</Button>
<Button icon="settings">설정</Button>
<Button icon="check" variant="secondary">완료</Button>
<Button icon="close" variant="error">닫기</Button>
<Button icon="arrow-right" iconPosition="right" variant="outline">다음</Button>`,
      },
    },
  },
};

