import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { text } from "./styles/fonts";

export const metadata: Metadata = {
  title: "Aditya | Full Stack Developer",
  description: "Full Stack Developer specializing in React, Next.js, and modern web technologies. Focused on creating beautiful, performant and scalable experiences.",
  keywords: ["Full Stack Developer", "React", "Next.js", "TypeScript", "Web Development", "AdityaKrCodes"],
  authors: [{ name: "Aditya" }],
  openGraph: {
    title: "Aditya | Full Stack Developer",
    description: "Full Stack Developer specializing in React, Next.js, and modern web technologies. Focused on creating beautiful, performant and scalable experiences.",
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
        <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:60px_60px]" />
        <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,255,255,0.03),transparent)]" />
        
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
