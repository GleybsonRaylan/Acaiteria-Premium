import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { useOrder } from '@/contexts/OrderContext';
import StepIndicator from '@/components/StepIndicator';
import SelectionCard from '@/components/SelectionCard';
import ActionButton from '@/components/ActionButton';
import { toast } from 'sonner';

const extras = [
  { name: 'Batom', price: 3 },
  { name: 'Gotas de chocolate', price: 3 },
  { name: 'Ouro Branco', price: 2 },
  { name: "M&M's", price: 2 },
  { name: 'Nutella', price: 4 },
  { name: 'Sonho de Valsa', price: 2 },
];

const ExtraSelection = () => {
  const navigate = useNavigate();
  const { order, updateExtras } = useOrder();
  const [selected, setSelected] = useState<Array<{ name: string; price: number }>>(order.extras);

  const handleToggle = (extra: { name: string; price: number }) => {
    const isSelected = selected.some(e => e.name === extra.name);
    if (isSelected) {
      setSelected(selected.filter(e => e.name !== extra.name));
    } else {
      setSelected([...selected, extra]);
    }
  };

  const handleContinue = () => {
    updateExtras(selected);
    if (selected.length > 0) {
      toast.success('Adicionais selecionados!');
    }
    navigate('/finalizacao');
  };

  const handleSkip = () => {
    updateExtras([]);
    navigate('/finalizacao');
  };

  const totalExtras = selected.reduce((sum, e) => sum + e.price, 0);

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
            <h1 className="text-2xl font-bold">Adicionais</h1>
            <p className="text-sm opacity-90">
              Opcionais para deixar ainda melhor
            </p>
          </div>
          <Plus className="w-8 h-8 text-accent" />
        </div>
        <StepIndicator currentStep={6} totalSteps={7} />
      </div>

      {/* Content */}
      <div className="flex-1 p-6 space-y-3 overflow-y-auto animate-slide-up">
        {totalExtras > 0 && (
          <div className="bg-secondary/20 border-2 border-secondary rounded-lg p-4 mb-2">
            <p className="text-center font-bold text-foreground">
              Total em adicionais: R$ {totalExtras.toFixed(2)}
            </p>
          </div>
        )}
        
        {extras.map((extra) => (
          <SelectionCard
            key={extra.name}
            selected={selected.some(e => e.name === extra.name)}
            onClick={() => handleToggle(extra)}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">{extra.name}</h3>
              <div className="text-right">
                <span className="text-xl font-bold text-secondary">
                  +R$ {extra.price.toFixed(2)}
                </span>
              </div>
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

export default ExtraSelection;
