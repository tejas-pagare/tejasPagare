"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, FileText, Briefcase, Mail, Home, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import projectsData from "@/data/project.json";

interface CommandPaletteProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function CommandPalette({ isOpen, setIsOpen }: CommandPaletteProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Toggle palette with Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setIsOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  // Close when clicking outside
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  const navigateTo = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  const pages = [
    { name: "Home", path: "/", icon: Home, category: "Navigation" },
    { name: "Projects", path: "/projects", icon: FileText, category: "Navigation" },
    { name: "Experience", path: "/experience", icon: Briefcase, category: "Navigation" },
    { name: "Contact", path: "/contact", icon: Mail, category: "Navigation" },
  ];

  const filteredPages = pages.filter((page) =>
    page.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredProjects = projectsData.filter((project) =>
    project.title.toLowerCase().includes(search.toLowerCase()) ||
    project.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
    project.techStack.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-[15vh] backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            ref={containerRef}
            className="w-full max-w-xl overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/90 text-zinc-50 shadow-2xl backdrop-blur-md"
          >
            {/* Search Input */}
            <div className="flex items-center border-b border-zinc-800 px-4 py-3">
              <Search className="mr-3 h-5 w-5 text-zinc-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search pages, projects, tech stacks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 outline-none"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="ml-2 rounded border border-zinc-800 px-1.5 py-0.5 text-[10px] font-medium text-zinc-400 hover:border-zinc-700"
              >
                ESC
              </button>
            </div>

            {/* Results Area */}
            <div className="max-h-[350px] overflow-y-auto p-2 scrollbar-none">
              {filteredPages.length > 0 && (
                <div className="mb-4">
                  <div className="px-3 py-1 text-[10px] font-bold tracking-wider text-zinc-500 uppercase">
                    Navigation
                  </div>
                  {filteredPages.map((page) => (
                    <button
                      key={page.path}
                      onClick={() => navigateTo(page.path)}
                      className="group flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-900 hover:text-zinc-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <page.icon className="h-4 w-4 text-zinc-400 group-hover:text-zinc-50" />
                        <span>{page.name}</span>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 text-zinc-400 transition-opacity" />
                    </button>
                  ))}
                </div>
              )}

              {filteredProjects.length > 0 && (
                <div>
                  <div className="px-3 py-1 text-[10px] font-bold tracking-wider text-zinc-500 uppercase">
                    Projects
                  </div>
                  {filteredProjects.map((project) => (
                    <button
                      key={project.slug}
                      onClick={() => navigateTo(`/projects/${project.slug}`)}
                      className="group flex w-full items-start justify-between rounded-lg px-3 py-2 text-left text-sm text-zinc-300 hover:bg-zinc-900 hover:text-zinc-50 transition-colors"
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium text-zinc-200 group-hover:text-zinc-50">
                          {project.title}
                        </span>
                        <span className="text-xs text-zinc-400 line-clamp-1">
                          {project.shortDescription}
                        </span>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 text-zinc-400 self-center transition-opacity" />
                    </button>
                  ))}
                </div>
              )}

              {filteredPages.length === 0 && filteredProjects.length === 0 && (
                <div className="py-6 text-center text-sm text-zinc-500">
                  No results found for &ldquo;{search}&rdquo;
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
