"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function StarField({ mounted, count }: { mounted: boolean; count: number }) {
  if (!mounted) return null;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 1.5 + 0.5,
            height: Math.random() * 1.5 + 0.5,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.4 + 0.1,
          }}
          animate={{ opacity: [null, 0.05, Math.random() * 0.5 + 0.1] }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: "reverse",
            delay: Math.random() * 4,
          }}
        />
      ))}
    </div>
  );
}

export default function ParticleBackground() {
  const [mounted, setMounted] = useState(false);
  const [starCount, setStarCount] = useState(30);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setStarCount(isMobile ? 15 : 30);
    setMounted(true);
  }, []);

  return (
    <>
      <StarField mounted={mounted} count={starCount} />

      {/* Ambient glow blobs */}
      <div
        className="absolute -top-20 left-1/3 w-[600px] h-[350px] opacity-[0.07] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, #818cf8 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      <div
        className="absolute bottom-0 right-1/3 w-[500px] h-[300px] opacity-[0.06] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, #22d3ee 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
    </>
  );
}
