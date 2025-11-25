import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Container } from "lucide-react";
import { useOrder, Size } from "@/contexts/OrderContext";
import StepIndicator from "@/components/StepIndicator";
import SelectionCard from "@/components/SelectionCard";
import { toast } from "sonner";
import acai300ml from "@/assets/acai-300ml.png";
import acai400ml from "@/assets/acai-400ml.png";
import acai500ml from "@/assets/acai-500ml.png";
import acaiH2 from "@/assets/acai-h2.png";
import acaiFamilia from "@/assets/acai-familia.png";

const sizes: Size[] = [
  { id: "300ml", name: "Copo 300ml", price: 13 },
  { id: "400ml", name: "Copo 400ml", price: 15 },
  { id: "500ml", name: "Tigela 500ml", price: 17 },
  { id: "h2", name: "Marmita H2", price: 20 },
  { id: "familia", name: "Tamanho Família", price: 32 },
];

const sizeImages: Record<string, string> = {
  "300ml": acai300ml,
  "400ml": acai400ml,
  "500ml": acai500ml,
  h2: acaiH2,
  familia: acaiFamilia,
};

const SizeSelection = () => {
  const navigate = useNavigate();
  const { order, updateSize } = useOrder();
  const [selectedSize, setSelectedSize] = useState<Size | null>(order.size);

  const handleSizeSelect = (size: Size) => {
    setSelectedSize(size);
    updateSize(size);
    toast.success(`${size.name} selecionado!`);

    // Auto avançar após breve delay
    setTimeout(() => {
      navigate("/cremes");
    }, 600);
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
            <h1 className="text-2xl font-bold">Escolha o tamanho</h1>
            <p className="text-sm opacity-90">
              Selecione o tamanho ideal para você
            </p>
          </div>
          <Container className="w-8 h-8 text-accent" />
        </div>
        <StepIndicator currentStep={1} totalSteps={7} />
      </div>

      {/* Content */}
      <div className="flex-1 p-6 space-y-4 overflow-y-auto animate-slide-up">
        {sizes.map((size) => (
          <SelectionCard
            key={size.id}
            selected={selectedSize?.id === size.id}
            onClick={() => handleSizeSelect(size)}
            variant="large"
          >
            <div className="flex items-center gap-4">
              <img
                src={sizeImages[size.id]}
                alt={size.name}
                className="w-24 h-24 object-cover rounded-xl shadow-md"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground">
                  {size.name}
                </h3>
                <p className="text-muted-foreground text-sm mt-1">
                  {size.id === "familia"
                    ? "Perfeito para compartilhar"
                    : "Individual"}
                </p>
                <div className="text-2xl font-black text-secondary mt-2">
                  R$ {size.price.toFixed(2)}
                </div>
              </div>
            </div>
          </SelectionCard>
        ))}
      </div>
    </div>
  );
};

export default SizeSelection;
