import React from 'react';
import styled from 'styled-components';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
}

interface CardContainerProps {
  $variant: 'default' | 'outlined' | 'elevated';
  $padding: 'none' | 'sm' | 'md' | 'lg';
  $hoverable: boolean;
  $clickable: boolean;
}

const getBackgroundColor = (variant: string, theme: any) => {
  return theme.colors.background.white;
};

const getBorder = (variant: string, theme: any) => {
  if (variant === 'elevated') return 'none';
  return `${theme.borderWidth[1]} solid ${theme.colors.border.default}`;
};

const getBoxShadow = (variant: string, theme: any) => {
  const shadowMap = {
    outlined: theme.shadows.none,
    elevated: theme.shadows['2xl'],
    default: theme.shadows.sm,
  };
  return shadowMap[variant as keyof typeof shadowMap] || shadowMap.default;
};

const CardContainer = styled.div<CardContainerProps>`
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.component.card.padding[props.$padding]};
  transition: ${props => props.theme.transitions.normal};
  cursor: ${props => (props.$hoverable || props.$clickable) ? 'pointer' : 'default'};
  background-color: ${props => getBackgroundColor(props.$variant, props.theme)};
  border: ${props => getBorder(props.$variant, props.theme)};
  box-shadow: ${props => getBoxShadow(props.$variant, props.theme)};

  ${props => (props.$hoverable || props.$clickable) && `
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${props.theme.shadows.md};
    }
  `}
`;

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  hoverable = false,
  onClick,
  style = {},
  className = ''
}) => {
  return (
    <CardContainer
      className={className}
      onClick={onClick}
      style={style}
      $variant={variant}
      $padding={padding}
      $hoverable={hoverable}
      $clickable={!!onClick}
    >
      {children}
    </CardContainer>
  );
};
