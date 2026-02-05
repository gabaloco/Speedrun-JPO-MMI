import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ArrowRight, Target, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Room4LogoProps {
  onComplete: () => void;
}

interface LogoOption {
  id: string;
  isCorrect: boolean;
  label: string;
  image: string;
}

// Logo options - images are stored in public/images/
const logos: LogoOption[] = [
  { id: '1', isCorrect: false, label: 'Logo 1', image: '/Images/Logo1.jpg' },
  { id: '2', isCorrect: false, label: 'Logo 2', image: '/Images/Logo2.jpg' },
  { id: '3', isCorrect: false, label: 'Logo 3', image: '/Images/Logo3.png' },
  { id: '4', isCorrect: true, label: 'Logo 4', image: '/Images/Logo4.jpg' },
];

export const Room4Logo = ({ onComplete }: Room4LogoProps) => {
  const [selectedLogo, setSelectedLogo] = useState<string | null>(null);
  const [isValidated, setIsValidated] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState<Set<string>>(new Set());

  const handleLogoClick = (id: string, isCorrect: boolean) => {
    if (isValidated) return;

    setSelectedLogo(id);

    if (isCorrect) {
      setIsValidated(true);
      toast.success("Bravo ! Tu as terminé le parcours.");
    } else {
      setWrongAttempts((prev) => new Set([...prev, id]));
      toast.error("Ce n'est pas le logo officiel de la JPO.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 pt-24">
      <div className="max-w-3xl w-full space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#DE8FFF] border-3 border-black shadow-[4px_4px_0px_0px_#000] text-black text-sm font-bold uppercase">
            <Sparkles className="w-4 h-4" />
            Salle finale
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-black uppercase">
            Salle 4 — <span className="text-[#602EFF]">Logo MMI</span>
          </h2>
          <p className="text-black/70 text-lg flex items-center justify-center gap-2 font-medium">
            <Target className="w-5 h-5" />
            Clique sur le logo officiel du BUT MMI.
          </p>
        </div>

        {/* Logo grid */}
        <div className="grid grid-cols-4 gap-6">
          {logos.map((logo) => (
            <button
              key={logo.id}
              onClick={() => handleLogoClick(logo.id, logo.isCorrect)}
              disabled={isValidated || wrongAttempts.has(logo.id)}
              className={cn(
                "aspect-square border-3 border-black transition-all duration-150 relative overflow-hidden bg-white",
                "hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-[2px] active:translate-y-[2px]",
                wrongAttempts.has(logo.id) && "opacity-50 cursor-not-allowed shadow-[4px_4px_0px_0px_#ef4444]",
                isValidated && logo.isCorrect && "shadow-[6px_6px_0px_0px_#22c55e] bg-green-100",
                !wrongAttempts.has(logo.id) && !isValidated && "shadow-[4px_4px_0px_0px_#602EFF] hover:shadow-[6px_6px_0px_0px_#602EFF]"
              )}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <img
                  src={logo.image}
                  alt={logo.label}
                  className="w-16 h-16 object-contain"
                  onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    el.style.display = 'none';
                  }}
                />
                <p className="mt-3 font-bold text-black text-center text-sm uppercase">{logo.label}</p>
              </div>
              {wrongAttempts.has(logo.id) && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                  <span className="text-red-500 font-black text-3xl">✗</span>
                </div>
              )}
              {isValidated && logo.isCorrect && (
                <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                  <span className="text-green-600 text-4xl font-black">✓</span>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Continue button */}
        {isValidated && (
          <div className="flex justify-center animate-scale-in">
            <Button variant="secondary" size="lg" onClick={onComplete}>
              Voir mon résultat
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
