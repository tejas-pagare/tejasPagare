"use client";

import DataError from "@/components/data-error";

export default function AdminError(props: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <DataError
      {...props}
      title="Can't reach the database"
      hint={
        <>
          Check that <code className="font-mono text-zinc-700 dark:text-zinc-300">MONGODB_URI</code> is correct and that this
          server&rsquo;s IP address is allowed under Network Access in MongoDB Atlas.
        </>
      }
    />
  );
}
