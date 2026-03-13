"use client";

import { motion } from "framer-motion";

/** Category-themed color configs for card backs */
const categoryThemes: Record<string, { color: string; glowColor: string; label: string }> = {
  Film: { color: "#c4873a", glowColor: "rgba(196, 135, 58, 0.3)", label: "Film" },
  Games: { color: "#c45a2a", glowColor: "rgba(196, 90, 42, 0.35)", label: "Games" },
  Characters: { color: "#8a5cc4", glowColor: "rgba(138, 92, 196, 0.3)", label: "Characters" },
  "Anime & Manga": { color: "#c43a3a", glowColor: "rgba(196, 58, 58, 0.3)", label: "Anime & Manga" },
  Music: { color: "#3a8ac4", glowColor: "rgba(58, 138, 196, 0.3)", label: "Music" },
  Other: { color: "#3ac46a", glowColor: "rgba(58, 196, 106, 0.3)", label: "Other" },
};

type CardBackProps = {
  categoryGroup: string;
};

export default function CardBack({ categoryGroup }: CardBackProps) {
  const theme = categoryThemes[categoryGroup] ?? categoryThemes.Other;

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center rounded-xl overflow-hidden"
      style={{
        background: "rgba(18, 8, 2, 0.92)",
        border: `1px solid ${theme.color}33`,
      }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${theme.glowColor} 0%, transparent 70%)`,
        }}
      />

      {/* Animated shimmer line */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(105deg, transparent 40%, ${theme.color}18 45%, ${theme.color}30 50%, ${theme.color}18 55%, transparent 60%)`,
        }}
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
      />

      {/* Diamond ornament */}
      <div
        className="w-10 h-10 rotate-45 rounded-sm mb-4"
        style={{
          border: `1.5px solid ${theme.color}66`,
          background: `linear-gradient(135deg, ${theme.color}15, transparent)`,
        }}
      />

      {/* Category label */}
      <span
        className="font-cormorant text-[10px] font-semibold tracking-[0.25em] uppercase"
        style={{ color: `${theme.color}aa` }}
      >
        {theme.label}
      </span>

      {/* Bottom decorative line */}
      <div
        className="absolute bottom-6 w-16 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${theme.color}44, transparent)` }}
      />

      {/* "Click to reveal" hint */}
      <motion.span
        className="absolute bottom-10 font-cormorant text-[9px] tracking-[0.15em] uppercase"
        style={{ color: `${theme.color}55` }}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        tap to reveal
      </motion.span>

      {/* Corner accents */}
      {[
        "top-2 left-2 border-t border-l",
        "top-2 right-2 border-t border-r",
        "bottom-2 left-2 border-b border-l",
        "bottom-2 right-2 border-b border-r",
      ].map((pos) => (
        <div
          key={pos}
          className={`absolute w-3 h-3 ${pos} pointer-events-none`}
          style={{ borderColor: `${theme.color}33` }}
        />
      ))}
    </div>
  );
}
