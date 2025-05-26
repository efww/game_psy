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
  // 임시로 fallback 사용 (추후 API 라우트 추가 예정)
  console.warn('Using fallback scenario - API route not implemented yet');
  return getFallbackScenario();
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