import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Apple } from "lucide-react";
import { useOrder } from "@/contexts/OrderContext";
import StepIndicator from "@/components/StepIndicator";
import SelectionCard from "@/components/SelectionCard";
import ActionButton from "@/components/ActionButton";
import { toast } from "sonner";

const fruits = [
  { name: "Banana", price: 0 },
  { name: "Uva", price: 0 },
  { name: "Abacaxi", price: 0 },
  { name: "Manga", price: 0 },
  { name: "Morango", price: 2 },
];

const FruitSelection = () => {
  const navigate = useNavigate();
  const { order, updateFruits, getLimits } = useOrder();
  const limits = getLimits();

  const [selected, setSelected] = useState<string[]>(order.fruits);

  const handleToggle = (fruitName: string) => {
    const alreadySelected = selected.includes(fruitName);

    // Remover fruta
    if (alreadySelected) {
      setSelected(selected.filter((f) => f !== fruitName));
      return;
    }

    // Limite de frutas
    if (selected.length >= limits.fruits) {
      toast.error(`Você pode escolher no máximo ${limits.fruits} frutas.`);
      return;
    }

    // Adicionar fruta
    const updated = [...selected, fruitName];
    setSelected(updated);

    if (fruitName === "Morango") {
      toast.success("Morango adicionado (+R$ 2,00)", {
        icon: "🍓",
      });
    }
  };

  const handleContinue = () => {
    updateFruits(selected);
    toast.success("Frutas selecionadas!");
    navigate("/adicionais");
  };

  const handleSkip = () => {
    updateFruits([]);
    navigate("/adicionais");
  };

  const extraCost = selected.includes("Morango") ? 2 : 0;

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
            <h1 className="text-2xl font-bold">Escolha as frutas</h1>
            <p className="text-sm opacity-90">
              Máximo {limits.fruits} ({selected.length} selecionadas)
            </p>
          </div>

          <Apple className="w-8 h-8 text-accent" />
        </div>

        <StepIndicator currentStep={5} totalSteps={7} />
      </div>

      {/* Content */}
      <div className="flex-1 p-6 space-y-3 overflow-y-auto animate-slide-up">
        {extraCost > 0 && (
          <div className="bg-accent/20 border-2 border-accent rounded-lg p-4 mb-2">
            <p className="text-center font-bold text-accent-foreground">
              🍓 Morango adiciona +R$ {extraCost.toFixed(2)}
            </p>
          </div>
        )}

        {fruits.map((fruit) => (
          <SelectionCard
            key={fruit.name}
            selected={selected.includes(fruit.name)}
            onClick={() => handleToggle(fruit.name)}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">
                {fruit.name}
              </h3>

              {fruit.price > 0 && (
                <span className="text-sm font-bold text-accent">
                  +R$ {fruit.price.toFixed(2)}
                </span>
              )}
            </div>
          </SelectionCard>
        ))}
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

export default FruitSelection;
