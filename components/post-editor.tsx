"use client";

import React, { useActionState, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bold,
  Code,
  Columns2,
  Eye,
  Heading2,
  ImageIcon,
  Italic,
  Link2,
  List,
  Loader2,
  PenLine,
  Quote,
  Send,
  Save,
} from "lucide-react";
import ImageUpload from "@/components/image-upload";
import Markdown from "@/components/markdown";
import type { PostFormState } from "@/app/admin/actions";
import type { Post } from "@/lib/blog/types";
import { readingTime, slugify } from "@/lib/blog/utils";
import { uploadImage } from "@/lib/upload-image";
import { cn } from "@/lib/utils";

type Mode = "write" | "preview" | "split";

const TOOLS = [
  { id: "heading", icon: Heading2, label: "Heading" },
  { id: "bold", icon: Bold, label: "Bold" },
  { id: "italic", icon: Italic, label: "Italic" },
  { id: "link", icon: Link2, label: "Link" },
  { id: "code", icon: Code, label: "Code block" },
  { id: "list", icon: List, label: "List" },
  { id: "quote", icon: Quote, label: "Quote" },
  { id: "image", icon: ImageIcon, label: "Upload image" },
] as const;

type ToolId = (typeof TOOLS)[number]["id"];

interface PostEditorProps {
  action: (state: PostFormState, formData: FormData) => Promise<PostFormState>;
  post?: Post;
  uploadsEnabled: boolean;
}

const inputClass =
  "w-full rounded-md border border-zinc-800 bg-zinc-950/40 px-3.5 py-2.5 text-sm text-zinc-50 placeholder:text-zinc-600 outline-none transition-colors focus:border-zinc-500 aria-invalid:border-red-500/60";

const labelClass = "text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500";

export default function PostEditor({ action, post, uploadsEnabled }: PostEditorProps) {
  const [state, formAction, pending] = useActionState(action, {});
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!post);
  const [content, setContent] = useState(post?.content ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [tags, setTags] = useState(post?.tags.join(", ") ?? "");
  const [coverImage, setCoverImage] = useState(post?.coverImage ?? "");
  const [mode, setMode] = useState<Mode>("write");
  const [dirty, setDirty] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const errors = state.fieldErrors ?? {};
  const words = content.split(/\s+/).filter(Boolean).length;

  // Warn before leaving with unsaved edits.
  useEffect(() => {
    if (!dirty || pending) return;
    const handler = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty, pending]);

  // Cmd/Ctrl+S saves with the current status.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        const current = post?.status === "published" ? "publish" : "draft";
        formRef.current?.querySelector<HTMLButtonElement>(`button[data-intent="${current}"]`)?.click();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [post?.status]);

  const wrapSelection = (before: string, after = before, placeholder = "text") => {
    const el = textareaRef.current;
    if (!el) return;
    const { selectionStart: start, selectionEnd: end } = el;
    const selected = content.slice(start, end) || placeholder;
    const next = content.slice(0, start) + before + selected + after + content.slice(end);
    setContent(next);
    setDirty(true);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + before.length, start + before.length + selected.length);
    });
  };

  const prefixLine = (prefix: string) => {
    const el = textareaRef.current;
    if (!el) return;
    const lineStart = content.lastIndexOf("\n", el.selectionStart - 1) + 1;
    setContent(content.slice(0, lineStart) + prefix + content.slice(lineStart));
    setDirty(true);
    requestAnimationFrame(() => el.focus());
  };

  // Inserts a placeholder at the cursor, uploads, then swaps in the final Markdown image.
  const insertImages = async (files: File[]) => {
    const images = files.filter((f) => f.type.startsWith("image/"));
    if (!images.length) return;
    if (!uploadsEnabled) {
      setUploadError("Image uploads are not configured. Set the CLOUDINARY_* environment variables.");
      return;
    }
    setUploadError(null);
    const el = textareaRef.current;
    const pos = el?.selectionStart ?? content.length;

    for (const file of images) {
      const alt = file.name.replace(/\.[^.]+$/, "").replace(/[[\]]/g, "");
      const token = `![Uploading ${alt}…](${crypto.randomUUID()})`;
      setContent((c) => c.slice(0, pos) + `\n${token}\n` + c.slice(pos));
      setDirty(true);
      try {
        const url = await uploadImage(file);
        setContent((c) => c.replace(token, `![${alt}](${url})`));
      } catch (err) {
        setContent((c) => c.replace(`\n${token}\n`, ""));
        setUploadError(err instanceof Error ? err.message : "Upload failed.");
      }
    }
  };

  const applyTool = (tool: ToolId) => {
    switch (tool) {
      case "heading": return prefixLine("## ");
      case "bold": return wrapSelection("**");
      case "italic": return wrapSelection("_");
      case "link": return wrapSelection("[", "](https://)", "link text");
      case "code": return wrapSelection("\n```ts\n", "\n```\n", "code");
      case "list": return prefixLine("- ");
      case "quote": return prefixLine("> ");
      case "image": return imageInputRef.current?.click();
    }
  };

  return (
    <form
      ref={formRef}
      action={formAction}
      onChange={() => setDirty(true)}
      className="flex flex-col gap-8"
    >
      {/* Top bar */}
      <div className="sticky top-24 z-30 -mx-4 flex items-center justify-between gap-3 border-y border-zinc-800 bg-zinc-950/70 px-4 py-3 backdrop-blur-md md:mx-0 md:rounded-xl md:border">
        <Link
          href="/admin"
          className="group inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-zinc-50 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span className="hidden sm:inline">All posts</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="hidden md:inline text-[11px] font-mono text-zinc-500 mr-2">
            {words} words · {readingTime(content)} min
          </span>
          <button
            type="submit"
            name="status"
            value="draft"
            data-intent="draft"
            disabled={pending}
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-zinc-800 px-3.5 text-xs font-medium text-zinc-300 hover:bg-zinc-900 hover:text-zinc-50 disabled:opacity-50 transition-colors"
          >
            <Save className="h-3.5 w-3.5" />
            {post?.status === "published" ? "Unpublish" : "Save draft"}
          </button>
          <button
            type="submit"
            name="status"
            value="published"
            data-intent="publish"
            disabled={pending}
            className="inline-flex h-8 items-center gap-1.5 rounded-full bg-zinc-50 px-3.5 text-xs font-medium text-zinc-950 hover:bg-zinc-200 disabled:opacity-50 transition-colors"
          >
            {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
            {post?.status === "published" ? "Update" : "Publish"}
          </button>
        </div>
      </div>

      {state.error && (
        <p className="rounded-md border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {state.error}
        </p>
      )}

      {/* Title */}
      <div className="flex flex-col gap-2">
        <input
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (!slugTouched) setSlug(slugify(e.target.value));
          }}
          placeholder="Post title"
          aria-invalid={!!errors.title}
          aria-label="Title"
          className="w-full bg-transparent text-3xl md:text-5xl font-bold tracking-tight text-zinc-50 placeholder:text-zinc-700 outline-none"
        />
        {errors.title && <p className="text-xs text-red-400">{errors.title}</p>}
      </div>

      {/* Meta fields */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="slug" className={labelClass}>Slug</label>
          <div className="flex items-center rounded-md border border-zinc-800 bg-zinc-950/40 focus-within:border-zinc-500 transition-colors">
            <span className="pl-3.5 text-sm text-zinc-600 font-mono">/blog/</span>
            <input
              id="slug"
              name="slug"
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setSlugTouched(true);
              }}
              aria-invalid={!!errors.slug}
              placeholder="my-post"
              className="w-full bg-transparent py-2.5 pr-3.5 text-sm font-mono text-zinc-50 placeholder:text-zinc-600 outline-none"
            />
          </div>
          {errors.slug && <p className="text-xs text-red-400">{errors.slug}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="tags" className={labelClass}>Tags (comma separated)</label>
          <input
            id="tags"
            name="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Next.js, System Design, AI"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-2 md:col-span-2">
          <label htmlFor="excerpt" className={labelClass}>Excerpt</label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows={2}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            aria-invalid={!!errors.excerpt}
            placeholder="A one or two sentence summary shown on the blog index and in link previews."
            className={cn(inputClass, "resize-none")}
          />
          {errors.excerpt && <p className="text-xs text-red-400">{errors.excerpt}</p>}
        </div>

        <div className="flex flex-col gap-2 md:col-span-2">
          <span className={labelClass}>Cover image (optional)</span>
          <ImageUpload
            name="coverImage"
            value={coverImage}
            onChange={(url) => {
              setCoverImage(url);
              setDirty(true);
            }}
            uploadsEnabled={uploadsEnabled}
            invalid={!!errors.coverImage}
          />
          {errors.coverImage && <p className="text-xs text-red-400">{errors.coverImage}</p>}
        </div>
      </div>

      {/* Content editor */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className={labelClass}>Content (Markdown)</span>
          <div className="flex items-center gap-0.5 rounded-full border border-zinc-800 bg-zinc-950/40 p-0.5">
            {([
              { id: "write", icon: PenLine, label: "Write" },
              { id: "split", icon: Columns2, label: "Split" },
              { id: "preview", icon: Eye, label: "Preview" },
            ] as const).map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMode(m.id)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors",
                  m.id === "split" && "hidden lg:inline-flex",
                  mode === m.id ? "bg-zinc-800 text-zinc-50" : "text-zinc-400 hover:text-zinc-200"
                )}
              >
                <m.icon className="h-3.5 w-3.5" />
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/40 focus-within:border-zinc-600 transition-colors">
          {mode !== "preview" && (
            <div className="flex items-center gap-0.5 border-b border-zinc-800 px-2 py-1.5">
              {TOOLS.map((t) => (
                <button
                  key={t.label}
                  type="button"
                  onClick={() => applyTool(t.id)}
                  title={t.label}
                  aria-label={t.label}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-900 hover:text-zinc-100 transition-colors"
                >
                  <t.icon className="h-3.5 w-3.5" />
                </button>
              ))}
            </div>
          )}

          <div className={cn("grid", mode === "split" && "lg:grid-cols-2 lg:divide-x divide-zinc-800")}>
            <textarea
              ref={textareaRef}
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onPaste={(e) => {
                const files = Array.from(e.clipboardData.files);
                if (files.some((f) => f.type.startsWith("image/"))) {
                  e.preventDefault();
                  insertImages(files);
                }
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const files = Array.from(e.dataTransfer.files);
                if (files.length) {
                  e.preventDefault();
                  insertImages(files);
                }
              }}
              aria-invalid={!!errors.content}
              aria-label="Content"
              placeholder={"# Start writing...\n\nMarkdown is supported: **bold**, _italic_, `code`, lists, tables and fenced code blocks."}
              className={cn(
                "min-h-[480px] w-full resize-y bg-transparent p-5 font-mono text-sm leading-relaxed text-zinc-200 placeholder:text-zinc-700 outline-none",
                mode === "preview" && "hidden"
              )}
            />
            {mode !== "write" && (
              <div className="min-h-[480px] max-h-[80vh] overflow-y-auto p-5 md:p-8">
                {content.trim() ? (
                  <Markdown content={content} />
                ) : (
                  <p className="text-sm text-zinc-600">Nothing to preview yet.</p>
                )}
              </div>
            )}
          </div>
        </div>
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            insertImages(Array.from(e.target.files ?? []));
            e.target.value = "";
          }}
        />
        {errors.content && !content.trim() && <p className="text-xs text-red-400">{errors.content}</p>}
        {uploadError && <p className="text-xs text-red-400">{uploadError}</p>}
        <p className="text-[11px] text-zinc-600">
          Tip: press <kbd className="rounded border border-zinc-800 px-1 font-mono">⌘S</kbd> to save
          {uploadsEnabled && " · paste or drop images into the editor to upload them"}.
        </p>
      </div>
    </form>
  );
}
