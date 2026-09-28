import type { Metadata } from "next";
import LoginForm from "./login-form";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-4 py-16">
      <div className="mb-8 flex flex-col gap-2 text-center">
        <span className="mx-auto mb-2 inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100/30 dark:bg-zinc-900/30 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-zinc-500">
          Restricted
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">Sign in to write</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Admin access for publishing blog posts.</p>
      </div>
      <LoginForm />
    </div>
  );
}
