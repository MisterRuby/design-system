import { InputVariant } from "../../types";
import { Theme } from "../../theme";

type InputBorderStyles = {
  border: string;
  focusBorder: string;
  focusBoxShadow: string;
};

export const getInputBorderStyles = (variant: InputVariant, theme: Theme): InputBorderStyles => {
  const baseStyles: InputBorderStyles = {
    border: theme.componentBorders.input.default,
    focusBorder: theme.componentBorders.input.focus,
    focusBoxShadow: theme.colors.focusRing.primary,
  };

  switch (variant) {
    case "primary":
      return {
        border: `${theme.borderWidth[2]} solid ${theme.colors.border.primary}`,
        focusBorder: theme.componentBorders.input.focus,
        focusBoxShadow: theme.colors.focusRing.primary,
      };
    case "secondary":
      return {
        border: `${theme.borderWidth[2]} solid ${theme.colors.border.secondary}`,
        focusBorder: `${theme.borderWidth[2]} solid ${theme.colors.border.secondary}`,
        focusBoxShadow: theme.colors.focusRing.secondary,
      };
    case "success":
      return {
        border: theme.semanticBorders.success,
        focusBorder: `${theme.borderWidth[2]} solid ${theme.colors.border.success}`,
        focusBoxShadow: theme.colors.focusRing.success,
      };
    case "error":
      return {
        border: theme.componentBorders.input.error,
        focusBorder: `${theme.borderWidth[2]} solid ${theme.colors.border.error}`,
        focusBoxShadow: theme.colors.focusRing.error,
      };
    case "warning":
      return {
        border: theme.semanticBorders.warning,
        focusBorder: `${theme.borderWidth[2]} solid ${theme.colors.border.warning}`,
        focusBoxShadow: theme.colors.focusRing.warning,
      };
    case "info":
      return {
        border: theme.semanticBorders.info,
        focusBorder: `${theme.borderWidth[2]} solid ${theme.colors.border.info}`,
        focusBoxShadow: theme.colors.focusRing.info,
      };
    default:
      return baseStyles;
  }
};
