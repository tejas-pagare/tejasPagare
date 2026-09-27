"use client";

import { useEffect } from "react";
import { DatabaseZap, RotateCw } from "lucide-react";

export default function DataError({
  error,
  reset,
  title = "Couldn't load posts",
  hint,
}: {
  error: Error & { digest?: string };
  reset: () => void;
  title?: string;
  hint?: React.ReactNode;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <DatabaseZap className="h-6 w-6 text-zinc-500" />
      <h1 className="text-lg font-semibold text-zinc-50">{title}</h1>
      <p className="text-sm leading-relaxed text-zinc-400">
        {hint ?? "Something went wrong while fetching data. Please try again in a moment."}
      </p>
      <button
        onClick={reset}
        className="inline-flex h-9 items-center gap-2 rounded-full border border-zinc-800 px-4 text-xs font-medium text-zinc-300 hover:bg-zinc-900 hover:text-zinc-50"
      >
        <RotateCw className="h-3.5 w-3.5" />
        Try again
      </button>
    </div>
  );
}
