import { projects } from "../configs/ProjectsConfig";
import TimelineCard from "./TimelineCard";
import React from "react";

export default function ProjectsSection() {
  const items = projects;

  return (
    <div className="relative p-8 max-w-7xl mx-auto">
      <h1 className="relative text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-600 drop-shadow-lg drop-shadow-yellow-500/50 text-center mb-6">
        Project Timeline
        <span className="absolute bottom-[-4px] left-0 w-full h-1 bg-gradient-to-r from-yellow-300 to-amber-600"></span>
      </h1>
      {/* The vertical line - only visible on desktop */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bg-stone-900 h-full w-8 hidden md:block"></div>

      {/* The timeline items */}
      <div className="flex flex-col gap-35 mb-15">
        {items.map((project, index) => (
          <TimelineCard
            key={project.id}
            project={project}
            position={index % 2 == 0 ? "left" : "right"}
          />
        ))}
      </div>
    </div>
  );
}
