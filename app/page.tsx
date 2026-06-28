"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/project-card";
import projectsData from "@/data/project.json";

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
    <div className="mx-auto max-w-[1024px] px-6 md:px-8 py-12 md:py-20 flex flex-col gap-20">
      {/* Hero Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col items-start gap-6 max-w-2xl"
      >
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
          className="text-4xl md:text-[64px] font-bold tracking-[-0.02em] leading-[1.1] text-zinc-50"
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
          className="text-base md:text-lg leading-relaxed text-zinc-400"
        >
          I build high-performance, scalable applications bridging the gap between
          sophisticated backend infrastructure and AI-driven user experiences.
        </motion.p>

        {/* Action Buttons */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-2">
          {/* Primary Action */}
          <Link
            href="/projects"
            className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-full bg-zinc-50 text-zinc-950 font-medium text-xs hover:bg-zinc-200 transition-colors duration-200"
          >
            <span>Explore Work</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          {/* Secondary Action */}
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-full border border-zinc-800 bg-zinc-950/20 text-zinc-400 font-medium text-xs hover:bg-zinc-900 hover:text-zinc-200 transition-all duration-200"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download Resume</span>
          </a>
        </motion.div>
      </motion.section>

      {/* Tech Stack Row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="w-full border-y border-zinc-850 py-4 overflow-x-auto scrollbar-none"
      >
        <div className="flex items-center justify-between min-w-max gap-8 px-4 text-xs font-mono font-bold tracking-[0.2em] text-zinc-500 uppercase">
          <span>NEXT.JS 14+</span>
          <span>·</span>
          <span>FASTAPI</span>
          <span>·</span>
          <span>DOCKER</span>
          <span>·</span>
          <span>KUBERNETES</span>
          <span>·</span>
          <span>POSTGRESQL</span>
          <span>·</span>
          <span>REDIS</span>
          <span>·</span>
          <span>NODE.JS</span>
        </div>
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
    </div>
  );
}
