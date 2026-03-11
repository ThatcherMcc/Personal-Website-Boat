"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ProjectsSection from "./components/ProjectSection";
import RoomLayout from "rt/app/boat-adventure/components/RoomLayout";
import Link from "next/link";
import Image from "next/image";

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
      {/* Scroll-linked dark overlay — space-navy */}
      <motion.div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          backgroundColor: "rgba(6, 4, 18, 1)",
          opacity: overlayOpacity,
        }}
      />

      {/* Scrollable content container */}
      <div
        ref={scrollRef}
        className="relative z-10 overflow-y-auto h-screen"
        style={{ scrollBehavior: "smooth" }}
      >
        {/* ─── Hero Section ─── */}
        <section className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-cormorant font-bold text-5xl md:text-6xl lg:text-7xl tracking-[0.03em]
                       bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600"
            style={{
              textShadow: "0 0 40px rgba(180, 120, 40, 0.15)",
            }}
          >
            The Treasure Room
          </motion.h1>

          {/* Ornamental divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-32 md:w-48 h-px mt-4 mb-5"
            style={{ background: "rgba(212, 160, 74, 0.5)" }}
          />

          {/* Subtitle */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="font-cormorant text-sm tracking-[0.15em] uppercase"
            style={{ color: "#9a8e7e" }}
          >
            Voyage Log
          </motion.span>

          {/* Scroll cue */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mt-6"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="#9a8e7e"
              strokeWidth="1.5"
            >
              <path d="M4 7l6 6 6-6" />
            </svg>
          </motion.div>
        </section>

        {/* ─── Project Showcase ─── */}
        <ProjectsSection />

        {/* ─── Return to Home Planet ─── */}
        <section className="flex flex-col items-center justify-center py-20 md:py-28 px-4">
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

              {/* Orbiting dots — desktop only */}
              <div className="hidden md:block">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="absolute rounded-full animate-orbit"
                    style={{
                      width: "3px",
                      height: "3px",
                      background: i === 1 ? "#6dcf8c" : "#d4a04a",
                      opacity: 0.4,
                      top: "50%",
                      left: "50%",
                      animationDelay: `${i * 1.3}s`,
                      animationDuration: "6s",
                      // Each dot orbits at a slightly different radius via CSS custom property
                      ["--orbit-radius" as string]: `${40 + i * 10}px`,
                    }}
                  />
                ))}
              </div>
            </div>

            <span
              className="font-cormorant text-sm md:text-base tracking-[0.1em] transition-colors duration-300"
              style={{ color: "rgba(110, 200, 130, 0.7)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "#6dcf8c")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(110, 200, 130, 0.7)")
              }
            >
              Return to Home Planet
            </span>
          </Link>
        </section>
      </div>
    </RoomLayout>
  );
}
