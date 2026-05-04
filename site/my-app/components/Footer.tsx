"use client";

import { motion } from "framer-motion";
import { Bike, Heart, Wrench, Droplets } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 md:px-8 lg:px-16 border-t border-wood/10">
      <div className="max-w-7xl mx-auto">
        {/* Assinatura Criativa - Bicicleta Interativa */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="wood-sign rounded-2xl p-8 md:p-10 max-w-4xl mx-auto">
            {/* Bicicleta Animada */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              {/* Lado Esquerdo - Idealizador */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-center md:text-right"
              >
                <p className="font-rustic text-amber-300/80 text-xs tracking-widest uppercase mb-1">
                  Idealizado por
                </p>
                <p className="font-display text-cream text-xl md:text-2xl">
                  Arnaldo Fagundes
                </p>
                <p className="font-rustic text-cream/60 text-sm mt-1">
                  O visionário da rota
                </p>
              </motion.div>

              {/* Centro - Bicicleta Interativa */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Círculo de fundo */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-2 border-dashed border-cream/20"
                  style={{ width: 120, height: 120, margin: -10 }}
                />
                
                {/* Container da bike */}
                <div className="relative w-24 h-24 bg-gradient-to-br from-wood-light/20 to-wood-dark/40 rounded-full flex items-center justify-center border-2 border-sunset-gold/30">
                  {/* Ícone da bike com animação */}
                  <motion.div
                    animate={{ 
                      y: [0, -3, 0],
                      rotate: [0, 2, -2, 0]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Bike size={40} className="text-sunset-gold" />
                  </motion.div>

                  {/* Partículas/elementos flutuantes */}
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      delay: 0.5
                    }}
                    className="absolute -top-2 right-2"
                  >
                    <Droplets size={12} className="text-blue-400" />
                  </motion.div>

                  <motion.div
                    animate={{ 
                      y: [0, -8, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 2.5, 
                      repeat: Infinity,
                      delay: 1
                    }}
                    className="absolute -bottom-1 left-3"
                  >
                    <Wrench size={12} className="text-wood-light" />
                  </motion.div>
                </div>

                {/* Texto "Pedalando juntos" */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-rustic text-cream/70 text-xs whitespace-nowrap"
                >
                  🚴 Pedalando juntos 🚴
                </motion.p>
              </motion.div>

              {/* Lado Direito - Desenvolvedor */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-center md:text-left"
              >
                <p className="font-rustic text-amber-300/80 text-xs tracking-widest uppercase mb-1">
                  Desenvolvido por
                </p>
                <p className="font-display text-cream text-xl md:text-2xl">
                  Gabriel Guimarães
                </p>
                <p className="font-rustic text-cream/60 text-sm mt-1">
                  O mago do código
                </p>
              </motion.div>
            </div>

            {/* Linha decorativa com corações */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex items-center justify-center gap-4 mt-8"
            >
              <div className="h-px bg-gradient-to-r from-transparent via-cream/30 to-transparent flex-1 max-w-[100px]" />
              <Heart size={14} className="text-sunset fill-sunset animate-pulse" />
              <div className="h-px bg-gradient-to-r from-transparent via-cream/30 to-transparent flex-1 max-w-[100px]" />
            </motion.div>
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
