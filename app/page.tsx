"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { logo, text } from "./styles/fonts";

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
                <span className="status-dot" />
                <span className="text-sm text-zinc-400">
                  Available for work
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className={`text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 ${logo.className}`}
              >
                Hi, I'm{" "}
                <span className="text-gradient">Aditya</span>
                <br />
                <span className="text-zinc-400">Full Stack Developer</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className={`text-lg md:text-xl text-zinc-400 max-w-xl mb-8 ${text.className}`}
              >
                I build interactive web apps using{" "}
                <span className="text-white">TypeScript</span>,{" "}
                <span className="text-white">React</span>, and{" "}
                <span className="text-white">Next.js</span>. Focused on creating
                beautiful, performant experiences.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap justify-center md:justify-start gap-4 w-full"
              >
                <Link href="/contact" className="btn-primary">
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
                <Link href="/projects" className="btn-secondary">
                  <span>View Projects</span>
                </Link>
              </motion.div>
            </div>

            {/* Profile Image */}
            <motion.div
              variants={fadeInUp}
              className="relative w-64 h-64 md:w-80 md:h-80"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl blur-3xl" />
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-zinc-800 glow">
                <Image
                  src="/images/pfp.png"
                  alt="Aditya"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Floating badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -bottom-4 -right-4 px-4 py-2 glass-card"
              >
                <span className="text-2xl">🚀</span>
              </motion.div>
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
            className="mb-12"
          >
            <span className={`section-label ${text.className}`}>Featured</span>
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
                className="glass-card p-6"
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
                    <span key={tech} className="skill-tag">
                      {tech}
                    </span>
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
            className="mb-12"
          >
            <span className={`section-label ${text.className}`}>Featured</span>
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
                className="glass-card overflow-hidden group project-card"
              >
                {/* Project Image */}
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="project-image-overlay" />
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
            <Link href="/projects" className="btn-secondary">
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
              <span className={`section-label ${text.className}`}>About</span>
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${logo.className}`}>Me</h2>
              <div className="glass-card p-6">
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
              <span className={`section-label ${text.className}`}>Tech Stack</span>
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${logo.className}`}>Skills</h2>
              <div className="glass-card p-6">
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="skill-tag"
                    >
                      {skill}
                    </motion.span>
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
            className="glass-card p-12 text-center"
          >
            <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${logo.className}`}>
              Let's build something amazing together
            </h2>
            <p className={`text-zinc-400 mb-8 max-w-lg mx-auto ${text.className}`}>
              Have a project in mind? I'd love to hear about it. Let's discuss
              how we can bring your ideas to life.
            </p>
            <div className="flex justify-center">
              <Link href="/contact" className="btn-primary">
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
