import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { text } from "./styles/fonts";

export const metadata: Metadata = {
  title: "Aditya | Full Stack Developer",
  description: "Full Stack Developer specializing in React, Next.js, and modern web technologies. Building digital experiences that matter.",
  keywords: ["Full Stack Developer", "React", "Next.js", "TypeScript", "Web Development"],
  authors: [{ name: "Aditya" }],
  openGraph: {
    title: "Aditya | Full Stack Developer",
    description: "Full Stack Developer specializing in React, Next.js, and modern web technologies.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" className="dark" style={{ '--font-league-spartan': text.style.fontFamily } as React.CSSProperties}>
      <body className={`min-h-screen flex flex-col ${text.className}`}>
        {/* Background layers */}
        <div className="fixed inset-0 grid-pattern pointer-events-none" />
        <div className="fixed inset-0 radial-overlay pointer-events-none" />
        
        {/* Content */}
        <Navbar />
        <main className="flex-1 pt-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
