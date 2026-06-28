"use client";

import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/project-card";
import projectsData from "@/data/project.json";

export default function ProjectsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
  };

  return (
    <div className="mx-auto max-w-[1024px] px-4 md:px-8 py-12 lg:py-24 flex flex-col gap-12">
      {/* Header Section */}
      <div className="flex flex-col gap-3 max-w-2xl">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-50">
          Projects
        </h1>
        <p className="text-base md:text-lg leading-relaxed text-zinc-400">
          A selection of technical projects focusing on scalable microservices, generative
          AI, and high-performance system architecture.
        </p>
      </div>

      {/* Projects Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {projectsData.map((project) => {
          // Customize badge for Agentica Document System
          let badge: string | undefined = undefined;
          if (project.slug === "agentica-document-system" || project.timeline.includes("Abhisarga")) {
            badge = "Runner-up";
          }

          return (
            <motion.div key={project.slug} variants={itemVariants}>
              <ProjectCard
                slug={project.slug}
                title={project.title}
                shortDescription={project.shortDescription}
                techStack={project.techStack}
                type={project.type}
                badge={badge}
                imageUrl={(project as any).imageUrl}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
