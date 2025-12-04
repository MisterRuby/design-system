import React from "react";
import { useTheme } from "styled-components";
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
  const theme = useTheme();
  const radioGroupId = React.useId();

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return {
          radio: theme.component.iconSizes.md,
          text: theme.fontSize.sm,
          gap: theme.spacing.xs,
          itemGap: theme.spacing.xs,
        };
      case "lg":
        return {
          radio: theme.component.iconSizes['2xl'],
          text: theme.fontSize.lg,
          gap: theme.spacing.sm,
          itemGap: theme.spacing.md,
        };
      default: // md
        return {
          radio: theme.component.iconSizes.xl,
          text: theme.fontSize.md,
          gap: `calc(${theme.spacing.sm} - ${theme.spacing.xxs} / 2)`,
          itemGap: theme.spacing.sm,
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

  const radioStyles: React.CSSProperties = {
    width: sizeStyles.radio,
    height: sizeStyles.radio,
    cursor: disabled ? "not-allowed" : "pointer",
    accentColor: disabled ? theme.colors.semantic.muted : accentColor,
    flexShrink: 0,
    margin: 0,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const labelStyles: React.CSSProperties = {
    fontSize: sizeStyles.text,
    color: disabled ? theme.colors.semantic.muted : theme.colors.semantic.text,
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
    fontSize: size === "sm" ? theme.fontSize.xs : size === "lg" ? theme.fontSize.md : theme.fontSize.sm,
    color: disabled ? theme.colors.semantic.muted : theme.colors.semantic.secondary,
    marginTop: `calc(${theme.spacing.xxs} / 2)`,
  };

  const containerStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing.xs,
    ...style,
  };

  const showError = errorMessage;

  return (
    <div style={containerStyles} className={className}>
      {label && (
        <legend
          style={{
            fontSize: theme.fontSize.sm,
            fontWeight: theme.fontWeight.medium,
            color: theme.colors.semantic.text,
            marginBottom: theme.spacing.xxs,
            padding: 0,
            border: "none",
          }}>
          {label}
          {required && <span style={{ color: theme.colors.semantic.error, marginLeft: `calc(${theme.spacing.xxs} / 2)` }}>*</span>}
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
                    color: isDisabled ? theme.colors.semantic.muted : theme.colors.semantic.text,
                    cursor: isDisabled ? "not-allowed" : "pointer",
                  }}>
                  {option.label}
                </label>
                {option.description && (
                  <div
                    style={{
                      ...descriptionStyles,
                      color: isDisabled ? theme.colors.semantic.muted : theme.colors.semantic.secondary,
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
