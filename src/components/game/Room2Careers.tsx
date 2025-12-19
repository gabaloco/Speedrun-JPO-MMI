import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ArrowRight, Check, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Room2CareersProps {
  onComplete: () => void;
}

interface Career {
  id: string;
  label: string;
  isMMI: boolean;
}

const careers: Career[] = [
  { id: '1', label: 'Développeur web', isMMI: true },
  { id: '2', label: 'Webdesigner', isMMI: true },
  { id: '3', label: 'Community manager', isMMI: true },
  { id: '4', label: 'Chargé de communication digitale', isMMI: true },
  { id: '5', label: 'Cybersécurité', isMMI: false },
  { id: '6', label: 'Entrepreneur', isMMI: true },
];

export const Room2Careers = ({ onComplete }: Room2CareersProps) => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [isValidated, setIsValidated] = useState(false);
  const [shake, setShake] = useState(false);

  const toggleCareer = (id: string) => {
    if (isValidated) return;
    
    const newSelected = new Set(selected);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelected(newSelected);
  };

  const handleValidate = () => {
    const mmiCareers = careers.filter((c) => c.isMMI).map((c) => c.id);
    const nonMmiCareers = careers.filter((c) => !c.isMMI).map((c) => c.id);

    const allMmiSelected = mmiCareers.every((id) => selected.has(id));
    const noNonMmiSelected = nonMmiCareers.every((id) => !selected.has(id));

    if (allMmiSelected && noNonMmiSelected) {
      setIsValidated(true);
      toast.success("Exact ! Le BUT MMI mène à de nombreux métiers du numérique.");
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      toast.error("Un ou plusieurs métiers ne correspondent pas au BUT MMI.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 pt-24">
      <div className={cn("max-w-3xl w-full space-y-8 animate-fade-in", shake && "animate-shake")}>
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Salle 2 — <span className="text-gradient">Débouchés</span>
          </h2>
          <p className="text-muted-foreground text-lg flex items-center justify-center gap-2">
            <Briefcase className="w-5 h-5" />
            Sélectionne uniquement les métiers accessibles après un BUT MMI.
          </p>
        </div>

        {/* Career cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          {careers.map((career, index) => (
            <button
              key={career.id}
              onClick={() => toggleCareer(career.id)}
              disabled={isValidated}
              className={cn(
                "p-5 rounded-xl border-2 text-left transition-all duration-300",
                "hover:scale-[1.02] active:scale-[0.98]",
                selected.has(career.id)
                  ? "border-primary bg-primary/10 glow-primary"
                  : "border-border bg-card hover:border-muted-foreground",
                isValidated && career.isMMI && "border-success bg-success/10 glow-success",
                isValidated && !career.isMMI && selected.has(career.id) && "border-destructive bg-destructive/10 glow-error"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-lg">{career.label}</span>
                <div
                  className={cn(
                    "w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all",
                    selected.has(career.id)
                      ? "border-primary bg-primary"
                      : "border-muted-foreground"
                  )}
                >
                  {selected.has(career.id) && (
                    <Check className="w-4 h-4 text-primary-foreground" />
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Validation */}
        <div className="flex justify-center">
          {!isValidated ? (
            <Button variant="game" size="lg" onClick={handleValidate}>
              <Check className="w-5 h-5" />
              Valider ma sélection
            </Button>
          ) : (
            <Button variant="success" size="lg" onClick={onComplete}>
              Continuer
              <ArrowRight className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
