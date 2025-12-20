"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { logo, text } from "../styles/fonts";

const skills = {
  "Frontend": ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  "Backend": ["Node.js", "Express", "PostgreSQL", "MongoDB", "Redis"],
  "Tools & Others": ["Git", "Docker", "AWS", "Figma", "Vercel"],
};

const timeline = [
  {
    year: "2024",
    title: "Scaling Aether Web Media",
    description: "Expanded services and built a team of talented developers.",
  },
  {
    year: "2022",
    title: "Founded Aether Web Media",
    description: "Started my own web development agency to help businesses grow online.",
  },
  {
    year: "2020",
    title: "Started Freelancing",
    description: "Began taking on freelance projects and building my portfolio.",
  },
  {
    year: "2018",
    title: "First Line of Code",
    description: "Wrote my first 'Hello World' and fell in love with programming.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <span className={`section-label ${text.className}`}>About</span>
            <h1 className={`text-4xl md:text-5xl font-bold ${logo.className}`}>Me</h1>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:col-span-1"
            >
              <div className="glass-card p-6 sticky top-28">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-6">
                  <Image
                    src="/images/pfp.png"
                    alt="Aditya"
                    fill
                    className="object-cover"
                  />
                </div>
                <h2 className={`text-xl font-semibold mb-1 ${logo.className}`}>Aditya</h2>
                <p className={`text-zinc-400 text-sm mb-4 ${text.className}`}>Full Stack Developer</p>
                <div className={`flex items-center gap-2 text-sm text-zinc-500 mb-4 ${text.className}`}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>India</span>
                </div>
                <div className="pt-4 border-t border-zinc-800">
                  <p className={`text-sm text-zinc-400 ${text.className}`}>
                    Building digital experiences since 2018
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-2 space-y-8"
            >
              {/* Bio */}
              <div className="glass-card p-6">
                <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${logo.className}`}>
                  <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  Who I Am
                </h3>
                <div className={`space-y-4 text-zinc-400 ${text.className}`}>
                  <p>
                    I'm a Full Stack Developer with a passion for creating beautiful, 
                    functional web applications that solve real problems. With years of 
                    experience building everything from small business sites to complex 
                    web platforms, I bring ideas to life through code.
                  </p>
                  <p>
                    As the founder of Aether Web Media, I've helped numerous businesses 
                    establish a powerful online presence and build profitable ventures. 
                    Whether it's building a complex application or launching a brand's 
                    first website, I'm focused on creating impactful digital experiences.
                  </p>
                  <p>
                    When I'm not coding, you'll find me exploring new technologies, 
                    contributing to open source, or enjoying a good cup of coffee while 
                    brainstorming the next big idea.
                  </p>
                </div>
              </div>

              {/* Skills */}
              <div className="glass-card p-6">
                <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${logo.className}`}>
                  <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </span>
                  Tech Stack
                </h3>
                <div className="space-y-6">
                  {Object.entries(skills).map(([category, items]) => (
                    <div key={category}>
                      <h4 className={`text-sm font-medium text-zinc-500 mb-3 ${text.className}`}>{category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {items.map((skill) => (
                          <span key={skill} className="skill-tag">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="glass-card p-6">
                <h3 className={`text-lg font-semibold mb-6 flex items-center gap-2 ${logo.className}`}>
                  <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  Journey
                </h3>
                <div className="relative pl-6 border-l-2 border-zinc-800 space-y-8">
                  {timeline.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="relative"
                    >
                      <div className="absolute -left-[25px] w-3 h-3 rounded-full bg-white" />
                      <span className={`text-xs text-white font-medium ${text.className}`}>{item.year}</span>
                      <h4 className={`font-medium mt-1 ${logo.className}`}>{item.title}</h4>
                      <p className={`text-sm text-zinc-400 mt-1 ${text.className}`}>{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
