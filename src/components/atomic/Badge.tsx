import React from 'react';
import styled from 'styled-components';
import { CheckboxSize } from '../../types';
import { Icon, IconName } from './Icon';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'solid' | 'outline' | 'soft';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  size?: CheckboxSize;
  rounded?: boolean;
  removable?: boolean;
  onRemove?: () => void;
  disabled?: boolean;
  icon?: IconName;
}

interface BadgeContainerProps {
  $variant: 'solid' | 'outline' | 'soft';
  $color: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  $size: CheckboxSize;
  $rounded: boolean;
  $disabled: boolean;
}


const getBackgroundColor = (color: string, variant: string, disabled: boolean, theme: any) => {
  if (disabled) return theme.colors.background.disabled;

  if (variant === 'solid') return theme.colors.semantic[color];
  if (variant === 'outline') return 'transparent';
  return theme.component.badge.soft[color];
};

const getTextColor = (color: string, variant: string, disabled: boolean, theme: any) => {
  if (disabled) return theme.colors.text.muted;
  if (variant === 'solid') return theme.colors.background.white;
  return theme.colors.semantic[color];
};

const getBorderColor = (color: string, variant: string, disabled: boolean, theme: any) => {
  if (disabled) return theme.colors.border.light;
  if (variant === 'outline') return theme.colors.semantic[color];
  if (variant === 'solid') return theme.colors.semantic[color];
  return 'transparent';
};

const BadgeContainer = styled.span<BadgeContainerProps>`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.component.badge.size[props.$size].gap};
  padding: ${props => props.theme.component.badge.size[props.$size].padding};
  font-size: ${props => props.theme.component.badge.size[props.$size].fontSize};
  line-height: ${props => props.theme.component.badge.size[props.$size].lineHeight};
  font-weight: ${props => props.theme.fontWeight.medium};
  background-color: ${props => getBackgroundColor(props.$color, props.$variant, props.$disabled, props.theme)};
  color: ${props => getTextColor(props.$color, props.$variant, props.$disabled, props.theme)};
  border: ${props => props.theme.borderWidth[1]} solid ${props => getBorderColor(props.$color, props.$variant, props.$disabled, props.theme)};
  border-radius: ${props => props.$rounded ? props.theme.borderRadius.full : props.theme.borderRadius.sm};
  white-space: nowrap;
  opacity: ${props => props.$disabled ? props.theme.opacity.disabled : props.theme.opacity.visible};
  cursor: ${props => props.$disabled ? 'not-allowed' : 'default'};
  transition: ${props => props.theme.transitions.normal};
  max-width: fit-content;
`;

const RemoveButton = styled.button<{ $iconSize: string; $disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.$iconSize};
  height: ${props => props.$iconSize};
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.1);
  border: none;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  font-size: ${props => props.theme.fontSize.xxs};
  color: currentColor;
  transition: ${props => props.theme.transitions.normal};
  margin-left: ${props => props.theme.spacing.xxs};

  &:hover:not(:disabled) {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const getIconSize = (size: CheckboxSize): string => {
  const sizeMap: Record<CheckboxSize, string> = {
    sm: '12px',
    md: '14px',
    lg: '16px',
  };
  return sizeMap[size];
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'solid',
  color = 'primary',
  size = 'md',
  rounded = false,
  removable = false,
  onRemove,
  disabled = false,
  icon
}) => {
  return (
    <BadgeContainer
      $variant={variant}
      $color={color}
      $size={size}
      $rounded={rounded}
      $disabled={disabled}
    >
      {icon && (
        <Icon
          name={icon}
          size={getIconSize(size)}
          color="currentColor"
        />
      )}
      {children}
      {removable && (
        <RemoveButton
          type="button"
          onClick={!disabled ? onRemove : undefined}
          $iconSize={getIconSize(size)}
          $disabled={disabled}
          aria-label="제거"
        >
          ×
        </RemoveButton>
      )}
    </BadgeContainer>
  );
};
