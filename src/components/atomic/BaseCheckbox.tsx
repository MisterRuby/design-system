import React from "react";
import { borderRadius, colors, componentBorders } from "../../theme";

export interface BaseCheckboxProps {
  id?: string;
  name?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  indeterminate?: boolean;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "success" | "error" | "warning" | "info";
  className?: string;
  style?: React.CSSProperties;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  'data-testid'?: string;
}

export const BaseCheckbox: React.FC<BaseCheckboxProps> = ({
  id,
  name,
  checked,
  defaultChecked,
  disabled = false,
  required = false,
  indeterminate = false,
  size = "md",
  color = "primary",
  className = "",
  style = {},
  onChange,
  onFocus,
  onBlur,
  'data-testid': testId,
}) => {
  const checkboxRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return { width: "16px", height: "16px" };
      case "md":
        return { width: "20px", height: "20px" };
      case "lg":
        return { width: "24px", height: "24px" };
      default:
        return { width: "20px", height: "20px" };
    }
  };

  const getColorStyles = () => {
    switch (color) {
      case "primary":
        return {
          accentColor: colors.semantic.primary,
          focusColor: colors.focusRing.primary,
        };
      case "secondary":
        return {
          accentColor: colors.semantic.secondary,
          focusColor: colors.focusRing.secondary,
        };
      case "success":
        return {
          accentColor: colors.semantic.success,
          focusColor: colors.focusRing.success,
        };
      case "error":
        return {
          accentColor: colors.semantic.error,
          focusColor: colors.focusRing.error,
        };
      case "warning":
        return {
          accentColor: colors.semantic.warning,
          focusColor: colors.focusRing.warning,
        };
      case "info":
        return {
          accentColor: colors.semantic.info,
          focusColor: colors.focusRing.info,
        };
      default:
        return {
          accentColor: colors.semantic.primary,
          focusColor: colors.focusRing.primary,
        };
    }
  };

  const sizeStyles = getSizeStyles();
  const colorStyles = getColorStyles();
  const borderStyle = disabled
    ? componentBorders.input.disabled
    : color === "error"
      ? componentBorders.input.error
      : componentBorders.input.default;

  return (
    <input
      ref={checkboxRef}
      type="checkbox"
      id={id}
      name={name}
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      required={required}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      className={className}
      data-testid={testId}
      style={{
        ...sizeStyles,
        accentColor: colorStyles.accentColor,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        borderRadius: borderRadius.sm,
        border: borderStyle,
        ...style,
      }}
    />
  );
};
