"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { logo, text } from "../styles/fonts";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce solution with real-time inventory management, secure payment processing with Stripe, and a comprehensive admin dashboard for store management.",
    technologies: ["Next.js", "Stripe", "PostgreSQL", "Redis", "Tailwind CSS"],
    status: "Live",
    github: "https://github.com/adityakrcodes",
    live: "#",
    image: "/images/pfp.png",
    featured: true,
  },
  {
    title: "Task Management App",
    description:
      "Collaborative project management tool with real-time updates, team features, drag-and-drop task boards, and integrated chat functionality.",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "TypeScript"],
    status: "Live",
    github: "https://github.com/adityakrcodes",
    live: "#",
    image: "/images/pfp.png",
    featured: true,
  },
  {
    title: "AI Content Generator",
    description:
      "Intelligent content creation tool powered by machine learning for marketing teams. Generate blog posts, social media content, and more.",
    technologies: ["Python", "FastAPI", "OpenAI", "React", "PostgreSQL"],
    status: "Building",
    github: "https://github.com/adityakrcodes",
    live: "#",
    image: "/images/pfp.png",
    featured: true,
  },
  {
    title: "Real-time Chat Application",
    description:
      "Scalable messaging platform with end-to-end encryption, file sharing, and video calling capabilities.",
    technologies: ["React", "WebRTC", "Socket.io", "Node.js"],
    status: "Live",
    github: "https://github.com/adityakrcodes",
    live: "#",
    image: "/images/pfp.png",
    featured: false,
  },
  {
    title: "Portfolio Website Builder",
    description:
      "Drag-and-drop portfolio builder for developers and designers with customizable themes and one-click deployment.",
    technologies: ["Next.js", "Prisma", "PostgreSQL", "Vercel"],
    status: "Live",
    github: "https://github.com/adityakrcodes",
    live: "#",
    image: "/images/pfp.png",
    featured: false,
  },
  {
    title: "Fitness Tracking App",
    description:
      "Mobile-first fitness application with workout logging, progress tracking, and personalized recommendations.",
    technologies: ["React Native", "Firebase", "Node.js", "TensorFlow"],
    status: "Building",
    github: "https://github.com/adityakrcodes",
    live: "#",
    image: "/images/pfp.png",
    featured: false,
  },
];

const filters = ["All", "Live", "Building"];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "All") return true;
    return project.status === activeFilter;
  });

  return (
    <div className="min-h-screen">
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <span className={`section-label ${text.className}`}>Portfolio</span>
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${logo.className}`}>Projects</h1>
            <p className={`text-zinc-400 max-w-2xl ${text.className}`}>
              A collection of projects I've built, from full-stack applications to
              open-source contributions. Each project represents a unique challenge
              and learning experience.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex gap-2 mb-8"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === filter
                    ? "bg-white text-black"
                    : "bg-zinc-800/50 text-zinc-400 hover:text-white hover:bg-zinc-800"
                }`}
              >
                {filter}
              </button>
            ))}
          </motion.div>

          {/* Featured Projects */}
          <div className="mb-12">
            <h2 className={`text-lg font-semibold mb-6 text-zinc-400 ${logo.className}`}>
              Featured Projects
            </h2>
            <div className="space-y-6">
              {filteredProjects
                .filter((p) => p.featured)
                .map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="glass-card overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Image */}
                      <div className="relative w-full md:w-80 h-48 md:h-auto shrink-0">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--card-bg)] hidden md:block" />
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col justify-between flex-1">
                        <div>
                          <div className="flex items-start justify-between mb-3">
                            <h3 className={`text-xl font-semibold ${logo.className}`}>
                              {project.title}
                            </h3>
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${
                                project.status === "Live"
                                  ? "bg-emerald-500/20 text-emerald-400"
                                  : "bg-white/10 text-white"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            project.status === "Live"
                              ? "bg-emerald-400"
                              : "bg-white"
                          }`}
                        />
                              {project.status}
                            </span>
                          </div>
                          <p className={`text-zinc-400 mb-4 ${text.className}`}>
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="text-xs px-2 py-1 bg-zinc-800/50 text-zinc-400 rounded"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Links */}
                        <div className="flex gap-3">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            Code
                          </a>
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-white hover:text-zinc-300 transition-colors"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                            Live Demo
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>

          {/* Other Projects Grid */}
          <div>
            <h2 className={`text-lg font-semibold mb-6 text-zinc-400 ${logo.className}`}>
              Other Projects
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects
                .filter((p) => !p.featured)
                .map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="glass-card p-5 group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                          />
                        </svg>
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-zinc-500 hover:text-white transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </a>
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-zinc-500 hover:text-white transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                    <h3 className={`font-semibold mb-2 group-hover:text-white transition-colors ${logo.className}`}>
                      {project.title}
                    </h3>
                    <p className={`text-zinc-400 text-sm mb-4 line-clamp-2 ${text.className}`}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs text-zinc-500"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
