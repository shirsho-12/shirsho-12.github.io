
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import BlogPostHeader from "@/components/BlogPostHeader";

interface BlogPost {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  tags: string[];
  content: string;
}

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadPost = async () => {
      try {
        if (!id) return;
        
        // Load the content of the blog post
        const content = await import(`../assets/blogs/${id}.md`);
        const fileContent = content.default;
        
        // Split content to separate frontmatter from markdown
        const parts = fileContent.split('---');
        if (parts.length < 3) {
          console.error(`Invalid markdown format in ${id}.md`);
          throw new Error("Invalid markdown format");
        }
        
        // Extract frontmatter (it's the second part after the first ---)
        const frontmatter = parts[1];
        // Join the rest as content (in case there are more --- in the content)
        const markdown = parts.slice(2).join('---');
        
        // Parse frontmatter into an object
        const meta = frontmatter.split('\n').reduce((acc: any, line: string) => {
          if (!line.trim()) return acc;
          
          const colonIndex = line.indexOf(':');
          if (colonIndex === -1) return acc;
          
          const key = line.slice(0, colonIndex).trim();
          let value = line.slice(colonIndex + 1).trim();
          
          // Handle special cases like tags which are in [tag1, tag2] format
          if (key === 'tags') {
            // Extract values between [ and ]
            const match = value.match(/\[(.*)\]/);
            if (match && match[1]) {
              value = match[1];
            }
            acc[key] = value.split(',').map((tag: string) => tag.trim());
          } else {
            acc[key] = value;
          }
          
          return acc;
        }, {});

        // Extract date from filename (format: YYYY-MM-DD-title.md)
        const dateMatch = id.match(/^(\d{4}-\d{2}-\d{2})/);
        const date = dateMatch ? dateMatch[1] : '';
        
        setPost({
          id,
          title: meta.title || '',
          subtitle: meta.subtitle || '',
          date,
          tags: meta.tags || [],
          content: markdown.trim()
        });
      } catch (error) {
        console.error('Error loading blog post:', error);
        navigate("/blog", { replace: true });
      } finally {
        setLoading(false);
      }
    };
    
    loadPost();
    window.scrollTo(0, 0);
  }, [id, navigate]);
  
  if (loading) {
    return <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        Loading...
      </div>
    </Layout>;
  }
  
  if (!post) return null;
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Button 
          variant="ghost" 
          className="mb-8 flex items-center gap-2 hover:bg-gray-100"
          onClick={() => navigate("/blog")}
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Blog
        </Button>
        
        <BlogPostHeader
          title={post.title}
          subtitle={post.subtitle}
          date={post.date}
          tags={post.tags}
        />
        
        <div className="prose max-w-none">
          <MarkdownRenderer content={post.content} />
        </div>
      </div>
    </Layout>
  );
};

export default BlogPost;
