"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Leaf, Play } from "lucide-react";

export default function NatureAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [willAutoPlay, setWillAutoPlay] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Inicializar áudio
  useEffect(() => {
    // Som de pássaros - URL do arquivo local
    audioRef.current = new Audio("/audio/nature.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    audioRef.current.addEventListener('canplaythrough', () => {
      setIsReady(true);
      // Tentar autoplay quando estiver pronto
      audioRef.current?.play().catch(() => {
        console.log("Autoplay bloqueado - aguardando interação");
      });
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Tentar tocar no primeiro scroll/toque/clique do usuário
  useEffect(() => {
    if (!isReady) return;

    let hasStarted = false;

    const tryPlay = () => {
      if (hasStarted || !audioRef.current) return;
      
      audioRef.current.play().then(() => {
        hasStarted = true;
        setIsPlaying(true);
        setWillAutoPlay(false);
        console.log("🎵 Música iniciada pela interação do usuário");
      }).catch((e) => {
        console.log("Ainda não pode tocar:", e);
      });
    };

    // Detectar interações do usuário
    const events = ['scroll', 'touchstart', 'click', 'keydown', 'mousemove'];
    
    const handleInteraction = () => {
      tryPlay();
      // Remover listeners após primeiro play
      if (hasStarted) {
        events.forEach(event => {
          window.removeEventListener(event, handleInteraction, { capture: true } as any);
        });
      }
    };

    // Adicionar listeners
    events.forEach(event => {
      window.addEventListener(event, handleInteraction, { capture: true, passive: true } as any);
    });

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleInteraction, { capture: true } as any);
      });
    };
  }, [isReady]);

  // Controlar play/pause
  useEffect(() => {
    if (!audioRef.current || !isReady) return;
    
    if (isPlaying && !isMuted) {
      audioRef.current.play().catch((e) => {
        console.log("Erro ao tocar:", e);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, isMuted, isReady]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    setShowTooltip(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="hidden md:block bg-forest-dark/90 text-cream text-sm px-3 py-2 rounded-lg font-rustic"
          >
            {willAutoPlay && !isPlaying 
              ? "🎵 Toque ao rolar" 
              : isPlaying 
                ? "Sons da natureza ♪" 
                : "Sons da natureza"
            }
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controles de áudio */}
      <motion.div
        className="flex items-center gap-2 wood-sign rounded-full p-2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
      >
        {/* Botão play/pause */}
        <motion.button
          onClick={togglePlay}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          disabled={!isReady}
          className={`p-3 rounded-full transition-colors relative ${
            isPlaying 
              ? "bg-green-500/30 text-green-400" 
              : isReady
                ? willAutoPlay 
                  ? "bg-cream/10 text-cream hover:text-white animate-pulse"
                  : "bg-cream/10 text-cream hover:text-white"
                : "bg-cream/5 text-cream/30 cursor-not-allowed"
          }`}
        >
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div
                key="playing"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-1"
              >
                <Leaf size={18} className="text-green-400" />
                <span className="text-xs">♪</span>
              </motion.div>
            ) : (
              <motion.div
                key="paused"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                {isReady ? <Play size={20} /> : <VolumeX size={20} className="opacity-50" />}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Botão mute (aparece quando está tocando) */}
        <AnimatePresence>
          {isPlaying && (
            <motion.button
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              onClick={toggleMute}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full text-cream/70 hover:text-cream transition-colors"
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </motion.button>
          )}
        </AnimatePresence>

        {/* Indicador visual de ondas sonoras - estilo folhas/pássaros */}
        {isPlaying && !isMuted && (
          <div className="flex items-end gap-1 h-5 px-2">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-1 bg-green-400/80 rounded-full"
                animate={{
                  height: [6, 20, 6],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
