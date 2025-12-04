import React from "react";
import styled from "styled-components";

export interface LabelProps {
  htmlFor?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
}

const StyledLabel = styled.label`
  font-size: ${props => props.theme.fontSize.sm};
  font-weight: ${props => props.theme.fontWeight.medium};
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.xxs};
  display: block;
  font-family: inherit;
`;

const RequiredMark = styled.span`
  color: ${props => props.theme.colors.semantic.error};
  margin-left: ${props => props.theme.spacing.xxs};
`;

export const Label: React.FC<LabelProps> = ({
  htmlFor,
  required = false,
  children,
  className = "",
  style = {},
  'data-testid': testId,
}) => {
  return (
    <StyledLabel
      htmlFor={htmlFor}
      className={className}
      data-testid={testId}
      style={style}
    >
      {children}
      {required && <RequiredMark>*</RequiredMark>}
    </StyledLabel>
  );
};
