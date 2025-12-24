"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useState, useMemo } from "react";
import { logo, text } from "../styles/fonts";
import ProjectModal from "../components/ProjectModal";
import portfolioData from "../../data/data.json";

const projects = portfolioData.projects.map((project) => ({
  ...project,
  featured: false, // You can add this to data.json if needed
  github: project.repo || "#",
  live: project.link || "#",
}));

const statusFilters = ["All", "Live", "Building"];

export default function Projects() {
  const [activeStatusFilter, setActiveStatusFilter] = useState("All");
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get all unique categories
  const categories = useMemo(() => {
    const cats = projects
      .map((p) => p.category)
      .filter((cat): cat is string => Boolean(cat));
    return ["All", ...Array.from(new Set(cats))];
  }, []);

  const filteredProjects = projects.filter((project) => {
    const statusMatch = activeStatusFilter === "All" || project.status === activeStatusFilter;
    const categoryMatch = activeCategoryFilter === "All" || project.category === activeCategoryFilter;
    return statusMatch && categoryMatch;
  });

  const handleProjectClick = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

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
            <span className={`text-xs font-semibold tracking-wider uppercase text-zinc-400 mb-2 ${text.className}`}>Portfolio</span>
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
            className="mb-8 space-y-4"
          >
            {/* Status Filters */}
            <div>
              <span className={`text-xs font-semibold text-zinc-400 mb-2 block ${text.className}`}>
                Status
              </span>
              <div className="flex gap-2 flex-wrap">
                {statusFilters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveStatusFilter(filter)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeStatusFilter === filter
                        ? "bg-white text-black"
                        : "bg-zinc-800/50 text-zinc-400 hover:text-white hover:bg-zinc-800"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filters */}
            <div>
              <span className={`text-xs font-semibold text-zinc-400 mb-2 block ${text.className}`}>
                Category
              </span>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategoryFilter(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategoryFilter === category
                        ? "bg-white text-black"
                        : "bg-zinc-800/50 text-zinc-400 hover:text-white hover:bg-zinc-800"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
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
                    onClick={() => handleProjectClick(project)}
                    className="bg-zinc-800/60 backdrop-blur-xl border border-zinc-700/40 rounded-2xl overflow-hidden transition-all hover:bg-zinc-800/80 hover:border-white/20 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)] cursor-pointer"
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
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-zinc-800/60 hidden md:block" />
                        {/* Category Badge */}
                        {project.category && (
                          <div className="absolute top-3 left-3">
                            <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-zinc-900/80 backdrop-blur-sm text-zinc-300 border border-zinc-700/40">
                              {project.category}
                            </span>
                          </div>
                        )}
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

                        {/* Click to view details */}
                        <div className="flex items-center gap-2 text-sm text-zinc-400">
                          <span>Click to view details</span>
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
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
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
                    onClick={() => handleProjectClick(project)}
                    className="bg-zinc-800/60 backdrop-blur-xl border border-zinc-700/40 rounded-2xl p-5 group transition-all hover:bg-zinc-800/80 hover:border-white/20 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)] cursor-pointer"
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
                      {project.category && (
                        <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-zinc-800/50 text-zinc-300 border border-zinc-700/40">
                          {project.category}
                        </span>
                      )}
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

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
