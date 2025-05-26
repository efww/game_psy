'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGame } from '@/lib/gameContext';
import GameFlow from '@/components/game/GameFlow';

export default function GamePage() {
  const { session } = useGame();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  }, [session, router]);

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <GameFlow />
    </div>
  );
}