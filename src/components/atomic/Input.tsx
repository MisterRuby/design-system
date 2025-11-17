import React from 'react';

export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'error' | 'success';
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  defaultValue,
  size = 'medium',
  variant = 'default',
  disabled = false,
  required = false,
  readOnly = false,
  label,
  helperText,
  errorMessage,
  onChange,
  onFocus,
  onBlur,
}) => {
  const getVariantStyles = (variant: string) => {
    switch (variant) {
      case 'default':
        return {
          borderColor: '#d1d5db',
          focusBorderColor: '#047857',
          focusBoxShadow: '0 0 0 3px rgba(4, 120, 87, 0.1)'
        };
      case 'error':
        return {
          borderColor: '#dc3545',
          focusBorderColor: '#dc3545',
          focusBoxShadow: '0 0 0 3px rgba(220, 53, 69, 0.1)'
        };
      case 'success':
        return {
          borderColor: '#047857',
          focusBorderColor: '#047857',
          focusBoxShadow: '0 0 0 3px rgba(4, 120, 87, 0.1)'
        };
      default:
        return {
          borderColor: '#d1d5db',
          focusBorderColor: '#047857',
          focusBoxShadow: '0 0 0 3px rgba(4, 120, 87, 0.1)'
        };
    }
  };

  const getSizeStyles = (size: string) => {
    switch (size) {
      case 'small':
        return { padding: '6px 12px', fontSize: '14px', height: '32px' };
      case 'medium':
        return { padding: '8px 16px', fontSize: '16px', height: '40px' };
      case 'large':
        return { padding: '12px 20px', fontSize: '18px', height: '48px' };
      default:
        return { padding: '8px 16px', fontSize: '16px', height: '40px' };
    }
  };

  const variantStyles = getVariantStyles(variant);
  const sizeStyles = getSizeStyles(size);
  const showError = variant === 'error' && errorMessage;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {label && (
        <label
          style={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '4px'
          }}
        >
          {label}
          {required && <span style={{ color: '#dc3545', marginLeft: '4px' }}>*</span>}
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        required={required}
        readOnly={readOnly}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{
          ...sizeStyles,
          border: `2px solid ${variantStyles.borderColor}`,
          borderRadius: '8px',
          fontFamily: 'inherit',
          backgroundColor: disabled ? '#f3f4f6' : 'white',
          color: disabled ? '#9ca3af' : '#374151',
          cursor: disabled ? 'not-allowed' : 'text',
          transition: 'all 0.2s ease-in-out',
          outline: 'none',
          width: '100%',
          boxSizing: 'border-box',
        }}
        onFocusCapture={(e) => {
          if (!disabled) {
            e.currentTarget.style.borderColor = variantStyles.focusBorderColor;
            e.currentTarget.style.boxShadow = variantStyles.focusBoxShadow;
          }
        }}
        onBlurCapture={(e) => {
          e.currentTarget.style.borderColor = variantStyles.borderColor;
          e.currentTarget.style.boxShadow = 'none';
        }}
      />

      {showError && (
        <span style={{
          fontSize: '12px',
          color: '#dc3545',
          marginTop: '2px'
        }}>
          {errorMessage}
        </span>
      )}

      {helperText && !showError && (
        <span style={{
          fontSize: '12px',
          color: '#6b7280',
          marginTop: '2px'
        }}>
          {helperText}
        </span>
      )}
    </div>
  );
};