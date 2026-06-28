"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  slug: string;
  title: string;
  shortDescription: string;
  techStack: string[];
  type?: string;
  badge?: string;
  imageUrl?: string;
}

export default function ProjectCard({
  slug,
  title,
  shortDescription,
  techStack,
  type,
  badge,
  imageUrl,
}: ProjectCardProps) {
  // Use a fallback generative-style graph representation if no thumbnail is available
  const thumbUrl = imageUrl || "/graph_network_visual.png";

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group relative flex flex-col overflow-hidden rounded-md border border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] transition-colors duration-300"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden border-b border-zinc-800">
        <Image
          src={thumbUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Shadow/Glow overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Title and Badge */}
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold tracking-tight text-zinc-50 group-hover:text-white transition-colors duration-200">
              {title}
            </h3>
            {badge && (
              <span className="inline-flex items-center rounded-full bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 text-[10px] font-medium text-purple-400">
                {badge}
              </span>
            )}
          </div>
          <Link
            href={`/projects/${slug}`}
            className="rounded-full p-1 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-50 transition-colors duration-200"
            title="Read case study"
          >
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Type / Category Metadata */}
        {type && (
          <span className="text-[11px] font-mono tracking-wider text-zinc-500 uppercase mb-2">
            {type}
          </span>
        )}

        {/* Short Description */}
        <p className="text-sm leading-relaxed text-zinc-400 mb-6 line-clamp-2">
          {shortDescription}
        </p>

        {/* Tags */}
        <div className="mt-auto flex flex-wrap gap-1.5">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-full bg-zinc-900 border border-zinc-800/60 px-2.5 py-0.5 text-xs font-medium text-zinc-400"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
