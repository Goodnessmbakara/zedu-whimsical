"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, CheckCircle2, ChevronRight, Play, Sparkles, Wand2, PartyPopper, RefreshCw, Sliders } from "lucide-react";
import confetti from "canvas-confetti";
import { sounds } from "./SoundEffects";

interface Step {
  id: string;
  title: string;
  desc: string;
  status: "done" | "working" | "pending";
  detail?: string;
}

const DEFAULT_STEPS: Step[] = [
  {
    id: "1",
    title: "1. Human Intent Intake & Context Linking",
    desc: "Parsed ticket ENDOR-460 and retrieved relevant Zedu UI components.",
    status: "done",
    detail: "Identified message box overlap issue on personal chat profile panel.",
  },
  {
    id: "2",
    title: "2. Autonomous Solution Drafting",
    desc: "Drafted CSS overflow fix (min-h-0 overflow-y-auto) and top-[60px] wrapper.",
    status: "done",
    detail: "Ensured backward compatibility with shared GlobalState provider.",
  },
  {
    id: "3",
    title: "3. Interactive Human Steering & Verification",
    desc: "Human reviewed preview branch, adjusted responsive constraints for tablet view.",
    status: "working",
    detail: "Live collaborative steering active. Awaiting merge approval.",
  },
  {
    id: "4",
    title: "4. Consolidated Batch Promotion to Upstream",
    desc: "Squash & merge cleanly into dev without breaking CI checks.",
    status: "pending",
  },
];

export const AgentThoughtStream: React.FC = () => {
  const [steps, setSteps] = useState<Step[]>(DEFAULT_STEPS);
  const [expandedId, setExpandedId] = useState<string>("3");
  const [celebrated, setCelebrated] = useState(false);

  const toggleExpand = (id: string) => {
    sounds.playPop();
    setExpandedId((prev) => (prev === id ? "" : id));
  };

  const handleCelebrateMerge = () => {
    sounds.playCheer();
    setCelebrated(true);

    // Multi-color whimsical confetti blast
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff6b8b", "#ffd166", "#06d6a0", "#118ab2", "#7141f8"],
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#7141f8", "#aa8dfb", "#ffd166"],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#06d6a0", "#ff6b8b", "#3b82f6"],
      });
    }, 250);

    // Advance step 3 to done, step 4 to working
    setSteps((prev) =>
      prev.map((s) => {
        if (s.id === "3") return { ...s, status: "done" };
        if (s.id === "4") return { ...s, status: "done", desc: "Successfully merged into production (PR #1208)!" };
        return s;
      })
    );
  };

  const resetSteps = () => {
    sounds.playBoing();
    setCelebrated(false);
    setSteps(DEFAULT_STEPS);
  };

  return (
    <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 backdrop-blur-md flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              Human-Agent Interactive Reasoning
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </h3>
            <p className="text-xs text-purple-200/60">Live bidirectional collaboration loop</p>
          </div>
        </div>

        <button
          onClick={resetSteps}
          className="text-xs text-purple-300 hover:text-white flex items-center gap-1 transition-colors px-2 py-1 rounded bg-white/5 hover:bg-white/10"
        >
          <RefreshCw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Step Sequence */}
      <div className="flex flex-col gap-2.5">
        {steps.map((s) => {
          const isExpanded = expandedId === s.id;
          return (
            <motion.div
              key={s.id}
              layout
              onClick={() => toggleExpand(s.id)}
              className={`rounded-xl border p-3 cursor-pointer transition-all ${
                s.status === "working"
                  ? "bg-purple-900/30 border-purple-400/50 shadow-lg shadow-purple-900/20"
                  : s.status === "done"
                  ? "bg-white/[0.03] border-emerald-500/30 hover:border-emerald-500/50"
                  : "bg-white/[0.01] border-white/5 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {s.status === "done" && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  {s.status === "working" && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-4 h-4 text-yellow-300" />
                    </motion.div>
                  )}
                  {s.status === "pending" && <div className="w-4 h-4 rounded-full border border-gray-500" />}

                  <span className="text-xs md:text-sm font-medium text-white">{s.title}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold ${
                      s.status === "done"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : s.status === "working"
                        ? "bg-yellow-500/20 text-yellow-300"
                        : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {s.status}
                  </span>
                  <ChevronRight
                    className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                  />
                </div>
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 pt-2 border-t border-white/5 text-xs text-purple-200/80 flex flex-col gap-1"
                  >
                    <p>{s.desc}</p>
                    {s.detail && (
                      <p className="text-[11px] text-purple-300/70 font-mono bg-black/20 p-2 rounded mt-1">
                        💡 {s.detail}
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Celebrate Merge CTA */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleCelebrateMerge}
        className="w-full mt-2 py-3 px-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-xl shadow-purple-900/30 flex items-center justify-center gap-2 border border-white/20 group"
      >
        <PartyPopper className="w-5 h-5 text-yellow-300 group-hover:rotate-12 transition-transform" />
        <span>{celebrated ? "PR Shipped to Production! 🎉 (Burst Again)" : "Co-Pilot Approve & Celebrate Merge 🎉"}</span>
      </motion.button>
    </div>
  );
};
