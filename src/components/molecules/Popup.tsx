import React, { useEffect, useRef } from 'react';
import { Button } from '../atomic/Button';
import { Icon } from '../atomic/Icon';
import { borderRadius, colors, fontSize, spacing } from '../../theme';
import { ButtonVariant, ComponentSize } from '../../types';

// Popup 설정 상수
const POPUP_CONFIG = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  shadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
  sizes: {
    small: { width: '400px', maxWidth: '90vw' },
    medium: { width: '600px', maxWidth: '90vw' },
    large: { width: '800px', maxWidth: '95vw' },
  },
  dimensions: {
    maxHeight: '90vh',
    titleMinHeight: '36px',
    closeButtonSize: 20,
  },
  transitions: 'all 0.2s ease-in-out',
} as const;

// Popup 액션 타입 정의
export interface PopupAction {
  label: string;
  variant?: ButtonVariant;
  onClick: () => void;
}

export interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: ComponentSize;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  actions?: PopupAction[];
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
    return POPUP_CONFIG.sizes[size as keyof typeof POPUP_CONFIG.sizes] || POPUP_CONFIG.sizes.medium;
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
        backgroundColor: POPUP_CONFIG.overlay.backgroundColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: POPUP_CONFIG.overlay.zIndex,
        padding: spacing.md,
      }}
      className={className}
    >
      <div
        ref={popupRef}
        style={{
          backgroundColor: colors.background.white,
          borderRadius: borderRadius.lg,
          boxShadow: POPUP_CONFIG.shadow,
          width: sizeStyles.width,
          maxWidth: sizeStyles.maxWidth,
          maxHeight: POPUP_CONFIG.dimensions.maxHeight,
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
              minHeight: POPUP_CONFIG.dimensions.titleMinHeight,
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
                  transition: POPUP_CONFIG.transitions,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.background.gray;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Icon name="close" size={POPUP_CONFIG.dimensions.closeButtonSize} color="currentColor" />
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