import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Post } from "@/lib/blog/types";
import { formatDate, isOptimizableImage, readingTime } from "@/lib/blog/utils";

export default function PostCard({ post, compact = false }: { post: Post; compact?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/20 dark:bg-zinc-900/20 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-100/40 dark:hover:bg-zinc-900/40 hover:shadow-[0_0_24px_rgba(59,130,246,0.06)]"
    >
      {post.coverImage && (
        <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
          <Image
            src={post.coverImage}
            alt=""
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes={compact ? "(max-width: 768px) 100vw, 340px" : "(max-width: 768px) 100vw, 500px"}
            unoptimized={!isOptimizableImage(post.coverImage)}
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
        <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-zinc-500">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt ?? post.createdAt)}</time>
          <span className="text-zinc-300 dark:text-zinc-700">·</span>
          <span>{readingTime(post.content)} min read</span>
        </div>

        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg md:text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-white transition-colors">
            {post.title}
          </h3>
          <ArrowUpRight className="h-4 w-4 shrink-0 mt-1.5 text-zinc-500 transition-all duration-200 group-hover:text-zinc-950 dark:group-hover:text-zinc-50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        {post.excerpt && (
          <p className={`text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 ${compact ? "line-clamp-2" : "line-clamp-3"}`}>
            {post.excerpt}
          </p>
        )}

        {post.tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-100 dark:bg-zinc-900 px-2.5 py-0.5 text-[11px] font-medium text-zinc-600 dark:text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
