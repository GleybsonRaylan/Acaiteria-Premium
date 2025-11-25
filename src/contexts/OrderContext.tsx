import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Size = {
  id: string;
  name: string;
  price: number;
};

export type OrderData = {
  size: Size | null;
  creams: string[];
  toppings: string[];
  syrups: string[];
  fruits: string[];
  extras: Array<{ name: string; price: number }>;
  delivery: boolean;
  street: string;
  neighborhood: string;
  houseNumber: string;
  needsChange: boolean;
  changeFor: number;
};

type OrderContextType = {
  order: OrderData;
  updateSize: (size: Size) => void;
  updateCreams: (creams: string[]) => void;
  updateToppings: (toppings: string[]) => void;
  updateSyrups: (syrups: string[]) => void;
  updateFruits: (fruits: string[]) => void;
  updateExtras: (extras: Array<{ name: string; price: number }>) => void;
  updateDelivery: (delivery: boolean, street: string, neighborhood: string, houseNumber: string) => void;
  updateChange: (needsChange: boolean, changeFor: number) => void;
  getTotalPrice: () => number;
  resetOrder: () => void;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const initialOrder: OrderData = {
  size: null,
  creams: [],
  toppings: [],
  syrups: [],
  fruits: [],
  extras: [],
  delivery: false,
  street: '',
  neighborhood: '',
  houseNumber: '',
  needsChange: false,
  changeFor: 0,
};

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [order, setOrder] = useState<OrderData>(initialOrder);

  const updateSize = (size: Size) => {
    setOrder(prev => ({ ...prev, size }));
  };

  const updateCreams = (creams: string[]) => {
    setOrder(prev => ({ ...prev, creams }));
  };

  const updateToppings = (toppings: string[]) => {
    setOrder(prev => ({ ...prev, toppings }));
  };

  const updateSyrups = (syrups: string[]) => {
    setOrder(prev => ({ ...prev, syrups }));
  };

  const updateFruits = (fruits: string[]) => {
    setOrder(prev => ({ ...prev, fruits }));
  };

  const updateExtras = (extras: Array<{ name: string; price: number }>) => {
    setOrder(prev => ({ ...prev, extras }));
  };

  const updateDelivery = (delivery: boolean, street: string, neighborhood: string, houseNumber: string) => {
    setOrder(prev => ({ ...prev, delivery, street, neighborhood, houseNumber }));
  };

  const updateChange = (needsChange: boolean, changeFor: number) => {
    setOrder(prev => ({ ...prev, needsChange, changeFor }));
  };

  const getTotalPrice = () => {
    let total = order.size?.price || 0;
    
    // Adicionar morango se selecionado
    if (order.fruits.includes('Morango')) {
      total += 2;
    }
    
    // Adicionar extras
    order.extras.forEach(extra => {
      total += extra.price;
    });
    
    // Adicionar entrega
    if (order.delivery) {
      total += 2;
    }
    
    return total;
  };

  const resetOrder = () => {
    setOrder(initialOrder);
  };

  return (
    <OrderContext.Provider
      value={{
        order,
        updateSize,
        updateCreams,
        updateToppings,
        updateSyrups,
        updateFruits,
        updateExtras,
        updateDelivery,
        updateChange,
        getTotalPrice,
        resetOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
