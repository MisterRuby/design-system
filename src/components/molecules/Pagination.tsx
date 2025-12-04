import React from "react";
import { Button } from "../atomic/Button";
import { Icon } from "../atomic/Icon";
import {
  colors,
  spacing,
  fontSize,
  fontWeight,
  borderRadius,
  transitions,
} from "../../theme";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  showFirstLast?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: React.CSSProperties;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
  disabled = false,
  size = "md",
  className = "",
  style = {},
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return {
          buttonSize: "32px",
          fontSize: fontSize.xs,
          padding: spacing.xs,
        };
      case "md":
        return {
          buttonSize: "40px",
          fontSize: fontSize.sm,
          padding: spacing.sm,
        };
      case "lg":
        return {
          buttonSize: "48px",
          fontSize: fontSize.md,
          padding: spacing.md,
        };
    }
  };

  const sizeStyles = getSizeStyles();

  const generatePageNumbers = () => {
    const totalNumbers = siblingCount * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages <= totalBlocks) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, "...", totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      );
      return [1, "...", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [1, "...", ...middleRange, "...", totalPages];
    }

    return [];
  };

  const pageNumbers = generatePageNumbers();

  const handlePageChange = (page: number) => {
    if (disabled || page < 1 || page > totalPages || page === currentPage) {
      return;
    }
    onPageChange(page);
  };

  const pageButtonStyles = (isActive: boolean): React.CSSProperties => ({
    minWidth: sizeStyles.buttonSize,
    height: sizeStyles.buttonSize,
    padding: `0 ${sizeStyles.padding}`,
    fontSize: sizeStyles.fontSize,
    fontWeight: isActive ? fontWeight.semibold : fontWeight.normal,
    color: isActive ? colors.semantic.primary : colors.text.primary,
    backgroundColor: "transparent",
    border: "none",
    borderRadius: borderRadius.sm,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: transitions.normal,
    opacity: disabled ? 0.6 : 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  const navButtonStyles: React.CSSProperties = {
    minWidth: sizeStyles.buttonSize,
    height: sizeStyles.buttonSize,
    padding: `0 ${sizeStyles.padding}`,
    fontSize: sizeStyles.fontSize,
    color: colors.text.primary,
    backgroundColor: "transparent",
    border: "none",
    borderRadius: borderRadius.sm,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: transitions.normal,
    opacity: disabled ? 0.6 : 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const dotsStyles: React.CSSProperties = {
    minWidth: sizeStyles.buttonSize,
    height: sizeStyles.buttonSize,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: sizeStyles.fontSize,
    color: colors.text.muted,
    cursor: "default",
    userSelect: "none",
  };

  const containerStyles: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: spacing.xxs,
    listStyle: "none",
    padding: 0,
    margin: 0,
    ...style,
  };

  return (
    <ul className={className} style={containerStyles} role="navigation" aria-label="페이지네이션">
      {/* 첫 페이지 버튼 */}
      {showFirstLast && (
        <li>
          <button
            onClick={() => handlePageChange(1)}
            disabled={disabled || currentPage === 1}
            style={navButtonStyles}
            aria-label="첫 페이지">
            <Icon name="chevrons-left" size={16} color="currentColor" />
          </button>
        </li>
      )}

      {/* 이전 페이지 버튼 */}
      <li>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={disabled || currentPage === 1}
          style={navButtonStyles}
          aria-label="이전 페이지">
          <Icon name="chevron-left" size={16} color="currentColor" />
        </button>
      </li>

      {/* 페이지 번호 버튼들 */}
      {pageNumbers.map((pageNumber, index) => {
        if (pageNumber === "...") {
          return (
            <li key={`dots-${index}`}>
              <span style={dotsStyles}>...</span>
            </li>
          );
        }

        const page = pageNumber as number;
        const isActive = page === currentPage;

        return (
          <li key={page}>
            <button
              onClick={() => handlePageChange(page)}
              disabled={disabled}
              style={pageButtonStyles(isActive)}
              aria-label={`페이지 ${page}`}
              aria-current={isActive ? "page" : undefined}>
              {page}
            </button>
          </li>
        );
      })}

      {/* 다음 페이지 버튼 */}
      <li>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={disabled || currentPage === totalPages}
          style={navButtonStyles}
          aria-label="다음 페이지">
          <Icon name="chevron-right" size={16} color="currentColor" />
        </button>
      </li>

      {/* 마지막 페이지 버튼 */}
      {showFirstLast && (
        <li>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={disabled || currentPage === totalPages}
            style={navButtonStyles}
            aria-label="마지막 페이지">
            <Icon name="chevrons-right" size={16} color="currentColor" />
          </button>
        </li>
      )}
    </ul>
  );
};
