import { projects } from "../configs/ProjectsConfig";
import TimelineCard from "./TimelineCard";
import React from "react";

export default function ProjectsSection() {
  const items = projects;

  return (
    <div className="relative p-8 max-w-7xl mx-auto">
      {/* The vertical line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-stone-700 hidden md:block"></div>

      {/* The timeline items */}
      <div className="flex flex-col">
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
