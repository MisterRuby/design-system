// 공용 색상/variant 타입 정의
export type SemanticVariant = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';

// 컴포넌트별 확장 가능한 variant 타입
export type ButtonVariant = SemanticVariant | 'outline';
export type InputVariant = SemanticVariant | 'default';
export type TextColor = SemanticVariant | 'text' | 'muted';
export type CheckboxColor = SemanticVariant;

// 크기 타입
export type ComponentSize = 'small' | 'medium' | 'large';
export type CheckboxSize = 'sm' | 'md' | 'lg';

// Typography 타입
export type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'overline';
export type TextSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
export type TextWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
export type TextAlign = 'left' | 'center' | 'right' | 'justify';
export type TextTransform = 'none' | 'capitalize' | 'uppercase' | 'lowercase';
export type TextDecoration = 'none' | 'underline' | 'line-through';