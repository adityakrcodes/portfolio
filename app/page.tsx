"use client";

import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { logo, text } from "./styles/fonts";
import GitHubContributions from "./components/GitHubContributions";
import { useState } from "react";

// Tech logos mapping (using DevIcons CDN)
const techLogos: Record<string, { icon: string; color: string }> = {
  TypeScript: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    color: "#3178C6",
  },
  React: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    color: "#61DAFB",
  },
  "Next.js": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    color: "#ffffff",
  },
  "Node.js": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    color: "#339933",
  },
  PostgreSQL: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    color: "#4169E1",
  },
  AWS: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    color: "#FF9900",
  },
  "Tailwind CSS": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    color: "#06B6D4",
  },
  Firebase: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",
    color: "#FFCA28",
  },
  MongoDB: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
    color: "#47A248",
  },
  Docker: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
    color: "#2496ED",
  },
  Git: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    color: "#F05032",
  },
  Figma: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
    color: "#F24E1E",
  },
  Python: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    color: "#3776AB",
  },
  FastAPI: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
    color: "#009688",
  },
  Redis: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
    color: "#DC382D",
  },
  Stripe: {
    icon: "https://images.ctfassets.net/fzn2n1nzq965/HTTOloNPhisV9P4hlMPNA/cacf1bb88b9fc492dfad34378d844280/Stripe_logo.svg",
    color: "#635BFF",
  },
  "Socket.io": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg",
    color: "#ffffff",
  },
  OpenAI: {
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@develop/icons/openai.svg",
    color: "#412991",
  },
  "REST APIs": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/json/json-original.svg",
    color: "#00ADD8",
  },
};

// Check if icon needs invert filter (for dark icons on dark bg)
const needsInvert = ["Next.js", "Socket.io", "OpenAI", "AWS"];

// TechHover component (inline text version)
function TechHover({ name }: { name: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const tech = techLogos[name];

  return (
    <span
      className="relative inline-block cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.span
        className="text-white relative z-10 px-1 py-0.5 rounded"
        animate={{
          color: isHovered ? tech?.color || "#ffffff" : "#ffffff",
        }}
      >
        {name}
      </motion.span>
      
      <AnimatePresence>
        {isHovered && tech && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.12,
              ease: "easeOut",
            }}
            className="absolute -top-14 left-1/2 -translate-x-1/2 z-50"
          >
            <motion.div
              className="relative p-3 rounded-xl backdrop-blur-xl border border-white/20 flex items-center justify-center min-w-[56px] min-h-[56px]"
              style={{ 
                background: `linear-gradient(135deg, ${tech.color}15 0%, ${tech.color}08 100%)`,
                boxShadow: `0 0 30px ${tech.color}30, 0 10px 40px rgba(0,0,0,0.3)`
              }}
            >
              <motion.img
                src={tech.icon}
                alt={name}
                className="max-w-[20px] max-h-[20px] w-auto h-auto object-contain"
                style={{ 
                  filter: needsInvert.includes(name) 
                    ? `invert(1) drop-shadow(0 -2px 4px ${tech.color}80)` 
                    : `drop-shadow(0 -2px 4px ${tech.color}80)`
                }}
                initial={{ rotate: -20, scale: 0.5 }}
                animate={{ 
                  rotate: 0, 
                  scale: 1,
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 15 
                }}
              />
              
              {/* Animated glow ring */}
              <motion.div
                className="absolute inset-0 rounded-xl"
                style={{ 
                  border: `1px solid ${tech.color}`,
                  boxShadow: `0 0 15px ${tech.color}50`
                }}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Floating particles */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{ backgroundColor: tech.color }}
                  initial={{ 
                    x: 0, 
                    y: 0, 
                    opacity: 0,
                    left: "50%",
                    top: "50%"
                  }}
                  animate={{ 
                    x: [0, (i - 1) * 15], 
                    y: [0, -20 - i * 5],
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 1.2,
                    delay: i * 0.15,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
              ))}
            </motion.div>
            
            {/* Arrow pointer */}
            <motion.div
              className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-r border-b border-white/20"
              style={{ 
                background: `linear-gradient(135deg, ${tech.color}15 0%, ${tech.color}08 100%)`
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

// TechBadge component (for experience/skills tags)
function TechBadge({ name }: { name: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const tech = techLogos[name];

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.span
        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-white/10 text-white rounded-full border border-white/20 cursor-pointer"
        animate={{
          borderColor: isHovered && tech ? tech.color : "rgba(255,255,255,0.2)",
          backgroundColor: isHovered && tech ? `${tech.color}15` : "rgba(255,255,255,0.1)",
        }}
        whileHover={{ scale: 1.05 }}
      >
        <motion.span
          animate={{
            color: isHovered && tech ? tech.color : "#ffffff",
          }}
        >
          {name}
        </motion.span>
      </motion.span>
      
      <AnimatePresence>
        {isHovered && tech && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.12,
              ease: "easeOut",
            }}
            className="absolute -top-16 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <motion.div
              className="relative p-3 rounded-xl backdrop-blur-xl border border-white/20 flex items-center justify-center min-w-[56px] min-h-[56px]"
              style={{ 
                background: `linear-gradient(135deg, ${tech.color}15 0%, ${tech.color}08 100%)`,
                boxShadow: `0 0 30px ${tech.color}30, 0 10px 40px rgba(0,0,0,0.3)`
              }}
            >
              <motion.img
                src={tech.icon}
                alt={name}
                className="max-w-[20px] max-h-[20px] w-auto h-auto object-contain"
                style={{ 
                  filter: needsInvert.includes(name) 
                    ? `invert(1) drop-shadow(0 -2px 4px ${tech.color}80)` 
                    : `drop-shadow(0 -2px 4px ${tech.color}80)`
                }}
                initial={{ rotate: -20, scale: 0.5 }}
                animate={{ 
                  rotate: 0, 
                  scale: 1,
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 15 
                }}
              />
              
              {/* Animated glow ring */}
              <motion.div
                className="absolute inset-0 rounded-xl"
                style={{ 
                  border: `1px solid ${tech.color}`,
                  boxShadow: `0 0 15px ${tech.color}50`
                }}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Floating particles */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{ backgroundColor: tech.color }}
                  initial={{ 
                    x: 0, 
                    y: 0, 
                    opacity: 0,
                    left: "50%",
                    top: "50%"
                  }}
                  animate={{ 
                    x: [0, (i - 1) * 15], 
                    y: [0, -20 - i * 5],
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 1.2,
                    delay: i * 0.15,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
              ))}
            </motion.div>
            
            {/* Arrow pointer */}
            <motion.div
              className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-r border-b border-white/20"
              style={{
                background: `linear-gradient(135deg, ${tech.color}15 0%, ${tech.color}08 100%)`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Data
const experiences = [
  {
    title: "Full Stack Developer",
    company: "Aether Web Media",
    type: "Founder",
    period: "2022 - Present",
    location: "India (Remote)",
    description:
      "Building scalable web applications and helping businesses establish their digital presence.",
    technologies: ["Next.js", "React", "Node.js", "PostgreSQL", "AWS"],
    current: true,
  },
  {
    title: "Frontend Developer",
    company: "Freelance",
    type: "Contract",
    period: "2020 - 2022",
    location: "Remote",
    description:
      "Developed responsive web applications and landing pages for various clients worldwide.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Firebase"],
    current: false,
  },
];

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce solution with real-time inventory, payment processing, and admin dashboard.",
    technologies: ["Next.js", "Stripe", "PostgreSQL", "Redis"],
    status: "Live",
    link: "#",
    image: "/images/pfp.png",
  },
  {
    title: "Task Management App",
    description:
      "Collaborative project management tool with real-time updates and team features.",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
    status: "Live",
    link: "#",
    image: "/images/pfp.png",
  },
  {
    title: "AI Content Generator",
    description:
      "Intelligent content creation tool powered by machine learning for marketing teams.",
    technologies: ["Python", "FastAPI", "OpenAI", "React"],
    status: "Building",
    link: "#",
    image: "/images/pfp.png",
  },
];

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "MongoDB",
  "Tailwind CSS",
  "AWS",
  "Docker",
  "Git",
  "Figma",
  "REST APIs",
];

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex items-center px-4">
        <div className="max-w-5xl mx-auto w-full">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col md:flex-row items-center gap-12"
          >
            {/* Text Content */}
            <div className="flex-1 text-center md:text-left">
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-800/50 border border-zinc-700/50 mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-zinc-400">
                  Available for work
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className={`text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 ${logo.className}`}
              >
                Hi, I'm{" "}
                <span className="bg-gradient-to-br from-white via-zinc-300 to-zinc-400 bg-clip-text text-transparent">Aditya</span>
                <br />
                <span className="text-zinc-400">Full Stack Developer</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className={`text-lg md:text-xl text-zinc-400 max-w-xl mb-8 ${text.className}`}
              >
                I build interactive web apps using{" "}
                <TechHover name="TypeScript" />,{" "}
                <TechHover name="React" />, and{" "}
                <TechHover name="Next.js" />. Focused on creating
                beautiful, performant experiences.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap justify-center md:justify-start gap-4 w-full"
              >
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 font-medium bg-white text-[#0a0a0b] rounded-full transition-all hover:scale-105 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.2)] hover:bg-zinc-300">
                  <span>Get in touch</span>
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
                </Link>
                <Link href="/projects" className="inline-flex items-center justify-center gap-2 px-6 py-3 font-medium bg-transparent text-white border border-zinc-700/40 rounded-full transition-all hover:border-white hover:bg-white/10">
                  <span>View Projects</span>
                </Link>
              </motion.div>
            </div>

            {/* Profile Image */}
            <motion.div
              variants={fadeInUp}
              className="relative w-64 h-64 md:w-80 md:h-80"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-full blur-3xl" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-zinc-800 shadow-[0_0_60px_-12px_rgba(255,255,255,0.2)]">
                <Image
                  src="/images/pfp.png"
                  alt="Aditya"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-2"
          >
            <h2 className={`text-3xl md:text-4xl font-bold ${logo.className}`}>GitHub Contributions</h2>
          </motion.div>
          {/* GitHub Contributions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <GitHubContributions />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-5"
          >
            <span className={`text-xs font-semibold tracking-wider uppercase text-zinc-400 mb-2 ${text.className}`}>Featured</span>
            <h2 className={`text-3xl md:text-4xl font-bold ${logo.className}`}>Experience</h2>
          </motion.div>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-zinc-800/60 backdrop-blur-xl border border-zinc-700/40 rounded-2xl p-6 transition-all hover:bg-zinc-800/80 hover:border-white/20 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)]"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white font-bold">
                      {exp.company.charAt(0)}
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold ${logo.className}`}>{exp.company}</h3>
                      <p className={`text-zinc-400 text-sm ${text.className}`}>
                        {exp.title} · {exp.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {exp.current && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-400 rounded-full">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                        Current
                      </span>
                    )}
                    <span className="text-sm text-zinc-500">{exp.period}</span>
                  </div>
                </div>

                <p className={`text-zinc-400 mb-4 ${text.className}`}>{exp.description}</p>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <TechBadge key={tech} name={tech} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 flex justify-center"
          >
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            >
              <span>View full experience</span>
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
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 px-4 bg-zinc-900/30">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-5"
          >
            <span className={`text-xs font-semibold tracking-wider uppercase text-zinc-400 mb-2 ${text.className}`}>Featured</span>
            <h2 className={`text-3xl md:text-4xl font-bold ${logo.className}`}>Projects</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.a
                key={index}
                href={project.link}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-zinc-800/60 backdrop-blur-xl border border-zinc-700/40 rounded-2xl overflow-hidden group transition-all hover:bg-zinc-800/80 hover:border-white/20 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)]"
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
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 flex justify-center"
          >
            <Link href="/projects" className="inline-flex items-center justify-center gap-2 px-6 py-3 font-medium bg-transparent text-white border border-zinc-700/40 rounded-full transition-all hover:border-white hover:bg-white/10">
              <span>View all projects</span>
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
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About/Skills Section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* About */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className={`text-xs font-semibold tracking-wider uppercase text-zinc-400 mb-2 ${text.className}`}>About</span>
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${logo.className}`}>Me</h2>
              <div className="bg-zinc-800/60 backdrop-blur-xl border border-zinc-700/40 rounded-2xl p-6 transition-all hover:bg-zinc-800/80 hover:border-white/20 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)]">
                <p className={`text-zinc-400 leading-relaxed mb-4 ${text.className}`}>
                  I'm a Full Stack Developer with a passion for creating
                  beautiful, functional web applications. With years of
                  experience building everything from small business sites to
                  complex web platforms, I bring ideas to life through code.
                </p>
                <p className={`text-zinc-400 leading-relaxed ${text.className}`}>
                  Based in India, I work with clients globally to build
                  scalable solutions that make a real impact. When I'm not
                  coding, you'll find me exploring new technologies or
                  contributing to open source.
                </p>
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className={`text-xs font-semibold tracking-wider uppercase text-zinc-400 mb-2 ${text.className}`}>Tech Stack</span>
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${logo.className}`}>Skills</h2>
              <div className="bg-zinc-800/60 backdrop-blur-xl border border-zinc-700/40 rounded-2xl p-6 transition-all hover:bg-zinc-800/80 hover:border-white/20 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)]">
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <TechBadge name={skill} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-zinc-800/60 backdrop-blur-xl border border-zinc-700/40 rounded-2xl p-12 text-center transition-all hover:bg-zinc-800/80 hover:border-white/20 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)]"
          >
            <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${logo.className}`}>
              Let's build something amazing together
            </h2>
            <p className={`text-zinc-400 mb-8 max-w-lg mx-auto ${text.className}`}>
              Have a project in mind? I'd love to hear about it. Let's discuss
              how we can bring your ideas to life.
            </p>
            <div className="flex justify-center">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 font-medium bg-white text-[#0a0a0b] rounded-full transition-all hover:scale-105 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.2)] hover:bg-zinc-300">
                <span>Start a conversation</span>
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
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
