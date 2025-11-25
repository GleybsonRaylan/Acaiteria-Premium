import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Droplet } from 'lucide-react';
import { useOrder } from '@/contexts/OrderContext';
import StepIndicator from '@/components/StepIndicator';
import SelectionCard from '@/components/SelectionCard';
import ActionButton from '@/components/ActionButton';
import { toast } from 'sonner';

const syrups = [
  'Chocolate',
  'Morango',
  'Leite Condensado',
  'Caramelo',
  'Kiwi',
  'Limão',
  'Menta',
  'Mel',
];

const SyrupSelection = () => {
  const navigate = useNavigate();
  const { order, updateSyrups } = useOrder();
  const [selected, setSelected] = useState<string[]>(order.syrups);

  const handleToggle = (syrup: string) => {
    if (selected.includes(syrup)) {
      setSelected(selected.filter(s => s !== syrup));
    } else {
      setSelected([...selected, syrup]);
    }
  };

  const handleContinue = () => {
    updateSyrups(selected);
    toast.success('Caldas selecionadas!');
    navigate('/frutas');
  };

  const handleSkip = () => {
    updateSyrups([]);
    navigate('/frutas');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-primary text-primary-foreground shadow-lg">
        <div className="flex items-center gap-3 px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Escolha as caldas</h1>
            <p className="text-sm opacity-90">
              Quantas quiser ({selected.length} selecionadas)
            </p>
          </div>
          <Droplet className="w-8 h-8 text-accent" />
        </div>
        <StepIndicator currentStep={4} totalSteps={7} />
      </div>

      {/* Content */}
      <div className="flex-1 p-6 space-y-3 overflow-y-auto animate-slide-up">
        {syrups.map((syrup) => (
          <SelectionCard
            key={syrup}
            selected={selected.includes(syrup)}
            onClick={() => handleToggle(syrup)}
          >
            <div className="text-center">
              <h3 className="text-lg font-bold text-foreground">{syrup}</h3>
            </div>
          </SelectionCard>
        ))}
      </div>

      {/* Footer */}
      <div className="p-6 bg-card border-t border-border space-y-2">
        <ActionButton onClick={handleContinue}>
          Continuar
        </ActionButton>
        {selected.length === 0 && (
          <button
            onClick={handleSkip}
            className="w-full py-3 text-muted-foreground hover:text-foreground transition-colors"
          >
            Pular esta etapa
          </button>
        )}
      </div>
    </div>
  );
};

export default SyrupSelection;
