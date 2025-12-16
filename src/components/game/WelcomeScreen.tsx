import { Button } from '@/components/ui/button';
import { Rocket, Zap, Target } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      
      <div className="relative z-10 max-w-2xl text-center space-y-8 animate-fade-in">
        {/* Title */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-medium">
            <Zap className="w-4 h-4" />
            Journée Portes Ouvertes
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold">
            <span className="text-gradient">Speedrun</span>
            <br />
            <span className="text-foreground">JPO</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Découvre le BUT MMI en un temps record
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 justify-center">
            <Target className="w-5 h-5 text-primary" />
            Comment ça marche ?
          </h2>
          <div className="space-y-3 text-muted-foreground">
            <p>Tu vas traverser <span className="text-primary font-semibold">4 salles</span> thématiques.</p>
            <p>Dans chaque salle, un défi t'attend.</p>
            <p className="text-destructive font-medium">
              ⚠️ Tu ne peux pas avancer tant que ce n'est pas juste !
            </p>
          </div>
        </div>

        {/* Start button */}
        <Button 
          variant="game" 
          size="lg" 
          onClick={onStart}
          className="group"
        >
          <Rocket className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
          Commencer le speedrun
        </Button>
      </div>
    </div>
  );
};
