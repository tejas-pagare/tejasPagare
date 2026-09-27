"use client";

import { useTransition } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { deletePost } from "@/app/admin/actions";

export default function DeletePostButton({ id, title }: { id: string; title: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (confirm(`Delete "${title}"? This cannot be undone.`)) {
          startTransition(() => deletePost(id));
        }
      }}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50 transition-colors"
      title="Delete post"
      aria-label={`Delete ${title}`}
    >
      {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
    </button>
  );
}
