"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, Clock, ArrowRight, Mountain, Trees, Bike, Route, MapPinned } from "lucide-react";

// Rota 1: Goiânia até Cantinho (via Trilha da Coxinha)
const rotaPrincipal = [
  {
    ponto: "Goiânia",
    descricao: "Partida do Centro ou Jardim Novo Mundo",
    distancia: "0 km",
    tempo: "Início",
    icone: Navigation,
    detalhes: "Saída pela GO-403 ou BR-153, sentido Luziânia/Trindade",
  },
  {
    ponto: "Senador Canedo",
    descricao: "Passagem pela cidade",
    distancia: "~15 km",
    tempo: "~30 min",
    icone: MapPin,
    detalhes: "Continuar na GO-403, seguir placas para Caldazinha",
  },
  {
    ponto: "Caldazinha",
    descricao: "Entrada na Trilha da Coxinha",
    distancia: "~25 km",
    tempo: "~50 min",
    icone: Mountain,
    detalhes: "Procurar acesso à Trilha da Coxinha (estrada de terra bem sinalizada)",
  },
  {
    ponto: "Cantinho do Ciclista",
    descricao: "Fazenda Bela Vida",
    distancia: "~45 km",
    tempo: "~1h 15min",
    icone: Trees,
    detalhes: "Após 12km na trilha, chegada ao Cantinho do Ciclista",
  },
];

// Rota 2: Direto pela Trilha da Coxinha (para quem já está na trilha)
const rotaTrilha = [
  {
    ponto: "Início Trilha da Coxinha",
    descricao: "Ponto de encontro dos ciclistas",
    distancia: "0 km",
    tempo: "Início",
    icone: Bike,
    detalhes: "Estacionamento e ponto de partida da trilha",
  },
  {
    ponto: "Capela Nossa Senhora Aparecida",
    descricao: "Marco intermediário",
    distancia: "~5 km",
    tempo: "~15 min",
    icone: MapPinned,
    detalhes: "Pequena capela à beira da trilha, ponto de referência",
  },
  {
    ponto: "Rancho Belo Amanhecer",
    descricao: "Área de descanso",
    distancia: "~8 km",
    tempo: "~25 min",
    icone: Route,
    detalhes: "Rancho à beira da trilha, último ponto antes do Cantinho",
  },
  {
    ponto: "Cantinho do Ciclista",
    descricao: "Fazenda Bela Vida",
    distancia: "~12 km",
    tempo: "~35 min",
    icone: Trees,
    detalhes: "Destino final - água, ferramentas, calibragem e descanso",
  },
];

export default function Itinerario() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState<"principal" | "trilha">("principal");

  const etapasAtivas = activeTab === "principal" ? rotaPrincipal : rotaTrilha;

  return (
    <section
      id="itinerario"
      ref={sectionRef}
      className="py-24 md:py-32 px-4 md:px-8 lg:px-16 relative overflow-hidden"
    >
      {/* Background decorativo - pontos sutis */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dotPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="currentColor"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotPattern)"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="font-rustic text-sunset text-sm tracking-[0.3em] uppercase"
          >
            Como Chegar
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-wood-dark mt-4 mb-6"
          >
            Encontre o Cantinho
            <span className="block italic text-forest">na Trilha da Coxinha</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="font-body text-lg text-wood/70 max-w-3xl mx-auto"
          >
            Dois caminhos para chegar até nós. Escolha a rota completa saindo de Goiânia 
            ou vá direto pela Trilha da Coxinha se já estiver por lá.
          </motion.p>
        </motion.div>

        {/* Tabs para alternar entre rotas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-cream-dark/30 rounded-full p-1.5 flex gap-2 border border-wood/10">
            <button
              onClick={() => setActiveTab("principal")}
              className={`px-6 py-3 rounded-full font-rustic text-sm transition-all duration-300 ${
                activeTab === "principal"
                  ? "bg-wood text-cream shadow-md"
                  : "text-wood/70 hover:text-wood"
              }`}
            >
              De Goiânia (45km)
            </button>
            <button
              onClick={() => setActiveTab("trilha")}
              className={`px-6 py-3 rounded-full font-rustic text-sm transition-all duration-300 ${
                activeTab === "trilha"
                  ? "bg-wood text-cream shadow-md"
                  : "text-wood/70 hover:text-wood"
              }`}
            >
              Pela Trilha (12km)
            </button>
          </div>
        </motion.div>

        {/* Grid com Mapa Interativo e Etapas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Coluna do Mapa Interativo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-wood/20 bg-wood-dark"
              >
                {/* Imagem da rota com zoom interativo */}
                <div className="relative group cursor-zoom-in">
                  <motion.img
                    src={activeTab === "principal" ? "/images/rota-goiania.png" : "/images/rota-trilha.png"}
                    alt={activeTab === "principal" 
                      ? "Rota de Goiânia até o Cantinho do Ciclista via Trilha da Coxinha - 45km" 
                      : "Rota pela Trilha da Coxinha até o Cantinho do Ciclista - 12km"}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay informativo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/80 via-forest-dark/20 to-transparent pointer-events-none" />
                  
                  {/* Título da rota na imagem */}
                  <div className="absolute top-4 left-4 bg-forest-dark/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <p className="font-rustic text-cream text-sm">
                      {activeTab === "principal" ? "🚗 Goiânia → Cantinho (45km)" : "🚴 Trilha → Cantinho (12km)"}
                    </p>
                  </div>

                  {/* Badge de coordenadas */}
                  <div className="absolute top-4 right-4 bg-forest-dark/90 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                    <p className="font-rustic text-cream/80 text-xs">16°45&apos;23.1&quot;S 48°58&apos;21.3&quot;W</p>
                  </div>

                  {/* Indicador de zoom no hover */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-forest-dark/70 backdrop-blur-sm px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="font-rustic text-cream text-xs">🔍 Passe o mouse para ampliar</p>
                  </div>
                </div>

                {/* Barra de ações do mapa */}
                <div className="bg-cream-dark/50 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-wood/20 flex items-center justify-center">
                      <MapPinned size={20} className="text-wood-dark" />
                    </div>
                    <div>
                      <p className="font-display text-wood-dark text-sm">
                        {activeTab === "principal" ? "Rota Completa" : "Rota da Trilha"}
                      </p>
                      <p className="font-rustic text-wood/60 text-xs">
                        {activeTab === "principal" ? "Via GO-403 e Trilha da Coxinha" : "Direto pela trilha de terra"}
                      </p>
                    </div>
                  </div>
                  
                  <a
                    href="https://www.google.com/maps/place/16%C2%B045'23.1%22S+48%C2%B058'21.3%22W/@-16.7565876,-48.972678,181m/data=!3m1!1e3!4m10!1m5!3m4!2zMTbCsDQ1JzIzLjEiUyA0OMKwNTgnMjEuMyJX!8m2!3d-16.7564074!4d-48.9725943!3m3!8m2!3d-16.7564074!4d-48.9725943?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="wood-sign px-4 py-2 rounded-lg text-cream text-sm font-rustic hover:scale-105 transition-transform flex items-center gap-2"
                  >
                    <Navigation size={16} />
                    <span>Abrir Maps</span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Info da rota selecionada */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-6 grid grid-cols-3 gap-4 text-sm"
            >
              <div className="bg-cream-dark/30 rounded-xl p-4 text-center border border-wood/10">
                <Clock size={20} className="mx-auto mb-2 text-sunset" />
                <p className="font-rustic text-wood/60 text-xs">Tempo</p>
                <p className="font-display text-wood-dark">
                  {activeTab === "principal" ? "~1h 15min" : "~35 min"}
                </p>
              </div>
              <div className="bg-cream-dark/30 rounded-xl p-4 text-center border border-wood/10">
                <Route size={20} className="mx-auto mb-2 text-forest" />
                <p className="font-rustic text-wood/60 text-xs">Distância</p>
                <p className="font-display text-wood-dark">
                  {activeTab === "principal" ? "~45 km" : "~12 km"}
                </p>
              </div>
              <div className="bg-cream-dark/30 rounded-xl p-4 text-center border border-wood/10">
                <Bike size={20} className="mx-auto mb-2 text-wood" />
                <p className="font-rustic text-wood/60 text-xs">Dificuldade</p>
                <p className="font-display text-wood-dark">Moderada</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Coluna das Etapas */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {etapasAtivas.map((etapa, index) => (
                  <motion.div
                    key={etapa.ponto}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="relative group"
                  >
                    {/* Card da etapa */}
                    <div className="bg-cream-dark/30 rounded-xl p-5 border border-wood/10 hover:border-wood/30 transition-all duration-300 hover:shadow-lg">
                      <div className="flex items-start gap-4">
                        {/* Ícone */}
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                          index === etapasAtivas.length - 1 
                            ? "bg-sunset text-white" 
                            : "bg-wood text-cream"
                        }`}>
                          <etapa.icone size={22} />
                        </div>

                        {/* Conteúdo */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <h3 className="font-display text-lg text-wood-dark">
                              {etapa.ponto}
                            </h3>
                            <div className="text-right">
                              <p className="font-rustic text-xs text-sunset">{etapa.distancia}</p>
                              <p className="font-rustic text-xs text-wood/50">{etapa.tempo}</p>
                            </div>
                          </div>
                          
                          <p className="font-body text-wood/80 text-sm mb-1">
                            {etapa.descricao}
                          </p>
                          <p className="font-rustic text-xs text-wood/60">
                            {etapa.detalhes}
                          </p>
                        </div>

                        {/* Arrow (se não for último) */}
                        {index < etapasAtivas.length - 1 && (
                          <div className="hidden md:flex items-center justify-center w-8">
                            <ArrowRight size={16} className="text-wood/30" />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* CTA para rota */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 }}
              className="mt-8"
            >
              <a
                href="https://www.google.com/maps/place/16%C2%B045'23.1%22S+48%C2%B058'21.3%22W/@-16.7565876,-48.972678,181m/data=!3m1!1e3!4m10!1m5!3m4!2zMTbCsDQ1JzIzLjEiUyA0OMKwNTgnMjEuMyJX!8m2!3d-16.7564074!4d-48.9725943!3m3!8m2!3d-16.7564074!4d-48.9725943?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="wood-sign inline-flex items-center gap-3 px-8 py-4 rounded-xl text-cream hover:scale-105 transition-transform w-full justify-center"
              >
                <MapPinned size={24} className="text-sunset-gold" />
                <span className="font-rustic text-lg">Abrir Rota no Google Maps</span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Info adicional */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-cream-dark/20 rounded-xl p-6 text-center border border-wood/10">
            <Trees size={32} className="mx-auto mb-3 text-forest" />
            <h4 className="font-display text-lg text-wood-dark mb-1">Localização Exata</h4>
            <p className="font-body text-sm text-wood/70">Fazenda Bela Vida, à 12km do início da Trilha da Coxinha, próximo a Caldazinha/GO</p>
          </div>
          <div className="bg-cream-dark/20 rounded-xl p-6 text-center border border-wood/10">
            <Mountain size={32} className="mx-auto mb-3 text-sunset" />
            <h4 className="font-display text-lg text-wood-dark mb-1">Trilha da Coxinha</h4>
            <p className="font-body text-sm text-wood/70">Trilha de terra bem sinalizada, passando pelo Rancho Belo Amanhecer e Capela N. Sra. Aparecida</p>
          </div>
          <div className="bg-cream-dark/20 rounded-xl p-6 text-center border border-wood/10">
            <Navigation size={32} className="mx-auto mb-3 text-wood" />
            <h4 className="font-display text-lg text-wood-dark mb-1">Como Chegar de Carro</h4>
            <p className="font-body text-sm text-wood/70">Siga pela GO-403 até Caldazinha, depois entre na estrada de terra da Trilha da Coxinha</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
