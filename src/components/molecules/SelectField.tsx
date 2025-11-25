import React from "react";
import { borderRadius, colors, componentBorders, fontSize, fontWeight } from "../../theme";
import { InputVariant, ComponentSize } from "../../types";
import { getInputBorderStyles } from "../shared/inputBorders";

export interface SelectFieldOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectFieldProps {
  options: SelectFieldOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  allowClear?: boolean;
  size?: ComponentSize;
  variant?: InputVariant;
  disabled?: boolean;
  required?: boolean;
  multiple?: boolean;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  options,
  value,
  defaultValue,
  placeholder,
  allowClear = false,
  size = "medium",
  variant = "default",
  disabled = false,
  required = false,
  multiple = false,
  label,
  helperText,
  errorMessage,
  className = "",
  style = {},
  onChange,
  onFocus,
  onBlur,
}) => {
  const selectId = React.useId();

  const getSizeStyles = (size: string) => {
    switch (size) {
      case "small":
        return {
          padding: "6px 12px",
          fontSize: fontSize.sm,
          height: "32px",
        };
      case "large":
        return {
          padding: "12px 16px",
          fontSize: fontSize.md,
          height: "48px",
        };
      default: // medium
        return {
          padding: "8px 12px",
          fontSize: fontSize.sm,
          height: "40px",
        };
    }
  };

  const variantStyles = getInputBorderStyles(variant);
  const sizeStyles = getSizeStyles(size);
  const showError = variant === "error" && errorMessage;
  const baseBorder = disabled ? componentBorders.input.disabled : variantStyles.border;

  const selectStyles: React.CSSProperties = {
    width: "100%",
    border: baseBorder,
    borderRadius: borderRadius.sm,
    backgroundColor: disabled ? colors.background.disabled : colors.background.white,
    color: disabled ? colors.semantic.muted : colors.semantic.text,
    fontSize: sizeStyles.fontSize,
    padding: sizeStyles.padding,
    height: sizeStyles.height,
    cursor: disabled ? "not-allowed" : "pointer",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
    backgroundPosition: "right 8px center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "16px",
    paddingRight: "32px",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      {label && (
        <label
          htmlFor={selectId}
          style={{
            fontSize: fontSize.sm,
            fontWeight: fontWeight.medium,
            color: colors.semantic.text,
            marginBottom: "4px",
          }}>
          {label}
          {required && <span style={{ color: colors.semantic.error, marginLeft: "2px" }}>*</span>}
        </label>
      )}
      <select
        id={selectId}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        required={required}
        multiple={multiple}
        className={className}
        style={{
          ...selectStyles,
          ...style,
        }}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onFocusCapture={(e) => {
          e.currentTarget.style.border = variantStyles.focusBorder;
          e.currentTarget.style.boxShadow = `0 0 0 3px ${variantStyles.focusBoxShadow}`;
        }}
        onBlurCapture={(e) => {
          e.currentTarget.style.border = baseBorder;
          e.currentTarget.style.boxShadow = "none";
        }}>
        {placeholder && (
          <option value="" disabled={!allowClear}>
            {placeholder}
          </option>
        )}
        {allowClear && !placeholder && (
          <option value="">-- 선택 해제 --</option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
      {showError && errorMessage && (
        <span
          style={{
            fontSize: fontSize.xs,
            color: colors.semantic.error,
            marginTop: "4px",
          }}>
          {errorMessage}
        </span>
      )}
      {!showError && helperText && (
        <span
          style={{
            fontSize: fontSize.xs,
            color: colors.semantic.secondary,
            marginTop: "4px",
          }}>
          {helperText}
        </span>
      )}
    </div>
  );
};
