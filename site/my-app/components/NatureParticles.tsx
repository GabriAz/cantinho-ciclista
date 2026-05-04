"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: "leaf" | "bird" | "pollen" | "feather" | "butterfly" | "seed" | "petal";
  direction: "left" | "right";
}

export default function NatureParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // MUITAS partículas - 50 no total!
    const types: Particle["type"][] = ["leaf", "bird", "pollen", "feather", "butterfly", "seed", "petal"];
    const initialParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 12 + 4,
      duration: Math.random() * 25 + 15,
      delay: Math.random() * 15,
      type: types[Math.floor(Math.random() * types.length)],
      direction: Math.random() > 0.5 ? "left" : "right",
    }));
    setParticles(initialParticles);
  }, []);

  const getParticleIcon = (type: string) => {
    switch (type) {
      case "leaf":
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
          </svg>
        );
      case "bird":
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M23 6l-9.5 5.5-5.5-2.5-2.5 2.5 5.5 2.5L23 6zM3.5 14L8 16.5 12.5 14 8 11.5 3.5 14z" />
          </svg>
        );
      case "pollen":
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <circle cx="12" cy="12" r="2.5" />
            <circle cx="12" cy="4" r="1" opacity="0.6" />
            <circle cx="12" cy="20" r="1" opacity="0.6" />
            <circle cx="4" cy="12" r="1" opacity="0.6" />
            <circle cx="20" cy="12" r="1" opacity="0.6" />
          </svg>
        );
      case "feather":
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M20.41 3.89c-1.15-.33-2.35.03-3.14.82l-9.17 9.17c-.45.45-.67 1.09-.55 1.73l.67 3.78 3.78.67c.64.12 1.28-.1 1.73-.55l9.17-9.17c.79-.79 1.15-1.99.82-3.14-.2-.7-.6-1.33-1.14-1.87-.54-.54-1.17-.94-1.87-1.14zM6.72 13.69l-2.89 2.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l2.89-2.89-.94-1.41z" />
          </svg>
        );
      case "butterfly":
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 2C12 2 11 4 9 5C7 6 4 5 4 5C4 5 3 8 5 10C7 12 10 12 10 12C10 12 8 14 8 16C8 18 9 21 12 21C15 21 16 18 16 16C16 14 14 12 14 12C14 12 17 12 19 10C21 8 20 5 20 5C20 5 17 6 15 5C13 4 12 2 12 2ZM12 16C11 16 10 15 10 14C10 13 11 12 12 12C13 12 14 13 14 14C14 15 13 16 12 16Z" />
          </svg>
        );
      case "seed":
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <ellipse cx="12" cy="12" rx="3" ry="5" />
            <path d="M12 7C12 7 10 8 10 12C10 16 12 17 12 17" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.5"/>
          </svg>
        );
      case "petal":
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 2C12 2 8 6 8 12C8 18 12 22 12 22C12 22 16 18 16 12C16 6 12 2 12 2Z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getParticleColor = (type: string) => {
    switch (type) {
      case "leaf":
        return "text-green-500/40";
      case "bird":
        return "text-amber-400/25";
      case "pollen":
        return "text-yellow-300/30";
      case "feather":
        return "text-cream/30";
      case "butterfly":
        return "text-purple-400/25";
      case "seed":
        return "text-wood/35";
      case "petal":
        return "text-pink-300/25";
      default:
        return "text-white/20";
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute ${getParticleColor(particle.type)}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            x: particle.direction === "right" 
              ? [0, 120, 60, 180, 0] 
              : [0, -120, -60, -180, 0],
            y: [0, -100, -250, -400, -600],
            rotate: [0, particle.direction === "right" ? 360 : -360, particle.direction === "right" ? 720 : -720, particle.direction === "right" ? 180 : -180, 0],
            opacity: [0, 0.8, 0.9, 0.6, 0],
            scale: [0.3, 1, 1.1, 0.8, 0.2],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {getParticleIcon(particle.type)}
        </motion.div>
      ))}

      {/* Pássaros voando - muito mais! */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={`bird-${i}`}
          className="absolute text-amber-400/20"
          style={{ 
            left: `${-10 - i * 5}%`, 
            top: `${15 + i * 12}%`,
          }}
          animate={{
            x: [0, 300, 600, 900, 1200, 1500],
            y: [0, -20 - i * 5, 10, -30, 5, 0],
          }}
          transition={{
            duration: 20 + i * 5,
            delay: i * 4,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className={`w-${6 + i} h-${6 + i}`}>
            <path d="M23 6l-9.5 5.5-5.5-2.5-2.5 2.5 5.5 2.5L23 6z" />
          </svg>
        </motion.div>
      ))}

      {/* Borboletas extras */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`butterfly-${i}`}
          className="absolute text-purple-400/20"
          style={{ 
            left: `${20 + i * 30}%`, 
            bottom: `${10 + i * 5}%`,
          }}
          animate={{
            x: [0, 50, -30, 80, 0],
            y: [0, -80, -40, -100, 0],
            scale: [1, 1.2, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 12 + i * 3,
            delay: i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12 2C12 2 11 4 9 5C7 6 4 5 4 5C4 5 3 8 5 10C7 12 10 12 10 12C10 12 8 14 8 16C8 18 9 21 12 21C15 21 16 18 16 16C16 14 14 12 14 12C14 12 17 12 19 10C21 8 20 5 20 5C20 5 17 6 15 5C13 4 12 2 12 2ZM12 16C11 16 10 15 10 14C10 13 11 12 12 12C13 12 14 13 14 14C14 15 13 16 12 16Z" />
          </svg>
        </motion.div>
      ))}

      {/* Vento/flores dançando */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={`pollen-${i}`}
          className="absolute text-yellow-200/40 rounded-full"
          style={{
            width: 3,
            height: 3,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, 30, -20, 50, 0],
            y: [0, -200, -100, -300, 0],
            opacity: [0, 1, 0.8, 0.4, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            delay: Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
