'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { GameSession, Analysis, AreaRecommendation } from '@/types/game';
import { GeneratedScenario, generateNewScenario } from '@/lib/scenario-generator';

interface GameContextType {
  session: GameSession | null;
  analyses: Analysis[];
  recommendations: AreaRecommendation[];
  currentScenario: GeneratedScenario | null;
  isGeneratingScenario: boolean;
  startGame: (nickname?: string) => void;
  makeChoice: (choiceId: string) => void;
  answerAdditionalQuestion: (answerId: string) => void;
  completeGame: () => void;
  setAnalysis: (analysis: Analysis) => void;
  setRecommendations: (recommendations: AreaRecommendation[]) => void;
  reset: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<GameSession | null>(null);
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [recommendations, setRecommendations] = useState<AreaRecommendation[]>([]);
  const [choiceStartTime, setChoiceStartTime] = useState<number>(Date.now());
  const [currentScenario, setCurrentScenario] = useState<GeneratedScenario | null>(null);
  const [isGeneratingScenario, setIsGeneratingScenario] = useState(false);

  // 컴포넌트 마운트 시 시나리오 생성
  useEffect(() => {
    const initScenario = async () => {
      setIsGeneratingScenario(true);
      try {
        const scenario = await generateNewScenario();
        setCurrentScenario(scenario);
      } catch (error) {
        console.error('Failed to generate scenario:', error);
      } finally {
        setIsGeneratingScenario(false);
      }
    };

    initScenario();
  }, []);

  const startGame = useCallback((nickname?: string) => {
    if (!currentScenario) return;
    
    const newSession: GameSession = {
      id: `session_${Date.now()}`,
      nickname,
      scenarioId: currentScenario.id,
      currentRound: 0,
      choices: [],
      additionalAnswers: [],
      choiceTimings: [],
      hesitationCounts: [],
      startedAt: new Date(),
      status: 'in_progress'
    };
    setSession(newSession);
    setChoiceStartTime(Date.now());
  }, [currentScenario]);

  const makeChoice = useCallback((choiceId: string) => {
    if (!session) return;

    const choiceTime = Date.now() - choiceStartTime;
    
    setSession(prev => {
      if (!prev) return null;
      
      const newSession = {
        ...prev,
        choices: [...prev.choices, choiceId],
        choiceTimings: [...prev.choiceTimings, choiceTime],
        currentRound: prev.currentRound + 1
      };

      // 4라운드 완료 후 추가 질문으로
      if (newSession.currentRound >= 4) {
        newSession.status = 'in_progress';
      }

      return newSession;
    });

    setChoiceStartTime(Date.now());
  }, [session, choiceStartTime]);

  const answerAdditionalQuestion = useCallback((answerId: string) => {
    if (!session) return;

    setSession(prev => {
      if (!prev) return null;
      
      const newAnswers = [...prev.additionalAnswers, answerId];
      
      return {
        ...prev,
        additionalAnswers: newAnswers,
        status: newAnswers.length >= 4 ? 'analyzing' : 'in_progress'
      };
    });
  }, [session]);

  const completeGame = useCallback(() => {
    if (!session) return;

    setSession(prev => {
      if (!prev) return null;
      
      return {
        ...prev,
        completedAt: new Date(),
        status: 'completed'
      };
    });
  }, [session]);

  const setAnalysis = useCallback((analysis: Analysis) => {
    setAnalyses(prev => [...prev, analysis]);
  }, []);

  const reset = useCallback(async () => {
    setSession(null);
    setAnalyses([]);
    setRecommendations([]);
    
    // 새로운 시나리오 생성
    setIsGeneratingScenario(true);
    try {
      const scenario = await generateNewScenario();
      setCurrentScenario(scenario);
    } catch (error) {
      console.error('Failed to generate scenario:', error);
    } finally {
      setIsGeneratingScenario(false);
    }
  }, []);

  const value = {
    session,
    analyses,
    recommendations,
    currentScenario,
    isGeneratingScenario,
    startGame,
    makeChoice,
    answerAdditionalQuestion,
    completeGame,
    setAnalysis,
    setRecommendations,
    reset
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}