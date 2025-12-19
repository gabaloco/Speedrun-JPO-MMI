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
  color: string;
  image: string;
}

// Logo options - images are stored in public/images/
const logos: LogoOption[] = [
  { id: '1', isCorrect: false, label: 'Logo 1', color: 'from-blue-500 to-purple-500', image: '/Images/Logo1.jpg' },
  { id: '2', isCorrect: false, label: 'Logo 2', color: 'from-orange-500 to-red-500', image: '/Images/Logo2.jpg' },
  { id: '3', isCorrect: false, label: 'Logo 3', color: 'from-yellow-500 to-orange-500', image: '/Images/Logo3.png' },
  { id: '4', isCorrect: true, label: 'Logo 4', color: 'from-green-500 to-teal-500', image: '/Images/Logo4.jpg' },
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 border border-secondary/30 rounded-full text-secondary text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Salle finale
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Salle 4 — <span className="text-gradient">Logo MMI</span>
          </h2>
          <p className="text-muted-foreground text-lg flex items-center justify-center gap-2">
            <Target className="w-5 h-5" />
            Clique sur le logo officiel du BUT MMI.
          </p>
        </div>

        {/* Logo grid */}
        <div className="grid grid-cols-2 gap-6">
          {logos.map((logo, index) => (
            <button
              key={logo.id}
              onClick={() => handleLogoClick(logo.id, logo.isCorrect)}
              disabled={isValidated || wrongAttempts.has(logo.id)}
              className={cn(
                "aspect-square rounded-2xl border-2 transition-all duration-300 relative overflow-hidden group",
                "hover:scale-[1.02] active:scale-[0.98]",
                wrongAttempts.has(logo.id) && "border-destructive/50 opacity-50 cursor-not-allowed",
                isValidated && logo.isCorrect && "border-success glow-success",
                !wrongAttempts.has(logo.id) && !isValidated && "border-border hover:border-primary"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-15 transition-opacity",
                logo.color
              )} />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                <img
                  src={logo.image}
                  alt={logo.label}
                  className="w-32 h-32 object-contain rounded-lg"
                  onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    el.style.display = 'none';
                  }}
                />
                <p className="mt-4 font-medium text-foreground text-center">{logo.label}</p>
              </div>
              {wrongAttempts.has(logo.id) && (
                <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                  <span className="text-destructive font-semibold">✗</span>
                </div>
              )}
              {isValidated && logo.isCorrect && (
                <div className="absolute inset-0 bg-success/20 flex items-center justify-center">
                  <span className="text-success text-4xl">✓</span>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Continue button */}
        {isValidated && (
          <div className="flex justify-center animate-scale-in">
            <Button variant="success" size="lg" onClick={onComplete}>
              Voir mon résultat
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
