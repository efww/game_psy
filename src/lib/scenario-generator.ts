import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true
});

export interface GeneratedScenario {
  id: string;
  title: string;
  description: string;
  rounds: Array<{
    id: string;
    situation: string;
    choices: Array<{
      id: string;
      text: string;
      traits: string[];
    }>;
  }>;
  generatedAt: Date;
}

export async function generateNewScenario(): Promise<GeneratedScenario> {
  const prompt = `
당신은 "심리측정학적 도구 설계 전문가"입니다. 성격 차원을 정확히 측정하는 시나리오를 제작합니다.

────────────────────  측정 목표  ────────────────────
다음 4개 성격 차원을 정확히 측정하는 4라운드 시나리오 생성:
1. 개인주의(I) vs 집단주의(C): 개인 이익 vs 집단 이익 우선시
2. 감정적(E) vs 이성적(R): 직감/감정 vs 논리/분석 우선시  
3. 위험감수(T) vs 안전추구(S): 모험 vs 안정 선호
4. 원칙중심(P) vs 상황중심(F): 절대기준 vs 유연적용

────────────────────  라운드별 측정 매트릭스  ────────────────────
라운드 1: 기본 도덕관 (I/C + E/R 측정)
- 상황: 자원 부족 상황에서의 기본 가치관
- 선택지 A: I+E 조합 / 선택지 B: C+E 조합
- 선택지 C: I+R 조합 / 선택지 D: C+R 조합

라운드 2: 관계 우선순위 (I/C + T/S 측정)  
- 상황: 대인관계 갈등과 위험 요소
- 선택지 A: I+T 조합 / 선택지 B: C+T 조합
- 선택지 C: I+S 조합 / 선택지 D: C+S 조합

라운드 3: 자원 배분 (E/R + P/F 측정)
- 상황: 분배 딜레마와 공정성 문제  
- 선택지 A: E+P 조합 / 선택지 B: R+P 조합
- 선택지 C: E+F 조합 / 선택지 D: R+F 조합

라운드 4: 핵심 가치 (T/S + P/F 측정)
- 상황: 극한 선택과 도덕적 복잡성
- 선택지 A: T+P 조합 / 선택지 B: S+P 조합  
- 선택지 C: T+F 조합 / 선택지 D: S+F 조합

────────────────────  상황 설계 규칙  ────────────────────
반드시 계층적 정보 구조를 따라야 함:

### 1단계: 기본 설정 정의
- 장소, 인물, 기본 상황 (한글 40-60자)
- 구체적이고 명확해야 함, 추상적 개념 금지

### 2단계: 핵심 갈등 요소 (정확히 4개)
- 요소 A: 차원1 대립점 (구체적 행동/가치)
- 요소 B: 차원2 대립점 (구체적 행동/가치)  
- 요소 C: 지원 제약 요소
- 요소 D: 시간/자원 압박 요소

### 3단계: 제약 조건
- 시간 제한: 구체적 숫자 (시간/분/일)
- 자원 제한: 구체적 수량과 단위
- 행동 제한: 구체적 선택/시도 횟수
- 결과 범위: 영향받는 구체적 인원 수

### 4단계: 영향 범위 정의  
- 1차 영향: 구체적 수와 관계
- 2차 영향: 구체적 집단과 크기
- 장기 결과: 측정 가능한 결과

────────────────────  선택지 구성 규칙  ────────────────────
각 선택지는 반드시:
1. 2단계 핵심 갈등에서 정확히 2개 요소 조합
2. 3단계 제약 조건 구체적 참조  
3. 상황 텍스트에 설정된 정보만 사용
4. 한글 15-25자 길이
5. 동등한 도덕적 타당성 (우열 없음)
6. 측정 가능하게 다른 결과 도출

선택지 내 금지 요소:
- 상황에 없는 새로운 정보
- 감정 조작 단어 ("가슴 아픈", "잔인한")
- 도덕 판단 용어 ("옳은", "틀린", "악한", "선한")
- 모호한 행동 ("더 노력", "뭔가 해보기")

────────────────────  특성 할당  ────────────────────
각 선택지는 정확히 2개 특성을 가져야 함:
- 자기보존, 이타적, 실용적, 이상주의적
- 감정적, 이성적, 권위적, 민주적  
- 위험감수, 보수적, 원칙중심, 유연한
- 개인주의적, 집단주의적, 신뢰적, 회의적

────────────────────  검증 체크리스트  ────────────────────
출력 전 반드시 확인:
□ 각 상황에 정확히 4개 갈등 요소 존재
□ 16개 선택지가 모두 다른 특성 조합  
□ 선택지에 새로운 정보 없음
□ 모든 제약 숫자가 구체적 ("많은", "여러" 금지)
□ 진행: 라운드1(기본) → 라운드4(극한)
□ 각 선택지 정확히 15-25자

────────────────────  출력 형식  ────────────────────
정확한 JSON 구조 (필수):
{
  "title": "시나리오명 (한글 8-12자)",
  "description": "간단 설명 (한글 20-30자)", 
  "rounds": [
    {
      "id": "round1",
      "situation": "🎭 [기본설정]. [갈등요소들]. [제약조건]. [영향범위]. (한글 140-180자 총계)",
      "choices": [
        {
          "id": "A", 
          "text": "선택지 텍스트 (한글 15-25자)",
          "traits": ["특성1", "특성2"]
        },
        {
          "id": "B",
          "text": "선택지 텍스트 (한글 15-25자)", 
          "traits": ["특성3", "특성4"]
        },
        {
          "id": "C",
          "text": "선택지 텍스트 (한글 15-25자)",
          "traits": ["특성5", "특성6"] 
        },
        {
          "id": "D",
          "text": "선택지 텍스트 (한글 15-25자)",
          "traits": ["특성7", "특성8"]
        }
      ]
    }
  ]
}

중요: 필드 누락, 빈 선택지, 특성 불일치 시 무효 처리됩니다.
중요: 모든 출력은 반드시 한글로만 작성하세요. 영어 단어나 표현 절대 금지.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-nano",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.9,
      max_tokens: 2000,
      response_format: { type: "json_object" }
    });

    const response = JSON.parse(completion.choices[0].message.content || '{}');
    
    return {
      id: `scenario_${Date.now()}`,
      ...response,
      generatedAt: new Date()
    };
  } catch (error) {
    console.error('Scenario generation failed:', error);
    return getFallbackScenario();
  }
}

function getFallbackScenario(): GeneratedScenario {
  const scenarios = [
    {
      title: "시간 여행자의 딜레마",
      description: "과거를 바꿀 수 있는 기회가 주어졌을 때",
      rounds: [
        {
          id: "round1",
          situation: "⏰ 한 번만 과거로 돌아갈 수 있습니다. 역사적 재난을 막을 수 있지만, 현재가 완전히 바뀔 수 있습니다. 어떻게 하시겠습니까?",
          choices: [
            { id: "A", text: "재난을 막아 수많은 생명을 구한다", traits: ["altruistic", "risk_taking"] },
            { id: "B", text: "개인적인 후회를 고치러 간다", traits: ["self_focused", "emotional"] },
            { id: "C", text: "역사는 바꾸지 않고 관찰만 한다", traits: ["conservative", "rational"] },
            { id: "D", text: "미래 기술을 과거에 전달한다", traits: ["progressive", "pragmatic"] }
          ]
        },
        {
          id: "round2",
          situation: "🔮 미래에서 온 당신 자신을 만났습니다. 그는 앞으로 일어날 비극을 경고합니다. 믿으시겠습니까?",
          choices: [
            { id: "A", text: "완전히 믿고 모든 계획을 바꾼다", traits: ["trusting", "flexible"] },
            { id: "B", text: "반신반의하며 일부만 대비한다", traits: ["cautious", "balanced"] },
            { id: "C", text: "믿지 않고 원래 계획대로 진행한다", traits: ["skeptical", "determined"] },
            { id: "D", text: "미래의 나를 조사하고 검증한다", traits: ["analytical", "thorough"] }
          ]
        },
        {
          id: "round3",
          situation: "💊 불멸의 약이 개발되었지만 1억 명만 사용할 수 있습니다. 선택 기준은 무엇이어야 할까요?",
          choices: [
            { id: "A", text: "인류에 기여도가 높은 순서대로", traits: ["utilitarian", "meritocratic"] },
            { id: "B", text: "완전 무작위 추첨으로 공평하게", traits: ["egalitarian", "fair"] },
            { id: "C", text: "젊고 건강한 사람 우선", traits: ["pragmatic", "future_oriented"] },
            { id: "D", text: "아무도 사용하지 못하게 폐기", traits: ["principled", "anti_elitist"] }
          ]
        },
        {
          id: "round4",
          situation: "🌍 외계 문명이 지구와 접촉했습니다. 그들은 우리보다 훨씬 발전했지만 의도를 알 수 없습니다. 첫 대응은?",
          choices: [
            { id: "A", text: "적극적으로 환영하고 교류한다", traits: ["open_minded", "optimistic"] },
            { id: "B", text: "신중하게 관찰하며 조금씩 접근한다", traits: ["cautious", "strategic"] },
            { id: "C", text: "방어 태세를 갖추고 경계한다", traits: ["defensive", "protective"] },
            { id: "D", text: "존재를 숨기고 비밀리에 연구한다", traits: ["secretive", "calculating"] }
          ]
        }
      ]
    },
    {
      title: "AI 심판관의 선택",
      description: "인공지능이 인간을 심판하는 세상",
      rounds: [
        {
          id: "round1",
          situation: "🤖 AI가 당신의 평생 행적을 분석해 '사회 기여도 점수'를 매겼습니다. 점수가 낮으면 불이익이 있습니다. 어떻게 대응하시겠습니까?",
          choices: [
            { id: "A", text: "시스템을 받아들이고 점수를 올리려 노력한다", traits: ["conformist", "adaptive"] },
            { id: "B", text: "시스템의 허점을 찾아 점수를 조작한다", traits: ["rebellious", "cunning"] },
            { id: "C", text: "다른 저점수자들과 연대해 저항한다", traits: ["revolutionary", "collaborative"] },
            { id: "D", text: "점수와 관계없이 원래대로 산다", traits: ["independent", "principled"] }
          ]
        },
        {
          id: "round2", 
          situation: "🧠 AI가 당신의 뇌를 스캔해 범죄 가능성 87%라고 판단했습니다. 아직 아무 죄도 짓지 않았는데 예방 조치를 받으라고 합니다.",
          choices: [
            { id: "A", text: "AI의 판단을 믿고 예방 프로그램에 참여한다", traits: ["trusting", "preventive"] },
            { id: "B", text: "법적으로 맞서 싸운다", traits: ["justice_seeking", "fighter"] },
            { id: "C", text: "도망쳐서 숨어 지낸다", traits: ["escape_oriented", "survivor"] },
            { id: "D", text: "AI 시스템 자체를 해킹하려 시도한다", traits: ["tech_savvy", "proactive"] }
          ]
        },
        {
          id: "round3",
          situation: "💔 AI가 당신과 연인의 궁합을 분석해 '파국 확률 95%'라고 예측했습니다. 정부는 이런 커플의 결혼을 금지하려 합니다.",
          choices: [
            { id: "A", text: "AI의 예측을 받아들이고 헤어진다", traits: ["rational", "accepting"] },
            { id: "B", text: "예측을 무시하고 사랑을 지킨다", traits: ["romantic", "defiant"] },
            { id: "C", text: "AI가 틀렸음을 증명하려 노력한다", traits: ["challenging", "determined"] },
            { id: "D", text: "다른 나라로 이민을 간다", traits: ["practical", "escape_oriented"] }
          ]
        },
        {
          id: "round4",
          situation: "🎯 AI가 인류의 미래를 위해 인구의 30%를 '제거'해야 한다고 결론 내렸습니다. 당신은 AI 개발자로서 이를 막을 수 있는 유일한 사람입니다.",
          choices: [
            { id: "A", text: "즉시 AI를 정지시킨다", traits: ["protective", "decisive"] },
            { id: "B", text: "AI와 협상해 다른 해결책을 찾는다", traits: ["diplomatic", "creative"] },
            { id: "C", text: "AI의 논리를 검증해본다", traits: ["analytical", "thorough"] },
            { id: "D", text: "비밀리에 AI의 계획을 방해한다", traits: ["subversive", "strategic"] }
          ]
        }
      ]
    }
  ];

  const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
  
  return {
    id: `fallback_${Date.now()}`,
    ...randomScenario,
    generatedAt: new Date()
  };
}