"use client";

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative pt-36 pb-28 px-4 overflow-hidden">
      {/* Atmospheric background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          style={{
            position: 'absolute',
            top: '35%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '700px',
            height: '400px',
            background: 'radial-gradient(ellipse, rgba(16,217,136,0.055) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center">
          {/* Photo with conic glow ring */}
          <motion.div
            className="relative w-36 h-36 mx-auto mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, -5, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: '-8px',
                  borderRadius: '50%',
                  background:
                    'conic-gradient(from 0deg, rgba(16,217,136,0.5), transparent 40%, rgba(16,217,136,0.3) 70%, transparent)',
                  opacity: 0.5,
                }}
              />
              <div
                className="relative w-36 h-36 rounded-full overflow-hidden"
                style={{ border: '2px solid rgba(16,217,136,0.25)' }}
              >
                <Image
                  src="/thatcher-pics/thatch-woods.webp"
                  alt="Thatcher McClure"
                  width={144}
                  height={144}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Overline label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="font-syne text-xs tracking-[0.45em] uppercase mb-4"
            style={{ color: '#10d988' }}
          >
            Software Developer & Data Analyst
          </motion.p>

          {/* Name — large Cormorant display */}
          <motion.h1
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="font-cormorant leading-none mb-5"
            style={{
              fontSize: 'clamp(3.5rem, 9vw, 7.5rem)',
              color: '#eae6dc',
              fontWeight: 600,
            }}
          >
            Thatcher{' '}
            <span style={{ fontStyle: 'italic', color: '#9adcb8', fontWeight: 300 }}>
              McClure
            </span>
          </motion.h1>

          {/* Divider line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            style={{
              height: '1px',
              width: '72px',
              margin: '0 auto 1.5rem',
              background:
                'linear-gradient(90deg, transparent, rgba(16,217,136,0.7), transparent)',
            }}
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="font-syne text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ color: '#7a8898' }}
          >
            Creator at heart who finds fulfillment in building solutions and experiences
            that make an impact
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <a
              href="/boat/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-syne font-semibold text-sm px-7 py-3 rounded-lg transition-all duration-300"
              style={{ background: '#10d988', color: '#070b13' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#0ecf7a')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#10d988')}
            >
              View Resume
            </a>
            <a
              href="https://github.com/ThatcherMcc"
              target="_blank"
              rel="noopener noreferrer"
              className="font-syne font-semibold text-sm px-7 py-3 rounded-lg transition-all duration-300"
              style={{
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#eae6dc',
                background: 'rgba(255,255,255,0.04)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
              }}
            >
              GitHub
            </a>
            <a
              href="#contact"
              className="font-syne font-semibold text-sm px-7 py-3 rounded-lg transition-all duration-300"
              style={{
                border: '1px solid rgba(16,217,136,0.25)',
                color: '#10d988',
                background: 'rgba(16,217,136,0.04)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(16,217,136,0.1)';
                e.currentTarget.style.borderColor = 'rgba(16,217,136,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(16,217,136,0.04)';
                e.currentTarget.style.borderColor = 'rgba(16,217,136,0.25)';
              }}
            >
              Contact Me
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
