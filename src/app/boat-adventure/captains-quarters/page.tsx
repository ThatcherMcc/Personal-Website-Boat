"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import RoomLayout from "rt/app/boat-adventure/components/RoomLayout";
import FavoritesSection from "./components/FavoritesSection";

// ── Design tokens ───────────────────────────────────────────
const COLORS = {
  primary: "#d4c4a8",
  body: "#8a7c6a",
  gold: "#b87d3a",
  goldMid: "#c4973a",
  highlight: "#e8d5b0",
  surface: "rgba(12,8,4,0.88)",
  border: "rgba(160,120,40,0.22)",
  borderStrong: "rgba(160,120,40,0.42)",
};

// ── Dust particle config ─────────────────────────────────────
const DUST_PARTICLES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: `${8 + i * 9}%`,
  top: `${15 + (i % 5) * 18}%`,
  size: i % 3 === 0 ? "1.5px" : "1px",
  duration: `${7 + i * 1.3}s`,
  delay: `${i * 0.9}s`,
  drift: `${i % 2 === 0 ? 5 + i : -(4 + i)}px`,
  opacity: 0.1 + (i % 3) * 0.03,
}));

export default function CaptainsQuartersPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });

  // Darken overlay from 0% to 75% as user scrolls past hero
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 0.75]);

  return (
    <RoomLayout
      backgroundSrc="/captains-quarters/painted-world-bg.webp"
      blurClass=""
    >
      {/* ── Scroll-linked dark overlay ── */}
      <motion.div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          backgroundColor: "rgba(10, 7, 5, 1)",
          opacity: overlayOpacity,
        }}
      />

      {/* ── Viewport vignette (always-on atmospheric depth) ── */}
      <div
        className="fixed inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(4,2,1,0.6) 100%)",
        }}
      />

      {/* ── Ambient dust particles ── */}
      <div className="fixed inset-0 z-[2] pointer-events-none overflow-hidden">
        {DUST_PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full animate-dust"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background: COLORS.gold,
              "--dust-duration": p.duration,
              "--dust-drift": p.drift,
              "--dust-opacity": p.opacity,
              animationDelay: p.delay,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* ── Scrollable content container ── */}
      <div
        ref={scrollRef}
        className="relative z-10 overflow-y-auto h-screen"
        style={{ scrollBehavior: "smooth" }}
      >
        {/* ─────────────────────────────────────────────────────────────
            Hero Section
        ───────────────────────────────────────────────────────────── */}
        <section className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
          {/* Ornamental sigil */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="mb-6"
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              {/* Diamond sigil */}
              <polygon
                points="24,2 46,24 24,46 2,24"
                stroke={COLORS.gold}
                strokeWidth="0.8"
                fill="none"
                opacity="0.7"
              />
              <polygon
                points="24,8 40,24 24,40 8,24"
                stroke={COLORS.gold}
                strokeWidth="0.5"
                fill="none"
                opacity="0.4"
              />
              <circle cx="24" cy="24" r="3" fill={COLORS.gold} opacity="0.6" />
              <line x1="24" y1="2" x2="24" y2="46" stroke={COLORS.gold} strokeWidth="0.4" opacity="0.3" />
              <line x1="2" y1="24" x2="46" y2="24" stroke={COLORS.gold} strokeWidth="0.4" opacity="0.3" />
            </svg>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="font-cormorant font-light text-[72px] md:text-[80px] lg:text-[88px] tracking-[0.04em] leading-none"
            style={{
              color: COLORS.highlight,
              textShadow: "0 0 60px rgba(180,120,40,0.18)",
            }}
          >
            Captain&apos;s Quarters
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="font-cormorant italic text-base md:text-lg mt-3 tracking-[0.06em]"
            style={{ color: COLORS.body }}
          >
            Where the bearer rests
          </motion.p>

          {/* Runic divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="flex items-center gap-3 mt-6 mb-8"
          >
            <div className="w-16 md:w-28 h-px" style={{ background: `linear-gradient(to right, transparent, ${COLORS.gold}55)` }} />
            <span className="font-cormorant text-[11px] tracking-[0.25em] uppercase" style={{ color: `${COLORS.gold}88` }}>✦</span>
            <div className="w-16 md:w-28 h-px" style={{ background: `linear-gradient(to left, transparent, ${COLORS.gold}55)` }} />
          </motion.div>

          {/* Scroll cue */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="font-cormorant text-[11px] tracking-[0.25em] uppercase"
            style={{ color: COLORS.body, opacity: 0.6 }}
          >
            Explore
          </motion.span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mt-3"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={COLORS.body} strokeWidth="1.5" opacity="0.6">
              <path d="M4 7l6 6 6-6" />
            </svg>
          </motion.div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            Introduction Panel
        ───────────────────────────────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-5xl mx-auto px-4 md:px-8 mb-16 md:mb-24"
        >
          {/* Double-border panel effect */}
          <div
            className="p-[1px]"
            style={{
              background: `linear-gradient(135deg, ${COLORS.borderStrong}, transparent 40%, ${COLORS.borderStrong})`,
            }}
          >
            <div
              className="flex flex-col md:flex-row gap-6 md:gap-10 p-6 md:p-8"
              style={{
                background: COLORS.surface,
                outline: `1px solid ${COLORS.border}`,
                outlineOffset: "4px",
              }}
            >
              {/* Profile Image — stone-cut (no rounded corners) */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex justify-center md:justify-start flex-shrink-0"
              >
                <div
                  className="relative w-52 h-52 md:w-64 md:h-64 overflow-hidden"
                  style={{
                    border: "2px solid rgba(140,130,110,0.45)",
                    boxShadow: "inset 0 2px 16px rgba(0,0,0,0.5), 0 0 0 1px rgba(140,130,110,0.12)",
                  }}
                >
                  <Image
                    src="/thatcher-pics/thatch-woods.webp"
                    alt="Thatcher McClure"
                    fill
                    priority
                    sizes="(max-width: 768px) 208px, 256px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </motion.div>

              {/* Bio Text — Dark Souls item description style */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex-1"
              >
                <h2
                  className="font-cormorant font-semibold text-3xl md:text-4xl tracking-[0.08em] pb-3 mb-4"
                  style={{
                    color: COLORS.primary,
                    borderBottom: `1px solid ${COLORS.border}`,
                    fontVariant: "small-caps",
                  }}
                >
                  Who I Am
                </h2>
                <p
                  className="font-cormorant italic text-base md:text-[17px] leading-[1.9] mb-6"
                  style={{ color: COLORS.body }}
                >
                  Hi, I&apos;m{" "}
                  <strong style={{ color: COLORS.highlight, fontStyle: "normal" }}>Thatcher</strong>, a
                  creator at heart who finds his fulfillment and escape from
                  overconsumption in the act of building for myself and others. I
                  think creation has many forms, whether it&apos;s a solution to a
                  problem, providing a new experience that leads to a fresh
                  perspective, or even an impactful thought (pick your poison),
                  each can be equally valuable.
                  <br />
                  I&apos;m pretty big on creation if you couldn&apos;t tell.
                </p>

                <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                  <div className="flex-1">
                    <h3
                      className="font-cormorant font-semibold text-xl md:text-2xl mb-3 tracking-[0.08em]"
                      style={{ color: COLORS.primary, fontVariant: "small-caps" }}
                    >
                      Free Time Spending
                    </h3>
                    <ul className="space-y-1.5">
                      {[
                        "Girlfriend of almost 5 years now",
                        "Siblings and Parents",
                        "Watching and Ranking Movies",
                        "Playing Games with Friends",
                        "Finding New Music",
                      ].map((item) => (
                        <li
                          key={item}
                          className="font-cormorant italic text-base md:text-[17px] flex items-start gap-2"
                          style={{ color: COLORS.body }}
                        >
                          <span
                            className="mt-2 w-1.5 h-1.5 flex-shrink-0"
                            style={{ background: COLORS.gold }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex-1">
                    <h3
                      className="font-cormorant font-semibold text-xl md:text-2xl mb-3 tracking-[0.08em]"
                      style={{ color: COLORS.primary, fontVariant: "small-caps" }}
                    >
                      New Things I&apos;m Learning
                    </h3>
                    <ul className="space-y-1.5">
                      {[
                        "How to Play the Guitar",
                        "Speaking Chinese (Mandarin)",
                        "Altering Clothes",
                        "Holding a Handstand",
                      ].map((item) => (
                        <li
                          key={item}
                          className="font-cormorant italic text-base md:text-[17px] flex items-start gap-2"
                          style={{ color: COLORS.body }}
                        >
                          <span
                            className="mt-2 w-1.5 h-1.5 flex-shrink-0"
                            style={{ background: COLORS.gold }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* ─────────────────────────────────────────────────────────────
            Artifacts of the Bearer (Favorites)
        ───────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          {/* Section header */}
          <div className="flex flex-col items-center mb-10 md:mb-14">
            <span
              className="font-cormorant text-[11px] tracking-[0.25em] uppercase mb-3"
              style={{ color: `${COLORS.gold}88` }}
            >
              ✦ Bearer&apos;s Collection ✦
            </span>
            <h2
              className="font-cormorant font-semibold text-3xl md:text-4xl text-center tracking-[0.08em]"
              style={{ color: COLORS.primary, fontVariant: "small-caps" }}
            >
              Artifacts of the Bearer
            </h2>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-12 md:w-20 h-px" style={{ background: `linear-gradient(to right, transparent, ${COLORS.gold}44)` }} />
              <div className="w-1.5 h-1.5 rotate-45" style={{ background: COLORS.gold, opacity: 0.5 }} />
              <div className="w-12 md:w-20 h-px" style={{ background: `linear-gradient(to left, transparent, ${COLORS.gold}44)` }} />
            </div>
          </div>
          <FavoritesSection />
        </motion.div>

        {/* ─────────────────────────────────────────────────────────────
            Bonfire Rest Point
        ───────────────────────────────────────────────────────────── */}
        <section className="flex flex-col items-center justify-center py-20 md:py-28 px-4">
          <Link
            href="/boat-adventure?boatState=interior"
            className="group flex flex-col items-center gap-4"
          >
            <div className="relative">
              {/* Concentric glow rings */}
              {[200, 150, 110].map((size, idx) => (
                <div
                  key={size}
                  className="absolute rounded-full animate-bonfire-glow pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, rgba(200,120,30,${0.12 - idx * 0.03}) 0%, transparent 70%)`,
                    width: `${size}%`,
                    height: `${size}%`,
                    top: `${-(size - 100) / 2}%`,
                    left: `${-(size - 100) / 2}%`,
                    animationDelay: `${idx * 0.5}s`,
                  }}
                />
              ))}
              <div className="relative w-28 h-28 md:w-36 md:h-36 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/captains-quarters/bonfire.webp"
                  alt="A lit bonfire, a place of rest"
                  fill
                  sizes="144px"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
            <span
              className="font-cormorant text-sm md:text-base tracking-[0.1em] transition-colors duration-300"
              style={{ color: COLORS.gold }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#daa520")}
              onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.gold)}
            >
              ← Return to Firelink
            </span>
          </Link>

          {/* Whisper text after bonfire */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            viewport={{ once: true }}
            className="font-cormorant italic text-[11px] md:text-xs tracking-[0.2em] mt-6 text-center max-w-xs"
            style={{ color: `${COLORS.body}55` }}
          >
            &quot;Seek souls, of the right, to correct the wrong.&quot;
          </motion.p>

          {/* Ember particles — extended height */}
          <div className="relative w-36 h-36 -mt-24 pointer-events-none hidden md:block">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full animate-ember"
                style={{
                  width: `${2 + (i % 2)}px`,
                  height: `${2 + (i % 2)}px`,
                  background: i % 2 === 0 ? "#e8943a" : "#d4a04a",
                  left: `${18 + i * 10}%`,
                  bottom: 0,
                  animationDelay: `${i * 0.6}s`,
                  animationDuration: `${2.2 + i * 0.45}s`,
                }}
              />
            ))}
          </div>
        </section>
      </div>
    </RoomLayout>
  );
}
