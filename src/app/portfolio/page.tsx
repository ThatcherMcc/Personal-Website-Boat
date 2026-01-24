"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AllowScroll from '../boat-adventure/captains-quarters/components/AllowScroll';
import Link from 'next/link';
import Image from 'next/image';

export default function PortfolioPage() {
  const [activeSection, setActiveSection] = useState('about');

  const projects = [
    {
      id: 1,
      year: "2025",
      title: "Customer Segmentation Analysis",
      description: "Developed a K-Means clustering solution to analyze real-world transactional data from a service-based business, identifying distinct customer segments using RFM (Recency, Frequency, Monetary) modeling.",
      technologies: ["Python", "K-Means Clustering", "Data Analysis", "RFM Model"],
      github: "https://github.com/ThatcherMcc/Customer-Segmentation-Analysis",
      image: "/treasure-room/data-clustering-plot.jpg"
    },
    {
      id: 2,
      year: "2024",
      title: "NBA Player Prop Analysis",
      description: "Built a web scraping tool and database to aggregate NBA player statistics, creating an interactive visualization system for analyzing player performance trends against betting prop lines.",
      technologies: ["Web Scraping", "Database Design", "Data Visualization", "Statistical Analysis"],
      github: "https://github.com/ThatcherMcc/NBA-Player-Prop-Analysis",
      website: "https://nba-prop-website.vercel.app/",
      image: "/treasure-room/nba-player-prop.jpg",
      status: "In Progress"
    },
    {
      id: 3,
      year: "2023",
      title: "Off World - Action RPG Game",
      description: "Developed an action RPG featuring a unique creature anatomy system that allows players to combine different creature parts and abilities for creative combat strategies.",
      technologies: ["Game Development", "Unity/Unreal", "System Design", "Creative Problem Solving"],
      github: "https://github.com/ThatcherMcc/Off-World",
      demo: "https://youtube.com/watch?v=I9-k-yx-beE",
      image: "/treasure-room/off-world.jpg",
      status: "In Progress"
    }
  ];

  const skills = {
    "Programming Languages": ["Python", "C#", "TypeScript", "Java"],
    "Web Development": ["React", "Next.js", "Node.js", "HTML/CSS", "Tailwind CSS"],
    "Data & Analytics": ["Pandas", "Machine Learning", "Statistical Modeling", "Data Visualization"],
    "Tools & Technologies": ["Git", "SQL", "REST APIs", "Web Scraping", "Database Design"]
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <AllowScroll />
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-xl font-bold text-gray-900">Thatcher McClure</h1>
              <div className="hidden md:flex space-x-8">
                {['about', 'projects', 'skills', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`capitalize transition-colors ${
                      activeSection === section
                        ? 'text-green-600 font-semibold'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </div>
              <Link
                href="/"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                ← Home
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              {/* Professional headshot */}
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-4xl font-bold overflow-hidden">
                <Image 
                  src="/thatcher-pics/thatch-woods.jpeg" 
                  alt="Thatcher McClure"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                Thatcher McClure
              </h1>
              <p className="text-2xl text-gray-600 mb-6">
                Software Developer & Data Analyst
              </p>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
                Creator at heart who finds fulfillment in building solutions and experiences that make an impact
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="/boat/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  View Resume
                </a>
                
                <a
                  href="https://github.com/ThatcherMcc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors font-semibold"
                >
                  GitHub
                </a>
                
                <a
                  href="#contact"
                  className="border-2 border-gray-800 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-800 hover:text-white transition-colors font-semibold"
                >
                  Contact Me
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-gray-50 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">About Me</h2>
              
              <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  I&apos;m a creator at heart who finds fulfillment in building solutions for myself and others. 
                  I believe creation takes many forms—whether it&apos;s solving a complex problem, providing a 
                  new experience that leads to fresh perspectives, or developing an impactful idea.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  With a strong foundation in both software development and data analysis, I approach 
                  challenges with curiosity and determination. I&apos;m passionate about turning ideas into 
                  reality through code and finding insights in data that drive meaningful decisions.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">When I&apos;m Not Coding</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Spending time with family and my girlfriend of 5 years</li>
                    <li>• Watching and ranking movies</li>
                    <li>• Playing games with friends</li>
                    <li>• Discovering new music</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Currently Learning</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Playing the guitar</li>
                    <li>• Speaking Chinese (Mandarin)</li>
                    <li>• Altering clothes</li>
                    <li>• Holding a handstand</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Featured Projects</h2>
              
              <div className="space-y-8">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={400}
                          height={256}
                          className="w-full h-64 md:h-full object-cover"
                        />
                      </div>
                      <div className="p-8 md:w-2/3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-green-600">{project.year}</span>
                          {project.status && (
                            <span className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                              {project.status}
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>
                        
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex gap-4">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-800 hover:text-green-600 font-semibold flex items-center gap-1"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            View Code
                          </a>
                          {project.demo && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-800 hover:text-green-600 font-semibold flex items-center gap-1"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                              </svg>
                              Watch Demo
                            </a>
                          )}
                          {project.website && (
                            <a
                              href={project.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-800 hover:text-green-600 font-semibold flex items-center gap-1"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                              </svg>
                              View Website
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 bg-gray-50 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Technical Skills</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(skills).map(([category, items], index) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-green-50 text-green-700 rounded-lg font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Let&apos;s Connect</h2>
              <p className="text-xl text-gray-600 mb-8">
                I&apos;m always interested in hearing about new opportunities and projects
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                {/* TODO: Replace with your actual email */}
                
                <a
                  href="mailto:your.email@example.com"
                  className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <span className="font-semibold">Email Me</span>
                </a>
                
                {/* TODO: Replace with your actual LinkedIn URL */}
                
                <a
                  href="https://linkedin.com/in/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span className="font-semibold">LinkedIn</span>
                </a>
                
                
                <a
                  href="https://github.com/ThatcherMcc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span className="font-semibold">GitHub</span>
                </a>
              </div>

              <div className="bg-gray-50 rounded-lg p-8">
                <p className="text-gray-700">
                  Want to explore my work in a more creative way?
                </p>
                
                <a
                  href="/boat-adventure"
                  className="inline-block mt-4 text-green-600 hover:text-green-700 font-semibold"
                >
                  Check out my interactive portfolio →
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <p suppressHydrationWarning={true} className="text-gray-400">
              © {new Date().getFullYear()} Thatcher McClure. Built with React & Next.js
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}