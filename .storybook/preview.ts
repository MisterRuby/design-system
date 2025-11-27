import type { Preview } from "@storybook/react-webpack5";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // 기본 스토리 설정 (Introduction MDX가 첫 번째로 표시됨)
    options: {
      storySort: {
        order: ['Introduction', 'Atomic', 'Molecules', 'Organisms', 'Layout', '*'],
      },
    },
  },
};

export default preview;
