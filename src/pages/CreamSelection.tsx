import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, IceCream } from "lucide-react";
import { useOrder } from "@/contexts/OrderContext";
import StepIndicator from "@/components/StepIndicator";
import SelectionCard from "@/components/SelectionCard";
import ActionButton from "@/components/ActionButton";
import { toast } from "sonner";

const creams = [
  "Açaí",
  "Cupuaçu",
  "Ninho com Oreo",
  "Ninho com Nutella",
  "Ninho",
  "Chocolate com Ovomaltine",
  "Moranguito",
  "Unicórnios",
];

const CreamSelection = () => {
  const navigate = useNavigate();
  const { order, updateCreams, getLimits } = useOrder();
  const limits = getLimits();

  const [selected, setSelected] = useState<string[]>(order.creams);

  const handleToggle = (cream: string) => {
    const alreadySelected = selected.includes(cream);

    // Remover
    if (alreadySelected) {
      setSelected(selected.filter((c) => c !== cream));
      return;
    }

    // Limite de cremes
    if (selected.length >= limits.creams) {
      toast.error(`Você pode escolher no máximo ${limits.creams} cremes.`);
      return;
    }

    setSelected([...selected, cream]);
  };

  const handleContinue = () => {
    if (selected.length === 0) {
      toast.error("Selecione pelo menos um creme.");
      return;
    }

    updateCreams(selected);
    toast.success("Cremes selecionados!");
    navigate("/acompanhamentos");
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
            <h1 className="text-2xl font-bold">Escolha os cremes</h1>
            <p className="text-sm opacity-90">
              Máximo {limits.creams} ({selected.length}/{limits.creams})
            </p>
          </div>

          <IceCream className="w-8 h-8 text-accent" />
        </div>

        <StepIndicator currentStep={2} totalSteps={7} />
      </div>

      {/* Content */}
      <div className="flex-1 p-6 space-y-3 overflow-y-auto animate-slide-up">
        {creams.map((cream) => {
          const isSelected = selected.includes(cream);
          const isDisabled = !isSelected && selected.length >= limits.creams;

          return (
            <SelectionCard
              key={cream}
              selected={isSelected}
              disabled={isDisabled}
              onClick={() => handleToggle(cream)}
            >
              <div className="text-center">
                <h3 className="text-lg font-bold text-foreground">{cream}</h3>
              </div>
            </SelectionCard>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-6 bg-card border-t border-border">
        <ActionButton onClick={handleContinue} disabled={selected.length === 0}>
          Continuar
        </ActionButton>
      </div>
    </div>
  );
};

export default CreamSelection;
