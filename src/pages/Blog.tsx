import Layout from "@/components/Layout";
import BlogPostCard from "@/components/BlogPostCard";
import BlogHeader from "@/components/BlogHeader";
import { useBlogPosts } from "@/hooks/useBlogPosts";

const Blog = () => {
  const { posts, loading } = useBlogPosts();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <BlogHeader />

        {loading ? (
          <div className="text-center py-8">
            <div className="text-xl font-medium text-muted-foreground">
              Loading blog posts...
            </div>
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {posts.map((post) => (
              <BlogPostCard
                key={post.id}
                id={post.id}
                title={post.title}
                date={post.date}
                excerpt={post.subtitle || ""}
                tags={post.tags}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-xl font-medium text-muted-foreground">
              No blog posts found
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Blog;
