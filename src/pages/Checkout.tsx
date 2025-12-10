import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Bike,
  Store,
  Banknote,
  CreditCard,
  QrCode,
} from "lucide-react";
import { useOrder } from "@/contexts/OrderContext";
import StepIndicator from "@/components/StepIndicator";
import ActionButton from "@/components/ActionButton";
import { toast } from "sonner";

const Checkout = () => {
  const navigate = useNavigate();
  const { order, updateDelivery, updateChange, updatePayment, getTotalPrice } =
    useOrder();
  const [deliveryType, setDeliveryType] = useState<"pickup" | "delivery">(
    order.delivery ? "delivery" : "pickup"
  );
  const [street, setStreet] = useState(order.street);
  const [neighborhood, setNeighborhood] = useState(order.neighborhood);
  const [houseNumber, setHouseNumber] = useState(order.houseNumber);
  const [needsChange, setNeedsChange] = useState(order.needsChange);
  const [changeFor, setChangeFor] = useState(order.changeFor.toString());
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card" | "cash">(
    order.paymentMethod || "cash"
  );

  const baseTotal = getTotalPrice();
  const deliveryFee = deliveryType === "delivery" ? 2 : 0;
  const total = baseTotal + deliveryFee;

  const handleContinue = () => {
    if (
      deliveryType === "delivery" &&
      (!street.trim() || !neighborhood.trim() || !houseNumber.trim())
    ) {
      toast.error("Por favor, preencha todos os campos do endereço");
      return;
    }

    if (
      paymentMethod === "cash" &&
      needsChange &&
      (!changeFor || parseFloat(changeFor) <= total)
    ) {
      toast.error("O valor para troco deve ser maior que o total do pedido");
      return;
    }

    updateDelivery(
      deliveryType === "delivery",
      street,
      neighborhood,
      houseNumber
    );
    updateChange(needsChange, parseFloat(changeFor) || 0);
    updatePayment(paymentMethod); // ← AGORA ESTA FUNÇÃO EXISTE!
    navigate("/resumo");
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
            <h1 className="text-2xl font-bold">Finalização</h1>
            <p className="text-sm opacity-90">Últimos detalhes do seu pedido</p>
          </div>
        </div>
        <StepIndicator currentStep={7} totalSteps={7} />
      </div>

      {/* Content */}
      <div className="flex-1 p-6 space-y-6 overflow-y-auto animate-slide-up">
        {/* Resumo de valor */}
        <div className="bg-gradient-to-br from-secondary to-primary rounded-2xl p-6 text-white shadow-lg">
          <p className="text-sm opacity-90 mb-1">Total do pedido</p>
          <p className="text-4xl font-black">R$ {total.toFixed(2)}</p>
          {deliveryType === "delivery" && (
            <p className="text-sm mt-2 opacity-90">
              Incluindo taxa de entrega (R$ 2,00)
            </p>
          )}
        </div>

        {/* Método de pagamento */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-foreground mb-2">
            Como você quer pagar?
          </label>

          <button
            onClick={() => setPaymentMethod("pix")}
            className={`w-full p-4 rounded-lg border-2 transition-all ${
              paymentMethod === "pix"
                ? "border-success bg-success/10"
                : "border-border bg-card"
            }`}
          >
            <div className="flex items-center gap-3">
              <QrCode
                className={`w-6 h-6 ${
                  paymentMethod === "pix"
                    ? "text-success"
                    : "text-muted-foreground"
                }`}
              />
              <div className="text-left flex-1">
                <p className="font-bold text-foreground">PIX</p>
                <p className="text-sm text-muted-foreground">
                  Pagamento digital
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setPaymentMethod("card")}
            className={`w-full p-4 rounded-lg border-2 transition-all ${
              paymentMethod === "card"
                ? "border-success bg-success/10"
                : "border-border bg-card"
            }`}
          >
            <div className="flex items-center gap-3">
              <CreditCard
                className={`w-6 h-6 ${
                  paymentMethod === "card"
                    ? "text-success"
                    : "text-muted-foreground"
                }`}
              />
              <div className="text-left flex-1">
                <p className="font-bold text-foreground">Cartão</p>
                <p className="text-sm text-muted-foreground">
                  Débito ou Crédito
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setPaymentMethod("cash")}
            className={`w-full p-4 rounded-lg border-2 transition-all ${
              paymentMethod === "cash"
                ? "border-success bg-success/10"
                : "border-border bg-card"
            }`}
          >
            <div className="flex items-center gap-3">
              <Banknote
                className={`w-6 h-6 ${
                  paymentMethod === "cash"
                    ? "text-success"
                    : "text-muted-foreground"
                }`}
              />
              <div className="text-left flex-1">
                <p className="font-bold text-foreground">Dinheiro</p>
                <p className="text-sm text-muted-foreground">
                  Pagamento na entrega
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Troco (apenas para dinheiro) */}
        {paymentMethod === "cash" && (
          <div className="space-y-3 animate-slide-up">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={needsChange}
                onChange={(e) => setNeedsChange(e.target.checked)}
                className="w-5 h-5 rounded accent-secondary"
              />
              <span className="font-bold text-foreground">
                <Banknote className="w-4 h-4 inline mr-1" />
                Preciso de troco
              </span>
            </label>

            {needsChange && (
              <div className="animate-slide-up">
                <input
                  type="number"
                  value={changeFor}
                  onChange={(e) => setChangeFor(e.target.value)}
                  placeholder="Valor que você vai pagar"
                  className="w-full p-4 rounded-lg border-2 border-input bg-card text-foreground focus:border-secondary focus:outline-none text-lg"
                  step="0.01"
                  min={total + 0.01}
                />
                {changeFor && parseFloat(changeFor) > total && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Troco: R$ {(parseFloat(changeFor) - total).toFixed(2)}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tipo de entrega */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-foreground mb-2">
            Como você quer receber?
          </label>

          <button
            onClick={() => setDeliveryType("pickup")}
            className={`w-full p-4 rounded-lg border-2 transition-all ${
              deliveryType === "pickup"
                ? "border-success bg-success/10"
                : "border-border bg-card"
            }`}
          >
            <div className="flex items-center gap-3">
              <Store
                className={`w-6 h-6 ${
                  deliveryType === "pickup"
                    ? "text-success"
                    : "text-muted-foreground"
                }`}
              />
              <div className="text-left flex-1">
                <p className="font-bold text-foreground">Retirar no local</p>
                <p className="text-sm text-muted-foreground">Sem taxa</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setDeliveryType("delivery")}
            className={`w-full p-4 rounded-lg border-2 transition-all ${
              deliveryType === "delivery"
                ? "border-success bg-success/10"
                : "border-border bg-card"
            }`}
          >
            <div className="flex items-center gap-3">
              <Bike
                className={`w-6 h-6 ${
                  deliveryType === "delivery"
                    ? "text-success"
                    : "text-muted-foreground"
                }`}
              />
              <div className="text-left flex-1">
                <p className="font-bold text-foreground">Delivery</p>
                <p className="text-sm text-muted-foreground">+ R$ 2,00</p>
              </div>
            </div>
          </button>
        </div>

        {/* Endereço */}
        {deliveryType === "delivery" && (
          <div className="space-y-3 animate-slide-up">
            <label className="block text-sm font-bold text-foreground">
              <MapPin className="w-4 h-4 inline mr-1" />
              Endereço para entrega
            </label>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Rua"
              className="w-full p-4 rounded-lg border-2 border-input bg-card text-foreground focus:border-secondary focus:outline-none"
            />
            <input
              type="text"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              placeholder="Bairro"
              className="w-full p-4 rounded-lg border-2 border-input bg-card text-foreground focus:border-secondary focus:outline-none"
            />
            <input
              type="text"
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
              placeholder="Número da casa"
              className="w-full p-4 rounded-lg border-2 border-input bg-card text-foreground focus:border-secondary focus:outline-none"
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-6 bg-card border-t border-border">
        <ActionButton onClick={handleContinue} variant="success">
          Ver resumo do pedido
        </ActionButton>
      </div>
    </div>
  );
};

export default Checkout;
