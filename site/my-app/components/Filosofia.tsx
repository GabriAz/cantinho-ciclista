"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Pause, Wind, Heart, Users } from "lucide-react";

const pilares = [
  {
    icon: Pause,
    titulo: "Pausa",
    subtitulo: "O descanso que a rota pede",
    descricao: "Não é sobre parar. É sobre permitir-se um momento fora do tempo, onde o único compromisso é com você mesmo.",
    quote: "A estrada continua. Mas aqui, você pode simplesmente existir.",
  },
  {
    icon: Wind,
    titulo: "Respiro",
    subtitulo: "Ar puro, mente clara",
    descricao: "Entre uma subida e outra, entre o suor e o vento, encontrar espaço para respirar profundamente.",
    quote: "Cada respiração aqui é lembrança de por que você pedala.",
  },
  {
    icon: Heart,
    titulo: "Cuidado",
    subtitulo: "Feito para quem pedala",
    descricao: "Cada detalhe pensado por quem entende a dor nas pernas e a alegria de quem descobre um lugar assim na estrada.",
    quote: "A gente cuida porque a gente também pedala.",
  },
  {
    icon: Users,
    titulo: "Comunidade",
    subtitulo: "O encontro que a estrada proporciona",
    descricao: "Ciclistas de todos os lugares encontram aqui um ponto em comum: o amor pela jornada.",
    quote: "Na estrada, somos todos vizinhos.",
  },
];

function PillarCard({ pilar, index }: { pilar: typeof pilares[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="relative group"
    >
      <div className="relative p-8 md:p-10 rounded-2xl bg-gradient-to-br from-wood/5 to-transparent border border-wood/10 hover:border-wood/30 transition-all duration-500 hover:bg-wood/5">
        {/* Número do pilar */}
        <span className="absolute top-4 right-4 font-rustic text-6xl text-wood/10 group-hover:text-wood/20 transition-colors">
          0{index + 1}
        </span>

        {/* Ícone */}
        <div className="mb-6 inline-flex p-4 rounded-full bg-forest/10 group-hover:bg-forest/20 transition-colors">
          <pilar.icon size={28} className="text-forest" />
        </div>

        {/* Título */}
        <h3 className="font-display text-3xl md:text-4xl text-wood-dark mb-2 group-hover:text-forest transition-colors">
          {pilar.titulo}
        </h3>
        <p className="font-rustic text-sunset text-sm tracking-wider uppercase mb-4">
          {pilar.subtitulo}
        </p>

        {/* Descrição */}
        <p className="font-body text-wood/70 leading-relaxed mb-6">
          {pilar.descricao}
        </p>

        {/* Quote */}
        <div className="border-l-2 border-sunset pl-4">
          <p className="font-display text-lg text-wood-dark/80 italic">
            {pilar.quote}
          </p>
        </div>

        {/* Decorativo */}
        <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-sunset to-wood group-hover:w-full transition-all duration-700 rounded-b-2xl" />
      </div>
    </motion.div>
  );
}

export default function Filosofia() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 px-4 md:px-8 lg:px-16 relative overflow-hidden"
    >
      {/* Elementos decorativos flutuantes */}
      <motion.div
        style={{ y }}
        className="absolute top-20 right-10 opacity-10 pointer-events-none"
      >
        <svg width="200" height="200" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="0.5" fill="none" />
        </svg>
      </motion.div>

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
            Filosofia
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-wood-dark mt-4 mb-6"
          >
            O que nos move
            <span className="block italic text-forest">além do pedal</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="font-body text-lg text-wood/70 max-w-2xl mx-auto"
          >
            O Cantinho a Bicicleta nasceu de um sentimento: a necessidade 
            de criar um espaço que entenda a alma de quem pedala.
          </motion.p>
        </motion.div>

        {/* Pilares em grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-20">
          {pilares.map((pilar, index) => (
            <PillarCard key={pilar.titulo} pilar={pilar} index={index} />
          ))}
        </div>

        {/* Manifesto final */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="wood-sign rounded-2xl p-8 md:p-16 text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl text-cream mb-6"
          >
            Pedale.
            <span className="text-sunset-gold"> Respire. </span>
            Aproveite.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="font-rustic text-cream/80 text-lg md:text-xl"
          >
            — O mantra do ciclista que encontrou seu cantinho na rota
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
