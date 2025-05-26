'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGame } from '@/lib/gameContext';
import { generateBasicAnalysis, generateAreaRecommendations } from '@/lib/openai';
import AnalysisResult from '@/components/analysis/AnalysisResult';
import LoadingAnalysis from '@/components/analysis/LoadingAnalysis';
import { Button } from '@/components/ui/button';

export default function AnalysisPage() {
  const router = useRouter();
  const { session, setAnalysis, setRecommendations } = useGame();
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysisContent, setAnalysisContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session || session.status !== 'completed') {
      router.push('/');
      return;
    }

    const performAnalysis = async () => {
      try {
        setIsAnalyzing(true);
        
        // 기본 분석 생성
        const basicAnalysis = await generateBasicAnalysis(session);
        setAnalysisContent(basicAnalysis);
        
        setAnalysis({
          sessionId: session.id,
          type: 'basic',
          content: basicAnalysis,
          source: basicAnalysis.includes('**') ? 'llm' : 'fallback',
          createdAt: new Date()
        });

        // 추천 분야 생성
        const recommendations = await generateAreaRecommendations(session, basicAnalysis);
        setRecommendations(recommendations);
        
        setIsAnalyzing(false);
      } catch (error) {
        console.error('Analysis error:', error);
        setError('분석 중 오류가 발생했습니다. 다시 시도해주세요.');
        setIsAnalyzing(false);
      }
    };

    performAnalysis();
  }, [session, router, setAnalysis, setRecommendations]);

  if (!session) {
    return null;
  }

  if (isAnalyzing) {
    return <LoadingAnalysis />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => router.push('/')}>
            처음으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  return <AnalysisResult analysis={analysisContent} />;
}