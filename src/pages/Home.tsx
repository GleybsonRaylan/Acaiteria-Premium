import { useNavigate } from "react-router-dom";
import { ShoppingBag, Sparkles } from "lucide-react";
import ActionButton from "@/components/ActionButton";
import Logo from "@/assets/logo.jpg"; // <-- IMPORTA A IMAGEM CERTO

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-secondary to-primary flex flex-col">
      {/* Header com Logo */}
      <header className="pt-8 pb-6 px-6 text-center animate-fade-in">
        <div className="w-32 h-32 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-2xl overflow-hidden">
          <img
            src={Logo} // <-- USA O IMPORT, NÃO O CAMINHO
            alt="Logo"
            className="w-full h-full object-contain p-2"
          />
        </div>

        <h1 className="text-4xl font-black text-white mb-2">
          Premium Açaiteria
        </h1>
        <p className="text-white/90 text-lg font-medium">
          O melhor açaí da região! 🍇
        </p>
      </header>

      {/* Imagens dos açaís */}
      <div className="flex-1 px-6 py-8 space-y-4 animate-slide-up">
        <div className="grid grid-cols-2 gap-4">
          <div className="aspect-square rounded-2xl bg-white/10 backdrop-blur-sm border-2 border-white/20 overflow-hidden shadow-xl">
            <img
              alt="Açaí delicioso"
              className="w-full h-full object-cover"
              src="/lovable-uploads/17512233-65c9-4d5a-a3d7-0f59f4536c28.png"
            />
          </div>

          <div className="aspect-square rounded-2xl bg-white/10 backdrop-blur-sm border-2 border-white/20 overflow-hidden shadow-xl">
            <img
              alt="Açaí com frutas"
              className="w-full h-full object-cover"
              src="/lovable-uploads/46005e10-a1eb-41db-bc23-38c1b25a0002.png"
            />
          </div>
        </div>

        <div className="rounded-2xl bg-white/10 backdrop-blur-sm border-2 border-white/20 overflow-hidden shadow-xl"></div>
      </div>

      {/* Destaques */}
      <div
        className="px-6 pb-6 space-y-3 animate-slide-up"
        style={{
          animationDelay: "0.1s",
        }}
      >
        <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30">
          <div className="flex items-center gap-3 text-white">
            <Sparkles className="w-6 h-6 text-accent" />
            <div>
              <p className="font-bold text-sm">Ingredientes Premium</p>
              <p className="text-xs opacity-90">
                Selecionados especialmente para você
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Botão de ação */}
      <div
        className="px-6 pb-8 animate-slide-up"
        style={{
          animationDelay: "0.2s",
        }}
      >
        <ActionButton variant="accent" onClick={() => navigate("/tamanho")}>
          <ShoppingBag className="w-6 h-6" />
          Fazer meu pedido
        </ActionButton>
        <p className="text-center text-white/80 text-sm mt-3 font-medium">
          Desenvolvido por{" "}
          <a
            href="https://gleybsonferreiradev.vercel.app/?fbclid=PAZXh0bgNhZW0CMTEAAafvAbrbe7x_5dzxOrky67Ljo1TStoz9FXYTvf6h3Xm8GShcNTRuQsxSNU3u_w_aem_fgXLK2ri4j9jL6mITalLXA"
            className="text-[aqua] font-semibold"
          >
            Gleybson Ferreira
          </a>
        </p>
      </div>
    </div>
  );
};

export default Home;
