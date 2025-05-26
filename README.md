# 극한선택: 숨겨진 나 발견하기 - POC

심리학적 성격 측정 이론을 기반으로 한 웹 기반 심리 분석 게임입니다.

## 주요 기능

- 🧠 4차원 성격 측정 시스템 (I/C, E/R, T/S, P/F)
- 🎮 동적 시나리오 생성 (OpenAI GPT-4.1-nano)
- 🎨 8개 분야별 심층 분석
- 🌓 다크/라이트 모드 지원
- 📱 반응형 디자인

## 기술 스택

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui
- **AI Integration**: OpenAI API (GPT-4.1-nano)
- **State Management**: React Context API
- **Styling**: Tailwind CSS, next-themes

## 시작하기

### 사전 요구사항

- Node.js 18.0 이상
- npm 또는 yarn
- OpenAI API 키

### 설치 및 실행

1. 저장소 클론
```bash
git clone https://github.com/efww/game_psy.git
cd game_psy
```

2. 의존성 설치
```bash
npm install
```

3. 환경 변수 설정
`.env.local` 파일을 생성하고 OpenAI API 키를 추가합니다:
```env
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
```

4. 개발 서버 실행
```bash
npm run dev
```

5. 브라우저에서 http://localhost:3000 접속

## 배포

### Vercel 배포

1. [Vercel](https://vercel.com)에 로그인
2. "New Project" 클릭
3. GitHub 저장소 연결
4. 환경 변수 설정:
   - `NEXT_PUBLIC_OPENAI_API_KEY`: OpenAI API 키
5. "Deploy" 클릭

## 프로젝트 구조

```
src/
├── app/              # Next.js App Router 페이지
├── components/       # React 컴포넌트
│   ├── ui/          # shadcn/ui 컴포넌트
│   └── ...          # 커스텀 컴포넌트
├── lib/             # 유틸리티 및 헬퍼 함수
│   ├── openai.ts    # OpenAI API 통합
│   ├── gameContext.tsx # 게임 상태 관리
│   └── ...
├── types/           # TypeScript 타입 정의
└── data/           # 정적 데이터 (폴백 시나리오 등)
```

## 심리학적 기반

이 게임은 다음의 심리학 이론을 기반으로 합니다:

- **Moral Foundations Theory**: 도덕적 판단의 기초
- **Social Value Orientation**: 사회적 가치 지향성
- **Dual-Process Theory**: 이중 처리 이론
- **Schwartz Value Theory**: 슈워츠 가치 이론

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.