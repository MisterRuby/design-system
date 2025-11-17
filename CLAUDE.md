# Claude Code 개발 규칙

## Storybook Story 작성 규칙

### 1. 단일 컴포넌트 스토리
**단일 컴포넌트**를 다루는 스토리는 `args + parameters` 구조를 사용합니다.

```javascript
export const StoryName = {
  args: {
    // 컴포넌트 props 정의
  },
  parameters: {
    docs: {
      source: {
        code: `<Component>Example</Component>`,
      },
    },
  },
};
```

**장점:**
- Controls 패널에서 실시간 props 변경 가능
- 사용자가 직접 테스트하며 학습 가능

### 2. 다중 컴포넌트 스토리
**여러 컴포넌트**를 비교하거나 조합하는 스토리는 `render + parameters` 구조를 사용합니다.

```javascript
export const StoryName = {
  render: () => (
    <div style={{ display: "flex", gap: "10px" }}>
      <Component variant="option1">Option 1</Component>
      <Component variant="option2">Option 2</Component>
      <Component variant="option3">Option 3</Component>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Component variant="option1">Option 1</Component>
<Component variant="option2">Option 2</Component>
<Component variant="option3">Option 3</Component>`,
      },
    },
  },
};
```

**장점:**
- 여러 옵션을 한 눈에 비교 가능
- 실제 React 사용법 코드 제공

### 3. 적용 예시

**단일 컴포넌트 (args + parameters):**
- Default
- Disabled
- Loading
- Error

**다중 컴포넌트 (render + parameters):**
- Variants (primary, secondary, danger 등)
- Sizes (small, medium, large 등)
- States (다양한 상태 조합)

## 컴포넌트 구조 규칙

### Atomic Design 패턴 적용
```
src/
├── components/
│   ├── atomic/           # 기본 UI 요소 (Button, Input, Icon 등)
│   ├── molecules/        # atomic 컴포넌트 조합
│   ├── organisms/        # molecules + atomic 복합체
│   └── index.ts         # 전체 export
└── stories/             # Storybook 스토리
```

### 컴포넌트 파일 구조
- **간단한 컴포넌트**: `atomic/Button.tsx` (단일 파일)
- **복잡한 컴포넌트**: `molecules/SearchBox/index.ts` (폴더 구조)

### Export 규칙
```typescript
// 컴포넌트와 타입 모두 export
export { Button } from './Button';
export type { ButtonProps } from './Button';
```

## 문서화 규칙

### 한글 설명 사용
모든 Storybook 설명은 한글로 작성합니다.

```javascript
argTypes: {
  variant: {
    description: '버튼의 시각적 스타일 유형',
  },
}
```

### 실제 React 코드 제공
`parameters.docs.source.code`에는 개발자가 실제로 사용할 수 있는 React 코드를 제공합니다.

```javascript
parameters: {
  docs: {
    source: {
      code: `<Button variant="primary">버튼</Button>`,
    },
  },
}
```

## Git 커밋 컨벤션

### 커밋 메시지 형식
```
<type>: <subject>

[optional body]

[optional footer]
```

### 커밋 타입 (Type)
- **feat**: 새로운 기능 추가
- **fix**: 버그 수정
- **docs**: 문서 변경
- **style**: 코드 포맷팅, 세미콜론 누락 등 (기능에 영향 없음)
- **refactor**: 코드 리팩토링 (기능 변경 없음)
- **test**: 테스트 코드 추가 또는 수정
- **chore**: 빌드 도구, 패키지 매니저 설정 등
- **perf**: 성능 개선
- **ci**: CI/CD 설정 변경
- **build**: 빌드 시스템 변경

### 커밋 메시지 예시
```bash
# 기능 추가
feat: Button 컴포넌트 추가
feat: 로그인 페이지 구현
feat: API 연동 기능 추가

# 버그 수정
fix: Button 클릭 이벤트 오류 수정
fix: 로그인 실패 시 에러 메시지 표시 안되는 문제 해결

# 문서 업데이트
docs: README 파일 업데이트
docs: API 문서 추가

# 코드 개선
refactor: Button 컴포넌트 코드 정리
style: 들여쓰기 및 코드 포맷팅 수정

# 테스트
test: Button 컴포넌트 테스트 추가

# 빌드/설정
chore: Storybook 설정 업데이트
build: webpack 설정 변경
```

### 커밋 메시지 작성 규칙
1. **제목은 50자 이내**로 작성
2. **제목 첫 글자는 대문자**로 시작
3. **제목 끝에 마침표(.) 사용 금지**
4. **제목은 명령문**으로 작성 ("추가한다" ❌ → "추가" ⭕)
5. **본문은 72자마다 줄바꿈**
6. **본문에는 "무엇을", "왜"를 설명**

### 브랜치별 커밋 예시
```bash
# feature 브랜치
feat: Input 컴포넌트 validation 기능 추가
feat: 사용자 프로필 편집 기능 구현

# bugfix 브랜치
fix: 모바일에서 Button 레이아웃 깨짐 수정

# docs 브랜치
docs: 컴포넌트 사용 가이드 문서 작성
```