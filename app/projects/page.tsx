"use client";

import { motion } from "motion/react";
import { useState, useMemo } from "react";
import { logo, text } from "../styles/fonts";
import ProjectModal from "../components/ProjectModal";
import ProjectCard from "../components/ProjectCard";
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

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                onClick={() => handleProjectClick(project)}
                animationDelay={0}
              />
            ))}
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
