"use client";

import React from "react";
import ProjectsSection from "./components/ProjectSection";
import AllowScroll from "../captains-quarters/components/AllowScroll";

// --- Main Treasure Room Page ---
export default function TreasureRoomPage() {
  return (
    <>
      <AllowScroll />
      <div className="bg-stone-950 min-h-screen text-stone-200">
        <div
          className="fixed inset-0 w-full h-full z-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/treasure-planet-bg.png)",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="absolute inset-0 w-full h-full backdrop-blur-sm"></div>
        </div>

        <div className="relative z-20 outline outline-red-500">
          {/* Page Title */}
          <h1
            className="text-center text-6xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-600
                     drop-shadow-lg drop-shadow-yellow-500/50 p=4 mt-4"
          >
            The Treasure Room
          </h1>
        </div>
        <ProjectsSection />
      </div>
    </>
  );
}
