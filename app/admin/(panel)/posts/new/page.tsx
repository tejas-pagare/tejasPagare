import PostEditor from "@/components/post-editor";
import { isCloudinaryConfigured } from "@/lib/cloudinary";
import { createPost } from "@/app/admin/actions";

export default function NewPostPage() {
  return <PostEditor action={createPost} uploadsEnabled={isCloudinaryConfigured()} />;
}
