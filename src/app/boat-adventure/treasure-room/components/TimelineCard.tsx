"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Project } from "../configs/ProjectsConfig";

const STATUS_CONFIG: Record<
  number,
  { text: string; color: string; bg: string; border: string }
> = {
  2: {
    text: "Finished",
    color: "#6dcf8c",
    bg: "rgba(109,207,140,0.08)",
    border: "rgba(109,207,140,0.25)",
  },
  1: {
    text: "In Progress",
    color: "#7db8e8",
    bg: "rgba(125,184,232,0.08)",
    border: "rgba(125,184,232,0.25)",
  },
  0: {
    text: "Paused",
    color: "#e88a7a",
    bg: "rgba(232,138,122,0.08)",
    border: "rgba(232,138,122,0.25)",
  },
};

export default function ProjectCard({ project }: { project: Project }) {
  const statusConfig =
    project.status != null ? STATUS_CONFIG[project.status] : null;

  return (
    <div
      className="group relative rounded-xl overflow-hidden transition-all duration-300
                 hover:-translate-y-1.5"
      style={{
        background: "rgba(14, 8, 28, 0.88)",
        border: "1px solid rgba(180, 140, 50, 0.2)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(200, 160, 60, 0.5)";
        e.currentTarget.style.boxShadow =
          "0 12px 40px rgba(140, 90, 10, 0.15), 0 4px 24px rgba(0,0,0,0.4), inset 0 0 30px rgba(200,146,58,0.04)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(180, 140, 50, 0.2)";
        e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.4)";
      }}
    >
      {/* Left-edge page binding gradient */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(200,146,58,0.6), rgba(200,146,58,0.2) 50%, rgba(200,146,58,0.6))",
        }}
      />

      {/* Decorative corner marks with brass rivets (opacity 0.35 → 0.55) */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t border-l opacity-55 z-10" style={{ borderColor: "#d4a04a" }}>
        <div className="absolute -top-[1px] -left-[1px] w-1 h-1 rounded-full" style={{ background: "#d4a04a" }} />
      </div>
      <div className="absolute top-3 right-3 w-4 h-4 border-t border-r opacity-55 z-10" style={{ borderColor: "#d4a04a" }}>
        <div className="absolute -top-[1px] -right-[1px] w-1 h-1 rounded-full" style={{ background: "#d4a04a" }} />
      </div>
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l opacity-55 z-10" style={{ borderColor: "#d4a04a" }}>
        <div className="absolute -bottom-[1px] -left-[1px] w-1 h-1 rounded-full" style={{ background: "#d4a04a" }} />
      </div>
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r opacity-55 z-10" style={{ borderColor: "#d4a04a" }}>
        <div className="absolute -bottom-[1px] -right-[1px] w-1 h-1 rounded-full" style={{ background: "#d4a04a" }} />
      </div>

      {/* ─── Desktop: Horizontal layout ─── */}
      <div className="hidden md:flex">
        {/* Image section — 55% */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative w-[55%] min-h-[300px]"
        >
          <Image
            src={project.imageUrl}
            alt={project.alt}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 55vw"
            style={{ objectFit: "cover" }}
            className="transition-transform duration-500 group-hover:scale-[1.04]"
          />
          {/* Gradient blend into text section */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to right, transparent 60%, rgba(14, 8, 28, 0.88) 100%)",
            }}
          />
        </motion.div>

        {/* Text section — 45% */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="w-[45%] p-6 md:p-8 flex flex-col justify-center"
        >
          {/* Year badge */}
          <span
            className="font-cormorant text-xs tracking-[0.15em] uppercase pb-2 mb-3"
            style={{
              color: "#d4a04a",
              borderBottom: "1px solid rgba(212, 160, 74, 0.2)",
              display: "inline-block",
              alignSelf: "flex-start",
            }}
          >
            Expedition {project.year}
          </span>

          {/* Title */}
          <h3
            className="font-cormorant font-semibold text-xl md:text-2xl mb-3 leading-tight"
            style={{ color: "#ede4d0" }}
          >
            {project.title}
          </h3>

          {/* Status badge */}
          {statusConfig && (
            <div
              className="text-xs font-semibold rounded-full px-3 py-0.5 inline-block mb-4"
              style={{
                color: statusConfig.color,
                background: statusConfig.bg,
                border: `1px solid ${statusConfig.border}`,
                alignSelf: "flex-start",
              }}
            >
              {statusConfig.text}
            </div>
          )}

          {/* Description — always visible */}
          <p
            className="font-serif text-sm leading-[1.8] mb-4 transition-colors duration-300 group-hover:text-stone-200"
            style={{ color: "#9a8e7e" }}
          >
            {project.description}
          </p>

          {/* Crew Manifest — tech chips */}
          {project.tech && project.tech.length > 0 && (
            <div className="mb-5">
              <span
                className="font-cormorant text-[10px] tracking-[0.2em] uppercase block mb-2"
                style={{ color: "rgba(200,146,58,0.5)" }}
              >
                Crew Manifest
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="font-cormorant text-[11px] tracking-[0.1em] px-2 py-0.5"
                    style={{
                      color: "#c8923a",
                      background: "rgba(200,146,58,0.08)",
                      border: "1px solid rgba(200,146,58,0.2)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="flex flex-col gap-2">
            <Link
              href={project.github}
              className="inline-flex items-center gap-2 text-sm font-serif text-amber-300 hover:text-amber-100 transition-colors"
              target="_blank"
              onClick={(e) => e.stopPropagation()}
            >
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub Repository
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>
            {project.demoUrl && (
              <Link
                href={project.demoUrl}
                className="inline-flex items-center gap-2 text-sm font-serif text-amber-300 hover:text-amber-100 transition-colors"
                target="_blank"
                onClick={(e) => e.stopPropagation()}
              >
                ▶ Demo Video
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            )}
          </div>
        </motion.div>
      </div>

      {/* ─── Mobile: Vertical stack ─── */}
      <div className="md:hidden">
        {/* Image — full width, 200px tall */}
        <div className="relative w-full h-[200px]">
          <Image
            src={project.imageUrl}
            alt={project.alt}
            fill
            loading="lazy"
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          {/* Bottom gradient blend */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, transparent 60%, rgba(14, 8, 28, 0.88) 100%)",
            }}
          />
        </div>

        {/* Text content */}
        <div className="p-5">
          {/* Year + Status inline */}
          <div className="flex items-center gap-3 mb-3">
            <span
              className="font-cormorant text-xs tracking-[0.15em] uppercase"
              style={{ color: "#d4a04a" }}
            >
              Expedition {project.year}
            </span>
            {statusConfig && (
              <div
                className="text-xs font-semibold rounded-full px-2.5 py-0.5"
                style={{
                  color: statusConfig.color,
                  background: statusConfig.bg,
                  border: `1px solid ${statusConfig.border}`,
                }}
              >
                {statusConfig.text}
              </div>
            )}
          </div>

          {/* Title */}
          <h3
            className="font-cormorant font-semibold text-xl mb-3 leading-tight"
            style={{ color: "#ede4d0" }}
          >
            {project.title}
          </h3>

          {/* Description — always visible */}
          <p
            className="font-serif text-sm leading-[1.8] mb-3"
            style={{ color: "#9a8e7e" }}
          >
            {project.description}
          </p>

          {/* Crew Manifest — tech chips (mobile) */}
          {project.tech && project.tech.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="font-cormorant text-[11px] tracking-[0.1em] px-2 py-0.5"
                    style={{
                      color: "#c8923a",
                      background: "rgba(200,146,58,0.08)",
                      border: "1px solid rgba(200,146,58,0.2)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Links — touch-friendly (min 44px) */}
          <div className="flex flex-col gap-2">
            <Link
              href={project.github}
              className="inline-flex items-center gap-2 text-sm font-serif text-amber-300 min-h-[44px]"
              target="_blank"
            >
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub Repository →
            </Link>
            {project.demoUrl && (
              <Link
                href={project.demoUrl}
                className="inline-flex items-center gap-2 text-sm font-serif text-amber-300 min-h-[44px]"
                target="_blank"
              >
                ▶ Demo Video →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
