"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectGalleryProps {
  images?: string[];
  title?: string;
}

export default function ProjectGallery({ images = [], title = "Project Screenshot" }: ProjectGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  // Handle empty state gracefully
  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-zinc-850 bg-zinc-900/20 flex items-center justify-center text-zinc-500 font-mono text-sm">
        No images available
      </div>
    );
  }

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Keyboard navigation support for premium desktop UX
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length]);

  // Slide/Fade animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 15 : -15,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 15 : -15,
      opacity: 0,
    }),
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Main Viewport */}
      <div className="group relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-zinc-850 bg-zinc-900/20">
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 350, damping: 35 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={images[currentIndex]}
              alt={`${title} - view ${currentIndex + 1}`}
              fill
              className="object-cover opacity-100"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-zinc-950/10 pointer-events-none" />

        {/* Navigation Controls */}
        {images.length > 1 && (
          <>
            {/* Left Button */}
            <motion.button
              type="button"
              onClick={handlePrev}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950/60 text-zinc-400 backdrop-blur-md transition-colors hover:bg-zinc-900 hover:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-400 group-hover:opacity-100 opacity-0 group-hover:translate-x-0 -translate-x-2 transition-all duration-300 md:h-10 md:w-10 cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>

            {/* Right Button */}
            <motion.button
              type="button"
              onClick={handleNext}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950/60 text-zinc-400 backdrop-blur-md transition-colors hover:bg-zinc-900 hover:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-400 group-hover:opacity-100 opacity-0 group-hover:translate-x-0 translate-x-2 transition-all duration-300 md:h-10 md:w-10 cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </>
        )}

        {/* Image Counter indicator */}
        <div className="absolute bottom-3 right-4 rounded-full bg-zinc-950/60 px-2.5 py-0.5 text-[10px] font-mono text-zinc-400 backdrop-blur-sm border border-zinc-850">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex flex-wrap items-center gap-3 w-full py-1">
          {images.map((img, idx) => {
            const isActive = idx === currentIndex;
            return (
              <motion.button
                key={idx}
                type="button"
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "relative w-20 sm:w-28 md:w-32 aspect-[16/10] shrink-0 overflow-hidden rounded-lg cursor-pointer transition-all duration-300 focus:outline-none",
                  isActive
                    ? "ring-1 ring-zinc-400 opacity-100 grayscale-0"
                    : "opacity-50 grayscale hover:grayscale-0 hover:opacity-85"
                )}
                aria-label={`Go to slide ${idx + 1}`}
              >
                <Image
                  src={img}
                  alt={`${title} thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 80px, 128px"
                />
              </motion.button>
            );
          })}
        </div>
      )}
    </div>
  );
}
