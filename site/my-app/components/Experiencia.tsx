"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Droplets, Wrench, Gauge, Wifi, Coffee, Heart } from "lucide-react";

const servicos = [
  {
    icon: Droplets,
    title: "Água Potável",
    description: "Água fresca e limpa para hidratar seu corpo durante a jornada.",
    cor: "from-blue-400 to-cyan-500",
    animacaoTipo: "ondas",
  },
  {
    icon: Wrench,
    title: "Ferramentas",
    description: "Kit completo de ferramentas para pequenos reparos e ajustes.",
    cor: "from-wood to-wood-dark",
    animacaoTipo: "rotacao",
  },
  {
    icon: Gauge,
    title: "Calibragem",
    description: "Bomba de ar de alta pressão para manter seus pneus no ponto.",
    cor: "from-orange-400 to-red-500",
    animacaoTipo: "pulso",
  },
  {
    icon: Wifi,
    title: "Wi-Fi",
    description: "Conexão estável para compartilhar momentos ou trabalhar.",
    cor: "from-green-400 to-emerald-500",
    animacaoTipo: "ondas",
  },
  {
    icon: Coffee,
    title: "Descanso",
    description: "Espaço acolhedor para relaxar, comer e recarregar energias.",
    cor: "from-amber-400 to-orange-500",
    animacaoTipo: "vapor",
  },
  {
    icon: Heart,
    title: "Acolhimento",
    description: "Um cantinho de afeto, feito por quem entende de pedal.",
    cor: "from-red-400 to-pink-500",
    animacaoTipo: "batimento",
  },
];

function IconAnimation({ tipo, children }: { tipo: string; children: React.ReactNode }) {
  const animations = {
    ondas: {
      animate: { y: [0, -8, 0], scale: [1, 1.05, 1] },
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" as const },
    },
    rotacao: {
      animate: { rotate: [0, 15, -15, 0] },
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const },
    },
    pulso: {
      animate: { scale: [1, 1.2, 1], opacity: [1, 0.8, 1] },
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" as const },
    },
    vapor: {
      animate: { y: [0, -5, 0], opacity: [1, 0.6, 1] },
      transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" as const },
    },
    batimento: {
      animate: { scale: [1, 1.15, 1] },
      transition: { duration: 1, repeat: Infinity, ease: "easeInOut" as const },
    },
  };

  const anim = animations[tipo as keyof typeof animations] || animations.ondas;

  return (
    <motion.div
      animate={anim.animate}
      transition={anim.transition}
    >
      {children}
    </motion.div>
  );
}

function ServiceCard({ servico, index }: { servico: typeof servicos[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl bg-wood-dark/5 border border-wood/10 p-8 transition-all duration-500 hover:bg-wood-dark/10 hover:border-wood/30 hover:shadow-xl hover:shadow-wood/5">
        {/* Ícone com animação Framer Motion */}
        <div className={`mb-6 inline-flex p-4 rounded-xl bg-gradient-to-br ${servico.cor}`}>
          <IconAnimation tipo={servico.animacaoTipo}>
            <servico.icon size={32} className="text-white" />
          </IconAnimation>
        </div>

        {/* Conteúdo */}
        <h3 className="font-display text-2xl text-wood-dark mb-3 group-hover:text-forest transition-colors">
          {servico.title}
        </h3>
        <p className="font-body text-wood/80 leading-relaxed">
          {servico.description}
        </p>

        {/* Efeito de hover - brilho sutil */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-sunset/5 to-transparent" />
        </div>

        {/* Borda sutil que aparece no hover */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-wood to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}

export default function Experiencia() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="experiencia"
      ref={sectionRef}
      className="py-24 md:py-32 px-4 md:px-8 lg:px-16 relative"
    >
      {/* Background pattern sutil */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="font-rustic text-sunset text-sm tracking-[0.3em] uppercase"
          >
            O que você encontra aqui
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-wood-dark mt-4 mb-6"
          >
            Uma experiência
            <span className="block italic text-forest">de verdade</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="font-body text-lg text-wood/70 max-w-2xl mx-auto"
          >
            Cada detalhe pensado para transformar uma simples parada 
            em um momento memorável na sua jornada.
          </motion.p>
        </motion.div>

        {/* Grid de serviços */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {servicos.map((servico, index) => (
            <ServiceCard key={servico.title} servico={servico} index={index} />
          ))}
        </div>

        {/* Quote destacado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-20 md:mt-28 text-center"
        >
          <div className="wood-sign inline-block rounded-xl p-8 md:p-12 max-w-3xl">
            <p className="font-rustic text-cream text-lg md:text-xl leading-relaxed">
              "Não é só um ponto de apoio. É um refúgio que a rota revela 
              para quem pedala com o coração."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
