"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/project-card";
import HeroSection from "@/components/hero/hero-section";
import { ScrollReveal, ScrollRevealGroup, ScrollRevealItem } from "@/components/scroll-reveal";
import projectsData from "@/data/project.json";

const TECH_SKILLS = [
  "NEXT.JS 14+",
  "FASTAPI",
  "NODE.JS",
  "EXPRESS.JS",
  "REST APIS",
  "JWT",
  "REDIS",
  "JEST TESTING",
  "JAVA",
  "PYTHON",
  "TYPESCRIPT",
  "JAVASCRIPT",
  "POSTGRESQL",
  "MONGODB",
  "AWS (EC2, SES)",
  "DOCKER",
  "KUBERNETES",
  "NGINX",
  "GIT",
  "GITHUB",
  "LANGCHAIN",
  "LANGGRAPH",
  "PGVECTOR",
  "LLMS",
  "RAG",
  "MCP",
  "OPENAI",
  "GEMINI",
  "CLAUDE",
  "CURSOR",
  "DATA STRUCTURES & ALGORITHMS"
];

export default function HomeView({ latestPosts }: { latestPosts?: React.ReactNode }) {
  // Grab the first two projects for the featured section
  const featuredProjects = projectsData.slice(0, 2);

  return (
    <>
      <HeroSection />

      <div className="mx-auto max-w-[1024px] w-full px-4 md:px-8 pb-12 lg:pb-24 flex flex-col gap-12 md:gap-20 overflow-x-hidden">
        {/* Tech Stack Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="relative w-full border-y border-zinc-850 py-4 overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-16 before:bg-gradient-to-r before:from-zinc-950 before:to-transparent before:content-[''] after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-16 after:bg-gradient-to-l after:from-zinc-950 after:to-transparent after:content-['']"
        >
          <motion.div
            className="flex"
            animate={{ x: [0, "-50%"] }}
            transition={{
              ease: "linear",
              duration: 30,
              repeat: Infinity,
            }}
          >
            {/* Track 1 */}
            <div className="flex min-w-full shrink-0 items-center justify-around gap-8 text-xs font-mono font-bold tracking-[0.2em] text-zinc-500 uppercase pr-8">
              {TECH_SKILLS.map((skill, idx) => (
                <React.Fragment key={`track1-${idx}`}>
                  <span>{skill}</span>
                  <span className="text-zinc-700">·</span>
                </React.Fragment>
              ))}
            </div>
            {/* Track 2 (Duplicate for seamless loop) */}
            <div className="flex min-w-full shrink-0 items-center justify-around gap-8 text-xs font-mono font-bold tracking-[0.2em] text-zinc-500 uppercase pr-8">
              {TECH_SKILLS.map((skill, idx) => (
                <React.Fragment key={`track2-${idx}`}>
                  <span>{skill}</span>
                  <span className="text-zinc-700">·</span>
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Featured Work Section */}
        <section className="flex flex-col gap-8">
          <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-2 max-w-xl">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-50">
                Featured Work
              </h2>
              <p className="text-sm leading-relaxed text-zinc-400">
                A selection of robust, production-grade applications emphasizing intelligent
                architecture and seamless user experiences.
              </p>
            </div>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-1 text-xs font-semibold text-zinc-400 hover:text-zinc-50 transition-colors"
            >
              <span>View all projects</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </ScrollReveal>

          {/* Projects Grid */}
          <ScrollRevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <ScrollRevealItem key={project.slug}>
                <ProjectCard
                  slug={project.slug}
                  title={project.title}
                  shortDescription={project.shortDescription}
                  techStack={project.techStack}
                  type={project.type}
                  badge={project.slug === "swiftmart" ? "Featured" : undefined}
                  imageUrl={(project as any).imageUrl}
                />
              </ScrollRevealItem>
            ))}
          </ScrollRevealGroup>
        </section>

        {/* Latest Writing Section (rendered on the server and slotted in) */}
        {latestPosts && (
          <section className="flex flex-col gap-8">
            <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="flex flex-col gap-2 max-w-xl">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-50">
                  Latest Writing
                </h2>
                <p className="text-sm leading-relaxed text-zinc-400">
                  Engineering notes on systems, AI and the lessons learned shipping them.
                </p>
              </div>
              <Link
                href="/blog"
                className="group inline-flex items-center gap-1 text-xs font-semibold text-zinc-400 hover:text-zinc-50 transition-colors"
              >
                <span>Read the blog</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>{latestPosts}</ScrollReveal>
          </section>
        )}

        {/* Coding Profiles Section */}
        <section
          id="engineering-stats"
          className="w-full max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-zinc-900/60"
        >
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-50 mb-4">
              Coding Profiles
            </h2>
            <p className="text-zinc-400 max-w-2xl leading-relaxed text-sm md:text-base mb-12">
              Quantifying problem-solving velocity through algorithmic benchmarks, architectural efficiency, and open-source contributions.
            </p>
          </ScrollReveal>

          <ScrollRevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: LeetCode */}
            <ScrollRevealItem>
            <motion.a
              href="https://leetcode.com/u/Tejas_1625/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex flex-col p-6 rounded-xl border border-zinc-900 bg-zinc-950/40 backdrop-blur-md justify-between hover:border-zinc-700 group"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-orange-500 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.483 0a1.374 1.374 0 0 0-.961.414l-9.605 9.659a1.37 1.37 0 0 0-.006 1.936l1.3 1.3a1.37 1.37 0 0 0 1.93-.006l9.648-9.61a1.37 1.37 0 0 0-.002-1.93l-1.3-1.3a1.37 1.37 0 0 0-.904-.403zM9.548 11.233a1.37 1.37 0 0 0-1.93.006l-1.3 1.3a1.37 1.37 0 0 0 .006 1.93l9.605 9.604a1.37 1.37 0 0 0 1.93-.006l1.3-1.3a1.37 1.37 0 0 0-.006-1.93l-9.61-9.604zM16.143 5.485a1.37 1.37 0 0 0-1.93.006l-1.3 1.3a1.37 1.37 0 0 0 .006 1.93l3.61 3.61a1.37 1.37 0 0 0 1.93-.006l1.3-1.3a1.37 1.37 0 0 0-.006-1.93l-3.61-3.61z" />
                  </svg>
                  <span className="text-sm font-semibold text-zinc-200">LeetCode</span>
                </div>
                <span className="text-[10px] font-mono border border-zinc-800 bg-zinc-900/50 rounded-full px-2.5 py-0.5 text-zinc-400 group-hover:text-zinc-200 group-hover:border-zinc-700 transition-colors">
                  Profile &rarr;
                </span>
              </div>

              <div className="flex flex-col gap-1 mt-6">
                <span className="text-3xl font-bold tracking-tight text-zinc-50">600+</span>
                <span className="text-[10px] tracking-wider text-zinc-500 font-mono">GLOBAL PROBLEMS SOLVED</span>
              </div>

              <div className="flex flex-col gap-2 mt-6 w-full">
                <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                  <span>RATING: 1616</span>
                  <span>ATTENDED: 31</span>
                </div>
                <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-zinc-700 w-[75%]" />
                </div>
              </div>
            </motion.a>
            </ScrollRevealItem>

            {/* Card 2: Codeforces */}
            <ScrollRevealItem>
            <motion.a
              href="https://codeforces.com/profile/tejas1625"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex flex-col p-6 rounded-xl border border-zinc-900 bg-zinc-950/40 backdrop-blur-md justify-between hover:border-zinc-700 group"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <div className="flex items-end gap-[3px] w-5 h-5 justify-center pb-0.5">
                    <div className="w-[3px] h-[9px] bg-red-500 rounded-[1px]" />
                    <div className="w-[3px] h-[15px] bg-blue-500 rounded-[1px]" />
                    <div className="w-[3px] h-[12px] bg-sky-400 rounded-[1px]" />
                  </div>
                  <span className="text-sm font-semibold text-zinc-200">Codeforces</span>
                </div>
                <span className="text-[10px] font-mono border border-zinc-800 bg-zinc-900/50 rounded-full px-2.5 py-0.5 text-zinc-400 group-hover:text-zinc-200 group-hover:border-zinc-700 transition-colors">
                  Profile &rarr;
                </span>
              </div>

              <div className="flex flex-col gap-1 mt-6">
                <span className="text-3xl font-bold tracking-tight text-zinc-50">964</span>
                <span className="text-[10px] tracking-wider text-zinc-500 font-mono">PEAK CONTEST RATING</span>
              </div>

              <div className="flex flex-col gap-2 mt-6 w-full">
                <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                  <span>ACTIVE CONTESTANT</span>
                  <span>NEWBIE</span>
                </div>
                <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-zinc-700 w-[55%]" />
                </div>
              </div>
            </motion.a>
            </ScrollRevealItem>

            {/* Card 3: GitHub */}
            <ScrollRevealItem>
            <motion.a
              href="https://github.com/tejas-pagare"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex flex-col p-6 rounded-xl border border-zinc-900 bg-zinc-950/40 backdrop-blur-md justify-between hover:border-zinc-700 group"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-zinc-100 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  <span className="text-sm font-semibold text-zinc-200">GitHub</span>
                </div>
                <span className="text-[10px] font-mono border border-zinc-800 bg-zinc-900/50 rounded-full px-2.5 py-0.5 text-zinc-400 group-hover:text-zinc-200 group-hover:border-zinc-700 transition-colors">
                  Profile &rarr;
                </span>
              </div>

              <div className="flex flex-col gap-1 mt-6">
                <span className="text-3xl font-bold tracking-tight text-zinc-50">400+ Commits</span>
                <span className="text-[10px] tracking-wider text-zinc-500 font-mono">OPEN SOURCE CONTRIBUTIONS</span>
              </div>

              <div className="flex flex-col gap-2 mt-6 w-full">
                <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                  <span>MERN & FASTAPI</span>
                  <span>46 PRS</span>
                </div>
                <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-zinc-700 w-[80%]" />
                </div>
              </div>
            </motion.a>
            </ScrollRevealItem>
          </ScrollRevealGroup>
        </section>
      </div>
    </>
  );
}
