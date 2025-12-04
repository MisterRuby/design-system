import React from "react";
import { Icon, IconName } from "../atomic/Icon";
import { useTheme } from "styled-components";
import { InputVariant, ComponentSize } from "../../types";
import { getInputBorderStyles } from "../shared/inputBorders";

export interface InputFieldProps {
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  size?: ComponentSize;
  variant?: InputVariant;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  icon?: IconName;
  iconPosition?: "left" | "right";
  className?: string;
  style?: React.CSSProperties;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  placeholder,
  value,
  defaultValue,
  size = "medium",
  variant = "default",
  disabled = false,
  required = false,
  readOnly = false,
  label,
  helperText,
  errorMessage,
  icon,
  iconPosition = "left",
  className = "",
  style = {},
  onChange,
  onFocus,
  onBlur,
  onKeyPress,
}) => {
  const theme = useTheme();
  // 고유한 ID 생성
  const inputId = React.useId();
  const getSizeStyles = (size: string) => {
    switch (size) {
      case "small":
        return {
          padding: theme.component.input.size.small.padding,
          fontSize: theme.component.input.size.small.fontSize,
          height: theme.component.input.size.small.height,
          iconSize: parseInt(theme.component.iconSizes.md, 10),
          iconPadding: theme.spacing.xs,
        };
      case "medium":
        return {
          padding: theme.component.input.size.medium.padding,
          fontSize: theme.component.input.size.medium.fontSize,
          height: theme.component.input.size.medium.height,
          iconSize: parseInt(theme.component.iconSizes.lg, 10),
          iconPadding: theme.spacing.sm,
        };
      case "large":
        return {
          padding: theme.component.input.size.large.padding,
          fontSize: theme.component.input.size.large.fontSize,
          height: theme.component.input.size.large.height,
          iconSize: parseInt(theme.component.iconSizes.xl, 10),
          iconPadding: theme.spacing.md,
        };
      default:
        return {
          padding: theme.component.input.size.medium.padding,
          fontSize: theme.component.input.size.medium.fontSize,
          height: theme.component.input.size.medium.height,
          iconSize: parseInt(theme.component.iconSizes.lg, 10),
          iconPadding: theme.spacing.sm,
        };
    }
  };

  const variantStyles = getInputBorderStyles(variant, theme);
  const sizeStyles = getSizeStyles(size);
  const showError = variant === "error" && errorMessage;
  const baseBorder = disabled ? theme.componentBorders.input.disabled : variantStyles.border;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: theme.spacing.xxs }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontSize: theme.fontSize.sm,
            fontWeight: theme.fontWeight.medium,
            color: theme.colors.semantic.text,
            marginBottom: theme.spacing.xxs,
          }}>
          {label}
          {required && (
            <span style={{ color: theme.colors.semantic.error, marginLeft: theme.spacing.xxs }}>*</span>
          )}
        </label>
      )}

      <div
        style={{ position: "relative", display: "flex", alignItems: "center" }}>
        {icon && iconPosition === "left" && (
          <div
            style={{
              position: "absolute",
              left: sizeStyles.iconPadding,
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              pointerEvents: "none",
            }}>
            <Icon
              name={icon}
              size={sizeStyles.iconSize}
              color={disabled ? theme.colors.semantic.muted : theme.colors.semantic.secondary}
            />
          </div>
        )}

        <input
          id={inputId}
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
          style={{
            ...sizeStyles,
            paddingLeft:
              icon && iconPosition === "left"
                ? `calc(${sizeStyles.iconPadding} + ${sizeStyles.iconSize}px + ${theme.spacing.xs})`
                : sizeStyles.padding.split(" ")[1],
            paddingRight:
              icon && iconPosition === "right"
                ? `calc(${sizeStyles.iconPadding} + ${sizeStyles.iconSize}px + ${theme.spacing.xs})`
                : sizeStyles.padding.split(" ")[1],
            border: baseBorder,
            borderRadius: theme.borderRadius.md,
            fontFamily: "inherit",
            backgroundColor: disabled ? theme.colors.background.disabled : theme.colors.background.white,
            color: disabled ? theme.colors.semantic.muted : theme.colors.semantic.text,
            cursor: disabled ? "not-allowed" : "text",
            transition: theme.transitions.normal,
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

        {icon && iconPosition === "right" && (
          <div
            style={{
              position: "absolute",
              right: sizeStyles.iconPadding,
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              pointerEvents: "none",
            }}>
            <Icon
              name={icon}
              size={sizeStyles.iconSize}
              color={disabled ? theme.colors.semantic.muted : theme.colors.semantic.secondary}
            />
          </div>
        )}
      </div>

      {showError && (
        <span
          style={{
            fontSize: theme.fontSize.xs,
            color: theme.colors.semantic.error,
            marginTop: `calc(${theme.spacing.xxs} / 2)`,
          }}>
          {errorMessage}
        </span>
      )}

      {helperText && !showError && (
        <span
          style={{
            fontSize: theme.fontSize.xs,
            color: theme.colors.semantic.secondary,
            marginTop: `calc(${theme.spacing.xxs} / 2)`,
          }}>
          {helperText}
        </span>
      )}
    </div>
  );
};
