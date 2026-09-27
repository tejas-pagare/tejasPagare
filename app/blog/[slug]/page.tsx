import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, PenSquare } from "lucide-react";
import Markdown from "@/components/markdown";
import { getSession } from "@/lib/auth/dal";
import { posts } from "@/lib/blog/store";
import { formatDate, isOptimizableImage, readingTime } from "@/lib/blog/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Published posts are public; drafts are only visible to a signed-in admin (preview). */
async function loadPost(slug: string) {
  const post = await posts.getBySlug(slug);
  if (!post) return null;
  if (post.status === "published") return { post, isAdmin: !!(await getSession()) };
  return (await getSession()) ? { post, isAdmin: true } : null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await posts.getBySlug(slug);
  if (!post || post.status !== "published") return { title: "Post not found" };
  return {
    title: `${post.title} | Tejas Pagare`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      tags: post.tags,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const result = await loadPost(slug);
  if (!result) notFound();
  const { post, isAdmin } = result;

  const published = await posts.list();
  const idx = published.findIndex((p) => p.id === post.id);
  const newer = idx > 0 ? published[idx - 1] : undefined;
  const older = idx >= 0 ? published[idx + 1] : undefined;

  return (
    <article className="mx-auto flex w-full max-w-[720px] flex-col gap-10 px-4 py-12 md:px-8 lg:py-20">
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-zinc-50 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
          <span>All posts</span>
        </Link>
        {isAdmin && (
          <Link
            href={`/admin/posts/${post.id}/edit`}
            className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 px-3 py-1 text-xs font-medium text-zinc-400 hover:bg-zinc-900 hover:text-zinc-50 transition-colors"
          >
            <PenSquare className="h-3.5 w-3.5" />
            Edit
          </Link>
        )}
      </div>

      {post.status === "draft" && (
        <p className="rounded-md border border-amber-500/20 bg-amber-500/5 px-4 py-2.5 text-xs text-amber-200/90">
          Draft preview &mdash; only you can see this page.
        </p>
      )}

      <header className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-zinc-500">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt ?? post.updatedAt)}</time>
          <span className="text-zinc-700">·</span>
          <span>{readingTime(post.content)} min read</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold leading-[1.1] tracking-[-0.02em] text-zinc-50">
          {post.title}
        </h1>
        {post.excerpt && <p className="text-base md:text-lg leading-relaxed text-zinc-400">{post.excerpt}</p>}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="rounded-full border border-zinc-800/60 bg-zinc-900 px-2.5 py-0.5 text-[11px] font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </header>

      {post.coverImage && (
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/30">
          <Image
            src={post.coverImage}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 720px"
            unoptimized={!isOptimizableImage(post.coverImage)}
          />
        </div>
      )}

      <Markdown content={post.content} className="border-t border-zinc-900 pt-10" />

      {(newer || older) && post.status === "published" && (
        <nav className="mt-6 grid grid-cols-1 gap-4 border-t border-zinc-800 pt-8 sm:grid-cols-2">
          {older ? (
            <Link href={`/blog/${older.slug}`} className="group flex flex-col gap-1.5 rounded-xl border border-zinc-800 p-4 hover:border-zinc-700 hover:bg-zinc-900/30 transition-colors">
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">
                <ArrowLeft className="h-3 w-3" /> Previous
              </span>
              <span className="text-sm font-semibold text-zinc-200 group-hover:text-zinc-50">{older.title}</span>
            </Link>
          ) : <span />}
          {newer && (
            <Link href={`/blog/${newer.slug}`} className="group flex flex-col items-end gap-1.5 rounded-xl border border-zinc-800 p-4 text-right hover:border-zinc-700 hover:bg-zinc-900/30 transition-colors">
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">
                Next <ArrowRight className="h-3 w-3" />
              </span>
              <span className="text-sm font-semibold text-zinc-200 group-hover:text-zinc-50">{newer.title}</span>
            </Link>
          )}
        </nav>
      )}
    </article>
  );
}
