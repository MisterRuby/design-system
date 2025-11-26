# Design System UI Components

여러 제품에서 공유하는 React 기반 디자인 시스템입니다. 일관된 UI, 접근성, 반복 가능한 개발 경험을 제공하기 위해 Storybook 중심으로 구축했습니다.

## 목적
- 제품 전반에서 재사용 가능한 토큰, 기본 컴포넌트(Atomic), 레이아웃, 복합 컴포넌트를 제공
- Storybook 문서로 상태·상호작용을 명확히 기록하고 시각적으로 검증
- CRA 기반 빌드로 애플리케이션/문서 번들 모두 쉽게 배포

## 빠른 시작
```bash
# 의존성 설치
npm install

# 로컬 개발 서버 (CRA)
npm start

# Storybook 문서
npm run storybook

# 테스트 (Jest + RTL)
npm test

# 프로덕션 빌드 / Storybook 정적 문서
npm run build
npm run build-storybook
```

## 폴더 개요
- `src/components/` : Atomic → Molecule → Organism → Layout 컴포넌트. 새 컴포넌트는 `ComponentName/` 아래에 만들고 `src/components/index.ts`에 export 등록.
- `src/stories/` : Storybook 스토리. 모든 prop에 Controls를 제공하여 시각적 회귀 검증에 활용.
- `src/theme/` : 공통 토큰과 스타일 유틸.
- `storybook-static/` : `npm run build-storybook` 결과물. GitHub Pages 등 정적 호스팅에 바로 사용.

## Storybook 배포 힌트
1. `npm run build-storybook`으로 정적 사이트를 생성하면 `storybook-static/`이 만들어집니다.
2. GitHub Pages나 S3 같은 정적 호스팅에 `storybook-static` 폴더를 업로드하면 문서 사이트가 열립니다.
3. GitHub Actions 예시: checkout → `npm ci` → `npm run build-storybook` → `actions/upload-pages-artifact` → `actions/deploy-pages`.

## 개발 가이드
- 함수형 컴포넌트와 Hooks 사용, TypeScript로 타입 명시.
- CSS Modules를 기본으로 하며 모듈 키를 통해 변형(`styles.variant`)을 노출.
- 접근성: ARIA 속성과 키보드 인터랙션을 스토리/테스트에서 검증.
- 테스트는 사용자 행동 중심(React Testing Library)으로 작성하고, 주요 시나리오는 Storybook Play 함수로도 확인.

## 커밋 메시지 예시
- `feat(button): 로딩 상태 추가`
- `fix(tooltip): 포커스 트랩 이탈 방지`
- `docs: storybook 배포 가이드 업데이트`
- `test(grid): 접근성 회귀 테스트 추가`

## 라이선스
MIT License
