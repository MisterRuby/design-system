import React, { useState } from 'react';
import { Button, ButtonProps } from '../atomic/Button';
import { InputField, InputFieldProps } from '../molecules/InputField';
import { CheckboxField, CheckboxFieldProps } from '../molecules/CheckboxField';
import { SelectField, SelectFieldProps } from '../molecules/SelectField';
import { RadioGroup, RadioGroupProps } from '../molecules/RadioGroup';
import { useTheme } from 'styled-components';

export interface FormField {
  id: string;
  type: 'input' | 'checkbox' | 'select' | 'radio';
  label?: string;
  required?: boolean;
  props: InputFieldProps | CheckboxFieldProps | SelectFieldProps | RadioGroupProps;
}

export interface FormProps {
  title?: string;
  description?: string;
  fields: FormField[];
  submitButton?: {
    text?: string;
    variant?: ButtonProps['variant'];
    size?: ButtonProps['size'];
    disabled?: boolean;
    loading?: boolean;
  };
  resetButton?: {
    text?: string;
    variant?: ButtonProps['variant'];
    size?: ButtonProps['size'];
    disabled?: boolean;
  };
  onSubmit?: (formData: Record<string, any>) => void;
  onReset?: () => void;
  className?: string;
  style?: React.CSSProperties;
  layout?: 'vertical' | 'horizontal';
  fieldSpacing?: 'small' | 'medium' | 'large';
  showRequiredIndicator?: boolean;
}

export const Form: React.FC<FormProps> = ({
  title,
  description,
  fields,
  submitButton = { text: '제출', variant: 'primary', size: 'medium', disabled: false, loading: false },
  resetButton,
  onSubmit,
  onReset,
  className = '',
  style = {},
  layout = 'vertical',
  fieldSpacing = 'medium',
  showRequiredIndicator = true,
}) => {
  const theme = useTheme();
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const getFieldSpacing = () => {
    switch (fieldSpacing) {
      case 'small':
        return theme.spacing.sm;
      case 'medium':
        return theme.spacing.md;
      case 'large':
        return theme.spacing.xl;
      default:
        return theme.spacing.md;
    }
  };

  const validateField = (field: FormField, value: any): string => {
    if (field.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      return `${field.label || field.id}는 필수 항목입니다.`;
    }

    if (field.type === 'input') {
      const inputProps = field.props as InputFieldProps;
      if (inputProps.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return '올바른 이메일 형식을 입력해주세요.';
        }
      }
      if (inputProps.type === 'password' && value && value.length < 6) {
        return '비밀번호는 최소 6자 이상이어야 합니다.';
      }
    }

    return '';
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    fields.forEach((field) => {
      const error = validateField(field, formData[field.id]);
      if (error) {
        newErrors[field.id] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));

    if (errors[fieldId]) {
      setErrors((prev) => ({
        ...prev,
        [fieldId]: '',
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit?.(formData);
    }
  };

  const handleReset = () => {
    setFormData({});
    setErrors({});
    onReset?.();
  };

  const renderField = (field: FormField) => {
    const error = errors[field.id];
    const value = formData[field.id];

    switch (field.type) {
      case 'input':
        const inputProps = field.props as InputFieldProps;
        return (
          <InputField
            {...inputProps}
            key={field.id}
            label={field.label}
            required={field.required}
            value={value || ''}
            variant={error ? 'error' : inputProps.variant}
            errorMessage={error}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
          />
        );

      case 'checkbox':
        const checkboxProps = field.props as CheckboxFieldProps;
        return (
          <CheckboxField
            {...checkboxProps}
            key={field.id}
            label={field.label || checkboxProps.label}
            required={field.required}
            checked={value || false}
            color={error ? 'error' : checkboxProps.color}
            errorMessage={error}
            onChange={(e) => handleFieldChange(field.id, e.target.checked)}
          />
        );

      case 'select':
        const selectProps = field.props as SelectFieldProps;
        return (
          <SelectField
            {...selectProps}
            key={field.id}
            label={field.label}
            required={field.required}
            value={value || ''}
            variant={error ? 'error' : selectProps.variant}
            errorMessage={error}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
          />
        );

      case 'radio':
        const radioProps = field.props as RadioGroupProps;
        return (
          <RadioGroup
            {...radioProps}
            key={field.id}
            label={field.label}
            required={field.required}
            value={value || ''}
            color={error ? 'error' : radioProps.color}
            errorMessage={error}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: getFieldSpacing(),
        padding: theme.semanticSpacing.componentPaddingLarge,
        backgroundColor: theme.colors.background.white,
        borderRadius: theme.borderRadius.md,
        border: theme.componentBorders.card.default,
        ...style,
      }}
    >
      {(title || description) && (
        <div style={{ marginBottom: theme.spacing.xs }}>
          {title && (
            <h2
              style={{
                margin: `0 0 ${theme.spacing.xs} 0`,
                fontSize: theme.fontSize['2xl'],
                fontWeight: theme.fontWeight.semibold,
                color: theme.colors.semantic.text,
              }}
            >
              {title}
            </h2>
          )}
          {description && (
            <p
              style={{
                margin: 0,
                fontSize: theme.fontSize.sm,
                color: theme.colors.semantic.secondary,
                lineHeight: '1.5',
              }}
            >
              {description}
            </p>
          )}
        </div>
      )}

      {showRequiredIndicator && fields.some((field) => field.required) && (
        <p
          style={{
            margin: `0 0 ${theme.spacing.xs} 0`,
            fontSize: theme.fontSize.xs,
            color: theme.colors.semantic.secondary,
          }}
        >
          <span style={{ color: theme.colors.semantic.error }}>*</span> 표시는 필수 항목입니다.
        </p>
      )}

      <div
        style={{
          display: 'flex',
          flexDirection: layout === 'vertical' ? 'column' : 'row',
          gap: getFieldSpacing(),
          flexWrap: layout === 'horizontal' ? 'wrap' : 'nowrap',
        }}
      >
        {fields.map((field) => (
          <div
            key={field.id}
            style={{
              flex: layout === 'horizontal' ? '1' : 'none',
              minWidth: layout === 'horizontal' ? '250px' : 'auto',
            }}
          >
            {renderField(field)}
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          gap: theme.spacing.sm,
          marginTop: theme.spacing.xs,
          justifyContent: 'flex-end',
        }}
      >
        {resetButton && (
          <Button
            type="button"
            variant={resetButton.variant || 'outline'}
            size={resetButton.size || 'medium'}
            disabled={resetButton.disabled}
            onClick={handleReset}
          >
            {resetButton.text || '초기화'}
          </Button>
        )}
        <Button
          type="submit"
          variant={submitButton.variant || 'primary'}
          size={submitButton.size || 'medium'}
          disabled={submitButton.disabled || submitButton.loading}
        >
          {submitButton.loading ? '처리 중...' : submitButton.text || '제출'}
        </Button>
      </div>
    </form>
  );
};
