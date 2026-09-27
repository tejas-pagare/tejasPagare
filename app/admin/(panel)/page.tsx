import Link from "next/link";
import { ExternalLink, FileText, PenSquare, Plus, TriangleAlert } from "lucide-react";
import DeletePostButton from "@/components/delete-post-button";
import { posts } from "@/lib/blog/store";
import { formatDate } from "@/lib/blog/utils";

export default async function AdminDashboard() {
  const all = await posts.list({ includeDrafts: true });
  const published = all.filter((p) => p.status === "published").length;
  const usingFileStore = !process.env.MONGODB_URI;

  const stats = [
    { label: "Total posts", value: all.length },
    { label: "Published", value: published },
    { label: "Drafts", value: all.length - published },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-50">Blog</h1>
          <p className="text-sm text-zinc-400">Write, edit and publish posts.</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-zinc-50 px-5 text-xs font-medium text-zinc-950 hover:bg-zinc-200 transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          New post
        </Link>
      </div>

      {usingFileStore && process.env.NODE_ENV === "production" && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm text-amber-200/90">
          <TriangleAlert className="h-4 w-4 shrink-0 mt-0.5" />
          <p>
            Posts are being saved to <code className="font-mono">data/posts.json</code>. Most hosts
            (e.g. Vercel) don&rsquo;t persist file writes &mdash; set <code className="font-mono">MONGODB_URI</code> in
            production.
          </p>
        </div>
      )}

      <div className="grid grid-cols-3 divide-x divide-zinc-800 rounded-xl border border-zinc-800 bg-zinc-900/10">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-1 p-4 md:p-5">
            <span className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-50">{s.value}</span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">{s.label}</span>
          </div>
        ))}
      </div>

      {all.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-zinc-800 py-16 text-center">
          <FileText className="h-6 w-6 text-zinc-600" />
          <p className="text-sm text-zinc-400">No posts yet.</p>
          <Link href="/admin/posts/new" className="text-xs font-semibold text-zinc-300 hover:text-zinc-50">
            Write your first post &rarr;
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col divide-y divide-zinc-800 rounded-xl border border-zinc-800">
          {all.map((post) => (
            <li key={post.id} className="flex items-center gap-4 px-4 py-3.5 md:px-5 hover:bg-zinc-900/30 transition-colors">
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    className="truncate text-sm font-medium text-zinc-100 hover:text-white"
                  >
                    {post.title}
                  </Link>
                  <span
                    className={
                      post.status === "published"
                        ? "shrink-0 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-medium text-indigo-400"
                        : "shrink-0 rounded-full border border-zinc-700 bg-zinc-900 px-2 py-0.5 text-[10px] font-medium text-zinc-400"
                    }
                  >
                    {post.status === "published" ? "Published" : "Draft"}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-zinc-500">
                  /blog/{post.slug} · updated {formatDate(post.updatedAt)}
                </span>
              </div>
              <div className="flex items-center gap-0.5">
                <Link
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-900 hover:text-zinc-100 transition-colors"
                  title={post.status === "published" ? "View post" : "Preview draft"}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-900 hover:text-zinc-100 transition-colors"
                  title="Edit post"
                >
                  <PenSquare className="h-3.5 w-3.5" />
                </Link>
                <DeletePostButton id={post.id} title={post.title} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
