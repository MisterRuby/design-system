import React from "react";
import { colors } from "../../theme";
import { InputVariant, ComponentSize } from "../../types";

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

  const getVariantStyles = (variant: string) => {
    switch (variant) {
      case "default":
        return {
          borderColor: colors.border.default,
          focusBorderColor: colors.border.focus.primary,
          focusBoxShadow: colors.focusRing.primary,
        };
      case "primary":
        return {
          borderColor: colors.border.primary,
          focusBorderColor: colors.border.focus.primary,
          focusBoxShadow: colors.focusRing.primary,
        };
      case "secondary":
        return {
          borderColor: colors.border.secondary,
          focusBorderColor: colors.border.focus.secondary,
          focusBoxShadow: colors.focusRing.secondary,
        };
      case "success":
        return {
          borderColor: colors.border.success,
          focusBorderColor: colors.border.focus.success,
          focusBoxShadow: colors.focusRing.success,
        };
      case "error":
        return {
          borderColor: colors.border.error,
          focusBorderColor: colors.border.focus.error,
          focusBoxShadow: colors.focusRing.error,
        };
      case "warning":
        return {
          borderColor: colors.border.warning,
          focusBorderColor: colors.border.focus.warning,
          focusBoxShadow: colors.focusRing.warning,
        };
      case "info":
        return {
          borderColor: colors.border.info,
          focusBorderColor: colors.border.focus.info,
          focusBoxShadow: colors.focusRing.info,
        };
      default:
        return {
          borderColor: colors.border.default,
          focusBorderColor: colors.border.focus.primary,
          focusBoxShadow: colors.focusRing.primary,
        };
    }
  };

  const getSizeStyles = (size: string) => {
    switch (size) {
      case "small":
        return {
          padding: "6px 12px",
          fontSize: "14px",
          height: "32px",
        };
      case "large":
        return {
          padding: "12px 16px",
          fontSize: "16px",
          height: "48px",
        };
      default: // medium
        return {
          padding: "8px 12px",
          fontSize: "14px",
          height: "40px",
        };
    }
  };

  const variantStyles = getVariantStyles(variant);
  const sizeStyles = getSizeStyles(size);
  const showError = variant === "error" && errorMessage;

  const selectStyles: React.CSSProperties = {
    width: "100%",
    border: `1px solid ${variantStyles.borderColor}`,
    borderRadius: "6px",
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
            fontSize: "14px",
            fontWeight: "500",
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
          e.currentTarget.style.borderColor = variantStyles.focusBorderColor;
          e.currentTarget.style.boxShadow = `0 0 0 3px ${variantStyles.focusBoxShadow}`;
        }}
        onBlurCapture={(e) => {
          e.currentTarget.style.borderColor = variantStyles.borderColor;
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
            fontSize: "12px",
            color: colors.semantic.error,
            marginTop: "4px",
          }}>
          {errorMessage}
        </span>
      )}
      {!showError && helperText && (
        <span
          style={{
            fontSize: "12px",
            color: colors.semantic.secondary,
            marginTop: "4px",
          }}>
          {helperText}
        </span>
      )}
    </div>
  );
};