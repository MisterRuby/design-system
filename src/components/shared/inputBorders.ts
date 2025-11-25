import { colors, componentBorders, semanticBorders, borderWidth } from "../../theme";
import { InputVariant } from "../../types";

type InputBorderStyles = {
  border: string;
  focusBorder: string;
  focusBoxShadow: string;
};

export const getInputBorderStyles = (variant: InputVariant): InputBorderStyles => {
  const baseStyles: InputBorderStyles = {
    border: componentBorders.input.default,
    focusBorder: componentBorders.input.focus,
    focusBoxShadow: colors.focusRing.primary,
  };

  switch (variant) {
    case "primary":
      return {
        border: `${borderWidth[2]} solid ${colors.border.primary}`,
        focusBorder: componentBorders.input.focus,
        focusBoxShadow: colors.focusRing.primary,
      };
    case "secondary":
      return {
        border: `${borderWidth[2]} solid ${colors.border.secondary}`,
        focusBorder: `${borderWidth[2]} solid ${colors.border.focus.secondary}`,
        focusBoxShadow: colors.focusRing.secondary,
      };
    case "success":
      return {
        border: semanticBorders.success,
        focusBorder: `${borderWidth[2]} solid ${colors.border.focus.success}`,
        focusBoxShadow: colors.focusRing.success,
      };
    case "error":
      return {
        border: componentBorders.input.error,
        focusBorder: `${borderWidth[2]} solid ${colors.border.focus.error}`,
        focusBoxShadow: colors.focusRing.error,
      };
    case "warning":
      return {
        border: semanticBorders.warning,
        focusBorder: `${borderWidth[2]} solid ${colors.border.focus.warning}`,
        focusBoxShadow: colors.focusRing.warning,
      };
    case "info":
      return {
        border: semanticBorders.info,
        focusBorder: `${borderWidth[2]} solid ${colors.border.focus.info}`,
        focusBoxShadow: colors.focusRing.info,
      };
    default:
      return baseStyles;
  }
};
