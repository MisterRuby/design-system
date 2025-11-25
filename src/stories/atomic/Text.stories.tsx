import React from "react";
import { Text } from "../../components";

export default {
  title: "Components/Atomic/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: "텍스트의 의미적 스타일 유형",
      control: { type: "select" },
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "body1", "body2", "caption", "overline"],
    },
    size: {
      description: "텍스트 크기 (variant 설정을 덮어씀)",
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"],
    },
    weight: {
      description: "텍스트 두께 (variant 설정을 덮어씀)",
      control: { type: "select" },
      options: ["light", "normal", "medium", "semibold", "bold"],
    },
    color: {
      description: "텍스트 색상",
      control: { type: "select" },
      options: ["text", "primary", "secondary", "success", "error", "warning", "info", "muted"],
    },
    align: {
      description: "텍스트 정렬",
      control: { type: "select" },
      options: ["left", "center", "right", "justify"],
    },
    transform: {
      description: "텍스트 변형",
      control: { type: "select" },
      options: ["none", "capitalize", "uppercase", "lowercase"],
    },
    decoration: {
      description: "텍스트 장식",
      control: { type: "select" },
      options: ["none", "underline", "line-through"],
    },
    children: {
      description: "텍스트 내용",
      control: { type: "text" },
    },
  },
};

export const Default = {
  args: {
    children: "기본 텍스트입니다.",
  },
  parameters: {
    docs: {
      source: {
        code: `<Text>기본 텍스트입니다.</Text>`,
      },
    },
  },
};

export const Headings = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", textAlign: "left" }}>
      <Text variant="h1">Heading 1</Text>
      <Text variant="h2">Heading 2</Text>
      <Text variant="h3">Heading 3</Text>
      <Text variant="h4">Heading 4</Text>
      <Text variant="h5">Heading 5</Text>
      <Text variant="h6">Heading 6</Text>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Text variant="h1">Heading 1</Text>
<Text variant="h2">Heading 2</Text>
<Text variant="h3">Heading 3</Text>
<Text variant="h4">Heading 4</Text>
<Text variant="h5">Heading 5</Text>
<Text variant="h6">Heading 6</Text>`,
      },
    },
  },
};

export const BodyText = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "400px" }}>
      <Text variant="body1">
        Body 1 텍스트입니다. 일반적인 본문 텍스트로 사용되며, 적절한 크기와 줄 간격을 가지고 있습니다.
      </Text>
      <Text variant="body2">
        Body 2 텍스트입니다. 약간 더 작은 크기로 부가적인 내용이나 설명에 사용됩니다.
      </Text>
      <Text variant="caption">Caption 텍스트입니다. 이미지 설명이나 작은 정보를 표시할 때 사용됩니다.</Text>
      <Text variant="overline">Overline 텍스트</Text>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Text variant="body1">Body 1 텍스트입니다...</Text>
<Text variant="body2">Body 2 텍스트입니다...</Text>
<Text variant="caption">Caption 텍스트입니다...</Text>
<Text variant="overline">Overline 텍스트</Text>`,
      },
    },
  },
};

export const Colors = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Text color="text">Text 색상 (기본 텍스트)</Text>
      <Text color="primary">Primary 색상 (브랜드 주색상)</Text>
      <Text color="secondary">Secondary 색상</Text>
      <Text color="success">Success 색상</Text>
      <Text color="error">Error 색상</Text>
      <Text color="warning">Warning 색상</Text>
      <Text color="info">Info 색상</Text>
      <Text color="muted">Muted 색상</Text>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Text color="text">Text 색상 (기본 텍스트)</Text>
<Text color="primary">Primary 색상 (브랜드 주색상)</Text>
<Text color="secondary">Secondary 색상</Text>
<Text color="success">Success 색상</Text>
<Text color="error">Error 색상</Text>
<Text color="warning">Warning 색상</Text>
<Text color="info">Info 색상</Text>
<Text color="muted">Muted 색상</Text>`,
      },
    },
  },
};

export const Sizes = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Text size="xs">Extra Small (xs)</Text>
      <Text size="sm">Small (sm)</Text>
      <Text size="md">Medium (md)</Text>
      <Text size="lg">Large (lg)</Text>
      <Text size="xl">Extra Large (xl)</Text>
      <Text size="2xl">2X Large (2xl)</Text>
      <Text size="3xl">3X Large (3xl)</Text>
      <Text size="4xl">4X Large (4xl)</Text>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Text size="xs">Extra Small (xs)</Text>
<Text size="sm">Small (sm)</Text>
<Text size="md">Medium (md)</Text>
<Text size="lg">Large (lg)</Text>
<Text size="xl">Extra Large (xl)</Text>
<Text size="2xl">2X Large (2xl)</Text>
<Text size="3xl">3X Large (3xl)</Text>
<Text size="4xl">4X Large (4xl)</Text>`,
      },
    },
  },
};

export const Weights = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Text weight="light">Light Weight</Text>
      <Text weight="normal">Normal Weight</Text>
      <Text weight="medium">Medium Weight</Text>
      <Text weight="semibold">Semibold Weight</Text>
      <Text weight="bold">Bold Weight</Text>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Text weight="light">Light Weight</Text>
<Text weight="normal">Normal Weight</Text>
<Text weight="medium">Medium Weight</Text>
<Text weight="semibold">Semibold Weight</Text>
<Text weight="bold">Bold Weight</Text>`,
      },
    },
  },
};

export const Alignment = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "300px" }}>
      <Text align="left">왼쪽 정렬된 텍스트</Text>
      <Text align="center">가운데 정렬된 텍스트</Text>
      <Text align="right">오른쪽 정렬된 텍스트</Text>
      <Text align="justify">
        양쪽 정렬된 텍스트입니다. 긴 문장일 때 양쪽 끝에 맞춰서 정렬됩니다.
      </Text>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Text align="left">왼쪽 정렬된 텍스트</Text>
<Text align="center">가운데 정렬된 텍스트</Text>
<Text align="right">오른쪽 정렬된 텍스트</Text>
<Text align="justify">양쪽 정렬된 텍스트입니다...</Text>`,
      },
    },
  },
};

export const Transform = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Text transform="none">Normal Text</Text>
      <Text transform="capitalize">capitalize text</Text>
      <Text transform="uppercase">uppercase text</Text>
      <Text transform="lowercase">LOWERCASE TEXT</Text>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Text transform="none">Normal Text</Text>
<Text transform="capitalize">capitalize text</Text>
<Text transform="uppercase">uppercase text</Text>
<Text transform="lowercase">LOWERCASE TEXT</Text>`,
      },
    },
  },
};

export const Decoration = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Text decoration="none">일반 텍스트</Text>
      <Text decoration="underline">밑줄 텍스트</Text>
      <Text decoration="line-through">취소선 텍스트</Text>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Text decoration="none">일반 텍스트</Text>
<Text decoration="underline">밑줄 텍스트</Text>
<Text decoration="line-through">취소선 텍스트</Text>`,
      },
    },
  },
};
