import React from 'react';
import styled from 'styled-components';
import { spacing, borderRadius, colors, fontWeight } from '../../tokens';
import { Icon } from './Icon';

type TableAlign = 'left' | 'center' | 'right';
type SortOrder = 'asc' | 'desc';

export interface TableColumn<T> {
  key: string;
  title: React.ReactNode;
  dataIndex?: keyof T;
  render?: (value: unknown, record: T, rowIndex: number) => React.ReactNode;
  align?: TableAlign;
  width?: number | string;
  sortable?: boolean;
  sorter?: (a: T, b: T) => number;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  density?: 'comfortable' | 'compact';
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  emptyMessage?: string;
  selectable?: boolean;
  selectedRowKey?: React.Key;
  rowKey?: keyof T | ((record: T) => React.Key);
  onRowClick?: (record: T) => void;
  onSelect?: (record: T) => void;
  className?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
}

const getDefaultSort = <T,>(column: TableColumn<T>) => {
  if (!column.dataIndex) {
    return null;
  }

  return (a: T, b: T) => {
    const aValue = (a as Record<string, unknown>)[column.dataIndex as string];
    const bValue = (b as Record<string, unknown>)[column.dataIndex as string];

    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return -1;
    if (bValue == null) return 1;

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return aValue - bValue;
    }

    return String(aValue).localeCompare(String(bValue), 'ko');
  };
};

export const Table = <T extends Record<string, unknown>>({
  columns,
  data,
  density = 'comfortable',
  striped = false,
  hoverable = true,
  bordered = true,
  emptyMessage = '표시할 데이터가 없습니다',
  selectable = false,
  selectedRowKey,
  rowKey,
  onRowClick,
  onSelect,
  className = '',
  style = {},
  'aria-label': ariaLabel,
}: TableProps<T>) => {
  const [sortState, setSortState] = React.useState<{ key: string; order: SortOrder } | null>(null);
  const [internalSelectedKey, setInternalSelectedKey] = React.useState<React.Key | null>(null);
  const isControlledSelection = selectedRowKey !== undefined;
  const currentSelectedKey = isControlledSelection ? selectedRowKey : internalSelectedKey;

  const paddingY = density === 'compact' ? spacing.xs : spacing.sm;
  const paddingX = density === 'compact' ? spacing.sm : spacing.md;

  const getRowKey = React.useCallback(
    (record: T, index: number) => {
      if (typeof rowKey === 'function') {
        return rowKey(record);
      }
      if (rowKey) {
        return (record as Record<string, unknown>)[rowKey as string] ?? index;
      }
      return index;
    },
    [rowKey]
  );

  const handleSort = (column: TableColumn<T>) => {
    if (!(column.sortable || column.sorter)) {
      return;
    }

    setSortState((prev) => {
      if (!prev || prev.key !== column.key) {
        return { key: column.key, order: 'asc' };
      }

      if (prev.order === 'asc') {
        return { key: column.key, order: 'desc' };
      }

      return null;
    });
  };

  const sortedData = React.useMemo(() => {
    if (!sortState) {
      return data;
    }

    const targetColumn = columns.find((column) => column.key === sortState.key);
    if (!targetColumn) {
      return data;
    }

    const comparator = targetColumn.sorter ?? getDefaultSort(targetColumn);
    if (!comparator) {
      return data;
    }

    const cloned = [...data];

    cloned.sort((a, b) => {
      const result = comparator(a, b);
      return sortState.order === 'asc' ? result : -result;
    });

    return cloned;
  }, [columns, data, sortState]);

  const tableClasses = [className].filter(Boolean).join(' ');

  return (
    <TableWrapper className={tableClasses} style={style}>
      <TableContainer $bordered={bordered}>
        <StyledTable aria-label={ariaLabel} data-density={density}>
          <thead>
            <tr>
              {columns.map((column) => {
                const isSortable = Boolean(column.sortable || column.sorter);
                const isActiveSort = sortState?.key === column.key;
                const sortOrder = isActiveSort ? sortState?.order : undefined;

                const headerContent = isSortable ? (
                  <SortButton
                    type="button"
                    onClick={() => handleSort(column)}
                    aria-label={
                      typeof column.title === 'string'
                        ? `${column.title} 정렬`
                        : '정렬'
                    }
                  >
                    <HeaderLabel $paddingY={paddingY} $paddingX={paddingX}>
                      {column.title}
                    </HeaderLabel>
                    <SortIcon $active={isActiveSort} aria-hidden>
                      <Icon
                        name={sortOrder === 'desc' ? 'chevron-down' : 'chevron-up'}
                        size={16}
                        color="currentColor"
                      />
                    </SortIcon>
                  </SortButton>
                ) : (
                  <HeaderLabel $paddingY={paddingY} $paddingX={paddingX}>{column.title}</HeaderLabel>
                );

                return (
                  <HeaderCell
                    key={column.key}
                    style={{ textAlign: column.align ?? 'left', width: column.width }}
                    aria-sort={
                      isActiveSort
                        ? sortOrder === 'asc'
                          ? 'ascending'
                          : 'descending'
                        : undefined
                    }
                    scope="col"
                  >
                    {headerContent}
                  </HeaderCell>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {sortedData.length === 0 ? (
              <BodyRow>
                <EmptyCell colSpan={columns.length || 1} $paddingY={paddingY} $paddingX={paddingX}>
                  {emptyMessage}
                </EmptyCell>
              </BodyRow>
            ) : (
              sortedData.map((row, rowIndex) => {
                const key = getRowKey(row, rowIndex);
                const isSelected = selectable && currentSelectedKey === key;

                return (
                  <BodyRow
                    key={key}
                    $isStriped={striped && rowIndex % 2 === 1}
                    $hoverable={hoverable || Boolean(onRowClick)}
                    $selected={isSelected}
                    onClick={() => {
                      if (selectable) {
                        if (!isControlledSelection) {
                          setInternalSelectedKey(key);
                        }
                        onSelect?.(row);
                      }
                      onRowClick?.(row);
                    }}
                  >
                    {columns.map((column) => {
                      const value = column.dataIndex
                        ? (row as Record<string, unknown>)[column.dataIndex as string]
                        : undefined;
                      const content = column.render
                        ? column.render(value, row, rowIndex)
                        : value;

                      return (
                        <BodyCell
                          key={column.key}
                          style={{ textAlign: column.align ?? 'left', width: column.width }}
                          $paddingY={paddingY}
                          $paddingX={paddingX}
                        >
                          {content}
                        </BodyCell>
                      );
                    })}
                  </BodyRow>
                );
              })
            )}
          </tbody>
        </StyledTable>
      </TableContainer>
    </TableWrapper>
  );
};

const TableWrapper = styled.div`
  width: 100%;
  color: ${colors.text.primary};
`;

const TableContainer = styled.div<{ $bordered: boolean }>`
  width: 100%;
  overflow: auto;
  background-color: ${colors.background.white};
  border: ${({ $bordered }) => ($bordered ? `1px solid ${colors.border.default}` : 'none')};
  border-radius: ${borderRadius.md};
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 520px;
`;

const HeaderCell = styled.th`
  padding: 0;
  background-color: ${colors.background.gray};
  color: ${colors.text.primary};
  border-bottom: 1px solid ${colors.border.default};
  font-weight: ${fontWeight.semibold};
`;

const HeaderLabel = styled.div<{ $paddingY: string; $paddingX: string }>`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  padding: ${({ $paddingY, $paddingX }) => `${$paddingY} ${$paddingX}`};
`;

const SortButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  width: 100%;
  padding: 0;
  background: none;
  border: none;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
`;

const SortIcon = styled.span<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  color: ${({ $active }) => ($active ? colors.text.primary : colors.text.secondary)};
`;

const BodyRow = styled.tr<{ $hoverable: boolean; $isStriped: boolean; $selected: boolean }>`
  transition: background-color 0.12s ease;
  background-color: ${({ $selected, $isStriped }) =>
    $selected ? colors.primary[50] : $isStriped ? colors.background.gray50 : 'transparent'};
  cursor: ${({ $hoverable }) => ($hoverable ? 'pointer' : 'default')};

  &:hover {
    background-color: ${({ $hoverable, $selected }) =>
      $hoverable ? ($selected ? colors.primary[50] : colors.background.gray100) : undefined};
  }

  &:last-child td {
    border-bottom: none;
  }
`;

const BodyCell = styled.td<{ $paddingY: string; $paddingX: string }>`
  padding: ${({ $paddingY, $paddingX }) => `${$paddingY} ${$paddingX}`};
  border-bottom: 1px solid ${colors.border.default};
  color: ${colors.text.primary};
`;

const EmptyCell = styled.td<{ $paddingY: string; $paddingX: string }>`
  padding: ${({ $paddingY, $paddingX }) => `calc(${$paddingY} * 2) ${$paddingX}`};
  text-align: center;
  color: ${colors.text.secondary};
`;
