"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Compass, Download } from "lucide-react";

const METRICS = [
  { value: "600+", label: "DSA problems solved" },
  { value: "35%", label: "API latency cut" },
  { value: "20%", label: "User retention lift" },
];

export default function HeroSection() {
  return (
    <section id="hero-section" className="w-full">
      <div className="mx-auto flex w-full max-w-[1024px] flex-col-reverse items-center justify-between gap-12 px-4 py-12 md:flex-row md:gap-16 md:px-8 lg:py-24">
        {/* Copy */}
        <div className="flex w-full max-w-2xl flex-col items-center gap-6 md:items-start">
          <h1 className="flex flex-col items-center text-5xl font-bold leading-[1.05] tracking-[-0.03em] text-zinc-50 sm:text-6xl md:items-start lg:text-7xl">
            <span>Architecting</span>
            <span>intelligent</span>
            <span className="text-zinc-500">systems.</span>
          </h1>

          <p className="max-w-xl text-center text-base leading-relaxed text-zinc-400 md:text-left md:text-lg">
            <span className="font-medium text-zinc-200">Full Stack &amp; Generative AI engineer.</span> I build
            high-performance, scalable applications bridging sophisticated backend infrastructure and
            AI-driven user experiences.
          </p>

          <div className="mt-2 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row md:justify-start">
            <Link
              href="/projects"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-zinc-50 px-6 text-xs font-semibold text-zinc-950 hover:bg-zinc-200 sm:w-auto"
            >
              <span>Explore Work</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <a
              id="resume-terminal"
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-zinc-800 px-6 text-xs font-medium text-zinc-300 hover:bg-zinc-900 hover:text-zinc-50 sm:w-auto"
            >
              <Download className="h-3.5 w-3.5" />
              <span>View Resume</span>
            </a>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("start-portfolio-tour"))}
              className="hidden h-11 cursor-pointer items-center justify-center gap-2 rounded-full border border-zinc-800 px-6 text-xs font-medium text-zinc-300 hover:bg-zinc-900 hover:text-zinc-50 md:inline-flex"
            >
              <Compass className="h-3.5 w-3.5" />
              <span>Take a Tour</span>
            </button>
          </div>

          {/* Metrics */}
          <dl className="mt-4 grid w-full max-w-lg grid-cols-3 divide-x divide-zinc-800 rounded-xl border border-zinc-800">
            {METRICS.map((m) => (
              <div key={m.label} className="flex flex-col gap-0.5 px-3 py-3 sm:px-4">
                <dt className="order-2 font-mono text-[9px] uppercase tracking-wider text-zinc-500 sm:text-[10px]">
                  {m.label}
                </dt>
                <dd className="order-1 text-xl font-bold tracking-tight text-zinc-50 sm:text-2xl">{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Portrait */}
        <div
          id="hero-ai-guide"
          className="relative h-56 w-44 shrink-0 overflow-hidden rounded-[2.5rem] border border-zinc-800 bg-zinc-900 sm:h-72 sm:w-56 md:h-88 md:w-68"
        >
          <Image
            src="https://res.cloudinary.com/denwbzv51/image/upload/v1782629273/68af4b92-60a0-4786-b24e-8378187a1fe2_nho1tr.jpg"
            alt="Tejas Pagare"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 176px, (max-width: 768px) 224px, 272px"
            priority
          />
        </div>
      </div>
    </section>
  );
}
