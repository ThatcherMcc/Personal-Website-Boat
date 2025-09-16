"use client";

import Link from "next/link";
import { useState } from "react";

export default function NavTabs() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleExteriorClick = () => {
    window.dispatchEvent(new CustomEvent("exteriorClick"));
  };

  return (
    <nav className="fixed top-0 right-0 w-full p-5 z-50">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden absolute top-4 right-4 z-50 text-cloud"
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 md:h-16 md:w-16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 md:h-16 md:w-16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-midnight/95 sz-40 transition-all duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col justify-center items-center h-full space-y-8 text-cloud text-2xl md:text-4xl font-DM font-bold">
          <li>
            <Link
              href="/"
              className="hover:text-gray-400"
              onClick={() => {
                toggleMenu();
                handleExteriorClick();
              }}
            >
              Sea
            </Link>
          </li>
          <li>
            <Link
              href="/captains-quarters"
              className="hover:text-gray-400"
              onClick={toggleMenu}
            >
              About Me
            </Link>
          </li>
          <li>
            <Link
              href="/treasure-room"
              className="hover:text-gray-400"
              onClick={toggleMenu}
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              href="/boat/resume.pdf"
              rel="noopener noreferrer"
              target="_blank"
              className="hover:text-gray-400"
              onClick={toggleMenu}
            >
              Resume
            </Link>
          </li>
        </ul>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex justify-end space-x-6 text-cloud md:text-2xl xl:text-3xl font-DM font-bold tracking-normal">
        <li>
          <Link
            href="/"
            className="hover:text-gray-400"
            onClick={handleExteriorClick}
          >
            Ship
          </Link>
        </li>
        <li>
          <Link href="/captains-quarters" className="hover:text-gray-400">
            About Me
          </Link>
        </li>
        <li>
          <Link
            href="/treasure-room"
            className="hover:text-gray-400 transition-transform duration-200"
          >
            Projects
          </Link>
        </li>
        <li>
          <Link
            href="/boat/resume.pdf"
            rel="noopener noreferrer"
            target="_blank"
            className="hover:text-gray-400"
          >
            Resume
          </Link>
        </li>
      </ul>
    </nav>
  );
}
