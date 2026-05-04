"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax para diferentes camadas
  const skyY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const sunY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const mountainY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const treesY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const sunScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToContent = () => {
    const element = document.getElementById("experiencia");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-forest-dark"
    >
      {/* CAMADA 1: Céu com gradiente de entardecer cinematográfico */}
      <motion.div
        style={{ y: skyY }}
        className="absolute inset-0 z-0"
      >
        {/* Gradiente principal do pôr do sol */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-purple-800 to-amber-600" />
        
        {/* Gradiente de transição para o horizonte */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/40 to-orange-600/60" />
        
        {/* Glow no topo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-radial from-amber-300/20 via-transparent to-transparent" />
      </motion.div>

      {/* CAMADA 2: Sol dourado sutil */}
      <motion.div
        style={{ y: sunY, scale: sunScale }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="relative">
          {/* Halo externo */}
          <div className="absolute inset-0 w-64 h-64 md:w-96 md:h-96 rounded-full bg-gradient-radial from-amber-400/30 via-orange-500/10 to-transparent blur-3xl" />
          {/* Sol central */}
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-b from-amber-200 via-orange-400 to-amber-600 opacity-90 blur-sm" />
          {/* Brilho intenso */}
          <div className="absolute inset-0 w-32 h-32 md:w-48 md:h-48 rounded-full bg-amber-100/50 blur-xl" />
        </div>
      </motion.div>

      {/* CAMADA 3: Silhuetas de montanhas distantes */}
      <motion.div
        style={{ y: mountainY }}
        className="absolute bottom-0 left-0 right-0 z-20 opacity-60"
      >
        <svg
          viewBox="0 0 1440 400"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1A2F28" />
              <stop offset="100%" stopColor="#2D4A3E" />
            </linearGradient>
          </defs>
          {/* Montanha distante 1 */}
          <path
            fill="url(#mountainGrad)"
            d="M0,300 Q200,150 400,280 T800,250 T1200,300 L1440,280 L1440,400 L0,400 Z"
          />
        </svg>
      </motion.div>

      {/* CAMADA 4: Silhuetas de árvores/cerrado */}
      <motion.div
        style={{ y: treesY }}
        className="absolute bottom-0 left-0 right-0 z-30"
      >
        <svg
          viewBox="0 0 1440 300"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="treeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0F1F1A" />
              <stop offset="100%" stopColor="#1A2F28" />
            </linearGradient>
          </defs>
          
          {/* Linha de árvores do cerrado */}
          <path
            fill="url(#treeGrad)"
            d="M0,250 
               Q50,200 100,240 Q150,180 200,230 
               Q250,160 300,220 Q350,190 400,240
               Q450,170 500,230 Q550,200 600,250
               Q650,180 700,240 Q750,210 800,260
               Q850,190 900,240 Q950,200 1000,250
               Q1050,180 1100,230 Q1150,200 1200,240
               Q1250,170 1300,220 Q1350,190 1400,230
               L1440,230 L1440,300 L0,300 Z"
          />
          
          {/* Árvores individuais em destaque */}
          <g fill="#0F1F1A">
            {/* Árvore 1 */}
            <ellipse cx="200" cy="200" rx="40" ry="80" />
            <rect x="195" y="260" width="10" height="40" />
            
            {/* Árvore 2 */}
            <ellipse cx="600" cy="180" rx="50" ry="100" />
            <rect x="590" y="270" width="12" height="30" />
            
            {/* Árvore 3 */}
            <ellipse cx="1000" cy="190" rx="45" ry="90" />
            <rect x="990" y="265" width="10" height="35" />
            
            {/* Árvore 4 */}
            <ellipse cx="1250" cy="210" rx="35" ry="70" />
            <rect x="1245" y="270" width="8" height="30" />
          </g>
        </svg>
      </motion.div>

      {/* CAMADA 5: Gradiente escurecendo no topo do texto */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute inset-0 z-40 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark via-forest-dark/50 to-transparent" />
      </motion.div>

      {/* CONTEÚDO TEXTUAL */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute inset-0 z-50 flex flex-col items-center justify-center px-4 pointer-events-none"
      >
        <div className="text-center max-w-4xl">
          {/* Tagline pequena com brilho */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-rustic text-amber-300 text-sm md:text-base tracking-[0.3em] uppercase mb-6 drop-shadow-lg"
          >
            Fazenda Bela Vida
          </motion.p>

          {/* Título principal com sombra sutil */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl text-cream mb-6 leading-tight drop-shadow-2xl"
          >
            Cantinho
            <span className="block text-amber-300 italic drop-shadow-2xl">do Ciclista</span>
          </motion.h1>

          {/* Manifesto */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-body text-xl md:text-2xl text-cream/95 max-w-2xl mx-auto leading-relaxed drop-shadow-lg"
          >
            No meio do caminho, existe um lugar para respirar.
          </motion.p>

          {/* Assinatura */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="font-rustic text-amber-200/90 text-lg md:text-xl mt-8 tracking-wider drop-shadow"
          >
            Pedale. Respire. Aproveite.
          </motion.p>
        </div>
      </motion.div>

      {/* SCROLL INDICATOR */}
      <motion.button
        onClick={scrollToContent}
        style={{ opacity: contentOpacity }}
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 text-cream/80 hover:text-amber-300 transition-colors cursor-pointer drop-shadow"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-rustic text-xs tracking-widest uppercase">Descubra</span>
          <ChevronDown size={24} />
        </motion.div>
      </motion.button>

      {/* BORDA DECORATIVA INFERIOR - transição suave para próxima seção */}
      <div className="absolute bottom-0 left-0 right-0 z-50">
        <svg viewBox="0 0 1440 100" className="w-full h-auto" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="var(--bg-primary)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--bg-primary)" />
            </linearGradient>
          </defs>
          <path
            fill="url(#waveGrad)"
            d="M0,100 L0,50 Q360,100 720,50 Q1080,0 1440,50 L1440,100 Z"
          />
        </svg>
      </div>

      {/* PARTÍCULAS DE LUZ DO ENTARDECER - efeito sutil */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-300/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </section>
  );
}
