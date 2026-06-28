"use client";

import React, { useRef } from "react";
import { CheckCircle2, Calendar } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

interface TimelineEvent {
  title: string;
  company: string;
  timeline: string;
  overview: string;
  bullets?: string[];
  tags?: string[];
  type?: "job" | "education";
}

const experienceData: TimelineEvent[] = [
  {
    title: "Full Stack Engineer Intern",
    company: "Soundverse",
    timeline: "Aug 2025 - Nov 2026",
    type: "job",
    overview: "Contributed as a key developer on core product surfaces for an applied GenAI company shaping the next era of audio, music, and human creativity through an AI-powered audio creation platform.",
    bullets: [
      "Engineered the user interface and experience for 'Soundverse DNA', an artist-inspired AI model system.",
      "Developed and improved the Enterprise API frontend to allow developers and partners to seamlessly integrate with Soundverse's AI music capabilities.",
      "Implemented automated lifecycle email automation experiences and onboarding tooling, achieving a 20% increase in user retention through enhanced communication."
    ],
    tags: ["React", "Node.js", "GenAI", "API Integration"]
  },
  {
    title: "Core Contributor & Mentor",
    company: "IOTA CLUB",
    timeline: "2022 - 2023",
    type: "job",
    overview: "Led technical workshops and provided mentorship for university students, focusing on modern web development practices and system design fundamentals.",
    bullets: [
      "Developed comprehensive curriculum and resources for web development bootcamps.",
      "Mentored 50+ peers through hands-on guidance, resulting in several successful campus projects."
    ],
    tags: ["Mentorship", "System Design", "Next.js"]
  },
  {
    title: "B.Tech in Computer Science and Technology",
    company: "Indian Institute of Information Technology Sricity",
    timeline: "Expected May 2027",
    type: "education",
    overview: "Focusing on core computer science fundamentals, data structures, algorithms, and advanced software engineering principles. Active participant in hackathons (Agentica Hackathon Abhisarga '25 runner-up) and technical symposiums.",
    bullets: [],
    tags: ["Algorithms", "Data Structures", "Agentic AI"]
  }
];

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Map progress to height percentage of the active timeline indicator
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative w-full max-w-3xl mx-auto pl-6 md:pl-10">
      {/* Background Track Line */}
      <div className="absolute left-[7px] md:left-[11px] top-4 bottom-4 w-[2px] bg-zinc-800 rounded-full" />
      
      {/* Scroll-Linked Filled Line */}
      <motion.div
        style={{ height: lineHeight }}
        className="absolute left-[7px] md:left-[11px] top-4 w-[2px] bg-zinc-50 rounded-full origin-top"
      />

      <div className="flex flex-col gap-16">
        {experienceData.map((event, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.1 }}
            className="relative"
          >
            {/* Timeline node dot */}
            <div className="absolute -left-[24px] md:-left-[34px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-950 border-2 border-zinc-800">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: idx * 0.15 }}
                className="h-1.5 w-1.5 rounded-full bg-zinc-50"
              />
            </div>

            {/* Event Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-zinc-50">
                  {event.title}
                </h3>
                <span className="text-xs font-mono font-bold tracking-wider text-zinc-400 uppercase">
                  {event.company}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono font-medium self-start md:self-center">
                <Calendar className="h-3.5 w-3.5" />
                <span>{event.timeline}</span>
              </div>
            </div>

            {/* Overview paragraph */}
            <p className="text-sm md:text-base leading-relaxed text-zinc-400 mb-4 max-w-2xl">
              {event.overview}
            </p>

            {/* Bullets lists */}
            {event.bullets && event.bullets.length > 0 && (
              <ul className="flex flex-col gap-3 mb-6 max-w-2xl">
                {event.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-3 text-sm text-zinc-300 leading-relaxed">
                    <CheckCircle2 className="h-4.5 w-4.5 text-zinc-400 shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Tags badges */}
            {event.tags && event.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-zinc-900 border border-zinc-850 px-2.5 py-0.5 text-xs font-medium text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
