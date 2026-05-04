"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star, Bike } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Carlos Mendes",
    role: "Ciclista de Estrada",
    avatar: "CM",
    text: "Salvou minha trilha! Estava sem água no KM 30 e o Cantinho foi uma benção. Água gelada e até calibraram meu pneu furado.",
    rating: 5,
    date: "Fevereiro 2026",
  },
  {
    id: 2,
    name: "Ana Paula",
    role: "Ciclista de MTB",
    avatar: "AP",
    text: "Não conhecia a Trilha da Coxinha. O Arnaldo me deu dicas incríveis de rota. Agora paro aqui toda semana!",
    rating: 5,
    date: "Janeiro 2026",
  },
  {
    id: 3,
    name: "Pedro & Grupo",
    role: "Grupo Trilha da Coxinha",
    avatar: "PG",
    text: "Nosso ponto de encontro oficial. Já são 3 anos pedalando juntos e sempre paramos no Cantinho. Obrigado pela recepção!",
    rating: 5,
    date: "Março 2026",
  },
  {
    id: 4,
    name: "Fernanda Lima",
    role: "Ciclista Recreativa",
    avatar: "FL",
    text: "Primeira vez na trilha e me senti em casa. A calibragem gratuita salvou meu passeio de domingo. Super recomendo!",
    rating: 5,
    date: "Abril 2026",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section id="depoimentos" className="py-24 md:py-32 px-4 md:px-8 lg:px-16 bg-cream-dark/30">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="font-rustic text-sunset text-sm tracking-[0.3em] uppercase">
            O que Dizem
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-wood-dark mt-4">
            Histórias da Trilha
          </h2>
          <p className="font-body text-wood/70 mt-4 max-w-xl mx-auto">
            Ciclistas que encontraram no Cantinho um lugar especial no meio do caminho.
          </p>
        </motion.div>

        {/* Carrossel */}
        <div className="relative">
          {/* Card de Depoimento */}
          <div className="relative min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <div className="wood-sign rounded-2xl p-8 md:p-10 max-w-3xl mx-auto">
                  {/* Ícone de aspas */}
                  <Quote size={40} className="text-amber-300/40 mb-4" />

                  {/* Texto */}
                  <p className="font-body text-cream text-lg md:text-xl leading-relaxed mb-6">
                    "{current.text}"
                  </p>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(current.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-sunset-gold fill-sunset-gold" />
                    ))}
                  </div>

                  {/* Autor */}
                  <div className="flex items-center gap-4 pt-4 border-t border-cream/20">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sunset to-sunset-gold flex items-center justify-center text-wood-dark font-rustic font-bold">
                      {current.avatar}
                    </div>

                    <div className="flex-1">
                      <p className="font-display text-cream text-lg">{current.name}</p>
                      <div className="flex items-center gap-2 text-cream/60 text-sm">
                        <Bike size={14} />
                        <span className="font-rustic">{current.role}</span>
                        <span className="text-cream/30">•</span>
                        <span className="font-rustic">{current.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controles */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-3 rounded-full bg-wood/10 text-wood-dark hover:bg-wood/20 transition-colors"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Indicadores */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-sunset w-6"
                      : "bg-wood/30 hover:bg-wood/50"
                  }`}
                  aria-label={`Ir para depoimento ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 rounded-full bg-wood/10 text-wood-dark hover:bg-wood/20 transition-colors"
              aria-label="Próximo depoimento"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Estatísticas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { number: "1.247", label: "Garrafas de água" },
            { number: "342", label: "Pneus calibrados" },
            { number: "98%", label: "Ciclistas retornam" },
            { number: "4.8★", label: "Avaliação média" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-cream-dark/40 rounded-xl p-4 text-center border border-wood/10"
            >
              <p className="font-display text-2xl md:text-3xl text-wood-dark">{stat.number}</p>
              <p className="font-rustic text-xs text-wood/60 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
