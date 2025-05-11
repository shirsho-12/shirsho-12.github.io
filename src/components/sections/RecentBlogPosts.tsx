import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import BlogPostCard from "@/components/BlogPostCard";
import { useBlogPosts } from "@/hooks/useBlogPosts";

const RecentBlogPosts = () => {
  const { posts, loading } = useBlogPosts();
  const recentBlogPosts = posts.slice(0, 3);

  return (
    <section className="py-16 primary-300 dark:primary-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="section-heading mb-0">Recent Blog Posts</h2>
          <Button asChild variant="outline">
            <Link to="/blog">View All Posts</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <p>Loading posts...</p>
          ) : (
            recentBlogPosts.map((post) => (
              <BlogPostCard
                key={post.id}
                id={post.id}
                title={post.title}
                date={post.date}
                excerpt={post.content.slice(0, 150) + "..."}
                tags={post.tags}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default RecentBlogPosts;
