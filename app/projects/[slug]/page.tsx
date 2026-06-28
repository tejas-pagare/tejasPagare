import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Code, CheckCircle2, ArrowRight } from "lucide-react";
import projectsData from "@/data/project.json";
import ProjectGallery from "@/components/project-gallery";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const projectIndex = projectsData.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = projectsData[projectIndex];
  const nextProject = projectsData[(projectIndex + 1) % projectsData.length];

  return (
    <div className="mx-auto max-w-[1024px] px-6 md:px-8 py-12 md:py-20 flex flex-col gap-12">
      {/* Header Section */}
      <div className="flex flex-col items-start gap-4">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-zinc-50 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
          <span>Back to Projects</span>
        </Link>
        <div className="flex flex-col gap-2 mt-2">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-50">
            {project.title}
          </h1>
          <p className="text-sm md:text-base leading-relaxed text-zinc-400">
            {project.shortDescription}
          </p>
        </div>
      </div>

      {/* Metadata Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-800 border border-zinc-800 rounded-md bg-zinc-900/10">
        <div className="p-5 flex flex-col gap-1.5">
          <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase font-bold">
            Role
          </span>
          <span className="text-sm font-medium text-zinc-200">
            {project.type}
          </span>
        </div>
        <div className="p-5 flex flex-col gap-1.5">
          <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase font-bold">
            Timeline
          </span>
          <span className="text-sm font-medium text-zinc-200">
            {project.timeline}
          </span>
        </div>
        <div className="p-5 flex flex-col gap-1.5">
          <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase font-bold">
            Stack
          </span>
          <div className="flex flex-wrap gap-1 mt-1">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-full bg-zinc-900 border border-zinc-850 px-2 py-0.5 text-[11px] font-medium text-zinc-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        {project.links.live && project.links.live !== "#" && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-full bg-zinc-50 text-zinc-950 font-medium text-xs hover:bg-zinc-200 transition-colors duration-200"
          >
            <span>View Live Site</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
        {project.links.github && project.links.github !== "#" && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-full border border-zinc-800 bg-zinc-950/20 text-zinc-400 font-medium text-xs hover:bg-zinc-900 hover:text-zinc-200 transition-all duration-200"
          >
            <Code className="h-3.5 w-3.5" />
            <span>GitHub</span>
          </a>
        )}
      </div>

      {/* Decorative Feature Image / Gallery */}
      <ProjectGallery images={(project as any).images || [project.imageUrl]} title={project.title} />

      {/* Case Study Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-4">
        {/* Left Column: Details (Overview & Architecture) */}
        <div className="lg:col-span-2 flex flex-col gap-10">
          {/* Overview */}
          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-bold tracking-tight text-zinc-50 border-b border-zinc-850 pb-2">
              Overview
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-zinc-400 whitespace-pre-line">
              {project.details.overview}
            </p>
          </div>

          {/* Architecture */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold tracking-tight text-zinc-50 border-b border-zinc-850 pb-2">
              Architecture
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-zinc-400 whitespace-pre-line">
              {project.details.architecture}
            </p>
            {/* Topology diagram wrapper */}
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-zinc-850 bg-zinc-900/20 mt-2">
              <Image
                src="/architecture_topology_visual.png"
                alt="System Architecture Diagram"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 700px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/20 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* Right Column: Key Features */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold tracking-tight text-zinc-50 border-b border-zinc-850 pb-2">
            Key Features
          </h2>
          <ul className="flex flex-col gap-5 mt-2">
            {project.details.keyFeatures.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed text-zinc-300">
                <CheckCircle2 className="h-4.5 w-4.5 text-zinc-400 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Next Project Section */}
      <div className="border-t border-zinc-800 pt-8 mt-12 flex justify-end">
        <Link
          href={`/projects/${nextProject.slug}`}
          className="group flex flex-col items-end gap-1.5 text-right hover:text-zinc-50 transition-colors"
        >
          <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase font-bold">
            Next Project
          </span>
          <div className="flex items-center gap-1.5 text-base font-bold text-zinc-200 group-hover:text-zinc-50">
            <span>{nextProject.title}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </div>
        </Link>
      </div>
    </div>
  );
}
