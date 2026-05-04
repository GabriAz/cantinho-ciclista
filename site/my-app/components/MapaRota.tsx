"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { MapPin, Navigation, Flag } from "lucide-react";

export default function MapaRota() {
  const sectionRef = useRef(null);
  const pathRef = useRef<SVGPathElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <section
      id="mapa"
      ref={sectionRef}
      className="py-24 md:py-32 px-4 md:px-8 lg:px-16 relative overflow-hidden"
    >
      {/* Background decorativo - textura de mapa antigo */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full">
          <pattern id="mapPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M0 50 Q25 30 50 50 T100 50" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            <path d="M0 70 Q25 50 50 70 T100 70" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            <circle cx="50" cy="50" r="1" fill="currentColor"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#mapPattern)"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="font-rustic text-sunset text-sm tracking-[0.3em] uppercase"
          >
            Localização Estratégica
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-wood-dark mt-4 mb-6"
          >
            A rota te leva
            <span className="block italic text-forest">até aqui</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="font-body text-lg text-wood/70 max-w-2xl mx-auto"
          >
            Posicionado estrategicamente para ser descoberto no momento exato 
            em que você mais precisa de um descanso.
          </motion.p>
        </motion.div>

        {/* Mapa estilizado */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative bg-cream-dark/30 rounded-3xl p-8 md:p-12 border border-wood/10"
          >
            {/* Container do mapa SVG */}
            <div className="relative aspect-[16/9] md:aspect-[21/9]">
              <svg
                viewBox="0 0 800 300"
                className="w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Definições de gradientes e marcadores */}
                <defs>
                  <linearGradient id="trailGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8B6F47" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#D4A574" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#E8C547" stopOpacity="1" />
                  </linearGradient>
                  <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#E8C547" />
                  </marker>
                </defs>

                {/* Fundo do mapa - estradas secundárias */}
                <path
                  d="M50,150 Q200,100 350,140 T650,130 L750,150"
                  fill="none"
                  stroke="#C4A77D"
                  strokeWidth="2"
                  strokeDasharray="8,4"
                  opacity="0.4"
                />
                
                <path
                  d="M100,200 Q300,180 500,190 T700,185"
                  fill="none"
                  stroke="#C4A77D"
                  strokeWidth="2"
                  strokeDasharray="8,4"
                  opacity="0.4"
                />

                {/* Trilha principal animada - a rota até o Cantinho */}
                <motion.path
                  ref={pathRef}
                  d="M50,120 C150,120 200,80 300,100 S400,150 500,130 S650,100 720,120"
                  fill="none"
                  stroke="url(#trailGradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  markerEnd="url(#arrowhead)"
                  style={{ pathLength }}
                />

                {/* Pontos de interesse na rota */}
                {/* Início */}
                <g>
                  <circle cx="50" cy="120" r="8" fill="#5C4033" />
                  <circle cx="50" cy="120" r="12" fill="none" stroke="#5C4033" strokeWidth="2" opacity="0.5">
                    <animate attributeName="r" values="12;16;12" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <text x="50" y="145" textAnchor="middle" fontSize="12" fill="#5C4033" fontFamily="var(--font-rustic)">Partida</text>
                </g>

                {/* Ponto intermediário 1 */}
                <g>
                  <circle cx="300" cy="100" r="6" fill="#8B6F47" opacity="0.6" />
                </g>

                {/* Ponto intermediário 2 */}
                <g>
                  <circle cx="500" cy="130" r="6" fill="#8B6F47" opacity="0.6" />
                </g>

                {/* O Cantinho - destino */}
                <motion.g
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                >
                  {/* Círculo pulsante */}
                  <circle cx="720" cy="120" r="20" fill="#E8C547" opacity="0.3">
                    <animate attributeName="r" values="20;30;20" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
                  </circle>
                  {/* Marcador principal */}
                  <circle cx="720" cy="120" r="12" fill="#E8C547" stroke="#5C4033" strokeWidth="3" />
                  {/* Ícone de bandeira */}
                  <text x="720" y="125" textAnchor="middle" fontSize="14" fill="#5C4033">🚴</text>
                </motion.g>

                {/* Label do Cantinho */}
                <motion.g
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1 }}
                >
                  <rect x="640" y="80" width="140" height="30" rx="4" fill="#5C4033" />
                  <text x="710" y="100" textAnchor="middle" fontSize="14" fill="#F5F0E6" fontFamily="var(--font-rustic)" fontWeight="bold">
                    Cantinho a Bicicleta
                  </text>
                </motion.g>

                {/* Elementos decorativos - árvores */}
                <g opacity="0.3">
                  <path d="M150,220 L155,200 L160,220 Z" fill="#2D4A3E" />
                  <path d="M152,205 L155,185 L158,205 Z" fill="#2D4A3E" />
                  
                  <path d="M400,240 L408,210 L416,240 Z" fill="#2D4A3E" />
                  <path d="M404,218 L408,190 L412,218 Z" fill="#2D4A3E" />
                  
                  <path d="M600,230 L606,205 L612,230 Z" fill="#2D4A3E" />
                  <path d="M603,212 L606,190 L609,212 Z" fill="#2D4A3E" />
                </g>
              </svg>

              {/* Overlay de informações */}
              <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 bg-cream/95 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg border border-wood/10">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-forest/10 rounded-lg">
                    <Navigation size={20} className="text-forest" />
                  </div>
                  <div>
                    <p className="font-rustic text-xs text-wood/60 uppercase tracking-wider">Localização</p>
                    <p className="font-body text-wood-dark font-medium">Rodovia Principal</p>
                    <p className="font-body text-sm text-wood/70">Km 47 - Fazenda Bela Vida</p>
                  </div>
                </div>
              </div>

              {/* Indicador de distância */}
              <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-cream/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-wood/10">
                <div className="flex items-center gap-2">
                  <Flag size={16} className="text-sunset" />
                  <span className="font-rustic text-wood-dark">Você chegou!</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Cards de acesso */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {[
              { label: "Acesso", value: "Fácil acesso pela rodovia", icon: MapPin },
              { label: "Visibilidade", value: "Sinalização clara na estrada", icon: Navigation },
              { label: "Estacionamento", value: "Espaço seguro para bikes", icon: Flag },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-cream-dark/50 rounded-xl p-4 flex items-center gap-4 border border-wood/10"
              >
                <div className="p-2 bg-wood/10 rounded-lg">
                  <item.icon size={20} className="text-wood-dark" />
                </div>
                <div>
                  <p className="font-rustic text-xs text-wood/60 uppercase">{item.label}</p>
                  <p className="font-body text-sm text-wood-dark">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
