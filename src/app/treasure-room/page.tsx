"use client";

import React from "react";
import ProjectsSection from "./components/ProjectSection";
import AllowScroll from "../captains-quarters/components/AllowScroll";
import Link from "next/link";
import Image from "next/image";

// --- Main Treasure Room Page ---
export default function TreasureRoomPage() {
  return (
    <>
      <AllowScroll />
      <div className="bg-stone-950 min-h-screen text-stone-200">
        <div
          className="fixed inset-0 w-full h-full z-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/treasure-room/treasure-planet-bg.png)",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="absolute inset-0 w-full h-full backdrop-blur-sm"></div>
        </div>

        <div className="relative z-5">
          {/* Page Title */}
          <h1
            className="text-center text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-600
                     drop-shadow-lg drop-shadow-yellow-500/50 p-4 mt-4 mb-8"
          >
            The Treasure Room
          </h1>
        </div>
        <Link href="/?boatState=interior" className="fixed left-12 top-10 z-10">
          <div className="relative w-30 h-30 cursor-pointer group">
            <Image
              src="/treasure-room/green-planet.png"
              alt="Green planet icon from treasure planet's map"
              layout="fill"
              objectFit="contain"
              className="transition-transform duration-300 scale-125 group-hover:scale-150"
            />
            <span className="absolute left-1/2 -translate-x-1/2 top-3/4 mt-2 bg-stone-800 text-stone-200 px-3 py-1 rounded-full text-xs font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100 whitespace-nowrap">
              Return to Home Planet
            </span>
          </div>
        </Link>
        <ProjectsSection />
      </div>
    </>
  );
}
