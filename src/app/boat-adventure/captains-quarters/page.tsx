"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import RoomLayout from "rt/app/boat-adventure/components/RoomLayout";
import FavoritesSection from "./components/FavoritesSection";

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
      {/* Scroll-linked dark overlay */}
      <motion.div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          backgroundColor: "rgba(12, 8, 4, 1)",
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
            className="font-cormorant font-semibold text-5xl md:text-6xl lg:text-7xl tracking-[0.02em]"
            style={{
              color: "#e8dcc8",
              textShadow: "0 0 40px rgba(180, 120, 40, 0.15)",
            }}
          >
            Captain&apos;s Quarters
          </motion.h1>

          {/* Ornamental divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-32 md:w-48 h-px mt-4 mb-6"
            style={{ background: "rgba(160, 120, 40, 0.5)" }}
          />

          {/* Scroll cue */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="font-cormorant text-sm tracking-[0.15em] uppercase"
            style={{ color: "#9a8e7e" }}
          >
            Explore
          </motion.span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mt-3"
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

        {/* ─── Introduction Panel ─── */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-5xl mx-auto px-4 md:px-8 mb-16 md:mb-24"
        >
          <div
            className="flex flex-col md:flex-row gap-6 md:gap-10 p-6 md:p-8 rounded-xl"
            style={{
              background: "rgba(12, 8, 4, 0.82)",
              border: "1px solid rgba(160, 120, 40, 0.2)",
            }}
          >
            {/* Profile Image — stone-framed */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex justify-center md:justify-start flex-shrink-0"
            >
              <div
                className="relative w-52 h-52 md:w-64 md:h-64 rounded-lg overflow-hidden"
                style={{
                  border: "3px solid rgba(140, 130, 110, 0.5)",
                  boxShadow: "inset 0 2px 12px rgba(0,0,0,0.4)",
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
                  color: "#e8dcc8",
                  borderBottom: "1px solid rgba(160, 120, 40, 0.35)",
                }}
              >
                Who I am
              </h2>
              <p
                className="font-cormorant text-base md:text-lg leading-relaxed md:leading-[1.8] mb-6"
                style={{ color: "#9a8e7e" }}
              >
                Hi, I&apos;m{" "}
                <strong style={{ color: "#5a9a3a" }}>Thatcher</strong>, a
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
                    className="font-cormorant font-semibold text-xl md:text-2xl mb-3"
                    style={{ color: "#e8dcc8" }}
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
                        className="font-cormorant text-base md:text-lg flex items-start gap-2"
                        style={{ color: "#9a8e7e" }}
                      >
                        <span
                          className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: "#c4973a" }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1">
                  <h3
                    className="font-cormorant font-semibold text-xl md:text-2xl mb-3"
                    style={{ color: "#e8dcc8" }}
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
                        className="font-cormorant text-base md:text-lg flex items-start gap-2"
                        style={{ color: "#9a8e7e" }}
                      >
                        <span
                          className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: "#c4973a" }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* ─── Favorites Collection ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <h2
            className="font-cormorant font-semibold text-3xl md:text-4xl text-center tracking-[0.04em] mb-10 md:mb-14"
            style={{ color: "#e8dcc8" }}
          >
            Some of My Favorite Things
          </h2>
          <FavoritesSection />
        </motion.div>

        {/* ─── Bonfire Rest Point ─── */}
        <section className="flex flex-col items-center justify-center py-20 md:py-28 px-4">
          {/* Slightly less dark area around bonfire */}
          <Link
            href="/boat-adventure?boatState=interior"
            className="group flex flex-col items-center gap-4"
          >
            <div className="relative">
              {/* Pulsing ember glow behind bonfire */}
              <div
                className="absolute inset-0 rounded-full animate-bonfire-glow"
                style={{
                  background:
                    "radial-gradient(circle, rgba(200, 120, 30, 0.25) 0%, transparent 70%)",
                  width: "200%",
                  height: "200%",
                  top: "-50%",
                  left: "-50%",
                }}
              />
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
              style={{ color: "#c4973a" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "#daa520")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "#c4973a")
              }
            >
              ← Return to Firelink
            </span>
          </Link>

          {/* Ember particles */}
          <div className="relative w-36 h-24 -mt-16 pointer-events-none hidden md:block">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full animate-ember"
                style={{
                  width: `${2 + Math.random() * 2}px`,
                  height: `${2 + Math.random() * 2}px`,
                  background: i % 2 === 0 ? "#e8943a" : "#d4a04a",
                  left: `${20 + i * 15}%`,
                  bottom: 0,
                  animationDelay: `${i * 0.7}s`,
                  animationDuration: `${2 + i * 0.5}s`,
                }}
              />
            ))}
          </div>
        </section>
      </div>
    </RoomLayout>
  );
}
