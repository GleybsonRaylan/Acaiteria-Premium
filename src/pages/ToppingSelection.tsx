import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Cookie } from 'lucide-react';
import { useOrder } from '@/contexts/OrderContext';
import StepIndicator from '@/components/StepIndicator';
import SelectionCard from '@/components/SelectionCard';
import ActionButton from '@/components/ActionButton';
import { toast } from 'sonner';

const toppings = [
  'Leite em pó',
  'Farinha láctea',
  'Farinha de amendoim',
  'Jujuba',
  'Granola',
  'Amendoim',
  'Chocoball',
  'Paçoca',
  'Sucrilhos',
  'Granulado',
];

const ToppingSelection = () => {
  const navigate = useNavigate();
  const { order, updateToppings } = useOrder();
  const [selected, setSelected] = useState<string[]>(order.toppings);

  const handleToggle = (topping: string) => {
    if (selected.includes(topping)) {
      setSelected(selected.filter(t => t !== topping));
    } else {
      setSelected([...selected, topping]);
    }
  };

  const handleContinue = () => {
    updateToppings(selected);
    toast.success('Acompanhamentos selecionados!');
    navigate('/caldas');
  };

  const handleSkip = () => {
    updateToppings([]);
    navigate('/caldas');
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
            <h1 className="text-2xl font-bold">Acompanhamentos</h1>
            <p className="text-sm opacity-90">
              Escolha quantos quiser ({selected.length} selecionados)
            </p>
          </div>
          <Cookie className="w-8 h-8 text-accent" />
        </div>
        <StepIndicator currentStep={3} totalSteps={7} />
      </div>

      {/* Content */}
      <div className="flex-1 p-6 space-y-3 overflow-y-auto animate-slide-up">
        {toppings.map((topping) => (
          <SelectionCard
            key={topping}
            selected={selected.includes(topping)}
            onClick={() => handleToggle(topping)}
          >
            <div className="text-center">
              <h3 className="text-lg font-bold text-foreground">{topping}</h3>
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

export default ToppingSelection;
