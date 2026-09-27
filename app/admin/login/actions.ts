"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { verifyPassword } from "@/lib/auth/password";
import { SESSION_COOKIE, SESSION_TTL_SECONDS, signSession } from "@/lib/auth/session";

export interface LoginState {
  error?: string;
}

// Best-effort brute-force throttle (per server instance).
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

function isThrottled(key: string): boolean {
  const entry = attempts.get(key);
  return !!entry && entry.resetAt > Date.now() && entry.count >= MAX_ATTEMPTS;
}

function recordFailure(key: string) {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || entry.resetAt < now) attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
  else entry.count += 1;
}

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const adminHash = process.env.ADMIN_PASSWORD_HASH;
  if (!adminEmail || !adminHash || !process.env.AUTH_SECRET) {
    return { error: "Admin login is not configured. Set ADMIN_EMAIL, ADMIN_PASSWORD_HASH and AUTH_SECRET." };
  }

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (isThrottled(ip)) {
    return { error: "Too many attempts. Try again in 15 minutes." };
  }

  const valid = email === adminEmail && (await verifyPassword(password, adminHash));
  if (!valid) {
    recordFailure(ip);
    return { error: "Invalid email or password." };
  }
  attempts.delete(ip);

  const token = await signSession({ sub: adminEmail, role: "admin" });
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login");
}
