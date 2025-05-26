'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import questions from '@/data/questions.json';

interface DeepDiveFlowProps {
  area: string;
  dilemma: any;
  currentIndex: number;
  totalDilemmas: number;
  onChoice: (choiceId: string) => void;
}

export default function DeepDiveFlow({
  area,
  dilemma,
  currentIndex,
  totalDilemmas,
  onChoice
}: DeepDiveFlowProps) {
  const areaInfo = questions.deepDiveAreas.find(a => a.id === area);
  const progress = ((currentIndex + 1) / totalDilemmas) * 100;

  if (!dilemma) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 py-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{areaInfo?.title}</h2>
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-muted-foreground mt-2">
          질문 {currentIndex + 1} / {totalDilemmas}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            특별 질문 {currentIndex + 1}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-lg leading-relaxed">
            {dilemma.situation}
          </div>
          
          <div className="space-y-3">
            {dilemma.choices.map((choice: any) => (
              <Button
                key={choice.id}
                variant="outline"
                className="w-full text-left justify-start p-4 h-auto"
                onClick={() => onChoice(choice.id)}
              >
                <span className="mr-3 font-bold">{choice.id}.</span>
                <span className="flex-1">{choice.text}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}