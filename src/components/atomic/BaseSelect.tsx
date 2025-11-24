import React from "react";
import { colors, fontSize } from "../../theme";
import { InputVariant, ComponentSize } from "../../types";

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
          borderColor: colors.border.warning || colors.semantic.warning,
          focusBorderColor: colors.border.focus.warning || colors.semantic.warning,
          focusBoxShadow: colors.focusRing.warning,
        };
      case "info":
        return {
          borderColor: colors.border.info || colors.semantic.info,
          focusBorderColor: colors.border.focus.info || colors.semantic.info,
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

  const variantStyles = getVariantStyles(variant);
  const sizeStyles = getSizeStyles(size);

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
        border: `2px solid ${variantStyles.borderColor}`,
        borderRadius: "8px",
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
          e.currentTarget.style.borderColor = variantStyles.focusBorderColor;
          e.currentTarget.style.boxShadow = variantStyles.focusBoxShadow;
        }
      }}
      onBlurCapture={(e) => {
        e.currentTarget.style.borderColor = variantStyles.borderColor;
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