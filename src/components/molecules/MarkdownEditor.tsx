import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import styled from 'styled-components';

export interface MarkdownEditorProps {
  value?: string;
  onChange?: (value?: string) => void;
  placeholder?: string;
  height?: number | string;
  preview?: 'edit' | 'live' | 'preview';
  hideToolbar?: boolean;
  visibleDragBar?: boolean;
  disabled?: boolean;
  className?: string;
}

const StyledEditorContainer = styled.div<{ $height?: number | string }>`
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  border: ${({ theme }) => `${theme.borderWidth[1]} solid ${theme.colors.border.default}`};
  background-color: ${({ theme }) => theme.colors.background.white};
  height: ${({ $height }) => ($height ? (typeof $height === 'number' ? `${$height}px` : $height) : 'auto')};

  .w-md-editor {
    background-color: ${({ theme }) => theme.colors.background.white} !important;
    border: none;
  }

  .w-md-editor.w-md-editor-focus {
    border-color: ${({ theme }) => theme.colors.semantic.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.focusRing.primary};
  }

  .w-md-editor-text-pre,
  .w-md-editor-text-input,
  .w-md-editor-text,
  .w-md-editor-text-textarea,
  .w-md-editor textarea {
    color: ${({ theme }) => theme.colors.text.primary} !important;
    background-color: ${({ theme }) => theme.colors.background.white} !important;
    font-family: ${({ theme }) => theme.fontFamily.sans} !important;
    font-size: ${({ theme }) => theme.fontSize.sm} !important;
    line-height: ${({ theme }) => theme.lineHeight.loose} !important;
    caret-color: ${({ theme }) => theme.colors.text.primary} !important;
  }

  .w-md-editor-text-pre * {
    color: ${({ theme }) => theme.colors.text.primary} !important;
  }

  .w-md-editor .w-md-editor-text .w-md-editor-text-input {
    color: ${({ theme }) => theme.colors.text.primary} !important;
    background: transparent !important;
  }

  .w-md-editor .w-md-editor-text .w-md-editor-text-pre {
    color: ${({ theme }) => theme.colors.text.primary} !important;
  }

  .w-md-editor .CodeMirror {
    color: ${({ theme }) => theme.colors.text.primary} !important;
    background-color: ${({ theme }) => theme.colors.background.white} !important;
  }

  .w-md-editor .CodeMirror .CodeMirror-lines {
    color: ${({ theme }) => theme.colors.text.primary} !important;
  }

  .w-md-editor .CodeMirror .CodeMirror-line {
    color: ${({ theme }) => theme.colors.text.primary} !important;
  }

  .w-md-editor .CodeMirror-cursor {
    border-left: ${({ theme }) => `${theme.borderWidth[1]} solid ${theme.colors.text.primary}`} !important;
  }

  .w-md-editor-text-container {
    color: ${({ theme }) => theme.colors.text.primary} !important;
    background-color: ${({ theme }) => theme.colors.background.white} !important;
  }

  .w-md-editor-preview {
    background-color: ${({ theme }) => theme.colors.background.white} !important;
    color: ${({ theme }) => theme.colors.text.primary} !important;
  }

  .w-md-editor-toolbar {
    background-color: ${({ theme }) => theme.colors.background.gray50};
    border-bottom: ${({ theme }) => `${theme.borderWidth[1]} solid ${theme.colors.border.default}`};
    padding: ${({ theme }) => theme.spacing.xs};
  }

  .w-md-editor-toolbar li button {
    color: ${({ theme }) => theme.colors.text.secondary};
    border: none;
    background: none;
    padding: ${({ theme }) => `${theme.spacing.xxs} ${theme.spacing.xs}`};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    transition: ${({ theme }) => theme.transitions.normal};
  }

  .w-md-editor-toolbar li button:hover {
    background-color: ${({ theme }) => theme.colors.gray[200]};
  }

  .w-md-editor-toolbar li button.active {
    background-color: ${({ theme }) => theme.colors.semantic.primary};
    color: ${({ theme }) => theme.colors.background.white};
  }

  .w-md-editor-markdown {
    padding: ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.fontSize.sm};
    line-height: ${({ theme }) => theme.lineHeight.loose};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  .w-md-editor-markdown h1 {
    font-size: ${({ theme }) => theme.fontSize['2xl']};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    margin: ${({ theme }) => `${theme.spacing.xl} 0 ${theme.spacing.sm} 0`};
    color: ${({ theme }) => theme.colors.text.primary};
    border-bottom: ${({ theme }) => `${theme.borderWidth[1]} solid ${theme.colors.border.default}`};
    padding-bottom: ${({ theme }) => theme.spacing.xs};
  }

  .w-md-editor-markdown h2 {
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    margin: ${({ theme }) => `${theme.spacing.lg} 0 ${theme.spacing.xs} 0`};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  .w-md-editor-markdown h3 {
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    margin: ${({ theme }) => `${theme.spacing.md} 0 ${theme.spacing.xs} 0`};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  .w-md-editor-markdown p {
    margin: ${({ theme }) => `${theme.spacing.sm} 0`};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  .w-md-editor-markdown code {
    background-color: ${({ theme }) => theme.colors.background.gray50};
    color: ${({ theme }) => theme.colors.error[600]};
    padding: ${({ theme }) => `calc(${theme.spacing.xxs} / 2) ${theme.spacing.xs}`};
    border-radius: ${({ theme }) => theme.borderRadius.xs};
    font-size: ${({ theme }) => theme.fontSize.sm};
  }

  .w-md-editor-markdown pre {
    background-color: ${({ theme }) => theme.colors.gray[800]};
    color: ${({ theme }) => theme.colors.gray[200]};
    padding: ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    overflow-x: auto;
    margin: ${({ theme }) => `${theme.spacing.sm} 0`};
  }

  .w-md-editor-markdown pre code {
    background: none;
    color: inherit;
    padding: 0;
  }

  .w-md-editor-markdown ul,
  .w-md-editor-markdown ol {
    margin: ${({ theme }) => `${theme.spacing.sm} 0`};
    padding-left: ${({ theme }) => theme.spacing.xl};
  }

  .w-md-editor-markdown blockquote {
    border-left: ${({ theme }) => `${theme.borderWidth[4]} solid ${theme.colors.semantic.primary}`};
    background-color: ${({ theme }) => theme.colors.background.gray50};
    padding: ${({ theme }) => theme.spacing.sm};
    margin: ${({ theme }) => `${theme.spacing.sm} 0`};
    border-radius: ${({ theme }) => `0 ${theme.borderRadius.md} ${theme.borderRadius.md} 0`};
  }

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.semantic.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.focusRing.primary};
  }

  * {
    color: ${({ theme }) => theme.colors.text.primary} !important;
  }

  textarea,
  input {
    color: ${({ theme }) => theme.colors.text.primary} !important;
    background-color: ${({ theme }) => theme.colors.background.white} !important;
  }

  [data-color-mode="light"] * {
    color: ${({ theme }) => theme.colors.text.primary} !important;
  }

  .w-md-editor[data-color-mode="light"] {
    --md-editor-text-color: ${({ theme }) => theme.colors.text.primary} !important;
    --md-editor-bg-color: ${({ theme }) => theme.colors.background.white} !important;
  }
`;

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value = '',
  onChange,
  placeholder = '마크다운으로 내용을 작성해보세요...',
  height = 300,
  preview = 'live',
  hideToolbar = false,
  visibleDragBar = false,
  disabled = false,
  className,
  ...props
}) => {
  return (
    <StyledEditorContainer $height={height} className={className}>
      <MDEditor
        value={value}
        onChange={onChange}
        data-color-mode="light"
        preview={preview}
        height={height}
        hideToolbar={hideToolbar}
        visibleDragbar={visibleDragBar}
        textareaProps={{
          placeholder,
          disabled,
        }}
        {...props}
      />
    </StyledEditorContainer>
  );
};

export default MarkdownEditor;
