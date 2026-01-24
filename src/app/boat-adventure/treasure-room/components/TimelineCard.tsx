import Link from "next/link";
import { useState } from "react";
import { Project } from "../configs/ProjectsConfig";

const TimelineCard = ({
  project,
  position,
}: {
  project: Project;
  position: "left" | "right";
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  const getStatusText = (status: number | undefined) => {
    switch (status) {
      case 2:
        return <span className="text-green-400"> (Finished)</span>;
      case 1:
        return <span className="text-blue-500"> (In Progress)</span>;
      case 0:
        return <span className="text-red-400"> (Paused)</span>;
      default:
        return null;
    }
  };

  return (
    <div
      className={`group relative w-full md:w-1/2 ${
        position === "right" ? "md:translate-x-full" : ""
      }`}
    >
      <div
        className="relative bg-yellow-600 p-6 rounded-md shadow-xl
                  transition-all duration-300 hover:shadow-2xl overflow-visible cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex gap-6 items-center">
          {/* Main content, with image and title first */}
          {project.imageUrl && (
            <img
              src={project.imageUrl}
              alt={`${project.alt}`}
              className="rounded-lg w-24 h-24 object-cover flex-shrink-0"
            />
          )}
          <h3 className="text-2xl font-bold text-white flex flex-col">
            <span>
              {project.year} - {project.title}
            </span>
            {project.status != null && (
              <div
                className="mt-2 text-sm font-semibold rounded-full px-4 py-1 
                          bg-gray-800 inline-block self-start"
              >
                {getStatusText(project.status)}
              </div>
            )}
          </h3>
        </div>

        {/* The expandable section */}
        <div
          className={`
            absolute left-0 right-0 top-8/9 mt-0 
            bg-gradient-to-b from-yellow-600 to-stone-900 
            rounded-lg shadow-xl
            transition-all duration-300 ease-in-out 
            p-6
            /* Desktop hover effects */
            md:opacity-0 md:transform md:origin-top
            md:group-hover:opacity-100 md:group-hover:transform md:group-hover:scale-100
            /* Mobile click effects */
            ${
              isExpanded
                ? "opacity-100 transform scale-100"
                : "opacity-0 transform origin-top md:opacity-0"
            }
          `}
        >
          <p className="text-white text-md mb-4">{project.description}</p>
          <div className="flex flex-col gap-1">
            {/* Using when I implement full project pages
            <Link
              href={project.link}
              className="inline-block text-sm text-yellow-200 hover:underline"
            >
              Full Project Page &rarr;
            </Link>
            */}

            <Link
              href={project.github}
              className="inline-block text-sm text-green-300 hover:underline"
              target="_blank"
              onClick={(e) => e.stopPropagation()}
            >
              GitHub Repo &rarr;
            </Link>
            {project.demoUrl && (
              <Link
                href={project.demoUrl}
                className="inline-block text-sm text-green-300 hover:underline"
                target="_blank"
                onClick={(e) => e.stopPropagation()}
              >
                Short Demo Video &rarr;
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineCard;
