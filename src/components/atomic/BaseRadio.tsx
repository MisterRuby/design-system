import React from "react";
import styled from "styled-components";

export interface BaseRadioProps {
  id?: string;
  name: string;
  value: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "success" | "error" | "warning" | "info";
  className?: string;
  style?: React.CSSProperties;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  'data-testid'?: string;
}

const getSizeValue = (size: "sm" | "md" | "lg") => {
  const sizeMap = {
    sm: "16px",
    md: "20px",
    lg: "24px",
  };
  return sizeMap[size];
};

const StyledRadio = styled.input<{ $size: "sm" | "md" | "lg"; $color: string }>`
  width: ${props => getSizeValue(props.$size)};
  height: ${props => getSizeValue(props.$size)};
  accent-color: ${props => props.theme.colors.semantic[props.$color as keyof typeof props.theme.colors.semantic] || props.theme.colors.semantic.primary};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? props.theme.opacity.disabled : props.theme.opacity.visible};
  border: ${props => props.theme.borderWidth[1]} solid ${props => props.theme.colors.border.default};
  border-radius: ${props => props.theme.borderRadius.full};
`;

export const BaseRadio: React.FC<BaseRadioProps> = ({
  id,
  name,
  value,
  checked,
  defaultChecked,
  disabled = false,
  required = false,
  size = "md",
  color = "primary",
  className = "",
  style = {},
  onChange,
  onFocus,
  onBlur,
  'data-testid': testId,
}) => {
  return (
    <StyledRadio
      type="radio"
      id={id}
      name={name}
      value={value}
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      required={required}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      className={className}
      data-testid={testId}
      style={style}
      $size={size}
      $color={color}
    />
  );
};
