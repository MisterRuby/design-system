import React from 'react';
import styles from './Table.module.css';
import { colors, spacing, borderRadius } from '../../theme';
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

  const cssVars: React.CSSProperties = {
    '--table-border-color': colors.border.default,
    '--table-header-bg': colors.background.gray,
    '--table-hover-bg': colors.background.gray100,
    '--table-striped-bg': colors.background.gray50,
    '--table-padding-y': paddingY,
    '--table-padding-x': paddingX,
    '--table-radius': borderRadius.md,
    '--table-text-color': colors.text.primary,
    '--table-muted-color': colors.text.secondary,
    '--table-selected-bg': colors.primary[50],
  };

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

  const tableClasses = [styles.tableWrapper, className].filter(Boolean).join(' ');
  const containerClasses = [
    styles.tableContainer,
    bordered ? styles.bordered : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={tableClasses} style={{ ...cssVars, ...style }}>
      <div className={containerClasses}>
        <table className={styles.table} aria-label={ariaLabel}>
          <thead>
            <tr>
              {columns.map((column) => {
                const isSortable = Boolean(column.sortable || column.sorter);
                const isActiveSort = sortState?.key === column.key;
                const sortOrder = isActiveSort ? sortState?.order : undefined;

                const headerContent = isSortable ? (
                  <button
                    type="button"
                    className={styles.sortButton}
                    onClick={() => handleSort(column)}
                    aria-label={
                      typeof column.title === 'string'
                        ? `${column.title} 정렬`
                        : '정렬'
                    }
                  >
                    <span className={styles.headerLabel}>{column.title}</span>
                    <span
                      className={[
                        styles.sortIcon,
                        isActiveSort ? styles.sortActive : '',
                      ].filter(Boolean).join(' ')}
                      aria-hidden
                    >
                      <Icon
                        name={sortOrder === 'desc' ? 'chevron-down' : 'chevron-up'}
                        size={16}
                        color="currentColor"
                      />
                    </span>
                  </button>
                ) : (
                  <div className={styles.headerLabel}>{column.title}</div>
                );

                return (
                  <th
                    key={column.key}
                    className={styles.headerCell}
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
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td
                  className={styles.emptyCell}
                  colSpan={columns.length || 1}
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              sortedData.map((row, rowIndex) => {
                const key = getRowKey(row, rowIndex);
                const isSelected = selectable && currentSelectedKey === key;

                const rowClassName = [
                  styles.row,
                  striped && rowIndex % 2 === 1 ? styles.striped : '',
                  hoverable ? styles.hoverable : '',
                  onRowClick ? styles.clickable : '',
                  isSelected ? styles.selected : '',
                ].filter(Boolean).join(' ');

                return (
                  <tr
                    key={key}
                    className={rowClassName}
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
                        <td
                          key={column.key}
                          className={styles.cell}
                          style={{ textAlign: column.align ?? 'left', width: column.width }}
                        >
                          {content}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
