import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ArrowRight, GripVertical, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Room1SkillsProps {
  onComplete: () => void;
}

type Skill = 'Développement' | 'Création' | 'Communication';

interface Card {
  id: string;
  label: string;
  correctSkill: Skill;
}

const cards: Card[] = [
  { id: '1', label: 'HTML / CSS / JavaScript', correctSkill: 'Développement' },
  { id: '2', label: 'Audiovisuel', correctSkill: 'Création' },
  { id: '3', label: 'UX / UI', correctSkill: 'Création' },
  { id: '4', label: 'Marketing digital', correctSkill: 'Communication' },
  { id: '5', label: 'Stratégie de communication', correctSkill: 'Communication' },
  { id: '6', label: 'Portfolio', correctSkill: 'Développement' },
];

const skills: Skill[] = ['Développement', 'Création', 'Communication'];

const skillColors: Record<Skill, string> = {
  'Développement': 'border-primary bg-primary/10 hover:bg-primary/20',
  'Création': 'border-secondary bg-secondary/10 hover:bg-secondary/20',
  'Communication': 'border-success bg-success/10 hover:bg-success/20',
};

export const Room1Skills = ({ onComplete }: Room1SkillsProps) => {
  const [placements, setPlacements] = useState<Record<string, Skill | null>>({});
  const [availableCards, setAvailableCards] = useState<Card[]>([...cards]);
  const [isValidated, setIsValidated] = useState(false);
  const [draggedCard, setDraggedCard] = useState<Card | null>(null);

  const handleDragStart = (card: Card) => {
    setDraggedCard(card);
  };

  const handleDrop = (skill: Skill) => {
    if (draggedCard) {
      setPlacements((prev) => ({ ...prev, [draggedCard.id]: skill }));
      setAvailableCards((prev) => prev.filter((c) => c.id !== draggedCard.id));
      setDraggedCard(null);
    }
  };

  const handleRemoveFromSkill = (cardId: string) => {
    const card = cards.find((c) => c.id === cardId);
    if (card) {
      setPlacements((prev) => {
        const newPlacements = { ...prev };
        delete newPlacements[cardId];
        return newPlacements;
      });
      setAvailableCards((prev) => [...prev, card]);
    }
  };

  const getCardsInSkill = (skill: Skill) => {
    return cards.filter((card) => placements[card.id] === skill);
  };

  const handleValidate = () => {
    // Check if all cards are placed
    if (Object.keys(placements).length !== cards.length) {
      toast.error("Place toutes les matières avant de valider !");
      return;
    }

    // Check if all placements are correct
    const allCorrect = cards.every((card) => placements[card.id] === card.correctSkill);

    if (allCorrect) {
      setIsValidated(true);
      toast.success("Bien vu ! Le BUT MMI développe des compétences variées.");
    } else {
      toast.error("Certaines matières ne sont pas associées à la bonne compétence.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 pt-24">
      <div className="max-w-4xl w-full space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Salle 1 — <span className="text-gradient">Compétences MMI</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Associe chaque matière à la bonne compétence.
          </p>
        </div>

        {/* Available cards */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-4">
          <p className="text-sm text-muted-foreground mb-3">Matières à placer :</p>
          <div className="flex flex-wrap gap-3 min-h-[60px]">
            {availableCards.map((card) => (
              <button
                key={card.id}
                type="button"
                draggable
                onDragStart={() => handleDragStart(card)}
                onClick={() => handleDragStart(card)}
                className="flex items-center gap-2 px-4 py-2 bg-muted border border-border rounded-lg cursor-grab active:cursor-grabbing hover:border-primary transition-all"
              >
                <GripVertical className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">{card.label}</span>
              </button>
            ))}
            {availableCards.length === 0 && (
              <p className="text-muted-foreground italic">Toutes les matières sont placées !</p>
            )}
          </div>
        </div>

        {/* Skill zones */}
        <div className="grid md:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <div
              key={skill}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); handleDrop(skill); }}
              onClick={() => draggedCard && handleDrop(skill)}
              className={cn(
                "border-2 border-dashed rounded-2xl p-4 min-h-[200px] transition-all",
                skillColors[skill],
                draggedCard && "ring-2 ring-primary/50"
              )}
            >
              <h3 className="font-bold text-lg mb-3 text-center">{skill}</h3>
              <div className="space-y-2">
                {getCardsInSkill(skill).map((card) => (
                  <div
                    key={card.id}
                    onClick={() => !isValidated && handleRemoveFromSkill(card.id)}
                    className={cn(
                      "px-3 py-2 bg-card border border-border rounded-lg text-sm font-medium transition-all",
                      !isValidated && "cursor-pointer hover:bg-muted"
                    )}
                  >
                    {card.label}
                  </div>
                ))}
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
              Entrer dans la salle suivante
              <ArrowRight className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
