// Dimension analysis helper functions

export function getMoralFoundationMapping(choice: string): string {
  const mappings: Record<string, string> = {
    'A': 'Individual+Emotional (자기중심적 감정 우선)',
    'B': 'Collective+Emotional (집단중심적 감정 우선)',
    'C': 'Individual+Rational (자기중심적 논리 우선)',
    'D': 'Collective+Rational (집단중심적 논리 우선)'
  };
  return mappings[choice] || 'Unknown';
}

export function getSocialPriorityMapping(choice: string): string {
  const mappings: Record<string, string> = {
    'A': 'Individual+Risk-taking (개인주의적 도전)',
    'B': 'Collective+Risk-taking (집단주의적 도전)',
    'C': 'Individual+Safety (개인주의적 안정)',
    'D': 'Collective+Safety (집단주의적 안정)'
  };
  return mappings[choice] || 'Unknown';
}

export function getDecisionStyleMapping(choice: string): string {
  const mappings: Record<string, string> = {
    'A': 'Emotional+Principle (감정적 원칙주의)',
    'B': 'Rational+Principle (논리적 원칙주의)',
    'C': 'Emotional+Flexible (감정적 유연성)',
    'D': 'Rational+Flexible (논리적 유연성)'
  };
  return mappings[choice] || 'Unknown';
}

export function getCoreValuesMapping(choice: string): string {
  const mappings: Record<string, string> = {
    'A': 'Risk+Principle (도전적 원칙주의)',
    'B': 'Safety+Principle (안정적 원칙주의)',
    'C': 'Risk+Flexible (도전적 유연성)',
    'D': 'Safety+Flexible (안정적 유연성)'
  };
  return mappings[choice] || 'Unknown';
}

export function calculateICDimension(choices: string[]): number {
  let score = 50; // Start neutral
  
  // Round 1 & 2 strongly influence I/C
  if (choices[0] === 'A' || choices[0] === 'C') score += 20;
  else score -= 20;
  
  if (choices[1] === 'A' || choices[1] === 'C') score += 15;
  else score -= 15;
  
  return Math.max(0, Math.min(100, score));
}

export function calculateERDimension(choices: string[]): number {
  let score = 50;
  
  // Round 1 & 3 strongly influence E/R
  if (choices[0] === 'A' || choices[0] === 'B') score += 20;
  else score -= 20;
  
  if (choices[2] === 'A' || choices[2] === 'C') score += 15;
  else score -= 15;
  
  return Math.max(0, Math.min(100, score));
}

export function calculateTSDimension(choices: string[]): number {
  let score = 50;
  
  // Round 2 & 4 strongly influence T/S
  if (choices[1] === 'A' || choices[1] === 'B') score += 20;
  else score -= 20;
  
  if (choices[3] === 'A' || choices[3] === 'C') score += 15;
  else score -= 15;
  
  return Math.max(0, Math.min(100, score));
}

export function calculatePFDimension(choices: string[]): number {
  let score = 50;
  
  // Round 3 & 4 strongly influence P/F
  if (choices[2] === 'A' || choices[2] === 'B') score += 20;
  else score -= 20;
  
  if (choices[3] === 'A' || choices[3] === 'B') score += 15;
  else score -= 15;
  
  return Math.max(0, Math.min(100, score));
}

export function predictConflictStyle(choices: string[]): string {
  const ic = calculateICDimension(choices);
  const er = calculateERDimension(choices);
  
  if (ic > 60 && er > 60) return 'Direct confrontation (직접 대면)';
  if (ic > 60 && er < 40) return 'Strategic negotiation (전략적 협상)';
  if (ic < 40 && er > 60) return 'Emotional mediation (감정적 중재)';
  return 'Consensus seeking (합의 추구)';
}

export function predictDecisionProcess(choices: string[]): string {
  const er = calculateERDimension(choices);
  const pf = calculatePFDimension(choices);
  
  if (er > 60 && pf > 60) return 'Intuitive principled (직관적 원칙)';
  if (er < 40 && pf > 60) return 'Analytical systematic (분석적 체계)';
  if (er > 60 && pf < 40) return 'Emotional adaptive (감정적 적응)';
  return 'Rational flexible (합리적 유연)';
}

export function predictStressResponse(choices: string[]): string {
  const ts = calculateTSDimension(choices);
  const ic = calculateICDimension(choices);
  
  if (ts > 60 && ic > 60) return 'Fight response (맞서기)';
  if (ts < 40 && ic > 60) return 'Strategic withdrawal (전략적 회피)';
  if (ts > 60 && ic < 40) return 'Social mobilization (사회적 동원)';
  return 'Support seeking (지원 추구)';
}

export function predictLeadershipStyle(choices: string[]): string {
  const ic = calculateICDimension(choices);
  const er = calculateERDimension(choices);
  const ts = calculateTSDimension(choices);
  const pf = calculatePFDimension(choices);
  
  const avgScore = (ic + er + ts + pf) / 4;
  
  if (ic > 70 && pf > 60) return 'Directive (지시적)';
  if (ic < 30 && er > 60) return 'Servant (섬김형)';
  if (ts > 70 && er < 40) return 'Transformational (변혁적)';
  return 'Participative (참여적)';
}

export function getICInterpretation(choices: string[]): string {
  const score = calculateICDimension(choices);
  if (score > 70) return 'Highly individualistic';
  if (score > 55) return 'Moderately individualistic';
  if (score > 45) return 'Balanced';
  if (score > 30) return 'Moderately collectivistic';
  return 'Highly collectivistic';
}

export function getERInterpretation(choices: string[]): string {
  const score = calculateERDimension(choices);
  if (score > 70) return 'Highly emotional';
  if (score > 55) return 'Moderately emotional';
  if (score > 45) return 'Balanced';
  if (score > 30) return 'Moderately rational';
  return 'Highly rational';
}

export function getTSInterpretation(choices: string[]): string {
  const score = calculateTSDimension(choices);
  if (score > 70) return 'Highly risk-taking';
  if (score > 55) return 'Moderately risk-taking';
  if (score > 45) return 'Balanced';
  if (score > 30) return 'Moderately safety-seeking';
  return 'Highly safety-seeking';
}

export function getPFInterpretation(choices: string[]): string {
  const score = calculatePFDimension(choices);
  if (score > 70) return 'Highly principle-based';
  if (score > 55) return 'Moderately principle-based';
  if (score > 45) return 'Balanced';
  if (score > 30) return 'Moderately situational';
  return 'Highly situational';
}

// Domain-specific analysis functions
export function getMoralDimensionAnalysis(choice: string): string {
  const analyses: Record<string, string> = {
    'A': 'Self-interest with emotional justification',
    'B': 'Group welfare with emotional concern',
    'C': 'Self-interest with logical reasoning',
    'D': 'Group welfare with logical reasoning'
  };
  return analyses[choice] || 'Unknown pattern';
}

export function getSocialDimensionAnalysis(choice: string): string {
  const analyses: Record<string, string> = {
    'A': 'Independent risk-taking behavior',
    'B': 'Collaborative risk-taking behavior',
    'C': 'Independent safety-seeking behavior',
    'D': 'Collaborative safety-seeking behavior'
  };
  return analyses[choice] || 'Unknown pattern';
}

export function getDecisionDimensionAnalysis(choice: string): string {
  const analyses: Record<string, string> = {
    'A': 'Emotion-driven principled stance',
    'B': 'Logic-driven principled stance',
    'C': 'Emotion-driven flexible approach',
    'D': 'Logic-driven flexible approach'
  };
  return analyses[choice] || 'Unknown pattern';
}

export function getValueDimensionAnalysis(choice: string): string {
  const analyses: Record<string, string> = {
    'A': 'Risk-embracing with strong principles',
    'B': 'Safety-seeking with strong principles',
    'C': 'Risk-embracing with situational ethics',
    'D': 'Safety-seeking with situational ethics'
  };
  return analyses[choice] || 'Unknown pattern';
}

// Area-specific dimension functions
export function getBaseDimension(dimension: string, choices: string[]): string {
  switch(dimension) {
    case 'IC': return `${calculateICDimension(choices)}% individualistic`;
    case 'ER': return `${calculateERDimension(choices)}% emotional`;
    case 'TS': return `${calculateTSDimension(choices)}% risk-taking`;
    case 'PF': return `${calculatePFDimension(choices)}% principle-based`;
    default: return 'Unknown';
  }
}

export function getDomainDimension(dimension: string, area: string, areaChoices: string[]): string {
  // Simplified domain-specific calculation
  // In real implementation, this would be more sophisticated
  const baseModifier = area === 'love' || area === 'family' ? -10 : 
                       area === 'work' || area === 'money' ? 10 : 0;
  
  const choiceModifier = areaChoices.includes('A') ? 10 : 
                         areaChoices.includes('D') ? -10 : 0;
  
  let score = 50 + baseModifier + choiceModifier;
  score = Math.max(0, Math.min(100, score));
  
  switch(dimension) {
    case 'IC': return `${score}% individualistic in ${area}`;
    case 'ER': return `${score}% emotional in ${area}`;
    case 'TS': return `${score}% risk-taking in ${area}`;
    case 'PF': return `${score}% principle-based in ${area}`;
    default: return 'Unknown';
  }
}