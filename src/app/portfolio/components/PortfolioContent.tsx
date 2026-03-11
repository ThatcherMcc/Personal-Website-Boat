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
        className="min-h-screen font-syne"
        style={{ background: '#070b13' }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Navigation */}
        <nav
          className="fixed top-0 w-full backdrop-blur-md z-50"
          style={{
            background: 'rgba(7,11,19,0.88)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14">
              <h1
                className="text-base font-syne font-semibold tracking-wide shrink-0"
                style={{ color: '#eae6dc' }}
              >
                Thatcher McClure
              </h1>
              {/* Desktop nav */}
              <div className="hidden md:flex space-x-8">
                {NAV_SECTIONS.map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`capitalize text-sm font-syne tracking-wide transition-colors ${
                      activeSection === section ? 'font-semibold' : ''
                    }`}
                    style={{ color: activeSection === section ? '#10d988' : '#6b7685' }}
                    onMouseEnter={(e) => {
                      if (activeSection !== section) e.currentTarget.style.color = '#eae6dc';
                    }}
                    onMouseLeave={(e) => {
                      if (activeSection !== section) e.currentTarget.style.color = '#6b7685';
                    }}
                  >
                    {section}
                  </button>
                ))}
              </div>
              <Link
                href="/"
                className="text-sm font-syne shrink-0 transition-colors"
                style={{ color: '#6b7685' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#eae6dc')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#6b7685')}
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
            <div className="flex px-4 py-1 gap-6">
              {NAV_SECTIONS.map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize whitespace-nowrap text-sm py-1.5 border-b-2 font-syne transition-colors ${
                    activeSection === section ? 'font-semibold' : ''
                  }`}
                  style={{
                    color: activeSection === section ? '#10d988' : '#6b7685',
                    borderBottomColor: activeSection === section ? '#10d988' : 'transparent',
                  }}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </nav>

        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />

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
