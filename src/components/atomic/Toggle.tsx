import React from 'react';
import { colors, fontSize, fontWeight } from '../../theme';
import { CheckboxSize } from '../../types';

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
  const getSizeStyles = (size: CheckboxSize) => {
    switch (size) {
      case 'sm':
        return {
          width: '32px',
          height: '18px',
          thumbSize: '14px',
          thumbOffset: '2px',
          fontSize: fontSize.xs,
          gap: '6px'
        };
      case 'md':
        return {
          width: '44px',
          height: '24px',
          thumbSize: '20px',
          thumbOffset: '2px',
          fontSize: fontSize.sm,
          gap: '8px'
        };
      case 'lg':
        return {
          width: '56px',
          height: '30px',
          thumbSize: '26px',
          thumbOffset: '2px',
          fontSize: fontSize.md,
          gap: '10px'
        };
      default:
        return {
          width: '44px',
          height: '24px',
          thumbSize: '20px',
          thumbOffset: '2px',
          fontSize: fontSize.sm,
          gap: '8px'
        };
    }
  };

  const getColorStyles = (color: string, isChecked: boolean) => {
    if (disabled) {
      return {
        background: colors.gray[200],
        thumbColor: colors.background.white
      };
    }

    if (!isChecked) {
      return {
        background: colors.gray[300],
        thumbColor: colors.background.white
      };
    }

    switch (color) {
      case 'primary':
        return { background: colors.semantic.primary, thumbColor: colors.background.white };
      case 'secondary':
        return { background: colors.semantic.secondary, thumbColor: colors.background.white };
      case 'success':
        return { background: colors.semantic.success, thumbColor: colors.background.white };
      case 'error':
        return { background: colors.semantic.error, thumbColor: colors.background.white };
      case 'warning':
        return { background: colors.semantic.warning, thumbColor: colors.background.white };
      case 'info':
        return { background: colors.semantic.info, thumbColor: colors.background.white };
      default:
        return { background: colors.semantic.primary, thumbColor: colors.background.white };
    }
  };

  const sizeStyles = getSizeStyles(size);
  const colorStyles = getColorStyles(color, isChecked);
  const hasError = !!errorMessage;

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: sizeStyles.gap,
    opacity: disabled ? 0.6 : 1,
  };

  const labelContainerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: sizeStyles.gap,
    cursor: disabled ? 'not-allowed' : 'pointer',
  };

  const toggleStyles: React.CSSProperties = {
    position: 'relative',
    width: sizeStyles.width,
    height: sizeStyles.height,
    background: colorStyles.background,
    borderRadius: sizeStyles.height,
    border: hasError ? `2px solid ${colors.semantic.error}` : 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background 0.2s ease, border-color 0.2s ease',
    display: 'inline-block',
    flexShrink: 0,
  };

  const thumbStyles: React.CSSProperties = {
    position: 'absolute',
    top: sizeStyles.thumbOffset,
    left: isChecked
      ? `calc(100% - ${sizeStyles.thumbSize} - ${sizeStyles.thumbOffset})`
      : sizeStyles.thumbOffset,
    width: sizeStyles.thumbSize,
    height: sizeStyles.thumbSize,
    background: colorStyles.thumbColor,
    borderRadius: '50%',
    transition: 'left 0.2s ease',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  };

  const labelTextStyles: React.CSSProperties = {
    fontSize: sizeStyles.fontSize,
    color: hasError ? colors.semantic.error : colors.semantic.text,
    fontWeight: fontWeight.medium,
  };

  const helperTextStyles: React.CSSProperties = {
    fontSize: fontSize.xs,
    color: colors.semantic.muted,
    marginTop: '2px',
  };

  const errorTextStyles: React.CSSProperties = {
    fontSize: fontSize.xs,
    color: colors.semantic.error,
    marginTop: '2px',
  };

  const hiddenInputStyles: React.CSSProperties = {
    position: 'absolute',
    opacity: 0,
    width: 0,
    height: 0,
  };

  return (
    <div style={containerStyles}>
      <label htmlFor={id} style={labelContainerStyles}>
        <div style={{ position: 'relative' }}>
          <input
            id={id}
            type="checkbox"
            checked={isControlled ? checked : undefined}
            defaultChecked={!isControlled ? defaultChecked : undefined}
            disabled={disabled}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
            style={hiddenInputStyles}
          />
          <div style={toggleStyles}>
            <div style={thumbStyles} />
          </div>
        </div>
        {label && <span style={labelTextStyles}>{label}</span>}
      </label>
      {helperText && !hasError && (
        <div style={helperTextStyles}>{helperText}</div>
      )}
      {hasError && <div style={errorTextStyles}>{errorMessage}</div>}
    </div>
  );
};