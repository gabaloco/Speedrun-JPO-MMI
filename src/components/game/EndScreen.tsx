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
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-success/10 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-success/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      
      <div className="relative z-10 max-w-2xl w-full text-center space-y-8 animate-fade-in">
        {/* Trophy */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-success/20 to-primary/20 border border-success/30 flex items-center justify-center animate-float">
            <Trophy className="w-12 h-12 text-success" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            <span className="text-gradient">Parcours MMI DAY</span>
            <br />
            <span className="text-foreground">terminé !</span>
          </h1>
          <p className="text-xl text-muted-foreground">{performance.emoji} {performance.text}</p>
        </div>

        {/* Time display */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 space-y-4 inline-block">
          <div className="flex items-center justify-center gap-3">
            <Clock className="w-8 h-8 text-primary" />
            <span className="text-5xl font-bold text-primary tabular-nums">
              {formatTime(time)}
            </span>
          </div>
          <p className="text-muted-foreground">Temps final</p>
        </div>

        {/* Message */}
        <div className="bg-card/30 backdrop-blur-sm border border-border rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-center gap-2 text-secondary">
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">Et maintenant ?</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Tu as terminé le speedrun, mais la meilleure façon de comprendre le BUT MMI,
            c'est de <span className="text-foreground font-semibold">venir le découvrir en vrai</span> lors de la Journée Portes Ouvertes !
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="game" size="lg" asChild>
            <a href="https://www.iut.univ-gustave-eiffel.fr/" target="_blank" rel="noopener noreferrer">
              Voir les infos de la JPO
              <ExternalLink className="w-5 h-5" />
            </a>
          </Button>
          <Button variant="outline" size="lg" onClick={onRestart}>
            <RotateCcw className="w-5 h-5" />
            Rejouer
          </Button>
        </div>
      </div>
    </div>
  );
};
