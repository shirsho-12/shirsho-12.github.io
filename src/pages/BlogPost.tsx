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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        if (!id) {
          setError("No blog post ID provided");
          setLoading(false);
          return;
        }

        try {
          // Use the dynamic import with 'as: "raw"' option to get the content as text
          const content = await import(`../assets/blogs/${id}.md?raw`);

          // Split content to separate frontmatter from markdown
          const parts = content.default.split("---");
          if (parts.length < 3) {
            throw new Error(`Invalid markdown format in ${id}.md`);
          }

          // Extract frontmatter (it's the second part after the first ---)
          const frontmatter = parts[1];
          // Join the rest as content (in case there are more --- in the content)
          const markdown = parts.slice(2).join("---");

          // Parse frontmatter
          const meta: Record<string, any> = {};
          frontmatter.split("\n").forEach((line: string) => {
            if (!line.trim()) return;

            const colonIndex = line.indexOf(":");
            if (colonIndex === -1) return;

            const key = line.slice(0, colonIndex).trim();
            let value = line.slice(colonIndex + 1).trim();

            // Handle tags which are in [tag1, tag2] format
            if (key === "tags") {
              const match = value.match(/\[(.*)\]/);
              if (match && match[1]) {
                value = match[1];
              }
              meta[key] = value.split(",").map((tag: string) => tag.trim());
            } else {
              meta[key] = value;
            }
          });

          // Extract date from filename (format: YYYY-MM-DD-title.md)
          const dateMatch = id.match(/^(\d{4}-\d{2}-\d{2})/);
          const date = dateMatch ? dateMatch[1] : "";

          setPost({
            id,
            title: meta.title || "",
            subtitle: meta.subtitle || "",
            date,
            tags: meta.tags || [],
            content: markdown.trim(),
          });

          setLoading(false);
        } catch (error) {
          console.error("Error loading blog post:", error);
          setError(
            `Failed to load blog post: ${
              error instanceof Error ? error.message : "Unknown error"
            }`
          );
          setLoading(false);
        }
      } catch (error) {
        console.error("Error loading blog post:", error);
        setError(
          `Failed to load blog post: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
        setLoading(false);
      }
    };

    loadPost();
    window.scrollTo(0, 0);
  }, [id, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-xl font-medium text-muted-foreground">
              Loading post...
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-xl font-medium text-destructive">{error}</div>
            <Button
              variant="ghost"
              className="mt-4"
              onClick={() => navigate("/blog")}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-xl font-medium text-muted-foreground">
              Blog post not found
            </div>
            <Button
              variant="ghost"
              className="mt-4"
              onClick={() => navigate("/blog")}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Button
          variant="ghost"
          className="mb-8 flex items-center gap-2 hover:bg-muted"
          onClick={() => navigate("/blog")}
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Blog
        </Button>
        {post && (
          <>
            <BlogPostHeader
              title={post.title}
              subtitle={post.subtitle}
              date={post.date}
              tags={post.tags}
            />

            <div className="mt-8">
              <MarkdownRenderer content={post.content} />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default BlogPost;
