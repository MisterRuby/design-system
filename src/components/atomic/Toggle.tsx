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
  // Toggle 설정 상수
  const TOGGLE_CONFIG = {
    sizes: {
      sm: {
        width: '32px',
        height: '18px',
        thumbSize: '14px',
        thumbOffset: '2px',
        fontSize: fontSize.xs,
        gap: '6px'
      },
      md: {
        width: '44px',
        height: '24px',
        thumbSize: '20px',
        thumbOffset: '2px',
        fontSize: fontSize.sm,
        gap: '8px'
      },
      lg: {
        width: '56px',
        height: '30px',
        thumbSize: '26px',
        thumbOffset: '2px',
        fontSize: fontSize.md,
        gap: '10px'
      }
    },
    colors: {
      background: {
        disabled: colors.gray[200],
        unchecked: colors.gray[300],
        primary: colors.semantic.primary,
        secondary: colors.semantic.secondary,
        success: colors.semantic.success,
        error: colors.semantic.error,
        warning: colors.semantic.warning,
        info: colors.semantic.info,
      },
      thumb: colors.background.white,
      text: {
        default: colors.semantic.text,
        error: colors.semantic.error,
        muted: colors.semantic.muted,
      }
    },
    effects: {
      transition: 'background 0.2s ease, border-color 0.2s ease',
      disabledOpacity: 0.6,
      shadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    }
  } as const;

  const getSizeStyles = (size: CheckboxSize) => {
    return TOGGLE_CONFIG.sizes[size as keyof typeof TOGGLE_CONFIG.sizes] || TOGGLE_CONFIG.sizes.md;
  };

  const getColorStyles = (color: string, isChecked: boolean) => {
    if (disabled) {
      return {
        background: TOGGLE_CONFIG.colors.background.disabled,
        thumbColor: TOGGLE_CONFIG.colors.thumb
      };
    }

    if (!isChecked) {
      return {
        background: TOGGLE_CONFIG.colors.background.unchecked,
        thumbColor: TOGGLE_CONFIG.colors.thumb
      };
    }

    const backgroundColors = TOGGLE_CONFIG.colors.background;
    const background = backgroundColors[color as keyof typeof backgroundColors] || backgroundColors.primary;

    return {
      background,
      thumbColor: TOGGLE_CONFIG.colors.thumb
    };
  };

  const sizeStyles = getSizeStyles(size);
  const colorStyles = getColorStyles(color, isChecked);
  const hasError = !!errorMessage;

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: sizeStyles.gap,
    opacity: disabled ? TOGGLE_CONFIG.effects.disabledOpacity : 1,
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
    transition: TOGGLE_CONFIG.effects.transition,
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
    boxShadow: TOGGLE_CONFIG.effects.shadow,
  };

  const labelTextStyles: React.CSSProperties = {
    fontSize: sizeStyles.fontSize,
    color: hasError ? TOGGLE_CONFIG.colors.text.error : TOGGLE_CONFIG.colors.text.default,
    fontWeight: fontWeight.medium,
  };

  const helperTextStyles: React.CSSProperties = {
    fontSize: fontSize.xs,
    color: TOGGLE_CONFIG.colors.text.muted,
    marginTop: '2px',
  };

  const errorTextStyles: React.CSSProperties = {
    fontSize: fontSize.xs,
    color: TOGGLE_CONFIG.colors.text.error,
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