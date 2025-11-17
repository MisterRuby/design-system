import React from "react";
import { colors } from "../../theme";

export interface TextProps {
  children: React.ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body1" | "body2" | "caption" | "overline";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  weight?: "light" | "normal" | "medium" | "semibold" | "bold";
  color?: "primary" | "secondary" | "success" | "error" | "warning" | "info" | "muted" | "text";
  align?: "left" | "center" | "right" | "justify";
  transform?: "none" | "capitalize" | "uppercase" | "lowercase";
  decoration?: "none" | "underline" | "line-through";
  as?: React.ElementType;
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
  as,
  className = "",
  style = {},
}) => {
  const getVariantStyles = (variant: string) => {
    switch (variant) {
      case "h1":
        return {
          fontSize: "2.25rem",
          fontWeight: "700",
          lineHeight: "1.2",
          element: "h1"
        };
      case "h2":
        return {
          fontSize: "1.875rem",
          fontWeight: "600",
          lineHeight: "1.3",
          element: "h2"
        };
      case "h3":
        return {
          fontSize: "1.5rem",
          fontWeight: "600",
          lineHeight: "1.4",
          element: "h3"
        };
      case "h4":
        return {
          fontSize: "1.25rem",
          fontWeight: "600",
          lineHeight: "1.5",
          element: "h4"
        };
      case "h5":
        return {
          fontSize: "1.125rem",
          fontWeight: "600",
          lineHeight: "1.5",
          element: "h5"
        };
      case "h6":
        return {
          fontSize: "1rem",
          fontWeight: "600",
          lineHeight: "1.5",
          element: "h6"
        };
      case "body1":
        return {
          fontSize: "1rem",
          fontWeight: "400",
          lineHeight: "1.6",
          element: "p"
        };
      case "body2":
        return {
          fontSize: "0.875rem",
          fontWeight: "400",
          lineHeight: "1.6",
          element: "p"
        };
      case "caption":
        return {
          fontSize: "0.75rem",
          fontWeight: "400",
          lineHeight: "1.4",
          element: "span"
        };
      case "overline":
        return {
          fontSize: "0.75rem",
          fontWeight: "600",
          lineHeight: "1.4",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          element: "span"
        };
      default:
        return {
          fontSize: "1rem",
          fontWeight: "400",
          lineHeight: "1.6",
          element: "p"
        };
    }
  };

  const getSizeStyles = (size: string) => {
    switch (size) {
      case "xs":
        return { fontSize: "0.75rem" };
      case "sm":
        return { fontSize: "0.875rem" };
      case "md":
        return { fontSize: "1rem" };
      case "lg":
        return { fontSize: "1.125rem" };
      case "xl":
        return { fontSize: "1.25rem" };
      case "2xl":
        return { fontSize: "1.5rem" };
      case "3xl":
        return { fontSize: "1.875rem" };
      case "4xl":
        return { fontSize: "2.25rem" };
      default:
        return {};
    }
  };

  const getWeightStyles = (weight: string) => {
    switch (weight) {
      case "light":
        return { fontWeight: "300" };
      case "normal":
        return { fontWeight: "400" };
      case "medium":
        return { fontWeight: "500" };
      case "semibold":
        return { fontWeight: "600" };
      case "bold":
        return { fontWeight: "700" };
      default:
        return {};
    }
  };

  const getColorStyles = (color: string) => {
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

  const variantStyles = getVariantStyles(variant);
  const sizeStyles = size ? getSizeStyles(size) : {};
  const weightStyles = weight ? getWeightStyles(weight) : {};
  const colorStyles = getColorStyles(color);

  const Element = as || (variantStyles.element as React.ElementType);

  const combinedStyle = {
    fontSize: variantStyles.fontSize,
    fontWeight: variantStyles.fontWeight,
    lineHeight: variantStyles.lineHeight,
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