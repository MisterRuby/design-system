import React, { useEffect, useRef } from 'react';
import { Button } from '../atomic/Button';
import { Icon } from '../atomic/Icon';
import { borderRadius, colors, fontSize, spacing } from '../../theme';
import { ButtonVariant, ComponentSize } from '../../types';

export interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: ComponentSize;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  actions?: {
    label: string;
    variant?: ButtonVariant;
    onClick: () => void;
  }[];
  className?: string;
}

export const Popup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  showCloseButton = true,
  closeOnOverlayClick = true,
  actions = [],
  className = ''
}) => {
  const popupRef = useRef<HTMLDivElement>(null);

  const getSizeStyles = (size: string) => {
    switch (size) {
      case 'small':
        return { width: '400px', maxWidth: '90vw' };
      case 'medium':
        return { width: '600px', maxWidth: '90vw' };
      case 'large':
        return { width: '800px', maxWidth: '95vw' };
      default:
        return { width: '600px', maxWidth: '90vw' };
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (closeOnOverlayClick && popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, closeOnOverlayClick]);

  if (!isOpen) {
    return null;
  }

  const sizeStyles = getSizeStyles(size);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: spacing.md,
      }}
      className={className}
    >
      <div
        ref={popupRef}
        style={{
          backgroundColor: colors.background.white,
          borderRadius: borderRadius.lg,
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
          width: sizeStyles.width,
          maxWidth: sizeStyles.maxWidth,
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {(title || showCloseButton) && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: `${spacing.sm} ${spacing.md}`,
              borderBottom: `1px solid ${colors.border.default}`,
              minHeight: '36px',
            }}
          >
            {title && (
              <h2
                style={{
                  margin: 0,
                  fontSize: fontSize.lg,
                  fontWeight: 600,
                  color: colors.semantic.text,
                }}
              >
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: spacing.xs,
                  borderRadius: borderRadius.sm,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: colors.semantic.muted,
                  transition: 'all 0.2s ease-in-out',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.background.gray;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Icon name="close" size={20} color="currentColor" />
              </button>
            )}
          </div>
        )}

        <div
          style={{
            padding: spacing.md,
            flex: 1,
            overflowY: 'auto',
            fontSize: fontSize.sm,
            lineHeight: 1.5,
            color: colors.semantic.text,
          }}
        >
          {children}
        </div>

        {actions.length > 0 && (
          <div
            style={{
              display: 'flex',
              gap: spacing.sm,
              padding: spacing.md,
              borderTop: `1px solid ${colors.border.default}`,
              justifyContent: 'flex-end',
            }}
          >
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || 'primary'}
                onClick={action.onClick}
                size={size}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};