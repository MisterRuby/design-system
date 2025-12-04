import React from 'react';
import styled from 'styled-components';
import { Icon, IconName } from './Icon';
import { ButtonVariant, ComponentSize } from '../../types';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ComponentSize;
  disabled?: boolean;
  icon?: IconName;
  iconPosition?: 'left' | 'right';
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
}

interface StyledButtonProps {
  $variant: ButtonVariant;
  $size: ComponentSize;
  $hasIcon: boolean;
  $iconPosition: 'left' | 'right';
}


const getBackgroundColor = (variant: ButtonVariant, theme: any) => {
  if (variant === 'outline') return 'transparent';
  return theme.colors.semantic[variant] || theme.colors.semantic.primary;
};

const getTextColor = (variant: ButtonVariant, theme: any) => {
  if (variant === 'outline') return theme.colors.semantic.primary;
  return theme.colors.background.white;
};

const getBorderColor = (variant: ButtonVariant, theme: any) => {
  if (variant === 'outline') return theme.colors.semantic.primary;
  return getBackgroundColor(variant, theme);
};

const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.$hasIcon ? props.theme.component.button.size[props.$size].gap : '0'};
  flex-direction: ${props => props.$iconPosition === 'right' ? 'row-reverse' : 'row'};
  background-color: ${props => getBackgroundColor(props.$variant, props.theme)};
  color: ${props => getTextColor(props.$variant, props.theme)};
  padding: ${props => props.theme.component.button.size[props.$size].padding};
  font-size: ${props => props.theme.component.button.size[props.$size].fontSize};
  border: ${props => props.$variant === 'outline'
    ? `${props.theme.borderWidth[1]} solid ${getBorderColor(props.$variant, props.theme)}`
    : props.theme.borderWidth[0]};
  border-radius: ${props => props.theme.borderRadius.sm};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? props.theme.opacity.disabled : props.theme.opacity.visible};
  font-family: inherit;
  transition: ${props => props.theme.transitions.normal};

  &:hover:not(:disabled) {
    opacity: ${props => props.theme.opacity.hover};
  }
`;

const getIconSize = (size: ComponentSize): string => {
  const sizeMap: Record<ComponentSize, string> = {
    small: '14px',
    medium: '16px',
    large: '20px',
  };
  return sizeMap[size];
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  icon,
  iconPosition = 'left',
  type = 'button',
  onClick,
  style = {},
  className = ''
}) => {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={style}
      $variant={variant}
      $size={size}
      $hasIcon={!!icon}
      $iconPosition={iconPosition}
    >
      {icon && (
        <Icon
          name={icon}
          size={getIconSize(size)}
          color="currentColor"
        />
      )}
      {children}
    </StyledButton>
  );
};
