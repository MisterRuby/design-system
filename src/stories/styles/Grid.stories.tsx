import React from "react";
import styled from "styled-components";
import {
  grid,
  gridHelpers,
  gridTemplates,
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
  title: "Styles/Grid",
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
  render: () => {
    const twoColumns = Math.max(1, Math.floor(grid.columns / 6));
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: gridTemplates.twoColumn,
          gap: grid.gutter.md,
        }}>
        <DemoBox>Grid Item 1</DemoBox>
        <DemoBox>Grid Item 2</DemoBox>
        <DemoBox>Grid Item 3</DemoBox>
        <DemoBox>Grid Item 4</DemoBox>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `import { grid } from "../../theme";

const twoColumns = Math.max(1, Math.floor(grid.columns / 6));

<div style={{ display: 'grid', gridTemplateColumns: gridTemplates.twoColumn, gap: grid.gutter.md }}>
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
  render: () => {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: gridTemplates.autoFitQuarter,
          gap: grid.gutter.md,
        }}>
        <DemoBox>반응형 Item 1</DemoBox>
        <DemoBox>반응형 Item 2</DemoBox>
        <DemoBox>반응형 Item 3</DemoBox>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `import { grid, gridHelpers } from "../../theme";

<div style={{
  display: 'grid',
  gridTemplateColumns: gridTemplates.autoFitQuarter,
  gap: grid.gutter.md
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
  render: () => {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: gridTemplates.threeColumn,
          gap: grid.gutter.md,
          justifyItems: "center",
          alignItems: "center",
          minHeight: "200px",
        }}>
        <DemoBox>중앙 정렬 1</DemoBox>
        <DemoBox>중앙 정렬 2</DemoBox>
        <DemoBox>중앙 정렬 3</DemoBox>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `import { grid } from "../../theme";

<div style={{
  display: 'grid',
  gridTemplateColumns: gridTemplates.threeColumn,
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

export const MixedSpans = {
  render: () => {
    const totalColumns = grid.columns;
    const headerSpan = totalColumns;
    const sidebarSpan = Math.max(2, Math.floor(totalColumns / 4));
    const contentSpan = Math.max(totalColumns - sidebarSpan, sidebarSpan + 2);
    const cardSpan = Math.max(2, Math.floor(totalColumns / 3));

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: gridTemplates.twelveColumns,
          gap: grid.gutter.md,
        }}>
        <DemoBox
          $height="48px"
          $color={colors.info[50]}
          style={{ gridColumn: `span ${headerSpan}` }}>
          헤더 ({headerSpan} cols)
        </DemoBox>

        <DemoBox
          $height="120px"
          $color={colors.gray[100]}
          style={{ gridColumn: `span ${sidebarSpan}` }}>
          사이드바 ({sidebarSpan} cols)
        </DemoBox>
        <DemoBox
          $height="120px"
          $color={colors.success[50]}
          style={{ gridColumn: `span ${contentSpan}` }}>
          메인 콘텐츠 ({contentSpan} cols)
        </DemoBox>

        {[1, 2, 3].map((idx) => (
          <DemoBox
            key={idx}
            $height="80px"
            $color={colors.warning[50]}
            style={{ gridColumn: `span ${cardSpan}` }}>
            카드 {idx} ({cardSpan} cols)
          </DemoBox>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `import { grid } from "../../theme";

const totalColumns = grid.columns;
const headerSpan = totalColumns;
const sidebarSpan = Math.max(2, Math.floor(totalColumns / 4));
const contentSpan = Math.max(totalColumns - sidebarSpan, sidebarSpan + 2);
const cardSpan = Math.max(2, Math.floor(totalColumns / 3));

<div style={{
  display: "grid",
  gridTemplateColumns: gridTemplates.twelveColumns,
  gap: grid.gutter.md,
}}>
  <div style={{ gridColumn: \`span \${headerSpan}\` }}>헤더</div>
  <div style={{ gridColumn: \`span \${sidebarSpan}\` }}>사이드바</div>
  <div style={{ gridColumn: \`span \${contentSpan}\` }}>메인</div>
  {[1,2,3].map(i => (
    <div key={i} style={{ gridColumn: \`span \${cardSpan}\` }}>카드 {i}</div>
  ))}
</div>;`,
      },
    },
  },
};
