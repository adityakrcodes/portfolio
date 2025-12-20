"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { logo, text } from "../styles/fonts";

const contactMethods = [
  {
    name: "Email",
    value: "hello@adityakrcodes.dev",
    href: "mailto:hello@adityakrcodes.dev",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    value: "@adityakrcodes",
    href: "https://twitter.com/adityakrcodes",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    value: "adityakrcodes",
    href: "https://linkedin.com/in/adityakrcodes",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    value: "adityakrcodes",
    href: "https://github.com/adityakrcodes",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    // Reset form
    setFormState({ name: "", email: "", subject: "", message: "" });
    alert("Message sent! I'll get back to you soon.");
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
            className="mb-12 text-center"
          >
            <span className={`section-label ${text.className}`}>Contact</span>
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${logo.className}`}>
              Let's Work Together
            </h1>
            <p className={`text-zinc-400 max-w-xl mx-auto ${text.className}`}>
              Have a project in mind or just want to say hi? I'd love to hear
              from you. Fill out the form below or reach out through any of my
              social channels.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact Methods */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:col-span-1"
            >
              <div className="glass-card p-6 sticky top-28">
                <h2 className={`text-lg font-semibold mb-6 ${logo.className}`}>Get in Touch</h2>
                <div className="space-y-4">
                  {contactMethods.map((method) => (
                    <a
                      key={method.name}
                      href={method.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-zinc-800/50 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors">
                        {method.icon}
                      </div>
                      <div>
                        <p className={`text-sm text-zinc-500 ${text.className}`}>{method.name}</p>
                        <p className={`text-sm font-medium group-hover:text-white transition-colors ${text.className}`}>
                          {method.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Availability */}
                <div className="mt-8 pt-6 border-t border-zinc-800">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="status-dot" />
                    <span className={`text-sm font-medium ${text.className}`}>
                      Available for work
                    </span>
                  </div>
                  <p className={`text-xs text-zinc-500 ${text.className}`}>
                    Currently accepting freelance projects and full-time
                    opportunities.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-2"
            >
              <div className="glass-card p-6 md:p-8">
                <h2 className={`text-lg font-semibold mb-6 ${logo.className}`}>Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className={`block text-sm font-medium text-zinc-400 mb-2 ${text.className}`}
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-sm focus:outline-none focus:border-white transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className={`block text-sm font-medium text-zinc-400 mb-2 ${text.className}`}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-sm focus:outline-none focus:border-white transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className={`block text-sm font-medium text-zinc-400 mb-2 ${text.className}`}
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={formState.subject}
                      onChange={(e) =>
                        setFormState({ ...formState, subject: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-sm focus:outline-none focus:border-white transition-colors"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className={`block text-sm font-medium text-zinc-400 mb-2 ${text.className}`}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-sm focus:outline-none focus:border-white transition-colors resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <div className="flex justify-center">
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="w-4 h-4 animate-spin"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
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
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
