"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { logo, text } from "../styles/fonts";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  status: string;
  link?: string;
  live?: string;
  repo?: string;
  github?: string;
  image: string;
  category?: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  const liveLink = project.link || project.live;
  const repoLink = project.repo || project.github;
  const hasLiveLink = liveLink && liveLink !== "#";
  const hasRepoLink = repoLink && repoLink !== "#";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="bg-zinc-900/95 backdrop-blur-xl border border-zinc-700/40 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto shadow-[0_20px_60px_-12px_rgba(0,0,0,0.8)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-400 hover:text-white transition-all"
                aria-label="Close modal"
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Project Image */}
              <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-t-2xl">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full ${
                      project.status === "Live"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-white/10 text-white border border-white/20"
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
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Title */}
                <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${logo.className} flex items-center gap-2`}>
                  {project.title} {/* Category Badge */}
                {project.category && (
                    <span className="inline-flex items-center p-2 text-sm font-medium rounded-full bg-zinc-800/80 backdrop-blur-sm text-zinc-300 border border-zinc-700/40">
                      {project.category}
                    </span>
                )}
                </h2>

                {/* Description */}
                <p className={`text-zinc-400 text-lg mb-6 leading-relaxed ${text.className}`}>
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="mb-8">
                  <h3 className={`text-sm font-semibold text-zinc-400 mb-3 uppercase tracking-wider ${text.className}`}>
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-sm bg-zinc-800/60 text-zinc-300 rounded-lg border border-zinc-700/40"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Live Link */}
                  <a
                    href={hasLiveLink ? liveLink : undefined}
                    target={hasLiveLink ? "_blank" : undefined}
                    rel={hasLiveLink ? "noopener noreferrer" : undefined}
                    className={`inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-full transition-all ${
                      hasLiveLink
                        ? "bg-white text-[#0a0a0b] hover:scale-105 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.2)] hover:bg-zinc-300 cursor-pointer"
                        : "bg-zinc-800/40 text-zinc-600 border border-zinc-700/40 cursor-not-allowed opacity-50"
                    }`}
                    onClick={(e) => {
                      if (!hasLiveLink) {
                        e.preventDefault();
                      }
                    }}
                  >
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
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    <span>Live Demo</span>
                  </a>

                  {/* Repo Link */}
                  <a
                    href={hasRepoLink ? repoLink : undefined}
                    target={hasRepoLink ? "_blank" : undefined}
                    rel={hasRepoLink ? "noopener noreferrer" : undefined}
                    className={`inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-full transition-all border ${
                      hasRepoLink
                        ? "bg-transparent text-white border-white/40 hover:border-white hover:bg-white/10 cursor-pointer"
                        : "bg-zinc-800/40 text-zinc-600 border-zinc-700/40 cursor-not-allowed opacity-50"
                    }`}
                    onClick={(e) => {
                      if (!hasRepoLink) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span>View Code</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

