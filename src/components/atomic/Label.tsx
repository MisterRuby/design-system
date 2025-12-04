import React from "react";
import { colors, fontSize, fontWeight } from "../../tokens";

export interface LabelProps {
  htmlFor?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
}

export const Label: React.FC<LabelProps> = ({
  htmlFor,
  required = false,
  children,
  className = "",
  style = {},
  'data-testid': testId,
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={className}
      data-testid={testId}
      style={{
        fontSize: fontSize.sm,
        fontWeight: fontWeight.medium,
        color: colors.semantic.text,
        marginBottom: "4px",
        display: "block",
        fontFamily: "inherit",
        ...style,
      }}
    >
      {children}
      {required && (
        <span style={{ color: colors.semantic.error, marginLeft: "4px" }}>
          *
        </span>
      )}
    </label>
  );
};
