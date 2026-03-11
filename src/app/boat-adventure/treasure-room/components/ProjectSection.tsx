"use client";

import { projects } from "../configs/ProjectsConfig";
import ProjectCard from "./TimelineCard";
import React from "react";
import { motion } from "framer-motion";

function WaypointMarker() {
  return (
    <div className="hidden md:flex items-center justify-center py-4">
      {/* Horizontal line left */}
      <div
        className="flex-1 h-px max-w-24"
        style={{ background: "linear-gradient(to right, transparent, rgba(212, 160, 74, 0.25))" }}
      />
      {/* 4-pointed star */}
      <div className="mx-4 relative w-3 h-3" style={{ opacity: 0.25 }}>
        <div
          className="absolute inset-0"
          style={{
            background: "#d4a04a",
            clipPath: "polygon(50% 0%, 60% 40%, 100% 50%, 60% 60%, 50% 100%, 40% 60%, 0% 50%, 40% 40%)",
          }}
        />
      </div>
      {/* Horizontal line right */}
      <div
        className="flex-1 h-px max-w-24"
        style={{ background: "linear-gradient(to left, transparent, rgba(212, 160, 74, 0.25))" }}
      />
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
              <WaypointMarker />
            </div>
          )}
        </React.Fragment>
      ))}

      {/* Bottom spacing before green planet */}
      <div className="h-16 md:h-24" />
    </div>
  );
}
