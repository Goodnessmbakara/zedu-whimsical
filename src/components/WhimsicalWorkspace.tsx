"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Volume2,
  VolumeX,
  Hash,
  Bot,
  Send,
  Flame,
  Radio,
  ShieldCheck,
  Award,
  ChevronDown,
  Search,
  Command,
} from "lucide-react";
import { ZeduMascot } from "./ZeduMascot";
import { StickerCanvas } from "./StickerCanvas";
import { AgentThoughtStream } from "./AgentThoughtStream";
import { sounds } from "./SoundEffects";
import confetti from "canvas-confetti";

type MoodTheme = "zedu" | "bubblegum" | "mint" | "sunbeam";

interface MoodConfig {
  name: string;
  bgGradient: string;
  cardBorder: string;
  accentColor: string;
  label: string;
}

const MOODS: Record<MoodTheme, MoodConfig> = {
  zedu: {
    name: "Zedu Classic",
    bgGradient: "from-[#f8fafc] via-[#f1f5f9] to-[#ede9fe]/40",
    cardBorder: "border-slate-200/90",
    accentColor: "#7141f8",
    label: "💜 Zedu Classic",
  },
  bubblegum: {
    name: "Pastel Joy",
    bgGradient: "from-[#fff1f2] via-[#fdf2f8] to-[#fce7f3]/50",
    cardBorder: "border-pink-200",
    accentColor: "#ec4899",
    label: "🍬 Pastel Joy",
  },
  mint: {
    name: "Fresh Mint",
    bgGradient: "from-[#f0fdf4] via-[#f0fdfa] to-[#e6fffa]/60",
    cardBorder: "border-emerald-200",
    accentColor: "#10b981",
    label: "🍃 Fresh Mint",
  },
  sunbeam: {
    name: "Warm Sunbeam",
    bgGradient: "from-[#fffbeb] via-[#fef3c7]/60 to-[#fef2f2]/60",
    cardBorder: "border-amber-200",
    accentColor: "#f59e0b",
    label: "☀️ Warm Sunbeam",
  },
};

export const WhimsicalWorkspace: React.FC = () => {
  const [currentMood, setCurrentMood] = useState<MoodTheme>("zedu");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [delightScore, setDelightScore] = useState(42);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<
    { sender: "user" | "bot"; text: string; time: string }[]
  >([
    {
      sender: "bot",
      text: "Welcome to the Zedu Whimsical Agent Lounge! I am your interactive co-pilot for Zedu FE. Tap me or tweak the mood dial to explore! ✨",
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
        "Collaborative steering approved! Ready for merge into dev! 💎",
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
      className={`min-h-screen bg-gradient-to-br ${MOODS[currentMood].bgGradient} text-slate-800 flex flex-col transition-colors duration-700 font-sans`}
    >
      {/* Top Application Bar - Styled exactly like Zedu FE Topbar */}
      <header className="h-14 border-b border-slate-200/90 bg-white/95 backdrop-blur-md px-4 md:px-6 flex items-center justify-between z-30 shadow-xs">
        {/* Left: Brand & Hub Status */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center font-black text-white text-base shadow-md shadow-purple-500/25">
            Z
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-tight text-slate-900">Zedu Chat</span>
              <span className="text-[10px] bg-purple-50 text-purple-700 font-mono font-bold px-1.5 py-0.5 rounded border border-purple-200">
                Endor Squad
              </span>
            </div>
            <div className="text-[10px] text-slate-500 flex items-center gap-1">
              <span>fe.zeduchat.com</span>
              <span>•</span>
              <span className="text-emerald-600 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Agent Hub Live
              </span>
            </div>
          </div>
        </div>

        {/* Center: Zedu Global Search Bar */}
        <div className="hidden lg:flex items-center w-80 max-w-md">
          <div className="w-full relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3" />
            <input
              type="text"
              readOnly
              placeholder="Search channels, agents, files..."
              className="w-full pl-9 pr-12 py-1.5 text-xs bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 cursor-pointer transition-colors"
            />
            <div className="absolute right-2.5 flex items-center gap-0.5 text-[10px] text-slate-400 font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-2xs">
              <Command className="w-2.5 h-2.5" /> K
            </div>
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2.5">
          {/* Delight Meter */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              sounds.playCheer();
              confetti({ particleCount: 40, spread: 60, origin: { y: 0.2 } });
            }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 hover:bg-pink-100/80 border border-pink-200 text-xs text-pink-700 font-bold cursor-pointer shadow-xs transition-colors"
          >
            <Flame className="w-3.5 h-3.5 text-pink-500 fill-pink-500 animate-bounce" />
            <span>Delight: {delightScore} pts</span>
          </motion.div>

          {/* Sound Mute Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? "Mute interactive audio" : "Enable interactive audio"}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all border border-slate-200 shadow-xs"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-purple-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Mood Theme Selector */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            {(Object.keys(MOODS) as MoodTheme[]).map((m) => (
              <button
                key={m}
                onClick={() => handleMoodChange(m)}
                className={`text-xs px-2.5 py-1 rounded-lg transition-all font-medium ${
                  currentMood === m
                    ? "bg-purple-600 text-white font-bold shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white"
                }`}
              >
                {MOODS[m].label.split(" ")[0]}
              </button>
            ))}
          </div>

          {/* Goodness Avatar */}
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white text-xs font-bold flex items-center justify-center shadow-xs border-2 border-white">
              GM
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
          </div>
        </div>
      </header>

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Zedu Rail - Light Workspace Navigation */}
        <aside className="w-64 hidden md:flex flex-col border-r border-slate-200/90 bg-white/70 backdrop-blur-md p-4 justify-between shadow-2xs">
          <div className="flex flex-col gap-5">
            {/* Org Switcher */}
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between shadow-2xs hover:bg-slate-100/70 transition-colors cursor-pointer">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center font-bold text-xs text-white shadow-xs">
                  ZE
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 leading-tight">Zedu Endor</div>
                  <div className="text-[10px] text-slate-500">Team Workspace</div>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>

            {/* Channels */}
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-1.5">
                Channels
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="px-2.5 py-1.5 rounded-lg text-xs text-slate-600 hover:bg-slate-100 hover:text-slate-900 flex items-center gap-2 cursor-pointer font-medium transition-colors">
                  <Hash className="w-3.5 h-3.5 text-slate-400" /> general
                </div>
                <div className="px-2.5 py-1.5 rounded-lg text-xs text-slate-600 hover:bg-slate-100 hover:text-slate-900 flex items-center gap-2 cursor-pointer font-medium transition-colors">
                  <Hash className="w-3.5 h-3.5 text-slate-400" /> dev-team
                </div>
                <div className="px-2.5 py-1.5 rounded-lg text-xs text-slate-600 hover:bg-slate-100 hover:text-slate-900 flex items-center gap-2 cursor-pointer font-medium transition-colors">
                  <Hash className="w-3.5 h-3.5 text-slate-400" /> endor-squad
                </div>
                <div className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-purple-700 bg-purple-100/70 border border-purple-200/90 flex items-center justify-between cursor-pointer shadow-2xs">
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" /> agent-lounge
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="px-2.5 py-1.5 rounded-lg text-xs text-slate-600 hover:bg-slate-100 hover:text-slate-900 flex items-center gap-2 cursor-pointer font-medium transition-colors">
                  <Hash className="w-3.5 h-3.5 text-slate-400" /> whimsical-sandbox
                </div>
              </div>
            </div>

            {/* Direct Messages */}
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-1.5">
                Teammates & Agents
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="px-2.5 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-slate-100 flex items-center justify-between cursor-pointer transition-colors font-medium">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Goodness (You)</span>
                  </div>
                  <span className="text-[10px] text-purple-700 bg-purple-50 px-1.5 py-0.2 rounded border border-purple-200 font-mono font-semibold">Lead</span>
                </div>
                <div className="px-2.5 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-slate-100 flex items-center justify-between cursor-pointer transition-colors font-medium">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Zedu-Bot</span>
                  </div>
                  <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200 font-mono font-semibold">AI Co-pilot</span>
                </div>
                <div className="px-2.5 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-slate-100 flex items-center justify-between cursor-pointer transition-colors font-medium">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Claude Code</span>
                  </div>
                  <span className="text-[10px] text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-200 font-mono font-semibold">Merger</span>
                </div>
              </div>
            </div>

            {/* Voice & Buzz Rooms */}
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-1.5">
                Buzz & Voice
              </div>
              <div className="px-2.5 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-slate-100 flex items-center gap-2 cursor-pointer transition-colors font-medium">
                <Radio className="w-3.5 h-3.5 text-pink-500" />
                <span>Endor Huddle (Live Buzz)</span>
              </div>
            </div>
          </div>

          {/* Footer Badge */}
          <div className="pt-4 border-t border-slate-200/80 text-[11px] text-slate-500 flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-purple-700 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Whimsical Hub
            </div>
            <span>Zedu FE Collaborative Workspace</span>
          </div>
        </aside>

        {/* Center Canvas / Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-6">
          {/* Hero Banner with Whimsical Mascot */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Mascot Center Card */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm relative overflow-hidden group">
              <div className="absolute top-3 right-3 text-xs bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-full text-purple-700 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Whimsical Mascot v2</span>
              </div>

              {/* The Interactive Mascot */}
              <ZeduMascot mood={currentMood} onHighFive={handleHighFive} />

              <div className="mt-4 text-center">
                <h2 className="text-lg font-bold text-slate-900 flex items-center justify-center gap-2">
                  Zedu Interactive Co-Pilot
                </h2>
                <p className="text-xs text-slate-500 max-w-xs mt-1">
                  Click the robot for playful reactions, quotes, and joy particles!
                </p>
              </div>
            </div>

            {/* Whimsical Stats & Concept Highlights */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="p-5 rounded-3xl bg-gradient-to-r from-purple-50/90 via-indigo-50/70 to-pink-50/60 border border-purple-100/90 shadow-sm flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-md bg-amber-100 text-amber-700">
                    <Award className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">Why Whimsical Design in Zedu?</h3>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Enterprise chat and developer tools often feel sterile and repetitive. By introducing tactile
                  micro-interactions, reactive mascot feedback, sound synthesis, and celebratory milestones, we
                  transform everyday code reviews and issue tracking into an energizing, creative experience.
                </p>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  <div className="p-2.5 rounded-xl bg-white/90 border border-purple-100 text-center shadow-2xs">
                    <div className="text-base font-black text-purple-700">460+</div>
                    <div className="text-[10px] text-slate-500 font-medium">Team Endor PRs</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/90 border border-purple-100 text-center shadow-2xs">
                    <div className="text-base font-black text-pink-600">100%</div>
                    <div className="text-[10px] text-slate-500 font-medium">Interactive Delight</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/90 border border-purple-100 text-center shadow-2xs">
                    <div className="text-base font-black text-emerald-600">&lt; 150ms</div>
                    <div className="text-[10px] text-slate-500 font-medium">Audio & UI Feedback</div>
                  </div>
                </div>
              </div>

              {/* Quick Prompt Sparkler Chips */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-500 font-bold mr-1">Quick Sparks:</span>
                {promptChips.map((chip) => (
                  <motion.button
                    key={chip}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleSendMessage(chip)}
                    className="text-xs px-3 py-1.5 rounded-xl bg-white hover:bg-purple-50 border border-slate-200 hover:border-purple-300 text-slate-700 hover:text-purple-700 transition-all shadow-2xs font-medium"
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
              <div className="rounded-2xl bg-white border border-slate-200/90 p-4 shadow-sm flex flex-col h-64 justify-between">
                <div className="text-xs font-bold text-slate-900 flex items-center justify-between pb-2.5 border-b border-slate-100">
                  <span className="flex items-center gap-1.5">
                    <Bot className="w-4 h-4 text-purple-600" />
                    Agent Chat Dialogue
                  </span>
                  <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">Online</span>
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
                        className={`p-2.5 rounded-2xl ${
                          msg.sender === "user"
                            ? "bg-purple-600 text-white rounded-br-xs shadow-xs font-normal"
                            : "bg-slate-100 text-slate-800 rounded-bl-xs border border-slate-200/80 font-normal"
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[9px] text-slate-400 mt-0.5 font-medium">{msg.time}</span>
                    </div>
                  ))}
                </div>

                {/* Input box */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Whisper a whimsical prompt..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-purple-500 transition-colors"
                  />
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => handleSendMessage()}
                    className="p-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-xs transition-colors"
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
