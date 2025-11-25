import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { useOrder } from '@/contexts/OrderContext';
import ActionButton from '@/components/ActionButton';
import { toast } from 'sonner';

const OrderSummary = () => {
  const navigate = useNavigate();
  const { order, getTotalPrice, resetOrder } = useOrder();

  const generateWhatsAppMessage = () => {
    let message = '🍇 *PEDIDO - PREMIUM AÇAITERIA* 🍇\n\n';
    
    // Tamanho
    message += `📏 *Tamanho:* ${order.size?.name} - R$ ${order.size?.price.toFixed(2)}\n\n`;
    
    // Cremes
    if (order.creams.length > 0) {
      message += `🍨 *Cremes:*\n`;
      order.creams.forEach(cream => {
        message += `   • ${cream}\n`;
      });
      message += '\n';
    }
    
    // Acompanhamentos
    if (order.toppings.length > 0) {
      message += `🍪 *Acompanhamentos:*\n`;
      order.toppings.forEach(topping => {
        message += `   • ${topping}\n`;
      });
      message += '\n';
    }
    
    // Caldas
    if (order.syrups.length > 0) {
      message += `💧 *Caldas:*\n`;
      order.syrups.forEach(syrup => {
        message += `   • ${syrup}\n`;
      });
      message += '\n';
    }
    
    // Frutas
    if (order.fruits.length > 0) {
      message += `🍓 *Frutas:*\n`;
      order.fruits.forEach(fruit => {
        if (fruit === 'Morango') {
          message += `   • ${fruit} (+R$ 2,00)\n`;
        } else {
          message += `   • ${fruit}\n`;
        }
      });
      message += '\n';
    }
    
    // Adicionais
    if (order.extras.length > 0) {
      message += `⭐ *Adicionais:*\n`;
      order.extras.forEach(extra => {
        message += `   • ${extra.name} - R$ ${extra.price.toFixed(2)}\n`;
      });
      message += '\n';
    }
    
    // Entrega
    message += `🚚 *Entrega:* `;
    if (order.delivery) {
      message += `Sim (+R$ 2,00)\n`;
      message += `📍 *Endereço:*\n`;
      message += `   Rua: ${order.street}\n`;
      message += `   Bairro: ${order.neighborhood}\n`;
      message += `   Número: ${order.houseNumber}\n\n`;
    } else {
      message += `Não (Retirar no local)\n\n`;
    }
    
    // Troco
    if (order.needsChange) {
      const change = order.changeFor - getTotalPrice();
      message += `💵 *Troco para:* R$ ${order.changeFor.toFixed(2)}\n`;
      message += `💰 *Troco:* R$ ${change.toFixed(2)}\n\n`;
    }
    
    // Total
    message += `💳 *TOTAL: R$ ${getTotalPrice().toFixed(2)}*`;
    
    return message;
  };

  const handleSendWhatsApp = () => {
    const message = generateWhatsAppMessage();
    const phoneNumber = '5581995187556'; // 81 99518-7556
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(url, '_blank');
    toast.success('Redirecionando para WhatsApp...');
    
    // Reset após enviar
    setTimeout(() => {
      resetOrder();
      navigate('/');
    }, 2000);
  };

  const total = getTotalPrice();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-secondary to-primary text-white shadow-lg">
        <div className="flex items-center gap-3 px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Resumo do Pedido</h1>
            <p className="text-sm opacity-90">Confira tudo antes de enviar</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 space-y-4 overflow-y-auto animate-slide-up">
        {/* Total destacado */}
        <div className="bg-gradient-to-br from-accent to-accent/80 rounded-2xl p-6 text-center shadow-lg">
          <p className="text-accent-foreground text-sm font-medium mb-1">Total do Pedido</p>
          <p className="text-accent-foreground text-5xl font-black">
            R$ {total.toFixed(2)}
          </p>
        </div>

        {/* Tamanho */}
        <div className="bg-card rounded-xl p-4 border-2 border-border shadow-sm">
          <h3 className="font-bold text-sm text-muted-foreground mb-2">TAMANHO</h3>
          <div className="flex justify-between items-center">
            <p className="font-bold text-lg">{order.size?.name}</p>
            <p className="font-bold text-secondary">R$ {order.size?.price.toFixed(2)}</p>
          </div>
        </div>

        {/* Cremes */}
        {order.creams.length > 0 && (
          <div className="bg-card rounded-xl p-4 border-2 border-border shadow-sm">
            <h3 className="font-bold text-sm text-muted-foreground mb-2">CREMES</h3>
            <ul className="space-y-1">
              {order.creams.map((cream, i) => (
                <li key={i} className="text-foreground">• {cream}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Acompanhamentos */}
        {order.toppings.length > 0 && (
          <div className="bg-card rounded-xl p-4 border-2 border-border shadow-sm">
            <h3 className="font-bold text-sm text-muted-foreground mb-2">ACOMPANHAMENTOS</h3>
            <ul className="space-y-1">
              {order.toppings.map((topping, i) => (
                <li key={i} className="text-foreground">• {topping}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Caldas */}
        {order.syrups.length > 0 && (
          <div className="bg-card rounded-xl p-4 border-2 border-border shadow-sm">
            <h3 className="font-bold text-sm text-muted-foreground mb-2">CALDAS</h3>
            <ul className="space-y-1">
              {order.syrups.map((syrup, i) => (
                <li key={i} className="text-foreground">• {syrup}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Frutas */}
        {order.fruits.length > 0 && (
          <div className="bg-card rounded-xl p-4 border-2 border-border shadow-sm">
            <h3 className="font-bold text-sm text-muted-foreground mb-2">FRUTAS</h3>
            <ul className="space-y-1">
              {order.fruits.map((fruit, i) => (
                <li key={i} className="text-foreground flex justify-between">
                  <span>• {fruit}</span>
                  {fruit === 'Morango' && (
                    <span className="text-accent font-bold">+R$ 2,00</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Adicionais */}
        {order.extras.length > 0 && (
          <div className="bg-card rounded-xl p-4 border-2 border-border shadow-sm">
            <h3 className="font-bold text-sm text-muted-foreground mb-2">ADICIONAIS</h3>
            <ul className="space-y-1">
              {order.extras.map((extra, i) => (
                <li key={i} className="text-foreground flex justify-between">
                  <span>• {extra.name}</span>
                  <span className="text-secondary font-bold">+R$ {extra.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Entrega */}
        <div className="bg-card rounded-xl p-4 border-2 border-border shadow-sm">
          <h3 className="font-bold text-sm text-muted-foreground mb-2">ENTREGA</h3>
          {order.delivery ? (
            <>
              <div className="flex justify-between items-center mb-2">
                <p className="font-bold">Delivery</p>
                <p className="text-secondary font-bold">+R$ 2,00</p>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>📍 Rua: {order.street}</p>
                <p>📍 Bairro: {order.neighborhood}</p>
                <p>📍 Número: {order.houseNumber}</p>
              </div>
            </>
          ) : (
            <p className="font-bold">Retirar no local</p>
          )}
        </div>

        {/* Troco */}
        {order.needsChange && (
          <div className="bg-success/10 rounded-xl p-4 border-2 border-success shadow-sm">
            <h3 className="font-bold text-sm text-success mb-2">TROCO</h3>
            <p className="text-foreground">Troco para: <span className="font-bold">R$ {order.changeFor.toFixed(2)}</span></p>
            <p className="text-foreground">Troco: <span className="font-bold">R$ {(order.changeFor - total).toFixed(2)}</span></p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-6 bg-card border-t border-border space-y-2">
        <ActionButton onClick={handleSendWhatsApp} variant="success">
          <Send className="w-5 h-5" />
          Enviar pedido pelo WhatsApp
        </ActionButton>
        <button
          onClick={() => navigate(-1)}
          className="w-full py-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          Voltar e editar
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
