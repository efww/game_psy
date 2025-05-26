'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGame } from '@/lib/gameContext';

export default function Home() {
  const [nickname, setNickname] = useState('');
  const router = useRouter();
  const { startGame, isGeneratingScenario, currentScenario } = useGame();

  const handleStart = () => {
    if (!isGeneratingScenario && currentScenario) {
      startGame(nickname);
      router.push('/game');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            극한선택: 숨겨진 나 발견하기
          </CardTitle>
          <CardDescription className="text-center text-lg mt-2">
            극한 상황 딜레마를 통해 당신의 진짜 성격을 발견하세요
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">
              🎭 4가지 극한 상황
            </p>
            <p className="text-muted-foreground">
              🧠 심리학 기반 분석
            </p>
            <p className="text-muted-foreground">
              ⏱️ 단 3분만에 완료
            </p>
          </div>
          
          <div className="space-y-4">
            <input
              type="text"
              placeholder="닉네임 (선택사항)"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full px-4 py-2 rounded-md border bg-background"
              maxLength={20}
            />
            
            <Button 
              onClick={handleStart}
              className="w-full"
              size="lg"
              disabled={isGeneratingScenario || !currentScenario}
            >
              {isGeneratingScenario ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                  시나리오 생성 중...
                </>
              ) : (
                '테스트 시작하기'
              )}
            </Button>
          </div>
          
          {currentScenario && !isGeneratingScenario && (
            <div className="text-center text-sm text-muted-foreground">
              <p className="font-medium">오늘의 시나리오</p>
              <p className="text-primary">{currentScenario.title}</p>
            </div>
          )}
          
          <p className="text-xs text-center text-muted-foreground">
            이 테스트는 오락 목적이며, 전문적인 심리 상담을 대체하지 않습니다.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}