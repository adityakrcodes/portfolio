"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { logo, text } from "../styles/fonts";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  status: string;
  image: string;
  category?: string;
}

interface ProjectCardProps {
  project: Project;
  index?: number;
  onClick: () => void;
  animationDelay?: number;
}

export default function ProjectCard({ 
  project, 
  index = 0, 
  onClick,
  animationDelay = 0 
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: animationDelay + index * 0.1 }}
      onClick={onClick}
      className="bg-zinc-800/60 backdrop-blur-xl border border-zinc-700/40 rounded-2xl overflow-hidden group transition-all hover:bg-zinc-800/80 hover:border-white/20 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)] cursor-pointer"
    >
      {/* Project Image */}
      <div className="relative h-40 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${
              project.status === "Live"
                ? "bg-emerald-500/20 text-emerald-400"
                : project.status === "Building"
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-white/10 text-white"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                project.status === "Live"
                  ? "bg-emerald-400"
                  : project.status === "Building"
                  ? "bg-yellow-400"
                  : "bg-white"
              }`}
            />
            {project.status}
          </span>
        </div>
        {/* Category Badge */}
        {project.category && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-zinc-900/80 backdrop-blur-sm text-zinc-300 border border-zinc-700/40">
              {project.category}
            </span>
          </div>
        )}
      </div>

      {/* Project Info */}
      <div className="p-5">
        <h3 className={`text-lg font-semibold mb-2 group-hover:text-white transition-colors ${logo.className}`}>
          {project.title}
        </h3>
        <p className={`text-zinc-400 text-sm mb-4 line-clamp-2 ${text.className}`}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 bg-zinc-800/50 text-zinc-400 rounded"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-xs px-2 py-1 bg-zinc-800/50 text-zinc-500 rounded">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

