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