import { Timer as TimerIcon } from 'lucide-react';

interface TimerProps {
  time: number;
  formatTime: (seconds: number) => string;
}

export const Timer = ({ time, formatTime }: TimerProps) => {
  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="flex items-center gap-3 bg-card/90 backdrop-blur-sm border border-border rounded-xl px-5 py-3 glow-primary">
        <TimerIcon className="w-5 h-5 text-primary" />
        <span className="font-bold text-2xl text-primary tabular-nums">
          {formatTime(time)}
        </span>
      </div>
    </div>
  );
};
