#!/bin/bash
cd /mnt/d/mcp/game_psy_r1/extreme-choice-poc

# Initialize git repository
git init

# Add remote origin
git remote add origin https://github.com/efww/game_psy.git

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: 극한선택 심리게임 POC

- Next.js 14 기반 심리분석 게임 구현
- OpenAI GPT-4.1-nano 모델 통합
- 4차원 성격 측정 시스템 (I/C, E/R, T/S, P/F)
- 동적 시나리오 생성 및 분야별 심층 분석
- 다크/라이트 모드 지원
- 개선된 LLM 프롬프트 시스템 적용

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# Push to main branch
git branch -M main
git push -u origin main