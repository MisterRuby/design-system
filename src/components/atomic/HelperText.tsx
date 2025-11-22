import React from "react";
import { colors } from "../../theme";

export interface HelperTextProps {
  children: React.ReactNode;
  show?: boolean;
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
}

export const HelperText: React.FC<HelperTextProps> = ({
  children,
  show = true,
  className = "",
  style = {},
  'data-testid': testId,
}) => {
  if (!show) return null;
  return (
    <span
      className={className}
      data-testid={testId}
      style={{
        fontSize: "12px",
        color: colors.semantic.secondary,
        marginTop: "2px",
        display: "block",
        fontFamily: "inherit",
        ...style,
      }}
    >
      {children}
    </span>
  );
};