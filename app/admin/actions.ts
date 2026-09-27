"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/dal";
import { posts } from "@/lib/blog/store";
import type { PostInput } from "@/lib/blog/types";
import { slugify } from "@/lib/blog/utils";

export interface PostFormState {
  error?: string;
  fieldErrors?: Partial<Record<keyof PostInput, string>>;
}

function parsePost(formData: FormData): { input?: PostInput; state?: PostFormState } {
  const title = String(formData.get("title") ?? "").trim();
  const slug = slugify(String(formData.get("slug") ?? "") || title);
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "");
  const coverImage = String(formData.get("coverImage") ?? "").trim() || undefined;
  const tags = String(formData.get("tags") ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 8);
  const status = formData.get("status") === "published" ? "published" : "draft";

  const fieldErrors: PostFormState["fieldErrors"] = {};
  if (!title) fieldErrors.title = "Title is required.";
  if (title.length > 160) fieldErrors.title = "Keep the title under 160 characters.";
  if (!slug) fieldErrors.slug = "Slug is required.";
  if (excerpt.length > 300) fieldErrors.excerpt = "Keep the excerpt under 300 characters.";
  if (!content.trim()) fieldErrors.content = "Write something before saving.";
  if (coverImage && !/^https:\/\//.test(coverImage) && !coverImage.startsWith("/")) {
    fieldErrors.coverImage = "Use an https:// URL or a /public path.";
  }
  if (Object.keys(fieldErrors).length) return { state: { fieldErrors } };

  return { input: { title, slug, excerpt, content, coverImage, tags, status } };
}

function revalidateBlog(slug?: string) {
  revalidatePath("/");
  revalidatePath("/blog");
  if (slug) revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin");
}

export async function createPost(_prev: PostFormState, formData: FormData): Promise<PostFormState> {
  await requireAdmin();
  const { input, state } = parsePost(formData);
  if (!input) return state!;

  if (await posts.getBySlug(input.slug)) {
    return { fieldErrors: { slug: "A post with this slug already exists." } };
  }
  await posts.create(input);
  revalidateBlog(input.slug);
  redirect("/admin");
}

export async function updatePost(
  id: string,
  _prev: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  await requireAdmin();
  const { input, state } = parsePost(formData);
  if (!input) return state!;

  const clash = await posts.getBySlug(input.slug);
  if (clash && clash.id !== id) {
    return { fieldErrors: { slug: "A post with this slug already exists." } };
  }
  const existing = await posts.getById(id);
  if (!existing) return { error: "Post not found." };

  await posts.update(id, input);
  revalidateBlog(existing.slug);
  if (existing.slug !== input.slug) revalidatePath(`/blog/${input.slug}`);
  redirect("/admin");
}

export async function deletePost(id: string) {
  await requireAdmin();
  const existing = await posts.getById(id);
  if (!existing) return;
  await posts.remove(id);
  revalidateBlog(existing.slug);
}
