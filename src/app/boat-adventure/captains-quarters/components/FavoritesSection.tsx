"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FavoritesGrouped, FavoritesList } from "../configs/FavoritesConfigs";
import FlippableCard from "./FlippableCard";

const STORAGE_KEY = "captains-quarters-revealed";

export default function FavoritesSection() {
  const totalCards = FavoritesList.length;
  const [revealedTitles, setRevealedTitles] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  // Load persisted state from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: string[] = JSON.parse(stored);
        setRevealedTitles(new Set(parsed));
      }
    } catch {
      // Ignore invalid data
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage whenever revealedTitles changes (after hydration)
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...revealedTitles]));
    } catch {
      // Storage full or unavailable — fail silently
    }
  }, [revealedTitles, hydrated]);

  const revealCard = useCallback((title: string) => {
    setRevealedTitles((prev) => {
      const next = new Set(prev);
      next.add(title);
      return next;
    });
  }, []);

  const revealAll = useCallback(() => {
    setRevealedTitles(new Set(FavoritesList.map((f) => f.title)));
  }, []);

  const discoveredCount = revealedTitles.size;
  const allRevealed = discoveredCount >= totalCards;

  // Don't render flip state until hydrated to avoid mismatch
  if (!hydrated) return null;

  return (
    <section className="w-full max-w-5xl mx-auto flex flex-col gap-12 md:gap-16 px-4">
      {/* ── Discovery Header ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Progress counter */}
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span
            className="font-cormorant text-sm md:text-base font-semibold tracking-wide"
            style={{ color: "#c4973a" }}
          >
            {discoveredCount}/{totalCards} discovered
          </span>
          {allRevealed && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="font-cormorant text-xs tracking-wider uppercase ml-2"
              style={{ color: "#c4a46a" }}
            >
              — All revealed
            </motion.span>
          )}
        </motion.div>

        {/* Reveal All button */}
        <AnimatePresence>
          {!allRevealed && (
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={revealAll}
              className="font-cormorant text-[11px] md:text-xs font-semibold tracking-[0.15em] uppercase px-4 py-2 transition-colors duration-300 cursor-pointer"
              style={{
                color: "#c4973a",
                background: "rgba(175,115,28,0.1)",
                border: "1px solid rgba(175,115,28,0.25)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(175,115,28,0.2)";
                e.currentTarget.style.borderColor = "rgba(200,150,50,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(175,115,28,0.1)";
                e.currentTarget.style.borderColor = "rgba(175,115,28,0.25)";
              }}
            >
              Reveal All
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ── Category Groups ── */}
      {FavoritesGrouped.map((group, groupIdx) => (
        <div key={group.name} className="flex flex-col gap-5">
          {/* Category Header — Dark Souls UI divider style */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: groupIdx * 0.08 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[rgba(160,120,40,0.4)] to-transparent" />
            <span
              className="font-cormorant text-[11px] md:text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: "#c4973a" }}
            >
              {group.name}
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[rgba(160,120,40,0.4)] to-transparent" />
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {group.items.map((item, idx) => (
              <FlippableCard
                key={item.title}
                imageSrc={item.imageSrc}
                altText={item.altText}
                category={item.category}
                title={item.title}
                description={item.description}
                categoryGroup={group.name}
                isRevealed={revealedTitles.has(item.title)}
                onReveal={() => revealCard(item.title)}
                index={idx}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
