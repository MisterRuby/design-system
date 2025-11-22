import React from "react";
import { colors } from "../../theme";

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
          checkbox: "16px",
          text: "14px",
          gap: "8px",
        };
      case "lg":
        return {
          checkbox: "24px",
          text: "18px",
          gap: "12px",
        };
      default: // md
        return {
          checkbox: "20px",
          text: "16px",
          gap: "10px",
        };
    }
  };

  const getColorStyles = () => {
    const colorMap = {
      primary: colors.semantic.primary,
      secondary: colors.semantic.secondary,
      success: colors.semantic.success,
      error: colors.semantic.error,
      warning: colors.semantic.warning,
      info: colors.semantic.info,
    };
    return colorMap[color];
  };

  const sizeStyles = getSizeStyles();
  const accentColor = getColorStyles();

  const checkboxStyles: React.CSSProperties = {
    width: sizeStyles.checkbox,
    height: sizeStyles.checkbox,
    cursor: disabled ? "not-allowed" : "pointer",
    accentColor: disabled ? colors.semantic.muted : accentColor,
    marginTop: description ? "0.125em" : "0", // description이 있을 때만 marginTop 적용
    flexShrink: 0, // 체크박스 크기 고정
  };

  const labelStyles: React.CSSProperties = {
    fontSize: sizeStyles.text,
    color: disabled ? colors.semantic.muted : colors.semantic.text,
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
    fontSize: size === "sm" ? "12px" : size === "lg" ? "16px" : "14px",
    color: disabled ? colors.semantic.muted : colors.semantic.secondary,
    marginTop: "4px",
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
          {required && <span style={{ color: colors.semantic.error, marginLeft: "2px" }}>*</span>}
        </label>
        {description && <div style={descriptionStyles}>{description}</div>}
        {errorMessage && (
          <div style={{
            fontSize: "12px",
            color: colors.semantic.error,
            marginTop: "4px",
          }}>
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};