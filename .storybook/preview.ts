import React from "react";
import type { Preview } from "@storybook/react-webpack5";
import { userEvent } from "@storybook/testing-library";
import { ThemeProvider } from "../src/theme/ThemeProvider";
import "../src/theme/tokens.css";

// 전역 상호작용 속도를 느리게 설정하되 setup 동작만 재정의해 부작용을 최소화
const originalSetup = userEvent.setup.bind(userEvent);
userEvent.setup = (options?: Parameters<typeof userEvent.setup>[0]) =>
  originalSetup({ delay: 350, ...options });

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
  decorators: [
    (Story) => React.createElement(ThemeProvider, null, React.createElement(Story)),
  ],
};

export default preview;
