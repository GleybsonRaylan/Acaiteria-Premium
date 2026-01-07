import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Droplet } from "lucide-react";
import { useOrder } from "@/contexts/OrderContext";
import StepIndicator from "@/components/StepIndicator";
import SelectionCard from "@/components/SelectionCard";
import ActionButton from "@/components/ActionButton";
import { toast } from "sonner";

/* ⬇️ COLE AQUI TODAS AS SUAS CALDAS ORIGINAIS ⬇️ */
const syrups = [
  "Chocolate",
  "Morango",
  "Caramelo",
  "Leite condensado",
  "Limão",
  "Kiwi",
  "Mel",
  "Menta",
  // 👉 adicione TODAS as que você já tinha
];

const SyrupSelection = () => {
  const navigate = useNavigate();
  const { order, updateSyrups, getLimits } = useOrder();
  const limits = getLimits();

  const [selected, setSelected] = useState<string[]>(order.syrups);

  const handleToggle = (syrup: string) => {
    const alreadySelected = selected.includes(syrup);

    // Remover
    if (alreadySelected) {
      setSelected(selected.filter((s) => s !== syrup));
      return;
    }

    // Limite de caldas (CORRETO)
    if (selected.length >= limits.syrups) {
      toast.error(
        `Você pode escolher no máximo ${limits.syrups} calda(s) para este tamanho.`
      );
      return;
    }

    setSelected([...selected, syrup]);
  };

  const handleContinue = () => {
    updateSyrups(selected);
    toast.success("Caldas selecionadas!");
    navigate("/frutas");
  };

  const handleSkip = () => {
    updateSyrups([]);
    navigate("/frutas");
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
              Máximo {limits.syrups} ({selected.length}/{limits.syrups})
            </p>
          </div>

          <Droplet className="w-8 h-8 text-accent" />
        </div>

        <StepIndicator currentStep={4} totalSteps={7} />
      </div>

      {/* Content */}
      <div className="flex-1 p-6 space-y-3 overflow-y-auto animate-slide-up">
        {syrups.map((syrup) => {
          const isSelected = selected.includes(syrup);
          const isDisabled = !isSelected && selected.length >= limits.syrups;

          return (
            <SelectionCard
              key={syrup}
              selected={isSelected}
              disabled={isDisabled}
              onClick={() => handleToggle(syrup)}
            >
              <div className="text-center">
                <h3 className="text-lg font-bold text-foreground">{syrup}</h3>
              </div>
            </SelectionCard>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-6 bg-card border-t border-border space-y-2">
        <ActionButton onClick={handleContinue}>Continuar</ActionButton>

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
