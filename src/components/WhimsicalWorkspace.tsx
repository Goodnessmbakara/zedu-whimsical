"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Volume2,
  VolumeX,
  Hash,
  Users,
  MessageSquare,
  Bot,
  Sliders,
  Send,
  Zap,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  Smile,
  Flame,
  Radio,
  FileCode,
  ShieldCheck,
  Award,
} from "lucide-react";
import { ZeduMascot } from "./ZeduMascot";
import { StickerCanvas } from "./StickerCanvas";
import { AgentThoughtStream } from "./AgentThoughtStream";
import { sounds } from "./SoundEffects";
import confetti from "canvas-confetti";

type MoodTheme = "cosmic" | "bubblegum" | "mint" | "sunset";

interface MoodConfig {
  name: string;
  bgGradient: string;
  cardBorder: string;
  accentColor: string;
  label: string;
}

const MOODS: Record<MoodTheme, MoodConfig> = {
  cosmic: {
    name: "Cosmic Focus",
    bgGradient: "from-[#0d0b24] via-[#1a1442] to-[#0f172a]",
    cardBorder: "border-purple-500/30",
    accentColor: "#7141f8",
    label: "🌌 Cosmic Focus",
  },
  bubblegum: {
    name: "Bubblegum Joy",
    bgGradient: "from-[#290d25] via-[#3d1338] to-[#170a24]",
    cardBorder: "border-pink-500/30",
    accentColor: "#ff6b8b",
    label: "🍬 Bubblegum Joy",
  },
  mint: {
    name: "Cyber Mint",
    bgGradient: "from-[#062420] via-[#0d3b36] to-[#081829]",
    cardBorder: "border-teal-500/30",
    accentColor: "#06d6a0",
    label: "🍃 Cyber Mint",
  },
  sunset: {
    name: "Sunset Groove",
    bgGradient: "from-[#2e130c] via-[#3d1c12] to-[#1a0f2b]",
    cardBorder: "border-orange-500/30",
    accentColor: "#ff9f1c",
    label: "🌅 Sunset Groove",
  },
};

export const WhimsicalWorkspace: React.FC = () => {
  const [currentMood, setCurrentMood] = useState<MoodTheme>("cosmic");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [delightScore, setDelightScore] = useState(42);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<
    { sender: "user" | "bot"; text: string; time: string }[]
  >([
    {
      sender: "bot",
      text: "Welcome to the Whimsical Agent Lounge! I am your interactive co-pilot for Zedu FE. Try tapping me or tweaking the mood dial! ✨",
      time: "Just now",
    },
  ]);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.setEnabled(next);
    if (next) sounds.playPop();
  };

  const handleMoodChange = (mood: MoodTheme) => {
    sounds.playSparkle();
    setCurrentMood(mood);
    setDelightScore((prev) => prev + 5);
  };

  const handleHighFive = () => {
    setDelightScore((prev) => prev + 10);
  };

  const handleSendMessage = (textToSend?: string) => {
    const message = textToSend || chatInput;
    if (!message.trim()) return;

    sounds.playPop();
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    setChatMessages((prev) => [...prev, { sender: "user", text: message, time: now }]);
    if (!textToSend) setChatInput("");

    // Whimsical Agent Reply
    setTimeout(() => {
      sounds.playSparkle();
      const replies = [
        "Analyzing your request with 100% good vibes! 🚀",
        "Consider it done! Generating clean, test-backed code now... 🤖",
        "Love that direction! Let's ensure this fits Zedu's theme perfectly! ✨",
        "Collaborative steering approved! Ready for merge! 💎",
      ];
      const botReply = replies[Math.floor(Math.random() * replies.length)];
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: botReply,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 600);
  };

  const promptChips = [
    "🚀 Fast-track PR Review",
    "🎨 Whimsify Design Tokens",
    "🤖 Run Agent Sync",
    "✨ Polish CSS Transitions",
  ];

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${MOODS[currentMood].bgGradient} text-white flex flex-col transition-colors duration-700 font-sans`}
    >
      {/* Top Application Bar */}
      <header className="h-14 border-b border-white/10 bg-black/20 backdrop-blur-xl px-4 md:px-6 flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          {/* Zedu Logo mark */}
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center font-black text-white text-base shadow-lg shadow-purple-600/40">
            Z
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-wide text-white">Zedu Internal</span>
              <span className="text-[10px] bg-purple-500/20 text-purple-300 font-mono px-1.5 py-0.5 rounded border border-purple-500/30">
                Endor Squad
              </span>
            </div>
            <div className="text-[10px] text-gray-400 flex items-center gap-1">
              <span>fe.zeduchat.com</span>
              <span>•</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Agent Hub Live
              </span>
            </div>
          </div>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center gap-3">
          {/* Delight Meter */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              sounds.playCheer();
              confetti({ particleCount: 40, spread: 60, origin: { y: 0.2 } });
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 text-xs text-pink-300 font-medium cursor-pointer shadow"
          >
            <Flame className="w-3.5 h-3.5 text-pink-400 fill-pink-400 animate-bounce" />
            <span>Delight: {delightScore} pts</span>
          </motion.div>

          {/* Sound Mute Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? "Mute interactive audio" : "Enable interactive audio"}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all border border-white/10"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-purple-300" /> : <VolumeX className="w-4 h-4 text-gray-500" />}
          </button>

          {/* Mood Theme Selector */}
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10">
            {(Object.keys(MOODS) as MoodTheme[]).map((m) => (
              <button
                key={m}
                onClick={() => handleMoodChange(m)}
                className={`text-xs px-2.5 py-1 rounded-lg transition-all ${
                  currentMood === m
                    ? "bg-purple-600 text-white font-semibold shadow-md"
                    : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                }`}
              >
                {MOODS[m].label.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Zedu Rail */}
        <aside className="w-64 hidden md:flex flex-col border-r border-white/10 bg-black/25 backdrop-blur-md p-4 justify-between">
          <div className="flex flex-col gap-5">
            {/* Org Switcher */}
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-purple-700 flex items-center justify-center font-bold text-xs text-white">
                  ZE
                </div>
                <div>
                  <div className="text-xs font-bold text-white leading-none">Zedu Endor</div>
                  <div className="text-[10px] text-gray-400">Team Workspace</div>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>

            {/* Channels */}
            <div>
              <div className="text-[11px] font-semibold text-purple-300/60 uppercase tracking-wider px-2 mb-1.5">
                Channels
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="px-2.5 py-1.5 rounded-lg text-xs text-gray-300 hover:bg-white/5 flex items-center gap-2 cursor-pointer">
                  <Hash className="w-3.5 h-3.5 text-gray-400" /> general
                </div>
                <div className="px-2.5 py-1.5 rounded-lg text-xs text-gray-300 hover:bg-white/5 flex items-center gap-2 cursor-pointer">
                  <Hash className="w-3.5 h-3.5 text-gray-400" /> dev-team
                </div>
                <div className="px-2.5 py-1.5 rounded-lg text-xs text-gray-300 hover:bg-white/5 flex items-center gap-2 cursor-pointer">
                  <Hash className="w-3.5 h-3.5 text-gray-400" /> endor-squad
                </div>
                <div className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-purple-200 bg-purple-600/30 border border-purple-500/40 flex items-center justify-between cursor-pointer">
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-300" /> agent-lounge
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Direct Messages */}
            <div>
              <div className="text-[11px] font-semibold text-purple-300/60 uppercase tracking-wider px-2 mb-1.5">
                Teammates
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="px-2.5 py-1.5 rounded-lg text-xs text-gray-300 hover:bg-white/5 flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Goodness (You)</span>
                  </div>
                  <span className="text-[10px] text-purple-300 font-mono">Lead</span>
                </div>
                <div className="px-2.5 py-1.5 rounded-lg text-xs text-gray-300 hover:bg-white/5 flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Zedu-Bot</span>
                  </div>
                  <span className="text-[10px] text-yellow-300 font-mono">AI Co-pilot</span>
                </div>
              </div>
            </div>

            {/* Voice & Buzz Rooms */}
            <div>
              <div className="text-[11px] font-semibold text-purple-300/60 uppercase tracking-wider px-2 mb-1.5">
                Buzz & Voice
              </div>
              <div className="px-2.5 py-1.5 rounded-lg text-xs text-gray-300 hover:bg-white/5 flex items-center gap-2 cursor-pointer">
                <Radio className="w-3.5 h-3.5 text-pink-400" />
                <span>Endor Huddle (Live)</span>
              </div>
            </div>
          </div>

          {/* Footer Badge */}
          <div className="pt-4 border-t border-white/5 text-[11px] text-gray-400 flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-purple-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Verified Whimsical Hub
            </div>
            <span>Zedu FE Experimental Workspace</span>
          </div>
        </aside>

        {/* Center Canvas / Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-6">
          {/* Hero Banner with Whimsical Mascot */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Mascot Center Card */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute top-3 right-3 text-xs bg-white/10 px-2 py-1 rounded-full text-purple-200 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-yellow-300" />
                <span>Whimsical Mascot v2</span>
              </div>

              {/* The Interactive Mascot */}
              <ZeduMascot mood={currentMood} onHighFive={handleHighFive} />

              <div className="mt-4 text-center">
                <h2 className="text-lg font-bold text-white flex items-center justify-center gap-2">
                  Zedu Interactive Co-Pilot
                </h2>
                <p className="text-xs text-purple-200/70 max-w-xs mt-1">
                  Click the robot for playful reactions, quotes, and joy particles!
                </p>
              </div>
            </div>

            {/* Whimsical Stats & Concept Highlights */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="p-5 rounded-3xl bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-pink-900/20 border border-white/10 backdrop-blur-xl flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-md bg-yellow-400/20 text-yellow-300">
                    <Award className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-white">Why Whimsical Design in Enterprise Software?</h3>
                </div>
                <p className="text-xs text-purple-100/80 leading-relaxed">
                  Enterprise chat and developer tools often feel sterile and repetitive. By introducing tactile
                  micro-interactions, reactive mascot feedback, sound synthesis, and celebratory milestones, we
                  transform everyday code reviews and issue tracking into an energizing, creative experience.
                </p>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-center">
                    <div className="text-base font-black text-purple-300">460+</div>
                    <div className="text-[10px] text-gray-400">Team Endor PRs</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-center">
                    <div className="text-base font-black text-pink-300">100%</div>
                    <div className="text-[10px] text-gray-400">Interactive Delight</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-center">
                    <div className="text-base font-black text-emerald-300">&lt; 150ms</div>
                    <div className="text-[10px] text-gray-400">Audio & UI Feedback</div>
                  </div>
                </div>
              </div>

              {/* Quick Prompt Sparkler Chips */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-purple-300/70 font-semibold mr-1">Quick Sparks:</span>
                {promptChips.map((chip) => (
                  <motion.button
                    key={chip}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSendMessage(chip)}
                    className="text-xs px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-purple-200 hover:text-white transition-all shadow-sm"
                  >
                    {chip}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Core: Thought Stream + Sticker Board */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Human-Agent Reasoning Stream */}
            <div className="lg:col-span-7">
              <AgentThoughtStream />
            </div>

            {/* Right: Sticker Canvas & Chat */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <StickerCanvas />

              {/* Mini Co-Pilot Dialogue */}
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 backdrop-blur-md flex flex-col h-60 justify-between">
                <div className="text-xs font-semibold text-white flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5 text-purple-400" />
                    Agent Chat Dialogue
                  </span>
                  <span className="text-[10px] text-emerald-400">Online</span>
                </div>

                {/* Message list */}
                <div className="flex-1 overflow-y-auto py-2 flex flex-col gap-2 scrollbar-none text-xs">
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col max-w-[85%] ${
                        msg.sender === "user" ? "self-end items-end" : "self-start items-start"
                      }`}
                    >
                      <div
                        className={`p-2.5 rounded-xl ${
                          msg.sender === "user"
                            ? "bg-purple-600 text-white rounded-br-xs"
                            : "bg-white/10 text-purple-100 rounded-bl-xs border border-white/10"
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[9px] text-gray-500 mt-0.5">{msg.time}</span>
                    </div>
                  ))}
                </div>

                {/* Input box */}
                <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Whisper a whimsical prompt..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSendMessage()}
                    className="p-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white shadow"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
