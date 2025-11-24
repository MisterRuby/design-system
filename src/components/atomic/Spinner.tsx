import React from 'react';
import { colors, fontSize, fontWeight } from '../../theme';
import { CheckboxSize } from '../../types';

export interface SpinnerProps {
  size?: CheckboxSize;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'white';
  thickness?: number;
  speed?: 'slow' | 'normal' | 'fast';
  label?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'primary',
  thickness = 2,
  speed = 'normal',
  label
}) => {
  const getSizeStyles = (size: CheckboxSize) => {
    switch (size) {
      case 'sm':
        return {
          width: '16px',
          height: '16px',
        };
      case 'md':
        return {
          width: '24px',
          height: '24px',
        };
      case 'lg':
        return {
          width: '32px',
          height: '32px',
        };
      default:
        return {
          width: '24px',
          height: '24px',
        };
    }
  };

  const getColorStyles = (color: string) => {
    switch (color) {
      case 'primary':
        return colors.semantic.primary;
      case 'secondary':
        return colors.semantic.secondary;
      case 'success':
        return colors.semantic.success;
      case 'error':
        return colors.semantic.error;
      case 'warning':
        return colors.semantic.warning;
      case 'info':
        return colors.semantic.info;
      case 'white':
        return colors.background.white;
      default:
        return colors.semantic.primary;
    }
  };

  const getSpeedStyles = (speed: string) => {
    switch (speed) {
      case 'slow':
        return '1.2s';
      case 'normal':
        return '0.8s';
      case 'fast':
        return '0.5s';
      default:
        return '0.8s';
    }
  };

  const sizeStyles = getSizeStyles(size);
  const spinnerColor = getColorStyles(color);
  const animationDuration = getSpeedStyles(speed);

  const spinnerStyles: React.CSSProperties = {
    display: 'inline-block',
    width: sizeStyles.width,
    height: sizeStyles.height,
    border: `${thickness}px solid ${colors.gray[200]}`,
    borderTop: `${thickness}px solid ${spinnerColor}`,
    borderRadius: '50%',
    animation: `spin ${animationDuration} linear infinite`,
  };

  const containerStyles: React.CSSProperties = {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  };

  const labelStyles: React.CSSProperties = {
    fontSize: fontSize.xs,
    color: colors.semantic.text,
    fontWeight: fontWeight.medium,
  };

  // CSS keyframes for spin animation
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (label) {
    return (
      <div style={containerStyles}>
        <div style={spinnerStyles} role="status" aria-label={label} />
        <span style={labelStyles}>{label}</span>
      </div>
    );
  }

  return <div style={spinnerStyles} role="status" aria-label="로딩 중" />;
};