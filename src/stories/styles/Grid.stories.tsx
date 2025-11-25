import React from "react";
import styled from "styled-components";
import {
  gridSystem as grid,
  colors,
  semanticBorders,
  borderRadius,
  fontWeight,
} from "../../theme";

const DemoBox = styled.div<{ $height?: string; $color?: string }>`
  background-color: ${({ $color }) => $color || colors.info[50]};
  border: ${semanticBorders.info};
  padding: 4px 8px;
  text-align: center;
  font-weight: ${fontWeight.medium};
  color: ${colors.info[700]};
  height: ${({ $height }) => $height || "32px"};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${borderRadius.sm};
  font-size: 12px;
`;

export default {
  title: "Styles/Grid System",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    viewport: {
      viewports: {
        gridDemo: {
          name: "Grid Demo",
          styles: {
            width: "1200px",
            height: "800px",
          },
        },
      },
      defaultViewport: "gridDemo",
    },
    docs: {
      description: {
        component:
          "CSS Grid를 사용한 레이아웃 시스템입니다. div에 CSS Grid 속성을 적용하여 아이템들을 배치하고 다양한 그리드 레이아웃을 구성할 수 있습니다.",
      },
    },
  },
};

export const BasicGrid = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: grid.gutter.md,
      }}>
      <DemoBox>Grid Item 1</DemoBox>
      <DemoBox>Grid Item 2</DemoBox>
      <DemoBox>Grid Item 3</DemoBox>
      <DemoBox>Grid Item 4</DemoBox>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
  <div>Grid Item 1</div>
  <div>Grid Item 2</div>
  <div>Grid Item 3</div>
  <div>Grid Item 4</div>
</div>`,
      },
    },
  },
};

export const ResponsiveGrid = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: grid.gutter.md,
      }}>
      <DemoBox>반응형 Item 1</DemoBox>
      <DemoBox>반응형 Item 2</DemoBox>
      <DemoBox>반응형 Item 3</DemoBox>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '16px'
}}>
  <div>반응형 Item 1</div>
  <div>반응형 Item 2</div>
  <div>반응형 Item 3</div>
</div>`,
      },
    },
  },
};

export const GridAlignment = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: grid.gutter.md,
        justifyItems: "center",
        alignItems: "center",
        minHeight: "200px",
      }}>
      <DemoBox>중앙 정렬 1</DemoBox>
      <DemoBox>중앙 정렬 2</DemoBox>
      <DemoBox>중앙 정렬 3</DemoBox>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: grid.gutter.md,
  justifyItems: 'center',
  alignItems: 'center'
}}>
  <div>중앙 정렬 1</div>
  <div>중앙 정렬 2</div>
  <div>중앙 정렬 3</div>
</div>`,
      },
    },
  },
};
