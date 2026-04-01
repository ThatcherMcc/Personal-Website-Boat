"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ParticleBackground from 'rt/components/ParticleBackground';

function WaveDecoration() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden pointer-events-none">
      {/* Back wave */}
      <motion.svg
        className="absolute bottom-0 w-[200%] h-12 text-sky-500/20"
        viewBox="0 0 1440 48"
        preserveAspectRatio="none"
        fill="currentColor"
        animate={{ x: [0, -720] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      >
        <path d="M0 24 C180 0 360 48 540 24 C720 0 900 48 1080 24 C1260 0 1440 48 1440 24 L1440 48 L0 48 Z" />
        <path d="M1440 24 C1620 0 1800 48 1980 24 C2160 0 2340 48 2520 24 C2700 0 2880 48 2880 24 L2880 48 L1440 48 Z" />
      </motion.svg>
      {/* Front wave */}
      <motion.svg
        className="absolute bottom-0 w-[200%] h-10 text-cyan-400/25"
        viewBox="0 0 1440 40"
        preserveAspectRatio="none"
        fill="currentColor"
        animate={{ x: [-360, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      >
        <path d="M0 20 C240 4 480 36 720 20 C960 4 1200 36 1440 20 L1440 40 L0 40 Z" />
        <path d="M1440 20 C1680 4 1920 36 2160 20 C2400 4 2640 36 2880 20 L2880 40 L1440 40 Z" />
      </motion.svg>
    </div>
  );
}

function PortfolioCard({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <motion.div
      className="flex-1"
      initial={{ opacity: 0, x: -40, y: 16 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 0.55, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
    >
      <Link href="/portfolio" aria-label="Go to Portfolio — professional presentation of work and skills" onClick={(e) => { e.preventDefault(); onNavigate('/portfolio'); }}>
        <motion.div
          whileHover={{ y: -8 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="group relative overflow-hidden rounded-2xl min-h-[200px] sm:min-h-[260px] md:min-h-[340px] cursor-pointer flex flex-col select-none"
          style={{
            background: 'linear-gradient(150deg, #0f172a 0%, #1a2640 60%, #0f172a 100%)',
            border: '1px solid rgba(148,163,184,0.1)',
            boxShadow: '0 4px 30px rgba(0,0,0,0.5)',
          }}
        >
          {/* Hover: border glow */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              boxShadow: '0 0 0 1px rgba(148,163,184,0.3), inset 0 0 40px rgba(148,163,184,0.03)',
            }}
          />

          {/* Shimmer sweep on hover */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
            <div
              className="absolute top-0 h-full w-2/5 -translate-x-full group-hover:translate-x-[280%] transition-transform duration-700 ease-in-out"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)',
              }}
            />
          </div>

          {/* Top accent line (visible on hover) */}
          <div
            className="absolute top-0 inset-x-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(148,163,184,0.6), transparent)',
            }}
          />

          {/* Subtle corner dots */}
          <div className="absolute top-5 right-5 flex gap-1.5 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-full bg-slate-600/60 group-hover:bg-slate-400/60 transition-colors duration-300"
              />
            ))}
          </div>

          <div className="relative z-10 p-5 sm:p-7 md:p-9 flex flex-col flex-1">
            {/* Icon */}
            <div
              className="w-11 h-11 rounded-xl mb-4 md:mb-6 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300"
              style={{
                background: 'rgba(148,163,184,0.07)',
                border: '1px solid rgba(148,163,184,0.14)',
              }}
            >
              <svg
                className="w-5 h-5 text-slate-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>

            <div className="flex-1">
              <p className="text-xs tracking-[0.3em] text-slate-600 uppercase font-semibold mb-2">
                Professional
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight leading-tight">
                Portfolio
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                A focused presentation of my work, skills, and experience — crafted for professional audiences.
              </p>
            </div>

            <div className="mt-4 md:mt-7 pt-4 md:pt-5 border-t border-slate-800/80 flex items-center gap-2 text-slate-500 text-sm font-medium group-hover:text-slate-200 transition-colors duration-250">
              <span>View Portfolio</span>
              <svg
                className="w-3.5 h-3.5 translate-x-0 group-hover:translate-x-1.5 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

function BoatCard({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <motion.div
      className="flex-1"
      initial={{ opacity: 0, x: 40, y: 16 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 0.7, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
    >
      <Link href="/boat-adventure" aria-label="Go to Boat Adventure — interactive creative experience" onClick={(e) => { e.preventDefault(); onNavigate('/boat-adventure'); }}>
        <motion.div
          whileHover={{ y: -8 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="group relative overflow-hidden rounded-2xl min-h-[200px] sm:min-h-[260px] md:min-h-[340px] cursor-pointer flex flex-col select-none"
          style={{
            background: 'linear-gradient(150deg, #0c2545 0%, #0e3460 50%, #082038 100%)',
            border: '1px solid rgba(56,189,248,0.18)',
            boxShadow: '0 4px 30px rgba(0,0,0,0.5)',
          }}
        >
          {/* Hover: cyan glow */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              boxShadow: '0 0 0 1px rgba(56,189,248,0.35), 0 8px 40px rgba(14,165,233,0.1)',
            }}
          />

          {/* Star flicker in top-right area */}
          <div className="absolute top-4 right-4 flex gap-1 opacity-50 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="text-amber-300/70 text-xs"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
              >
                ✦
              </motion.div>
            ))}
          </div>

          {/* Animated waves at bottom */}
          <WaveDecoration />

          <div className="relative z-10 p-5 sm:p-7 md:p-9 flex flex-col flex-1">
            {/* Anchor icon — gently rocks */}
            <motion.div
              className="w-11 h-11 rounded-xl mb-4 md:mb-6 flex items-center justify-center"
              style={{
                background: 'rgba(14,165,233,0.12)',
                border: '1px solid rgba(56,189,248,0.22)',
              }}
              animate={{ rotate: [-3, 3, -3] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.15 }}
            >
              {/* Anchor icon */}
              <svg
                className="w-5 h-5 text-sky-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="5" r="2" strokeWidth={1.5} />
                <line x1="12" y1="7" x2="12" y2="22" strokeWidth={1.5} strokeLinecap="round" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M5 12h14M5 18c0 2.21 3.134 4 7 4s7-1.79 7-4"
                />
              </svg>
            </motion.div>

            <div className="flex-1">
              <p className="text-xs tracking-[0.3em] text-sky-600/80 uppercase font-semibold mb-2">
                Adventure
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight leading-tight">
                Boat Adventure
              </h2>
              <p className="text-sky-200/50 text-sm leading-relaxed max-w-xs">
                Embark on a creative journey aboard my digital ship. Explore my work in a unique, interactive way.
              </p>
            </div>

            <div className="mt-4 md:mt-7 pt-4 md:pt-5 border-t border-sky-900/50 flex items-center gap-2 text-sky-500 text-sm font-medium group-hover:text-sky-300 transition-colors duration-250">
              <span>Set Sail</span>
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="text-base"
              >
                ⚓
              </motion.span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function LandingChoice() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);
  const [exitTo, setExitTo] = useState<string | null>(null);

  useEffect(() => {
    if (!isExiting || !exitTo) return;
    const t = setTimeout(() => router.push(exitTo), 380);
    return () => clearTimeout(t);
  }, [isExiting, exitTo, router]);

  const navigate = (href: string) => {
    if (isExiting) return;
    setExitTo(href);
    setIsExiting(true);
  };

  return (
    <motion.div
      className="relative w-full min-h-screen h-screen overflow-y-auto md:overflow-hidden"
      animate={{ opacity: isExiting ? 0 : 1, scale: isExiting ? 0.97 : 1 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      style={{
        background:
          'radial-gradient(ellipse at 50% -10%, #0f172a 0%, #060c18 55%, #020508 100%)',
      }}
    >
      <ParticleBackground />

      {/* Main layout */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-6 md:py-8 md:h-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-2"
        >
          <p className="text-xs tracking-[0.4em] text-slate-600 uppercase font-medium mb-3">
            Thatcher McClure
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-none">
            Choose Your Path
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="text-slate-500 text-sm md:text-base text-center mb-6 md:mb-10 mt-2 md:mt-3"
        >
          Two ways to explore — one destination
        </motion.p>

        {/* Cards */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-5 w-full max-w-3xl">
          <PortfolioCard onNavigate={navigate} />
          <BoatCard onNavigate={navigate} />
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-xs text-slate-700 text-center mt-5 md:mt-8"
        >
          Both paths lead to the same treasure — just different ways to discover it
        </motion.p>
      </main>
    </motion.div>
  );
}
