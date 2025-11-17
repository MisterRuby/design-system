# Schedule AI - UI Components

AI 스케줄 관리 애플리케이션을 위한 React 컴포넌트 라이브러리입니다.

## 🚀 시작하기

### 개발 환경 실행

```bash
# 개발 서버 실행
npm start

# Storybook 실행 (컴포넌트 개발/테스트)
npm run storybook

# 테스트 실행
npm test

# 빌드
npm run build
```

## 📦 컴포넌트

### Calendar

월간 캘린더 뷰로 일정을 시각적으로 표시합니다.

```tsx
import { Calendar } from './components';

<Calendar
  events={events}
  onEventClick={handleEventClick}
  onDateSelect={handleDateSelect}
  view="month"
/>
```

### ScheduleCard

개별 일정을 카드 형태로 표시합니다.

```tsx
import { ScheduleCard } from './components';

<ScheduleCard
  id="1"
  title="프로젝트 회의"
  startTime="2024-01-15T10:00:00Z"
  endTime="2024-01-15T11:00:00Z"
  priority="high"
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

### ScheduleForm

일정을 생성/수정하는 모달 폼입니다.

```tsx
import { ScheduleForm } from './components';

<ScheduleForm
  initialData={scheduleData}
  onSubmit={handleSubmit}
  onCancel={handleCancel}
  isLoading={isSubmitting}
/>
```

### AIScheduleInput

자연어로 일정을 입력받는 AI 기반 컴포넌트입니다.

```tsx
import { AIScheduleInput } from './components';

<AIScheduleInput
  onSubmit={handleAISubmit}
  isLoading={isProcessing}
  suggestions={suggestions}
/>
```

## 🎨 스타일링

각 컴포넌트는 CSS 모듈을 사용하며, 다음과 같은 CSS 커스텀 속성을 통해 테마를 수정할 수 있습니다:

```css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #64748b;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --danger-color: #ef4444;

  --border-radius: 12px;
  --box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

## 📱 반응형 디자인

모든 컴포넌트는 모바일 및 데스크톱 환경에서 최적화되어 있습니다.

- 데스크톱: 1200px+
- 태블릿: 768px - 1199px
- 모바일: 767px 이하

## 🧪 Storybook

컴포넌트의 다양한 상태와 사용 사례를 확인할 수 있습니다:

```bash
npm run storybook
```

브라우저에서 `http://localhost:6006`으로 접속하면 모든 컴포넌트의 스토리를 확인할 수 있습니다.

## 🔧 개발

### 새 컴포넌트 추가

1. `src/components/ComponentName/` 디렉토리 생성
2. `ComponentName.tsx`, `ComponentName.css`, `ComponentName.stories.ts` 파일 생성
3. `src/components/index.ts`에 export 추가

### 커밋 규칙

```bash
feat: 새로운 컴포넌트 추가
fix: 기존 컴포넌트 버그 수정
style: CSS 스타일 개선
docs: 문서 업데이트
test: 테스트 코드 추가/수정
```

## 📄 라이선스

MIT License
