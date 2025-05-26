'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, Heart, Briefcase, Users, DollarSign, Home, AlertCircle, Scale, Target } from 'lucide-react';
import { useGame } from '@/lib/gameContext';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';

const iconMap = {
  Heart,
  Briefcase,
  Users,
  DollarSign,
  Home,
  AlertCircle,
  Scale,
  Target
};

interface AnalysisResultProps {
  analysis: string;
}

export default function AnalysisResult({ analysis }: AnalysisResultProps) {
  const router = useRouter();
  const { session, recommendations, reset } = useGame();

  const handleShare = async () => {
    const shareText = `극한선택 테스트 결과: ${analysis.split('\n')[0]}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: '나의 숨겨진 성격 발견!',
          text: shareText,
          url: window.location.href
        });
      } catch (error) {
        console.log('Share failed:', error);
      }
    } else {
      // Fallback: 클립보드에 복사
      navigator.clipboard.writeText(shareText);
      alert('링크가 복사되었습니다!');
    }
  };

  const handleAreaSelect = (areaId: string) => {
    router.push(`/analysis/deep/${areaId}`);
  };

  const handleRestart = () => {
    reset();
    router.push('/');
  };

  return (
    <div className="max-w-2xl mx-auto p-4 py-8 space-y-6">
      {/* 분석 결과 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            당신의 진짜 모습
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MarkdownRenderer 
            content={analysis} 
            className="text-lg leading-relaxed"
          />
        </CardContent>
      </Card>

      {/* 공유 버튼 */}
      <div className="flex gap-3">
        <Button 
          onClick={handleShare}
          className="flex-1"
          size="lg"
        >
          <Share2 className="mr-2 h-4 w-4" />
          친구들과 공유하기
        </Button>
        <Button 
          onClick={handleRestart}
          variant="outline"
          size="lg"
        >
          다시 하기
        </Button>
      </div>

      {/* 세부 분야 추천 */}
      <div>
        <h3 className="text-xl font-bold mb-4">
          어떤 상황에서의 나를 더 알아볼까요?
        </h3>
        
        <div className="grid gap-4">
          {recommendations.map((rec, index) => {
            const iconName = getIconName(rec.area);
            const Icon = iconMap[iconName as keyof typeof iconMap] || Heart;
            
            return (
              <Card 
                key={rec.area}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleAreaSelect(rec.area)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Icon className="h-6 w-6 text-primary flex-shrink-0" />
                    <div className="flex-1">
                      <div className="font-medium">{rec.hook}</div>
                      <div className="text-sm text-muted-foreground">
                        {rec.reason}
                      </div>
                    </div>
                    <div className="text-2xl opacity-20">
                      {index + 1}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* 하단 안내 */}
      <p className="text-xs text-center text-muted-foreground">
        세부 분야 분석은 AI가 당신의 선택 패턴을 기반으로 생성합니다
      </p>
    </div>
  );
}

function getIconName(area: string): string {
  const iconMapping: Record<string, string> = {
    love: 'Heart',
    work: 'Briefcase',
    friend: 'Users',
    money: 'DollarSign',
    family: 'Home',
    stress: 'AlertCircle',
    moral: 'Scale',
    future: 'Target'
  };
  
  return iconMapping[area] || 'Heart';
}