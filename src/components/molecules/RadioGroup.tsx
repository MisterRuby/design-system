import React from "react";
import { colors, fontSize, fontWeight } from "../../tokens";
import { CheckboxSize } from "../../types";

export interface RadioGroupOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
}

export interface RadioGroupProps {
  name: string;
  options: RadioGroupOption[];
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  size?: CheckboxSize;
  color?: "primary" | "secondary" | "success" | "error" | "warning" | "info";
  direction?: "horizontal" | "vertical";
  label?: string;
  helperText?: string;
  errorMessage?: string;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  defaultValue,
  disabled = false,
  required = false,
  size = "md",
  color = "primary",
  direction = "vertical",
  label,
  helperText,
  errorMessage,
  className = "",
  style = {},
  onChange,
  onFocus,
  onBlur,
}) => {
  const radioGroupId = React.useId();

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return {
          radio: "16px",
          text: fontSize.sm,
          gap: "8px",
          itemGap: "8px",
        };
      case "lg":
        return {
          radio: "24px",
          text: fontSize.lg,
          gap: "12px",
          itemGap: "16px",
        };
      default: // md
        return {
          radio: "20px",
          text: fontSize.md,
          gap: "10px",
          itemGap: "12px",
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

  const radioStyles: React.CSSProperties = {
    width: sizeStyles.radio,
    height: sizeStyles.radio,
    cursor: disabled ? "not-allowed" : "pointer",
    accentColor: disabled ? colors.semantic.muted : accentColor,
    flexShrink: 0,
    margin: 0,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const labelStyles: React.CSSProperties = {
    fontSize: sizeStyles.text,
    color: disabled ? colors.semantic.muted : colors.semantic.text,
    cursor: disabled ? "not-allowed" : "pointer",
    userSelect: "none",
    lineHeight: "1.4",
    display: "flex",
    alignItems: "center",
    minHeight: sizeStyles.radio,
  };

  const optionContainerStyles: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: sizeStyles.gap,
  };

  const optionsContainerStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: direction === "horizontal" ? "row" : "column",
    gap: sizeStyles.itemGap,
    flexWrap: direction === "horizontal" ? "wrap" : "nowrap",
  };

  const descriptionStyles: React.CSSProperties = {
    fontSize: size === "sm" ? fontSize.xs : size === "lg" ? fontSize.md : fontSize.sm,
    color: disabled ? colors.semantic.muted : colors.semantic.secondary,
    marginTop: "2px",
  };

  const containerStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    ...style,
  };

  const showError = errorMessage;

  return (
    <div style={containerStyles} className={className}>
      {label && (
        <legend
          style={{
            fontSize: fontSize.sm,
            fontWeight: fontWeight.medium,
            color: colors.semantic.text,
            marginBottom: "4px",
            padding: 0,
            border: "none",
          }}>
          {label}
          {required && <span style={{ color: colors.semantic.error, marginLeft: "2px" }}>*</span>}
        </legend>
      )}

      <div style={optionsContainerStyles}>
        {options.map((option, index) => {
          const optionId = `${radioGroupId}-${index}`;
          const isDisabled = disabled || option.disabled;
          const isControlled = value !== undefined;
          const hasDefaultValue = defaultValue !== undefined;
          const defaultCheckedValue = !isControlled
            ? hasDefaultValue
              ? defaultValue === option.value
              : index === 0
            : undefined;

          // 디버깅용 로그
          if (index === 0) {
            console.log('Radio debug:', {
              option: option.value,
              isControlled,
              hasDefaultValue,
              defaultValue,
              defaultCheckedValue,
              index
            });
          }

          return (
            <div key={option.value} style={optionContainerStyles}>
              <input
                type="radio"
                id={optionId}
                name={name}
                value={option.value}
                checked={isControlled ? value === option.value : undefined}
                defaultChecked={defaultCheckedValue}
                disabled={isDisabled}
                required={required}
                style={radioStyles}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
              />
              <div>
                <label
                  htmlFor={optionId}
                  style={{
                    ...labelStyles,
                    color: isDisabled ? colors.semantic.muted : colors.semantic.text,
                    cursor: isDisabled ? "not-allowed" : "pointer",
                  }}>
                  {option.label}
                </label>
                {option.description && (
                  <div
                    style={{
                      ...descriptionStyles,
                      color: isDisabled ? colors.semantic.muted : colors.semantic.secondary,
                    }}>
                    {option.description}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showError && (
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
