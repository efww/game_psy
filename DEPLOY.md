# Vercel을 통한 초간단 배포 가이드

## 🚀 방법 1: GitHub 연동 (가장 쉬움)

### 1단계: GitHub에 코드 업로드
```bash
# Git 초기화
git init
git add .
git commit -m "Initial commit"

# GitHub에 새 리포지토리 생성 후
git remote add origin https://github.com/[username]/extreme-choice-poc.git
git push -u origin main
```

### 2단계: Vercel 배포
1. https://vercel.com 접속
2. "Sign up with GitHub" 클릭
3. "Import Git Repository" 클릭
4. 방금 만든 리포지토리 선택
5. 환경변수 설정 (건너뛰어도 됨 - API 키가 하드코딩되어 있음)
6. "Deploy" 클릭

**완료!** 🎉 

배포 URL: `https://[프로젝트명].vercel.app`

---

## 🚀 방법 2: Vercel CLI (Git 없이)

### 1단계: Vercel CLI 설치
```bash
npm i -g vercel
```

### 2단계: 배포
```bash
# 프로젝트 폴더에서
vercel

# 질문에 답변:
# Set up and deploy? Y
# Which scope? (본인 계정 선택)
# Link to existing project? N
# Project name? extreme-choice-poc
# In which directory? ./ (엔터)
# Override settings? N
```

**완료!** 🎉

---

## 🚀 방법 3: 드래그 앤 드롭 (가장 간단)

### 1단계: 빌드
```bash
npm run build
```

### 2단계: 배포
1. https://vercel.com/new 접속
2. "Deploy without Git" 선택
3. `.next` 폴더를 브라우저로 드래그 앤 드롭
4. "Deploy" 클릭

---

## ⚙️ 환경변수 설정 (선택사항)

만약 API 키를 환경변수로 관리하고 싶다면:

1. Vercel 대시보드 → Settings → Environment Variables
2. 추가:
   - Name: `OPENAI_API_KEY`
   - Value: `sk-proj-...`
3. 코드에서 하드코딩된 키를 `process.env.OPENAI_API_KEY`로 변경

## 🔧 배포 후 설정

### 커스텀 도메인 (선택사항)
1. Settings → Domains
2. 도메인 추가 (예: `extreme-choice.com`)
3. DNS 설정 안내 따르기

### 분석 도구
1. Analytics 탭에서 무료 분석 도구 활성화
2. Web Vitals로 성능 모니터링

## 📱 배포 확인

배포 완료 후:
- PC: 바로 접속
- 모바일: QR 코드 생성하여 테스트
- 공유: 친구들에게 링크 전송

## 🐛 문제 해결

### Build 실패 시
```bash
# 로컬에서 먼저 테스트
npm run build
npm run start
```

### API 키 오류 시
- Vercel 대시보드에서 환경변수 확인
- Redeploy 클릭

---

**추천: 방법 1 (GitHub 연동)** 
- 자동 배포 설정 가능
- 코드 변경 시 자동 업데이트
- 버전 관리 편리