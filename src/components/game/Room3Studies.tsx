import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ArrowRight, Check, GraduationCap, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Room3StudiesProps {
  onComplete: () => void;
}

interface Statement {
  id: string;
  text: string;
  isTrue: boolean;
}

const statements: Statement[] = [
  { 
    id: '1', 
    text: "Après un BUT MMI, on peut entrer en licence professionnelle", 
    isTrue: true 
  },
  { 
    id: '2', 
    text: "On obtiens pas de diplome au bout de 2 ans", 
    isTrue: false 
  },
  { 
    id: '3', 
    text: "On peut intégrer une école spécialisée (design, web, com)", 
    isTrue: true 
  },
  { 
    id: '4', 
    text: "Le BUT MMI permet d'accéder à un master universitaire", 
    isTrue: true
  },
];

export const Room3Studies = ({ onComplete }: Room3StudiesProps) => {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({});
  const [isValidated, setIsValidated] = useState(false);
  const [shake, setShake] = useState(false);

  const setAnswer = (id: string, value: boolean) => {
    if (isValidated) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleValidate = () => {
    // Check if all questions are answered
    if (Object.keys(answers).length !== statements.length) {
      toast.error("Réponds à toutes les affirmations !");
      return;
    }

    // Check if all answers are correct
    const allCorrect = statements.every((s) => answers[s.id] === s.isTrue);

    if (allCorrect) {
      setIsValidated(true);
      toast.success("Parfait ! Les poursuites d'études après MMI sont nombreuses.");
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      toast.error("Au moins une réponse est incorrecte. Réessaie.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 pt-24">
      <div className={cn("max-w-3xl w-full space-y-8 animate-fade-in", shake && "animate-shake")}>
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Salle 3 — <span className="text-gradient">Poursuites d'études</span>
          </h2>
          <p className="text-muted-foreground text-lg flex items-center justify-center gap-2">
            <GraduationCap className="w-5 h-5" />
            Indique si les affirmations sont vraies ou fausses.
          </p>
        </div>

        {/* Statements */}
        <div className="space-y-4">
          {statements.map((statement, index) => (
            <div
              key={statement.id}
              className={cn(
                "p-5 rounded-xl border-2 bg-card transition-all",
                answers[statement.id] !== null ? "border-primary/50" : "border-border",
                isValidated && answers[statement.id] === statement.isTrue && "border-success bg-success/5",
                isValidated && answers[statement.id] !== statement.isTrue && "border-destructive bg-destructive/5"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <p className="font-medium text-lg mb-4">{statement.text}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setAnswer(statement.id, true)}
                  disabled={isValidated}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-lg border-2 font-semibold transition-all",
                    "hover:scale-[1.02] active:scale-[0.98]",
                    answers[statement.id] === true
                      ? "border-success bg-success/20 text-success"
                      : "border-border hover:border-success/50"
                  )}
                >
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Vrai
                  </div>
                </button>
                <button
                  onClick={() => setAnswer(statement.id, false)}
                  disabled={isValidated}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-lg border-2 font-semibold transition-all",
                    "hover:scale-[1.02] active:scale-[0.98]",
                    answers[statement.id] === false
                      ? "border-destructive bg-destructive/20 text-destructive"
                      : "border-border hover:border-destructive/50"
                  )}
                >
                  <div className="flex items-center justify-center gap-2">
                    <XCircle className="w-5 h-5" />
                    Faux
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Validation */}
        <div className="flex justify-center">
          {!isValidated ? (
            <Button variant="game" size="lg" onClick={handleValidate}>
              <Check className="w-5 h-5" />
              Valider mes réponses
            </Button>
          ) : (
            <Button variant="success" size="lg" onClick={onComplete}>
              Salle finale
              <ArrowRight className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
