import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { GameSession } from '@/types/game';
import {
  calculateICDimension,
  calculateERDimension,
  calculateTSDimension,
  calculatePFDimension,
  predictConflictStyle,
  predictDecisionProcess
} from '@/lib/dimension-analyzer';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // 서버에서만 접근 가능
});

export async function POST(request: NextRequest) {
  try {
    const session: GameSession = await request.json();

    if (!process.env.OPENAI_API_KEY) {
      console.warn('OpenAI API key not found, using fallback analysis');
      return NextResponse.json({ 
        analysis: getFallbackAnalysis(session.choices) 
      });
    }

    const prompt = `
당신은 "심리 측정 분석 전문가"입니다. 성격 차원 측정과 행동 예측에 특화되어 있습니다.

선택 순서: ${session.choices.join(', ')} (4라운드: A-D 선택)
결정 소요시간: ${session.choiceTimings.map(t => `${(t/1000).toFixed(1)}초`).join(', ')}

중요: 모든 출력은 반드시 한글로만 작성하세요. 영어 단어나 표현 절대 금지.

## **[성격 유형]**
- 8-12자 (공백 포함)
- 재미있고 개성 있는 표현 사용
- 예시: "감성적 전략가", "신중한 리더", "유쾌한 협력자"

### 이런 사람이야
- **[특성1]**: 구체적이고 재미있는 설명 (40-50자)
- **[특성2]**: 구체적이고 재미있는 설명 (40-50자)  
- **[특성3]**: 구체적이고 재미있는 설명 (40-50자)

### 현실에서는
- [상황1]: 예상 행동 패턴 (45-55자)
- [상황2]: 예상 행동 패턴 (45-55자)

**한 줄 요약**: 강렬하고 개성 있는 마무리 (30-40자)

출력 요구사항:
- 친근하고 재미있는 반말 톤
- 총 길이 300-350자
- 중요 키워드 **굵게** 강조
- "어? 나한테 이런 면이?" 같은 놀라움 요소 포함
- 버즈피드 퀴즈 같은 재미와 개성
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 600
    });

    const analysis = completion.choices[0].message.content || getFallbackAnalysis(session.choices);
    
    return NextResponse.json({ analysis });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return NextResponse.json({ 
      analysis: getFallbackAnalysis([]) 
    });
  }
}

function getFallbackAnalysis(choices: string[]): string {
  const ic = calculateICDimension(choices);
  const er = calculateERDimension(choices);
  const ts = calculateTSDimension(choices);
  const pf = calculatePFDimension(choices);
  
  const personality = er > 50 ? "감성적 공감러" : "이성적 전략가";
  
  return `## **${personality}**

### 심리적 특성
- **${ic > 50 ? '개인주의' : '집단주의'}**: ${ic > 50 ? '독립적 판단을 중시하는' : '조화와 협력을 우선시하는'} 성향 (${ic}%)
- **${ts > 50 ? '도전 정신' : '안정 추구'}**: ${ts > 50 ? '새로운 도전을 두려워하지 않는' : '신중하고 안정적인 선택을 선호하는'} 모습 (${ts}%)
- **${pf > 50 ? '원칙주의' : '상황주의'}**: ${pf > 50 ? '확고한 원칙을 고수하는' : '상황에 따라 유연하게 대처하는'} 태도 (${pf}%)

### 행동 예측
- 갈등 상황: ${predictConflictStyle(choices)}
- 의사결정: ${predictDecisionProcess(choices)}

**한 줄 요약**: ${personality}인 당신, 그 모습 그대로가 멋져요! ✨`;
}
