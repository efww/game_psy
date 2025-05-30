import { GameSession, AreaRecommendation } from '@/types/game';
import {
  getMoralFoundationMapping,
  getSocialPriorityMapping,
  getDecisionStyleMapping,
  getCoreValuesMapping,
  calculateICDimension,
  calculateERDimension,
  calculateTSDimension,
  calculatePFDimension,
  predictConflictStyle,
  predictDecisionProcess,
  predictStressResponse,
  predictLeadershipStyle,
  getICInterpretation,
  getERInterpretation,
  getTSInterpretation,
  getPFInterpretation,
  getMoralDimensionAnalysis,
  getSocialDimensionAnalysis,
  getDecisionDimensionAnalysis,
  getValueDimensionAnalysis,
  getBaseDimension,
  getDomainDimension
} from '@/lib/dimension-analyzer';

export async function generateBasicAnalysis(session: GameSession): Promise<string> {
  // 임시로 완전 fallback 모드 (Vercel 배포 문제 해결 중)
  console.warn('Using fallback analysis - API route debugging in progress');
  return getFallbackAnalysis(session.choices);
  
  /* API 호출 코드 (임시 비활성화)
  try {
    const response = await fetch('/api/analysis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(session),
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    return data.analysis;
  } catch (error) {
    console.error('Analysis API Error:', error);
    return getFallbackAnalysis(session.choices);
  }
  */
}

export async function generateAreaRecommendations(
  session: GameSession, 
  basicAnalysis: string
): Promise<AreaRecommendation[]> {
  // 임시로 fallback 사용 (추후 API 라우트 추가 예정)
  console.warn('Using fallback recommendations - API route not implemented yet');
  return getFallbackRecommendations(session.choices);
}

export async function generateAreaDilemmas(
  area: string,
  session: GameSession
): Promise<any> {
  // 임시로 fallback 사용 (추후 API 라우트 추가 예정)
  console.warn('Using fallback dilemmas - API route not implemented yet');
  return getFallbackDilemmas(area);
}

export async function generateDeepAnalysis(
  area: string,
  areaChoices: string[],
  basicAnalysis: string,
  session: GameSession
): Promise<string> {
  // 임시로 fallback 사용 (추후 API 라우트 추가 예정)
  console.warn('Using fallback deep analysis - API route not implemented yet');
  return getFallbackDeepAnalysis(area, areaChoices);
}

// Fallback 함수들
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

function getFallbackRecommendations(choices: string[]): AreaRecommendation[] {
  return [
    {
      area: "stress",
      reason: "압박 상황에서 평소와 다른 반응 패턴이 나타날 가능성",
      hook: "스트레스받으면 완전 다른 사람이 될까?"
    },
    {
      area: "love", 
      reason: "친밀관계에서 숨겨진 애착 스타일이 드러날 수 있음",
      hook: "연애할 때는 어떤 모습일까?"
    },
    {
      area: "work",
      reason: "조직 환경에서 리더십과 협업 능력이 발현되는 방식", 
      hook: "직장에서는 어떤 역할을 맡게 될까?"
    }
  ];
}

function getFallbackDilemmas(area: string): any {
  const dilemmas: Record<string, any> = {
    love: {
      dilemmas: [
        {
          situation: "🏗️ 연인이 절친과 자주 연락. 둘은 그냥 친구라고 함. 3개월째 지속. 어떻게 대응?",
          choices: [
            { id: "A", text: "믿고 아무 말 하지 않는다" },
            { id: "B", text: "솔직하게 불편함을 표현한다" },
            { id: "C", text: "은근히 확인하려고 한다" },
            { id: "D", text: "셋이서 자주 만나자고 제안한다" }
          ]
        },
        {
          situation: "🎯 기념일에 연인이 중요한 약속 잊음. 사과하지만 이미 상처. 2년째 연애 중. 반응은?",
          choices: [
            { id: "A", text: "화내지만 금방 풀어준다" },
            { id: "B", text: "서운함을 차분히 설명한다" },
            { id: "C", text: "괜찮다고 하지만 속으로 삭인다" },
            { id: "D", text: "시간을 두고 생각해본다" }
          ]
        }
      ]
    },
    work: {
      dilemmas: [
        {
          situation: "🏗️ 팀 회의에서 동료가 내 아이디어를 자기 것처럼 발표. 상사는 칭찬 중. 즉시 대응?",
          choices: [
            { id: "A", text: "바로 정정하고 내 것임을 밝힌다" },
            { id: "B", text: "나중에 개인적으로 이야기한다" },
            { id: "C", text: "그냥 넘어가고 다음엔 조심한다" },
            { id: "D", text: "상사에게 따로 보고한다" }
          ]
        },
        {
          situation: "🎯 승진 기회. 친한 동료도 지원. 실력은 비슷. 1자리만 있음. 어떻게 경쟁?",
          choices: [
            { id: "A", text: "정정당당히 최선을 다한다" },
            { id: "B", text: "동료와 상의해서 결정한다" },
            { id: "C", text: "내 장점을 적극 어필한다" },
            { id: "D", text: "동료 배려해 포기 고민한다" }
          ]
        }
      ]
    },
    friend: {
      dilemmas: [
        {
          situation: "🏗️ 친구 그룹에서 한 명을 뒷담화. 당신만 불참. 다음 모임 때 분위기 이상. 대처는?",
          choices: [
            { id: "A", text: "직접 물어보고 해결한다" },
            { id: "B", text: "자연스럽게 행동하며 관찰한다" },
            { id: "C", text: "뒷담화 당사자에게 알린다" },
            { id: "D", text: "거리를 두고 상황 정리한다" }
          ]
        },
        {
          situation: "🎯 절친이 큰 돈 빌려달라 요청. 갚을 능력 의문. 10년 우정. 거절 방법은?",
          choices: [
            { id: "A", text: "솔직히 어렵다고 거절한다" },
            { id: "B", text: "일부만 빌려주고 타협한다" },
            { id: "C", text: "다른 방법 함께 찾아본다" },
            { id: "D", text: "일단 빌려주고 나중에 생각한다" }
          ]
        }
      ]
    },
    money: {
      dilemmas: [
        {
          situation: "🏗️ 월급의 30% 여유. 친구들은 투자 권유. 부모님은 저축 권유. 첫 직장 6개월차. 선택은?",
          choices: [
            { id: "A", text: "안전하게 전액 저축한다" },
            { id: "B", text: "반은 저축, 반은 투자한다" },
            { id: "C", text: "공부 후 신중히 투자한다" },
            { id: "D", text: "소액으로 투자 경험쌓기" }
          ]
        },
        {
          situation: "🎯 동료들과 회식. 비싼 곳 제안. 이번 달 빠듯. 팀 분위기 중요. 어떻게 참여?",
          choices: [
            { id: "A", text: "솔직히 부담된다고 말한다" },
            { id: "B", text: "이번만 참여하고 조절한다" },
            { id: "C", text: "대안 장소를 제안한다" },
            { id: "D", text: "핑계 대고 불참한다" }
          ]
        }
      ]
    },
    family: {
      dilemmas: [
        {
          situation: "🏗️ 부모님이 결혼 압박. 아직 준비 안됨. 명절마다 반복. 이번엔 선 자리 주선. 대응은?",
          choices: [
            { id: "A", text: "단호하게 거절 의사 밝힌다" },
            { id: "B", text: "일단 만나고 나중에 거절한다" },
            { id: "C", text: "내 계획을 차근히 설명한다" },
            { id: "D", text: "형제에게 도움 요청한다" }
          ]
        },
        {
          situation: "🎯 형제가 부모님 용돈 분담 제안. 수입 차이 큼. 균등 분담 요구. 어떻게 조정?",
          choices: [
            { id: "A", text: "수입 비례로 재협상한다" },
            { id: "B", text: "균등 분담 수용한다" },
            { id: "C", text: "다른 방식으로 기여 제안한다" },
            { id: "D", text: "부모님 의견 먼저 듣는다" }
          ]
        }
      ]
    },
    stress: {
      dilemmas: [
        {
          situation: "🏗️ 중요 발표 하루 전. 준비 부족 자각. 밤샘 vs 수면. 실수 불안감 최고조. 선택은?",
          choices: [
            { id: "A", text: "밤새 완벽히 준비한다" },
            { id: "B", text: "핵심만 정리하고 잔다" },
            { id: "C", text: "동료에게 도움 요청한다" },
            { id: "D", text: "연기 가능성 타진한다" }
          ]
        },
        {
          situation: "🎯 업무 과부하로 번아웃 직전. 상사는 더 요구. 건강 적신호. 어떻게 대처?",
          choices: [
            { id: "A", text: "상사와 솔직히 상담한다" },
            { id: "B", text: "조금 더 버텨본다" },
            { id: "C", text: "업무 우선순위 재조정한다" },
            { id: "D", text: "휴가나 병가를 신청한다" }
          ]
        }
      ]
    },
    moral: {
      dilemmas: [
        {
          situation: "🏗️ 회사 비리 목격. 고발 시 회사 타격. 침묵 시 양심 불편. 가족 생계 걸림. 선택은?",
          choices: [
            { id: "A", text: "즉시 관계기관에 신고한다" },
            { id: "B", text: "내부적으로 먼저 해결 시도한다" },
            { id: "C", text: "증거 수집 후 신중히 결정한다" },
            { id: "D", text: "다른 직장 찾고 나서 신고한다" }
          ]
        },
        {
          situation: "🎯 친구가 시험 컨닝 부탁. 거절 시 관계 위험. 수락 시 원칙 위배. 어떻게 대응?",
          choices: [
            { id: "A", text: "단호히 거절하고 설득한다" },
            { id: "B", text: "도움 주되 다시는 안한다고 한다" },
            { id: "C", text: "공부 도와주겠다고 대안 제시한다" },
            { id: "D", text: "못 본 척하고 거리 둔다" }
          ]
        }
      ]
    },
    future: {
      dilemmas: [
        {
          situation: "🏗️ 안정적 직장 vs 창업 기회. 5년 근무. 창업 아이템 확신. 가족 부양 책임. 결정은?",
          choices: [
            { id: "A", text: "과감히 창업에 도전한다" },
            { id: "B", text: "직장 다니며 준비한다" },
            { id: "C", text: "안정적 직장 선택한다" },
            { id: "D", text: "1년 더 검토 후 결정한다" }
          ]
        },
        {
          situation: "🎯 해외 이민 기회. 가족 반대. 커리어엔 유리. 3개월 내 결정 필요. 선택은?",
          choices: [
            { id: "A", text: "가족 설득하며 추진한다" },
            { id: "B", text: "가족 의견 따라 포기한다" },
            { id: "C", text: "단기 파견으로 타협한다" },
            { id: "D", text: "혼자라도 도전한다" }
          ]
        }
      ]
    }
  };
  
  return dilemmas[area] || dilemmas.love;
}

function getFallbackDeepAnalysis(area: string, choices: string[]): string {
  const templates: Record<string, string> = {
    love: `## **연애할 때는 숨겨진 로맨티스트** 💕

### 숨겨진 모습들
- **${choices.includes('A') ? '믿음의 힘' : '소통의 달인'}**: 연애에서는 ${choices.includes('A') ? '한번 믿으면 끝까지 믿어주는 든든한 타입' : '끊임없이 대화하며 마음을 나누려는 스타일'}이야
- **${choices.includes('B') ? '솔직 파이터' : '배려 마스터'}**: 관계에서 ${choices.includes('B') ? '있는 그대로 표현하는 직진형' : '상대방 기분을 먼저 챙기는 세심함'}이 돋보여
- **감정 표현**: ${choices.includes('C') ? '신중하게 마음을 여는 조심형' : '적극적으로 애정을 보여주는 표현형'}

### 실제 모습  
- **갈등 상황**: ${choices.includes('A') ? '차분히 대화로 풀어가려 노력해' : '감정이 앞서도 결국 화해를 추구해'}
- **기념일**: ${choices.includes('D') ? '세심하게 준비해서 깜짝 놀라게 해주는 편' : '자연스럽고 편안한 분위기를 선호해'}

### 특별한 점
연애할 때는 평소보다 **${choices.includes('C') ? '훨씬 신중하고 조심스러워지는' : '의외로 대담하고 적극적이 되는'}** 모습을 보여`,
    
    work: `## **직장에서는 전략적 플레이어** 💼

### 숨겨진 모습들  
- **${choices.includes('A') ? '당당한 어필러' : '뒤에서 준비하는 전략가'}**: 업무에서는 ${choices.includes('A') ? '자신의 성과를 확실히 어필하는 당당함' : '치밀하게 계획하고 준비하는 신중함'}을 보여줘
- **팀워크**: ${choices.includes('B') ? '개인 플레이보다 팀 성과를 중시하는' : '혼자서도 척척 해내는 독립적인'} 스타일
- **문제 해결**: ${choices.includes('C') ? '혼자 고민하며 해답을 찾는' : '동료들과 머리 맞대고 풀어가는'} 방식 선호

### 실제 모습
- **회의 시간**: ${choices.includes('A') ? '적극적으로 의견 개진하며 존재감 드러내기' : '침묵하다가 핵심만 짚어서 말하기'}  
- **승진 경쟁**: ${choices.includes('D') ? '동료 관계를 해치지 않는 선에서 경쟁하기' : '정정당당하게 실력으로 승부하기'}

### 특별한 점
직장에서는 평소보다 **${choices.includes('D') ? '관계를 중시하는 협력적인' : '성과를 중시하는 경쟁적인'}** 면이 강해져`
  };
  
  return templates[area] || templates.love;
}