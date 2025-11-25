import React from "react";
import { colors, fontSize, borderRadius, componentBorders } from "../../theme";
import { InputVariant, ComponentSize } from "../../types";
import { getInputBorderStyles } from "../shared/inputBorders";

export interface BaseSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface BaseSelectProps {
  options: BaseSelectOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  size?: ComponentSize;
  variant?: InputVariant;
  disabled?: boolean;
  required?: boolean;
  multiple?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  'data-testid'?: string;
}

export const BaseSelect: React.FC<BaseSelectProps> = ({
  options,
  value,
  defaultValue,
  placeholder,
  size = "medium",
  variant = "default",
  disabled = false,
  required = false,
  multiple = false,
  className = "",
  style = {},
  onChange,
  onFocus,
  onBlur,
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
    <select
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      required={required}
      multiple={multiple}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      className={className}
      data-testid={testId}
      style={{
        ...sizeStyles,
        border: baseBorder,
        borderRadius: borderRadius.md,
        fontFamily: "inherit",
        backgroundColor: disabled ? colors.background.disabled : colors.background.white,
        color: disabled ? colors.semantic.muted : colors.semantic.text,
        cursor: disabled ? "not-allowed" : "pointer",
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
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};
