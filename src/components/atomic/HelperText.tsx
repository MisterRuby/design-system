import React from "react";
import styled from "styled-components";

export interface HelperTextProps {
  children: React.ReactNode;
  show?: boolean;
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
}

const StyledHelperText = styled.span`
  font-size: ${props => props.theme.fontSize.xs};
  color: ${props => props.theme.colors.text.secondary};
  margin-top: ${props => props.theme.spacing.xxs};
  display: block;
  font-family: inherit;
`;

export const HelperText: React.FC<HelperTextProps> = ({
  children,
  show = true,
  className = "",
  style = {},
  'data-testid': testId,
}) => {
  if (!show) return null;
  return (
    <StyledHelperText
      className={className}
      data-testid={testId}
      style={style}
    >
      {children}
    </StyledHelperText>
  );
};
