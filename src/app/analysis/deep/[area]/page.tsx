'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGame } from '@/lib/gameContext';
import { generateAreaDilemmas, generateDeepAnalysis } from '@/lib/openai';
import DeepDiveFlow from '@/components/analysis/DeepDiveFlow';
import LoadingAnalysis from '@/components/analysis/LoadingAnalysis';

interface PageProps {
  params: {
    area: string;
  };
}

export default function DeepAnalysisPage({ params }: PageProps) {
  const router = useRouter();
  const { session, analyses } = useGame();
  const [dilemmas, setDilemmas] = useState<any[]>([]);
  const [currentDilemmaIndex, setCurrentDilemmaIndex] = useState(0);
  const [areaChoices, setAreaChoices] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deepAnalysis, setDeepAnalysis] = useState<string | null>(null);

  useEffect(() => {
    if (!session || !analyses.length) {
      router.push('/');
      return;
    }

    const loadDilemmas = async () => {
      try {
        const generatedDilemmas = await generateAreaDilemmas(params.area, session);
        setDilemmas(generatedDilemmas);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to generate dilemmas:', error);
        router.push('/analysis');
      }
    };

    loadDilemmas();
  }, [params.area, session, analyses, router]);

  const handleChoice = async (choiceId: string) => {
    const newChoices = [...areaChoices, choiceId];
    setAreaChoices(newChoices);

    if (currentDilemmaIndex < dilemmas.length - 1) {
      setCurrentDilemmaIndex(currentDilemmaIndex + 1);
    } else {
      // 모든 딜레마 완료 - 심화 분석 생성
      if (!session) {
        router.push('/');
        return;
      }
      
      setIsLoading(true);
      const basicAnalysis = analyses.find(a => a.type === 'basic')?.content || '';
      const analysis = await generateDeepAnalysis(params.area, newChoices, basicAnalysis, session);
      setDeepAnalysis(analysis);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingAnalysis />;
  }

  if (deepAnalysis) {
    return (
      <div className="max-w-2xl mx-auto p-4 py-8">
        <DeepAnalysisResult 
          area={params.area} 
          analysis={deepAnalysis} 
        />
      </div>
    );
  }

  return (
    <DeepDiveFlow
      area={params.area}
      dilemma={dilemmas[currentDilemmaIndex]}
      currentIndex={currentDilemmaIndex}
      totalDilemmas={dilemmas.length}
      onChoice={handleChoice}
    />
  );
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import questions from '@/data/questions.json';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';

function DeepAnalysisResult({ area, analysis }: { area: string; analysis: string }) {
  const router = useRouter();
  const { reset } = useGame();
  
  const areaInfo = questions.deepDiveAreas.find(a => a.id === area);

  const handleRestart = () => {
    reset();
    router.push('/');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            {areaInfo?.title} 분석 결과
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MarkdownRenderer 
            content={analysis}
            className="text-lg leading-relaxed"
          />
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button 
          onClick={() => router.push('/analysis')}
          variant="outline"
          className="flex-1"
        >
          다른 분야 보기
        </Button>
        <Button 
          onClick={handleRestart}
          className="flex-1"
        >
          처음부터 다시
        </Button>
      </div>
    </div>
  );
}