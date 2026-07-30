"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { logo, text } from "../styles/fonts";
import GitHubContributions from "../components/GitHubContributions";

const GITHUB_USERNAME = "adityakrcodes";

const links = [
  {
    label: "Website",
    href: "/",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
  {
    label: "X / Twitter",
    href: "https://twitter.com/adityakrcodes",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/adityakrcodes",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:adityacodes613@gmail.com",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface GitHubProfile {
  public_repos: number;
  followers: number;
  following: number;
}

const FALLBACK_PROFILE: GitHubProfile = {
  public_repos: 15,
  followers: 50,
  following: 0,
};

function calcLongestStreak(contributions: { date: string; count: number }[]): number {
  let max = 0;
  let cur = 0;
  let prev = "";
  for (const d of contributions) {
    if (d.count > 0) {
      const dt = new Date(d.date + "T00:00:00");
      const prevDate = prev ? new Date(prev + "T00:00:00") : null;
      if (prevDate && (dt.getTime() - prevDate.getTime()) === 86400000) {
        cur++;
      } else {
        cur = 1;
      }
      prev = d.date;
      if (cur > max) max = cur;
    }
  }
  return max;
}

export default function BioPage() {
  const [githubOpen, setGithubOpen] = useState(false);
  const [profile, setProfile] = useState<GitHubProfile>(FALLBACK_PROFILE);
  const [streak, setStreak] = useState<number | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.public_repos !== undefined) setProfile(data);
      })
      .catch(() => {});

    const year = new Date().getFullYear();
    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=${year}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.contributions) setStreak(calcLongestStreak(data.contributions));
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center px-4 py-16">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md flex flex-col items-center gap-8"
      >
        {/* Profile Picture */}
        <motion.div variants={fadeInUp} className="relative w-28 h-28">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-full blur-2xl" />
          <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-zinc-800 shadow-[0_0_40px_-8px_rgba(255,255,255,0.15)]">
            <Image
              src="/images/pfp.png"
              alt="Aditya"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Name & Tagline */}
        <motion.div variants={fadeInUp} className="text-center">
          <h1 className={`text-2xl font-bold mb-1 ${logo.className}`}>
            AdityaKrCodes
          </h1>
          <p className={`text-zinc-400 text-sm ${text.className}`}>
            Full Stack Developer · Building digital experiences
          </p>
        </motion.div>

        {/* Links */}
        <div className="w-full flex flex-col gap-3">
          {/* Other links */}
          {links.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeInUp}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-4 w-full px-5 py-4 bg-zinc-800/60 backdrop-blur-xl border border-zinc-700/40 rounded-2xl text-white transition-colors hover:bg-zinc-800/80 hover:border-white/20 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)]"
            >
              <span className="text-zinc-400">{link.icon}</span>
              <span className={`text-sm font-medium ${text.className}`}>
                {link.label}
              </span>
              <svg
                className="w-4 h-4 ml-auto text-zinc-500"
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
            </motion.a>
          ))}

          {/* GitHub expandable card */}
          <motion.div variants={fadeInUp}>
            <motion.button
              onClick={() => setGithubOpen(!githubOpen)}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-4 w-full px-5 py-4 bg-zinc-800/60 backdrop-blur-xl border border-zinc-700/40 rounded-2xl text-white transition-colors hover:bg-zinc-800/80 hover:border-white/20 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)]"
            >
              <span className="text-zinc-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </span>
              <span className={`text-sm font-medium ${text.className}`}>
                GitHub
              </span>
              <motion.svg
                animate={{ rotate: githubOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="w-4 h-4 ml-auto text-zinc-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            </motion.button>

            <AnimatePresence>
              {githubOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 flex flex-col gap-3">
                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: "Repos", value: profile.public_repos },
                        { label: "Followers", value: profile.followers },
                        { label: "Streak", value: streak ?? "—" },
                      ].map((stat) => (
                        <div
                          key={stat.label}
                          className="bg-zinc-800/60 backdrop-blur-xl border border-zinc-700/40 rounded-xl p-3 text-center"
                        >
                          <div className={`text-lg font-bold text-white ${logo.className}`}>
                            {stat.value}
                          </div>
                          <div className={`text-[10px] text-zinc-500 uppercase tracking-wider ${text.className}`}>
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Contribution graph */}
                    <GitHubContributions />
                    {/* Open profile link */}
                    <a
                      href={`https://github.com/${GITHUB_USERNAME}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-2 text-xs text-zinc-500 hover:text-white transition-colors py-1 ${text.className}`}
                    >
                      Open full profile
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
