import React from "react";
import { useTheme } from "styled-components";

export interface CheckboxFieldProps {
  id?: string;
  name?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  indeterminate?: boolean;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "success" | "error" | "warning" | "info";
  label?: string;
  description?: string;
  errorMessage?: string;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  id,
  name,
  checked,
  defaultChecked,
  disabled = false,
  required = false,
  indeterminate = false,
  size = "md",
  color = "primary",
  label,
  description,
  errorMessage,
  className = "",
  style = {},
  onChange,
  onFocus,
  onBlur,
}) => {
  const theme = useTheme();
  const checkboxRef = React.useRef<HTMLInputElement>(null);
  const generatedId = React.useId();
  const checkboxId = id || generatedId;

  React.useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return {
          checkbox: theme.component.iconSizes.md,
          text: theme.fontSize.sm,
          gap: theme.spacing.xs,
        };
      case "lg":
        return {
          checkbox: theme.component.iconSizes['2xl'],
          text: theme.fontSize.lg,
          gap: theme.spacing.sm,
        };
      default: // md
        return {
          checkbox: theme.component.iconSizes.xl,
          text: theme.fontSize.md,
          gap: `calc(${theme.spacing.sm} - ${theme.spacing.xxs} / 2)`,
        };
    }
  };

  const getColorStyles = () => {
    const colorMap = {
      primary: theme.colors.semantic.primary,
      secondary: theme.colors.semantic.secondary,
      success: theme.colors.semantic.success,
      error: theme.colors.semantic.error,
      warning: theme.colors.semantic.warning,
      info: theme.colors.semantic.info,
    };
    return colorMap[color];
  };

  const sizeStyles = getSizeStyles();
  const accentColor = getColorStyles();

  const checkboxStyles: React.CSSProperties = {
    width: sizeStyles.checkbox,
    height: sizeStyles.checkbox,
    cursor: disabled ? "not-allowed" : "pointer",
    accentColor: disabled ? theme.colors.semantic.muted : accentColor,
    marginTop: description ? "0.125em" : "0", // description이 있을 때만 marginTop 적용
    flexShrink: 0, // 체크박스 크기 고정
  };

  const labelStyles: React.CSSProperties = {
    fontSize: sizeStyles.text,
    color: disabled ? theme.colors.semantic.muted : theme.colors.semantic.text,
    cursor: disabled ? "not-allowed" : "pointer",
    userSelect: "none",
    lineHeight: "1.2", // 라인 높이를 명시적으로 설정
  };

  const containerStyles: React.CSSProperties = {
    display: "inline-flex",
    alignItems: description ? "flex-start" : "center",
    gap: sizeStyles.gap,
    ...style,
  };

  const descriptionStyles: React.CSSProperties = {
    fontSize: size === "sm" ? theme.fontSize.xs : size === "lg" ? theme.fontSize.md : theme.fontSize.sm,
    color: disabled ? theme.colors.semantic.muted : theme.colors.semantic.secondary,
    marginTop: theme.spacing.xxs,
  };

  if (!label) {
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
        className={className}
        style={checkboxStyles}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );
  }

  return (
    <div style={containerStyles} className={className}>
      <input
        ref={checkboxRef}
        type="checkbox"
        id={checkboxId}
        name={name}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        required={required}
        style={checkboxStyles}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <div>
        <label htmlFor={checkboxId} style={labelStyles}>
          {label}
          {required && <span style={{ color: theme.colors.semantic.error, marginLeft: `calc(${theme.spacing.xxs} / 2)` }}>*</span>}
        </label>
        {description && <div style={descriptionStyles}>{description}</div>}
        {errorMessage && (
          <div style={{
            fontSize: theme.fontSize.xs,
            color: theme.colors.semantic.error,
            marginTop: theme.spacing.xxs,
          }}>
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};
