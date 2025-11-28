import React from "react";
import { colors, typography, fontSize, fontWeight } from "../../theme";
import type {
  TextVariant,
  TextSize,
  TextWeight,
  TextColor,
  TextAlign,
  TextTransform,
  TextDecoration
} from "../../types/common";

export interface TextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  size?: TextSize;
  weight?: TextWeight;
  color?: TextColor;
  align?: TextAlign;
  transform?: TextTransform;
  decoration?: TextDecoration;
  className?: string;
  style?: React.CSSProperties;
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = "body1",
  size,
  weight,
  color = "text",
  align = "left",
  transform = "none",
  decoration = "none",
  className = "",
  style = {},
}) => {
  const getElementForVariant = (variant: TextVariant): React.ElementType => {
    switch (variant) {
      case "h1": return "h1";
      case "h2": return "h2";
      case "h3": return "h3";
      case "h4": return "h4";
      case "h5": return "h5";
      case "h6": return "h6";
      case "body1":
      case "body2": return "p";
      case "caption":
      case "overline": return "span";
      default: return "p";
    }
  };

  // Text 설정 상수
  const TEXT_CONFIG = {
    colors: {
      primary: colors.semantic.primary,
      secondary: colors.semantic.secondary,
      success: colors.semantic.success,
      error: colors.semantic.error,
      warning: colors.semantic.warning,
      info: colors.semantic.info,
      muted: colors.semantic.muted,
      text: colors.semantic.text
    }
  } as const;

  const getSizeStyles = (size: TextSize) => {
    return { fontSize: fontSize[size] };
  };

  const getWeightStyles = (weight: TextWeight) => {
    return { fontWeight: fontWeight[weight] };
  };

  const getColorStyles = (color: TextColor) => {
    return { color: TEXT_CONFIG.colors[color as keyof typeof TEXT_CONFIG.colors] || TEXT_CONFIG.colors.text };
  };

  // Typography variant 스타일 가져오기
  const variantStyles = typography[variant];
  const sizeStyles = size ? getSizeStyles(size) : {};
  const weightStyles = weight ? getWeightStyles(weight) : {};
  const colorStyles = getColorStyles(color);

  const Element = getElementForVariant(variant);

  const combinedStyle = {
    ...variantStyles,
    textAlign: align,
    textTransform: transform,
    textDecoration: decoration,
    margin: 0,
    ...colorStyles,
    ...sizeStyles,
    ...weightStyles,
    ...style,
  };

  return (
    <Element className={className} style={combinedStyle}>
      {children}
    </Element>
  );
};