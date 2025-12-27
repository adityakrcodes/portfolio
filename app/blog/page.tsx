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
        <section id="blog" data-section="blog" className="py-24 px-4">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-12">Building</h2>
            </div>
        </section>
    </div>
  );
}
