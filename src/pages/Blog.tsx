
import Layout from "@/components/Layout";
import BlogPostCard from "@/components/BlogPostCard";
import { blogPosts } from "@/data/blogPosts";

const Blog = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-navy mb-4">Blog</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Thoughts, tutorials, and insights on computer science, software development,
            and emerging technologies. I write about topics I'm passionate about and
            learning experiences from my projects.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map(post => (
            <BlogPostCard
              key={post.id}
              id={post.id}
              title={post.title}
              date={post.date}
              excerpt={post.excerpt}
              tags={post.tags}
              coverImage={post.coverImage}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
