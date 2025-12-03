import React, { useState, useCallback } from 'react';
import { Icon, IconName } from '../atomic/Icon';
import { BaseCheckbox } from '../atomic/BaseCheckbox';
import { borderRadius, colors, fontSize, spacing, transitions, fontWeight } from '../../theme';

export interface TreeNode {
  id: string;
  label: string;
  icon?: IconName;
  children?: TreeNode[];
  disabled?: boolean;
  metadata?: any;
}

export interface TreeViewProps {
  data: TreeNode[];
  expandedNodes?: string[];
  selectedNode?: string;
  onNodeClick?: (node: TreeNode) => void;
  onNodeExpand?: (nodeId: string, expanded: boolean) => void;
  showIcons?: boolean;
  checkable?: boolean;
  checkedNodes?: string[];
  onNodeCheck?: (nodeId: string, checked: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
}

interface TreeNodeItemProps {
  node: TreeNode;
  level: number;
  isExpanded: boolean;
  isSelected: boolean;
  isChecked: boolean;
  isIndeterminate: boolean;
  showIcons: boolean;
  checkable: boolean;
  onNodeClick: (node: TreeNode) => void;
  onNodeExpand: (nodeId: string, expanded: boolean) => void;
  onNodeCheck: (nodeId: string, checked: boolean) => void;
}

const TreeNodeItem: React.FC<TreeNodeItemProps> = ({
  node,
  level,
  isExpanded,
  isSelected,
  isChecked,
  isIndeterminate,
  showIcons,
  checkable,
  onNodeClick,
  onNodeExpand,
  onNodeCheck,
}) => {
  const hasChildren = node.children && node.children.length > 0;

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      onNodeExpand(node.id, !isExpanded);
    }
  };

  const handleNodeClick = () => {
    if (!node.disabled) {
      onNodeClick(node);
    }
  };

  const handleCheckClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (!node.disabled) {
      onNodeCheck(node.id, e.target.checked);
    }
  };

  const nodeStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: `${spacing.xs} ${spacing.sm}`,
    cursor: node.disabled ? 'not-allowed' : 'pointer',
    color: node.disabled ? colors.text.muted : isSelected ? colors.semantic.primary : colors.text.primary,
    backgroundColor: isSelected ? colors.primary[50] : 'transparent',
    borderRadius: borderRadius.sm,
    fontSize: fontSize.sm,
    fontWeight: isSelected ? fontWeight.medium : fontWeight.normal,
    transition: transitions.normal,
    opacity: node.disabled ? 0.6 : 1,
  };


  const expanderStyles: React.CSSProperties = {
    width: '16px',
    height: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.xs,
    cursor: hasChildren ? 'pointer' : 'default',
    visibility: hasChildren ? 'visible' : 'hidden',
  };

  const checkboxStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    marginRight: spacing.xs,
  };

  return (
    <>
      <div
        style={nodeStyles}
        onClick={handleNodeClick}
        onMouseEnter={(e) => {
          if (!node.disabled && !isSelected) {
            e.currentTarget.style.backgroundColor = colors.gray[50];
          }
        }}
        onMouseLeave={(e) => {
          if (!node.disabled && !isSelected) {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
      >

        {/* 들여쓰기 */}
        {level > 0 && (
          <div style={{ width: `${level * 24}px` }} />
        )}

        {/* 확장/축소 버튼 */}
        <div style={expanderStyles} onClick={handleExpandClick}>
          {hasChildren && (
            <Icon
              name={isExpanded ? 'chevron-down' : 'chevron-right'}
              size={12}
              color={colors.text.muted}
            />
          )}
        </div>

        {/* 체크박스 */}
        {checkable && (
          <div style={checkboxStyles}>
            <BaseCheckbox
              checked={isChecked}
              indeterminate={isIndeterminate}
              disabled={node.disabled}
              size="sm"
              onChange={handleCheckClick}
              style={{ margin: 0 }}
            />
          </div>
        )}

        {/* 아이콘 */}
        {showIcons && node.icon && (
          <Icon
            name={node.icon}
            size={16}
            color={isSelected ? colors.semantic.primary : colors.text.primary}
            style={{ marginRight: spacing.xs }}
          />
        )}

        {/* 라벨 */}
        <span style={{ flex: 1, userSelect: 'none' }}>
          {node.label}
        </span>
      </div>

      {/* 자식 노드들은 TreeView 컴포넌트에서 관리 */}
    </>
  );
};

export const TreeView: React.FC<TreeViewProps> = ({
  data,
  expandedNodes = [],
  selectedNode,
  onNodeClick = () => {},
  onNodeExpand = () => {},
  showIcons = true,
  checkable = false,
  checkedNodes = [],
  onNodeCheck = () => {},
  className = '',
  style = {}
}) => {
  const [internalExpandedNodes, setInternalExpandedNodes] = useState<string[]>(expandedNodes);

  const handleNodeExpand = useCallback((nodeId: string, expanded: boolean) => {
    setInternalExpandedNodes(prev => {
      if (expanded) {
        return [...prev, nodeId];
      } else {
        return prev.filter(id => id !== nodeId);
      }
    });
    onNodeExpand(nodeId, expanded);
  }, [onNodeExpand]);

  const isNodeExpanded = useCallback((nodeId: string) => {
    return internalExpandedNodes.includes(nodeId);
  }, [internalExpandedNodes]);

  const isNodeSelected = useCallback((nodeId: string) => {
    return selectedNode === nodeId;
  }, [selectedNode]);

  const isNodeChecked = useCallback((nodeId: string) => {
    return checkedNodes.includes(nodeId);
  }, [checkedNodes]);

  const isNodeIndeterminate = useCallback((nodeId: string) => {
    // 해당 노드를 찾기
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

    // 모든 하위 노드 ID를 찾기
    const getAllChildIds = (node: TreeNode): string[] => {
      if (!node.children) return [];
      const ids: string[] = [];
      const traverse = (nodeList: TreeNode[]) => {
        nodeList.forEach(child => {
          ids.push(child.id);
          if (child.children) {
            traverse(child.children);
          }
        });
      };
      traverse(node.children);
      return ids;
    };

    const node = findNode(data, nodeId);
    if (!node || !node.children || node.children.length === 0) {
      return false;
    }

    const childIds = getAllChildIds(node);
    if (childIds.length === 0) return false;

    const checkedChildIds = childIds.filter(id => checkedNodes.includes(id));

    // 현재 노드가 체크된 상태면 indeterminate가 아님
    if (checkedNodes.includes(nodeId)) return false;

    // 일부 하위 노드만 체크된 경우 indeterminate
    return checkedChildIds.length > 0 && checkedChildIds.length < childIds.length;
  }, [checkedNodes, data]);

  const renderTree = (nodes: TreeNode[], level: number = 0): React.ReactNode => {
    return nodes.map((node, index) => {
      const hasChildren = node.children && node.children.length > 0;
      const isExpanded = isNodeExpanded(node.id);

      return (
        <React.Fragment key={node.id}>
          <TreeNodeItem
            node={node}
            level={level}
            isExpanded={isExpanded}
            isSelected={isNodeSelected(node.id)}
            isChecked={isNodeChecked(node.id)}
            isIndeterminate={isNodeIndeterminate(node.id)}
            showIcons={showIcons}
            checkable={checkable}
            onNodeClick={onNodeClick}
            onNodeExpand={handleNodeExpand}
            onNodeCheck={onNodeCheck}
          />
          {hasChildren && isExpanded && (
            <div>
              {renderTree(
                node.children!,
                level + 1
              )}
            </div>
          )}
        </React.Fragment>
      );
    });
  };

  const containerStyles: React.CSSProperties = {
    fontFamily: 'inherit',
    fontSize: fontSize.sm,
    color: colors.text.primary,
    ...style,
  };

  return (
    <div className={className} style={containerStyles}>
      {renderTree(data)}
    </div>
  );
};