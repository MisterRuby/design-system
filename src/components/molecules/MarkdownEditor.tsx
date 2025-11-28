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
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  background-color: #ffffff;

  .w-md-editor {
    background-color: #ffffff !important;
    border: none;
  }

  .w-md-editor.w-md-editor-focus {
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }

  .w-md-editor-text-pre,
  .w-md-editor-text-input,
  .w-md-editor-text,
  .w-md-editor-text-textarea,
  .w-md-editor textarea {
    color: #2d3748 !important;
    background-color: #ffffff !important;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif !important;
    font-size: 14px !important;
    line-height: 1.6 !important;
    caret-color: #2d3748 !important;
  }

  /* 편집 영역 텍스트 강화 */
  .w-md-editor-text-pre * {
    color: #2d3748 !important;
  }

  .w-md-editor .w-md-editor-text .w-md-editor-text-input {
    color: #2d3748 !important;
    background: transparent !important;
  }

  .w-md-editor .w-md-editor-text .w-md-editor-text-pre {
    color: #2d3748 !important;
  }

  /* CodeMirror 관련 스타일 */
  .w-md-editor .CodeMirror {
    color: #2d3748 !important;
    background-color: #ffffff !important;
  }

  .w-md-editor .CodeMirror .CodeMirror-lines {
    color: #2d3748 !important;
  }

  .w-md-editor .CodeMirror .CodeMirror-line {
    color: #2d3748 !important;
  }

  .w-md-editor .CodeMirror-cursor {
    border-left: 1px solid #2d3748 !important;
  }

  .w-md-editor-text-container {
    color: #2d3748 !important;
    background-color: #ffffff !important;
  }

  .w-md-editor-preview {
    background-color: #ffffff !important;
    color: #2d3748 !important;
  }

  .w-md-editor-toolbar {
    background-color: #f7fafc;
    border-bottom: 1px solid #e2e8f0;
    padding: 8px;
  }

  .w-md-editor-toolbar li button {
    color: #4a5568;
    border: none;
    background: none;
    padding: 4px 8px;
    border-radius: 4px;
    transition: background-color 0.2s;
  }

  .w-md-editor-toolbar li button:hover {
    background-color: #e2e8f0;
  }

  .w-md-editor-toolbar li button.active {
    background-color: #3182ce;
    color: #ffffff;
  }

  /* 마크다운 렌더링 스타일 */
  .w-md-editor-markdown {
    padding: 16px;
    font-size: 14px;
    line-height: 1.6;
  }

  .w-md-editor-markdown h1 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 1.5rem 0 0.75rem 0;
    color: #1a202c;
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 0.5rem;
  }

  .w-md-editor-markdown h2 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 1.25rem 0 0.5rem 0;
    color: #2d3748;
  }

  .w-md-editor-markdown h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin: 1rem 0 0.5rem 0;
    color: #2d3748;
  }

  .w-md-editor-markdown p {
    margin: 0.75rem 0;
    color: #2d3748;
  }

  .w-md-editor-markdown code {
    background-color: #f7fafc;
    color: #e53e3e;
    padding: 0.125rem 0.25rem;
    border-radius: 3px;
    font-size: 0.875rem;
  }

  .w-md-editor-markdown pre {
    background-color: #2d3748;
    color: #e2e8f0;
    padding: 1rem;
    border-radius: 6px;
    overflow-x: auto;
    margin: 0.75rem 0;
  }

  .w-md-editor-markdown pre code {
    background: none;
    color: inherit;
    padding: 0;
  }

  .w-md-editor-markdown ul,
  .w-md-editor-markdown ol {
    margin: 0.75rem 0;
    padding-left: 1.5rem;
  }

  .w-md-editor-markdown blockquote {
    border-left: 4px solid #3182ce;
    background-color: #f7fafc;
    padding: 0.75rem;
    margin: 0.75rem 0;
    border-radius: 0 6px 6px 0;
  }

  &:focus-within {
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }

  /* 강제 텍스트 색상 적용 */
  * {
    color: #2d3748 !important;
  }

  textarea,
  input {
    color: #2d3748 !important;
    background-color: #ffffff !important;
  }

  /* 모든 하위 요소에 색상 강제 적용 */
  [data-color-mode="light"] * {
    color: #2d3748 !important;
  }

  /* 편집기 전용 스타일 오버라이드 */
  .w-md-editor[data-color-mode="light"] {
    --md-editor-text-color: #2d3748 !important;
    --md-editor-bg-color: #ffffff !important;
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