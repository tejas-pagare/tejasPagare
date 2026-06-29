"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Download, Compass } from "lucide-react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/project-card";
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

export default function Home() {
  // Grab the first two projects for the featured section
  const featuredProjects = projectsData.slice(0, 2);

  // Animation constants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
  };

  return (
    <div className="mx-auto max-w-[1024px] w-full px-4 md:px-8 py-12 lg:py-24 flex flex-col gap-12 md:gap-20 overflow-x-hidden">
      {/* Hero Section */}
      <motion.section
        id="hero-section"
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col-reverse md:flex-row items-center md:items-center justify-between gap-10 md:gap-12 w-full"
      >
        {/* Left Column (Text & Actions) */}
        <div className="flex flex-col items-center md:items-start gap-6 max-w-2xl w-full">
          {/* Availability Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/30 px-3.5 py-1 text-xs text-zinc-400"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Available for new opportunities</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.02em] leading-[1.1] text-zinc-50 text-center md:text-left"
          >
            Architecting intelligent <br />
            <span className="text-zinc-400">systems.</span> <br />
            <span className="text-zinc-500 text-3xl md:text-5xl font-semibold mt-2 block">
              Full Stack & Generative AI
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg leading-relaxed text-zinc-400 text-center md:text-left"
          >
            I build high-performance, scalable applications bridging the gap between
            sophisticated backend infrastructure and AI-driven user experiences.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mt-2 w-full sm:w-auto justify-center md:justify-start"
          >
            {/* Primary Action */}
            <Link
              href="/projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-10 px-5 rounded-full bg-zinc-50 text-zinc-950 font-medium text-xs hover:bg-zinc-200 transition-colors duration-200"
            >
              <span>Explore Work</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            {/* Secondary Action */}
            <a
              id="resume-terminal"
              href="https://res.cloudinary.com/denwbzv51/image/upload/v1782630369/TejasPagare_ykpfys.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-10 px-5 rounded-full border border-zinc-800 bg-zinc-950/20 text-zinc-400 font-medium text-xs hover:bg-zinc-900 hover:text-zinc-200 transition-all duration-200"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download Resume</span>
            </a>

            {/* Tour Action */}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("start-portfolio-tour"))}
              className="hidden md:inline-flex w-full sm:w-auto items-center justify-center gap-2 h-10 px-5 rounded-full border border-zinc-800 bg-zinc-950/20 text-zinc-400 font-medium text-xs hover:bg-zinc-900 hover:text-zinc-200 transition-all duration-200 cursor-pointer"
            >
              <Compass className="h-3.5 w-3.5" />
              <span>Take a Tour</span>
            </button>
          </motion.div>
        </div>

        {/* Right Column (User Photo with Animated Glossy Border) */}
        <motion.div
          id="hero-ai-guide"
          variants={itemVariants}
          className="relative shrink-0 rounded-[2.5rem] p-[2px] overflow-hidden bg-zinc-950/20 border border-zinc-850 isolate z-0"
        >
          {/* Shimmer Border Rotation background */}
          <motion.div
            className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,#18181b,#10b981,#18181b,#34d399,#18181b,#a7f3d0,#18181b)]"
            animate={{ rotate: 360 }}
            transition={{ duration: 6, ease: "linear", repeat: Infinity }}
          />
          {/* Inner masking container */}
          <div className="relative w-44 h-56 sm:w-56 sm:h-72 md:w-68 md:h-88 rounded-[2.4rem] overflow-hidden bg-zinc-950">
            <Image
              src="https://res.cloudinary.com/denwbzv51/image/upload/v1782629273/68af4b92-60a0-4786-b24e-8378187a1fe2_nho1tr.jpg"
              alt="Tejas Pagare"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </motion.section>

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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
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
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              title={project.title}
              shortDescription={project.shortDescription}
              techStack={project.techStack}
              type={project.type}
              badge={project.slug === "swiftmart" ? "Featured" : undefined}
              imageUrl={(project as any).imageUrl}
            />
          ))}
        </div>
      </section>

      {/* Coding Profiles Section */}
      <section
        id="engineering-stats"
        className="w-full max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-zinc-900/60"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-50 mb-4">
          Coding Profiles
        </h2>
        <p className="text-zinc-400 max-w-2xl leading-relaxed text-sm md:text-base mb-12">
          Quantifying problem-solving velocity through algorithmic benchmarks, architectural efficiency, and open-source contributions.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Card 1: LeetCode */}
          <a
            href="https://leetcode.com/u/Tejas_1625/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col p-6 rounded-xl border border-zinc-900 bg-zinc-950/40 backdrop-blur-md justify-between transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-700 group"
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
          </a>

          {/* Card 2: Codeforces */}
          <a
            href="https://codeforces.com/profile/tejas1625"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col p-6 rounded-xl border border-zinc-900 bg-zinc-950/40 backdrop-blur-md justify-between transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-700 group"
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
          </a>

          {/* Card 3: GitHub */}
          <a
            href="https://github.com/tejas-pagare"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col p-6 rounded-xl border border-zinc-900 bg-zinc-950/40 backdrop-blur-md justify-between transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-700 group"
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
          </a>
        </motion.div>
      </section>
    </div>
  );
}
