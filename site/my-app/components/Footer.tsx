"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Bike, Heart, Code2 } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLDivElement>(null);
  
  // Animação baseada no scroll (perfeito para mobile)
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  // Mapeia o progresso do scroll para a posição e preenchimento da bicicleta
  const bikeX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const pathWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const wheelRotate = useTransform(scrollYProgress, [0, 1], [0, 1440]); // Gira as rodas

  return (
    <footer ref={footerRef} className="py-16 px-4 md:px-8 lg:px-16 border-t border-wood/10 relative overflow-hidden">
      {/* Fundo decorativo sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-wood/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Assinatura Impressionante & Responsiva (Scroll-driven) */}
        <div className="relative mb-24 max-w-5xl mx-auto pt-8">
          
          {/* A Trilha da Bicicleta (Fundo) */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-wood/10 rounded-full" />
          
          {/* A Trilha Iluminada (Preenche com o scroll) */}
          <motion.div 
            className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-forest/40 via-forest to-sunset rounded-full origin-left"
            style={{ width: pathWidth }}
          />
          
          {/* A Bicicleta que acompanha o scroll */}
          <motion.div 
            className="absolute top-[-14px] text-forest drop-shadow-md flex items-center -ml-4"
            style={{ left: bikeX }}
          >
            <motion.div style={{ rotate: wheelRotate }}>
               <Bike size={28} className="text-forest fill-forest/10" />
            </motion.div>
            {/* Rastro de vento (ilusão de velocidade) */}
            <motion.div 
              className="absolute right-7 top-1/2 w-6 h-[2px] bg-gradient-to-l from-forest/40 to-transparent rounded-full"
              initial={{ opacity: 0, x: 5 }}
              animate={{ opacity: [0, 1, 0], x: [5, -5, -15] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-16 px-4 md:px-8">
            
            {/* Idealizadores */}
            <motion.div 
              className="flex-1 text-center md:text-left group"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
                <Heart size={14} className="text-sunset/60 fill-sunset/20" />
                <span className="font-rustic text-xs tracking-[0.3em] uppercase text-wood/50">
                  Idealizadores
                </span>
              </div>
              
              <div className="flex flex-col gap-3">
                {['Arnaldo Fagundes', 'Antonio Carlos Fagundes', 'Fábio Fagundes'].map((name, i) => (
                  <motion.div 
                    key={name}
                    className="font-display text-wood-dark text-2xl md:text-3xl transition-colors duration-500 hover:text-forest cursor-default"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {name}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Separador Central Escondido no Mobile, Visível no Desktop */}
            <div className="hidden md:flex flex-col items-center justify-center shrink-0 w-px h-40 bg-gradient-to-b from-transparent via-wood/20 to-transparent relative">
               <motion.div 
                 className="absolute bg-[#faf7f2] p-3 rounded-full border border-wood/10 shadow-sm"
                 animate={{ rotate: 360 }}
                 transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
               >
                 <Bike size={20} className="text-wood/40" />
               </motion.div>
            </div>

            {/* Separador Mobile */}
            <div className="md:hidden w-40 h-px bg-gradient-to-r from-transparent via-wood/20 to-transparent relative flex items-center justify-center my-4">
               <motion.div 
                 className="absolute bg-[#faf7f2] p-2 rounded-full border border-wood/10 shadow-sm"
                 animate={{ rotate: 360 }}
                 transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
               >
                 <Bike size={16} className="text-wood/40" />
               </motion.div>
            </div>

            {/* Desenvolvedor */}
            <motion.div 
              className="flex-1 text-center md:text-right group"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center md:justify-end gap-2 mb-6">
                <Code2 size={14} className="text-wood/50" />
                <span className="font-rustic text-xs tracking-[0.3em] uppercase text-wood/50">
                  Desenvolvedor
                </span>
              </div>
              
              <motion.div 
                className="font-display text-wood-dark text-2xl md:text-3xl inline-block transition-colors duration-500 hover:text-sunset cursor-default"
                whileHover={{ scale: 1.05, originX: 1 }}
              >
                Gabriel Guimarães
              </motion.div>
            </motion.div>
            
          </div>
        </div>

        {/* Footer Principal */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-wood/10">
          {/* Logo e nome */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <div className="p-2 bg-forest/10 rounded-lg">
              <Bike size={24} className="text-forest" />
            </div>
            <div>
              <p className="font-display text-lg text-wood-dark">
                Cantinho do Ciclista
              </p>
              <p className="font-rustic text-xs text-wood/60 tracking-wider">
                FAZENDA BELA VIDA
              </p>
            </div>
          </motion.div>

          {/* Frase */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-rustic text-wood/50 text-sm text-center"
          >
            Pedale. Respire. Aproveite.
          </motion.p>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-sm text-wood/60"
          >
            <span>© {currentYear}</span>
            <span className="text-sunset">|</span>
            <span>Todos os direitos reservados</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
