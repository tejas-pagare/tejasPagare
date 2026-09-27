"use client";

import DataError from "@/components/data-error";

export default function BlogError(props: { error: Error & { digest?: string }; reset: () => void }) {
  return <DataError {...props} />;
}
