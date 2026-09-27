import HomeView from "@/components/home-view";
import PostCard from "@/components/post-card";
import { posts } from "@/lib/blog/store";

export default async function Home() {
  // The homepage must render even if the blog database is unreachable.
  const latest = await posts
    .list()
    .then((all) => all.slice(0, 3))
    .catch((err) => {
      console.error("Failed to load latest posts:", err);
      return [];
    });

  return (
    <HomeView
      latestPosts={
        latest.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {latest.map((post) => (
              <PostCard key={post.id} post={post} compact />
            ))}
          </div>
        ) : undefined
      }
    />
  );
}
