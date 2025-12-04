import React from "react";
import styled, { useTheme } from "styled-components";
import { InputVariant, ComponentSize } from "../../types";
import { Icon } from "./Icon";
import { useId } from "react";

export interface BaseSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface BaseSelectProps {
  options: BaseSelectOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  size?: ComponentSize;
  variant?: InputVariant;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  'data-testid'?: string;
}

const getBorderColor = (variant: InputVariant, theme: any) => {
  const variantMap: Record<InputVariant, string> = {
    default: theme.colors.border.default,
    primary: theme.colors.border.primary,
    secondary: theme.colors.border.secondary,
    success: theme.colors.border.success,
    error: theme.colors.border.error,
    warning: theme.colors.border.warning,
    info: theme.colors.border.info,
  };
  return variantMap[variant];
};

const getFocusRing = (variant: InputVariant, theme: any) => {
  const variantMap: Record<InputVariant, string> = {
    default: `0 0 0 3px ${theme.colors.primary[100]}`,
    primary: `0 0 0 3px ${theme.colors.primary[100]}`,
    secondary: `0 0 0 3px ${theme.colors.gray[100]}`,
    success: `0 0 0 3px ${theme.colors.success[100]}`,
    error: `0 0 0 3px ${theme.colors.error[100]}`,
    warning: `0 0 0 3px ${theme.colors.warning[100]}`,
    info: `0 0 0 3px ${theme.colors.info[100]}`,
  };
  return variantMap[variant];
};

const StyledSelect = styled.select<{ $size: ComponentSize; $variant: InputVariant }>`
  padding: ${props => props.theme.component.input.size[props.$size].padding};
  font-size: ${props => props.theme.component.input.size[props.$size].fontSize};
  height: ${props => props.theme.component.input.size[props.$size].height};
  border: ${props => props.theme.borderWidth[1]} solid ${props => getBorderColor(props.$variant, props.theme)};
  border-radius: ${props => props.theme.borderRadius.md};
  font-family: inherit;
  background-color: ${props => props.disabled ? props.theme.colors.background.disabled : props.theme.colors.background.white};
  color: ${props => props.disabled ? props.theme.colors.text.muted : props.theme.colors.text.primary};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: ${props => props.theme.transitions.normal};
  outline: none;
  width: 100%;
  box-sizing: border-box;

  &:focus:not(:disabled) {
    border-color: ${props => getBorderColor(props.$variant, props.theme)};
    box-shadow: ${props => getFocusRing(props.$variant, props.theme)};
  }
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Trigger = styled.button<{ $size: ComponentSize; $variant: InputVariant; $disabled: boolean; $hasPlaceholder: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;
  padding: ${({ theme, $size }) => theme.component.input.size[$size].padding};
  height: ${({ theme, $size }) => theme.component.input.size[$size].height};
  border: ${({ theme, $variant }) => `${theme.borderWidth[1]} solid ${getBorderColor($variant, theme)}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme, $disabled }) =>
    $disabled ? theme.colors.background.disabled : theme.colors.background.white};
  color: ${({ theme, $disabled, $hasPlaceholder }) =>
    $disabled
      ? theme.colors.text.muted
      : $hasPlaceholder
      ? theme.colors.text.secondary
      : theme.colors.text.primary};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  font-size: ${({ theme, $size }) => theme.component.input.size[$size].fontSize};
  font-family: inherit;
  text-align: left;
  transition: ${({ theme }) => theme.transitions.normal};
  box-sizing: border-box;

  &:focus-visible {
    outline: none;
    box-shadow: ${({ theme, $variant, $disabled }) =>
      $disabled ? "none" : getFocusRing($variant, theme)};
  }
`;

const OptionsList = styled.ul<{ $placement: "up" | "down"; $maxHeight: number }>`
  position: absolute;
  left: 0;
  right: 0;
  ${({ $placement, theme }) =>
    $placement === "down"
      ? `top: calc(100% + ${theme.spacing.xxs});`
      : `bottom: calc(100% + ${theme.spacing.xxs});`}
  margin: 0;
  padding: ${({ theme }) => `${theme.spacing.xxs} 0`};
  list-style: none;
  background-color: ${({ theme }) => theme.colors.background.white};
  border: ${({ theme }) => `${theme.borderWidth[1]} solid ${theme.colors.border.default}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.semanticShadows.cardHover};
  max-height: ${({ $maxHeight }) => `${$maxHeight}px`};
  overflow-y: auto;
  z-index: 20;
`;

const OptionItem = styled.li<{ $selected: boolean }>`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  cursor: pointer;
  color: ${({ theme, $selected }) => ($selected ? theme.colors.semantic.primary : theme.colors.text.primary)};
  background-color: transparent;
  transition: ${({ theme }) => theme.transitions.normal};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.gray100};
  }

  &[aria-disabled='true'] {
    color: ${({ theme }) => theme.colors.text.muted};
    cursor: not-allowed;
    background-color: transparent;
  }
`;

const ValueText = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const HiddenSelect = styled(StyledSelect)`
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
  height: 100%;
  width: 100%;
`;

export const BaseSelect: React.FC<BaseSelectProps> = ({
  options,
  value,
  defaultValue,
  placeholder,
  size = "medium",
  variant = "default",
  disabled = false,
  required = false,
  className = "",
  style = {},
  onChange,
  onFocus,
  onBlur,
  'data-testid': testId,
}) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState<string | undefined>(defaultValue);
  const [isOpen, setIsOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState<"up" | "down">("down");
  const [listMaxHeight, setListMaxHeight] = React.useState(240);
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const listId = useId();

  const selectedValue = isControlled ? value : internalValue;
  const selectedOption = options.find((option) => option.value === selectedValue);

  const closeList = () => setIsOpen(false);

  const emitChange = (newValue: string) => {
    const target = {
      value: newValue,
      name: undefined,
    } as unknown as HTMLSelectElement;
    const syntheticEvent = {
      target,
      currentTarget: target,
    } as React.ChangeEvent<HTMLSelectElement>;
    onChange?.(syntheticEvent);
  };

  const handleSelect = (option: BaseSelectOption) => {
    if (disabled || option.disabled) return;

    if (!isControlled) {
      setInternalValue(option.value);
    }
    emitChange(option.value);
    closeList();
  };

  const updateMenuPosition = React.useCallback(() => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;

    const offset = parseInt(theme.spacing.xs, 10) || 8;
    const spaceBelow = window.innerHeight - rect.bottom - offset;
    const spaceAbove = rect.top - offset;
    const shouldOpenUp = spaceBelow < 200 && spaceAbove > spaceBelow;
    setPlacement(shouldOpenUp ? "up" : "down");

    const availableSpace = shouldOpenUp ? spaceAbove : spaceBelow;
    const clamped = Math.max(120, Math.min(240, availableSpace));
    setListMaxHeight(clamped);
  }, [theme.spacing.xs]);

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        updateMenuPosition();
      }
      return next;
    });
  };

  React.useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        closeList();
      }
    };

    const handleResize = () => updateMenuPosition();

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleResize, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleResize, true);
    };
  }, [isOpen, updateMenuPosition]);

  const handleFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
    if (!disabled) {
      onFocus?.(event as unknown as React.FocusEvent<HTMLSelectElement>);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
    if (!disabled) {
      onBlur?.(event as unknown as React.FocusEvent<HTMLSelectElement>);
    }
  };

  return (
    <Wrapper ref={wrapperRef} className={className} style={style} data-testid={testId}>
      <HiddenSelect
        aria-hidden
        tabIndex={0}
        value={selectedValue}
        $size={size}
        $variant={variant}
        onChange={onChange}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </HiddenSelect>

      <Trigger
        type="button"
        onClick={handleToggle}
        onFocus={handleFocus}
        onBlur={handleBlur}
        $size={size}
        $variant={variant}
        $disabled={disabled}
        $hasPlaceholder={!selectedOption}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listId : undefined}
        aria-disabled={disabled}
      >
        <ValueText>{selectedOption ? selectedOption.label : placeholder ?? "옵션을 선택하세요"}</ValueText>
        <Icon name={isOpen ? "chevron-up" : "chevron-down"} size={16} color="currentColor" />
      </Trigger>

      {isOpen && (
        <OptionsList role="listbox" id={listId} $placement={placement} $maxHeight={listMaxHeight}>
          {options.map((option) => (
            <OptionItem
              key={option.value}
              role="option"
              aria-selected={selectedValue === option.value}
              aria-disabled={option.disabled}
              $selected={selectedValue === option.value}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </OptionItem>
          ))}
        </OptionsList>
      )}
    </Wrapper>
  );
};
