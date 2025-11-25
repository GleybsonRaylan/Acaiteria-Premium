import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OrderProvider } from "@/contexts/OrderContext";
import Home from "./pages/Home";
import SizeSelection from "./pages/SizeSelection";
import CreamSelection from "./pages/CreamSelection";
import ToppingSelection from "./pages/ToppingSelection";
import SyrupSelection from "./pages/SyrupSelection";
import FruitSelection from "./pages/FruitSelection";
import ExtraSelection from "./pages/ExtraSelection";
import Checkout from "./pages/Checkout";
import OrderSummary from "./pages/OrderSummary";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <OrderProvider>
        <Toaster />
        <Sonner position="top-center" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tamanho" element={<SizeSelection />} />
            <Route path="/cremes" element={<CreamSelection />} />
            <Route path="/acompanhamentos" element={<ToppingSelection />} />
            <Route path="/caldas" element={<SyrupSelection />} />
            <Route path="/frutas" element={<FruitSelection />} />
            <Route path="/adicionais" element={<ExtraSelection />} />
            <Route path="/finalizacao" element={<Checkout />} />
            <Route path="/resumo" element={<OrderSummary />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </OrderProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
