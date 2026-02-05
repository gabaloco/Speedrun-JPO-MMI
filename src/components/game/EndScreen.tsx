import { Button } from '@/components/ui/button';
import { Trophy, Clock, ExternalLink, RotateCcw, Sparkles } from 'lucide-react';

interface EndScreenProps {
  time: number;
  formatTime: (seconds: number) => string;
  onRestart: () => void;
}

export const EndScreen = ({ time, formatTime, onRestart }: EndScreenProps) => {
  const getPerformanceMessage = () => {
    if (time < 60) return { text: "Incroyable ! Tu es un vrai speedrunner !", emoji: "🔥" };
    if (time < 120) return { text: "Excellent temps ! Bien joué !", emoji: "⭐" };
    if (time < 180) return { text: "Très bien ! Tu connais le BUT MMI.", emoji: "👏" };
    return { text: "Bien terminé ! Tu as découvert le BUT MMI.", emoji: "✅" };
  };

  const performance = getPerformanceMessage();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="relative z-10 max-w-2xl w-full text-center space-y-8 animate-fade-in">
        {/* Trophy */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-[#FFF200] border-3 border-black shadow-[6px_6px_0px_0px_#000] flex items-center justify-center animate-float">
            <Trophy className="w-12 h-12 text-black" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-black uppercase">
            <span className="text-[#602EFF]">Parcours MMI DAY</span>
            <br />
            <span className="text-black">terminé !</span>
          </h1>
          <p className="text-xl text-black/70 font-bold">{performance.emoji} {performance.text}</p>
        </div>

        {/* Time display */}
        <div className="bg-white border-3 border-black shadow-[8px_8px_0px_0px_#602EFF] p-8 space-y-4 inline-block">
          <div className="flex items-center justify-center gap-3">
            <Clock className="w-8 h-8 text-[#602EFF]" />
            <span className="text-5xl font-black text-[#602EFF] tabular-nums">
              {formatTime(time)}
            </span>
          </div>
          <p className="text-black/60 font-bold uppercase">Temps final</p>
        </div>

        {/* Et maintenant : estimation par rapport aux autres (approx.) */}
        <div className="bg-[#5FDDFF] border-3 border-black shadow-[6px_6px_0px_0px_#000] p-6 space-y-4">
          <div className="flex items-center justify-center gap-2 text-black">
            <Sparkles className="w-5 h-5" />
            <span className="font-black uppercase">Et maintenant ?</span>
          </div>
          <div className="text-black/80 leading-relaxed font-medium">
            {(() => {
              let percent = 0;
              if (time < 15) percent = 90;
              else if (time < 20) percent = 80;
              else if (time < 30) percent = 70;
              else if (time < 50) percent = 60;
              else if (time < 60) percent = 50;
              else if (time < 70) percent = 40;
              else if (time < 100) percent = 30;
              else if (time < 150) percent = 20;
              else if (time < 250) percent = 10;
              else percent = 5;

              return (
                <>
                  <p>Tu es meilleur que <strong className="font-black">{percent}%</strong> des participants (estimation).</p>
                  <p className="text-sm mt-2 font-bold">Retente pour améliorer ton temps !</p>
                </>
              );
            })()}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="game" size="lg" asChild>
            <a href="https://mmiday.mmi-toulon.fr" target="_blank" rel="noopener noreferrer">
              Voir les infos de la JPO
              <ExternalLink className="w-5 h-5" />
            </a>
          </Button>
          <Button variant="secondary" size="lg" onClick={onRestart}>
            <RotateCcw className="w-5 h-5" />
            Rejouer
          </Button>
        </div>
      </div>
    </div>
  );
};
