import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/preset-create-react-app",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding"
  ],
  "framework": {
    "name": "@storybook/react-webpack5",
    "options": {}
  },
  "staticDirs": [
    "../public"
  ],
  "docs": {
    "defaultName": "Docs"
  },
  "typescript": {
    "reactDocgen": "react-docgen-typescript",
    "reactDocgenTypescriptOptions": {
      "shouldExtractLiteralValuesFromEnum": true,
      "propFilter": (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        '@vitest/mocker': false,
        '@vitest/mocker/browser': false,
      };
    }

    if (config.externals) {
      if (Array.isArray(config.externals)) {
        config.externals.push('@vitest/mocker', '@vitest/mocker/browser');
      } else {
        config.externals = [config.externals, '@vitest/mocker', '@vitest/mocker/browser'];
      }
    } else {
      config.externals = ['@vitest/mocker', '@vitest/mocker/browser'];
    }

    return config;
  },
};

export default config;