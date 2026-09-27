export type PostStatus = "draft" | "published";

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags: string[];
  status: PostStatus;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export type PostInput = Pick<
  Post,
  "slug" | "title" | "excerpt" | "content" | "coverImage" | "tags" | "status"
>;
