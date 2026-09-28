"use client";

import React, { useRef, useState } from "react";
import { ImagePlus, Link2, Loader2, RefreshCw, X } from "lucide-react";
import { uploadImage } from "@/lib/upload-image";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  name: string;
  value: string;
  onChange: (url: string) => void;
  uploadsEnabled: boolean;
  invalid?: boolean;
}

/** Optional cover image: drag & drop / pick a file (Cloudinary) or paste a URL. */
export default function ImageUpload({ name, value, onChange, uploadsEnabled, invalid }: ImageUploadProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [showUrl, setShowUrl] = useState(!uploadsEnabled);
  const [urlDraft, setUrlDraft] = useState("");

  const applyUrl = () => {
    const url = urlDraft.trim();
    if (!url) return;
    onChange(url);
    setUrlDraft("");
    setError(null);
  };

  const handleFile = async (file?: File) => {
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      onChange(await uploadImage(file));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <input type="hidden" name={name} value={value} />
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {value ? (
        <div className="group relative aspect-[16/7] w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/30 dark:bg-zinc-900/30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Cover preview" className="h-full w-full object-cover" />
          <div className="absolute inset-0 flex items-end justify-end gap-2 bg-gradient-to-t from-zinc-50/70 dark:from-zinc-950/70 to-transparent p-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
            {uploadsEnabled && (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="inline-flex h-8 items-center gap-1.5 rounded-full border border-zinc-300 dark:border-zinc-700 bg-zinc-50/80 dark:bg-zinc-950/80 px-3 text-xs font-medium text-zinc-800 dark:text-zinc-200 backdrop-blur-md hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
                Replace
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                onChange("");
                setError(null);
              }}
              className="inline-flex h-8 items-center gap-1.5 rounded-full border border-zinc-300 dark:border-zinc-700 bg-zinc-50/80 dark:bg-zinc-950/80 px-3 text-xs font-medium text-zinc-800 dark:text-zinc-200 backdrop-blur-md hover:bg-red-500/20 hover:text-red-300"
            >
              <X className="h-3.5 w-3.5" />
              Remove
            </button>
          </div>
        </div>
      ) : uploadsEnabled ? (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            handleFile(e.dataTransfer.files?.[0]);
          }}
          disabled={uploading}
          className={cn(
            "flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-8 text-center transition-colors",
            dragging ? "border-zinc-500 bg-zinc-100/50 dark:bg-zinc-900/50" : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-100/30 dark:hover:bg-zinc-900/30",
            invalid && "border-red-500/60"
          )}
        >
          {uploading ? (
            <Loader2 className="h-5 w-5 animate-spin text-zinc-600 dark:text-zinc-400" />
          ) : (
            <ImagePlus className="h-5 w-5 text-zinc-500" />
          )}
          <span className="text-sm text-zinc-700 dark:text-zinc-300">
            {uploading ? "Uploading..." : "Drop an image or click to upload"}
          </span>
          <span className="text-[11px] text-zinc-400 dark:text-zinc-600">Optional · JPG, PNG, WebP, GIF up to 10 MB</span>
        </button>
      ) : null}

      {!value && uploadsEnabled && (
        <button
          type="button"
          onClick={() => setShowUrl((s) => !s)}
          className="inline-flex w-fit items-center gap-1.5 text-[11px] font-medium text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
        >
          <Link2 className="h-3 w-3" />
          {showUrl ? "Hide URL field" : "Or paste an image URL"}
        </button>
      )}

      {!value && showUrl && (
        <div className="flex gap-2">
          <input
            value={urlDraft}
            onChange={(e) => setUrlDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                applyUrl();
              }
            }}
            aria-invalid={invalid}
            aria-label="Cover image URL"
            placeholder="https://res.cloudinary.com/..."
            className="w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-950/40 px-3.5 py-2.5 text-sm text-zinc-950 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 outline-none transition-colors focus:border-zinc-500 aria-invalid:border-red-500/60"
          />
          <button
            type="button"
            onClick={applyUrl}
            disabled={!urlDraft.trim()}
            className="shrink-0 rounded-md border border-zinc-200 dark:border-zinc-800 px-3.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-950 dark:hover:text-zinc-50 disabled:opacity-40 transition-colors"
          >
            Use
          </button>
        </div>
      )}

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
