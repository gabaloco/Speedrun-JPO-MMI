import { useState, useCallback } from 'react';
import { useGameTimer } from '@/hooks/useGameTimer';
import { WelcomeScreen } from '@/components/game/WelcomeScreen';
import { Room1Skills } from '@/components/game/Room1Skills';
import { Room2Careers } from '@/components/game/Room2Careers';
import { Room3Studies } from '@/components/game/Room3Studies';
import { Room4Logo } from '@/components/game/Room4Logo';
import { EndScreen } from '@/components/game/EndScreen';
import { Timer } from '@/components/game/Timer';
import { RoomProgress } from '@/components/game/RoomProgress';

type GameState = 'welcome' | 'room1' | 'room2' | 'room3' | 'room4' | 'end';

const Index = () => {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const { time, start, stop, formatTime } = useGameTimer();

  const handleStart = useCallback(() => {
    start();
    setGameState('room1');
  }, [start]);

  const handleRoom1Complete = useCallback(() => {
    setGameState('room2');
  }, []);

  const handleRoom2Complete = useCallback(() => {
    setGameState('room3');
  }, []);

  const handleRoom3Complete = useCallback(() => {
    setGameState('room4');
  }, []);

  const handleRoom4Complete = useCallback(() => {
    stop();
    setGameState('end');
  }, [stop]);

  const handleRestart = useCallback(() => {
    setGameState('welcome');
  }, []);

  const getCurrentRoom = (): number => {
    switch (gameState) {
      case 'room1': return 1;
      case 'room2': return 2;
      case 'room3': return 3;
      case 'room4': return 4;
      default: return 0;
    }
  };

  const showUI = gameState !== 'welcome' && gameState !== 'end';

  return (
    <div className="min-h-screen bg-background">
      {showUI && (
        <>
          <Timer time={time} formatTime={formatTime} />
          <RoomProgress currentRoom={getCurrentRoom()} totalRooms={4} />
        </>
      )}

      {gameState === 'welcome' && <WelcomeScreen onStart={handleStart} />}
      {gameState === 'room1' && <Room1Skills onComplete={handleRoom1Complete} />}
      {gameState === 'room2' && <Room2Careers onComplete={handleRoom2Complete} />}
      {gameState === 'room3' && <Room3Studies onComplete={handleRoom3Complete} />}
      {gameState === 'room4' && <Room4Logo onComplete={handleRoom4Complete} />}
      {gameState === 'end' && (
        <EndScreen 
          time={time} 
          formatTime={formatTime} 
          onRestart={handleRestart} 
        />
      )}
    </div>
  );
};

export default Index;
