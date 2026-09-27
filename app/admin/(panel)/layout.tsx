import type { Metadata } from "next";
import { LogOut } from "lucide-react";
import { requireAdmin } from "@/lib/auth/dal";
import { logout } from "../login/actions";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();

  return (
    <div className="mx-auto flex w-full max-w-[1024px] flex-col gap-8 px-4 py-10 md:px-8 lg:py-14">
      <div className="flex items-center justify-between gap-4 text-xs text-zinc-500">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
          <span className="font-mono">{session.sub}</span>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 px-3 py-1.5 font-medium text-zinc-400 hover:bg-zinc-900 hover:text-zinc-50 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign out
          </button>
        </form>
      </div>
      {children}
    </div>
  );
}
