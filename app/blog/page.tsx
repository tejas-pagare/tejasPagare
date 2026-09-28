import type { Metadata } from "next";
import Link from "next/link";
import { PenLine } from "lucide-react";
import PostCard from "@/components/post-card";
import { ScrollRevealGroup, ScrollRevealItem } from "@/components/scroll-reveal";
import { posts } from "@/lib/blog/store";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog | Tejas Pagare",
  description: "Notes on full-stack engineering, system design and generative AI.",
};

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ tag?: string }> }) {
  const { tag } = await searchParams;
  const all = await posts.list();
  const tags = Array.from(new Set(all.flatMap((p) => p.tags))).sort();
  const visible = tag ? all.filter((p) => p.tags.includes(tag)) : all;

  return (
    <div className="mx-auto flex w-full max-w-[1024px] flex-col gap-10 px-4 py-12 md:px-8 lg:py-24">
      <div id="blog-header" className="flex max-w-2xl flex-col gap-3 border-b border-zinc-900 pb-8">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-50">Writing</h1>
        <p className="text-base md:text-lg leading-relaxed text-zinc-400">
          Notes on building scalable systems, full-stack engineering and generative AI &mdash; what
          worked, what broke, and what I learned.
        </p>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {[undefined, ...tags].map((t) => {
            const active = t === tag;
            return (
              <Link
                key={t ?? "all"}
                href={t ? `/blog?tag=${encodeURIComponent(t)}` : "/blog"}
                scroll={false}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  active
                    ? "border-zinc-600 bg-zinc-800 text-zinc-50"
                    : "border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                )}
              >
                {t ?? "All"}
              </Link>
            );
          })}
        </div>
      )}

      {visible.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-zinc-800 py-20 text-center">
          <PenLine className="h-6 w-6 text-zinc-600" />
          <p className="text-sm text-zinc-400">
            {tag ? `No posts tagged “${tag}” yet.` : "Posts are on the way. Check back soon."}
          </p>
        </div>
      ) : (
        <ScrollRevealGroup className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {visible.map((post) => (
            <ScrollRevealItem key={post.id}>
              <PostCard post={post} />
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>
      )}
    </div>
  );
}
