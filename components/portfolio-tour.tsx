"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";

interface TourStep {
  targetId: string;
  title: string;
  description: string;
  position: "top" | "bottom" | "left" | "right";
  path: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    targetId: "hero-ai-guide",
    title: "Meet Tejas",
    description: "Meet Tejas, a software engineer specialized in building scalable full-stack applications.",
    position: "left",
    path: "/",
  },
  {
    targetId: "resume-terminal",
    title: "Resume",
    description: "Download the resume or get instant info about Tejas by interacting with his system files.",
    position: "bottom",
    path: "/",
  },
  {
    targetId: "projects-header",
    title: "Technical Projects",
    description: "Explore the projects built by Tejas in full-stack and AI engineering.",
    position: "bottom",
    path: "/projects",
  },
  {
    targetId: "experience-header",
    title: "Professional Timeline",
    description: "Explore a chronological timeline of academic background and professional software engineering experience.",
    position: "bottom",
    path: "/experience",
  },
  {
    targetId: "engineering-stats",
    title: "Quantified Verification",
    description: "Review real-time problem-solving milestones across LeetCode, Codeforces, and production GitHub repositories.",
    position: "top",
    path: "/",
  },
];

export default function PortfolioTour() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [rect, setRect] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Listen for manual trigger event
  useEffect(() => {
    const handleStartTour = () => {
      if (window.innerWidth >= 768) {
        if (pathname === "/") {
          setCurrentStep(0);
        } else {
          localStorage.setItem("tour_current_step", "0");
          router.push("/");
        }
      }
    };
    window.addEventListener("start-portfolio-tour", handleStartTour);
    return () => window.removeEventListener("start-portfolio-tour", handleStartTour);
  }, [pathname, router]);

  // Initialize and check tour visibility
  useEffect(() => {
    const hasSeen = localStorage.getItem("has_seen_tour");

    // Check if there is an active tour in progress
    const activeStepStr = localStorage.getItem("tour_current_step");
    if (activeStepStr !== null) {
      const stepIdx = parseInt(activeStepStr, 10);
      if (stepIdx >= 0 && stepIdx < TOUR_STEPS.length) {
        if (TOUR_STEPS[stepIdx].path === pathname) {
          setCurrentStep(stepIdx);
          return;
        }
      }
    }

    if (hasSeen === "true") return;

    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setCurrentStep(-1);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const timer = setTimeout(() => {
      if (window.innerWidth >= 768 && localStorage.getItem("has_seen_tour") !== "true" && pathname === "/") {
        setCurrentStep(0);
      }
    }, 1500);

    return () => {
      window.removeEventListener("resize", checkMobile);
      clearTimeout(timer);
    };
  }, [pathname]);

  // Update bounding rect on target selection
  const updateRect = () => {
    if (currentStep < 0 || currentStep >= TOUR_STEPS.length) {
      if (rect !== null) setRect(null);
      return;
    }
    const step = TOUR_STEPS[currentStep];
    const element = document.getElementById(step.targetId);
    if (element) {
      const bounding = element.getBoundingClientRect();
      const newRect = {
        x: bounding.left,
        y: bounding.top,
        width: bounding.width,
        height: bounding.height,
      };

      setRect((prev) => {
        if (
          prev &&
          prev.x === newRect.x &&
          prev.y === newRect.y &&
          prev.width === newRect.width &&
          prev.height === newRect.height
        ) {
          return prev;
        }
        return newRect;
      });
    } else {
      if (rect !== null) setRect(null);
    }
  };

  // Scroll active element into view and continuously track its rect in real-time
  useEffect(() => {
    if (currentStep < 0 || currentStep >= TOUR_STEPS.length || isMobile) {
      setRect(null);
      return;
    }

    const step = TOUR_STEPS[currentStep];
    const element = document.getElementById(step.targetId);

    if (element) {
      const bounding = element.getBoundingClientRect();
      const scrollBlock = bounding.height > window.innerHeight ? "start" : "center";
      element.scrollIntoView({ behavior: "smooth", block: scrollBlock });
    }

    // Set up continuous layout/scroll tracking via requestAnimationFrame
    let animationFrameId: number;
    const loop = () => {
      updateRect();
      animationFrameId = requestAnimationFrame(loop);
    };
    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentStep, isMobile]);

  // Page scrolling remains enabled during the tour to allow exploring sections

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      const nextStep = TOUR_STEPS[currentStep + 1];
      if (nextStep.path !== pathname) {
        localStorage.setItem("tour_current_step", String(currentStep + 1));
        router.push(nextStep.path);
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    } else {
      dismissTour();
    }
  };

  const handleSkip = () => {
    dismissTour();
  };

  const dismissTour = () => {
    setCurrentStep(-1);
    localStorage.setItem("has_seen_tour", "true");
    localStorage.removeItem("tour_current_step");
  };

  if (currentStep < 0 || currentStep >= TOUR_STEPS.length || isMobile) {
    return null;
  }

  const activeStep = TOUR_STEPS[currentStep];

  const getTooltipStyle = () => {
    if (!rect) return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    const gap = 16;
    const tooltipWidth = 320;
    const estimatedHeight = 180;

    let top = 0;
    let left = 0;
    let transform = "";

    if (activeStep.position === "bottom") {
      top = rect.y + rect.height + gap;
      left = rect.x + rect.width / 2;
      transform = "translateX(-50%)";
    } else if (activeStep.position === "top") {
      top = rect.y - gap;
      left = rect.x + rect.width / 2;
      transform = "translate(-50%, -100%)";
    } else if (activeStep.position === "left") {
      top = rect.y + rect.height / 2;
      left = rect.x - gap;
      transform = "translate(-100%, -50%)";
    } else if (activeStep.position === "right") {
      top = rect.y + rect.height / 2;
      left = rect.x + rect.width + gap;
      transform = "translateY(-50%)";
    }

    // Flip position to bottom if top placement clips past top of viewport
    if (activeStep.position === "top" && top - estimatedHeight < 16) {
      top = rect.y + rect.height + gap;
      transform = "translateX(-50%)";
      left = rect.x + rect.width / 2;
    }

    // Clamp Y boundaries based on current positioning strategy
    if (transform.includes("translateX(-50%)")) {
      // Bottom placement (anchor at top center of tooltip)
      top = Math.max(16, Math.min(top, window.innerHeight - 16 - estimatedHeight));
    } else if (transform.includes("translate(-50%, -100%)")) {
      // Top placement (anchor at bottom center of tooltip)
      top = Math.max(16 + estimatedHeight, Math.min(top, window.innerHeight - 16));
    } else {
      // Side placement (anchor at vertical center of tooltip)
      top = Math.max(16 + estimatedHeight / 2, Math.min(top, window.innerHeight - 16 - estimatedHeight / 2));
    }

    // Clamp X boundaries based on position and transform
    if (transform.includes("translateX(-50%)") || transform.includes("translate(-50%")) {
      const minLeft = 16 + tooltipWidth / 2;
      const maxLeft = window.innerWidth - 16 - tooltipWidth / 2;
      left = Math.max(minLeft, Math.min(left, maxLeft));
    } else if (transform.includes("translate(-100%")) {
      const minLeft = 16 + tooltipWidth;
      const maxLeft = window.innerWidth - 16;
      left = Math.max(minLeft, Math.min(left, maxLeft));
    } else {
      const minLeft = 16;
      const maxLeft = window.innerWidth - 16 - tooltipWidth;
      left = Math.max(minLeft, Math.min(left, maxLeft));
    }

    return {
      top,
      left,
      transform,
      width: tooltipWidth,
    };
  };

  const tooltipStyle = getTooltipStyle();

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Spotlight Backdrop Overlay */}
      <svg className="fixed inset-0 w-full h-full pointer-events-none">
        <defs>
          <mask id="portfolio-spotlight-mask">
            {/* White overlay hides everything (keeps backdrop semi-transparent black) */}
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {/* Black cutout makes target area transparent */}
            {rect && (
              <motion.rect
                initial={false}
                animate={{
                  x: rect.x - 12,
                  y: rect.y - 12,
                  width: rect.width + 24,
                  height: rect.height + 24,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                rx="12"
                ry="12"
                fill="black"
              />
            )}
          </mask>
        </defs>
        {/* Click-blocking backdrop layer */}
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(0, 0, 0, 0.65)"
          mask="url(#portfolio-spotlight-mask)"
          className="pointer-events-auto"
        />
      </svg>

      {/* Floating Tooltip Card */}
      <div
        style={{
          position: "fixed",
          top: tooltipStyle.top,
          left: tooltipStyle.left,
          width: tooltipStyle.width,
          transform: tooltipStyle.transform,
        }}
        className="pointer-events-auto z-[51] rounded-xl border border-zinc-800 bg-zinc-950 p-5 shadow-2xl backdrop-blur-md transition-all duration-300"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-2"
          >
            <h4 className="text-sm font-semibold tracking-tight text-zinc-50">
              {activeStep.title}
            </h4>
            <p className="text-zinc-400 text-xs leading-relaxed">
              {activeStep.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Footer controls */}
        <div className="flex items-center justify-between mt-5 pt-3 border-t border-zinc-900">
          <span className="text-[10px] font-mono text-zinc-500">
            STEP {currentStep + 1} / {TOUR_STEPS.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSkip}
              className="h-8 rounded-lg border border-zinc-850 px-3 text-[11px] font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition-all duration-200 cursor-pointer"
            >
              Skip
            </button>
            {activeStep.path !== "/" && (
              <button
                onClick={handleSkip}
                className="h-8 rounded-lg border border-zinc-800 bg-zinc-900 px-3 text-[11px] font-semibold text-zinc-200 hover:text-zinc-50 hover:bg-zinc-850 transition-all duration-200 cursor-pointer"
              >
                Explore
              </button>
            )}
            <button
              onClick={handleNext}
              className="h-8 rounded-lg bg-zinc-50 px-3 text-[11px] font-semibold text-zinc-950 hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              {currentStep === TOUR_STEPS.length - 1 ? "Finish" : "Next →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
