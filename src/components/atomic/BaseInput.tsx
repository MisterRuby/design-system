import React from "react";
import { colors, fontSize, borderRadius, componentBorders } from "../../tokens";
import { InputVariant, ComponentSize } from "../../types";
import { getInputBorderStyles } from "../shared/inputBorders";

export interface BaseInputProps {
  id?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  size?: ComponentSize;
  variant?: InputVariant;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  'data-testid'?: string;
}

export const BaseInput: React.FC<BaseInputProps> = ({
  id,
  type = "text",
  placeholder,
  value,
  defaultValue,
  size = "medium",
  variant = "default",
  disabled = false,
  required = false,
  readOnly = false,
  className = "",
  style = {},
  onChange,
  onFocus,
  onBlur,
  onKeyPress,
  'data-testid': testId,
}) => {
  const getSizeStyles = (size: string) => {
    switch (size) {
      case "small":
        return {
          padding: "6px 12px",
          fontSize: fontSize.sm,
          height: "32px",
        };
      case "medium":
        return {
          padding: "8px 16px",
          fontSize: fontSize.md,
          height: "40px",
        };
      case "large":
        return {
          padding: "12px 20px",
          fontSize: fontSize.lg,
          height: "48px",
        };
      default:
        return {
          padding: "8px 16px",
          fontSize: fontSize.md,
          height: "40px",
        };
    }
  };

  const variantStyles = getInputBorderStyles(variant);
  const sizeStyles = getSizeStyles(size);
  const baseBorder = disabled ? componentBorders.input.disabled : variantStyles.border;

  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      required={required}
      readOnly={readOnly}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyPress={onKeyPress}
      className={className}
      data-testid={testId}
      style={{
        ...sizeStyles,
        border: baseBorder,
        borderRadius: borderRadius.md,
        fontFamily: "inherit",
        backgroundColor: disabled ? colors.background.disabled : colors.background.white,
        color: disabled ? colors.semantic.muted : colors.semantic.text,
        cursor: disabled ? "not-allowed" : "text",
        transition: "all 0.2s ease-in-out",
        outline: "none",
        width: "100%",
        boxSizing: "border-box",
        ...style,
      }}
      onFocusCapture={(e) => {
        if (!disabled) {
          e.currentTarget.style.border = variantStyles.focusBorder;
          e.currentTarget.style.boxShadow = variantStyles.focusBoxShadow;
        }
      }}
      onBlurCapture={(e) => {
        e.currentTarget.style.border = baseBorder;
        e.currentTarget.style.boxShadow = "none";
      }}
    />
  );
};
