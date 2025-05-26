'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useGame } from '@/lib/gameContext';
import questions from '@/data/questions.json';

export default function GameFlow() {
  const router = useRouter();
  const { 
    session, 
    currentScenario,
    makeChoice, 
    answerAdditionalQuestion,
    completeGame 
  } = useGame();
  
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === 'analyzing') {
      completeGame();
      router.push('/analysis');
    }
  }, [session?.status, completeGame, router]);

  if (!session || !currentScenario) return null;

  const isAdditionalPhase = session.currentRound >= 4;
  const additionalQuestionIndex = session.additionalAnswers.length;

  const totalSteps = 8; // 4 rounds + 4 additional questions
  const currentStep = session.currentRound + session.additionalAnswers.length;
  const progress = (currentStep / totalSteps) * 100;

  const handleChoice = async (choiceId: string) => {
    setIsLoading(true);
    
    if (isAdditionalPhase) {
      answerAdditionalQuestion(choiceId);
    } else {
      makeChoice(choiceId);
    }
    
    setIsLoading(false);
  };

  const renderContent = () => {
    if (!isAdditionalPhase && session.currentRound < currentScenario.rounds.length) {
      const currentRound = currentScenario.rounds[session.currentRound];
      
      return (
        <>
          <CardHeader>
            <CardTitle className="text-xl">
              라운드 {session.currentRound + 1} / 4
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-lg leading-relaxed">
              {currentRound.situation}
            </div>
            
            <div className="space-y-3">
              {currentRound.choices.map((choice) => (
                <Button
                  key={choice.id}
                  variant="outline"
                  className="w-full text-left justify-start p-4 h-auto"
                  onClick={() => handleChoice(choice.id)}
                  disabled={isLoading}
                >
                  <span className="mr-3 font-bold">{choice.id}.</span>
                  <span className="flex-1">{choice.text}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </>
      );
    }

    if (isAdditionalPhase && additionalQuestionIndex < questions.additionalQuestions.length) {
      const currentQuestion = questions.additionalQuestions[additionalQuestionIndex];
      
      return (
        <>
          <CardHeader>
            <CardTitle className="text-xl">
              추가 질문 {additionalQuestionIndex + 1} / 4
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-lg leading-relaxed">
              {currentQuestion.question}
            </div>
            
            <div className="space-y-3">
              {currentQuestion.choices.map((choice) => (
                <Button
                  key={choice.id}
                  variant="outline"
                  className="w-full text-left justify-start p-4 h-auto"
                  onClick={() => handleChoice(choice.id)}
                  disabled={isLoading}
                >
                  <span className="flex-1">{choice.text}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </>
      );
    }

    return null;
  };

  return (
    <div className="max-w-2xl mx-auto p-4 py-8">
      <div className="mb-6">
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-muted-foreground mt-2">
          {currentStep} / {totalSteps} 완료
        </p>
      </div>
      
      <Card>
        {renderContent()}
      </Card>
    </div>
  );
}