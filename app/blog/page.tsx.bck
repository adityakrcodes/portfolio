"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { logo, text } from "../styles/fonts";

const blogPosts = [
  {
    title: "Building Scalable Web Applications with Next.js 15",
    excerpt:
      "Explore the latest features in Next.js 15 and learn how to build performant, scalable applications with Server Components and the App Router.",
    date: "Dec 15, 2025",
    readTime: "8 min read",
    tags: ["Next.js", "React", "Performance"],
    slug: "nextjs-15-scalable-apps",
    featured: true,
  },
  {
    title: "The Art of Writing Clean Code",
    excerpt:
      "Practical tips and principles for writing maintainable, readable code that your future self (and teammates) will thank you for.",
    date: "Dec 10, 2025",
    readTime: "6 min read",
    tags: ["Best Practices", "Clean Code"],
    slug: "clean-code-principles",
    featured: true,
  },
  {
    title: "Understanding TypeScript Generics",
    excerpt:
      "A deep dive into TypeScript generics - from basic concepts to advanced patterns that will level up your type safety.",
    date: "Dec 5, 2025",
    readTime: "10 min read",
    tags: ["TypeScript", "Tutorial"],
    slug: "typescript-generics-guide",
    featured: false,
  },
  {
    title: "Database Design Patterns for Modern Apps",
    excerpt:
      "Learn about database design patterns that help you build scalable and maintainable applications.",
    date: "Nov 28, 2025",
    readTime: "12 min read",
    tags: ["Database", "Architecture"],
    slug: "database-design-patterns",
    featured: false,
  },
  {
    title: "CSS Grid vs Flexbox: When to Use What",
    excerpt:
      "A practical guide to choosing between CSS Grid and Flexbox for your layout needs.",
    date: "Nov 20, 2025",
    readTime: "5 min read",
    tags: ["CSS", "Frontend"],
    slug: "css-grid-vs-flexbox",
    featured: false,
  },
];

export default function Blog() {
  const featuredPosts = blogPosts.filter((post) => post.featured);
  const otherPosts = blogPosts.filter((post) => !post.featured);

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
            <span className={`text-xs font-semibold tracking-wider uppercase text-zinc-400 mb-2 ${text.className}`}>Writing</span>
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${logo.className}`}>Blog</h1>
            <p className={`text-zinc-400 max-w-2xl ${text.className}`}>
              Thoughts on web development, programming, and building great
              software. I write about things I learn and experiences I want to
              share.
            </p>
          </motion.div>

          {/* Featured Posts */}
          <div className="mb-16">
            <h2 className={`text-lg font-semibold mb-6 text-zinc-400 ${logo.className}`}>
              Featured Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block bg-zinc-800/60 backdrop-blur-xl border border-zinc-700/40 rounded-2xl p-6 h-full group transition-all hover:bg-zinc-800/80 hover:border-white/20 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)]"
                  >
                    <div className="flex flex-col h-full">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-white/10 text-white rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className={`text-xl font-semibold mb-3 group-hover:text-white transition-colors ${logo.className}`}>
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className={`text-zinc-400 text-sm mb-4 grow ${text.className}`}>
                        {post.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-xs text-zinc-500">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>

          {/* All Posts */}
          <div>
            <h2 className={`text-lg font-semibold mb-6 text-zinc-400 ${logo.className}`}>
              All Articles
            </h2>
            <div className="space-y-4">
              {otherPosts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl hover:bg-zinc-800/30 transition-colors group"
                  >
                    <div className="flex-1">
                      <h3 className={`font-medium group-hover:text-white transition-colors mb-1 ${logo.className}`}>
                        {post.title}
                      </h3>
                      <p className={`text-sm text-zinc-500 line-clamp-1 ${text.className}`}>
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-zinc-500 shrink-0">
                      <span>{post.date}</span>
                      <span className="hidden md:inline">•</span>
                      <span>{post.readTime}</span>
                      <svg
                        className="w-4 h-4 text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all"
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
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Newsletter CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <div className="bg-zinc-800/60 backdrop-blur-xl border border-zinc-700/40 rounded-2xl p-8 text-center transition-all hover:bg-zinc-800/80 hover:border-white/20 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)]">
              <h3 className={`text-xl font-semibold mb-2 ${logo.className}`}>
                Stay updated with my latest posts
              </h3>
              <p className={`text-zinc-400 mb-6 max-w-md mx-auto ${text.className}`}>
                Subscribe to get notified when I publish new articles. No spam,
                unsubscribe anytime.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-sm focus:outline-none focus:border-white transition-colors"
                />
                <button type="submit" className="inline-flex items-center justify-center gap-2 px-6 py-3 font-medium bg-white text-[#0a0a0b] rounded-full transition-all hover:scale-105 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.2)] hover:bg-zinc-300 whitespace-nowrap">
                  Subscribe
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
