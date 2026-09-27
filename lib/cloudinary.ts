import "server-only";
import { createHash } from "node:crypto";

export function isCloudinaryConfigured(): boolean {
  return !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
}

/** Signs upload params per https://cloudinary.com/documentation/authentication_signatures */
export function signUploadParams(params: Record<string, string | number>): string {
  const toSign = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  return createHash("sha1").update(toSign + process.env.CLOUDINARY_API_SECRET).digest("hex");
}
