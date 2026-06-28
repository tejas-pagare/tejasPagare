import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavPill from "@/components/nav-pill";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tejas Pagare | Full Stack & Generative AI Engineer",
  description: "Architecting intelligent systems. I build high-performance, scalable applications bridging the gap between sophisticated backend infrastructure and AI-driven user experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-50 font-sans selection:bg-zinc-50/10 selection:text-zinc-50 overflow-x-hidden">
        {/* Floating Navigation Pill */}
        <NavPill />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col pt-28 overflow-x-hidden">
          {children}
        </div>

        {/* Footer */}
        <footer className="w-full border-t border-zinc-800 bg-zinc-950/20 py-8 px-6 md:px-8 mt-auto">
          <div className="mx-auto max-w-[1024px] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-medium">
            <div>
              © 2024 Developer Portfolio. Built with architectural rigor.
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/tejas-pagare"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-zinc-300 transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/tejas-pagare"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-zinc-300 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://twitter.com/tejas_pagare"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-zinc-300 transition-colors"
              >
                Twitter
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
