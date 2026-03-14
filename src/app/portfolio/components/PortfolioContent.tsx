"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AllowScroll from 'rt/app/boat-adventure/components/AllowScroll';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ProjectsSection from './ProjectsSection';
import SkillsSection from './SkillsSection';
import ContactSection from './ContactSection';

const NAV_SECTIONS = ['about', 'projects', 'skills', 'contact'] as const;

export default function PortfolioContent() {
  const [activeSection, setActiveSection] = useState('about');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sectionEls = NAV_SECTIONS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the most visible section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { threshold: [0.2, 0.5], rootMargin: '-10% 0px -10% 0px' }
    );

    sectionEls.forEach((el) => observerRef.current!.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <AllowScroll />
      <motion.div
        className="font-syne"
        style={{ background: '#070b13', minHeight: '100dvh' }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Navigation */}
        <nav
          aria-label="Portfolio sections"
          className="fixed top-0 w-full backdrop-blur-md z-50"
          style={{
            background: 'rgba(7,11,19,0.88)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            paddingTop: 'env(safe-area-inset-top, 0px)',
          }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14">
              <span
                className="text-base font-syne font-semibold tracking-wide shrink-0"
                style={{ color: '#eae6dc' }}
              >
                Thatcher McClure
              </span>
              {/* Desktop nav */}
              <div role="tablist" aria-label="Portfolio sections" className="hidden md:flex space-x-8">
                {NAV_SECTIONS.map((section) => (
                  <button
                    key={section}
                    role="tab"
                    aria-selected={activeSection === section}
                    aria-controls={section}
                    onClick={() => scrollToSection(section)}
                    className={`capitalize text-sm font-syne tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10d988] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070b13] rounded-sm ${
                      activeSection === section ? 'font-semibold' : ''
                    }`}
                    style={{ color: activeSection === section ? '#10d988' : '#7a8898' }}
                    onMouseEnter={(e) => {
                      if (activeSection !== section) e.currentTarget.style.color = '#eae6dc';
                    }}
                    onMouseLeave={(e) => {
                      if (activeSection !== section) e.currentTarget.style.color = '#7a8898';
                    }}
                  >
                    {section}
                  </button>
                ))}
              </div>
              <Link
                href="/"
                aria-label="Back to home"
                className="text-sm font-syne shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10d988] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070b13] rounded-sm"
                style={{ color: '#7a8898' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#eae6dc')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#7a8898')}
              >
                ← Home
              </Link>
            </div>
          </div>
          {/* Mobile nav */}
          <div
            className="md:hidden border-t overflow-x-auto"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <div role="tablist" aria-label="Portfolio sections" className="flex px-4 py-1 gap-6">
              {NAV_SECTIONS.map((section) => (
                <button
                  key={section}
                  role="tab"
                  aria-selected={activeSection === section}
                  aria-controls={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize whitespace-nowrap text-sm py-1.5 border-b-2 font-syne transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10d988] focus-visible:ring-offset-1 focus-visible:ring-offset-[#070b13] rounded-sm ${
                    activeSection === section ? 'font-semibold' : ''
                  }`}
                  style={{
                    color: activeSection === section ? '#10d988' : '#7a8898',
                    borderBottomColor: activeSection === section ? '#10d988' : 'transparent',
                  }}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </nav>

        <main id="main-content">
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <ContactSection />
        </main>

        {/* Footer */}
        <footer
          className="py-10 px-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="max-w-6xl mx-auto text-center">
            <p
              suppressHydrationWarning={true}
              className="font-syne text-sm"
              style={{ color: '#3d4553' }}
            >
              © {new Date().getFullYear()} Thatcher McClure · Built with Next.js & React
            </p>
          </div>
        </footer>
      </motion.div>
    </>
  );
}
