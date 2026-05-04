"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, MessageCircle, Camera, Navigation, Clock, Phone } from "lucide-react";

const acoes = [
  {
    icon: Navigation,
    titulo: "Como Chegar",
    descricao: "Abra no Google Maps",
    href: "https://maps.google.com/?q=Fazenda+Bela+Vida",
    cor: "from-green-500 to-emerald-600",
    externo: true,
  },
  {
    icon: MapPin,
    titulo: "Salvar Localização",
    descricao: "Adicione aos favoritos",
    href: "#",
    cor: "from-wood to-wood-dark",
    externo: false,
  },
  {
    icon: MessageCircle,
    titulo: "Falar no WhatsApp",
    descricao: "Envie uma mensagem",
    href: "https://wa.me/5511999999999",
    cor: "from-green-500 to-green-600",
    externo: true,
  },
  {
    icon: Camera,
    titulo: "Seguir no Instagram",
    descricao: "@cantinhoabicicleta",
    href: "https://instagram.com/cantinhoabicicleta",
    cor: "from-purple-500 to-pink-500",
    externo: true,
  },
];

export default function ChamadaFinal() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 px-4 md:px-8 lg:px-16 relative"
    >
      {/* Background com gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-forest/5 to-forest/10 pointer-events-none" />

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
            Visite
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-wood-dark mt-4 mb-6"
          >
            A estrada espera,
            <span className="block italic text-forest">e nós também</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="font-body text-lg text-wood/70 max-w-2xl mx-auto"
          >
            Estamos aqui, prontos para receber você da melhor maneira possível. 
            Venha descobrir seu novo ponto de parada favorito.
          </motion.p>
        </motion.div>

        {/* Grid de ações */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
          {acoes.map((acao, index) => (
            <motion.a
              key={acao.titulo}
              href={acao.href}
              target={acao.externo ? "_blank" : undefined}
              rel={acao.externo ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden rounded-2xl bg-cream-dark/50 border border-wood/10 p-6 hover:border-wood/30 transition-all duration-300 hover:shadow-xl"
            >
              {/* Ícone com gradiente */}
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${acao.cor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <acao.icon size={24} className="text-white" />
              </div>

              {/* Conteúdo */}
              <h3 className="font-display text-xl text-wood-dark mb-1 group-hover:text-forest transition-colors">
                {acao.titulo}
              </h3>
              <p className="font-body text-sm text-wood/60">
                {acao.descricao}
              </p>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-sunset/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.a>
          ))}
        </div>

        {/* Informações práticas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="wood-sign rounded-2xl p-8 md:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Horário */}
            <div className="flex flex-col items-center">
              <div className="p-3 bg-cream/10 rounded-full mb-4">
                <Clock size={24} className="text-sunset-gold" />
              </div>
              <h4 className="font-rustic text-cream text-lg mb-2">Horário</h4>
              <p className="font-body text-cream/80">
                Todos os dias<br />
                6h às 18h
              </p>
            </div>

            {/* Localização */}
            <div className="flex flex-col items-center">
              <div className="p-3 bg-cream/10 rounded-full mb-4">
                <MapPin size={24} className="text-sunset-gold" />
              </div>
              <h4 className="font-rustic text-cream text-lg mb-2">Onde Estamos</h4>
              <p className="font-body text-cream/80">
                Rodovia Principal, Km 47<br />
                Fazenda Bela Vida
              </p>
            </div>

            {/* Contato */}
            <div className="flex flex-col items-center">
              <div className="p-3 bg-cream/10 rounded-full mb-4">
                <Phone size={24} className="text-sunset-gold" />
              </div>
              <h4 className="font-rustic text-cream text-lg mb-2">Contato</h4>
              <p className="font-body text-cream/80">
                WhatsApp<br />
                (11) 99999-9999
              </p>
            </div>
          </div>
        </motion.div>

        {/* Frase final */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="font-display text-2xl md:text-3xl text-wood-dark/60 italic">
            "Até breve na estrada"
          </p>
        </motion.div>
      </div>
    </section>
  );
}
