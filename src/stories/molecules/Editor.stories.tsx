import React, { useState } from 'react';
import MarkdownEditor from '../../components/molecules/Editor';
import { action } from '../actions';

export default {
  title: 'Components/Molecules/MarkdownEditor',
  component: MarkdownEditor,
  tags: ["autodocs"],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '마크다운 에디터 컴포넌트입니다. 실시간 미리보기와 다양한 편집 모드를 지원합니다.',
      },
      source: {
        type: 'dynamic',
        excludeDecorators: true,
      },
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '667px' },
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1200px', height: '800px' },
        },
      },
    },
  },
  argTypes: {
    value: {
      description: '에디터의 마크다운 값',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    onChange: {
      description: '값이 변경될 때 호출되는 함수',
      action: 'changed',
      table: {
        type: { summary: '(value?: string) => void' },
      },
    },
    placeholder: {
      description: '플레이스홀더 텍스트',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'마크다운으로 내용을 작성해보세요...'" },
      },
    },
    height: {
      description: '에디터 높이 (픽셀 또는 CSS 단위)',
      control: { type: 'range', min: 200, max: 600, step: 50 },
      table: {
        type: { summary: 'number | string' },
        defaultValue: { summary: '300' },
      },
    },
    preview: {
      description: '미리보기 모드 설정',
      control: 'select',
      options: ['edit', 'live', 'preview'],
      table: {
        type: { summary: "'edit' | 'live' | 'preview'" },
        defaultValue: { summary: "'live'" },
      },
    },
    hideToolbar: {
      description: '툴바를 숨길지 여부',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    visibleDragBar: {
      description: '편집/미리보기 영역 사이의 드래그바 표시 여부',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      description: '에디터 비활성화 상태',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    className: {
      description: '추가 CSS 클래스명',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
};

const sampleMarkdown = `# 마크다운 에디터 예시

이것은 **마크다운 에디터** 컴포넌트의 예시입니다.

## 주요 기능

- 실시간 미리보기
- 다양한 편집 모드
- 툴바 지원
- 반응형 디자인

### 코드 블록 예시

\`\`\`javascript
function hello() {
  console.log('Hello, World!');
}
\`\`\`

### 목록 예시

1. 첫 번째 항목
2. 두 번째 항목
3. 세 번째 항목

- 불릿 포인트 1
- 불릿 포인트 2

> 이것은 인용구입니다.
> 여러 줄로 작성할 수 있습니다.
`;

const ControlledEditor = (args: any) => {
  const [value, setValue] = useState(args.value || sampleMarkdown);

  return (
    <MarkdownEditor
      {...args}
      value={value}
      onChange={(val) => {
        setValue(val || '');
        action('editor-change')(val);
      }}
    />
  );
};

export const Default = {
  args: {
    value: sampleMarkdown,
    placeholder: '마크다운으로 내용을 작성해보세요...',
    height: 400,
    preview: 'live',
    hideToolbar: false,
    visibleDragBar: false,
    disabled: false,
  },
  render: (args: any) => <ControlledEditor {...args} />,
  parameters: {
    docs: {
      description: {
        story: '기본 설정으로 왼쪽에는 편집 영역, 오른쪽에는 실시간 미리보기가 표시됩니다. 가장 일반적인 사용 방식입니다.',
      },
      source: {
        code: `<MarkdownEditor
  value={value}
  onChange={(val) => setValue(val || '')}
  placeholder="마크다운으로 내용을 작성해보세요..."
  height={400}
  preview="live"
/>`,
      },
    },
  },
};

export const EditOnly = {
  args: {
    ...Default.args,
    preview: 'edit',
    height: 300,
  },
  render: (args: any) => <ControlledEditor {...args} />,
  parameters: {
    docs: {
      description: {
        story: '편집 영역만 표시되는 모드입니다. 미리보기가 필요하지 않고 공간을 절약하고 싶을 때 사용합니다.',
      },
      source: {
        code: `<MarkdownEditor
  value={value}
  onChange={(val) => setValue(val || '')}
  preview="edit"
  height={300}
/>`,
      },
    },
  },
};

export const PreviewOnly = {
  args: {
    ...Default.args,
    preview: 'preview',
    height: 300,
    disabled: true,
  },
  render: (args: any) => <ControlledEditor {...args} />,
  parameters: {
    docs: {
      description: {
        story: '미리보기만 표시되는 읽기 전용 모드입니다. 마크다운 콘텐츠를 표시할 때 사용합니다.',
      },
      source: {
        code: `<MarkdownEditor
  value={value}
  preview="preview"
  disabled={true}
  height={300}
/>`,
      },
    },
  },
};

export const WithoutToolbar = {
  args: {
    ...Default.args,
    hideToolbar: true,
    height: 250,
  },
  render: (args: any) => <ControlledEditor {...args} />,
  parameters: {
    docs: {
      description: {
        story: '툴바가 없는 미니멀한 디자인의 에디터입니다. 간단한 텍스트 편집에 적합합니다.',
      },
      source: {
        code: `<MarkdownEditor
  value={value}
  onChange={(val) => setValue(val || '')}
  hideToolbar={true}
  height={250}
/>`,
      },
    },
  },
};

export const CompactSize = {
  args: {
    ...Default.args,
    height: 200,
    placeholder: '간단한 메모를 작성해보세요...',
    value: '# 간단한 메모\n\n여기에 내용을 작성하세요.',
  },
  render: (args: any) => <ControlledEditor {...args} />,
  parameters: {
    docs: {
      description: {
        story: '높이를 줄인 컴팩트한 버전입니다. 댓글이나 간단한 메모 작성에 적합합니다.',
      },
      source: {
        code: `<MarkdownEditor
  value={value}
  onChange={(val) => setValue(val || '')}
  height={200}
  placeholder="간단한 메모를 작성해보세요..."
/>`,
      },
    },
  },
};

export const Disabled = {
  args: {
    ...Default.args,
    disabled: true,
    value: '# 읽기 전용 에디터\n\n이 에디터는 편집할 수 없습니다.',
  },
  render: (args: any) => <ControlledEditor {...args} />,
  parameters: {
    docs: {
      description: {
        story: '완전히 비활성화된 상태의 에디터입니다. 사용자 입력을 받지 않고 콘텐츠만 표시합니다.',
      },
      source: {
        code: `<MarkdownEditor
  value={value}
  disabled={true}
/>`,
      },
    },
  },
};