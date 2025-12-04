import React from 'react';
import styled from 'styled-components';
import { SemanticVariant } from '../../types';
import { Icon, IconName } from './Icon';

export interface AlertProps {
  children: React.ReactNode;
  variant?: SemanticVariant;
  title?: string;
  closable?: boolean;
  onClose?: () => void;
  icon?: IconName | boolean;
  style?: React.CSSProperties;
  className?: string;
}

interface AlertContainerProps {
  $variant: SemanticVariant;
}

const getVariantDefaultIcon = (variant: SemanticVariant): IconName => {
  const iconMap: Record<SemanticVariant, IconName> = {
    primary: 'info',
    secondary: 'info',
    success: 'check',
    error: 'close',
    warning: 'warning',
    info: 'info',
  };
  return iconMap[variant];
};

const AlertContainer = styled.div<AlertContainerProps>`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.component.alert[props.$variant].background};
  border: ${props => props.theme.borderWidth[1]} solid ${props => props.theme.component.alert[props.$variant].border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSize.sm};
  line-height: ${props => props.theme.lineHeight.relaxed};
  color: ${props => props.theme.component.alert[props.$variant].text};
  position: relative;
`;

const IconWrapper = styled.div<{ $variant: SemanticVariant }>`
  flex-shrink: 0;
  margin-top: 2px;
  color: ${props => props.theme.component.alert[props.$variant].icon};
`;

const Content = styled.div`
  flex: 1;
  min-width: 0;
`;

const Title = styled.div<{ $variant: SemanticVariant }>`
  font-size: ${props => props.theme.fontSize.sm};
  font-weight: ${props => props.theme.fontWeight.semibold};
  color: ${props => props.theme.component.alert[props.$variant].title};
  margin: 0 0 ${props => props.theme.spacing.xxs} 0;
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${props => props.theme.spacing.sm};
  right: ${props => props.theme.spacing.sm};
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px;
  border-radius: ${props => props.theme.borderRadius.sm};
  color: currentColor;
  transition: ${props => props.theme.transitions.normal};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

export const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'info',
  title,
  closable = false,
  onClose,
  icon,
  style = {},
  className = ''
}) => {
  const getIconName = (): IconName | null => {
    if (icon === false) return null;
    if (typeof icon === 'string') return icon;
    return getVariantDefaultIcon(variant);
  };

  const iconName = getIconName();

  return (
    <AlertContainer
      $variant={variant}
      className={className}
      style={style}
      role="alert"
    >
      {iconName && (
        <IconWrapper $variant={variant}>
          <Icon
            name={iconName}
            size={16}
            color="currentColor"
          />
        </IconWrapper>
      )}

      <Content>
        {title && <Title $variant={variant}>{title}</Title>}
        <div>{children}</div>
      </Content>

      {closable && (
        <CloseButton
          type="button"
          onClick={onClose}
          aria-label="알림 닫기"
        >
          <Icon
            name="close"
            size={14}
            color="currentColor"
          />
        </CloseButton>
      )}
    </AlertContainer>
  );
};
