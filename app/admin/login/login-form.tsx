"use client";

import { useActionState } from "react";
import { Loader2, LogIn } from "lucide-react";
import { login } from "./actions";

const inputClass =
  "w-full rounded-md border border-zinc-800 bg-zinc-950/40 px-3.5 py-2.5 text-sm text-zinc-50 placeholder:text-zinc-600 outline-none transition-colors focus:border-zinc-500";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, {});

  return (
    <form
      action={formAction}
      className="flex flex-col gap-5 rounded-xl border border-zinc-800 bg-zinc-900/20 p-6 backdrop-blur-md"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500">
          Email
        </label>
        <input id="email" name="email" type="email" autoComplete="username" required className={inputClass} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={inputClass}
        />
      </div>

      {state.error && (
        <p role="alert" className="rounded-md border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-300">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-zinc-50 text-xs font-medium text-zinc-950 hover:bg-zinc-200 disabled:opacity-60 transition-colors"
      >
        {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <LogIn className="h-3.5 w-3.5" />}
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
