# 극한선택: 숨겨진 나 발견하기 - POC

## 🚀 실행 방법

### 1. 디렉토리 이동
```bash
cd D:\MCP\game_psy_r1\extreme-choice-poc
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 개발 서버 실행
```bash
npm run dev
```

### 4. 브라우저에서 접속
```
http://localhost:3000
```

## 📁 프로젝트 구조

```
extreme-choice-poc/
├── src/
│   ├── app/              # Next.js 페이지 라우팅
│   ├── components/       # React 컴포넌트
│   ├── lib/              # 유틸리티 (OpenAI, Context)
│   ├── data/             # 정적 데이터 (시나리오, 질문)
│   └── types/            # TypeScript 타입 정의
├── package.json
└── README.md
```

## 🔑 API 키 설정

OpenAI API 키는 `/src/lib/openai.ts`에 하드코딩되어 있습니다.
- 모델: `gpt-4.1-nano`
- POC 테스트용 설정

## 🎮 게임 플로우

1. **시작 화면**: 닉네임 입력 (선택)
2. **게임 진행**: 4라운드 극한 딜레마
3. **추가 질문**: 4개의 심리 분석 질문
4. **기본 분석**: AI 생성 성격 분석
5. **세부 분야**: 8개 분야 중 3개 추천
6. **심화 분석**: 선택한 분야 맞춤 분석

## 🛠️ 기술 스택

- **Frontend**: Next.js 14, TypeScript
- **UI**: shadcn/ui, Tailwind CSS
- **AI**: OpenAI API (gpt-4.1-nano)
- **상태관리**: React Context API

## ⚠️ 주의사항

- 이 POC는 테스트 목적으로 제작되었습니다
- API 키가 하드코딩되어 있으므로 프로덕션에서는 환경변수로 변경 필요
- 로컬 상태관리만 사용 (DB 연동 없음)