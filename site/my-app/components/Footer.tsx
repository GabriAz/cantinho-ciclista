"use client";

import { motion } from "framer-motion";
import { Bike, Heart, Wrench, Droplets } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 md:px-8 lg:px-16 border-t border-wood/10">
      <div className="max-w-7xl mx-auto">
        {/* Assinatura Minimalista Interativa */}
        <motion.div
          initial="initial"
          whileInView="visible"
          whileHover="hover"
          viewport={{ once: true }}
          variants={{
            initial: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            hover: {}
          }}
          className="relative mb-16 max-w-4xl mx-auto overflow-hidden rounded-2xl bg-wood/5 group cursor-default border border-wood/0 hover:border-wood/10 transition-colors duration-500"
        >
          <div className="px-8 md:px-16 py-12 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            {/* Pista Invisível que aparece no hover */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-forest/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Bicicleta que passeia no hover */}
            <motion.div
              className="absolute bottom-0 left-0 text-forest"
              variants={{
                initial: { x: -50, opacity: 0 },
                hover: { 
                  x: [ -50, 1000 ], 
                  opacity: [0, 1, 1, 0], 
                  transition: { duration: 5, ease: "linear", repeat: Infinity } 
                }
              }}
            >
              <Bike size={20} className="mb-1" />
            </motion.div>

            {/* Idealizadores */}
            <div className="text-center md:text-right relative z-10 flex-1">
              <span className="font-rustic text-[10px] tracking-[0.3em] uppercase text-wood/40 block mb-3">
                Idealizadores
              </span>
              <div className="flex flex-col gap-1">
                <span className="font-display text-wood-dark text-xl md:text-2xl transition-colors duration-300 group-hover:text-forest">
                  Antônio Carlos Fagundes
                </span>
                <span className="font-display text-wood-dark text-xl md:text-2xl transition-colors duration-300 group-hover:text-forest">
                  & Antônio Carlos
                </span>
              </div>
            </div>

            {/* Divisor minimalista */}
            <div className="w-16 h-[1px] md:w-[1px] md:h-20 bg-wood/10 relative z-10 flex items-center justify-center shrink-0">
               <motion.div 
                 variants={{
                   hover: { scale: 1.2, rotate: [0, 15, -15, 0], transition: { repeat: Infinity, duration: 2 } }
                 }}
                 className="bg-[#faf7f2] p-2 rounded-full"
               >
                 <Heart size={14} className="text-sunset/40 fill-sunset/20" />
               </motion.div>
            </div>

            {/* Desenvolvedor */}
            <div className="text-center md:text-left relative z-10 flex-1">
              <span className="font-rustic text-[10px] tracking-[0.3em] uppercase text-wood/40 block mb-3">
                Desenvolvedor
              </span>
              <span className="font-display text-wood-dark text-xl md:text-2xl transition-colors duration-300 group-hover:text-sunset">
                Gabriel Guimarães
              </span>
            </div>
          </div>
        </motion.div>

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
