import { Timer as TimerIcon } from 'lucide-react';

interface TimerProps {
  time: number;
  formatTime: (seconds: number) => string;
}

export const Timer = ({ time, formatTime }: TimerProps) => {
  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="flex items-center gap-3 bg-[#FFF200] border-3 border-black shadow-[4px_4px_0px_0px_#000] px-5 py-3">
        <TimerIcon className="w-5 h-5 text-black" />
        <span className="font-black text-2xl text-black tabular-nums uppercase">
          {formatTime(time)}
        </span>
      </div>
    </div>
  );
};
