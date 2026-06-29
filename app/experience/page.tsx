"use client";

import React from "react";
import ExperienceTimeline from "@/components/experience-timeline";

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-[1024px] px-4 md:px-8 py-12 lg:py-24 flex flex-col gap-12">
      {/* Header Section */}
      <div id="experience-header" className="flex flex-col gap-3 max-w-2xl border-b border-zinc-900 pb-8">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-50">
          Experience
        </h1>
        <p className="text-base md:text-lg leading-relaxed text-zinc-400">
          A chronological timeline of my professional journey and academic background in software engineering.
        </p>
      </div>

      {/* Timeline Section */}
      <div id="experience-timeline" className="py-4">
        <ExperienceTimeline />
      </div>
    </div>
  );
}
