# Ruby Design System

여러 제품에서 공유하는 React 기반 디자인 시스템입니다. 일관된 UI, 접근성, 반복 가능한 개발 경험을 제공하기 위해 Storybook 중심으로 구축했습니다.

## 📦 라이브러리 설치 및 사용

### NPM 패키지로 설치

```bash
# NPM 레지스트리에서 설치
npm install @ruby/design-system

# 또는 Yarn
yarn add @ruby/design-system
```

### Git 저장소에서 직접 설치

```bash
# Git 의존성으로 설치
npm install git+https://github.com/your-username/ruby-design-system.git

# 특정 버전/브랜치 설치
npm install git+https://github.com/your-username/ruby-design-system.git#v1.0.0
```

### 로컬 파일 시스템에서 설치

```bash
# 로컬 경로에서 설치 (개발용)
npm install file:../path/to/design-system

# 압축파일로 배포
npm pack  # .tgz 파일 생성
npm install /path/to/ruby-design-system-1.0.0.tgz
```

## 🚀 사용법

### 기본 사용법

```tsx
import React from 'react';
import { Button, Input, Icon, Badge } from '@ruby/design-system';

function App() {
  return (
    <div>
      <Button variant="primary" size="medium">
        클릭하세요
      </Button>

      <Input
        placeholder="텍스트를 입력하세요"
        label="사용자명"
        required
      />

      <Icon name="search" size={24} />

      <Badge variant="success">완료</Badge>
    </div>
  );
}

export default App;
```

### 테마 적용

```tsx
import React from 'react';
import { ThemeProvider } from '@ruby/design-system';

function App() {
  return (
    <ThemeProvider>
      {/* 앱 컴포넌트들 */}
    </ThemeProvider>
  );
}
```

### 타입스크립트 지원

```tsx
import React from 'react';
import { Button, ButtonProps } from '@ruby/design-system';

// 타입 안전성 확보
const CustomButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

## 📋 필수 의존성 (Peer Dependencies)

이 라이브러리를 사용하려면 다음 패키지가 프로젝트에 설치되어 있어야 합니다:

```bash
npm install react@>=17.0.0 react-dom@>=17.0.0
```

추가 스타일링을 위해 styled-components도 권장됩니다:

```bash
npm install styled-components
```

## 🔄 업데이트

```bash
# 최신 버전으로 업데이트
npm update @ruby/design-system

# 특정 버전으로 업데이트
npm install @ruby/design-system@^2.0.0

# 강제 재설치
npm install @ruby/design-system --force
```

## 🔧 라이브러리 빌드 및 배포

### 개발 환경 설정

```bash
# 저장소 클론
git clone <repository-url>
cd design-system

# 의존성 설치
npm install

# 개발 서버 시작 (Storybook)
npm run storybook

# 컴포넌트 개발 서버 (CRA)
npm start
```

### 라이브러리 빌드

```bash
# 라이브러리용 빌드 (dist 폴더 생성)
npm run build

# 개발용 빌드 (build 폴더 생성)
npm run build:dev

# 빌드 결과 확인
ls -la dist/
```

### 배포 방법

#### 1. NPM 레지스트리 배포

```bash
# 빌드
npm run build

# 로그인 (최초 1회)
npm login

# 배포
npm publish

# 스코프 패키지 배포 (public)
npm publish --access public
```

#### 2. 패키지 파일 배포

```bash
# .tgz 파일 생성
npm pack

# 생성된 파일 확인
ls *.tgz
# ruby-design-system-1.0.0.tgz

# 다른 프로젝트에서 설치
npm install /path/to/ruby-design-system-1.0.0.tgz
```

#### 3. GitHub Packages 배포

```bash
# .npmrc 설정
echo "@ruby:registry=https://npm.pkg.github.com" >> .npmrc

# 배포
npm publish
```

### 버전 관리

```bash
# 패치 버전 업데이트 (1.0.0 → 1.0.1)
npm version patch

# 마이너 버전 업데이트 (1.0.0 → 1.1.0)
npm version minor

# 메이저 버전 업데이트 (1.0.0 → 2.0.0)
npm version major

# 수동 버전 설정
npm version 1.2.3
```

### 배포 전 체크리스트

```bash
# 1. 모든 테스트 통과 확인
npm test

# 2. TypeScript 오류 없는지 확인
npx tsc --noEmit

# 3. 라이브러리 빌드 성공 확인
npm run build

# 4. 패키지 내용 미리보기
npm pack --dry-run

# 5. 로컬에서 설치 테스트
npm pack
cd ../test-project
npm install ../design-system/ruby-design-system-1.0.0.tgz

# 6. 배포
npm publish
```

## 🚀 GitHub Actions 자동 배포

### 설정된 워크플로우

#### 1. 자동 NPM 배포 (`/.github/workflows/publish.yml`)
```bash
# 태그 기반 자동 배포
git tag v1.0.1
git push origin v1.0.1

# 수동 배포 (GitHub 웹에서 Actions > 자동 NPM 배포 > Run workflow)
```

#### 2. 빌드/테스트 검증 (`/.github/workflows/build-test.yml`)
- 모든 push와 PR에서 자동 실행
- Node.js 16, 18, 20 버전에서 테스트
- ESLint, TypeScript, 빌드 검증

#### 3. Storybook 배포 (`/.github/workflows/storybook-deploy.yml`)
- main 브랜치 push 시 GitHub Pages에 자동 배포
- 문서 사이트: `https://your-username.github.io/design-system`

### GitHub Secrets 설정

배포를 위해 GitHub 저장소에서 다음 시크릿을 설정해야 합니다:

1. **NPM_TOKEN**: NPM 배포용 토큰
   ```bash
   # NPM에서 토큰 생성
   npm login
   npm token create --type=automation
   ```

2. **GITHUB_TOKEN**: 자동으로 제공 (설정 불필요)

### 배포 워크플로우

#### 자동 배포 (권장)
```bash
# 1. 버전 업데이트
npm version patch  # 또는 minor, major

# 2. 태그와 함께 푸시
git push origin main --follow-tags

# 3. GitHub Actions가 자동으로 배포 실행
```

#### 수동 배포
```bash
# GitHub 웹 인터페이스에서:
# Actions > 자동 NPM 배포 > Run workflow 버튼 클릭
```

### 배포 프로세스

1. **코드 푸시** → 자동 테스트 실행
2. **버전 태그** → NPM 자동 배포
3. **main 브랜치** → Storybook 문서 배포

### 브랜치 전략

```
main (또는 master)     # 프로덕션 배포
├── develop           # 개발 브랜치 (자동 테스트만)
└── feature/*         # 기능 브랜치 (PR 시 테스트)
```

### 초기 설정 가이드

#### 1. NPM 토큰 생성 및 GitHub Secrets 설정

```bash
# 1. NPM 로그인
npm login

# 2. 자동화용 토큰 생성 (granular 토큰 권장)
npm access grant read-write your-username:developers @ruby/design-system
```

**GitHub에서 Secret 설정:**
1. GitHub 저장소 → Settings → Secrets and variables → Actions
2. "New repository secret" 클릭
3. Name: `NPM_TOKEN`, Value: (생성한 토큰)

#### 2. GitHub Pages 활성화

1. GitHub 저장소 → Settings → Pages
2. Source: "GitHub Actions" 선택
3. 첫 배포 후 `https://your-username.github.io/design-system`에서 Storybook 확인

#### 3. 배포 테스트

```bash
# 초기 버전 태그 생성
git tag v1.0.0
git push origin v1.0.0

# GitHub Actions에서 배포 상황 확인
# https://github.com/your-username/design-system/actions
```

### 고급 설정

#### 1. 조건부 배포
- **태그 배포**: `v*.*.*` 패턴의 태그에서만 NPM 배포
- **브랜치 배포**: `main` 브랜치에서만 Storybook 배포
- **PR 검증**: 모든 PR에서 빌드/테스트 자동 실행

#### 2. 다중 레지스트리 배포
```yml
# NPM + GitHub Packages 동시 배포
- name: NPM 배포
  run: npm publish --access public
- name: GitHub Packages 배포
  run: |
    echo "@ruby:registry=https://npm.pkg.github.com" >> .npmrc
    npm publish
```

#### 3. 슬랙/디스코드 알림 연동
```yml
- name: 슬랙 알림
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

## 🏗️ 프로젝트 구조

### 빌드 결과물

**⚠️ 중요**: `dist` 디렉토리는 Git에 커밋하지 않습니다. GitHub Actions에서 자동으로 빌드됩니다.

```
dist/ (자동 생성, Git 추적 안함)
├── index.js          # CommonJS 메인 진입점
├── index.d.ts        # TypeScript 타입 정의
├── index.js.map      # 소스맵
├── esm/             # ES 모듈 버전
│   ├── index.js
│   ├── index.d.ts
│   └── package.json  # {"type": "module"}
├── components/       # 개별 컴포넌트 파일들
├── types/           # 타입 정의
└── theme/           # 테마 설정
```

### 빌드/배포 흐름

1. **소스 코드만 Git에 커밋**
   - `src/` 디렉토리의 TypeScript 파일들
   - `dist/`는 `.gitignore`에 포함

2. **GitHub Actions에서 자동 빌드**
   - 배포 시점에 `npm run build` 실행
   - `dist/` 디렉토리 동적 생성

3. **NPM 패키지에만 포함**
   - `package.json`의 `files: ["dist"]` 설정
   - 사용자는 빌드된 결과물만 다운로드

### 소스 구조

```
src/
├── index.ts                 # 메인 진입점
├── components/
│   ├── atomic/             # 기본 컴포넌트
│   ├── molecules/          # 복합 컴포넌트
│   ├── organisms/          # 조직 컴포넌트
│   ├── layout/            # 레이아웃 컴포넌트
│   └── index.ts           # 컴포넌트 export
├── types/                  # 공통 타입 정의
├── theme/                  # 테마 및 디자인 토큰
└── utils/                  # 유틸리티 함수
```

## 🎯 목적

- 제품 전반에서 재사용 가능한 토큰, 기본 컴포넌트(Atomic), 레이아웃, 복합 컴포넌트를 제공
- Storybook 문서로 상태·상호작용을 명확히 기록하고 시각적으로 검증
- TypeScript 지원으로 타입 안전성 보장
- 모듈 번들러 무관하게 사용할 수 있는 유연한 배포 형태 제공

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

## 🔍 배포 문제 해결

### 자주 발생하는 문제들

#### 1. NPM 배포 실패
```bash
# 토큰 권한 확인
npm whoami
npm access list packages @ruby

# 스코프 패키지 권한 설정
npm access grant read-write @ruby/design-system
```

#### 2. GitHub Actions 실패
- **NPM_TOKEN**: Settings → Secrets → Actions에 정확히 설정했는지 확인
- **Node 버전**: package.json engines 필드와 워크플로우 버전 일치 확인
- **테스트 실패**: 로컬에서 `npm test` 먼저 확인

#### 3. 로컬 테스트 방법
```bash
# 패키지 생성
npm pack

# 테스트 프로젝트에서 설치
cd ../test-project
npm install ../design-system/ruby-design-system-1.0.0.tgz

# 임포트 테스트
import { Button } from '@ruby/design-system';
```

### 배포 체크리스트

- [ ] 모든 컴포넌트가 `src/components/index.ts`에 export 되었는가?
- [ ] `dist/` 디렉토리가 `.gitignore`에 포함되었는가?
- [ ] NPM_TOKEN이 GitHub Secrets에 설정되었는가?
- [ ] package.json의 version이 올바른가?
- [ ] 로컬에서 `npm run build`가 성공하는가?
- [ ] 로컬에서 `npm test`가 통과하는가?

## 라이선스
MIT License
