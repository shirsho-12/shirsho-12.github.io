
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { blogPosts } from "@/data/blogPosts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const post = blogPosts.find(post => post.id === id);
  
  useEffect(() => {
    if (!post) {
      navigate("/blog", { replace: true });
    }
    
    // Scroll to top when post loads
    window.scrollTo(0, 0);
  }, [post, navigate]);
  
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
        
        {post.coverImage && (
          <div className="rounded-lg overflow-hidden mb-8 shadow-md">
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-auto object-cover"
            />
          </div>
        )}
        
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-600">
            <span>{post.date}</span>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="bg-gray-100 text-navy">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <div className="prose max-w-none">
          <MarkdownRenderer content={post.content} />
        </div>
      </div>
    </Layout>
  );
};

export default BlogPost;
