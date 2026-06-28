"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Folder, Briefcase, Mail, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import CommandPalette from "./command-palette";

export default function NavPill() {
  const pathname = usePathname();
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Projects", href: "/projects", icon: Folder },
    { name: "Experience", href: "/experience", icon: Briefcase },
    { name: "Contact", href: "/contact", icon: Mail },
  ];

  return (
    <>
      <header className="fixed top-6 left-1/2 z-40 w-max -translate-x-1/2 px-4">
        <nav className="flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-950/60 p-1.5 shadow-2xl backdrop-blur-md">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-200 ${
                  isActive ? "text-zinc-50" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-zinc-900 border border-zinc-800"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <item.icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{item.name}</span>
              </Link>
            );
          })}

          <div className="h-4 w-[1px] bg-zinc-800 mx-1" />

          {/* Cmd K Command Menu Button */}
          <button
            onClick={() => setIsPaletteOpen(true)}
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-50 hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-all duration-200"
            title="Open Command Palette (Cmd+K)"
          >
            <Terminal className="h-3.5 w-3.5" />
            <kbd className="hidden md:inline-flex h-4 select-none items-center gap-0.5 rounded border border-zinc-800 bg-zinc-900 px-1 text-[9px] font-mono text-zinc-500 font-medium">
              <span>⌘</span>K
            </kbd>
          </button>
        </nav>
      </header>

      {/* Command Palette Modal */}
      <CommandPalette isOpen={isPaletteOpen} setIsOpen={setIsPaletteOpen} />
    </>
  );
}
