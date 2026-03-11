"use client";

import { motion, useReducedMotion } from 'framer-motion';

export default function AboutSection() {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: prefersReducedMotion ? 0 : delay, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] },
    viewport: { once: true },
  });

  return (
    <section
      id="about"
      className="py-24 px-4"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Section heading */}
        <motion.div {...fadeUp(0)} className="mb-12 text-center">
          <p className="font-syne text-[9px] tracking-[0.4em] uppercase mb-3" style={{ color: '#10d988' }}>
            01
          </p>
          <h2
            className="font-cormorant text-5xl md:text-6xl"
            style={{ color: '#eae6dc', fontWeight: 600 }}
          >
            About Me
          </h2>
        </motion.div>

        {/* Main bio card */}
        <motion.div
          {...fadeUp(0.1)}
          className="rounded-xl p-7 md:p-8 mb-5"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <p
            className="font-syne leading-relaxed mb-5"
            style={{ color: '#c4bfb2', fontSize: '1.05rem', lineHeight: 1.8 }}
          >
            I&apos;m a creator at heart who finds fulfillment in building solutions for myself and
            others. I believe creation takes many forms—whether it&apos;s solving a complex problem,
            providing a new experience that leads to fresh perspectives, or developing an impactful idea.
          </p>
          <p
            className="font-syne leading-relaxed"
            style={{ color: '#c4bfb2', fontSize: '1.05rem', lineHeight: 1.8 }}
          >
            With a strong foundation in both software development and data analysis, I approach
            challenges with curiosity and determination. I&apos;m passionate about turning ideas into
            reality through code and finding insights in data that drive meaningful decisions.
          </p>
        </motion.div>

        {/* Two column cards */}
        <div className="grid md:grid-cols-2 gap-4">
          <motion.div
            {...fadeUp(0.2)}
            className="rounded-xl p-6"
            style={{
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <h3
              className="font-syne font-semibold text-sm mb-5 flex items-center gap-2"
              style={{ color: '#eae6dc' }}
            >
              <span style={{ color: '#10d988', fontSize: '8px' }}>◆</span>
              When I&apos;m Not Coding
            </h3>
            <ul className="space-y-2.5">
              {[
                'Spending time with family & my girlfriend of 5 years',
                'Watching and ranking movies',
                'Playing games with friends',
                'Discovering new music',
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 font-syne text-sm"
                  style={{ color: '#6b7685', lineHeight: 1.6 }}
                >
                  <span style={{ color: '#10d988', marginTop: '6px', flexShrink: 0, fontSize: '5px' }}>
                    ●
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            {...fadeUp(0.3)}
            className="rounded-xl p-6"
            style={{
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <h3
              className="font-syne font-semibold text-sm mb-5 flex items-center gap-2"
              style={{ color: '#eae6dc' }}
            >
              <span style={{ color: '#10d988', fontSize: '8px' }}>◆</span>
              Currently Learning
            </h3>
            <ul className="space-y-2.5">
              {[
                'Playing the guitar',
                'Speaking Chinese (Mandarin)',
                'Altering clothes',
                'Holding a handstand',
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 font-syne text-sm"
                  style={{ color: '#6b7685', lineHeight: 1.6 }}
                >
                  <span style={{ color: '#10d988', marginTop: '6px', flexShrink: 0, fontSize: '5px' }}>
                    ●
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
