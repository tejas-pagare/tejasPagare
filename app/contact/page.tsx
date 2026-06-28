"use client";

import React, { useState } from "react";
import { Loader2, Send, CheckCircle2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatus("loading");

    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="mx-auto max-w-[1024px] px-6 md:px-8 py-12 md:py-20 flex flex-col gap-12">
      {/* Header Section */}
      <div className="flex flex-col gap-3 max-w-2xl border-b border-zinc-900 pb-8">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-50">
          Contact
        </h1>
        <p className="text-base md:text-lg leading-relaxed text-zinc-400">
          Let&rsquo;s connect. Drop me a line below and I&rsquo;ll get back to you as soon as possible.
        </p>
      </div>

      <div className="max-w-xl w-full mx-auto">
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center text-center p-8 rounded-md border border-zinc-800 bg-zinc-900/10"
            >
              <div className="h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 text-emerald-400">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-50 mb-2">
                Message Sent Successfully
              </h3>
              <p className="text-sm text-zinc-400 mb-6 max-w-sm">
                Thank you for reaching out! I appreciate your message and will get back to you shortly.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-zinc-50 transition-colors"
              >
                <span>Send another message</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
            >
              {/* Name Field */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-xs font-mono font-bold tracking-wider text-zinc-500 uppercase"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  disabled={status === "loading"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-zinc-950/40 border border-zinc-800 rounded-md px-4 py-3 text-sm text-zinc-50 placeholder-zinc-650 focus:border-zinc-400 outline-none transition-colors duration-200"
                />
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-xs font-mono font-bold tracking-wider text-zinc-500 uppercase"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  disabled={status === "loading"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full bg-zinc-950/40 border border-zinc-800 rounded-md px-4 py-3 text-sm text-zinc-50 placeholder-zinc-650 focus:border-zinc-400 outline-none transition-colors duration-200"
                />
              </div>

              {/* Message Field */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-xs font-mono font-bold tracking-wider text-zinc-500 uppercase"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  disabled={status === "loading"}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your project, ideas, or opportunity..."
                  className="w-full bg-zinc-950/40 border border-zinc-800 rounded-md px-4 py-3 text-sm text-zinc-50 placeholder-zinc-650 focus:border-zinc-400 outline-none resize-none transition-colors duration-200"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "loading" || !name || !email || !message}
                className="inline-flex items-center justify-center gap-2 h-10 w-full rounded-full bg-zinc-50 text-zinc-950 font-medium text-xs hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed transition-all duration-200"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
