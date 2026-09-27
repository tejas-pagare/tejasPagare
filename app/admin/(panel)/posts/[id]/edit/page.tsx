import { notFound } from "next/navigation";
import PostEditor from "@/components/post-editor";
import { isCloudinaryConfigured } from "@/lib/cloudinary";
import { updatePost } from "@/app/admin/actions";
import { posts } from "@/lib/blog/store";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await posts.getById(id);
  if (!post) notFound();

  return (
    <PostEditor
      action={updatePost.bind(null, post.id)}
      post={post}
      uploadsEnabled={isCloudinaryConfigured()}
    />
  );
}
