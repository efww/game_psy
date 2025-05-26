export interface Choice {
  id: string;
  text: string;
  traits?: string[];
  weight?: Record<string, number>;
}

export interface Round {
  id: string;
  situation: string;
  choices: Choice[];
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  rounds: Round[];
}

export interface AdditionalQuestion {
  id: string;
  question: string;
  choices: Choice[];
}

export interface DeepDiveArea {
  id: string;
  title: string;
  icon: string;
  description: string;
}

export interface GameSession {
  id: string;
  nickname?: string;
  scenarioId: string;
  currentRound: number;
  choices: string[];
  additionalAnswers: string[];
  choiceTimings: number[];
  hesitationCounts: number[];
  startedAt: Date;
  completedAt?: Date;
  status: 'in_progress' | 'completed' | 'analyzing';
}

export interface Analysis {
  sessionId: string;
  type: 'basic' | 'recommendation' | 'deep_dive';
  area?: string;
  content: string;
  source: 'llm' | 'fallback';
  createdAt: Date;
}

export interface AreaRecommendation {
  area: string;
  reason: string;
  hook: string;
}

export interface PersonalityProfile {
  catchphrase: string;
  traits: string[];
  realWorldExamples: string[];
  summary: string;
  emotionalPattern?: string;
  decisionStyle?: string;
  moralFlexibility?: string;
}