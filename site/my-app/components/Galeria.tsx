"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const fotos = [
  {
    src: "/images/post1.jpg",
    alt: "Vista do deck do Cantinho a Bicicleta",
    caption: "O deck que dá de frente para a natureza",
    span: "col-span-1 md:col-span-2",
  },
  {
    src: "/images/post2.jpg",
    alt: "Placa e ferramentas",
    caption: "Cada detalhe conta uma história",
    span: "col-span-1",
  },
  {
    src: "/images/post3.jpg",
    alt: "Ciclista descansando",
    caption: "Pedale. Respire. Aproveite.",
    span: "col-span-1 md:col-span-2",
  },
  {
    src: "/images/post4.jpg",
    alt: "Água e ferramentas",
    caption: "Tudo que você precisa para continuar",
    span: "col-span-1",
  },
  {
    src: "/images/post5.jpg",
    alt: "Vista da estrada",
    caption: "A rota que nos conecta",
    span: "col-span-1 md:col-span-1",
  },
];

export default function Galeria() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % fotos.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + fotos.length) % fotos.length);
    }
  };

  return (
    <section
      id="espaco"
      ref={sectionRef}
      className="py-24 md:py-32 px-4 md:px-8 lg:px-16 relative"
    >
      <div className="max-w-7xl mx-auto">
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
            O Espaço
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-wood-dark mt-4 mb-6"
          >
            Feito à mão,
            <span className="block italic text-forest">com carinho</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="font-body text-lg text-wood/70 max-w-2xl mx-auto"
          >
            Cada canto foi pensado para acolher quem chega com as pernas 
            cansadas e o coração aberto para a experiência.
          </motion.p>
        </motion.div>

        {/* Galeria em masonry layout - imagens completas visíveis */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {fotos.map((foto, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`${foto.span} relative group cursor-pointer overflow-hidden rounded-xl aspect-[4/5] md:aspect-[3/4]`}
              onClick={() => openLightbox(index)}
            >
              {/* Imagem - object-contain para mostrar completa */}
              <img
                src={foto.src}
                alt={foto.alt}
                className="w-full h-full object-contain bg-wood-dark/5 transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay gradiente */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Legenda */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="font-rustic text-cream text-sm md:text-base">
                  {foto.caption}
                </p>
              </div>

              {/* Borda sutil no hover */}
              <div className="absolute inset-0 border-2 border-sunset/0 group-hover:border-sunset/50 rounded-xl transition-colors duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Frase de destaque - foco na natureza */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 md:mt-20 text-center"
        >
          <p className="font-display text-2xl md:text-3xl text-wood-dark/80 italic max-w-3xl mx-auto leading-relaxed">
            "A natureza tem memória. O vento, as árvores, a terra — 
            todos guardam o calor de cada ciclista que passou por aqui."
          </p>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-forest-dark/95 backdrop-blur-md flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Botão fechar */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2 text-cream/80 hover:text-cream transition-colors z-10"
            >
              <X size={32} />
            </button>

            {/* Navegação anterior */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 md:left-8 p-3 text-cream/80 hover:text-cream transition-colors z-10 bg-wood-dark/50 rounded-full hover:bg-wood-dark/80"
            >
              <ChevronLeft size={32} />
            </button>

            {/* Imagem */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[80vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={fotos[selectedImage].src}
                alt={fotos[selectedImage].alt}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-forest-dark/90 to-transparent rounded-b-lg">
                <p className="font-rustic text-cream text-lg text-center">
                  {fotos[selectedImage].caption}
                </p>
                <p className="font-body text-cream/60 text-sm text-center mt-2">
                  {selectedImage + 1} / {fotos.length}
                </p>
              </div>
            </motion.div>

            {/* Navegação próxima */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 md:right-8 p-3 text-cream/80 hover:text-cream transition-colors z-10 bg-wood-dark/50 rounded-full hover:bg-wood-dark/80"
            >
              <ChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
