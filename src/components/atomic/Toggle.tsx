import React from 'react';
import styled, { useTheme } from 'styled-components';
import { CheckboxSize } from '../../types';
import { Theme } from '../../theme/theme';

export interface ToggleProps {
  id?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  size?: CheckboxSize;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  label?: string;
  helperText?: string;
  errorMessage?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}


const Container = styled.div<{ $disabled: boolean; $size: CheckboxSize }>`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
  opacity: ${props => props.$disabled ? props.theme.opacity.disabled : props.theme.opacity.visible};
`;

const LabelContainer = styled.label<{ $disabled: boolean; $size: CheckboxSize }>`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
`;

const ToggleTrack = styled.div<{
  $size: CheckboxSize;
  $background: string;
  $hasError: boolean;
  $disabled: boolean;
}>`
  position: relative;
  width: ${props => props.theme.component.toggle.width[props.$size]};
  height: ${props => props.theme.component.toggle.height[props.$size]};
  background: ${props => props.$background};
  border-radius: ${props => props.theme.component.toggle.height[props.$size]};
  border: ${props => props.$hasError ? `${props.theme.borderWidth[2]} solid ${props.theme.colors.semantic.error}` : 'none'};
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  transition: ${props => props.theme.transitions.normal};
  display: inline-block;
  flex-shrink: 0;
`;

const ToggleThumb = styled.div<{
  $size: CheckboxSize;
  $isChecked: boolean;
}>`
  position: absolute;
  top: ${props => props.theme.component.toggle.offset};
  left: ${props => props.$isChecked
    ? `calc(100% - ${props.theme.component.toggle.thumb[props.$size]} - ${props.theme.component.toggle.offset})`
    : props.theme.component.toggle.offset};
  width: ${props => props.theme.component.toggle.thumb[props.$size]};
  height: ${props => props.theme.component.toggle.thumb[props.$size]};
  background: ${props => props.theme.colors.background.white};
  border-radius: ${props => props.theme.borderRadius.full};
  transition: left ${props => props.theme.transitions.normal};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const HiddenInput = styled.input`
  position: absolute;
  opacity: ${props => props.theme.opacity.hidden};
  width: 0;
  height: 0;
`;

const LabelText = styled.span<{ $size: CheckboxSize; $hasError: boolean }>`
  font-size: ${props => props.$size === 'sm' ? props.theme.fontSize.xs : props.$size === 'md' ? props.theme.fontSize.sm : props.theme.fontSize.md};
  color: ${props => props.$hasError ? props.theme.colors.semantic.error : props.theme.colors.text.primary};
  font-weight: ${props => props.theme.fontWeight.medium};
`;

const HelperText = styled.div`
  font-size: ${props => props.theme.fontSize.xs};
  color: ${props => props.theme.colors.text.muted};
  margin-top: ${props => props.theme.spacing.xxs};
`;

const ErrorText = styled.div`
  font-size: ${props => props.theme.fontSize.xs};
  color: ${props => props.theme.colors.semantic.error};
  margin-top: ${props => props.theme.spacing.xxs};
`;

export const Toggle: React.FC<ToggleProps> = ({
  id,
  checked,
  defaultChecked,
  disabled = false,
  size = 'md',
  color = 'primary',
  label,
  helperText,
  errorMessage,
  onChange,
  onFocus,
  onBlur
}) => {
  const theme = useTheme() as Theme;
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked || false);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      if (!isControlled) {
        setInternalChecked(event.target.checked);
      }
      onChange?.(event);
    }
  };

  const getBackground = () => {
    if (disabled) return theme.colors.border.light;
    if (!isChecked) return theme.colors.border.default;
    return theme.colors.semantic[color as keyof typeof theme.colors.semantic] || theme.colors.semantic.primary;
  };

  const background = getBackground();
  const hasError = !!errorMessage;

  return (
    <Container $disabled={disabled} $size={size}>
      <LabelContainer htmlFor={id} $disabled={disabled} $size={size}>
        <div style={{ position: 'relative' }}>
          <HiddenInput
            id={id}
            type="checkbox"
            checked={isControlled ? checked : undefined}
            defaultChecked={!isControlled ? defaultChecked : undefined}
            disabled={disabled}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          <ToggleTrack
            $size={size}
            $background={background}
            $hasError={hasError}
            $disabled={disabled}
          >
            <ToggleThumb
              $size={size}
              $isChecked={isChecked}
            />
          </ToggleTrack>
        </div>
        {label && (
          <LabelText $size={size} $hasError={hasError}>
            {label}
          </LabelText>
        )}
      </LabelContainer>
      {helperText && !hasError && <HelperText>{helperText}</HelperText>}
      {hasError && <ErrorText>{errorMessage}</ErrorText>}
    </Container>
  );
};
