"use client";

import { projects } from "../configs/ProjectsConfig";
import ProjectCard from "./TimelineCard";
import React from "react";
import { motion } from "framer-motion";

const JOURNEY_TEXTS = [
  "The expedition continued deeper into uncharted waters…",
  "Each discovery led to new horizons yet to be mapped…",
];

function WaypointMarker({ idx }: { idx: number }) {
  return (
    <div className="hidden md:flex flex-col items-center gap-3 py-4">
      <div className="flex items-center w-full">
        {/* Horizontal line left */}
        <div
          className="flex-1 h-px max-w-32"
          style={{ background: "linear-gradient(to right, transparent, rgba(212, 160, 74, 0.3))" }}
        />
        {/* Compass rose SVG */}
        <div className="mx-4 relative" style={{ opacity: 0.45 }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {/* 8-pointed compass rose */}
            <polygon points="10,1 11.2,8.8 10,10 8.8,8.8" fill="#d4a04a" />
            <polygon points="10,19 11.2,11.2 10,10 8.8,11.2" fill="#d4a04a" opacity="0.6" />
            <polygon points="1,10 8.8,11.2 10,10 8.8,8.8" fill="#d4a04a" opacity="0.6" />
            <polygon points="19,10 11.2,8.8 10,10 11.2,11.2" fill="#d4a04a" />
            <polygon points="3.2,3.2 9.2,9.2 10,10 9.2,10.8" fill="#d4a04a" opacity="0.4" />
            <polygon points="16.8,16.8 10.8,10.8 10,10 10.8,9.2" fill="#d4a04a" opacity="0.4" />
            <polygon points="3.2,16.8 9.2,10.8 10,10 10.8,10.8" fill="#d4a04a" opacity="0.4" />
            <polygon points="16.8,3.2 10.8,9.2 10,10 9.2,9.2" fill="#d4a04a" opacity="0.4" />
            <circle cx="10" cy="10" r="1.5" fill="#d4a04a" />
          </svg>
        </div>
        {/* Horizontal line right */}
        <div
          className="flex-1 h-px max-w-32"
          style={{ background: "linear-gradient(to left, transparent, rgba(212, 160, 74, 0.3))" }}
        />
      </div>
      {/* Journey text */}
      <span
        className="font-cormorant italic text-xs tracking-[0.12em] text-center"
        style={{ color: "rgba(212,160,74,0.35)" }}
      >
        {JOURNEY_TEXTS[idx % JOURNEY_TEXTS.length]}
      </span>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <div className="relative max-w-4xl mx-auto px-4 md:px-8">
      {projects.map((project, index) => (
        <React.Fragment key={project.id}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, margin: "-60px" }}
          >
            <ProjectCard project={project} />
          </motion.div>

          {/* Waypoint marker between cards (not after last) */}
          {index < projects.length - 1 && (
            <div className="my-16 md:my-24">
              <WaypointMarker idx={index} />
            </div>
          )}
        </React.Fragment>
      ))}

      {/* Bottom spacing before green planet */}
      <div className="h-16 md:h-24" />
    </div>
  );
}
