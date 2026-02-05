import { Button } from '@/components/ui/button';
import { Rocket, Zap, Target } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="relative z-10 max-w-2xl text-center space-y-8 animate-fade-in">
        {/* Title */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFF200] border-3 border-black shadow-[4px_4px_0px_0px_#000] text-black text-sm font-bold uppercase tracking-wide">
            <Zap className="w-4 h-4" />
            Journée Portes Ouvertes
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight">
            <span className="text-[#602EFF]">Speedrun</span>
            <br />
            <span className="text-black">MMI DAY</span>
          </h1>
          <p className="text-xl text-black/70 font-medium">
            Découvre le BUT MMI en un temps record
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-white border-3 border-black shadow-[8px_8px_0px_0px_#602EFF] p-6 space-y-4">
          <h2 className="text-lg font-black text-black flex items-center gap-2 justify-center uppercase">
            <Target className="w-5 h-5 text-[#602EFF]" />
            Comment ça marche ?
          </h2>
          <div className="space-y-3 text-black/80 font-medium">
            <p>Tu vas traverser <span className="text-[#602EFF] font-black">4 salles</span> thématiques.</p>
            <p>Dans chaque salle, un défi t'attend.</p>
            <p className="text-red-600 font-bold bg-red-50 border-2 border-red-600 px-3 py-2 inline-block">
              ⚠️ Tu ne peux pas avancer tant que ce n'est pas juste !
            </p>
          </div>
        </div>

        {/* Start button */}
        <Button
          variant="game"
          size="lg"
          onClick={onStart}
          className="group text-lg px-12 py-6 h-auto"
        >
          <Rocket className="w-6 h-6 transition-transform group-hover:-translate-y-1" />
          Commencer le speedrun
        </Button>
      </div>
    </div>
  );
};
