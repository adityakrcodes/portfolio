"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { logo, text } from "../styles/fonts";

const navLinks = [
  { href: "/#hero", label: "Home", sectionId: "hero" },
  { href: "/#experience", label: "Experience", sectionId: "experience" },
  { href: "/#projects", label: "Projects", sectionId: "projects" },
  { href: "/#about", label: "About", sectionId: "about" },
  { href: "/#contact", label: "Contact", sectionId: "contact" },
  { href: "/blog", label: "Blog" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Track active section on the home page using IntersectionObserver
  useEffect(() => {
    if (pathname !== "/") return;

    const sections = document.querySelectorAll<HTMLElement>("[data-section]");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-section");
            if (id) {
              setActiveSection(id);
            }
          }
        });
      },
      {
        root: null,
        threshold: 0.4,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between bg-zinc-800/60 backdrop-blur-xl border border-zinc-700/40 rounded-2xl px-4 py-3 transition-all hover:bg-zinc-800/80 hover:border-white/20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <span className={`text-xl ${logo.className}`}>
                AdityaKrCodes <span className="text-zinc-400 font-normal text-sm">v2.1</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 bg-zinc-900/50 rounded-full p-1">
              {navLinks.map((link) => {
                const isSectionLink = !!link.sectionId && pathname === "/";
                const isActive = isSectionLink
                  ? activeSection === link.sectionId
                  : pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${text.className} ${
                      isActive
                        ? "text-black"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute inset-0 bg-white rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="hidden md:flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-white text-[#0a0a0b] rounded-full transition-all hover:scale-105 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.2)] hover:bg-zinc-300"
            >
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-4 right-4 z-40 bg-zinc-800/60 backdrop-blur-xl border border-zinc-700/40 rounded-2xl p-4 md:hidden transition-all hover:bg-zinc-800/80 hover:border-white/20"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isSectionLink = !!link.sectionId && pathname === "/";
                const isActive = isSectionLink
                  ? activeSection === link.sectionId
                  : pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${text.className} ${
                      isActive
                        ? "bg-white text-black"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-white text-[#0a0a0b] rounded-full transition-all hover:scale-105 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.2)] hover:bg-zinc-300 mt-2"
              >
                Get in touch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
