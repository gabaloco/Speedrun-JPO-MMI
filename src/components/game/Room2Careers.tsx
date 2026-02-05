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
          <h2 className="text-3xl md:text-4xl font-black text-black uppercase">
            Salle 2 — <span className="text-[#602EFF]">Débouchés</span>
          </h2>
          <p className="text-black/70 text-lg flex items-center justify-center gap-2 font-medium">
            <Briefcase className="w-5 h-5" />
            Sélectionne uniquement les métiers accessibles après un BUT MMI.
          </p>
        </div>

        {/* Career cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          {careers.map((career) => (
            <button
              key={career.id}
              onClick={() => toggleCareer(career.id)}
              disabled={isValidated}
              className={cn(
                "p-5 border-3 border-black text-left transition-all duration-150",
                "hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-[2px] active:translate-y-[2px]",
                selected.has(career.id)
                  ? "bg-[#602EFF] text-white shadow-[6px_6px_0px_0px_#000]"
                  : "bg-white text-black shadow-[4px_4px_0px_0px_#602EFF] hover:shadow-[6px_6px_0px_0px_#602EFF]",
                isValidated && career.isMMI && "bg-green-500 text-white shadow-[6px_6px_0px_0px_#000]",
                isValidated && !career.isMMI && selected.has(career.id) && "bg-red-500 text-white shadow-[6px_6px_0px_0px_#000]"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg">{career.label}</span>
                <div
                  className={cn(
                    "w-6 h-6 border-2 border-current flex items-center justify-center transition-all",
                    selected.has(career.id) ? "bg-white" : "bg-transparent"
                  )}
                >
                  {selected.has(career.id) && (
                    <Check className="w-4 h-4 text-[#602EFF]" />
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
            <Button variant="cyan" size="lg" onClick={onComplete}>
              Continuer
              <ArrowRight className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
