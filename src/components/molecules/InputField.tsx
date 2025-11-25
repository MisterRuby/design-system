import React from "react";
import { Icon, IconName } from "../atomic/Icon";
import { borderRadius, colors, componentBorders, fontSize, fontWeight } from "../../theme";
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
  // 고유한 ID 생성
  const inputId = React.useId();
  const getSizeStyles = (size: string) => {
    switch (size) {
      case "small":
        return {
          padding: "6px 12px",
          fontSize: fontSize.sm,
          height: "32px",
          iconSize: 16,
          iconPadding: "8px",
        };
      case "medium":
        return {
          padding: "8px 16px",
          fontSize: fontSize.md,
          height: "40px",
          iconSize: 18,
          iconPadding: "12px",
        };
      case "large":
        return {
          padding: "12px 20px",
          fontSize: fontSize.lg,
          height: "48px",
          iconSize: 20,
          iconPadding: "16px",
        };
      default:
        return {
          padding: "8px 16px",
          fontSize: fontSize.md,
          height: "40px",
          iconSize: 18,
          iconPadding: "12px",
        };
    }
  };

  const variantStyles = getInputBorderStyles(variant);
  const sizeStyles = getSizeStyles(size);
  const showError = variant === "error" && errorMessage;
  const baseBorder = disabled ? componentBorders.input.disabled : variantStyles.border;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontSize: fontSize.sm,
            fontWeight: fontWeight.medium,
            color: colors.semantic.text,
            marginBottom: "4px",
          }}>
          {label}
          {required && (
            <span style={{ color: colors.semantic.error, marginLeft: "4px" }}>*</span>
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
              color={disabled ? colors.semantic.muted : colors.semantic.secondary}
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
                ? `calc(${sizeStyles.iconPadding} + ${sizeStyles.iconSize}px + 8px)`
                : sizeStyles.padding.split(" ")[1],
            paddingRight:
              icon && iconPosition === "right"
                ? `calc(${sizeStyles.iconPadding} + ${sizeStyles.iconSize}px + 8px)`
                : sizeStyles.padding.split(" ")[1],
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
              color={disabled ? colors.semantic.muted : colors.semantic.secondary}
            />
          </div>
        )}
      </div>

      {showError && (
        <span
          style={{
            fontSize: fontSize.xs,
            color: colors.semantic.error,
            marginTop: "2px",
          }}>
          {errorMessage}
        </span>
      )}

      {helperText && !showError && (
        <span
          style={{
            fontSize: fontSize.xs,
            color: colors.semantic.secondary,
            marginTop: "2px",
          }}>
          {helperText}
        </span>
      )}
    </div>
  );
};
