import React from "react";
import { useTheme } from "styled-components";
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
  const theme = useTheme();
  const selectId = React.useId();

  const getSizeStyles = (size: string) => {
    switch (size) {
      case "small":
        return theme.component.input.size.small;
      case "large":
        return theme.component.input.size.large;
      default: // medium
        return theme.component.input.size.medium;
    }
  };

  const variantStyles = getInputBorderStyles(variant, theme);
  const sizeStyles = getSizeStyles(size);
  const showError = variant === "error" && errorMessage;
  const baseBorder = disabled ? theme.componentBorders.input.disabled : variantStyles.border;

  const chevronColor = encodeURIComponent(theme.colors.text.secondary);
  const selectStyles: React.CSSProperties = {
    width: "100%",
    border: baseBorder,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: disabled ? theme.colors.background.disabled : theme.colors.background.white,
    color: disabled ? theme.colors.semantic.muted : theme.colors.semantic.text,
    fontSize: sizeStyles.fontSize,
    padding: sizeStyles.padding,
    height: sizeStyles.height,
    cursor: disabled ? "not-allowed" : "pointer",
    outline: "none",
    transition: theme.transitions.normal,
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='${chevronColor}' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
    backgroundPosition: `right ${theme.spacing.xs} center`,
    backgroundRepeat: "no-repeat",
    backgroundSize: theme.component.iconSizes.md,
    paddingRight: `calc(${theme.spacing.md} * 2)`,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: theme.spacing.xxs }}>
      {label && (
        <label
          htmlFor={selectId}
          style={{
            fontSize: theme.fontSize.sm,
            fontWeight: theme.fontWeight.medium,
            color: theme.colors.semantic.text,
            marginBottom: theme.spacing.xxs,
          }}>
          {label}
          {required && <span style={{ color: theme.colors.semantic.error, marginLeft: `calc(${theme.spacing.xxs} / 2)` }}>*</span>}
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
            fontSize: theme.fontSize.xs,
            color: theme.colors.semantic.error,
            marginTop: theme.spacing.xxs,
          }}>
          {errorMessage}
        </span>
      )}
      {!showError && helperText && (
        <span
          style={{
            fontSize: theme.fontSize.xs,
            color: theme.colors.semantic.secondary,
            marginTop: theme.spacing.xxs,
          }}>
          {helperText}
        </span>
      )}
    </div>
  );
};
