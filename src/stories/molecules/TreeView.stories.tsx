import React, { useState } from "react";
import { TreeView, TreeNode } from '../../components';
import { action } from "../actions";
import { within, userEvent } from '@storybook/testing-library';
import { Step } from '../types';
import { spacing, colors, borderRadius, fontSize } from '../../tokens';

export default {
  title: "Components/Molecules/TreeView",
  component: TreeView,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "계층 구조를 가진 데이터를 트리 형태로 표시하는 컴포넌트입니다. 폴더/파일 구조, 조직도, 메뉴 네비게이션 등에 활용할 수 있습니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    showIcons: {
      control: "boolean",
      description: "아이콘 표시 여부",
    },
    checkable: {
      control: "boolean",
      description: "체크박스 표시 여부",
    },
    onNodeClick: {
      description: "노드 클릭 시 실행될 함수",
    },
    onNodeExpand: {
      description: "노드 확장/축소 시 실행될 함수",
    },
    onNodeCheck: {
      description: "노드 체크 시 실행될 함수",
    },
  },
};

// 기본 데이터
const basicTreeData: TreeNode[] = [
  {
    id: 'root',
    label: 'Root',
    icon: 'folder',
    children: [
      {
        id: 'folder1',
        label: 'Documents',
        icon: 'folder',
        children: [
          { id: 'file1', label: 'Report.pdf', icon: 'download' },
          { id: 'file2', label: 'Presentation.pptx', icon: 'star' }
        ]
      },
      {
        id: 'folder2',
        label: 'Images',
        icon: 'folder',
        children: [
          { id: 'image1', label: 'photo1.jpg', icon: 'star-filled' },
          { id: 'image2', label: 'photo2.png', icon: 'star-filled' },
          { id: 'image3', label: 'photo3.gif', icon: 'star-filled' }
        ]
      },
      {
        id: 'file3',
        label: 'readme.txt',
        icon: 'info'
      }
    ]
  }
];


export const Default = {
  args: {
    data: basicTreeData,
    onNodeClick: action('node-click'),
    onNodeExpand: action('node-expand'),
  },
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: Step }) => {
    const canvas = within(canvasElement);

    await step("기본 트리 구조 확인", async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
    });

    await step("폴더 확장 테스트", async () => {
      const folderExpander = canvas.getAllByRole('button')[0]; // 첫 번째 확장 버튼
      if (folderExpander) {
        await userEvent.click(folderExpander);
        await new Promise(resolve => setTimeout(resolve, 800));
      }
    });

    await step("파일 선택 테스트", async () => {
      const documentFolder = canvas.getByText('Documents');
      await userEvent.click(documentFolder);
      await new Promise(resolve => setTimeout(resolve, 600));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `const treeData = [
  {
    id: 'root',
    label: 'Root',
    icon: 'folder',
    children: [
      {
        id: 'folder1',
        label: 'Documents',
        icon: 'folder',
        children: [
          { id: 'file1', label: 'Report.pdf', icon: 'download' },
          { id: 'file2', label: 'Presentation.pptx', icon: 'star' }
        ]
      }
    ]
  }
];

<TreeView
  data={treeData}
  onNodeClick={(node) => console.log('Clicked:', node)}
  onNodeExpand={(nodeId, expanded) => console.log('Expand:', nodeId, expanded)}
/>`,
      },
    },
  },
};

export const WithExpansion = {
  args: {
    data: basicTreeData,
    expandedNodes: ['root', 'folder1'],
    onNodeClick: action('node-click'),
    onNodeExpand: action('node-expand'),
  },
  parameters: {
    docs: {
      source: {
        code: `const treeData = [
  {
    id: 'root',
    label: 'Root',
    icon: 'folder',
    children: [
      {
        id: 'folder1',
        label: 'Documents',
        icon: 'folder',
        children: [
          { id: 'file1', label: 'Report.pdf', icon: 'download' },
          { id: 'file2', label: 'Presentation.pptx', icon: 'star' }
        ]
      },
      {
        id: 'folder2',
        label: 'Images',
        icon: 'folder',
        children: [
          { id: 'image1', label: 'photo1.jpg', icon: 'star-filled' },
          { id: 'image2', label: 'photo2.png', icon: 'star-filled' }
        ]
      }
    ]
  }
];

<TreeView
  data={treeData}
  expandedNodes={['root', 'folder1']} // Root와 Documents 폴더가 초기에 펼쳐짐
  onNodeClick={(node) => console.log('Clicked:', node)}
  onNodeExpand={(nodeId, expanded) => {
    console.log('Expand:', nodeId, expanded);
  }}
/>`,
      },
    },
  },
};

export const WithoutIcons = {
  args: {
    data: basicTreeData,
    showIcons: false,
    onNodeClick: action('node-click'),
    onNodeExpand: action('node-expand'),
  },
  parameters: {
    docs: {
      source: {
        code: `<TreeView
  data={treeData}
  showIcons={false}
  onNodeClick={(node) => console.log('Clicked:', node)}
/>`,
      },
    },
  },
};

const CheckableExample = () => {
  const [checkedNodes, setCheckedNodes] = useState<string[]>([]);
  const [expandedNodes, setExpandedNodes] = useState<string[]>(['root']);

  const handleNodeCheck = (nodeId: string, checked: boolean) => {
    setCheckedNodes(prev => {
      // 노드와 모든 하위 노드의 ID를 찾는 함수
      const getAllNodeIds = (nodes: TreeNode[]): string[] => {
        const ids: string[] = [];
        const traverse = (nodeList: TreeNode[]) => {
          nodeList.forEach(node => {
            ids.push(node.id);
            if (node.children) {
              traverse(node.children);
            }
          });
        };
        traverse(nodes);
        return ids;
      };

      // 특정 노드를 찾는 함수
      const findNode = (nodes: TreeNode[], targetId: string): TreeNode | null => {
        for (const node of nodes) {
          if (node.id === targetId) return node;
          if (node.children) {
            const found = findNode(node.children, targetId);
            if (found) return found;
          }
        }
        return null;
      };

      // 상위 노드를 찾는 함수
      const findParentNode = (nodes: TreeNode[], targetId: string): TreeNode | null => {
        for (const node of nodes) {
          if (node.children) {
            if (node.children.some(child => child.id === targetId)) {
              return node;
            }
            const found = findParentNode(node.children, targetId);
            if (found) return found;
          }
        }
        return null;
      };

      // 상위 노드들을 업데이트하는 함수
      const updateParentNodes = (checkedIds: string[]): string[] => {
        const result = [...checkedIds];

        const updateParent = (parentNode: TreeNode | null) => {
          if (!parentNode || !parentNode.children) return;

          const childIds = parentNode.children.map(child => child.id);
          const allChildrenChecked = childIds.every(id => result.includes(id));
          const someChildrenChecked = childIds.some(id => result.includes(id));

          if (allChildrenChecked && !result.includes(parentNode.id)) {
            // 모든 하위 노드가 체크된 경우 상위 노드도 체크
            result.push(parentNode.id);
          } else if (!someChildrenChecked && result.includes(parentNode.id)) {
            // 하위 노드가 모두 체크 해제된 경우 상위 노드도 해제
            result.splice(result.indexOf(parentNode.id), 1);
          } else if (someChildrenChecked && !allChildrenChecked && result.includes(parentNode.id)) {
            // 일부만 체크된 경우 상위 노드 해제 (indeterminate 상태로 만들기 위해)
            result.splice(result.indexOf(parentNode.id), 1);
          }

          // 재귀적으로 상위 노드 확인
          const grandParent = findParentNode(basicTreeData, parentNode.id);
          updateParent(grandParent);
        };

        // 모든 상위 노드들을 업데이트
        const processAllParents = (targetNodeId: string) => {
          let currentParent = findParentNode(basicTreeData, targetNodeId);
          while (currentParent) {
            updateParent(currentParent);
            currentParent = findParentNode(basicTreeData, currentParent.id);
          }
        };

        processAllParents(nodeId);
        return result;
      };

      const targetNode = findNode(basicTreeData, nodeId);
      if (!targetNode) return prev;

      let newCheckedNodes: string[];

      if (checked) {
        // 체크: 현재 노드와 모든 하위 노드들을 체크
        const nodeAndChildrenIds = getAllNodeIds([targetNode]);
        newCheckedNodes = [...prev];
        nodeAndChildrenIds.forEach(id => {
          if (!newCheckedNodes.includes(id)) {
            newCheckedNodes.push(id);
          }
        });
      } else {
        // 체크 해제: 현재 노드와 모든 하위 노드들을 체크 해제
        const nodeAndChildrenIds = getAllNodeIds([targetNode]);
        newCheckedNodes = prev.filter(id => !nodeAndChildrenIds.includes(id));
      }

      // 상위 노드들의 상태 업데이트
      return updateParentNodes(newCheckedNodes);
    });
    action('node-check')(nodeId, checked);
  };

  const handleNodeExpand = (nodeId: string, expanded: boolean) => {
    setExpandedNodes(prev => {
      if (expanded) {
        return [...prev, nodeId];
      } else {
        return prev.filter(id => id !== nodeId);
      }
    });
    action('node-expand')(nodeId, expanded);
  };

  const getCheckedItems = () => {
    const findNodeById = (nodes: TreeNode[], id: string): TreeNode | null => {
      for (const node of nodes) {
        if (node.id === id) return node;
        if (node.children) {
          const found = findNodeById(node.children, id);
          if (found) return found;
        }
      }
      return null;
    };

    return checkedNodes.map(id => findNodeById(basicTreeData, id)).filter(Boolean);
  };

  return (
    <div style={{ display: 'flex', gap: spacing.lg }}>
      <div style={{ flex: 1 }}>
        <TreeView
          data={basicTreeData}
          checkable={true}
          checkedNodes={checkedNodes}
          expandedNodes={expandedNodes}
          onNodeClick={action('node-click')}
          onNodeExpand={handleNodeExpand}
          onNodeCheck={handleNodeCheck}
        />
      </div>
      <div style={{
        flex: 1,
        padding: spacing.md,
        backgroundColor: colors.gray[50],
        borderRadius: borderRadius.md,
        fontSize: fontSize.sm
      }}>
        <h4 style={{ margin: '0 0 12px 0', color: colors.text.primary }}>체크된 항목:</h4>
        {checkedNodes.length === 0 ? (
          <div style={{ color: colors.text.muted }}>선택된 항목이 없습니다</div>
        ) : (
          <ul style={{ margin: 0, paddingLeft: spacing.md }}>
            {getCheckedItems().map((item) => (
              <li key={item?.id} style={{ marginBottom: spacing.xs, color: colors.text.primary }}>
                {item?.label}
              </li>
            ))}
          </ul>
        )}
        <div style={{ marginTop: spacing.md, fontSize: fontSize.xs, color: colors.text.muted }}>
          총 {checkedNodes.length}개 항목 선택됨
        </div>
      </div>
    </div>
  );
};

export const Checkable = {
  render: CheckableExample,
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: Step }) => {
    const canvas = within(canvasElement);

    await step("체크박스 표시 확인", async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
    });

    await step("Documents 폴더 확장", async () => {
      const documentsText = canvas.getByText('Documents');
      const documentsContainer = documentsText.closest('div');
      if (documentsContainer) {
        const expandButton = documentsContainer.querySelector('[style*="cursor: pointer"]');
        if (expandButton) {
          await userEvent.click(expandButton as HTMLElement);
          await new Promise(resolve => setTimeout(resolve, 600));
        }
      }
    });

    await step("Report.pdf 파일 개별 체크", async () => {
      const reportText = canvas.getByText('Report.pdf');
      const reportContainer = reportText.closest('div');
      if (reportContainer) {
        const checkbox = reportContainer.querySelector('[style*="border"]');
        if (checkbox) {
          await userEvent.click(checkbox as HTMLElement);
          await new Promise(resolve => setTimeout(resolve, 600));
        }
      }
    });

    await step("Documents 폴더 indeterminate 상태 확인", async () => {
      // Documents 폴더는 하위 파일 중 일부만 체크되어 indeterminate 상태
      await new Promise(resolve => setTimeout(resolve, 800));
    });

    await step("Presentation.pptx 파일 추가 체크", async () => {
      const presentationText = canvas.getByText('Presentation.pptx');
      const presentationContainer = presentationText.closest('div');
      if (presentationContainer) {
        const checkbox = presentationContainer.querySelector('[style*="border"]');
        if (checkbox) {
          await userEvent.click(checkbox as HTMLElement);
          await new Promise(resolve => setTimeout(resolve, 600));
        }
      }
    });

    await step("Documents 폴더 완전 체크 상태 확인", async () => {
      // 모든 하위 파일이 체크되어 Documents도 체크 상태
      await new Promise(resolve => setTimeout(resolve, 600));
    });

    await step("Report.pdf 체크 해제 (Documents가 indeterminate로 변경)", async () => {
      const reportText = canvas.getByText('Report.pdf');
      const reportContainer = reportText.closest('div');
      if (reportContainer) {
        const checkbox = reportContainer.querySelector('[style*="border"]');
        if (checkbox) {
          await userEvent.click(checkbox as HTMLElement);
          await new Promise(resolve => setTimeout(resolve, 600));
        }
      }
    });

    await step("Documents 폴더 indeterminate 상태 확인", async () => {
      // Documents 폴더가 체크에서 indeterminate 상태로 변경됨
      await new Promise(resolve => setTimeout(resolve, 600));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `const [checkedNodes, setCheckedNodes] = useState([]);

const handleNodeCheck = (nodeId, checked) => {
  setCheckedNodes(prev => {
    // 노드와 모든 하위 노드의 ID를 찾는 함수
    const getAllNodeIds = (nodes) => {
      const ids = [];
      const traverse = (nodeList) => {
        nodeList.forEach(node => {
          ids.push(node.id);
          if (node.children) traverse(node.children);
        });
      };
      traverse(nodes);
      return ids;
    };

    const targetNode = findNodeById(treeData, nodeId);
    if (!targetNode) return prev;

    if (checked) {
      // 상위 노드 체크시 하위 노드들도 모두 체크
      const nodeAndChildrenIds = getAllNodeIds([targetNode]);
      return [...prev, ...nodeAndChildrenIds.filter(id => !prev.includes(id))];
    } else {
      // 상위 노드 체크 해제시 하위 노드들도 모두 해제
      const nodeAndChildrenIds = getAllNodeIds([targetNode]);
      return prev.filter(id => !nodeAndChildrenIds.includes(id));
    }
  });
};

<TreeView
  data={treeData}
  checkable={true}
  checkedNodes={checkedNodes}
  onNodeCheck={handleNodeCheck}
/>`,
      },
    },
  },
};
