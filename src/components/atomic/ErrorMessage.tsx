import React from "react";
import styled from "styled-components";

export interface ErrorMessageProps {
  children: React.ReactNode;
  show?: boolean;
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
}

const StyledErrorMessage = styled.span`
  font-size: ${props => props.theme.fontSize.xs};
  color: ${props => props.theme.colors.semantic.error};
  margin-top: ${props => props.theme.spacing.xxs};
  display: block;
  font-family: inherit;
`;

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  children,
  show = true,
  className = "",
  style = {},
  'data-testid': testId,
}) => {
  if (!show) return null;
  return (
    <StyledErrorMessage
      className={className}
      data-testid={testId}
      style={style}
    >
      {children}
    </StyledErrorMessage>
  );
};
