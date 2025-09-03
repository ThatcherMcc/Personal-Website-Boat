import Link from "next/link";
import React from "react";
import { Project } from "../configs/ProjectsConfig";

const TimelineCard = ({
  project,
  position,
}: {
  project: Project;
  position: "left" | "right";
}) => {
  const cardClasses = position === "left" ? "" : "translate-x-full";

  return (
    <div className={`relative mb-8 w-1/2 ${cardClasses}`}>
      <div className="bg-stone-800 p-6 rounded-lg shadow-xl border border-stone-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        <h3 className="text-xl font-bold mb-2 text-stone-300">
          {project.year} - {project.title}
        </h3>

        <p className="text-stone-400 text-sm">{project.description}</p>

        <Link
          href={project.link}
          className="inline-block mt-4 text-sm text-amber-400 hover:underline"
        >
          View Project &rarr;
        </Link>
      </div>
    </div>
  );
};

export default TimelineCard;
