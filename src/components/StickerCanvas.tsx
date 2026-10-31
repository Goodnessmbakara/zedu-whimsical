"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sounds } from "./SoundEffects";
import { Trash2, Sparkles, Smile } from "lucide-react";

interface Sticker {
  id: number;
  emoji: string;
  x: number;
  y: number;
  rotation: number;
}

const STICKER_PALETTE = ["🦄", "✨", "🚀", "🎉", "🔥", "🛸", "🍕", "💎", "👾", "❤️", "⚡", "🍭"];

export const StickerCanvas: React.FC = () => {
  const [stickers, setStickers] = useState<Sticker[]>([
    { id: 1, emoji: "🚀", x: 40, y: 30, rotation: -12 },
    { id: 2, emoji: "✨", x: 80, y: 65, rotation: 15 },
    { id: 3, emoji: "🦄", x: 25, y: 70, rotation: 8 },
  ]);

  const addSticker = (emoji: string) => {
    sounds.playPop();
    const newSticker: Sticker = {
      id: Date.now(),
      emoji,
      // Random position near center
      x: Math.floor(Math.random() * 60) + 20,
      y: Math.floor(Math.random() * 50) + 20,
      rotation: Math.floor(Math.random() * 40) - 20,
    };
    setStickers((prev) => [...prev, newSticker]);
  };

  const removeSticker = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playBoing();
    setStickers((prev) => prev.filter((s) => s.id !== id));
  };

  const clearAll = () => {
    sounds.playBoing();
    setStickers([]);
  };

  return (
    <div className="relative w-full rounded-2xl bg-white border border-slate-200/90 p-4 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Smile className="w-5 h-5 text-amber-500" />
          <h3 className="text-sm font-bold text-slate-900">Whimsical Sticker Canvas</h3>
          <span className="text-[10px] bg-purple-50 text-purple-700 font-semibold px-2 py-0.5 rounded-full border border-purple-200">
            Interactive Drag & Pop
          </span>
        </div>
        {stickers.length > 0 && (
          <button
            onClick={clearAll}
            className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors font-medium"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear canvas
          </button>
        )}
      </div>

      {/* Palette bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs text-slate-500 font-medium mr-1 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Stick:
        </span>
        {STICKER_PALETTE.map((emoji) => (
          <motion.button
            key={emoji}
            whileHover={{ scale: 1.25, rotate: 10 }}
            whileTap={{ scale: 0.85 }}
            onClick={() => addSticker(emoji)}
            className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-purple-50 hover:border-purple-300 flex items-center justify-center text-lg transition-colors border border-slate-200 shadow-xs"
          >
            {emoji}
          </motion.button>
        ))}
      </div>

      {/* Canvas Area with Draggable Stickers */}
      <div className="relative h-44 w-full rounded-xl bg-gradient-to-b from-purple-50/50 via-slate-50 to-indigo-50/30 border border-slate-200/80 overflow-hidden mt-2">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-400 text-xs uppercase tracking-widest font-mono font-medium">
          Drag & drop stickers anywhere
        </div>

        <AnimatePresence>
          {stickers.map((stk) => (
            <motion.div
              key={stk.id}
              drag
              dragConstraints={{ left: 0, right: 300, top: 0, bottom: 120 }}
              dragElastic={0.2}
              whileHover={{ scale: 1.3, cursor: "grab" }}
              whileDrag={{ scale: 1.4, cursor: "grabbing" }}
              initial={{ scale: 0, rotate: stk.rotation }}
              animate={{ scale: 1, rotate: stk.rotation, left: `${stk.x}%`, top: `${stk.y}%` }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute text-3xl select-none group cursor-grab filter drop-shadow-md"
              style={{ left: `${stk.x}%`, top: `${stk.y}%` }}
              onDragStart={() => sounds.playPop()}
            >
              {stk.emoji}
              <button
                onClick={(e) => removeSticker(stk.id, e)}
                className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] hidden group-hover:flex items-center justify-center shadow"
              >
                ×
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
