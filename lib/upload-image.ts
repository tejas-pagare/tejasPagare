import { getUploadSignature } from "@/app/admin/upload-actions";

const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif", "image/svg+xml"];

/** Uploads an image straight from the browser to Cloudinary and returns its https URL. */
export async function uploadImage(file: File): Promise<string> {
  if (!ALLOWED.includes(file.type)) throw new Error("Use a JPG, PNG, WebP, GIF, AVIF or SVG image.");
  if (file.size > MAX_BYTES) throw new Error("Images must be 10 MB or smaller.");

  const sig = await getUploadSignature();
  if (!sig.ok) throw new Error(sig.error);

  const body = new FormData();
  body.append("file", file);
  body.append("api_key", sig.apiKey);
  body.append("timestamp", String(sig.timestamp));
  body.append("folder", sig.folder);
  body.append("signature", sig.signature);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`, {
    method: "POST",
    body,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.secure_url) {
    throw new Error(data?.error?.message ?? "Upload failed. Please try again.");
  }
  return data.secure_url as string;
}
