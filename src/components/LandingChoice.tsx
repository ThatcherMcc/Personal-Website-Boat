"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LandingChoice() {
  const [hoveredSide, setHoveredSide] = useState<'portfolio' | 'boat' | null>(null);
  const [mounted, setMounted] = useState(false);

  // Wait until client-side to render animations
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything on server for particles
  if (!mounted) {
    return (
      <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Main content container */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white text-center mb-4"
          >
            Welcome, Explorer
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-300 text-center mb-12 max-w-2xl"
          >
            Choose your journey: a professional portfolio or an interactive adventure
          </motion.p>

          {/* Choice cards container */}
          <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl">
            {/* Portfolio Card */}
            <Link href="/portfolio" className="flex-1">
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                onHoverStart={() => setHoveredSide('portfolio')}
                onHoverEnd={() => setHoveredSide(null)}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 p-8 md:p-12 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full"
              >
                <div className="relative z-10">
                  <motion.div
                    animate={{ scale: hoveredSide === 'portfolio' ? 1.1 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="w-16 h-16 md:w-20 md:h-20 mb-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </motion.div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Professional Portfolio
                  </h2>
                  
                  <p className="text-gray-100 text-base md:text-lg mb-6">
                    A clean, focused presentation of my work, skills, and experience. Perfect for professional browsing.
                  </p>
                  
                  <div className="flex items-center text-white font-semibold">
                    <span className="mr-2">View Portfolio</span>
                    <motion.span
                      animate={{ x: hoveredSide === 'portfolio' ? 5 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      →
                    </motion.span>
                  </div>
                </div>
                
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ mixBlendMode: 'overlay' }}
                />
              </motion.div>
            </Link>

            {/* Boat Adventure Card */}
            <Link href="/boat-adventure" className="flex-1">
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                onHoverStart={() => setHoveredSide('boat')}
                onHoverEnd={() => setHoveredSide(null)}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-700 p-8 md:p-12 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full"
              >
                <div className="relative z-10">
                  <motion.div
                    animate={{ scale: hoveredSide === 'boat' ? 1.1 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="w-16 h-16 md:w-20 md:h-20 mb-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </motion.div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Interactive Adventure
                  </h2>
                  
                  <p className="text-gray-100 text-base md:text-lg mb-6">
                    Embark on a creative journey aboard my digital ship. Explore my work in a unique, interactive way.
                  </p>
                  
                  <div className="flex items-center text-white font-semibold">
                    <span className="mr-2">Set Sail</span>
                    <motion.span
                      animate={{ x: hoveredSide === 'boat' ? 5 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      →
                    </motion.span>
                  </div>
                </div>
                
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ mixBlendMode: 'overlay' }}
                />
                
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-2 bg-white opacity-20"
                  animate={{
                    scaleX: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ transformOrigin: 'left' }}
                />
              </motion.div>
            </Link>
          </div>

          {/* Footer note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-sm text-gray-400 text-center mt-12"
          >
            Both paths lead to the same treasure — just different ways to discover it
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: Math.random() * window.innerHeight,
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-white text-center mb-4"
        >
          Welcome, Explorer
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-300 text-center mb-12 max-w-2xl"
        >
          Choose your journey: a professional portfolio or an interactive adventure
        </motion.p>

        {/* Choice cards container */}
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl">
          {/* Portfolio Card */}
          <Link href="/portfolio" className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              onHoverStart={() => setHoveredSide('portfolio')}
              onHoverEnd={() => setHoveredSide(null)}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 p-8 md:p-12 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full"
            >
              <div className="relative z-10">
                <motion.div
                  animate={{ scale: hoveredSide === 'portfolio' ? 1.1 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg className="w-16 h-16 md:w-20 md:h-20 mb-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </motion.div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Professional Portfolio
                </h2>
                
                <p className="text-gray-100 text-base md:text-lg mb-6">
                  A clean, focused presentation of my work, skills, and experience. Perfect for professional browsing.
                </p>
                
                <div className="flex items-center text-white font-semibold">
                  <span className="mr-2">View Portfolio</span>
                  <motion.span
                    animate={{ x: hoveredSide === 'portfolio' ? 5 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    →
                  </motion.span>
                </div>
              </div>
              
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ mixBlendMode: 'overlay' }}
              />
            </motion.div>
          </Link>

          {/* Boat Adventure Card */}
          <Link href="/boat-adventure" className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              onHoverStart={() => setHoveredSide('boat')}
              onHoverEnd={() => setHoveredSide(null)}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-700 p-8 md:p-12 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full"
            >
              <div className="relative z-10">
                <motion.div
                  animate={{ scale: hoveredSide === 'boat' ? 1.1 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg className="w-16 h-16 md:w-20 md:h-20 mb-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </motion.div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Interactive Adventure
                </h2>
                
                <p className="text-gray-100 text-base md:text-lg mb-6">
                  Embark on a creative journey aboard my digital ship. Explore my work in a unique, interactive way.
                </p>
                
                <div className="flex items-center text-white font-semibold">
                  <span className="mr-2">Set Sail</span>
                  <motion.span
                    animate={{ x: hoveredSide === 'boat' ? 5 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    →
                  </motion.span>
                </div>
              </div>
              
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ mixBlendMode: 'overlay' }}
              />
              
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-2 bg-white opacity-20"
                animate={{
                  scaleX: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ transformOrigin: 'left' }}
              />
            </motion.div>
          </Link>
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-sm text-gray-400 text-center mt-12"
        >
          Both paths lead to the same treasure — just different ways to discover it
        </motion.p>
      </div>
    </div>
  );
}