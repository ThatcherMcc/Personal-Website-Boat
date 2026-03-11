"use client";

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

const projects = [
  {
    id: 1,
    year: "2025",
    title: "Customer Segmentation Analysis",
    description: "Developed a K-Means clustering solution to analyze real-world transactional data from a service-based business, identifying distinct customer segments using RFM (Recency, Frequency, Monetary) modeling.",
    technologies: ["Python", "K-Means Clustering", "Data Analysis", "RFM Model"],
    github: "https://github.com/ThatcherMcc/Customer-Segmentation-Analysis",
    image: "/treasure-room/data-clustering-plot.webp"
  },
  {
    id: 2,
    year: "2024",
    title: "NBA Prop Line",
    description: "A website with an AI engineering model to predict over/unders in the NBA. Holds all NBA player data and webscrapes gamelogs to build a comprehensive database of player statistics for prop line analysis.",
    technologies: ["Web Scraping", "Database Design", "Data Visualization", "Statistical Analysis"],
    github: "https://github.com/ThatcherMcc/NBA-Player-Prop-Analysis",
    website: "https://nba-prop-website.vercel.app/",
    image: "/treasure-room/nba-prop-site.webp"
  },
  {
    id: 3,
    year: "2023",
    title: "Off World - Action RPG Game",
    description: "Developed an action RPG featuring a unique creature anatomy system that allows players to combine different creature parts and abilities for creative combat strategies.",
    technologies: ["Game Development", "Unity/Unreal", "System Design", "Creative Problem Solving"],
    github: "https://github.com/ThatcherMcc/Off-World",
    demo: "https://youtube.com/watch?v=I9-k-yx-beE",
    image: "/treasure-room/off-world.webp",
    status: "In Progress"
  }
];

export default function ProjectsSection() {
  const prefersReducedMotion = useReducedMotion();

  const linkStyle = { color: '#6b7685' };
  const linkIn = (e: React.MouseEvent<HTMLAnchorElement>) =>
    (e.currentTarget.style.color = '#10d988');
  const linkOut = (e: React.MouseEvent<HTMLAnchorElement>) =>
    (e.currentTarget.style.color = '#6b7685');

  return (
    <section
      id="projects"
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
          <p className="font-syne text-[9px] tracking-[0.4em] uppercase mb-3" style={{ color: '#10d988' }}>
            02
          </p>
          <h2
            className="font-cormorant text-5xl md:text-6xl"
            style={{ color: '#eae6dc', fontWeight: 600 }}
          >
            Featured Projects
          </h2>
        </motion.div>

        <div className="space-y-5">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: prefersReducedMotion ? 0 : index * 0.1,
                ease: [0.23, 1, 0.32, 1],
              }}
              viewport={{ once: true }}
              whileHover={prefersReducedMotion ? {} : { y: -3 }}
              className="group rounded-xl overflow-hidden transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(16,217,136,0.18)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
              }}
            >
              <div className="md:flex min-h-[220px]">
                {/* Image */}
                <div className="md:w-2/5 shrink-0 overflow-hidden" style={{ minHeight: '200px' }}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={256}
                    className="w-full h-52 md:h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                {/* Content */}
                <div className="p-7 md:w-3/5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="font-syne text-xs tracking-widest uppercase"
                        style={{ color: '#10d988' }}
                      >
                        {project.year}
                      </span>
                      {project.status && (
                        <span
                          className="font-syne text-xs px-2.5 py-1 rounded-full"
                          style={{
                            background: 'rgba(245,158,11,0.1)',
                            border: '1px solid rgba(245,158,11,0.25)',
                            color: '#f59e0b',
                          }}
                        >
                          {project.status}
                        </span>
                      )}
                    </div>
                    <h3
                      className="font-cormorant text-2xl md:text-3xl mb-3 leading-tight"
                      style={{ color: '#eae6dc', fontWeight: 600 }}
                    >
                      {project.title}
                    </h3>
                    <p
                      className="font-syne text-sm leading-relaxed mb-5"
                      style={{ color: '#6b7685', lineHeight: 1.75 }}
                    >
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="font-syne text-xs px-2.5 py-1 rounded-full"
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            color: '#6b7685',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-syne text-sm font-semibold inline-flex items-center gap-1.5 transition-colors duration-200"
                      style={linkStyle}
                      onMouseEnter={linkIn}
                      onMouseLeave={linkOut}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-syne text-sm font-semibold transition-colors duration-200"
                        style={linkStyle}
                        onMouseEnter={linkIn}
                        onMouseLeave={linkOut}
                      >
                        Demo →
                      </a>
                    )}
                    {project.website && (
                      <a
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-syne text-sm font-semibold transition-colors duration-200"
                        style={linkStyle}
                        onMouseEnter={linkIn}
                        onMouseLeave={linkOut}
                      >
                        Website →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
