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


  const getSizeStyles = (size: TextSize) => {
    return { fontSize: fontSize[size] };
  };

  const getWeightStyles = (weight: TextWeight) => {
    return { fontWeight: fontWeight[weight] };
  };

  const getColorStyles = (color: TextColor) => {
    switch (color) {
      case "primary":
        return { color: colors.semantic.primary };
      case "secondary":
        return { color: colors.semantic.secondary };
      case "success":
        return { color: colors.semantic.success };
      case "error":
        return { color: colors.semantic.error };
      case "warning":
        return { color: colors.semantic.warning };
      case "info":
        return { color: colors.semantic.info };
      case "muted":
        return { color: colors.semantic.muted };
      case "text":
        return { color: colors.semantic.text };
      default:
        return { color: colors.semantic.text };
    }
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