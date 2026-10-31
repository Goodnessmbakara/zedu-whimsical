"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { sounds } from "./SoundEffects";

interface MascotProps {
  mood: string;
  onHighFive: () => void;
}

const QUOTES = [
  "Hey Goodness! Endor merged 4 PRs today! 🚀",
  "Want me to summarize that 30-message thread? 💬",
  "High five for clean merges! 🖐️",
  "Whimsical design makes coding feel like magic ✨",
  "Checking for bugs... nope, all pristine! 🐞",
  "Human + Agent = Superpower! ⚡",
];

export const ZeduMascot: React.FC<MascotProps> = ({ onHighFive }) => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleMascotClick = (e: React.MouseEvent) => {
    sounds.playBoing();
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 600);

    // Rotate quote
    setQuoteIndex((prev) => (prev + 1) % QUOTES.length);

    // Floating heart particle
    const newHeart = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    };
    setHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1200);

    onHighFive();
  };

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Floating thought bubble */}
      <motion.div
        key={quoteIndex}
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", damping: 15 }}
        className="mb-4 bg-white/95 backdrop-blur-md border border-purple-200/80 text-slate-800 text-xs md:text-sm px-4 py-2.5 rounded-2xl shadow-lg shadow-purple-500/10 flex items-center gap-2 max-w-xs text-center cursor-pointer hover:scale-105 transition-transform"
        onClick={handleMascotClick}
      >
        <Sparkles className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: "3s" }} />
        <span className="font-medium">{QUOTES[quoteIndex]}</span>
      </motion.div>

      {/* Mascot Animated Body */}
      <motion.div
        animate={isJumping ? { y: [-15, 0, -8, 0], rotate: [0, -8, 8, 0] } : { y: [0, -6, 0] }}
        transition={isJumping ? { duration: 0.5 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.1, rotate: 3 }}
        whileTap={{ scale: 0.92 }}
        onClick={handleMascotClick}
        className="relative cursor-pointer group"
      >
        {/* Ambient Glow */}
        <div className="absolute -inset-4 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />

        {/* Mascot SVG Robot / Blob */}
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 drop-shadow-xl">
          {/* Antenna */}
          <motion.line
            x1="60"
            y1="25"
            x2="60"
            y2="10"
            stroke="#8d67fa"
            strokeWidth="4"
            strokeLinecap="round"
            style={{ transformOrigin: "60px 25px" }}
            animate={{ rotate: [-8, 8, -8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            cx="60"
            cy="10"
            r="6"
            fill="#ffd166"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          {/* Ears */}
          <rect x="18" y="50" width="8" height="20" rx="4" fill="#8d67fa" />
          <rect x="94" y="50" width="8" height="20" rx="4" fill="#8d67fa" />

          {/* Head / Body Pill */}
          <rect x="24" y="24" width="72" height="72" rx="24" fill="url(#mascotGradient)" stroke="#c6b3fc" strokeWidth="2.5" />

          {/* Visor / Face Screen */}
          <rect x="34" y="38" width="52" height="34" rx="14" fill="#1e1b4b" />

          {/* Eyes (Blinking animation) */}
          <motion.ellipse
            cx="48"
            cy="52"
            rx="4.5"
            ry="6"
            fill="#06d6a0"
            animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, times: [0, 0.9, 0.93, 0.96, 1] }}
          />
          <motion.ellipse
            cx="72"
            cy="52"
            rx="4.5"
            ry="6"
            fill="#06d6a0"
            animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, times: [0, 0.9, 0.93, 0.96, 1] }}
          />

          {/* Cute Smile */}
          <path d="M52 62 Q60 68 68 62" stroke="#ffd166" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Cheeks */}
          <circle cx="42" cy="58" r="3" fill="#ff6b8b" opacity="0.7" />
          <circle cx="78" cy="58" r="3" fill="#ff6b8b" opacity="0.7" />

          {/* Belly Badge */}
          <circle cx="60" cy="84" r="5" fill="#ffd166" />

          <defs>
            <linearGradient id="mascotGradient" x1="24" y1="24" x2="96" y2="96" gradientUnits="userSpaceOnUse">
              <stop stopColor="#7141f8" />
              <stop offset="1" stopColor="#5521d9" />
            </linearGradient>
          </defs>
        </svg>

        {/* High-five Pill Tag */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md whitespace-nowrap opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all">
          Tap me! 🖐️
        </div>
      </motion.div>

      {/* Floating Heart Particles */}
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 1, y: 0, scale: 0.8 }}
            animate={{ opacity: 0, y: -60, scale: 1.4 }}
            exit={{ opacity: 0 }}
            className="fixed pointer-events-none z-50 text-pink-500 font-bold text-xl"
            style={{ left: h.x, top: h.y }}
          >
            ❤️
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
