
import Layout from "@/components/Layout";
import BlogPostCard from "@/components/BlogPostCard";
import { useEffect, useState } from "react";

interface BlogPost {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  tags: string[];
  content: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const loadBlogPosts = async () => {
      const blogFiles = [
        '2020-08-03-lenet5.md',
        '2021-05-30-rl_preface.md',
        '2021-06-20-mc.md',
        '2021-06-25-mc_roulette.md'
      ];
      
      const loadedPosts = await Promise.all(
        blogFiles.map(async (filename) => {
          const content = await import(`../assets/blogs/${filename}`);
          const fileContent = content.default;
          
          // Parse the frontmatter
          const [, frontmatter, ...contentParts] = fileContent.split('---');
          const markdown = contentParts.join('---');
          
          // Parse frontmatter into object
          const meta = frontmatter.split('\n').reduce((acc: any, line: string) => {
            const [key, ...values] = line.split(':').map(str => str.trim());
            if (key && values.length) {
              // Handle arrays in frontmatter (like tags)
              if (key === 'tags') {
                acc[key] = values.join(':').replace(/[\[\]]/g, '').split(',').map(tag => tag.trim());
              } else {
                acc[key] = values.join(':');
              }
            }
            return acc;
          }, {});

          // Extract date from filename
          const dateMatch = filename.match(/^\d{4}-\d{2}-\d{2}/);
          const date = dateMatch ? dateMatch[0] : '';
          
          return {
            id: filename.replace('.md', ''),
            title: meta.title || '',
            subtitle: meta.subtitle || '',
            date,
            tags: meta.tags || [],
            content: markdown.trim()
          };
        })
      );
      
      // Sort posts by date, newest first
      loadedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setPosts(loadedPosts);
    };

    loadBlogPosts();
  }, []);

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
          {posts.map(post => (
            <BlogPostCard
              key={post.id}
              id={post.id}
              title={post.title}
              date={post.date}
              excerpt={post.subtitle || ''}
              tags={post.tags}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
