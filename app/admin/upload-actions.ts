"use server";

import { requireAdmin } from "@/lib/auth/dal";
import { isCloudinaryConfigured, signUploadParams } from "@/lib/cloudinary";

export type UploadSignature =
  | { ok: true; cloudName: string; apiKey: string; timestamp: number; folder: string; signature: string }
  | { ok: false; error: string };

/** Short-lived signature that lets the admin's browser upload directly to Cloudinary. */
export async function getUploadSignature(): Promise<UploadSignature> {
  await requireAdmin();
  if (!isCloudinaryConfigured()) {
    return { ok: false, error: "Image uploads are not configured. Set the CLOUDINARY_* environment variables." };
  }

  const timestamp = Math.round(Date.now() / 1000);
  const folder = process.env.CLOUDINARY_FOLDER || "portfolio/blog";
  return {
    ok: true,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
    apiKey: process.env.CLOUDINARY_API_KEY!,
    timestamp,
    folder,
    signature: signUploadParams({ folder, timestamp }),
  };
}
