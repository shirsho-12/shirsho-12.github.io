
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
        
        const content = await import(`../assets/blogs/${id}.md`);
        const fileContent = content.default;
        
        const [, frontmatter, ...contentParts] = fileContent.split('---');
        const markdown = contentParts.join('---');
        
        const meta = frontmatter.split('\n').reduce((acc: any, line: string) => {
          const [key, ...values] = line.split(':').map(str => str.trim());
          if (key && values.length) {
            if (key === 'tags') {
              acc[key] = values.join(':').replace(/[\[\]]/g, '').split(',').map(tag => tag.trim());
            } else {
              acc[key] = values.join(':');
            }
          }
          return acc;
        }, {});

        const dateMatch = id.match(/^\d{4}-\d{2}-\d{2}/);
        const date = dateMatch ? dateMatch[0] : '';
        
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
