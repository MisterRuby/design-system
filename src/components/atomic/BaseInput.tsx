import React from "react";
import styled from "styled-components";
import { InputVariant, ComponentSize } from "../../types";

export interface BaseInputProps {
  id?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  size?: ComponentSize;
  variant?: InputVariant;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  'data-testid'?: string;
}

const getBorderColor = (variant: InputVariant, theme: any) => {
  const variantMap: Record<InputVariant, string> = {
    default: theme.colors.border.default,
    primary: theme.colors.border.primary,
    secondary: theme.colors.border.secondary,
    success: theme.colors.border.success,
    error: theme.colors.border.error,
    warning: theme.colors.border.warning,
    info: theme.colors.border.info,
  };
  return variantMap[variant];
};

const getFocusRing = (variant: InputVariant, theme: any) => {
  const variantMap: Record<InputVariant, string> = {
    default: `0 0 0 3px ${theme.colors.primary[100]}`,
    primary: `0 0 0 3px ${theme.colors.primary[100]}`,
    secondary: `0 0 0 3px ${theme.colors.gray[100]}`,
    success: `0 0 0 3px ${theme.colors.success[100]}`,
    error: `0 0 0 3px ${theme.colors.error[100]}`,
    warning: `0 0 0 3px ${theme.colors.warning[100]}`,
    info: `0 0 0 3px ${theme.colors.info[100]}`,
  };
  return variantMap[variant];
};

const StyledInput = styled.input<{ $size: ComponentSize; $variant: InputVariant }>`
  padding: ${props => props.theme.component.input.size[props.$size].padding};
  font-size: ${props => props.theme.component.input.size[props.$size].fontSize};
  height: ${props => props.theme.component.input.size[props.$size].height};
  border: ${props => props.theme.borderWidth[1]} solid ${props => getBorderColor(props.$variant, props.theme)};
  border-radius: ${props => props.theme.borderRadius.md};
  font-family: inherit;
  background-color: ${props => props.disabled ? props.theme.colors.background.disabled : props.theme.colors.background.white};
  color: ${props => props.disabled ? props.theme.colors.text.muted : props.theme.colors.text.primary};
  cursor: ${props => props.disabled ? 'not-allowed' : 'text'};
  transition: ${props => props.theme.transitions.normal};
  outline: none;
  width: 100%;
  box-sizing: border-box;

  &:focus:not(:disabled) {
    border-color: ${props => getBorderColor(props.$variant, props.theme)};
    box-shadow: ${props => getFocusRing(props.$variant, props.theme)};
  }

  &::placeholder {
    color: ${props => props.theme.colors.text.muted};
  }
`;

export const BaseInput: React.FC<BaseInputProps> = ({
  id,
  type = "text",
  placeholder,
  value,
  defaultValue,
  size = "medium",
  variant = "default",
  disabled = false,
  required = false,
  readOnly = false,
  className = "",
  style = {},
  onChange,
  onFocus,
  onBlur,
  onKeyPress,
  'data-testid': testId,
}) => {
  return (
    <StyledInput
      id={id}
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
      data-testid={testId}
      style={style}
      $size={size}
      $variant={variant}
    />
  );
};
