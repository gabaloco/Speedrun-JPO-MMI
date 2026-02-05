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

const skillColors: Record<Skill, { bg: string; border: string }> = {
  'Développement': { bg: 'bg-[#602EFF]/10', border: 'border-[#602EFF]' },
  'Création': { bg: 'bg-[#FFF200]/30', border: 'border-[#FFF200]' },
  'Communication': { bg: 'bg-[#5FDDFF]/30', border: 'border-[#5FDDFF]' },
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
          <h2 className="text-3xl md:text-4xl font-black text-black uppercase">
            Salle 1 — <span className="text-[#602EFF]">Compétences MMI</span>
          </h2>
          <p className="text-black/70 text-lg font-medium">
            Associe chaque matière à la bonne compétence.
          </p>
        </div>

        {/* Available cards */}
        <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#602EFF] p-4">
          <p className="text-sm text-black/60 mb-3 font-bold uppercase">Matières à placer :</p>
          <div className="flex flex-wrap gap-3 min-h-[60px]">
            {availableCards.map((card) => (
              <button
                key={card.id}
                type="button"
                draggable
                onDragStart={() => handleDragStart(card)}
                onClick={() => handleDragStart(card)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 border-2 border-black cursor-grab active:cursor-grabbing hover:bg-[#FFF200] transition-all font-medium"
              >
                <GripVertical className="w-4 h-4 text-black/50" />
                <span className="font-bold">{card.label}</span>
              </button>
            ))}
            {availableCards.length === 0 && (
              <p className="text-black/50 italic font-medium">Toutes les matières sont placées !</p>
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
                "border-3 border-dashed p-4 min-h-[200px] transition-all",
                skillColors[skill].bg,
                skillColors[skill].border,
                draggedCard && "border-solid shadow-[4px_4px_0px_0px_#000]"
              )}
            >
              <h3 className="font-black text-lg mb-3 text-center uppercase text-black">{skill}</h3>
              <div className="space-y-2">
                {getCardsInSkill(skill).map((card) => (
                  <div
                    key={card.id}
                    onClick={() => !isValidated && handleRemoveFromSkill(card.id)}
                    className={cn(
                      "px-3 py-2 bg-white border-2 border-black text-sm font-bold transition-all",
                      !isValidated && "cursor-pointer hover:bg-gray-100"
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
            <Button variant="cyan" size="lg" onClick={onComplete}>
              Entrer dans la salle suivante
              <ArrowRight className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
