"use client";

import { motion, useReducedMotion } from 'framer-motion';

const skills: Record<string, string[]> = {
  "Programming Languages": ["Python", "C#", "TypeScript", "Java"],
  "Web Development": ["React", "Next.js", "Node.js", "HTML/CSS", "Tailwind CSS"],
  "Data & Analytics": ["Pandas", "Machine Learning", "Statistical Modeling", "Data Visualization"],
  "Tools & Technologies": ["Git", "SQL", "REST APIs", "Web Scraping", "Database Design"]
};

export default function SkillsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="skills"
      className="py-24 px-4"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="font-syne text-xs tracking-[0.4em] uppercase mb-3" style={{ color: '#10d988' }}>
            03
          </p>
          <h2
            className="font-cormorant text-5xl md:text-6xl"
            style={{ color: '#eae6dc', fontWeight: 600 }}
          >
            Technical Skills
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {Object.entries(skills).map(([category, items], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: prefersReducedMotion ? 0 : index * 0.08,
                ease: [0.23, 1, 0.32, 1],
              }}
              viewport={{ once: true }}
              className="rounded-xl p-6"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <h3
                className="font-syne font-semibold text-sm mb-5 flex items-center gap-3"
                style={{ color: '#eae6dc' }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '20px',
                    height: '1px',
                    background: '#10d988',
                    flexShrink: 0,
                  }}
                />
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill, i) => (
                  <span
                    key={i}
                    className="font-syne text-xs px-3 py-1.5 rounded-full"
                    style={{
                      background: 'rgba(16,217,136,0.07)',
                      border: '1px solid rgba(16,217,136,0.2)',
                      color: '#a8e6c4',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
