"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ProjectsSection from "./components/ProjectSection";
import RoomLayout from "rt/app/boat-adventure/components/RoomLayout";
import Link from "next/link";
import Image from "next/image";

// ── Design tokens ────────────────────────────────────────────
const C = {
  brass: "#c8923a",
  star: "#e8e2cc",
  primary: "#d8cdb8",
  body: "#7a8899",
  bg: "#06020e",
};

// ── Star field generation (computed once at module load) ──────
type Star = {
  left: string; top: string;
  size: string; duration: string; delay: string;
  minOp: number; maxOp: number; shimmer: boolean;
};

function makeStars(): Star[] {
  const stars: Star[] = [];
  // Deterministic-looking but varied positions using a seeded pattern
  for (let i = 0; i < 60; i++) {
    const shimmer = i < 7; // first 7 are shimmer stars
    const sizeVal = i % 3 === 0 ? "2px" : i % 3 === 1 ? "1.5px" : "1px";
    stars.push({
      left: `${((i * 17 + 3) % 100).toFixed(1)}%`,
      top: `${((i * 13 + 7) % 100).toFixed(1)}%`,
      size: sizeVal,
      duration: `${3 + (i % 5) * 0.8}s`,
      delay: `${(i * 0.37) % 5}s`,
      minOp: shimmer ? 0.4 : 0.1 + (i % 3) * 0.05,
      maxOp: shimmer ? 0.85 : 0.35 + (i % 3) * 0.1,
      shimmer,
    });
  }
  return stars;
}

const STARS = makeStars();

// ── Compass Rose SVG (scrolldown cue) ────────────────────────
function CompassRose({ size = 24, color = C.body, spinning = false }: {
  size?: number; color?: string; spinning?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={spinning ? { animation: "compass-spin 8s linear infinite" } : undefined}
    >
      <polygon points="12,1 13.4,10.6 12,12 10.6,10.6" fill={color} opacity="0.9" />
      <polygon points="12,23 13.4,13.4 12,12 10.6,13.4" fill={color} opacity="0.5" />
      <polygon points="1,12 10.6,13.4 12,12 10.6,10.6" fill={color} opacity="0.5" />
      <polygon points="23,12 13.4,10.6 12,12 13.4,13.4" fill={color} opacity="0.9" />
      <circle cx="12" cy="12" r="1.5" fill={color} opacity="0.8" />
      <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="0.4" fill="none" opacity="0.35" />
    </svg>
  );
}

export default function TreasureRoomPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });

  // Darken from clear Treasure Planet scene to map-room interior
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 0.78]);

  return (
    <RoomLayout
      backgroundSrc="/treasure-room/treasure-planet-bg.webp"
      blurClass=""
    >
      {/* ── Scroll-linked dark overlay — space-navy ── */}
      <motion.div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          backgroundColor: "rgba(6, 2, 14, 1)",
          opacity: overlayOpacity,
        }}
      />

      {/* ── Star field (fixed, above overlay) ── */}
      <div className="fixed inset-0 z-[2] pointer-events-none overflow-hidden">
        {STARS.map((star, i) => (
          <div
            key={i}
            className={star.shimmer ? "absolute rounded-full animate-star-shimmer" : "absolute rounded-full animate-star-twinkle"}
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              background: C.star,
              "--star-duration": star.duration,
              "--star-min": star.minOp,
              "--star-max": star.maxOp,
              animationDelay: star.delay,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* ── Nebula gradients ── */}
      <div className="fixed inset-0 z-[2] pointer-events-none overflow-hidden">
        {/* Top-left: teal */}
        <div
          className="absolute"
          style={{
            top: "-80px",
            left: "-80px",
            width: "500px",
            height: "500px",
            background: "radial-gradient(ellipse at center, rgba(80,180,130,0.07) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        {/* Right mid-page: violet */}
        <div
          className="absolute"
          style={{
            top: "30%",
            right: "-100px",
            width: "600px",
            height: "600px",
            background: "radial-gradient(ellipse at center, rgba(120,60,180,0.05) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      {/* ── Vignette overlay ── */}
      <div
        className="fixed inset-0 z-[3] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 45%, rgba(4,1,10,0.65) 100%)",
        }}
      />

      {/* ── Scrollable content container ── */}
      <div
        ref={scrollRef}
        className="relative z-10 overflow-y-auto h-screen"
        style={{ scrollBehavior: "smooth" }}
      >
        {/* ───────────────────────────────────────────────────────────
            Hero Section
        ─────────────────────────────────────────────────────────── */}
        <section className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center overflow-hidden">
          {/* Comet sweep animation (one-shot on entry) */}
          <div
            className="animate-comet absolute pointer-events-none"
            style={{
              top: "20%",
              left: "5%",
              width: "160px",
              height: "2px",
              background: `linear-gradient(to right, transparent, ${C.star}cc, transparent)`,
              transform: "rotate(25deg)",
              transformOrigin: "left center",
              borderRadius: "2px",
            }}
          />

          {/* Chart reference pre-title */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-cormorant text-[10px] md:text-[11px] tracking-[0.3em] uppercase mb-4 block"
            style={{ color: `${C.brass}66` }}
          >
            Chart No. 001 — Voyage of the Intrepid
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="font-cormorant font-bold text-5xl md:text-6xl lg:text-7xl tracking-[0.03em]
                       bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600
                       animate-title-bloom"
          >
            The Treasure Room
          </motion.h1>

          {/* Ornamental divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-3 mt-5 mb-5"
          >
            <div className="w-16 md:w-28 h-px" style={{ background: `linear-gradient(to right, transparent, ${C.brass}55)` }} />
            <CompassRose size={16} color={`${C.brass}88`} spinning />
            <div className="w-16 md:w-28 h-px" style={{ background: `linear-gradient(to left, transparent, ${C.brass}55)` }} />
          </motion.div>

          {/* Subtitle */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="font-cormorant italic text-sm tracking-[0.12em]"
            style={{ color: C.body }}
          >
            Voyage Log
          </motion.span>

          {/* Scroll cue — compass rose instead of chevron */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="mt-7"
            style={{ opacity: 0.5 }}
          >
            <CompassRose size={22} color={C.body} />
          </motion.div>
        </section>

        {/* ── Project Showcase ── */}
        <ProjectsSection />

        {/* ───────────────────────────────────────────────────────────
            Return to Home Planet
        ─────────────────────────────────────────────────────────── */}
        <section className="flex flex-col items-center justify-center py-20 md:py-28 px-4">
          {/* Arrival text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-cormorant italic text-xs md:text-sm tracking-[0.15em] text-center mb-10"
            style={{ color: `${C.body}66` }}
          >
            The voyage nears its end. The Home Planet comes into view.
          </motion.p>

          <Link
            href="/boat-adventure?boatState=interior"
            className="group flex flex-col items-center gap-4"
          >
            <div className="relative">
              {/* Pulsing orbital glow */}
              <div
                className="absolute inset-0 rounded-full animate-planet-glow"
                style={{
                  background:
                    "radial-gradient(circle, rgba(80, 200, 120, 0.12) 0%, transparent 70%)",
                  width: "250%",
                  height: "250%",
                  top: "-75%",
                  left: "-75%",
                }}
              />
              <div className="relative w-24 h-24 md:w-32 md:h-32 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/treasure-room/green-planet.webp"
                  alt="Green planet — journey's end"
                  fill
                  sizes="128px"
                  style={{ objectFit: "contain" }}
                />
              </div>

              {/* Orbiting dots — enhanced with glow + varied sizes */}
              <div className="hidden md:block">
                {[
                  { size: "4px", color: "#6dcf8c", opacity: 0.55, radius: "40px", duration: "6s", delay: "0s" },
                  { size: "2.5px", color: "#d4a04a", opacity: 0.4, radius: "52px", duration: "9s", delay: "1.8s" },
                  { size: "3px", color: "#7db8e8", opacity: 0.35, radius: "64px", duration: "13s", delay: "0.9s" },
                ].map((dot, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full animate-orbit"
                    style={{
                      width: dot.size,
                      height: dot.size,
                      background: dot.color,
                      opacity: dot.opacity,
                      top: "50%",
                      left: "50%",
                      boxShadow: `0 0 4px ${dot.color}`,
                      animationDelay: dot.delay,
                      animationDuration: dot.duration,
                      ["--orbit-radius" as string]: dot.radius,
                    }}
                  />
                ))}
              </div>
            </div>

            <span
              className="font-cormorant text-sm md:text-base tracking-[0.1em] transition-colors duration-300"
              style={{ color: "rgba(110, 200, 130, 0.7)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#6dcf8c")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(110, 200, 130, 0.7)")}
            >
              Return to Home Planet
            </span>
          </Link>
        </section>
      </div>
    </RoomLayout>
  );
}
